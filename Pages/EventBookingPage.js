class EventBookingPage {
    constructor(page) {
        this.page = page;

        // Event listing
        this.eventCards = page.locator('article[data-testid="event-card"]');

        // Booking form on the event detail page
        this.ticketCount = page.locator('#ticket-count');
        // Locate the +/- stepper buttons relative to the count, so the methods
        // stay robust regardless of the exact glyph used on the buttons.
        this.incrementButton = this.ticketCount.locator('xpath=following-sibling::button[1]');
        this.decrementButton = this.ticketCount.locator('xpath=preceding-sibling::button[1]');

        this.fullNameInput = page.locator('#customerName');
        this.emailInput = page.locator('#customer-email');
        this.phoneInput = page.locator('#phone');

        this.pricePerTicket = page.locator('span.text-2xl.font-bold.text-indigo-700');
        this.totalPrice = page.getByText('Total', { exact: true })
            .locator('xpath=following-sibling::span[1]');

        this.confirmBookingButton = page.locator('#confirm-booking');

        // Confirmation panel shown after a successful booking
        this.confirmationHeading = page.getByText('Booking Confirmed!');
    }

    /**
     * Locator for an inline form validation message (e.g. "Enter a valid email").
     * Returned so the assertion stays in the spec.
     */
    validationError(message) {
        return this.page.getByText(message);
    }

    /**
     * Click the "Book Now" button for the first event of the given category.
     * Reusable for any category (Sports, Concert, Festival, …).
     */
    async bookEventByCategory(category) {
        const eventCard = this.eventCards.filter({ hasText: category }).first();
        await eventCard.getByTestId('book-now-btn').click();
    }

    /** Return the current page URL (booking / event detail URL). */
    getBookingUrl() {
        return this.page.url();
    }

    /**
     * Set the ticket count to the target value by stepping up or down.
     * Works for any valid target, in either direction.
     */
    async setTicketCount(targetCount) {
        let current = parseInt(await this.ticketCount.textContent(), 10);
        while (current < targetCount) {
            await this.incrementButton.click();
            current++;
        }
        while (current > targetCount) {
            await this.decrementButton.click();
            current--;
        }
    }

    /** Fill the attendee details on the booking form. */
    async fillAttendeeDetails(fullName, email, phone) {
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
    }

    /** Parse a currency string like "$2,500" into a number. */
    parsePrice(priceText) {
        return parseFloat(priceText.replace(/[^0-9.]/g, ''));
    }

    /** Numeric price per ticket. */
    async getPricePerTicket() {
        return this.parsePrice(await this.pricePerTicket.textContent());
    }

    /** Raw total price text as displayed (e.g. "$50"). */
    async getTotalPriceText() {
        return (await this.totalPrice.textContent()).trim();
    }

    /** Numeric total price. */
    async getTotalPrice() {
        return this.parsePrice(await this.totalPrice.textContent());
    }

    /** Submit the booking. */
    async confirmBooking() {
        await this.confirmBookingButton.click();
    }
}

module.exports = { EventBookingPage };
