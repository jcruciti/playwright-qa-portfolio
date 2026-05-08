import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

const { buildUser } = require('../../utils/userFactory');

test.describe('Complete Purchase Flow', () => {
  let inventoryPage;
  let cartPage;
  let checkoutPage;
  let user;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    user = buildUser();

    await page.goto('/inventory.html');
  });

  test('should complete purchase flow successfully', async ({ page }) => {
    await test.step('Add product to cart', async () => {
      await inventoryPage.addProduct('sauce-labs-backpack');

      await expect(inventoryPage.getCartBadge()).toHaveText('1');
    });

    await test.step('Open cart and proceed to checkout', async () => {
      await inventoryPage.openCart();

      await cartPage.proceedToCheckout();

      await expect(page).toHaveURL(/checkout-step-one/);
    });

    await test.step('Fill checkout information', async () => {
      await checkoutPage.completeStepOne(user);

      await expect(page).toHaveURL(/checkout-step-two/);
    });

    await test.step('Finish order successfully', async () => {
      await checkoutPage.finishOrder();

      await expect(checkoutPage.successMessage).toHaveText(
        'Thank you for your order!'
      );

      await expect(page).toHaveURL(/checkout-complete/);
    });
  });
});
