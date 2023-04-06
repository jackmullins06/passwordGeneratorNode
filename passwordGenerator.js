function generatePassword() {
    var crypto = require("crypto");
    var password = "";
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$%&()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 0; i < 20; i++) {
        let charIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * characters.length);
        password += characters.charAt(charIndex);
    }

    return password;
}

function validatePassword(password) {
    var has_uppercase = false;
    var has_lowercase = false;
    var has_number = false;
    var has_special = false;

    for (let i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        if (/[A-Z]/.test(char)) {
            has_uppercase = true;
        } else if (/[a-z]/.test(char)) {
            has_lowercase = true;
        } else if (/\d/.test(char)) {
            has_number = true;
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(char)) {
            has_special = true;
        }
    }

    return (password.length >= 20 && has_uppercase && has_lowercase && has_number && has_special);
}


var password = generatePassword();

while (!validatePassword(password)) {
    password = generatePassword();
}

console.log(password);
