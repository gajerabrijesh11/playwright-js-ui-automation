const { test, expect } = require('@playwright/test');
const { BrowseEventsPage } = require('../Pages/BrowseEventsPage');
const { RegisterPage } = require('../Pages/RegisterPage');
const { LoginPage } = require('../Pages/LoginPage');
const { BookEventPage } = require('../Pages/BookeventPage');

const userdata = require('../test-data/user-data.json');

test('Event Booking', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const registerpage = new RegisterPage(page);
    const browseEventpage = new BrowseEventsPage(page);
    const bookevent = new BookEventPage(page);
     
    await registerpage.navigate();
    await loginpage.login(userdata.validUser.email, userdata.validUser.password);
    console.log("login done");
    await browseEventpage.browseevents();
    await bookevent.Bookeventbutton();
    await bookevent.Bookeventdata();
    await bookevent.Confirmorderbutton();
    await expect(page.getByRole('heading', { name: 'Booking Confirmed! 🎉' })).toBeVisible();
    


});
















































// const { test, expect } = require('@playwright/test');

// const LOGIN_URL = 'https://eventhub.rahulshettyacademy.com/login';
// const VALID_EMAIL = 'testbg@gmail.com';
// const VALID_PASSWORD = 'gBRij@26';

// function randomDigits(length) {
//     let value = '';
//     for (let i = 0; i < length; i++) {
//         value += Math.floor(Math.random() * 10);
//     }
//     return value;
// }

// function parseMoney(text) {
//     return Number(text.replace(/[^0-9]/g, ''));
// }

// test('User can book concert tickets and validate booking confirmation', async ({ page }) => {
//     const fullName = `Test User ${Math.floor(1000 + Math.random() * 9000)}`;
//     const email = `testbg.${Date.now()}@gmail.com`;
//     const phoneNumber = `9${randomDigits(9)}`;

//     await page.goto(LOGIN_URL);

//     await page.getByRole('textbox', { name: 'Email' }).fill(VALID_EMAIL);
//     await page.getByRole('textbox', { name: 'Password' }).fill(VALID_PASSWORD);
//     await page.getByRole('button', { name: /Sign In/i }).click();

//     await expect(page.getByRole('heading', { name: /Discover & Book Amazing Events/i })).toBeVisible();

//     await page.getByRole('link', { name: 'Browse Events \u2192' }).click();
//     await expect(page).toHaveURL(/\/events(?:\?.*)?$/);

//     const concertCard = page.getByTestId('event-card').filter({ hasText: 'Concert' }).first();
//     await expect(concertCard).toBeVisible();
//     await concertCard.getByTestId('book-now-btn').click();

//     await expect(page).toHaveURL(/\/events\/\d+$/);
//     const bookingPath = new URL(page.url()).pathname;
//     const eventId = bookingPath.split('/').pop();
//     console.log(`Booking URL event id: ${eventId}`);

//     const plusButton = page.getByRole('button', { name: '+' });
//     for (let i = 0; i < 4; i++) {
//         await plusButton.click();
//     }

//     const ticketCount = page.locator('#ticket-count');
//     await expect(ticketCount).toHaveText('5');
//     const totalTickets = Number((await ticketCount.textContent()) || '0');
//     console.log(`Total ticket count: ${totalTickets}`);

//     await page.getByLabel('Full Name').fill(fullName);
//     await page.getByTestId('customer-email').fill(email);
//     await page.getByLabel('Phone Number').fill(phoneNumber);

//     const bookingSummary = page.locator('form div.bg-indigo-50').first();
//     const pricingRow = bookingSummary.locator('div.flex.justify-between.text-gray-600').first();
//     const [pricingText, displayedSubtotalText] = await pricingRow.locator('span').allTextContents();
//     const normalizedPricingText = pricingText.replace(/\u00D7/g, 'x');
//     const pricingMatch = normalizedPricingText.match(/([$\d,]+)\sx\s(\d+)\s+ticket/);

//     expect(pricingMatch, 'Pricing row should show the ticket price and quantity').not.toBeNull();

//     const unitPrice = parseMoney(pricingMatch[1]);
//     const quantity = Number(pricingMatch[2]);
//     const displayedSubtotal = parseMoney(displayedSubtotalText);
//     const expectedTotal = unitPrice * quantity;

//     expect(displayedSubtotal).toBe(expectedTotal);
//     console.log(`Calculated total: ${displayedSubtotalText}`);

//     const totalRow = bookingSummary.locator('div.flex.justify-between.font-bold').first();
//     const [, totalText] = await totalRow.locator('span').allTextContents();
//     expect(parseMoney(totalText)).toBe(expectedTotal);
//     console.log(`Displayed total: ${totalText}`);

//     await page.getByRole('button', { name: /Confirm Booking/i }).click();

//     await expect(page.getByRole('heading', { name: /Booking Confirmed!/i })).toBeVisible();

//     const bookingRef = page.locator('.booking-ref');
//     await expect(bookingRef).toBeVisible();
//     const bookingRefValue = (await bookingRef.textContent())?.trim();
//     console.log(`Booking reference: ${bookingRefValue}`);

//     await expect(page).toHaveURL(new RegExp(`/events/${eventId}$`));
// });
