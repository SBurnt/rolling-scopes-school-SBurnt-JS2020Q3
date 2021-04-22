const currentOperand = document.querySelector('.current-operand');
const numbersBtn = document.querySelectorAll('.js-number');
const operationsBtn = document.querySelectorAll('.js-operation');
const clearBtns = document.querySelectorAll('.js-clear-btn');
const decimalBtn = document.querySelector('#js-decimal');
const sqrtBtn = document.querySelector('.js-sqrt');
const signBtn = document.querySelector('.js-sign');
let memoryNewNumber = false;
let memoryPendingOperation = '';
let memoryCurrentNumber = 0;

numbersBtn.forEach((number) => {
  number.addEventListener('click', (e) => {
    numberPress(e.target.textContent);
  });
});

operationsBtn.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    operationPress(e.target.textContent);
  });
});

clearBtns.forEach((clear) => {
  clear.addEventListener('click', (e) => {
    clearPress(e.target.textContent);
  });
});

decimalBtn.addEventListener('click', (e) => {
  decimalPress(e.target.textContent);
});

sqrtBtn.addEventListener('click', sqrtPress);

signBtn.addEventListener('click', signPress);

function numberPress(number) {
  if (memoryNewNumber) {
    currentOperand.textContent = number;
    memoryNewNumber = false;
  } else {
    if (currentOperand.textContent === '0') {
      currentOperand.textContent = number;
    } else {
      currentOperand.textContent += number;
    }
  }
}

function clearPress(clear) {
  if (clear === 'CE') {
    currentOperand.style.fontSize = '2.5rem';
    currentOperand.textContent = '0';
  } else if (clear === 'C') {
    currentOperand.style.fontSize = '2.5rem';
    currentOperand.textContent = '0';
    memoryCurrentNumber = 0;
    memoryPendingOperation = '';
  }
}

function operationPress(operation) {
  let memoryLocalOperation = currentOperand.textContent;

  if (memoryNewNumber && memoryPendingOperation !== '=') {
    currentOperand.textContent = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    if (memoryPendingOperation === '+') {
      memoryCurrentNumber += parseFloat(memoryLocalOperation);
    } else if (memoryPendingOperation === '-') {
      memoryCurrentNumber -= parseFloat(memoryLocalOperation);
    } else if (memoryPendingOperation === '*') {
      memoryCurrentNumber *= parseFloat(memoryLocalOperation);
    } else if (memoryPendingOperation === '÷') {
      memoryCurrentNumber /= parseFloat(memoryLocalOperation);
    } else if (memoryPendingOperation === 'xy') {
      memoryCurrentNumber = Math.pow(parseFloat(memoryCurrentNumber), parseFloat(memoryLocalOperation));
    } else {
      memoryCurrentNumber = parseFloat(memoryLocalOperation);
    }

    memoryCurrentNumber = +memoryCurrentNumber.toFixed(15);
    if (memoryCurrentNumber.toString().length > 13) {
      currentOperand.style.fontSize = '1.5rem';
      currentOperand.textContent = memoryCurrentNumber;
    } else {
      currentOperand.style.fontSize = '2.5rem';
      currentOperand.textContent = memoryCurrentNumber;
    }
    memoryPendingOperation = operation;
  }
}

function decimalPress(decimal) {
  let memoryLocalDecimal = currentOperand.textContent;

  if (memoryNewNumber) {
    memoryLocalDecimal = '0.';
    memoryNewNumber = false;
  } else {
    if (memoryLocalDecimal.indexOf('.') === -1) {
      memoryLocalDecimal += '.';
    }
  }
  currentOperand.textContent = memoryLocalDecimal;
}

function sqrtPress() {
  let memoryLocalSqrt = currentOperand.textContent;
  if (memoryLocalSqrt < 0) {
    currentOperand.style.fontSize = '1.5rem';
    currentOperand.textContent = 'В школе учили, что найти корень из отрицательного числа нельзя';
  } else {
    memoryLocalSqrt = Math.sqrt(parseFloat(memoryLocalSqrt));
    currentOperand.textContent = memoryLocalSqrt;
  }
}

function signPress() {
  let memoryLocalSign = currentOperand.textContent;
  memoryLocalSignRes = Math.sign(parseFloat(memoryLocalSign));
  if (memoryLocalSignRes == 1) {
    memoryLocalSign = -memoryLocalSign;
  } else if (memoryLocalSignRes == -1) {
    memoryLocalSign = +memoryLocalSign;
  }

  currentOperand.textContent = memoryLocalSign;
}
