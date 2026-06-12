const { test, expect } = require('@playwright/test');
const { GenerateData } = require('../../utils/GenerateData')

test('Verify Register new user', async ({ request }) => {

    console.log("Sending POST request to get all events API...");
    const uniuqemail = GenerateData.getRandomEmail();
    const uniuqepassword = GenerateData.getRandomPassword();


    const response = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/register', {
        data: {

            "email": uniuqemail,
            "password": uniuqepassword

        }
    });
    console.log(`Response Status Code: ${response.status()}`);
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log("Full JSON Response from Server:", responseBody);
});