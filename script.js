const display = document.querySelector('.display > span')
const displayHistory = document.querySelector('.display-history > span')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const backspace = document.querySelector('.backspace')

let number = 0
let number1 = 0
let number2 = 0
let operator = ''
let arr = []
let comma = ''

const getInput = (event) => {
  let digit = event.target
  if(/comma/.test(digit.classList)) {
    if(display.innerText == '') {
      display.innerText = `0${digit.innerText}`
      comma = '.'
      arr.push('0', comma, digit.innerText)
    } else if (comma == '') {
      display.innerText += digit.innerText
      comma = '.'
      arr.push(comma)
    }
  } else if (/clear/.test(digit.classList)) {
    reset()
  } else if (number1 === 0) {
    if(!/operator/.test(digit.classList) && !/backspace/.test(digit.classList)) { //se o dígito clicado não for igual um operator e nem igual ao backspace
      showInput(digit)
      arr.push(digit.innerText)
      number = arr.toString().replace(/,/g, '')
    } else if (/backspace/.test(digit.classList)) {
      arr.pop()
      display.innerText = arr.toString().replace(/,/g, '').replace(/\./, ',') //atribui o que tem no arr para o innerText do display como string e remove todas as vírgulas da string passada.
      number = display.innerText.replace(/,/, '.')
    }
    else if(display.innerText !== '' && /operator/.test(digit.classList)) { //se o display não for vazio e o dígito clicado for um operator
      arr = []
      if(!/equals/.test(digit.classList)) { //se o operador clicado não for o de igualdade
        number1 = number
        number = 0
        comma = ''
        operator = digit.innerText
        display.innerText = ''
        displayHistory.innerText = `${number1.toString().replace(/\./, ',')} ${operator}`
      } else {
        displayHistory.innerText = `${display.innerText} ${digit.innerText}`
        display.innerText = ''
        number = 0
        comma = ''
      }
    }
  } else if(number1 !== 0 && number2 !== 0) {
    if(/equals/.test(digit.classList)) {
      let result = operate(operator, Number(number1), Number(number2))
      displayHistory.innerText = `${number1.toString().replace(/\./, ',')} ${operator} ${number2.toString().replace(/\./, ',')}=`
      display.innerText = String(result).replace(/\./, ',')
      number1 = String(result)
    } else if (/backspace/.test(digit.classList)) {
      displayHistory.innerText = ''
    } else if (/operator/.test(digit.classList) ) {
      number2 = 0
      operator = digit.innerText
      display.innerText = ''
      displayHistory.innerText = `${number1.toString().replace(/\./, ',')} ${operator}`
    }
  } else if(number1 !== 0 && number2 === 0) {
    if(!/operator/.test(digit.classList) && !/backspace/.test(digit.classList)) {
      showInput(digit)
      arr.push(digit.innerText)
      number = arr.toString().replace(/,/g, '')
    } else if (/backspace/.test(digit.classList)) {
      arr.pop()
      display.innerText = arr.toString().replace(/,/g, '').replace(/\./, ',')
      number = display.innerText.replace(/,/, '.')
    }
    else if(display.innerText !== '' && /operator/.test(digit.classList)) { //se o display não for vazio e o dígito clicado for um operator
      arr = []
      if(!/equals/.test(digit.classList)) { //se o operador clicado não for o de igualdade
        number2 = number
        if(operator === '/' && number == 0) {
          let result = operate(operator, Number(number1), Number(number2))
          reset()
        } else {
          let result = operate(operator, Number(number1), Number(number2))
          display.innerText = String(result).replace(/\./, ',')
          number1 = String(result)
          operator = digit.innerText
          displayHistory.innerText = `${String(result).replace(/\./, ',')} ${operator}`
          display.innerText = ''
          number = 0
          number2 = 0
          comma = ''
        }
      } else {
        number2 = number
        if(operator === '/' && number2 == 0) {
          let result = operate(operator, Number(number1), Number(number2))
          reset()
        } else {
          let result = operate(operator, Number(number1), Number(number2))
          displayHistory.innerText = `${displayHistory.innerText} ${number2.toString().replace(/\./, ',')} =`
          display.innerText = String(result).replace(/\./, ',')
          number1 = String(result)
          number = 0
          comma = ''
        }
      }
    }
  }
}

const showInput = (digit) => {
  display.innerText += digit.innerText
}

const reset = () => {
  number = 0
  number1 = 0
  number2 = 0
  operator = ''
  arr = []
  display.innerText = ''
  displayHistory.innerText = ''
  comma = ''
}

const add = (n1, n2) => n1 + n2
const subtract = (n1, n2) => n1 - n2
const multiply = (n1, n2) => n1 * n2
const divide = (n1, n2) => {
  if(n2 === 0) {
    return alert('Não é possível dividir por zero')
  } else {
    return n1 / n2
  }
}

const operate = (operator, n1, n2) => {
  if(operator == '+') {
    return add(n1, n2)
  } else if (operator == '-') {
    return subtract(n1, n2)
  } else if (operator == '*') {
    return multiply(n1, n2)
  } else if (operator == '/') {
    return divide(n1, n2)
  }
}

digits.forEach(digit => {
  digit.addEventListener('click', getInput)
})