let regexInputAndra = document.querySelector("#regexInputden");
let validationTextden = document.querySelector("#validation-text-den");

const REGULAR_EXPRESSION = /^[A-Z\d]{8,}$/;

regexInputden.addEventListener("input", function() {
    validationTextden.innerHTML = REGULAR_EXPRESSION.test(regexInputden.value) 
    ? "<p class='text-green-600'>Valid</p>" : "<p class='text-red-600'>Invalid</p>";
});
