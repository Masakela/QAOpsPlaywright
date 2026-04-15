const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils')
//const { text } = require('node:stream/consumers');

const loginPayLoad = {userEmail:"something123@yahoo.com",userPassword:"Mdowdy79!"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

let response

test.beforeAll( async () => {

    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)

})

//Without the word function this is considered a anonomous function
test('Place Order with help of API', async ({page}) => {

    page.addInitScript(value => {

        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

     for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderID.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      } 
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.orderID.includes(orderIdDetails)).toBeTruthy();


   // await page.pause()
})


