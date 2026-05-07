export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartBadge = '.shopping_cart_badge';
    this.cartItems = '.cart_item';
    this.cartItemNames = '.inventory_item_name';

    this.cartTitle = '[data-test="title"]';
    this.checkoutButton = '#checkout';
    this.continueShoppingButton = '#continue-shopping';

    this.removeButton = (productId) => `[id="remove-${productId}"]`;
  }

  getCartBadge() {
    return this.page.locator(this.cartBadge);
  }

  getCartItems() {
    return this.page.locator(this.cartItems);
  }

  getCartItemNames() {
    return this.page.locator(this.cartItemNames);
  }

  getCartItemByName(name) {
    return this.page.locator(this.cartItemNames, {
      hasText: name,
    });
  }

  getCartTitle() {
    return this.page.locator(this.cartTitle);
  }

  async removeProduct(productId) {
    await this.page.click(this.removeButton(productId));
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }
}
