const { generateTOTP, verifyToken, generateRandomASCII, generateRandomNumber, countdownTimer } = require('./lib/totp_generator');
const { generateRandomBase32 } = require('./lib/b32_generator');

const generateURL = (company, email, key, digits = null, period = null) => {
    let URL = `otpauth://totp/`;
    URL += `${company}:${email}`;
    URL += `?secret=${key}`;
    URL += `&issuer=${company}`;
    URL += (digits != null) ? `&digits=${digits}` : "";
    URL += (period != null) ? `&period=${period}` : "";
    return URL
}

module.exports = {
    generateTOTP, generateURL, generateSecret: generateRandomBase32, verifyToken, countdownTimer
}
