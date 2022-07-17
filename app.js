let number1 = [], operator = [], number2 = []

const display = document.getElementById('display')
const numberBtn = document.querySelectorAll('.numberBtn')
const operatorBtn = document.querySelectorAll('.operatorBtn')
const equalBtn = document.getElementById('equalBtn')
const decimalBtn = document.getElementById('decimalBtn')
const ceBtn = document.getElementById('ceBtn')
const clear = document.getElementById('clear')
const negative = document.getElementById('negative')

function displayScreen(arr) {
  display.innerHTML = ''
  for (let i = 0; i < arr.length; i++) {
    display.innerHTML += arr[i]
  }
}

function solution(array, num1, num2) {
  let result
  switch (array[0]) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
  }
  return result
}

function performOperation() {
  let num1 = 0, num2 = 0;
  if (operator.length < 1) {
    return displayScreen(number1)
  }
  number1.length < 1
    || number1.indexOf(decimalBtn.textContent) == 0 && number1.length == 1
    || number1.indexOf('-') == 0 && number1.length == 1
    ? num1 = 0
    : num1 = parseFloat(number1.join(''))

  number2.length < 1
    || number2.indexOf(decimalBtn.textContent) == 0 && number2.length == 1
    || number2.indexOf('-') == 0 && number2.length == 1
    ? num2 = 0
    : num2 = parseFloat(number2.join(''))
  console.log(num1)
  console.log(operator)
  console.log(num2)

  const displayOperation = (() => {
    const solved = solution(operator, num1, num2)
    solved % 1 == 0
      ? display.innerHTML = solved
      : display.innerHTML = solved.toFixed(2)

    number1.splice(0, number1.length, display.innerHTML)
    operator.splice(0, operator.length)
    number2.splice(0, number2.length)
  })()

  decimalBtn.disabled = false
}

equalBtn.addEventListener('click', performOperation)

decimalBtn.addEventListener('click', () => {
  const dec = decimalBtn.textContent
  if (operator.length < 1 && !number1.includes(dec)) {
    number1.push(dec)
    displayScreen(number1)
    decimalBtn.setAttribute('disabled', '')
  } else if (!number2.includes(dec)) {
    number2.push(dec)
    displayScreen(number2)
    decimalBtn.setAttribute('disabled', '')
  }
})

ceBtn.addEventListener('click', () => {
  location.reload()
})

clear.addEventListener('click', () => {
  if (operator.length < 1) {
    number1.splice(-1, 1)
    displayScreen(number1)
  } else {
    number2.splice(-1, 1)
    displayScreen(number2)
  }
})

negative.addEventListener('click', () => {
  const neg = '-'
  if (operator.length < 1) {
    if (number1[0] < 0) {
      number1[0] *= -1
      displayScreen(number1)
    } else if (!number1.includes(neg)) {
      number1.unshift(neg)
      displayScreen(number1)
    } else {
      number1.shift()
      displayScreen(number1)
    }
  } else {
    if (!number2.includes(neg)) {
      (number2.unshift(neg))
      displayScreen(number2)
    } else {
      number2.shift()
      displayScreen(number2)
    }
  }
})

// Function to store and display numbers
function numberEvent(operand) {
  if (operator.length < 1) {
    number1.push(operand)
    displayScreen(number1)
  } else {
    number2.push(operand)
    displayScreen(number2)
  }
}

// Event listenter for number button 'click' events
numberBtn.forEach((element) => element.addEventListener('click', () => {
  const operand = parseInt(element.textContent)
  numberEvent(operand)
}))

// Event listener for number key 'keydown' events
window.addEventListener('keydown', (e) => {
  const holdValue = keycodeToValue(e)
  if (typeof holdValue == 'number') {
    const operand = parseInt(holdValue)
    numberEvent(operand)
  }
})

// Function to store and display operators
function operatorEvent (ops) {
  if (operator.length < 1) {
    operator.push(ops)
    decimalBtn.disabled = false
  } else {
    performOperation()
    operator.push(ops)
  }
}

// Event listenter for operator button 'click' events
operatorBtn.forEach((element) => element.addEventListener('click', () => {
  const ops = element.textContent
  operatorEvent(ops)
}))

// Event listener for operator key 'keydown' events
window.addEventListener('keydown', (e) => {
  const holdValue = keycodeToValue(e)
  if (typeof holdValue == 'string' && holdValue.length == 1) {
    const ops = holdValue
    operatorEvent(ops)
  }
})

// Function to convert keyCodes to charachter values 
function keycodeToValue(e) {
  let value;
  let y = e.keyCode
  switch (y) {
    case 55:
      value = 7;
      break;
    case 56:
      value = 8;
      break;
    case 57:
      value = 9;
      break;
    case 52:
      value = 4;
      break;
    case 53:
      value = 5;
      break;
    case 54:
      value = 6;
      break;
    case 49:
      value = 1;
      break;
    case 50:
      value = 2;
      break;
    case 51:
      value = 3;
      break;
    case 48:
      value = 0;
      break;
    case 107:
      value = '+';
      break;
    case 109:
      value = '-';
      break;
    case 111:
      value = '/';
      break;
    case 106:
      value = '*';
      break;
    default:
      value = 'err - not a valid key'
  }
  console.log(y)
  console.log(value)
  return value
}

//+ = 107, - =109, / = 111, * = 106; = = 13, . = 110, c= 8, del = 46