let previousValue = '';
let currentValue = '';
let operator = '';

const screenText = document.querySelector('.screen-text');

const numberKeys = document.querySelectorAll('.display:not(.operator):not(.decimal)');
const operatorKeys = document.querySelectorAll('.operator');
const equals = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const decimal = document.querySelector('.decimal');

// Événements pour les boutons de nombres
numberKeys.forEach((num) => num.addEventListener('click', function(e) {
  handleNumber(e.target.textContent);
}));

// Événements pour les boutons d'opérateurs
operatorKeys.forEach((op) => op.addEventListener('click', function(e) {
  handleOperator(e.target.textContent);
}));

// Événement pour le bouton de suppression
deleteButton.addEventListener('click', function() {
  handleDelete();
});

// Événement pour le bouton de réinitialisation
clear.addEventListener('click', function() {
  clearCalculator();
});

// Événement pour le bouton égal
equals.addEventListener('click', function() {
  operate();
});

// Fonction pour gérer les nombres
function handleNumber(num) {
  if (currentValue.length < 9) {
    currentValue += num;
    updateScreen();
  }
}

// Fonction pour gérer les opérateurs
function handleOperator(op) {
  if (currentValue === '') return; // Empêche d'écraser une valeur vide
  if (previousValue !== '') {
    operate(); // Calcul de l'opération précédente si déjà présente
  }
  operator = op;
  previousValue = currentValue;
  currentValue = '';
  updateScreen();
}

// Fonction pour gérer la suppression du dernier caractère
function handleDelete() {
  currentValue = currentValue.slice(0, -1);
  updateScreen();
}

// Fonction pour réinitialiser la calculatrice
function clearCalculator() {
  currentValue = '';
  previousValue = '';
  operator = '';
  updateScreen();
}

// Fonction pour effectuer les calculs
function operate() {
  let result;
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  
  if (operator === '+') {
    result = prev + curr;
  } else if (operator === '-') {
    result = prev - curr;
  } else if (operator === '*') {
    result = prev * curr;
  } else if (operator === '/') {
    result = curr !== 0 ? prev / curr : 'Error';
  }

  currentValue = result !== 'Error' ? roundNumber(result) : 'Error';
  operator = '';
  previousValue = '';
  updateScreen();
}

// Fonction pour arrondir les résultats
function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

// Fonction pour mettre à jour l'affichage
function updateScreen() {
  // Afficher l'expression complète si l'opérateur est défini
  if (operator) {
    screenText.textContent = `${previousValue} ${operator} ${currentValue}`;
  } else {
    screenText.textContent = currentValue;
  }
}

// Fonction pour gérer le bouton décimal
decimal.addEventListener('click', function() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateScreen();
  }
});
