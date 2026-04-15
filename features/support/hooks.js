const playwright = require('@playwright/test');
const { PageObjectManager } = require('../../PageObjects/PageObjectManager')
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");



Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false })
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new PageObjectManager(this.page)
})

BeforeStep(function () {
    console.log("I am running now")

})

AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot.png' })
    }
})

After(async function () {

    console.log("I am the last to execute")
})