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
}

module.exports = { LoginPage };