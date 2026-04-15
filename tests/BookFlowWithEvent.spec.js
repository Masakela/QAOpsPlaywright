import {test, expect}  from '@playwright/test';

const BASE_URL = "https://eventhub.rahulshettyacademy.com"
const userEmail = "something@somwhere.com"
const userpw = "Mdowdy79!"

async function login(page){

    await page.goto(`${BASE_URL}/login`)
    await page.getByPlaceholder("you@email.com").fill(userEmail)
    await page.getByLabel("Password").fill(userpw)
    await page.locator("#login-btn").click()
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}


test('Event HUB Booking Flow', async ({page}) => {

    await login(page) //Calling the helper function
    await page.goto(`${BASE_URL}/admin/events`)
    const eventTitle = `Another Event MML ${Date.now()}`

    await page.locator("#event-title-input").fill(eventTitle)
    await page.locator('#admin-event-form textarea').fill('This is a test');
    await page.getByLabel("City").fill("Chicago")
    await page.getByLabel("Venue").fill("McCormick Place")
    await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00')
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();
    await page.pause()

    console.log(`Created event: "${eventTitle}"`);
    await page.goto(`${BASE_URL}/events`);

    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first()).toBeVisible();
    const targetCard = eventCards.filter({ hasText: eventTitle });
    console.log(targetCard)
    //await page.pause()
    await expect(targetCard).toBeVisible({ timeout: 5000 })

    const seatsBeforeBooking = parseInt(await targetCard.getByText('available').first().innerText());
    console.log(`Seats before booking: ${seatsBeforeBooking}`)
    await targetCard.getByTestId('book-now-btn').click()
    

    const ticketCount = page.locator("#ticket-count")
    //console.log(ticketCount)
    await expect(ticketCount).toHaveText("1")
    await page.getByLabel('Full Name').fill('Masakela Layrock')
    await page.locator('#customer-email').fill(userEmail)
    await page.getByPlaceholder('+91 98765 43210').fill('1235679055')
    await page.locator('.confirm-booking-btn').click()

    const bookingRefEl = page.locator('.booking-ref')
    await expect(bookingRefEl).toBeVisible()
    const bookingRef = (await bookingRefEl.innerText()).trim()
    expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase())
    console.log(`Booking confirmed. Ref: ${bookingRef}`)

    //await page.pause()

    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`)

    const bookingCards = page.locator('#booking-card')
    await expect(bookingCards.first()).toBeVisible() 
    const matchingCard = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
    
    await expect(matchingCard).toBeVisible();
    await expect(matchingCard).toContainText(eventTitle)

    await page.goto(`${BASE_URL}/events`);
    await expect(eventCards.first()).toBeVisible();

    const updatedCard = eventCards.filter({ hasText: eventTitle }).first();
    await expect(updatedCard).toBeVisible();

   const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
   console.log(`Seats after booking: ${seatsAfterBooking}`);

   expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

    //await page.pause()
})


