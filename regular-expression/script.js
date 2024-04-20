// regex 1
let regexInputDen = document.querySelector("#regexInputDen");
let validationTextDen = document.querySelector("#validation-text-Den");

const REGULAR_EXPRESSION_1 = /^[^\d]{10,}$/;

regexInputDen.addEventListener("input", function() {
    validationTextDen.textContent = REGULAR_EXPRESSION_1.test(regexInputDen.value) 
    ? "Valid" : "Invalid, minimum 10 characters required.";
});

// regex 2
let regexInputDen2 = document.querySelector("#regexInputDen2");
let validationTextDen2 = document.querySelector("#validation-text-Den2");

const REGULAR_EXPRESSION_2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

regexInputDen2.addEventListener("input", function() {
    validationTextDen2.textContent = REGULAR_EXPRESSION_2.test(regexInputDen2.value) 
    ? "Valid" : "Invalid, minimum 8 characters required with at least one uppercase, one lowercase, and one digit.";
});

// regex 3
let regexInputDen3 = document.querySelector("#regexInputDen3");
let validationTextDen3 = document.querySelector("#validation-text-Den3");

const REGULAR_EXPRESSION_3 = /^[a-zA-Z0-9]{6,12}$/;

regexInputDen3.addEventListener("input", function() {
    validationTextDen3.textContent = REGULAR_EXPRESSION_3.test(regexInputDen3.value) 
    ? "Valid" : "Invalid, minimum 6 characters and maximum 12 characters allowed with only letters and numbers.";
});

// regex 4
let regexInputDen4 = document.querySelector("#regexInputDen4");
let validationTextDen4 = document.querySelector("#validation-text-Den4");

const REGULAR_EXPRESSION_4 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

regexInputDen4.addEventListener("input", function() {
    validationTextDen4.textContent = REGULAR_EXPRESSION_4.test(regexInputDen4.value) 
    ? "Valid" : "Invalid email format.";
});

// regex 5
let regexInputDen5 = document.querySelector("#regexInputDen5");
let validationTextDen5 = document.querySelector("#validation-text-Den5");

const REGULAR_EXPRESSION_5 = /^\d{5}$/;

regexInputDen5.addEventListener("input", function() {
    validationTextDen5.textContent = REGULAR_EXPRESSION_5.test(regexInputDen5.value) 
    ? "Valid" : "Invalid, 5 digits required.";
});
