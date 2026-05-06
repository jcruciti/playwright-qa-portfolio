export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // step 1
    this.firstName = '#first-name';
    this.lastName = '#last-name';
    this.postalCode = '#postal-code';
    this.continueButton = '#continue';
    this.cancelButton = '#cancel';
    this.listPrices = '.inventory_item_price';

    // step 2
    this.finishButton = '#finish';
    this.successMessage = '.complete-header';
    this.checkoutSummaryContainer = '.checkout_summary_container';
  }

  async fillInformation(user) {
    await this.page.fill(this.firstName, user.firstName);
    await this.page.fill(this.lastName, user.lastName);
    await this.page.fill(this.postalCode, user.zip);
    await this.page.click(this.continueButton);
  }

  getFirstName() {
    return this.page.locator(this.firstName);
  }

  async cancelOrder() {
    await this.page.click(this.cancelButton);
  }

  async continueToStepTwo() {
    await this.page.click(this.continueButton);
  }

  getSuccessMessage() {
    return this.page.locator(this.successMessage);
  }

  getCheckoutSummaryContainer() {
    return this.page.locator(this.checkoutSummaryContainer);
  }

  getListPrices() {
    return this.page.locator(this.listPrices);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }
}
