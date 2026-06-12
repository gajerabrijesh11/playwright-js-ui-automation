// 🎯 આપણે નોર્મલ 'test' અને 'expect' જ ઈમ્પોર્ટ કરીએ છીએ
const { test, expect } = require('@playwright/test');
const userdata = require('../../test-data/user-data.json');
const fs = require('fs');
const path = require('path');

// 🎯 અહીં 'setup' ની જગ્યાએ સાદું 'test' લખી દીધું
test('Authenticate and Save Token', async ({ request }) => {
    console.log("🚀 Setup Started: Hitting Login API...");
    
    const response = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
        data: {
            email: userdata.validUser.email,
            password: userdata.validUser.password
        }
    });

    console.log(`Login Status Code: ${response.status()}`);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    console.log("Full Login Response Body:", responseBody);

    const authToken = responseBody.token || responseBody.accessToken || (responseBody.data && responseBody.data.token);
    console.log(`Extracted Token: ${authToken}`);

    if (!authToken) {
        throw new Error("Error: Token is undefined!");
    }

    const filePath = path.join(__dirname, '../../test-data/token-state.json');
    const tokenData = { token: authToken };
    fs.writeFileSync(filePath, JSON.stringify(tokenData, null, 2));
    
    console.log("✅ Token successfully written to token-state.json!");
});