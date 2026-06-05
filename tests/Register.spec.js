const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../Pages/RegisterPage');
const { GenerateData } = require('../utils/GenerateData');

test('User should be able to register successfully to EventHub', async ({ page }) => {
    const registerpage = new RegisterPage(page);

    //Go to site
    await registerpage.navigate();

    // 2givedetails to register
    const registerurl = registerpage.RegisterURL;
    await expect(registerurl).toBeVisible();
    const randomEmail = GenerateData.getRandomEmail();
    const randomPassword = GenerateData.getRandomPassword();
    const randomrepassword = randomPassword;
    await registerpage.register(registerpage, randomEmail, randomPassword, randomrepassword);
});