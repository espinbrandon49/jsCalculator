let number1 = [], operator = [], number2 = []

const display = document.getElementById('display')
const numberBtn = document.querySelectorAll('.numberBtn')
const operatorBtn = document.querySelectorAll('.operatorBtn')
const equalBtn = document.getElementById('equalBtn')
const decimalBtn = document.getElementById('decimalBtn')
const ceBtn = document.getElementById('ceBtn')
const clear = document.getElementById('clear')
const negative = document.getElementById('negative')

// Function that displays the operation values
function displayScreen(arr) {
  display.innerHTML = ''
  for (let i = 0; i < arr.length; i++) {
    display.innerHTML += arr[i]
  }
}

// Function that stores operations
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

// Function that performs operations
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

  const displayOperation = (() => {
    console.log(number1)
    console.log(number2)
    const solved = solution(operator, num1, num2)
    solved % 1 == 0
      ? display.innerHTML = solved
      : display.innerHTML = solved.toFixed(2)

    number1.splice(0, number1.length, display.innerHTML)
    operator.splice(0, operator.length)
    number2.splice(0, number2.length)
  })()

  if (number1[0] == Infinity) {
    display.innerHTML = 'Thanos was here';
    document.querySelectorAll('button').forEach(element => element.disabled = true)
  }
  decimalBtn.disabled = false
}
// click to evaluate an expression
equalBtn.addEventListener('click', performOperation)
// keydown enter to evaluate an expression
window.addEventListener('keydown', (e) => {
  console.log(e.key)
  if (e.key == 'Enter') {
    performOperation()
    equalBtn.disabled = true
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
// number button 'click' events
numberBtn.forEach((element) => element.addEventListener('click', () => {
  const operand = parseInt(element.textContent)
  numberEvent(operand)
}))
// number key 'keydown' events
window.addEventListener('keydown', (e) => {
  const holdValue = keycodeToValue(e)
  if (typeof holdValue == 'number') {
    const operand = parseInt(holdValue)
    numberEvent(operand)
  }
})

// Function to store and display operators
function operatorEvent(ops) {
  if (operator.length < 1) {
    operator.push(ops)
    decimalBtn.disabled = false
  } else {
    performOperation()
    operator.push(ops)
  }
}
// operator button 'click' events
operatorBtn.forEach((element) => element.addEventListener('click', () => {
  const ops = element.textContent
  operatorEvent(ops)
}))
// operator key 'keydown' events
window.addEventListener('keydown', (e) => {
  const holdValue = keycodeToValue(e)
  if (typeof holdValue == 'string'
    && holdValue.length == 1
    && holdValue != '.') {
    const ops = holdValue
    operatorEvent(ops)
  }
})

// Function for decimal button
function decimalEvent() {
  const dec = '.'
  if (number1[0] % 1 != 0) {
    decimalBtn.setAttribute('disabled', '')
  } else if (operator.length < 1 && !number1.includes(dec)) {
    number1.push(dec)
    displayScreen(number1)
    decimalBtn.setAttribute('disabled', '')
  } else if (!number2.includes(dec)) {
    number2.push(dec)
    displayScreen(number2)
    decimalBtn.setAttribute('disabled', '')
  }
}
// decimal button 'click' events
decimalBtn.addEventListener('click', decimalEvent)
// decimal key 'keydown events
window.addEventListener('keydown', (e) => {
  if (e.key == '.') {
    decimalEvent(e.key)
  }
})

// Function for backspace
function backSpace() {
  if (operator.length < 1) {
    number1.splice(-1, 1)
    displayScreen(number1)
  } else {
    number2.splice(-1, 1)
    displayScreen(number2)
  }
}
// backspace for click events
clear.addEventListener('click', backSpace)
// backspace for keydown events
window.addEventListener('keydown', (e) => {
  if (e.key == 'Backspace') {
    backSpace(e)
  }
})

// Clear everything
ceBtn.addEventListener('click', () => {
  location.reload()
})

// Function for positive/negative button
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

// Function to convert keyCodes to character values 
function keycodeToValue(e) {
  let value;
  let ekey = e.key
  switch (ekey) {
    case '7':
      value = 7;
      break;
    case '8':
      value = 8;
      break;
    case '9':
      value = 9;
      break;
    case '4':
      value = 4;
      break;
    case '5':
      value = 5;
      break;
    case '6':
      value = 6;
      break;
    case '1':
      value = 1;
      break;
    case '2':
      value = 2;
      break;
    case '3':
      value = 3;
      break;
    case '0':
      value = 0;
      break;
    case '+':
      value = '+';
      break;
    case '-':
      value = '-';
      break;
    case '/':
      value = '/';
      break;
    case '*':
      value = '*';
      break;
    case '=':
      value = '=';
      break;
    case '.':
      value = '.';
      break;
    default:
      value = 'err - not a valid key'
  }
  return value
}
