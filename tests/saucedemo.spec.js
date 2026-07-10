require('dotenv').config();
const { test, expect } = require('@playwright/test');
const assert = require('assert');
const LoginPage = require('../page_objects/LoginPage');
const ProductsPage = require('../page_objects/ProductsPage');
const ShoppingCartPage = require('../page_objects/ShoppingCartPage');
const CheckoutPage = require('../page_objects/CheckoutPage');


test('Complete SauceDemo checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Navigate to login page
  await page.goto('https://www.saucedemo.com/');

  // Login
  await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
  // Verify login was successful
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator('.title')).toHaveText('Products');

  // Test: Add a product to the cart
  await productsPage.addProductToCart('sauce-labs-bike-light');
  // verify the basket counter and the remove button
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  expect(await productsPage.isRemoveButtonVisible('sauce-labs-bike-light')).toBeTruthy();

  // Test: Go to the shopping cart
  await productsPage.goToShoppingCart();
  // Verify that a product is displayed on the product page
  const productToVerify = 'Sauce Labs Bike Light';
  expect(await productsPage.verifyProductOnPage(productToVerify)).toBeTruthy();

  // Remove product from cart
  await shoppingCartPage.removeProductFromCart('sauce-labs-bike-light');
  // Verify the product is no longer in the cart
  await expect(page.locator('.cart_item', { hasText: 'Sauce Labs Bike Light' })).toHaveCount(0);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

  // Go back to Products page
  await shoppingCartPage.continueShopping();
  // Verify navigation back to inventory page
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator('.title')).toHaveText('Products');

  // Test: Add a product to the cart
  await productsPage.addProductToCart('sauce-labs-backpack');
  // verify the basket counter and the remove button
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  expect(await productsPage.isRemoveButtonVisible('sauce-labs-backpack')).toBeTruthy();

  // Test: Go to the shopping cart
  await productsPage.goToShoppingCart();
  // Verify that a product is displayed on the product page
  const productToVerifyAgain = 'Sauce Labs Backpack';
  expect(await productsPage.verifyProductOnPage(productToVerifyAgain)).toBeTruthy();

  // Test: Proceeding to checkout from the shopping cart
  await shoppingCartPage.checkout();
  // Verify that the user is on the checkout page
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
  await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

  // Test: Filling out the checkout information
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  // Verify that the field are filled
  await checkoutPage.verifyCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinue();

  // Verify that the order summary is correct
  await checkoutPage.verifyOrderSummary('Sauce Labs Backpack', '$29.99');
  await checkoutPage.verifyOrderTotals('$29.99', '$2.40', '$32.39');

  // Test: Completing the purchase
  await checkoutPage.completePurchase();
  // Verify that the order is complete
  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
  assert.ok(await checkoutPage.isPurchaseSuccessful());
});