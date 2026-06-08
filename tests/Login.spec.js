const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../Pages/RegisterPage');
const { LoginPage } = require('../Pages/LoginPage');
const userdata = require('../test-data/user-data.json');


test('User should be able to login successfully to EventHub', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const registerpage = new RegisterPage(page);


    await registerpage.navigate();
    await loginpage.login(userdata.validUser.email, userdata.validUser.password);
    await expect(page.getByRole('heading', { name: 'Discover & Book Amazing Events' })).toBeVisible();
});

// DDT Applied for login
for (const data of userdata.DDTLogindata) {
    test(`User login with DDTdata ${data.scenario}`, async ({ page }) => {
        const registerpage = new RegisterPage(page);
        const loginpage = new LoginPage(page);
        await registerpage.navigate();
        await loginpage.login(data.email, data.password);
        if(data.scenario === "Valid Login")
        await expect(page.getByRole('heading', { name: ' Discover & Book Amazing Events ' })).toBeVisible();
    else{
        const ErrorElement = page.getByText('✕Invalid email or password×');
        await expect(ErrorElement).toBeVisible();

    }

    });
}



test('Intentional fail test', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const registerpage = new RegisterPage(page);


    await registerpage.navigate();
    await loginpage.login(userdata.validUser.email, userdata.validUser.password);
    await expect(page.getByRole('heading', { name: 'hello world' })).toBeVisible();
});