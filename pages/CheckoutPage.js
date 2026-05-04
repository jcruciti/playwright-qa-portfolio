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
    this.checkouSummaryContainer  = '.checkout_summary_container';
  }

  async fillInformation(first, last, zip) {
    await this.page.fill(this.firstName, first);
    await this.page.fill(this.lastName, last);
    await this.page.fill(this.postalCode, zip);
    await this.page.click(this.continueButton);
  }

  getFirstName (){
    return this.page.locator(this.firstName);
  }

  async cancelOrder(){
    await this.page.click(this.cancelButton);
  }

  async continueToStepTwo(){
    await this.page.click(this.continueButton);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  getSuccessMessage() {
    return this.page.locator(this.successMessage);
  }

  getCheckouSummaryContainer(){
    return this.page.locator(this.checkouSummaryContainer);
  }

  getListPrices(){
    return this.page.locator(this.listPrices)
  }
}