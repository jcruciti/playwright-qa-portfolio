import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Shopping Cart', () => {
  let inventoryPage;
  let cartPage;

  const PRODUCTS = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'test.allthethings()-t-shirt-(red)',
  ];

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await login.open();
    await login.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);
  });

  test('the quantity of products on the list should match the cart badge', async () => {
    //Add products
    for (const product of PRODUCTS) {
      await inventoryPage.addProduct(product);
    }

    await inventoryPage.openCart();

    await expect(cartPage.getCartItems()).toHaveCount(4);

    const itemsCount = await cartPage.getCartItems().count();

    //Validate
    await expect(cartPage.getCartBadge()).toHaveText(`${itemsCount}`);
  });

  test('should remove product from cart', async () => {
    const productToRemove = 'test.allthethings()-t-shirt-(red)';

    const removedProductName = 'Test.allTheThings() T-Shirt (Red)';

    const expectedCount = PRODUCTS.length - 1;

    // Add products
    for (const product of PRODUCTS) {
      await inventoryPage.addProduct(product);
    }

    // Open cart
    await inventoryPage.openCart();

    // Validate initial cart state
    await expect(cartPage.getCartItems()).toHaveCount(PRODUCTS.length);

    await expect(cartPage.getCartBadge()).toHaveText(String(PRODUCTS.length));

    // Remove product
    await cartPage.removeProduct(productToRemove);

    // Validate badge count updated
    await expect(cartPage.getCartBadge()).toHaveText(String(expectedCount));

    // Validate removed product no longer exists
    await expect(cartPage.getCartItemByName(removedProductName)).toHaveCount(0);

    // Validate final cart state
    await expect(cartPage.getCartItems()).toHaveCount(expectedCount);
  });

  test('should navigate back to inventory page from cart', async ({ page }) => {
    //Go to Cart
    await inventoryPage.openCart();

    //Click continue shopping
    await cartPage.continueShopping();

    //Validate navigation
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.getInventoryList()).toBeVisible();
  });

  test('should go to checkout page', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Add products
    for (const product of PRODUCTS) {
      await inventoryPage.addProduct(product);
    }

    // Go to cart
    await inventoryPage.openCart();

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Validate navigation
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(cartPage.getCartTitle()).toBeVisible();
  });

  test('should show empty cart when no items are added', async () => {
    await inventoryPage.openCart();

    await expect(cartPage.getCartItems()).toHaveCount(0);
  });
});
