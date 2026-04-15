import { expect, Locator, Page } from '@playwright/test'

export class VerifyOrdersPage {

    page: Page
    checkoutBtn: Locator

    constructor(page: Page) {

        this.page = page
        this.checkoutBtn = page.locator("button[type='button']")

    }

    async validateProductInCart(productName:string) {

        const bool = await this.page.locator(`h3:has-text("${productName}")`).isVisible()
        expect(bool).toBeTruthy()
    }

    async clickCheckoutButton() {

        await this.checkoutBtn.last().click()
    }


}
module.exports = { VerifyOrdersPage }