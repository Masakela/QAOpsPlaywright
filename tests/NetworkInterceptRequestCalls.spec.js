import { test, expect } from '@playwright/test';



test('Network Request Intercept Security', async ({ page }) => {

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
    //await expect(page).toHaveTitle("Let's Shop");
    await page.locator('.card-body b').first().waitFor(); //Alternate to waitForLoadState method. Only waits for one element (use first() or last())
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69c97ecff86ba51a65349678fd9" })
    )
    await page.locator("button:has-text('View')").first().click()
    //await page.pause()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")
})