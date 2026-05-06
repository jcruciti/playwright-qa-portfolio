import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout tests', () => {
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add products
    const products = [
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
      'sauce-labs-bolt-t-shirt',
      'test.allthethings()-t-shirt-(red)',
    ];

    for (const product of products) {
      await inventoryPage.addProduct(product);
    }

    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
  });

  test('should verify calculated sum matches UI total', async ({ page }) => {
    await checkoutPage.fillInformation('Joe', 'Cruciti', '06120-080');

    const pricesLocator = checkoutPage.getListPrices();

    await expect(pricesLocator.first()).toBeVisible();

    const rawPrices = await pricesLocator.allInnerTexts();

    const numericPrices = rawPrices.map((price) =>
      Number(price.replace(/[^0-9.]/g, ''))
    );

    const totalListSum = numericPrices.reduce((sum, value) => sum + value, 0);

    const rawTotal = await page
      .locator('.summary_subtotal_label')
      .textContent();

    const totalUi = Number(rawTotal?.replace(/[^0-9.]/g, ''));

    expect(totalListSum).toBeCloseTo(totalUi);
  });

  test('should navigate back to cart page from checkout', async ({ page }) => {
    await checkoutPage.cancelOrder();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.getCartTitle()).toBeVisible();
  });

  test('should navigate to checkout step two', async ({ page }) => {
    await checkoutPage.fillInformation('Joe', 'Cruciti', '06120-080');

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.getCheckoutSummaryContainer()).toBeVisible();
  });

  test.describe('Checkout required fields validation', () => {
    const cases = [
      {
        field: 'First Name',
        firstName: '',
        lastName: 'Cruciti',
        zip: '06120-080',
        message: 'Error: First Name is required',
      },
      {
        field: 'Last Name',
        firstName: 'John',
        lastName: '',
        zip: '06120-080',
        message: 'Error: Last Name is required',
      },
      {
        field: 'Zip Code',
        firstName: 'John',
        lastName: 'Cruciti',
        zip: '',
        message: 'Error: Postal Code is required',
      },
    ];

    for (const data of cases) {
      test(`should validate ${data.field} is required`, async ({ page }) => {
        await checkoutPage.fillInformation(
          data.firstName,
          data.lastName,
          data.zip
        );

        await checkoutPage.continueToStepTwo();

        const error = page.locator('[data-test="error"]');

        await expect(error).toBeVisible();
        await expect(error).toHaveText(data.message);
      });
    }
  });

  test('should redirect to shopping cart', async ({ page }) => {
    await inventoryPage.openCart();

    //Validate navigation
    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.getCartTitle()).toBeVisible();
  });

  test('should finish the order', async ({ page }) => {
    await checkoutPage.fillInformation('Joe', 'Cruciti', '06120-080');

    await checkoutPage.finishOrder();

    const checkoutComplete = page.locator('[data-test="title"]');
    await expect(checkoutComplete).toBeVisible();
    await expect(checkoutComplete).toHaveText('Checkout: Complete!');

    await expect(page).toHaveURL(/checkout-complete/);
  });
});
