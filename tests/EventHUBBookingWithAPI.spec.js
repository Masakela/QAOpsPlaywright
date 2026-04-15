import { test, expect } from '@playwright/test'

const BASE_URL = "https://eventhub.rahulshettyacademy.com"
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api'
const YAHOO_USER = { email: "masa_layr@yahoo.com", password: "Mdowdy79!" }
const GMAIL_USER = { email: "masakela@gmail.com", password: "Mdowdy79!" }

async function login(page, user) {

    await page.goto(`${BASE_URL}/login`)
    await page.getByPlaceholder("you@email.com").fill(user.email)
    await page.getByLabel("password").fill(user.password)
    await page.locator("#login-btn").click()
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible()

}


test("Event Hub Booking with yahoo account using API", async ({ page, request }) => {

    const res = await request.post(`${API_URL}/auth/login`, {
        data: { email: YAHOO_USER.email, password: YAHOO_USER.password },
    })
    expect(res.ok).toBeTruthy()
    //const jsonResponse = await res.json()
    //console.log(jsonResponse.user.id)
    const { token } = await res.json()

    const eventsResposne = await request.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    expect(eventsResposne.ok()).toBeTruthy()
    const eventsjsonResponse = await eventsResposne.json()
    const eventId = eventsjsonResponse.data[0].id

    const eventBookingResponse = await request.post(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data:
        {
            eventId,
            customerName: "Masakela Layrock",
            customerEmail: YAHOO_USER.email,
            customerPhone: "312-236-7789",
            quantity: 1,
        },
    })
    expect(eventBookingResponse.ok()).toBeTruthy()
    const jsonEventBookingResponse = await eventBookingResponse.json()
    const yahooBookingId = jsonEventBookingResponse.data.id
    const yahoobookingRef = jsonEventBookingResponse.data.bookingRef
    console.log(yahooBookingId)
    console.log(yahoobookingRef)

    await login(page, GMAIL_USER)

    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: "networkidle" })
    await page.pause()

    await expect(page.getByText("Access Denied")).toBeVisible()
    await expect(page.getByText("You are not authorized to view this booking.")).toBeVisible()

})


