//import { expect } from '@playwright/test';
const {expect} = require('@playwright/test');

class PlaceOrderPage {

    constructor(page) {

        this.page = page
        this.country = page.locator("[placeholder*='Country']")
        this.countryDropdown = page.locator(".ta-results")
        this.userNameText = page.locator(".mt-5 [type ='text']").first()
        this.placeOrderButton = page.locator(".action__submit")
        this.submit =  page.locator(".action__submit");
        this.orderConfirmation = page.locator(".hero-primary")
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted")

    }

    async formFillCompletion(typedText, countryname) {

        await this.country.pressSequentially(typedText, { delay: 100 })
        await this.countryDropdown.waitFor()
        const optionsCount = await this.countryDropdown.locator("button").count()
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.countryDropdown.locator("button").nth(i).textContent()
            console.log(text)
            if (text.trim() === countryname) {
                await this.countryDropdown.locator("button").nth(i).click()
                break
            }
        }
    }

    async verifyEmailId(username){

        await expect(this.userNameText).toHaveText(username)
    }
    

    async placeOrderBtn() {

        await this.placeOrderButton.click()
        await expect(this.orderConfirmation).toHaveText(" Thankyou for the order.")
        return await this.orderID.textContent()

    }
}
module.exports = { PlaceOrderPage }