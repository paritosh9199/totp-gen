# totp-gen

A TOTP secret, token generator and verifier!

------
## Installation
```
npm install --save totp-gen
```
------
## How to use!
```js
let totp = require('totp-gen');

/* Generate a secret BASE32 String */
let secretLength = 40;
let secret = totp.generateSecret(secretLength);

let time = Date.now();
let periodInSecond = 30;
let lengthOfPin = 6;

/* Generate a TOTP Token using SECRET, time, period and 
   length. 
*/
let totpToken = totp.generateTOTP(secret, time, periodInSecond, lengthOfPin);

let company = "MyExampleCompany";
let email = "abc@xyz.com";

/* Generate totp URL for authenticator  apps*/
let totpURL = totp.generateURL(company, email, secret, lengthOfPin, periodInSecond);

/* Verify generated token and secret */
if(totp.verifyToken(secret, totpToken, time, periodInSecond, lengthOfPin)){
    console.log(
        {
            secretLength,
            secret, 
            time,
            periodInSecond,
            lengthOfPin,
            totpToken,
            timeLeftForTokenValidity: totp.countdownTimer(periodInSecond),
            totpURL
        }
    )
 }else{
     throw "INVALID_TOKEN_VERIFICATION";
 }

```
