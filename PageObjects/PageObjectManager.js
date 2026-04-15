const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage')
const { VerifyOrdersPage } = require('./VerifyOrdersPage')
const { PlaceOrderPage } = require('./PlaceOrderPage')
const { OrderHistoryPage } = require("./OrderHistoryPage")

class PageObjectManager {

    constructor(page) {

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

    getOrderHistoryPage(){

        return this.orderHistoryPage
    }
}
module.exports = { PageObjectManager }