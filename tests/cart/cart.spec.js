import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Shopping Cart', () => {
  let inventoryPage;
  let cartPage;

  const USER = process.env.SAUCE_USER;
  const PASSWORD = process.env.SAUCE_PASSWORD;

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

    await loginPage.open();

    await loginPage.login(USER, PASSWORD);
  });

  test('should display the correct cart badge quantity', async () => {
    await test.step('Add products to cart', async () => {
      await inventoryPage.addProducts(PRODUCTS);
    });

    await test.step('Open cart page', async () => {
      await inventoryPage.openCart();
    });

    let cartItemsCount;

    await test.step('Validate cart items quantity', async () => {
      await expect(cartPage.getCartItems()).toHaveCount(PRODUCTS.length);

      cartItemsCount = await cartPage.getCartItems().count();
    });

    await test.step('Validate cart badge quantity', async () => {
      await expect(cartPage.getCartBadge()).toHaveText(String(cartItemsCount));
    });
  });

  test('should remove product from cart', async () => {
    const productToRemove = 'test.allthethings()-t-shirt-(red)';

    const removedProductName = 'Test.allTheThings() T-Shirt (Red)';

    const expectedCount = PRODUCTS.length - 1;

    await test.step('Add products to cart', async () => {
      await inventoryPage.addProducts(PRODUCTS);
    });

    await test.step('Open cart page', async () => {
      await inventoryPage.openCart();
    });

    await test.step('Validate initial cart state', async () => {
      await expect(cartPage.getCartItems()).toHaveCount(PRODUCTS.length);

      await expect(cartPage.getCartBadge()).toHaveText(String(PRODUCTS.length));
    });

    await test.step('Remove product from cart', async () => {
      await cartPage.removeProduct(productToRemove);
    });

    await test.step('Validate cart badge updated', async () => {
      await expect(cartPage.getCartBadge()).toHaveText(String(expectedCount));
    });

    await test.step('Validate removed product no longer exists', async () => {
      await expect(cartPage.getCartItemByName(removedProductName)).toHaveCount(
        0
      );
    });

    await test.step('Validate final cart state', async () => {
      await expect(cartPage.getCartItems()).toHaveCount(expectedCount);
    });
  });

  test('should navigate back to inventory page from cart', async ({ page }) => {
    await test.step('Open cart page', async () => {
      await inventoryPage.openCart();
    });

    await test.step('Click continue shopping button', async () => {
      await cartPage.continueShopping();
    });

    await test.step('Validate navigation back to inventory page', async () => {
      await expect(page).toHaveURL(/inventory/);

      await expect(inventoryPage.getInventoryList()).toBeVisible();
    });
  });

  test('should go to checkout page', async ({ page }) => {
    await test.step('Add products to cart', async () => {
      await inventoryPage.addProducts(PRODUCTS);
    });

    await test.step('Open cart page', async () => {
      await inventoryPage.openCart();
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
    });

    await test.step('Validate checkout page navigation', async () => {
      await expect(page).toHaveURL(/checkout-step-one/);
    });
  });

  test('should show empty cart when no items are added', async () => {
    await test.step('Open cart page', async () => {
      await inventoryPage.openCart();
    });

    await test.step('Validate empty cart', async () => {
      await expect(cartPage.getCartItems()).toHaveCount(0);
    });
  });
});
