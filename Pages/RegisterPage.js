class RegisterPage {
    constructor(page) {
        this.page = page;
        this.RegisterURL = page.getByRole('link', { name: 'Register' });
        this.emailInput = page.getByTestId('register-email');
        this.passwordInput = page.getByTestId('register-password');
        this.confirmpasswordInput = page.getByRole('textbox', { name: 'Repeat your password' });
        this.registerButton = page.getByTestId('register-btn');
    }
async registeruser(){
    await this.RegisterURL.click();
}
    
    async navigate() {
        await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
    }

    
    async register(register, email, password) {
        await this.RegisterURL.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmpasswordInput.fill(password);
        await this.registerButton.click();
    }
}

module.exports = { RegisterPage };