//import { expect } from '@playwright/test'
const {expect} = require('@playwright/test');

class VerifyOrdersPage {

    constructor(page) {

        this.page = page
        this.checkoutBtn = page.locator("button[type='button']")

    }

    async validateProductInCart(productName) {

        const bool = await this.page.locator(`h3:has-text("${productName}")`).isVisible()
        expect(bool).toBeTruthy()
    }

    async clickCheckoutButton() {

        await this.checkoutBtn.last().click()
    }


}
module.exports = { VerifyOrdersPage }