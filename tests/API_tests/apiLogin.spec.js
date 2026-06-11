const { test, expect } = require('@playwright/test');
const userdata = require('../../test-data/user-data.json');
const tokenState = require('../../test-data/token-state.json');

// 🎯 ધ્યાન આપો: અહીંયા આપણે 'page' નથી લીધું, ફક્ત 'request' લીધું છે!
test('Verify Login API - Pure Backend Test', async ({ request }) => {

    console.log("Sending POST request to Login API...");

    // ૧. સીધો API ને કૉલ કરો (જેમ Postman માં કરીએ છીએ)
    const response = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
        data: {
            email: userdata.validUser.email,
            password: userdata.validUser.password
        }
    });

    // ડીબગીંગ માટે ટર્મિનલમાં સ્ટેટસ કોડ પ્રિન્ટ કરો
    console.log(`Response Status Code: ${response.status()}`);

    // ૨. એસર્શન ૧: ચેક કરો કે સ્ટેટસ કોડ 200 (Success) આવ્યો કે નહીં
    expect(response.status()).toBe(200);
    // અથવા આ શોર્ટ રીત પણ વાપરી શકાય: expect(response.ok()).toBeTruthy();

    // ૩. API ના રિસ્પોન્સ બોડીને JSON ફોર્મેટમાં કન્વર્ટ કરો
    const responseBody = await response.json();
    console.log("Full JSON Response from Server:", responseBody);

    // ૪. એસર્શન ૨: ચેક કરો કે રિસ્પોન્સમાં 'token' નામની કી (Key) આવે છે કે નહીં
    expect(responseBody).toHaveProperty('token');

    // ૫. એસર્શન ૩: જો રિસ્પોન્સમાં કોઈ મેસેજ આવતો હોય તો એ પણ ચેક કરી શકાય
    // expect(responseBody.message).toBe('Login Successful');
});


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
    // expect(responseBody).toHaveProperty('token');
});