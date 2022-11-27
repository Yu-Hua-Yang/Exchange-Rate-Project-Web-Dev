"uses strict";

window.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

});

let urlObject = {
    mainUrl : 'https://api.exchange.host/convert',
    fromQuery : 'from=',
    toQuery : 'to=',
    amountQuery : 'amount=',
    absoluteQuery: ''
}

let inputsValidation = [false, false,false];
let dataHistory = new Array();

window.addEventListener("DOMContentLoaded", init);

/**
 * @description init function initializes the global variables and set event listeners to run the program
 * @author Yu Hua Yang 2133677
 */
function init(){
    let origin = document.getElementById("base-currency-select");
    let foreign = document.getElementById("to-currency-select");
    let amount = document.getElementById("amount");
    let convertBTN = document.getElementById("get-data-btn");
    let readBTN = document.getElementById("read-storage-btn");
    let clearBTN = document.getElementById("clear-storage-btn");

    convertBTN.disabled = true;

    origin.addEventListener("change", () => {validateSelects(origin, 0)});
    foreign.addEventListener("change", () => {validateSelects(foreign, 1)});
    amount.addEventListener("change", () => {validateSelects(amount, 2)});
    convertBTN.addEventListener("click", getData);

    readBTN.addEventListener("change", () => {console.log("Shows Conversion History")});
    clearBTN.addEventListener("change", () => {console.log("Clear Conversion History")});

    initializeSelectOptions();
}
