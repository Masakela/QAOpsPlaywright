class OrderHistoryPage {

    constructor(page) {

        this.page = page
        this.orderHistory = page.locator("button[routerlink*='myorders']")
        this.orderTable = page.locator("tbody")
        this.rows = page.locator("tbody tr")
        this.orderdIdDetails = page.locator(".col-text");
    }

    async viewOrderHistory(orderID) {

        await this.orderHistory.click();
        await this.orderTable.waitFor()

        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderID = await this.rows.nth(i).locator("th").textContent()
            console.log(rowOrderID)
            if (orderID.includes(rowOrderID)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }



    async getOrderID() {

        return await this.orderdIdDetails.textContent()
    }
}
module.exports = { OrderHistoryPage }