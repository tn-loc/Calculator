const display = document.querySelector(".display");
const sign = document.querySelector(".sign");
const num = document.querySelector(".num");
const res = document.querySelector(".res");

const numberButtons = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero");
const operateButtons = document.querySelectorAll(".plus, .minus, .times, .divided");
const calculate = document.querySelector(".calculate");
const del = document.querySelector(".del");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = 0;
let numDisplayValue = "";
let justCalculated = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "Error" : a / b;

const operate = (math, a, b) => {
    if (math === "+") return add(a, b);
    if (math === "-") return subtract(a, b);
    if (math === "*") return multiply(a, b);
    if (math === "/") return divide(a, b);
};
const formatResult = (num) => Number.isFinite(num) ? Math.round(num) : "Error";

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (justCalculated) {
            numDisplayValue = "";
            firstNumber = "";
            secondNumber = "";
            operator = "";
            res.textContent = "";
            sign.textContent = "";
            justCalculated = false;
        }

        numDisplayValue += button.textContent;
        num.textContent = numDisplayValue;
    });
});

operateButtons.forEach(button => {
    button.addEventListener("click", () => {
        const op = button.textContent;
        if (justCalculated) {
            justCalculated = false;
            sign.textContent = op;
            operator = op;
            numDisplayValue = "";
            return;
        }

        if (operator && numDisplayValue === "") {
            sign.textContent = op;
            operator = op;
            return;
        }

        if (firstNumber !== "" && operator !== "" && numDisplayValue !== "") {
            secondNumber = parseInt(numDisplayValue);
            result = operate(operator, firstNumber, secondNumber);
            res.textContent = formatResult(result);
            firstNumber = result;
            numDisplayValue = "";
        } else {
            firstNumber = parseInt(numDisplayValue);
            numDisplayValue = "";
        }

        sign.textContent = op;
        operator = op;
    });
});

calculate.addEventListener("click", () => {
    if (operator === "" || (numDisplayValue === "" && secondNumber === "")) return;

    if (numDisplayValue !== "") secondNumber = parseInt(numDisplayValue);

    result = operate(operator, firstNumber, secondNumber);
    res.textContent = formatResult(result);
    firstNumber = result;
    numDisplayValue = "";
    justCalculated = true;
});

del.addEventListener("click", () => {
    justCalculated = false;
    firstNumber = "";
    operator = "";
    secondNumber = "";
    result = 0;
    numDisplayValue = "";
    sign.textContent = "";
    num.textContent = 0;
    res.textContent = "";
});
