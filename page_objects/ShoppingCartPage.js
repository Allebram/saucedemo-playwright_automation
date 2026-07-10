class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }

  async removeProductFromCart(productName) {
    const removeButtonSelector = `button[name=remove-${productName}]`;
    await this.page.click(removeButtonSelector);
  }

  async continueShopping() {
    await this.page.click('.btn_secondary');
  }
  

  async checkout() {
    await this.page.click('.btn_action');
  }
}

module.exports = ShoppingCartPage;
