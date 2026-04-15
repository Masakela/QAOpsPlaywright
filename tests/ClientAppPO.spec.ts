import {test, expect} from '@playwright/test'
import {customTest} from '../Utils_ts/test-base'
import { PageObjectManager } from '../PageObjects_ts/PageObjectManager'
//const { PlaceOrderPage } = require('../PageObjects/PlaceOrderPage')
const dataset = JSON.parse(JSON.stringify(require('../Utils/PlaceOrderTestData.json')))

//test.describe.configure({mode: "parallel"}) //Controls how test are executed
for(const data of dataset){
    test(`Page Object ${data.productName}`, async ({ page}) => {

        const poManager = new PageObjectManager(page)
        const products = page.locator(".card-body")
        const loginPage = poManager.getLoginPage()
        await loginPage.goTo()
        await loginPage.validLogin(data.username, data.password)
        const dashboardPage = poManager.getDashboardPage()
        await dashboardPage.searchProductAddCart(data.productName)
        await dashboardPage.navigateToCart()
        const verifyOrderPage = poManager.getVerifyOrderPage()
        await verifyOrderPage.validateProductInCart(data.productName)
        await verifyOrderPage.clickCheckoutButton()
        const placeOrderPage = poManager.getPlaceOrderPage()
        await placeOrderPage.formFillCompletion('United', 'United States')
        let orderID: any
        await placeOrderPage.verifyEmailId(data.username)
        orderID = await placeOrderPage.placeOrderBtn()
        const orderHistoryPage = poManager.getOrderHistoryPage()
        await orderHistoryPage.viewOrderHistory(orderID)
        expect(orderID.includes(await orderHistoryPage.getOrderID())).toBeTruthy()
    })
}
