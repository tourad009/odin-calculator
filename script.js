const screenText = document.querySelector('.screen-text');
let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let resetScreen = false;

function appendNumber(number) {
    if (resetScreen) {
        screenText.textContent = '';
        resetScreen = false;
    }
    screenText.textContent += number;
}

function chooseOperator(operator) {
    if (currentOperator !== '') evaluate();
    firstOperand = screenText.textContent;
    currentOperator = operator;
    resetScreen = true;
}

function evaluate() {
    if (currentOperator === '') return;
    secondOperand = screenText.textContent;
    screenText.textContent = operate(firstOperand, secondOperand, currentOperator);
    currentOperator = '';
}

function operate(first, second, operator) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                alert("Erreur: Division par zéro");
                return '';
            }
            return num1 / num2;
        default:
            return '';
    }
}

function reset() {
    screenText.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
}

document.querySelectorAll('.display').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.textContent));
});

document.querySelector('.equal').addEventListener('click', evaluate);

document.querySelector('.clear').addEventListener('click', reset);

document.querySelector('.delete').addEventListener('click', () => {
    screenText.textContent = screenText.textContent.slice(0,-1);
});