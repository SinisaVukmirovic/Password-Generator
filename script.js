// DOM elements
const resultElem = document.querySelector('#result');
const lengthElem = document.querySelector('#length');
const uppercaseElem = document.querySelector('#uppercase');
const lowercaseElem = document.querySelector('#lowercase');
const numbersElem = document.querySelector('#numbers');
const symbolsElem = document.querySelector('#symbols');
const generateBtn = document.querySelector('#generate');
const clipboardBtn = document.querySelector('#clipboard');

const randomFunctions = {
    upper: getRandomUpperCase,
    lower: getRandomLowerCase,
    number: getRandomNumb,
    symbol: getRandomSymbol
}

// copy pass to clipboard functionality
clipboardBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElem.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    alert('Password copied to clipboard!');
});

// listen for Generate event
generateBtn.addEventListener('click', () => {
    // const length = lengthElem.value;    type: string
    const length = +lengthElem.value;    // type: number
    
    const hasUpper = uppercaseElem.checked;
    const hasLower = lowercaseElem.checked;
    const hasNumber = numbersElem.checked;
    const hasSymbol = symbolsElem.checked;

    resultElem.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// Generate password functionality
function generatePassword(lower, upper, number, symbol, length) {
    // 1. initialize a password variable
    // 2. fulter out unchecked 
    // 3. loop over length call generator function for each type
    // 4. Add final password to the password variable and return

    // initializing generated password variable
    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    // filtering out the unchecked options
    const typesArr = [ {lower}, {upper}, {number}, {symbol} ].filter(item => Object.values(item)[0]);

    // checking if nothing is checked
    if (typesCount === 0) {
        return ``;
    }

    // step 3.
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const functionName = Object.keys(type)[0];

            generatedPassword += randomFunctions[functionName]();
        });
    }

    const finalPassword = (generatedPassword.slice(0, length));

    return finalPassword;
}

// Generator functions
// http://www.net-comber.com/charset.html
function getRandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumb() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = `!@#$%^&*(){}[]=<>/,.`;
    return symbols[Math.floor(Math.random() * symbols.length)];
}
