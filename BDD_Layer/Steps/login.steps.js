import { createBdd } from 'playwright-bdd';
import { test, expect } from '@playwright/test';

// પ્લેરાઈટના 'test' ફંક્શનમાંથી BDD ના સ્ટેપ્સ બનાવીએ
const { Given, When, Then } = createBdd();

Given('I am on the EventHub login page', async ({ page }) => {
    // બ્રાઉઝરમાં તમારું URL ઓપન થશે
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
});

// અહી {string} લખવાથી Feature ફાઈલમાંથી ડેટા સીધો ફંક્શનમાં આવી જશે
When('I enter email {string} and password {string}', async ({ page }, email, password) => {
    // 🎯 તમારા પેજના સાચા લોકેટર અહી નાખવા
    await page.getByRole('textbox', { name: 'Email' }).fill(email); 
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
});

When('I click on the Login button', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
});

Then('I should be logged in successfully', async ({ page }) => {
    // લોગીન થયા પછી જે નવી વસ્તુ દેખાય (દા.ત. ડેશબોર્ડ કે Logout બટન) એને વેરીફાય કરો
    await expect(page.locator('#logout-btn')).toBeVisible();
});