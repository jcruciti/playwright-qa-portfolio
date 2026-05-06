export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.productTitle = '.title';
    this.cartBadge = '.shopping_cart_badge';
    this.addToCartButton = (productId) => `[id="add-to-cart-${productId}"]`;
    this.removeButton = (productId) => `[id="remove-${productId}"]`;
    this.cartIcon = '.shopping_cart_link';
    this.menuButton = '#react-burger-menu-btn';
    this.inventoryList = '.inventory_list';
    this.inventoryItem = '[data-test="inventory-item"]';
    this.inventoryItemName = '.inventory_item_name';
    this.productSortSelect = '[data-test="product-sort-container"]';
  }

  async addProduct(productId) {
    await this.page.click(this.addToCartButton(productId));
  }

  async removeProduct(productId) {
    await this.page.click(this.removeButton(productId));
  }

  getAddToCartButton(productId) {
    return this.page.locator(this.addToCartButton(productId));
  }

  getCartBadge() {
    return this.page.locator(this.cartBadge);
  }

  getInventoryList() {
    return this.page.locator(this.inventoryList);
  }

  getInventoryItem() {
    return this.page.locator(this.inventoryItem);
  }

  getInventoryItemName() {
    return this.page.locator(this.inventoryItemName);
  }

  async openCart() {
    await this.page.click(this.cartIcon);
  }

  async getCartCount() {
    return this.page.locator(this.cartBadge);
  }

  async openMenu() {
    return this.page.click(this.menuButton);
  }

  sortBy(sort) {
    return this.page.locator(this.productSortSelect).selectOption(sort);
  }
}
