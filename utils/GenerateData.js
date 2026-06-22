class GenerateData {
    static getRandomEmail() {
        const timestamp = Date.now();
        return `qa_${timestamp}@gmail.com`;
    }


    static getRandomPassword() {
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        return `Secure@${randomNumber}`;
    }
    static getRandomfullname() {
        const timestamp = Date.now();
        return `test_${timestamp}`;
    }
    static getRandomphonenumber() {
        const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
        const phoneNumber = `9${randomDigits}`;
        return phoneNumber;
    }
}

module.exports = { GenerateData };