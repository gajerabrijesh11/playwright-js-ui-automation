class LoginPage {
    constructor(page) {
        this.page = page;

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