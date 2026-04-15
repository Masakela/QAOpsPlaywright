const { Given, When, Then } = require('@cucumber/cucumber')
const { PageObjectManager } = require('../../PageObjects/PageObjectManager')
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

 Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000}, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
   
    const products = this.page.locator(".card-body")
    this.username = username
    const loginPage = this.poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(username, password)
});

When('Add {string} to Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage()
    await this.dashboardPage.searchProductAddCart(productName)
    await this.dashboardPage.navigateToCart()
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const verifyOrderPage = this.poManager.getVerifyOrderPage()
    await verifyOrderPage.validateProductInCart(productName)
    await verifyOrderPage.clickCheckoutButton()
});

When('Enter valid details and Place Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const placeOrderPage = this.poManager.getPlaceOrderPage()
    await placeOrderPage.formFillCompletion('United', 'United States')
    await placeOrderPage.verifyEmailId(this.username)
    this.orderID = await placeOrderPage.placeOrderBtn()
});

Then('Verify order is present in Order History', async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderHistoryPage = this.poManager.getOrderHistoryPage()
    await orderHistoryPage.viewOrderHistory(this.orderID)
    expect(this.orderID.includes(await orderHistoryPage.getOrderID())).toBeTruthy()
});