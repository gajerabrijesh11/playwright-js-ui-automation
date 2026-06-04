const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const userdata = require('../test-data/user-data.json');


test('User should be able to login successfully to EventHub', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const registerpage = new RegisterPage(page);

    
    await registerpage.navigate();
    await loginpage.login(userdata.validUser.email, userdata.validUser.password);
    await expect(page.getByRole('heading', { name: 'Discover & Book Amazing Events' })).toBeVisible();
});