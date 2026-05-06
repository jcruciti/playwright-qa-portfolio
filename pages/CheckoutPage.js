export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');

    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');

    this.finishButton = page.locator('#finish');

    this.summaryContainer = page.locator('.checkout_summary_container');
    this.priceList = page.locator('.inventory_item_price');
    this.subtotalLabel = page.locator('.summary_subtotal_label');

    this.errorMessage = page.locator('[data-test="error"]');
    this.successMessage = page.locator('.complete-header');
  }

  async fillInformation(user = {}) {
    const { firstName = '', lastName = '', postalCode = '' } = user;

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async cancelOrder() {
    await this.cancelButton.click();
  }

  async continueToStepTwo() {
    await Promise.all([
      // this.page.waitForURL('**/checkout-step-two.html'),
      this.continueButton.click(),
    ]);

    // await this.summaryContainer.waitFor({ state: 'visible' });
  }

  async completeStepOne(user) {
    await this.fillInformation(user);
    await this.continueToStepTwo();
  }

  async finishOrder() {
    await this.finishButton.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL('**/checkout-complete.html'),
      this.finishButton.click(),
    ]);
  }

  async getPrices() {
    await this.priceList.first().waitFor({ state: 'visible' });

    const texts = await this.priceList.allInnerTexts();
    return texts.map((t) => Number(t.replace(/[^0-9.]/g, '')));
  }

  async getSubtotal() {
    await this.subtotalLabel.waitFor({ state: 'visible' });

    const text = await this.subtotalLabel.textContent();
    return Number((text || '').replace(/[^0-9.]/g, ''));
  }

  async assertSubtotalMatchesItems() {
    const prices = await this.getPrices();
    const calculated = prices.reduce((a, b) => a + b, 0);

    const uiTotal = await this.getSubtotal();

    return { calculated, uiTotal };
  }
}
