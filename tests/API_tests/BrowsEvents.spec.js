const { test, expect } = require('@playwright/test');
const tokenState = require('../../test-data/token-state.json');


test('Verify list of all events', async ({ request }) => {

    console.log("Sending GET request to get all events API...");
    const authToken = tokenState.token;

    const response = await request.get('https://api.eventhub.rahulshettyacademy.com/api/events/', {
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