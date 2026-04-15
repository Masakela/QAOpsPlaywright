const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils')
//const { text } = require('node:stream/consumers');

const loginPayLoad = {userEmail:"something123@yahoo.com",userPassword:"Mdowdy79!"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};
const mockPayLoadOrders = {data:[],"message":"No Orders"}
const emptyOrderMsg = "You have No Orders to show at this time"

let response

test.beforeAll( async () => {

    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)

})

//Without the word function this is considered a anonomous function
test('Intercepting network Response calls', async ({page}) => {

    page.addInitScript(value => {

        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route =>
        {
            //Intercepting the responses
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(mockPayLoadOrders)
            route.fulfill({   //Fulfill method sends the response back to the browser to be rendered on the frontend
                response,
                body,
            })
        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    //await page.pause()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")  
    //const actualMsg = await page.locator(".mt-4").textContent();
    //const actualMsg = page.locator(".mt-4")
    //console.log(actualMsg)
    //await expect(actualMsg).toContainText(emptyOrderMsg)
    await expect(page.locator(".mt-4")).toContainText(emptyOrderMsg)
})


