const { test, expect } = require('@playwright/test');
const userdata = require('../../test-data/user-data.json');
const tokenState = require('../../test-data/token-state.json');

test('Get the currently authenticated user', async ({ request }) => {
    const authToken = tokenState.token;
    const response = await request.get('https://api.eventhub.rahulshettyacademy.com/api/auth/me', {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });

    console.log(`Response Status Code: ${response.status()}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Full JSON Response from Server:", responseBody);
});