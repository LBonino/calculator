function add(operand1, operand2) {
    return operand1 + operand2;
}

function substract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

function operate(operand1, operand2, operator) {
    switch (operator) {
        case "+":
           return add(operand1, operand2);
        case "-":
           return substract(operand1, operand2);
        case "*":
           return multiply(operand1, operand2);
        case "/":
           return divide(operand1, operand2);
        default:
            throw "Invalid operator";
    }
}

const displayValue = document.querySelector("#display__value");
const altersDisplayButtons = document.querySelectorAll(".key--alters-display");

const currentOperation = {
    operand1: null,
    operand2: null,
    operator: null,
    result: null,
};

function resetDisplay() {
    if (currentOperation.operand1 && currentOperation.operand2 === null) {
        displayValue.textContent = "0";
        currentOperation.operand2 = 0;
    }
}

function getWidthPercentage(element) {
    return (element.offsetWidth * 100) / element.parentNode.offsetWidth;
}

function populateDisplay() {
    switch (true) {
        case (getWidthPercentage(displayValue) > 89):
        case (displayValue.textContent.includes(".") && this.textContent === "."):
            return;
        case (displayValue.textContent === "0" && this.textContent === "."):
            return displayValue.textContent += this.textContent;
        case (displayValue.textContent === "0"):
            return displayValue.textContent = this.textContent;
        default:
            return displayValue.textContent += this.textContent;
    }
}

altersDisplayButtons.forEach(button => {
    button.addEventListener("click", resetDisplay);
    button.addEventListener("click", populateDisplay);
});

function setOperand() {
    if (currentOperation.operand1 === null) {
        currentOperation.operand1 = Number(displayValue.textContent);
    }
    else {
        currentOperation.operand2 = Number(displayValue.textContent);
    }
}

function setOperator() {
    currentOperation.operator = this.textContent;
}

const operatorButtons = document.querySelectorAll(".key--operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", setOperand);
    button.addEventListener("click", () => {
        if (currentOperation.operand2 === null) {
            return;
        }
        
        currentOperation.result = operate(currentOperation.operand1, currentOperation.operand2, currentOperation.operator);
        displayValue.textContent = currentOperation.result;
        currentOperation.operand1 = currentOperation.result;
        currentOperation.operand2 = null;
        currentOperation.result = null;
    });
    button.addEventListener("click", setOperator);
})

const equalButton = document.querySelector("#key--equal");
equalButton.addEventListener("click", () => {
    if (currentOperation.operand1 === null) {
        return;
    }
    
    setOperand();
    currentOperation.result = operate(currentOperation.operand1, currentOperation.operand2, currentOperation.operator);
    displayValue.textContent = currentOperation.result;
    currentOperation.operand1 = null;
    currentOperation.operand2 = null;
    currentOperation.result = null;
});