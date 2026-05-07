import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
const { buildUser } = require('../../utils/userFactory');

test('complete purchase flow', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  const user = buildUser();

  // Login
  await login.open();
  await login.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);

  // Add product
  await inventory.addProduct('sauce-labs-backpack');
  await inventory.openCart();

  // Cart
  await cart.proceedToCheckout();

  // Checkout step 1
  await checkout.completeStepOne(user);

  await checkout.finishOrder();

  await expect(checkout.successMessage).toHaveText('Thank you for your order!');

  await expect(page).toHaveURL(/checkout-complete/);
});
