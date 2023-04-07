const crypto = require("crypto");
const prompt = require('prompt-sync')();

function promptForInput() {
  const passwordLength = prompt("How long do you want your password to be? (Minumimum 16): ");

  if(passwordLength < 16) {
    console.log("Password length must be at least 16 characters\n");
    return promptForInput();
  }
  return passwordLength;
}

function generatePassword(passwordLength) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$%&()*+,-./:;<=>?@[]^_`{|}~";
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const charIndex = Math.floor(crypto.randomBytes(1)[0] / 256 * characters.length);
    password += characters.charAt(charIndex);
  }

  return password;
}

function validatePassword(password) {
  const has_uppercase = /[A-Z]/.test(password);
  const has_lowercase = /[a-z]/.test(password);
  const has_number = /\d/.test(password);
  const has_special = /[!$%&()*+,-./:;<=>?@[\]^_`{|}~]/.test(password);
  const has_comma = /,/.test(password);

  return (password.length >= 16 && has_uppercase && has_lowercase && has_number && has_special && has_comma);
}

const passwordLength = promptForInput(); // set the initial length to 16, you can change it to any desired length
let password = generatePassword(passwordLength);

while (!validatePassword(password)) {
  password = generatePassword(passwordLength);
}

console.log(password);
