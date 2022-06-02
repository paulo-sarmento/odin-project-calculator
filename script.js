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
let arr2 = []
let comma = ''

const getInput = (event) => {
  let digit = event.target
  if(/comma/.test(digit.classList)) {
    if(display.innerText == '') {
      display.innerText = `0${digit.innerText}`
      comma = '.'
      arr.push('0', comma)
    } else if (comma == '') {
      display.innerText += digit.innerText
      comma = '.'
      arr.push(comma)
    }
  } else if (/clear/.test(digit.classList)) {
    reset()
  } else if (number1 === 0) {
    if(!/operator/.test(digit.classList) && !/backspace/.test(digit.classList)) { //se o dígito clicado não for igual um operator e nem igual ao backspace
      if(arr.join('').replace(/\./, '').length < 16) { //verifica se a length do arr é menor que 16, desconsiderando o ponto
        showInput(digit)
        arr.push(digit.innerText)
        arr2 = arr.join('')
        number = arr2
      }
    } else if (/backspace/.test(digit.classList)) {
      let validation = arr.pop()
      if(validation === '.') {
        comma = ''
        validation = ''
        display.innerText = arr.join('') //atribui o que tem no arr para o innerText do display como string, remove o ponto por vírgula
        number = display.innerText
      } else {
        display.innerText = arr.join('').replace(/\./, ',') //atribui o que tem no arr para o innerText do display como string remove o ponto por vírgula
        number = display.innerText.replace(/,/, '.')
      }
    }
    else if(display.innerText !== '' && /operator/.test(digit.classList)) { //se o display não for vazio e o dígito clicado for um operator
      arr = []
      arr2 = []
      if(!/equals/.test(digit.classList)) { //se o operador clicado não for o de igualdade
        number1 = number
        number = 0
        comma = ''
        operator = digit.innerText
        display.innerText = ''
        displayHistory.innerText = `${String(number1).replace(/\./, ',').slice(0, 17)} ${operator}`
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
      if(String(result).replace(/\./, '').length > 16) { //verifica se a length do resultado da operação é maior que 16, desconsiderando o ponto
        displayHistory.innerText = `${number1.toString().replace(/\./, ',').slice(0, 17)} ${operator} ${number2.toString().replace(/\./, ',').slice(0, 17)}=`
        display.innerText = String(result).replace(/\./, ',').slice(0, 17)
        number1 = String(result).slice(0, 17)
      } else {
        displayHistory.innerText = `${number1.toString().replace(/\./, ',')} ${operator} ${number2.toString().replace(/\./, ',')}=`
        display.innerText = String(result).replace(/\./, ',')
        number1 = String(result)
      }
    } else if (/backspace/.test(digit.classList)) {
      displayHistory.innerText = ''
    } else if (/operator/.test(digit.classList) ) {
      number2 = 0
      operator = digit.innerText
      display.innerText = ''
      displayHistory.innerText = `${number1.toString().replace(/\./, ',').slice(0, 17)} ${operator}`
    }
  } else if(number1 !== 0 && number2 === 0) {
    if(!/operator/.test(digit.classList) && !/backspace/.test(digit.classList)) { //se o dígito clicado não for igual um operator e nem igual ao backspace
      if(arr.join('').replace(/\./, '').length < 16) { //verifica se a length do arr é menor que 16, desconsiderando o ponto
        showInput(digit)
        arr.push(digit.innerText)
        arr2 = arr.join('')
        number = arr2
      }
    } else if (/backspace/.test(digit.classList)) {
      let validation = arr.pop()
      if(validation === '.'){
        comma = ''
        validation =''
        display.innerText = arr.join('').replace(/\./, ',') //atribui o que tem no arr para o innerText do display como string.
        number = display.innerText.replace(/,/, '.')
      } else {
        display.innerText = arr.join('').replace(/\./, ',') //atribui o que tem no arr para o innerText do display como string e remove o ponto por vírgula
        number = display.innerText.replace(/,/, '.')
      }
    }
    else if(display.innerText !== '' && /operator/.test(digit.classList)) { //se o display não for vazio e o dígito clicado for um operator
      arr = []
      arr2 = []
      if(!/equals/.test(digit.classList)) { //se o operador clicado não for o de igualdade
        number2 = number
        if(operator === '/' && number == 0) {
          let result = operate(operator, Number(number1), Number(number2))
          reset()
        } else {
          let result = operate(operator, Number(number1), Number(number2))
          if(String(result).replace(/\./, '').length > 16) { //verifica se a length do resultado da operação é maior que 16, desconsiderando o ponto
            display.innerText = String(result).replace(/\./, ',').slice(0, 17)
            number1 = String(result).slice(0, 17)
            operator = digit.innerText
            displayHistory.innerText = `${String(result).replace(/\./, ',').slice(0, 17)} ${operator}`
            display.innerText = ''
            number = 0
            number2 = 0
            comma = ''
          } else {
            display.innerText = String(result).replace(/\./, ',').slice(0, 17)
            number1 = String(result).slice(0, 17)
            operator = digit.innerText
            displayHistory.innerText = `${String(result).replace(/\./, ',').slice(0, 17)} ${operator}`
            display.innerText = ''
            number = 0
            number2 = 0
            comma = ''
          }
        }
      } else {
        number2 = number
        if(operator === '/' && number2 == 0) {
          let result = operate(operator, Number(number1), Number(number2))
          reset()
        } else {
          let result = operate(operator, Number(number1), Number(number2))
          if(String(result).replace(/\./, '').length > 16) { //verifica se a length do resultado da operação é maior que 16, desconsiderando o ponto
            displayHistory.innerText = `${displayHistory.innerText} ${number2.toString().replace(/\./, ',')} =`
            display.innerText = String(result).replace(/\./, ',').slice(0, 17)
            number1 = String(result).slice(0, 17)
            console.log(number1)
            number = 0
            comma = ''
          } else {
            displayHistory.innerText = `${displayHistory.innerText} ${number2.toString().replace(/\./, ',')} =`
            display.innerText = String(result).replace(/\./, ',').slice(0, 17)
            number1 = String(result).slice(0, 17)
            number = 0
            comma = ''
          }
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