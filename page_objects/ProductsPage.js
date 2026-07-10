class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async addProductToCart(productName) {
    await this.page.click(`button[name=add-to-cart-${productName}]`);
  }

  async isRemoveButtonVisible(productName) {
  return await this.page.locator(`[data-test="remove-${productName}"]`).isVisible();
  }

  async goToShoppingCart() {
    const shoppingCartBadgeSelector = '.shopping_cart_badge';
    await this.page.waitForSelector(shoppingCartBadgeSelector, { timeout: 10000 });
    await this.page.click(shoppingCartBadgeSelector);
  }
  
  async verifyProductOnPage(productName) {
    return this.page.locator(`text=${productName}`).isVisible();
  }

  async isProductDisplayed(productName) {
    const productSelector = `text=${productName}`;
    return await this.page.isVisible(productSelector);
  }

  
}

module.exports = ProductsPage;
