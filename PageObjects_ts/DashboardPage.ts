import { Locator, Page } from '@playwright/test';

export class DashboardPage {

    page: Page
    products: Locator
    productsText: Locator
    cartBtnLink: Locator

    constructor(page:Page) {

        this.page = page
        this.products = page.locator(".card-body ")
        this.productsText = page.locator(".card-body b")
        this.cartBtnLink = page.locator("[routerlink*='cart']")
    }

    async searchProductAddCart(productName:string) {

        const titles = await this.productsText.allTextContents();
        console.log(titles)
        const count = await this.products.count()

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text = Add To Cart").click()
                break
            }
        }
    }

    async navigateToCart() {

        await this.cartBtnLink.click()
        await this.page.locator("div li").first().waitFor()
    }

}
module.exports = { DashboardPage }