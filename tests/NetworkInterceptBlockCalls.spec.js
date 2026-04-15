const {test, expect} = require('@playwright/test');


//Without the word function this is considered a anonomous function
test('Abort Network Call Before reching Server', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route("**/*.css", route => route.abort()) //Blocking a single extention
    page.route("**/*.{jpg,png,jpeg}", route => route.abort()) //Blocking multiple extentions
    const userName = page.locator("#username")
    const signIn = page.locator("#signInBtn")
    page.on("request", request=>console.log(request.url()))
    page.on("response", response=>console.log(response.url(), response.status()))
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent())
    //await expect(page.locator("[style*='block']")).toContainText('Incorrect');
     
})

