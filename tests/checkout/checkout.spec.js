import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

const { buildUser } = require('../../utils/userFactory');

test.describe('Checkout Flow', () => {
  let inventoryPage;
  let cartPage;
  let checkoutPage;
  let user;

  const PRODUCTS = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'test.allthethings()-t-shirt-(red)',
  ];

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    user = buildUser();

    await loginPage.open();
    await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);

    for (const product of PRODUCTS) {
      await inventoryPage.addProduct(product);
    }

    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
  });

  test('should verify calculated sum matches UI total', async () => {
    await checkoutPage.completeStepOne(user);

    await checkoutPage.summaryContainer.waitFor({ state: 'visible' });

    const { calculated, uiTotal } =
      await checkoutPage.assertSubtotalMatchesItems();

    expect(calculated).toBeCloseTo(uiTotal, 2);
  });

  test('should navigate back to cart page from checkout', async ({ page }) => {
    await checkoutPage.cancelOrder();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.getCartTitle()).toBeVisible();
  });

  test('should navigate to checkout step two', async ({ page }) => {
    await checkoutPage.completeStepOne(user);

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.summaryContainer).toBeVisible();
  });

  test.describe('Checkout required fields validation', () => {
    const cases = [
      {
        field: 'First Name',
        data: { firstName: '', lastName: 'Cruciti', postalCode: '06120-080' },
        message: 'Error: First Name is required',
      },
      {
        field: 'Last Name',
        data: { firstName: 'John', lastName: '', postalCode: '06120-080' },
        message: 'Error: Last Name is required',
      },
      {
        field: 'Postal Code',
        data: { firstName: 'John', lastName: 'Cruciti', postalCode: '' },
        message: 'Error: Postal Code is required',
      },
    ];

    for (const { field, data, message } of cases) {
      test(`should validate ${field} is required`, async () => {
        const invalidUser = buildUser(data);

        await checkoutPage.fillInformation(invalidUser);

        // 🔥 FIX: ensure proper submit flow
        await checkoutPage.continueToStepTwo();

        await expect(checkoutPage.errorMessage).toBeVisible();
        await expect(checkoutPage.errorMessage).toHaveText(message);
      });
    }
  });

  test('should redirect to shopping cart', async ({ page }) => {
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.getCartTitle()).toBeVisible();
  });

  test('should finish the order', async ({ page }) => {
    await checkoutPage.completeStepOne(user);

    await checkoutPage.finishOrder();

    // 🔥 FIX: correct real UI text
    await expect(checkoutPage.successMessage).toHaveText(
      'Thank you for your order!'
    );

    await expect(page).toHaveURL(/checkout-complete/);
  });
});
