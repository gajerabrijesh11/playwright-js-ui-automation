const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../Pages/RegisterPage');
const { LoginPage } = require('../Pages/LoginPage');
const { BrowseEventsPage } = require('../Pages/BrowseEventsPage');
const { EventBookingPage } = require('../Pages/EventBookingPage');
const userdata = require('../test-data/user-data.json');

// Login once before every scenario (reuses the existing pages)
test.skip(async ({ page }) => {
    await new RegisterPage(page).navigate();
    await new LoginPage(page).login(userdata.validUser.email, userdata.validUser.password);
});

// DDT applied for event booking
for (const booking of userdata.eventBookings) {
    test.skip(`Book event - ${booking.scenario}`, async ({ page }) => {
        const browseeventspage = new BrowseEventsPage(page);
        const eventbookingpage = new EventBookingPage(page);

        // Browse and open the event of the given category
        await browseeventspage.browseevents();
        await expect(page).toHaveURL('/events');

        await eventbookingpage.bookEventByCategory(booking.category);
        await expect(page).toHaveURL(/\/events\/\d+/);

        // Set ticket count
        await eventbookingpage.setTicketCount(booking.ticketCount);
        await expect(eventbookingpage.ticketCount).toHaveText(String(booking.ticketCount));

        // Enter attendee details (valid or invalid depending on the data row)
        await eventbookingpage.fillAttendeeDetails(booking.fullName, booking.email, booking.phone);

        if (booking.expectError) {
            // Negative scenario: submit should be blocked with an inline error
            await eventbookingpage.confirmBooking();
            await expect(eventbookingpage.validationError(booking.errorMessage)).toBeVisible();
            await expect(eventbookingpage.confirmationHeading).toBeHidden();
        } else {
            // Positive scenario: validate the displayed total before confirming
            const totalPrice = await eventbookingpage.getTotalPrice();
            const expectedTotal = booking.expectedPerTicket * booking.ticketCount;
            expect(totalPrice).toBe(expectedTotal);
            console.log(`${booking.scenario} -> Total: $${totalPrice} (expected $${expectedTotal})`);

            // Confirm and validate the booking is created
            await eventbookingpage.confirmBooking();
            await expect(eventbookingpage.confirmationHeading).toBeVisible();
        }
    });
}

// Edge case: the ticket counter is capped at the maximum of 10
test.skip('Ticket count is capped at the maximum of 10', async ({ page }) => {
    const browseeventspage = new BrowseEventsPage(page);
    const eventbookingpage = new EventBookingPage(page);

    await browseeventspage.browseevents();
    await eventbookingpage.bookEventByCategory('Sports');

    await eventbookingpage.setTicketCount(10);
    await expect(eventbookingpage.ticketCount).toHaveText('10');
    await expect(eventbookingpage.incrementButton).toBeDisabled();
});
