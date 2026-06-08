class LoginPage {
    constructor(page, request, context) {
        this.page = page;
        this.request = request;
        this.context = context;

        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signinButton = page.getByRole('button', { name: 'Sign In' });
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signinButton.click();
    }

    // 🚀 નવી હાઇબ્રિડ API મેથડ (અહીં ઉમેરો)
    async loginViaAPI(email, password) {
        console.log("Hitting Login API...");
        
        // ૧. API કોલ કરો (તમારું સાચું API URL અહીં નાખો)
        const response = await this.request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
            data: {
                email: email,
                password: password
            }
        });

        // ચેક કરો કે લોગીન સક્સેસ છે કે નહીં
        if (!response.ok()) {
            throw new Error(`API Login Failed with status: ${response.status()}`);
        }

        // ૨. રિસ્પોન્સમાંથી ટોકન બહાર કાઢો
        const responseBody = await response.json();
        const authToken = responseBody.token; // ડેવલપરે જે નામ આપ્યું હોય તે (દા.ત. token, jwt)

        console.log("Setting origin and injecting token into LocalStorage...");
    
    // 1. Pela main domain par javao jethi browser nu origin set thhai jaay
    await this.page.goto('https://eventhub.rahulshettyacademy.com/');

    // 2. Have page evaluate no use karine LocalStorage ma data set karo
    await this.page.evaluate((token) => {
        // 'token_key_name' ni jagyae application ma je key vapray chhe ae lakho (e.g., 'jwtToken', 'user_token')
        localStorage.setItem('eventhub_token', token); 
    }, authToken);
    }
}

module.exports = { LoginPage };