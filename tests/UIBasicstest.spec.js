const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

//Without the word function this is considered a anonomous function
test('Browser Context Playwright Test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
     
})

//Passing the Page fixture eliminates the two lines above
test('Page Playwright Test', async ({page}) => {

    await page.goto("https://google.com")
    console.log (await page.title());
    await expect(page).toHaveTitle("Google");
     
})

test('UI Controls', async ({page}) => {

    const dropdown = page.locator('select.form-control')
    const blinkingTextLink = page.locator("[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator('#username').fill("rahulshettyacademy")
    await page.locator("[type='password']").fill("Learning@830$3mK2")
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    await expect(page.locator('.radiotextsty').last()).toBeChecked()
    await dropdown.selectOption("teach")
    await expect(dropdown).toContainText('Teacher')
    await page.locator('#terms').click()
    expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
    await expect(blinkingTextLink).toHaveAttribute('class', 'blinkingText')
    /* const actualResult = await page.locator('#terms').isChecked()
    console.log(actualResult)
    expect(actualResult).toEqual(false) */
    //await page.pause() //Stops execution and opens a debug window
    await page.locator('#signInBtn').click()

    //await page.locator('#signInBtn').click()

})

test('Handling child windows', async ({browser}) => {

    const actualText = null
    const expectedText = "rahulshettyacademy.com"
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const blinkingTextLink = page.locator("[href*='documents-request']")

    const [newPage] = await Promise.all([ //This will make sure both promises are fullfilled befor exited this block of code
        context.waitForEvent('page'), //Listen for a new page to be opened
        blinkingTextLink.click(), //Opens in new tab
    ])
     const text = await newPage.locator('.red').textContent()
     const arrayText = text.split("@") //This will split the text at the delimiter as an array
     const domain = arrayText[1].split(" ")[0]
     //console.log(domain)
     

    //await page.bringToFront()
    await page.locator('#username').fill(domain)
    expect(domain).toEqual(expectedText)

    //Use inputValue instead of textContent after the DOM has been opened
    console.log(await page.locator('#username').inputValue())
    //await page.pause()
})