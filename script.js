const display = document.querySelector('.display > span')
const displayHistory = document.querySelector('.display-history > span')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const backspace = document.querySelector('.backspace')

let number1 = 0
let number2 = 0
let operator = ''
let arr = []

const getInput = (event) => {
  let digit = event.target
  if(/clear/.test(digit.classList)) {
    number1 = 0
    number2 = 0
    operator = ''
    arr = []
    display.innerText = ''
    displayHistory.innerText = ''
  } else if (number1 === 0) {
    if(!/operator/.test(digit.classList) && !/backspace/.test(digit.classList)) { //se o dígito clicado não for igual um operator e nem igual ao backspace
      showInput(digit)
      arr.push(digit.innerText)
    } else if (/backspace/.test(digit.classList)) {
      arr.pop()
      display.innerText = arr.toString().replace(/,/g, '') //atribui o que tem no arr para o innerText do display como string e remove todas as vírgulas da string passada.
    }
    if(display.innerText !== '' && /operator/.test(digit.classList)) { //se o display não for vazio e o dígito clicado for um operator
      arr = []
      if(!/equals/.test(digit.classList)) { //se o operador clicado não for o de igualdade
        number1 = display.innerText
        operator = digit.innerText
        display.innerText = ''
        displayHistory.innerText = `${number1} ${operator}`
      } else {
        displayHistory.innerText = `${display.innerText} ${digit.innerText}`
        display.innerText = ''
      }
    }
  }
  if(number1 !== 0 && number2 !== 0) {
    if(/equals/.test(digit.classList)) {
      let result = operate(operator, Number(number1), Number(number2))
      displayHistory.innerText = `${number1} ${operator} ${number2}=`
      display.innerText = result
      number1 = Number(result)
    } else if (/backspace/.test(digit.classList)) {
      displayHistory.innerText = ''
    } else if (/operator/.test(digit.classList) ) {
      number2 = 0
      operator = digit.innerText
      display.innerText = ''
      displayHistory.innerText = `${number1} ${operator}`
    }
  }
  if(number1 !== 0 && number2 == 0) {
    if(!/operator/.test(digit.classList) && !/backspace/.test(digit.classList)) {
      showInput(digit)
      arr.push(digit.innerText)
    } else if (/backspace/.test(digit.classList)) {
      arr.pop()
      display.innerText = arr.toString().replace(/,/g, '')
    }
    if(display.innerText !== '' && /operator/.test(digit.classList)) { //se o display não for vazio e o dígito clicado for um operator
      if(!/equals/.test(digit.classList)) { //se o operador clicado não for o de igualdade
        console.log('farofa')
        number2 = display.innerText
        let result = operate(operator, Number(number1), Number(number2))
        display.innerText = result
        number1 = Number(result)
        operator = digit.innerText
        displayHistory.innerText = `${result} ${operator}`
        display.innerText = ''
        number2 = 0
      } else {
        number2 = display.innerText
        let result = operate(operator, Number(number1), Number(number2))
        displayHistory.innerText = `${displayHistory.innerText} ${number2} =`
        display.innerText = result
        number1 = Number(result)
      }
    }
  }
}

const showInput = (digit) => {
  display.innerText += digit.innerText
}

const add = (n1, n2) => n1 + n2
const subtract = (n1, n2) => n1 - n2
const multiply = (n1, n2) => n1 * n2
const divide = (n1, n2) => n1 / n2

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