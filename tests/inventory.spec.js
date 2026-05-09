import { test, expect } from '@playwright/test';
import { expectSortedText, expectSortedNumbers } from '../utils/assertSorted';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Inventory', () => {
  let login;
  let inventory;

  const user = process.env.SAUCE_USER;
  const pass = process.env.SAUCE_PASSWORD;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);

    inventory = new InventoryPage(page);

    await page.goto('/inventory.html');
  });

  test('should display list of available products', async () => {
    await test.step('Validate inventory list is displayed', async () => {
      await expect(inventory.getInventoryItem()).not.toHaveCount(0);
    });
  });

  test('should add product to cart', async ({ page }) => {
    await test.step('Add product to cart', async () => {
      await inventory.addProduct('sauce-labs-backpack');
    });

    await test.step('Validate product was added to cart', async () => {
      await expect(
        page.locator(inventory.removeButton('sauce-labs-backpack'))
      ).toHaveText('Remove');

      await expect(inventory.getCartBadge()).toHaveCount(1);
    });
  });

  test('should remove product from cart', async () => {
    await test.step('Add product to cart', async () => {
      await inventory.addProduct('sauce-labs-backpack');
    });

    await test.step('Remove product from cart', async () => {
      await inventory.removeProduct('sauce-labs-backpack');
    });

    await test.step('Validate product was removed from cart', async () => {
      await expect(
        inventory.getAddToCartButton('sauce-labs-backpack')
      ).toHaveText('Add to cart');

      await expect(inventory.getCartBadge()).toHaveCount(0);
    });
  });

  test('should redirect to shopping cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step('Open shopping cart page', async () => {
      await inventory.openCart();
    });

    await test.step('Validate navigation to cart page', async () => {
      await expect(page).toHaveURL(/cart/);

      await expect(cartPage.getCartTitle()).toBeVisible();
    });
  });

  test('should persist cart data after page reload', async ({ page }) => {
    await test.step('Add product to cart', async () => {
      await inventory.addProduct('sauce-labs-backpack');
    });

    await test.step('Reload page', async () => {
      await page.reload();
    });

    await test.step('Validate cart data persists after reload', async () => {
      await expect(inventory.getCartBadge()).toHaveCount(1);

      await expect(inventory.getCartBadge()).toHaveText('1');
    });
  });

  test('should persist cart data after login session restart', async ({
    page,
  }) => {
    await test.step('Add product to cart', async () => {
      await inventory.addProduct('sauce-labs-backpack');
    });

    await test.step('Logout from application', async () => {
      await inventory.openMenu();

      await login.logout();
    });

    await test.step('Start a new login session', async () => {
      await login.open();

      await login.login(user, pass);
    });

    const inventoryAfterLogin = new InventoryPage(page);

    await test.step('Validate cart data persists after new session', async () => {
      await expect(inventoryAfterLogin.getCartBadge()).toHaveText('1');
    });
  });

  test('should sort products A to Z correctly', async () => {
    let itemsLocator;

    await test.step('Sort products from A to Z', async () => {
      await inventory.sortBy('az');
    });

    await test.step('Validate products are sorted alphabetically ascending', async () => {
      itemsLocator = inventory.getInventoryItem();

      await expect(itemsLocator.first()).toBeVisible();

      await expectSortedText(itemsLocator, 'asc');
    });
  });

  test('should sort products Z to A correctly', async () => {
    let itemsLocator;

    await test.step('Sort products from Z to A', async () => {
      await inventory.sortBy('za');
    });

    await test.step('Validate products are sorted alphabetically descending', async () => {
      itemsLocator = inventory.getInventoryItem();

      await expect(itemsLocator.first()).toBeVisible();

      await expectSortedText(itemsLocator, 'desc');
    });
  });

  test('should sort prices low to high', async () => {
    let itemsLocator;

    await test.step('Sort prices from low to high', async () => {
      await inventory.sortBy('lohi');
    });

    await test.step('Validate prices are sorted ascending', async () => {
      itemsLocator = inventory.getInventoryItem();

      await expect(itemsLocator.first()).toBeVisible();

      await expectSortedNumbers(itemsLocator, 'asc');
    });
  });

  test('should sort prices high to low', async () => {
    let itemsLocator;

    await test.step('Sort prices from high to low', async () => {
      await inventory.sortBy('hilo');
    });

    await test.step('Validate prices are sorted descending', async () => {
      itemsLocator = inventory.getInventoryItem();

      await expect(itemsLocator.first()).toBeVisible();

      await expectSortedNumbers(itemsLocator, 'desc');
    });
  });
});
