import { test, expect } from '@playwright/test';
import { expectSortedText } from '../utils/assertSorted';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('inventory tests', () => {
  let login;
  let inventory;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);

    await login.open();
    await login.login('standard_user', 'secret_sauce');
  });

  test('should display list of available products', async ({ page }) => {
    await expect(inventory.getInventoryItem()).not.toHaveCount(0);
  });

  test('should add product to cart', async ({ page }) => {
    await inventory.addProduct('sauce-labs-backpack');
    await expect(
      page.locator(inventory.removeButton('sauce-labs-backpack'))
    ).toHaveText('Remove');
    await expect(inventory.getCartBadge()).toHaveCount(1);
  });

  test('should remove product from cart', async ({ page }) => {
    //add product first
    await inventory.addProduct('sauce-labs-backpack');

    //then remove it
    await inventory.removeProduct('sauce-labs-backpack');

    await expect(
      inventory.getAddToCartButton('sauce-labs-backpack')
    ).toHaveText('Add to cart');
    await expect(inventory.getCartBadge()).toHaveCount(0);
  });

  test('should redirect to shopping cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await inventory.openCart();

    //Validate navigation
    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.getCartTitle()).toBeVisible();
  });

  test('should persist cart data after page reload', async ({ page }) => {
    // Add product
    await inventory.addProduct('sauce-labs-backpack');

    // Reload page
    await page.reload();

    // Validate cart state persists
    await expect(inventory.getCartBadge()).toHaveCount(1);
    await expect(inventory.getCartBadge()).toHaveText('1');
  });

  test('should persist cart data after login session restart', async ({
    page,
  }) => {
    // Add product
    await inventory.addProduct('sauce-labs-backpack');

    // Logout
    await inventory.openMenu();
    await login.logout();

    // New session
    await login.open();
    await login.login('standard_user', 'secret_sauce');

    const inventoryAfterLogin = new InventoryPage(page);

    // Validate persistence
    await expect(inventoryAfterLogin.getCartBadge()).toHaveText('1');
  });

  test('should sort products A to Z correctly', async ({ page }) => {
    const items = page.locator(inventory.getInventoryItemName());

    await expectSortedText(items, 'asc');
  });

  test('should sort products Z to A correctly', async ({ page }) => {
    const items = page.locator(inventory.getInventoryItemName());

    await expectSortedText(items, 'desc');
  });

  test('should sort prices low to high', async ({ page }) => {
    const prices = page.locator(inventory.getInventoryItemName());

    await expectSortedNumbers(prices, 'asc');
  });
});
