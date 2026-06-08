class BrowseEventsPage {
    constructor(page) {
        this.page = page;


        this.browseeventsbutton = page.getByRole('link', { name: 'Browse Events →' });
        this.browseeventssearchbox = page.getByRole('textbox', { name: 'Search events, venues…' });
        this.categoryDropdown = page.locator('select').filter({ 
            has: page.locator('option[value="Conference"]') 
        });
    }

    async browseevents() {
        await this.browseeventsbutton.click();
    }
    async searchevents(search) {
        await this.browseeventssearchbox.fill(search);
    }

    async category(categoryvalue){
         const responsePromise = this.page.waitForResponse(response => 
        response.url().includes('events') && response.status() === 200
    ); 
        // await this.categoryDropdown.waitFor({ state: 'attached', timeout: 5000 });
        
        await this.categoryDropdown.selectOption({ value: categoryvalue });
        await responsePromise;
    }
}
module.exports = { BrowseEventsPage };
