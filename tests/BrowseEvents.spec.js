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

test('User should be able to browse events successfully', async ({ page }) => {
    const browseventsPage = new BrowseEventsPage(page);
    await browseventsPage.browseevents();
    await expect(page).toHaveURL('/events');
    await browseventsPage.searchevents();
    await expect(page.getByRole('link', { name: 'Dilli Diwali Mela' })).toBeVisible();
    if (page.getByRole('button', { name: 'Clear filters' }).isVisible) {
        await page.getByRole('button', { name: 'Clear filters' }).click();

    } else {
        console.log('Clear filters button is not visible');
    }

});

test('Select Category Dropdown', async ({ page }) => {
    const browseeventspage = new BrowseEventsPage(page);
    await browseeventspage.browseevents();
    await browseeventspage.cetegory(userdata.categorydropdown.category3);
    await expect(page.getByText('Concert', { exact: true })).toBeVisible();
});

test.skip('Select City Dropdown', async ({ page }) => {

});