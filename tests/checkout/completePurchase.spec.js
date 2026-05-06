import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('complete purchase flow', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Login
  await login.open();
  await login.login(process.env.USER, process.env.PASSWORD);

  // Add product
  await inventory.addProduct('sauce-labs-backpack');
  await inventory.openCart();

  // Cart
  await cart.proceedToCheckout();

  // Checkout step 1
  await checkout.fillInformation('John', 'Doe', '12345');

  // Finish
  await checkout.finishOrder();

  // Assertion
  await expect(await checkout.getSuccessMessage()).toHaveText(
    'Thank you for your order!'
  );
});
