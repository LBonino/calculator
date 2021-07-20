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

const displayValue = document.querySelector("#display__value");
const altersDisplayButtons = document.querySelectorAll(".key--alters-display");

altersDisplayButtons.forEach(button => {
    button.addEventListener("click", populateDisplay);
});  