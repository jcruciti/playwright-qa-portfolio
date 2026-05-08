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

    await test.step('Login with valid credentials', async () => {
      await loginPage.open();

      await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);
    });

    await test.step('Add products to cart', async () => {
      await inventoryPage.addProducts(PRODUCTS);
    });

    await test.step('Navigate to checkout step one', async () => {
      await inventoryPage.openCart();

      await cartPage.proceedToCheckout();
    });
  });

  test('should verify calculated sum matches UI total', async () => {
    await test.step('Fill checkout information', async () => {
      await checkoutPage.completeStepOne(user);
    });

    await test.step('Wait for checkout summary page', async () => {
      await checkoutPage.summaryContainer.waitFor({
        state: 'visible',
      });
    });

    await test.step('Validate subtotal matches item prices', async () => {
      const { calculated, uiTotal } =
        await checkoutPage.assertSubtotalMatchesItems();

      expect(calculated).toBeCloseTo(uiTotal, 2);
    });
  });

  test('should navigate back to cart page from checkout', async ({ page }) => {
    await test.step('Cancel checkout process', async () => {
      await checkoutPage.cancelOrder();
    });

    await test.step('Validate navigation back to cart page', async () => {
      await expect(page).toHaveURL(/cart/);

      await expect(cartPage.getCartTitle()).toBeVisible();
    });
  });

  test('should navigate to checkout step two', async ({ page }) => {
    await test.step('Complete checkout step one', async () => {
      await checkoutPage.completeStepOne(user);
    });

    await test.step('Validate navigation to checkout step two', async () => {
      await expect(page).toHaveURL(/checkout-step-two/);

      await expect(checkoutPage.summaryContainer).toBeVisible();
    });
  });

  test.describe('Checkout required fields validation', () => {
    const cases = [
      {
        field: 'First Name',
        data: {
          firstName: '',
          lastName: 'Cruciti',
          postalCode: '06120-080',
        },
        message: 'Error: First Name is required',
      },
      {
        field: 'Last Name',
        data: {
          firstName: 'John',
          lastName: '',
          postalCode: '06120-080',
        },
        message: 'Error: Last Name is required',
      },
      {
        field: 'Postal Code',
        data: {
          firstName: 'John',
          lastName: 'Cruciti',
          postalCode: '',
        },
        message: 'Error: Postal Code is required',
      },
    ];

    for (const { field, data, message } of cases) {
      test(`should validate ${field} is required`, async () => {
        const invalidUser = buildUser(data);

        await test.step(`Fill checkout form without ${field}`, async () => {
          await checkoutPage.fillInformation(invalidUser);
        });

        await test.step('Try to continue to checkout step two', async () => {
          await checkoutPage.continueToStepTwo();
        });

        await test.step(`Validate ${field} validation message`, async () => {
          await expect(checkoutPage.errorMessage).toBeVisible();

          await expect(checkoutPage.errorMessage).toHaveText(message);
        });
      });
    }
  });

  test('should redirect to shopping cart', async ({ page }) => {
    await test.step('Open shopping cart page', async () => {
      await inventoryPage.openCart();
    });

    await test.step('Validate cart page is displayed', async () => {
      await expect(page).toHaveURL(/cart/);

      await expect(cartPage.getCartTitle()).toBeVisible();
    });
  });

  test('should finish the order', async ({ page }) => {
    await test.step('Complete checkout step one', async () => {
      await checkoutPage.completeStepOne(user);
    });

    await test.step('Finish the order', async () => {
      await checkoutPage.finishOrder();
    });

    await test.step('Validate successful order completion', async () => {
      await expect(checkoutPage.successMessage).toHaveText(
        'Thank you for your order!'
      );

      await expect(page).toHaveURL(/checkout-complete/);
    });
  });
});
