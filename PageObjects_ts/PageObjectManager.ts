import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { DashboardPage } from './DashboardPage'
import { VerifyOrdersPage } from './VerifyOrdersPage'
import { PlaceOrderPage } from './PlaceOrderPage'
import { OrderHistoryPage } from './OrderHistoryPage'
import { Locator } from '@playwright/test'

export class PageObjectManager {

    page: Page
    loginPage: LoginPage
    dashboardPage: DashboardPage
    verifyOrdersPage: VerifyOrdersPage
    placeOrderPage: PlaceOrderPage
    orderHistoryPage: OrderHistoryPage

    constructor(page: Page) {

        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.verifyOrdersPage = new VerifyOrdersPage(this.page)
        this.placeOrderPage = new PlaceOrderPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
    }

    getLoginPage() {

        return this.loginPage
    }

    getDashboardPage() {

        return this.dashboardPage
    }

    getVerifyOrderPage() {

        return this.verifyOrdersPage
    }

    getPlaceOrderPage() {

        return this.placeOrderPage
    }

    getOrderHistoryPage() {

        return this.orderHistoryPage
    }
}
module.exports = { PageObjectManager }