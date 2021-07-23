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
    typingOperand2: false,
};

function resetDisplay() {
    if (currentOperation.operand1 !== null && currentOperation.operand2 === null) {
        currentOperation.typingOperand2 = true;
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
        if (currentOperation.typingOperand2 === false) {
            return;
        }
        currentOperation.operand2 = Number(displayValue.textContent);
    }
}

function setOperator() {
    currentOperation.operator = this.textContent;
}

function resetCurrentOperation(exceptions) {
    Object.keys(currentOperation).forEach(property => {
        if (exceptions) {
            if (exceptions.includes(property)) {
                return;
            }
        }

        currentOperation[property] = (property === "typingOperand2") ? false : null;
    })
}

const operatorButtons = document.querySelectorAll(".key--operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", setOperand);
    button.addEventListener("click", () => {
        if (currentOperation.operand2 === null || !currentOperation.typingOperand2) {
            return;
        }
        
        currentOperation.result = Number(
            operate(currentOperation.operand1, currentOperation.operand2, currentOperation.operator).
            toFixed(3));

        currentOperation.result = (currentOperation.result === Infinity) ? "can't divide by zero" : currentOperation.result;
        displayValue.textContent = currentOperation.result;
        currentOperation.operand1 = currentOperation.result;
        resetCurrentOperation("operand1");
    });
    button.addEventListener("click", setOperator);
})

const equalButton = document.querySelector("#key--equal");
equalButton.addEventListener("click", () => {
    if (currentOperation.operand1 === null || !currentOperation.typingOperand2) {
        return;
    }
    
    setOperand();
    currentOperation.result = Number(
        operate(currentOperation.operand1, currentOperation.operand2, currentOperation.operator).
        toFixed(3));
    
    currentOperation.result = (currentOperation.result === Infinity) ? "can't divide by zero" : currentOperation.result;
    displayValue.textContent = currentOperation.result;
    resetCurrentOperation();
});

const clearButton = document.querySelector("#key--clear");
clearButton.addEventListener("click", () => {
    displayValue.textContent = "0";
    resetCurrentOperation();
});

function deleteLastCharacter() {
    if (displayValue.textContent === "0") {
        return;
    }
    
    displayValue.textContent = displayValue.textContent.slice(0, displayValue.textContent.length - 1);
}

const deleteButton = document.querySelector("#key--delete");
deleteButton.addEventListener("click", deleteLastCharacter);