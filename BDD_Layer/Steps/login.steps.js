import { createBdd } from 'playwright-bdd';
import { test, expect } from '@playwright/test';

// BDD steps from playwright test function
const { Given, When, Then } = createBdd();

Given('I am on the EventHub login page', async ({ page }) => {
    // URL will open in browser
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
});

// here writing {string} data will directly fatch from  Feature file.
When('I enter email {string} and password {string}', async ({ page }, email, password) => {
    
    await page.getByRole('textbox', { name: 'Email' }).fill(email); 
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
});

When('I click on the Login button', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
});

Then('I should be logged in successfully', async ({ page }) => {
    // Verification after login
    await expect(page.locator('#logout-btn')).toBeVisible();
});

Then('I should see error msg', async ({ page }) => {
    // Verification after login
    await expect(page.getByText('✕Invalid email or password×')).toBeVisible();
});
