import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

const { buildUser } = require('../../utils/userFactory');

test('should complete purchase flow successfully', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  const user = buildUser();

  await test.step('Login with valid credentials', async () => {
    await login.open();
    await login.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);

    await expect(page).toHaveURL(/inventory/);
  });

  await test.step('Add products to cart', async () => {
    await inventory.addProduct('sauce-labs-backpack');

    await expect(inventory.getCartBadge()).toHaveText('1');
  });

  await test.step('Proceed to checkout', async () => {
    await inventory.openCart();
    await cart.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });

  await test.step('Fill checkout information', async () => {
    await checkout.completeStepOne(user);

    await expect(page).toHaveURL(/checkout-step-two/);
  });

  await test.step('Finish order successfully', async () => {
    await checkout.finishOrder();

    await expect(checkout.successMessage).toHaveText(
      'Thank you for your order!'
    );
  });
});
