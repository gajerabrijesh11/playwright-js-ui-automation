const { test, expect } = require('@playwright/test');
const { BrowseEventsPage } = require('../Pages/BrowseEventsPage');
const { RegisterPage } = require('../Pages/RegisterPage');
const { LoginPage } = require('../Pages/LoginPage');
const userdata = require('../test-data/user-data.json');

test.beforeEach('User login', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const registerpage = new RegisterPage(page);
    await registerpage.navigate();
    await loginpage.login(userdata.validUser.email, userdata.validUser.password);

});

// Search events
for (const search of userdata.SearchEvents) {
    test(`Search Events ${search.scenario}`, async ({ page }) => {
        const browseventsPage = new BrowseEventsPage(page);
        await browseventsPage.browseevents();
        await expect(page).toHaveURL('/events');
        await browseventsPage.searchevents(search.keyword);
        const eventcard = page.getByRole('link', { name: search.expectedCard });
        await expect(eventcard).toBeVisible();
    });
}

for (const categories of userdata.Categorydropdown) {
    
    test(`Select category ${categories.category}`, async ({ page }) => {
        const browseeventspage = new BrowseEventsPage(page);
        await browseeventspage.browseevents();
        await browseeventspage.category(categories.category);
        if (categories.expectedcard !== "No events found")
            await expect(page.getByRole('link', { name: categories.expectedcard })).toBeVisible();
        else {
            const nocards = page.getByRole('heading', { name: 'No events found' });
            await expect(nocards).toBeVisible();
        }
    });
}


