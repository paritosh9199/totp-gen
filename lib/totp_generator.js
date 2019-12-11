let JsSHA = require('jssha');

const generateTOTP = (secret, time = Date.now(), period = 30, digits = 6) => {
	let epoch, shaObj, hmac, offset, otp;
	secret = base32tohex(secret);
	epoch = Math.round(time / 1000.0);
	time = leftpad(dec2hex(Math.floor(epoch / period)), 16, '0');

	shaObj = new JsSHA('SHA-1', 'HEX');
	shaObj.setHMACKey(secret, 'HEX');
	shaObj.update(time);
	hmac = shaObj.getHMAC('HEX');

	offset = hex2dec(hmac.substring(hmac.length - 1));
	otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
	otp = otp.substr(otp.length - digits, digits);
	return otp;
}

const verifyToken = (secret, token, time = Date.now(), period = 30, digits = 6) => {
	let i = generateTOTP(secret, time, period, digits);
	return (i == token) ? true : false;
}

const countdownTimer = (period = 30) => {
	var epoch = Math.round(new Date().getTime() / 1000.0);
	var countDown = period - (epoch % period);
	// if (epoch % period == 0) updateOtp();
	return countDown;
}

const hex2dec = (s) => {
	return parseInt(s, 16);
}

const dec2hex = (s) => {
	return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
}

const base32tohex = (base32) => {
	let base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
		bits = '',
		hex = '';

	for (let i = 0; i < base32.length; i++) {
		let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
		bits += leftpad(val.toString(2), 5, '0');
	}

	for (let i = 0; i + 4 <= bits.length; i += 4) {
		let chunk = bits.substr(i, 4);
		hex = hex + parseInt(chunk, 2).toString(16);
	}

	return hex;
}

const leftpad = (str, len, pad, byte_incr = 0) => {
	if (len + 1 >= str.length && !byte_incr) {
		str = Array(len + 1 - str.length).join(pad) + str;
	} else if (byte_incr == 1) {
		str = Array(len + 1 - (str.length % len)).join(pad) + str;
	}
	return str;
}

const generateRandomASCII = (len = 160, symbols = 0) => {
	var text = "";

	var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678";
	if (symbols) {
		possible += '!@#$%^&*()<>?/[]{},.:;';
	}

	for (var i = 0; i < len; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

const generateRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
	generateTOTP, verifyToken, generateRandomASCII, generateRandomNumber, countdownTimer
}