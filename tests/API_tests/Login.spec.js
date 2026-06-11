const { test, expect } = require('@playwright/test');
const userdata = require('../../test-data/user-data.json');
const tokenState = require('../../test-data/token-state.json');

// Attansion: We used request as fixture insead of page.
test('Verify Login API - Pure Backend Test', async ({ request }) => {

    console.log("Sending POST request to Login API...");

    // 1. Direct call the API like in postman.
    const response = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
        data: {
            email: userdata.validUser.email,
            password: userdata.validUser.password
        }
    });

    // Print the status in terminal for debugging.
    console.log(`Response Status Code: ${response.status()}`);

    // 2. Assersion 1: check that status code 200 (Success) or not.
    expect(response.status()).toBe(200);
    // or we can also use this short trick: expect(response.ok()).toBeTruthy();

    // 3. Covert API responce body into JSON.
    const responseBody = await response.json();
    console.log("Full JSON Response from Server:", responseBody);

    // 4. Assersion 2: check that token key is comming or not in responce.
    expect(responseBody).toHaveProperty('token');

    // 5. Assersion 3: if any msg in responce then we can check that as well.
    // expect(responseBody.message).toBe('Login Successful');
});


