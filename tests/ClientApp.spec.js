const {test, expect} = require('@playwright/test');
//const { text } = require('node:stream/consumers');

//Without the word function this is considered a anonomous function
test('Browser Context Playwright Test', async ({page}) => {

    const email = "something123@yahoo.com"
    const productName = "iphone 13 pro"
    const countryName = " United States"
    const products = page.locator(".card-body")
    //Login to the website and clear any 
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill("Mdowdy79!");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle'); //All service calls are complete
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator('.card-body b').first().waitFor(); //Alternate to waitForLoadState method. Only waits for one element (use first() or last())
    const titles = await page.locator(".card-body b").allTextContents();
    //const first = await page.locator(".card-body b").first().textContent();
    console.log(titles) 
    
    const count = await products.count()
    //console.log(count)
    for(let i = 0; i < count; i++){
        if (await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text = Add To Cart").click()
            break
        }
    }

    await page.locator("[routerlink*='cart']").click()
    await page.locator("div li").first().waitFor()
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible()
    expect(bool).toBeTruthy()
    await page.locator("button[type='button']").last().click()
    await page.locator("[placeholder*='Country']").pressSequentially("United", {delay:100})
    const dropDown = page.locator(".ta-results")
    await dropDown.waitFor()
    const optionsCount = await dropDown.locator("button").count()
    console.log(optionsCount)
    for(let i = 0; i < optionsCount; i++){
        const text = await dropDown.locator("button").nth(i).textContent()
        if(text === countryName){
            await dropDown.locator("button").nth(i).click()
            break
        }
    }
    expect(page.locator(".mt-5 [type ='text']").first()).toHaveText(email)
    await page.locator(".action__submit").click()
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.")
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderID)

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

     for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderID.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderID.includes(orderIdDetails)).toBeTruthy();


   // await page.pause()
})

