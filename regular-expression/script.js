// // regex 1
// let regexInputHav = document.querySelector("#regexInputHav");
// let validationTextDen = document.querySelector("#validation-text-Den");

// const REGULAR_EXPRESSION_1 = /^[^\d]{10,}$/;

// regexInputHav1.addEventListener("input", function() {
//     validationTextHav1.textContent = REGULAR_EXPRESSION_1.test(regexInputHav1.value) 
//     ? "Valid" : "Invalid, Minimal 8 karakter, hanya huruf dan angka";
// });

// // regex 2
// let regexInputHav2 = document.querySelector("#regexInputHav2");
// let validationTextHav2 = document.querySelector("#validation-text-Hav2");

// const REGULAR_EXPRESSION_2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// regexInputHav2.addEventListener("input", function() {
//     validationTextHav2.textContent = REGULAR_EXPRESSION_2.test(regexInputHav2.value) 
//     ? "Valid" : "Invalid, Format email yang valid";
// });

// // regex 3
// let regexInputHav3 = document.querySelector("#regexInputHav3");
// let validationTextHav3 = document.querySelector("#validation-text-Hav3");

// const REGULAR_EXPRESSION_3 = /^[a-zA-Z0-9]{6,12}$/;

// regexInputHav3.addEventListener("input", function() {
//     validationTextHav3.textContent = REGULAR_EXPRESSION_3.test(regexInputHav3.value) 
//     ? "Valid" : "Invalid, Minimal 6 karakter, maksimal 12 karakter, hanya huruf dan angka, huruf kecil semua" ;
// });

// // regex 4
// let regexInputHav4 = document.querySelector("#regexInputHav4");
// let validationTextHav4 = document.querySelector("#validation-text-Hav4");

// const REGULAR_EXPRESSION_4 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// regexInputHav4.addEventListener("input", function() {
//     validationTextHav4.textContent = REGULAR_EXPRESSION_4.test(regexInputHav4.value) 
//     ? "Valid" : "Hanya menerima 4 angka.";
// });

// // regex 5
// let regexInputHav5 = document.querySelector("#regexInputHav5");
// let validationTextHav5 = document.querySelector("#validation-text-Hav5");

// const REGULAR_EXPRESSION_5 = /^\d{5}$/;

// regexInputHav5.addEventListener("input", function() {
//     validationTextHav5.textContent = REGULAR_EXPRESSION_5.test(regexInputHav5.value) 
//     ? "Valid" : "Maximal 5 karakter, hanya huruf besar semua.";
// });


function validateRegex(inputId, regexPattern, validationTextId) {
    const input = document.getElementById(inputId);
    const validationText = document.getElementById(validationTextId);
    input.addEventListener("input", function () {
        const inputValue = input.value;
        if (regexPattern.test(inputValue)) {
            validationText.textContent = "Input is valid.";
            validationText.style.color = "green";
        } else {
            validationText.textContent = "Input is invalid.";
            validationText.style.color = "red";
        }
    });
}

validateRegex(
    "regexInputHav1",
    /^[a-zA-Z0-9]{8,}$/,
    "validation-text-Hav1"
);
validateRegex(
    "regexInputHav2",
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "validation-text-Hav2"
);
validateRegex(
    "regexInputHav3",
    /^[a-z0-9]{6,12}$/,
    "validation-text-Hav3"
);
validateRegex("regexInputHav4", /^\d{4}$/, "validation-text-Hav4");
validateRegex("regexInputHav5", /^[A-Z]{5}$/, "validation-text-Hav5");