const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');

test('Hybrid POM Test - LocalStorage Login', async ({ page, request, context }) => {
    const loginPage = new LoginPage(page, request, context);
    
    // 1. API thhi lojin thhasé ane LocalStorage ma token set thhasé
    await loginPage.loginViaAPI('testbg@gmail.com', 'gBRij@26');

    // 2. Direct dashboard par jump karo
    await page.goto('https://eventhub.rahulshettyacademy.com');

    // 3. UI Validation
    await expect(page.getByRole('heading', { name: ' Discover & Book Amazing Events ' })).toBeVisible();
});