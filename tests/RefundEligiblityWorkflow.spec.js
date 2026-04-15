import {test, expect}  from '@playwright/test';

const BASE_URL = "https://eventhub.rahulshettyacademy.com"
const userEmail = "something@somwhere.com"
const userpw = "Mdowdy79!"

async function loginAndGoToBooking(page){
   
    await page.goto(`${BASE_URL}/login`)
    await page.getByPlaceholder("you@email.com").fill(userEmail)
    await page.getByLabel("Password").fill(userpw)
    await page.locator("#login-btn").click()
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    //await page.goto(`${BASE_URL}/events`)
}

test('Event Refund Eligible', async ({page}) => {

    await loginAndGoToBooking(page)
    const eventCards = page.getByTestId("event-card")
    await expect(eventCards.first()).toBeVisible();
    page.locator(await eventCards.first().locator("#book-now-btn").click())

    const ticketCount = page.locator("#ticket-count")
    //console.log(ticketCount)
    await expect(ticketCount).toHaveText("1")
    await page.getByLabel('Full Name').fill('Masakela Layrock')
    await page.locator('#customer-email').fill(userEmail)
    await page.getByPlaceholder('+91 98765 43210').fill('1235679055')
    await page.locator('.confirm-booking-btn').click()

    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`)
    const bookingCards = page.locator(".mb-8 #booking-card")
    page.locator(await bookingCards.first().getByRole('button', { name: 'View Details' }).click())
    await expect(page.getByText('Booking Information')).toBeVisible()

    const bookingRef = await page.locator('span.font-mono.font-bold').innerText()
    const eventTitle = await page.locator('h1').innerText()
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0))
    await page.locator("#check-refund-btn").click()

    await expect(page.locator('#refund-spinner')).toBeVisible()
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 })

    const result = page.locator("#refund-result")
    await expect(page.getByText('Eligible for refund.')).toBeVisible()
    await expect(result).toContainText("Single-ticket bookings qualify for a full refund.")

   
    //console.log(bookingRef.charAt(0))
    //console.log(eventTitle.charAt(0))



    //await page.pause()
})

test('Event Refund Ineligible', async ({page}) => {

    await loginAndGoToBooking(page)
    const eventCards = page.getByTestId("event-card")
    await expect(eventCards.first()).toBeVisible();
    page.locator(await eventCards.first().locator("#book-now-btn").click())

    const ticketCount = page.locator("#ticket-count")
    //console.log(ticketCount)
    await expect(ticketCount).toHaveText("1")
    await page.locator(".w-9.h-9").last().click()
    await page.locator(".w-9.h-9").last().click()
    await page.getByLabel('Full Name').fill('Masakela Layrock')
    await page.locator('#customer-email').fill(userEmail)
    await page.getByPlaceholder('+91 98765 43210').fill('1235679055')
    await page.locator('.confirm-booking-btn').click()

    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`)
    const bookingCards = page.locator(".mb-8 #booking-card")
    page.locator(await bookingCards.first().getByRole('button', { name: 'View Details' }).click())
    await expect(page.getByText('Booking Information')).toBeVisible()

    const bookingRef = await page.locator('span.font-mono.font-bold').innerText()
    const eventTitle = await page.locator('h1').innerText()
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0))
    await page.locator("#check-refund-btn").click()

    await expect(page.locator('#refund-spinner')).toBeVisible()
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 })

    const result = page.locator("#refund-result")
    await expect(page.getByText('Not eligible for refund.')).toBeVisible()
    await expect(result).toContainText(" Group bookings (3 tickets) are non-refundable.")

   
    //console.log(bookingRef.charAt(0))
    //console.log(eventTitle.charAt(0))



    //await page.pause()
})