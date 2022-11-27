/**
* @description Creates a new HTML element takng input string tagname, string content, string parent
 * @param {string} tagname - tag name of the element to create
 * @param {string} content - text inside the HTML element
 * @param {string} parent - parent to append the tag name to
 * @returns - new HTML element 
 * @author Yu Hua Yang 2133677
 */
function addHTMLElement(tagname, content, parent) {
    let new_node = document.createElement(tagname);
    new_node.textContent=content;
    let par = document.getElementById(parent);
    par.append(new_node);
    return new_node;
}

/**
 * @description Checks whether a value is selected if yes it changes the inputValidation[] to true
 * @param {*} select - the option element to find its value
 * @param {*} num - the number to check which specific switch case to test
 * @author Yu Hua Yang 2133677
 */
function validateSelects(select, num) {
    let convertBTN = document.getElementById("get-data-btn");
    switch(num) {
        case 0:
            if(select.value == "-------"){
                inputsValidation[0] = false;
            }
            else{
                inputsValidation[0] = true;
            }
            break;
        case 1:
            if(select.value == "-------"){
                inputsValidation[1] = false;
            }
            else{
                inputsValidation[1] = true;
            }
            break;
        case 2:
            if(select.value < 1){
                inputsValidation[2] = false;
            }
            else{
                inputsValidation[2] = true;
            }
            break;
    }

    if(inputsValidation[0] == true && inputsValidation[1] == true && inputsValidation[2] == true){
        convertBTN.disabled = false;
    }
    else{
        convertBTN.disabled = true;
    }
}

/**
 * @description It takes the values grabbed by the id to create a absolute url and puts it into the object 
 * @author Yu Hua Yang 2133677
 */
function getAbsoluteRequestURL() {
    let origin = document.getElementById("base-currency-select").value;
    let foreign = document.getElementById("to-currency-select").value;
    let amount = document.getElementById("amount").value;

    urlObject.absoluteQuery = "https://api.exchangerate.host/convert?from=" + origin + "&to=" + foreign + "&amount=" + amount;
}

/**
 * @description It grabs the absolute url then fetches for the data to display it in a table
 * @author Yu Hua Yang 2133677
 */
async function getData() {
    getAbsoluteRequestURL();

    fetch(urlObject.absoluteQuery)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch((error) => console.log("There is a problem with the fetch: " + error));
}

/**
 * @description It creates a tbody and then loops through dataHistory to insert tds on the tr that will be created
 * @author Yu Hua Yang 2133677
 */
function displayResults(data) {
    if(document.getElementById("table-body-generated") !== null) {
        document.getElementById("table-body-generated").remove();
    }

    let new_tbody = addHTMLElement("tbody", null, "table-render-space");
    new_tbody.id = "table-body-generated";

    dataHistory.push(data);

    for (let i = 0; i < dataHistory.length; ++i) {
        let current_table_row = addHTMLElement("tr", null, "table-body-generated");
        let current_table_row_id = "tr"+i;
        current_table_row.id = current_table_row_id;

        addHTMLElement("td", dataHistory[i].query.from, current_table_row_id);
        addHTMLElement("td", dataHistory[i].query.to, current_table_row_id);
        addHTMLElement("td", dataHistory[i].info.rate, current_table_row_id);
        addHTMLElement("td", dataHistory[i].query.amount, current_table_row_id);
        addHTMLElement("td", (dataHistory[i].result).toFixed(2), current_table_row_id);
        addHTMLElement("td", dataHistory[i].date, current_table_row_id);
    }
}

/**
 * @description It fetches the data from currency.json to add value to select from in the option tags
 * @author Yu Hua Yang 2133677
 */
function initializeSelectOptions() {
    let currencyName = {};

    fetch("json\\currency.json")
    .then(response => response.json())
    .then(data => {
        currencyName = data;
        for(const element in currencyName) {
            let originOption = addHTMLElement("option",currencyName[element].name,"base-currency-select");
            originOption.value = element;
            let foreignOption = addHTMLElement("option",currencyName[element].name,"to-currency-select");
            foreignOption.value = element;
        }
    })
}

class huh {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
