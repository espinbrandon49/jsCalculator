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
    case 'x':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
  }
  return result
}

function performOperation(num1, num2) {
  const solved = solution(operator, num1, num2)
  solved % 1 == 0
    ? display.innerHTML = solved
    : display.innerHTML = solved.toFixed(2)

  number1.splice(0, number1.length, display.innerHTML)
  operator.splice(0, operator.length)
  number2.splice(0, number2.length)
}

numberBtn.forEach((element) => element.addEventListener('click', () => {
  const number = parseInt(element.textContent)
  if (operator.length < 1) {
    number1.push(number)
    displayScreen(number1)
  } else {
    number2.push(number)
    displayScreen(number2)
  }
}))

operatorBtn.forEach((element) => element.addEventListener('click', () => {
  operator.push(element.textContent)
  operatorBtn.forEach(element => element.setAttribute('disabled', ''))
}))

equalBtn.addEventListener('click', () => {
  let num1 = 0, num2 = 0;
  if (operator.length < 1) {
    return displayScreen(number1)
  }
  number1.length < 1
    || number1.indexOf(decimalBtn.textContent) == 0 && number1.length == 1
    || number1.indexOf('-') == 0 && number1.length == 1
    ? num1 = 0
    : num1 = parseFloat(number1.join(''))
  console.log(num1)

  number2.length < 1
    || number2.indexOf(decimalBtn.textContent) == 0 && number2.length == 1
    || number2.indexOf('-') == 0 && number2.length == 1
    ? num2 = 0
    : num2 = parseFloat(number2.join(''))
  console.log(num2)

  // const performOperation = (() => {
  //   const solved = solution(operator, num1, num2)
  //   solved % 1 == 0
  //     ? display.innerHTML = solved
  //     : display.innerHTML = solved.toFixed(2)

  //   number1.splice(0, number1.length, display.innerHTML)
  //   operator.splice(0, operator.length)
  //   number2.splice(0, number2.length)
  // })()
  performOperation(num1, num2)
  operatorBtn.forEach(element => element.disabled = false)
})

decimalBtn.addEventListener('click', () => {
  const dec = decimalBtn.textContent
  if (operator.length < 1 && !number1.includes(dec)) {
    number1.push(dec)
    displayScreen(number1)
  } else if (!number2.includes(dec)) {
    number2.push(dec)
    displayScreen(number2)
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
    if (!number1.includes(neg)) {
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
