const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
      this.page = page;
    }
  
    async fillCheckoutInformation(firstName, lastName, zipCode) {
      await this.page.fill('#first-name', firstName);
      await this.page.fill('#last-name', lastName);
      await this.page.fill('#postal-code', zipCode);
    }

    async clickContinue() {
      await this.page.click('#continue');
    }

    async verifyCheckoutInformation(firstName, lastName, zipCode) {
      await expect(this.page.locator('#first-name')).toHaveValue(firstName);
      await expect(this.page.locator('#last-name')).toHaveValue(lastName);
      await expect(this.page.locator('#postal-code')).toHaveValue(zipCode);
    }
  
    async verifyOrderSummary(productName, price) {
      await expect(this.page.locator('.inventory_item_name')).toHaveText(productName);
      await expect(this.page.locator('.inventory_item_price')).toHaveText(price);
    }

    async verifyOrderTotals(itemTotal, tax, total) {
      await expect(this.page.locator('.summary_subtotal_label')).toHaveText(`Item total: ${itemTotal}`);
      await expect(this.page.locator('.summary_tax_label')).toHaveText(`Tax: ${tax}`);
      await expect(this.page.locator('.summary_total_label')).toHaveText(`Total: ${total}`);
    }
  
    async completePurchase() {
      await this.page.click('#finish');
    }

    async isPurchaseSuccessful() {
        // Define a selector that represents a confirmation element after a successful purchase
        const confirmationSelector = '.complete-header';
        
        try {
          await this.page.waitForSelector(confirmationSelector, { state: 'visible' });
          return true; // Successful purchase confirmation is visible
        } catch (error) {
          return false; // Confirmation is not visible, indicating an unsuccessful purchase
        }
      }
  }
  
  module.exports = CheckoutPage;
  