class GenerateData {
    static getRandomEmail() {
        const timestamp = Date.now();
        return `qa_${timestamp}@gmail.com`;
    }


    static getRandomPassword() {
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        return `Secure@${randomNumber}`;
    }
}

module.exports = { GenerateData };