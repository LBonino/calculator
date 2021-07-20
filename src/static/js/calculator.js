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