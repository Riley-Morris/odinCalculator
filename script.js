
// Global variables initialize
let operatorStorage = '';
let numberStorage = [];
let numberToggler = 0;
let decimalToggler = 0

//set up eventlisteners
//numerical keypress listener, will only accept numbers because of inFinite
window.addEventListener('keydown', e => {
    const keyValue = e.key
    if (isFinite(keyValue)) {
        numClickHandler(keyValue)
    }else if (keyValue === '=') { //|| keyValue === 'enter' - this causes numclick if over a button)
        equalButton()
    }
})




//Define operators within an Object to use later to shorten checks
const operatorFunctions = {
    '+': (a, b) => a + b,
    '-': (a, b) =>a - b,
    '*': (a, b) =>a * b,
    '/': (a, b) =>a / b
}
function updateDisplay(numValue){
    const displayElement = document.getElementById('display');
    displayElement.innerHTML = numValue
}
// handdle clicks of numbers, will concatenate number if no operator
//is currently selected or add to number storage
//numberToggler set to 1 to check if user wants to create something larger than 9
function numClickHandler(numValue) {
    // if trying to combine 1 digit numbers to make something larger than 9
    if (numberStorage.length > 0 && numberToggler === 1 && decimalToggler === 0) {
        numberStorage[numberStorage.length - 1] = parseFloat(numberStorage[numberStorage.length - 1].toString() + numValue.toString())
        updateDisplay(numberStorage[numberStorage.length - 1])
    }else if(decimalToggler === 1){
        numberStorage[numberStorage.length - 1] = parseFloat(numberStorage[numberStorage.length - 1].toString() + '.' + numValue.toString())
        decimalToggler = 0
        updateDisplay(numberStorage[numberStorage.length - 1])
    }
    else {
        numberStorage.push(numValue)
        numberToggler = 1
        updateDisplay(numberStorage[numberStorage.length - 1])
    }
};

//operator button func
//check whether there are already 2 nums in storage and will operate if clicked
function operatorHandler(operatorValue){
    numberToggler = 0
    if (operatorStorage === '') {
        operatorStorage = operatorValue
    } else {
        numberStorage  = [operatorFunctions[operatorStorage](numberStorage[0], numberStorage[1])]
        operatorStorage = operatorValue
        updateDisplay(numberStorage[0])
    }
};

//make sure there are 2 numbers in storage, else just keep numStorage the same
//run update display at end
function equalButton(){
    if (numberStorage.length > 1){
        numberStorage  = [operatorFunctions[operatorStorage](numberStorage[0], numberStorage[1])]
        numberToggler = 0
        operatorStorage = ''
    }
    updateDisplay(numberStorage[0])
};

function decimalHandler(){
    if (numberStorage.length < 1) {
        numberStorage[0] = 0;
        decimalToggler = 1
        updateDisplay(numberStorage.toString() + '.')
    }else {
        decimalToggler = 1
        updateDisplay(numberStorage.toString() + '.')
    }
}
function clearHandler() {
    numberStorage = []
    decimalToggler = 0
    numberToggler = 0
    operatorStorage = ''
    updateDisplay(0)
}