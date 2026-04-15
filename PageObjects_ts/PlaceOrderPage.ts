import { expect, Locator, Page } from '@playwright/test';

export class PlaceOrderPage {

    page: Page
    country: Locator
    countryDropdown: Locator
    userNameText: Locator
    placeOrderButton: Locator
    submit: Locator
    orderConfirmation: Locator
    orderID: Locator

    constructor(page:Page) {

        this.page = page
        this.country = page.locator("[placeholder*='Country']")
        this.countryDropdown = page.locator(".ta-results")
        this.userNameText = page.locator(".mt-5 [type ='text']").first()
        this.placeOrderButton = page.locator(".action__submit")
        this.submit =  page.locator(".action__submit");
        this.orderConfirmation = page.locator(".hero-primary")
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted")

    }

    async formFillCompletion(typedText:string, countryname:string) {

        await this.country.pressSequentially(typedText, { delay: 100 })
        await this.countryDropdown.waitFor()
        const optionsCount = await this.countryDropdown.locator("button").count()
        for (let i = 0; i < optionsCount; i++) {
            let text: any
            text = await this.countryDropdown.locator("button").nth(i).textContent()
            console.log(text)
            if (text.trim() === countryname) {
                await this.countryDropdown.locator("button").nth(i).click()
                break
            }
        }
    }

    async verifyEmailId(username:string){

        await expect(this.userNameText).toHaveText(username)
    }
    

    async placeOrderBtn() {

        await this.placeOrderButton.click()
        await expect(this.orderConfirmation).toHaveText(" Thankyou for the order.")
        return await this.orderID.textContent()

    }
}
module.exports = { PlaceOrderPage }