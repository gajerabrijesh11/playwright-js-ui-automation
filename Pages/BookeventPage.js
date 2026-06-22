const { test, expect } = require('@playwright/test');
const { GenerateData } = require('../utils/GenerateData');
class BookEventPage {
    constructor(page) {
        this.page = page;


        this.Clickbookeventbutton = page.locator('a[data-testid="book-now-btn"][href="/events/2"]');
        this.fullname = page.locator("#customerName");
        this.email = page.locator("#customer-email");
        this.phonenumber = page.locator("#phone");
        this.confirmorder = page.getByRole('button', { name: 'Confirm Booking' });


    }

    async Bookeventbutton() {
        await this.Clickbookeventbutton.click();
    }

    async Bookeventdata() {
        const plusButton = this.page.getByRole('button', { name: '+' });
        for (let i = 0; i < 4; i++) {
            await plusButton.click();
        }
        const fullname = GenerateData.getRandomfullname();
        const email = GenerateData.getRandomEmail();
        const phone = GenerateData.getRandomphonenumber();
        await this.fullname.fill(fullname);
        await this.email.fill(email);
        await this.phonenumber.fill(phone);
    }
    async Confirmorderbutton() {
        
        await this.confirmorder.click();
    }

}
module.exports = { BookEventPage };
