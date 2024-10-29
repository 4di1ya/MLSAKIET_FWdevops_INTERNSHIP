let displayValue = "0";
let currentOperator = null;
let firstOperand = null;

const display = document.getElementById("display");
const operatorDisplay = document.getElementById("operator-display");

function updateDisplay() {
  display.textContent = displayValue;
}

function clearDisplay() {
  displayValue = "0";
  currentOperator = null;
  firstOperand = null;
  operatorDisplay.textContent = "";
  updateDisplay();
}

function deleteDigit() {
  if (displayValue.length === 1) {
    displayValue = "0";
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(number) {
  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (currentOperator) calculate();
  firstOperand = parseFloat(displayValue);
  currentOperator = operator;
  operatorDisplay.textContent = operator;
  displayValue = "0";
}

function calculate() {
  if (currentOperator && firstOperand !== null) {
    const secondOperand = parseFloat(displayValue);
    switch (currentOperator) {
      case "+":
        displayValue = firstOperand + secondOperand;
        break;
      case "-":
        displayValue = firstOperand - secondOperand;
        break;
      case "*":
        displayValue = firstOperand * secondOperand;
        break;
      case "/":
        displayValue =
          secondOperand === 0 ? "Error" : firstOperand / secondOperand;
        break;
      case "%":
        displayValue = firstOperand % secondOperand;
        break;
    }
    displayValue = String(displayValue);
    currentOperator = null;
    firstOperand = null;
    operatorDisplay.textContent = "";
  }
  updateDisplay();
}
