import { Locator, Page } from '@playwright/test';

export class LoginPage {

    page: Page
    userName: Locator    
    password: Locator
    signInButton: Locator

    constructor(page:Page) {

        this.page = page
        this.userName = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.signInButton = page.locator("[value='Login']")

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(username:string, password:string) {

        await this.userName.fill(username)
        await this.password.fill(password)
        await this.signInButton.click()
        await this.page.waitForLoadState('networkidle'); //All service calls are complete
    }


}
module.exports = { LoginPage }
