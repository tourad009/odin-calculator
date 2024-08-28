function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error'; // Affiche un message d'erreur en cas de division par zéro
    }
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'Error'; // Gestion des erreurs
    }
}

const screenText = document.querySelector(".screen-text");
let currentInput = "";
let expression = ""; // Variable pour stocker l'expression en cours

function updateDisplay() {
    screenText.textContent = expression + (currentInput || '');
}

function compute() {
    // Effectue les calculs en respectant la priorité des opérations
    let tokens = expression.split(' ').filter(token => token.length > 0);

    if (tokens.length < 3) return parseFloat(tokens[0] || 0); // Pas assez d'éléments pour faire un calcul

    // Étape 1 : Effectuer les multiplications et divisions
    let i = 1;
    while (i < tokens.length) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            let result = operate(tokens[i], parseFloat(tokens[i - 1]), parseFloat(tokens[i + 1]));
            tokens.splice(i - 1, 3, result); // Remplace les 3 éléments (num1, op, num2) par le résultat
        } else {
            i += 2; // Passe à l'opérateur suivant
        }
    }

    // Étape 2 : Effectuer les additions et soustractions
    i = 1;
    while (i < tokens.length) {
        if (tokens[i] === '+' || tokens[i] === '-') {
            let result = operate(tokens[i], parseFloat(tokens[i - 1]), parseFloat(tokens[i + 1]));
            tokens.splice(i - 1, 3, result); // Remplace les 3 éléments (num1, op, num2) par le résultat
        } else {
            i += 2; // Passe à l'opérateur suivant
        }
    }

    return tokens[0]; // Retourne le résultat final
}

function handleButtonClick(value) {
    if (value === 'RESET') {
        currentInput = "";
        expression = '';
        updateDisplay();
    } else if (value === '=') {
        if (currentInput !== '') {
            expression += ` ${currentInput}`;
            const result = compute();
            screenText.textContent = result === 'Error' ? 'Error' : result;
            currentInput = '';
            expression = ''; // Réinitialise l'expression après le calcul
        }
    } else if (value === '.') {
        if (!currentInput.includes(".")) {
            currentInput += ".";
            updateDisplay();
        }
    } else if (value === 'DEL') {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else if (expression.length > 0) {
            // Supprime le dernier caractère de l'expression
            expression = expression.slice(0, -1).trim();

            // Réinitialise les valeurs après avoir supprimé un opérateur
            if (expression.length > 0 && ['+', '-', '*', '/'].includes(expression.slice(-1))) {
                currentInput = '';
            }
            updateDisplay();
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
            expression += ` ${currentInput} ${value}`;
            currentInput = "";
            updateDisplay();
        }
    } else {
        currentInput += value;
        updateDisplay();
    }
}

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener('click', (e) => {
        handleButtonClick(e.target.textContent);
    });
});
