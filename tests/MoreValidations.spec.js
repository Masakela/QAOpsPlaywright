const { test, expect } = require('@playwright/test')

test("Popup Validations", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    //await page.goto("https://google.com")
    //await page.goBack() //Click the back arrow on the browser
    //await page.goForward() //Click the forward arrow on the browser

    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    //await page.pause()
    page.on("dialog", dialog => dialog.accept()) //Listens then handles popup dialig boxes
    //page.on("dialog", dialog => dialog.dismiss()) //Listens then handles popup dialig boxes
    await page.locator("#confirmbtn").click()
    await page.locator("#mousehover").hover()

    const framesPage = page.frameLocator("#courses-iframe")
    await framesPage.locator("li a[href*='lifetime-access']").click()


    //await page.pause()

})

test('Screenshot', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#displayed-text").screenshot({ path: 'partialscreenshot.png' })
    await page.locator("#hide-textbox").click()
    await page.screenshot({ path: "screenshot.png" }) //Taking a screenshot of a test
    await expect(page.locator("#displayed-text")).toBeHidden()
})

test.skip('Visual', async ({ page }) => {

    await page.goto("https://www.google.com/")
    expect(await page.screenshot()).toMatchSnapshot('google.png')
})