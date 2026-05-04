import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage'; 
import { CheckoutPage } from '../../pages/CheckoutPage';


test.describe('shopping cart tests', () => {

    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await login.open();
        await login.login('standard_user', 'secret_sauce');
    });

    
    test('the quantity of products on the list should match the cart badge', async () =>{
        //Add product
        await inventoryPage.addProduct('sauce-labs-bolt-t-shirt');
        await inventoryPage.openCart();
        
        await expect(cartPage.getCartItems()).toHaveCount(1);
        //Count
        const itemsCount = await cartPage.getCartItems().count();

        //Validate
        await expect(cartPage.getCartBadge()).toHaveText(`${itemsCount}`);
    });

    test('should remove product from cart', async () => {
        //Add products
        await inventoryPage.addProduct('sauce-labs-backpack');
        await inventoryPage.addProduct('sauce-labs-bolt-t-shirt');

        //Go to Cart Page
        await inventoryPage.openCart();

        //Remove product from the list
        await cartPage.removeProduct('sauce-labs-backpack');

       //Count
        const itemsCount = await cartPage.getCartItems().count();

        //Validate list size matches badge number
        await expect(cartPage.getCartBadge()).toHaveText(String(itemsCount));
        
        //Product is not on the list anymore
        await expect(cartPage.getCartItems()).not.toContainText('sauce-labs-backpack');
    });

    test('should navigate back to inventory page from cart', async ({page}) =>{
        //Go to Cart 
        await inventoryPage.openCart();

        //Click continue shopping
        await cartPage.continueShopping();

        //Validate navigation
        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.getInventoryList()).toBeVisible();
    });

    test('should go to checkout page', async ({page}) => {
        const checkoutPage = new CheckoutPage(page);

        // Add product first
        await inventoryPage.addProduct('sauce-labs-backpack');

        // Go to cart
        await inventoryPage.openCart();

        // Proceed to checkout
        await cartPage.proceedToCheckout();

        // Validate navigation
        await expect(page).toHaveURL(/checkout-step-one/);
        await expect(checkoutPage.getFirstName()).toBeVisible();
    });

    test('should show empty cart when no items are added', async () => {
        await inventoryPage.openCart();

        await expect(cartPage.getCartItems()).toHaveCount(0);
    });

});