import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('checkout tests', () => {
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await login.open();
    await login.login('standard_user', 'secret_sauce');

    //Inventory Page  => Add products
    await inventoryPage.addProduct('sauce-labs-backpack');
    await inventoryPage.addProduct('sauce-labs-bike-light');
    await inventoryPage.addProduct('sauce-labs-bolt-t-shirt');
    await inventoryPage.addProduct('test.allthethings()-t-shirt-(red)');

    //Inventory Page  => Go to cart
    await inventoryPage.openCart();

    //Cart Page => Proceed to checkout
    await cartPage.proceedToCheckout();
  });

  test('verify calculated sum matches UI total', async ({ page }) => {
    //Fill Information
    await checkoutPage.fillInformation('Joe', 'Cruciti', '06120-080');

    const listPrices = checkoutPage.getListPrices();

    // Wait for the list to become visible
    await listPrices.first().waitFor();

    //Get all prices from product list
    const rawPrices = await listPrices.allInnerTexts();

    //Clean the strings and convert to number
    const numericPrices = rawPrices.map((price) =>
      parseFloat(price.replace(/[^0-9.]/g, ''))
    );

    //Sum them up
    const totalListSum = numericPrices.reduce(
      (accumulator, current) => accumulator + current,
      0
    );
    //console.log(`The total is: ${totalListSum}`);

    const rawTotalPriceUi = await page
      .locator('.summary_subtotal_label')
      .textContent();

    //clean string and convert
    const totalPriceUi = parseFloat(rawTotalPriceUi.replace(/[^0-9.]/g, ''));
    //console.log("priceTotalUI=" + totalPriceUi);

    //Verify if the Item total(UI) matches the list summed pices
    expect(totalListSum).toBeCloseTo(totalPriceUi);
  });

  test('should navigate back to cart page from checkout', async ({ page }) => {
    //Cancel Order
    await checkoutPage.cancelOrder();

    //Validate navigation
    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.getCartTitle()).toBeVisible();
  });

  test('should navigate to checkou step two', async ({ page }) => {
    //Fill Information
    await checkoutPage.fillInformation('Joe', 'Cruciti', '06120-080');

    //Validate navigation
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.getCheckouSummaryContainer()).toBeVisible();
  });

  test.describe('Checkout - required fields', () => {
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
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillInformation(
          data.firstName,
          data.lastName,
          data.zip
        );

        await checkoutPage.continueToStepTwo();

        const errorButton = page.locator('[data-test="error-button"]');

        await expect(errorButton).toBeVisible();
        console.log(data.message);
        await expect(errorButton).toContainText(data.message);
      });
    }
  });
});
