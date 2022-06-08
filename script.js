const display = document.querySelector(".display > span");
const displayHistory = document.querySelector(".display-history > span");
const digits = document.querySelectorAll(".digit");

let number = 0;
let number1 = 0;
let number2 = 0;
let operator = "";
let arr = [];
let arr2 = [];
let haveComma = false;
let result = 0;

const checkEventType = ({type, target, key}) => { // verifica o tipo de evento para retornar o mesmo tipo de input
  if (type === "click") return target;
  if (type === "keydown") return document.querySelector(`div[data-key='${key}']`);
};

const toggleActive = (digit) => {
  digit.classList.add("active");
  setTimeout(() => digit.classList.remove("active"), 100);
};

const backspace = () => {
  if (number1 !== 0 && number2 !== 0) {
    displayHistory.innerText = "";
  } else if (arr.pop() === ".") {
    haveComma = false;
    display.innerText = arr.join("");
  } else {
    display.innerText = arr.join("").replace(/\./, ","); // atribui o que tem no arr para o innerText do display como string remove o ponto por vírgula
  }

}

const getInput = (e) => {
  const digit = checkEventType(e);
  const digitClassList = digit.classList.value;

  toggleActive(digit);

  if (/comma/.test(digitClassList)) { //se o dígito clicado for igual a vírgula
    if (display.innerText == "") {
      display.innerText = "0,";
      haveComma = true;
      arr.push("0", ".");
    } else if (haveComma == false) {
      display.innerText += ",";
      haveComma = true;
      arr.push(".");
    }
  } else if (/clear/.test(digitClassList)) { // se o dígito clicado for igual a limpar
    reset();
  } else if (number1 === 0) {
    if (!/operator/.test(digitClassList) && !/backspace/.test(digitClassList)) { // se o dígito clicado não for igual um operator e nem igual ao backspace
      if (arr.join("").replace(/\./, "").length < 16) { // verifica se a length do arr é menor que 16, desconsiderando o ponto
        showInput(digit);
        arr.push(digit.innerText);
      }
    } else if (/backspace/.test(digitClassList)) {
      backspace()
    } 
    else if (display.innerText !== "" && /operator/.test(digitClassList)) { // se o display não for vazio e o dígito clicado for um operator
      if (!/equals/.test(digitClassList)) { // se o operador clicado não for o de igualdade
        number1 = arr.join("")
        arr = []
        haveComma = false;
        operator = digit.innerText;
        display.innerText = "";
        displayHistory.innerText = `${number1.replace(/\./, ",").slice(0, 17)} ${operator}`;
      } else {
        displayHistory.innerText = `${display.innerText} ${digit.innerText}`;
        display.innerText = "";
        haveComma = false;
      }
    }
  } else if (number1 !== 0 && number2 !== 0) {
    if (/equals/.test(digitClassList)) {
      result = operate(operator, Number(number1), Number(number2));

      if (String(result).replace(/\./, "").length > 16) { // verifica se a length do resultado da operação é maior que 16, desconsiderando o ponto
        displayHistory.innerText = `${number1.replace(/\./, ",").slice(0, 17)} ${operator} ${number2.replace(/\./, ",").slice(0, 17)}=`;
        display.innerText = String(result).replace(/\./, ",").slice(0, 17);
        number1 = String(result).slice(0, 17);
      } else {
        displayHistory.innerText = `${number1.replace(/\./, ",")} ${operator} ${number2.replace(/\./, ",")}=`;
        display.innerText = String(result).replace(/\./, ",");
        number1 = String(result);
      }
    } else if (/operator/.test(digitClassList) ) {
      number2 = 0;
      operator = digit.innerText;
      display.innerText = "";
      displayHistory.innerText = `${number1.replace(/\./, ",").slice(0, 17)} ${operator}`;
    } else if (/backspace/.test(digitClassList)) {
      backspace();
    }
  } else if (number1 !== 0 && number2 === 0) {
    if (!/operator/.test(digitClassList) && !/backspace/.test(digitClassList)) { // se o dígito clicado não for igual um operator e nem igual ao backspace
      if (arr.join("").replace(/\./, "").length < 16) { // verifica se a length do arr é menor que 16, desconsiderando o ponto
        showInput(digit);
        arr.push(digit.innerText);
      }
    } else if (display.innerText !== "" && /operator/.test(digitClassList)) { // se o display não for vazio e o dígito clicado for um operator
      if (!/equals/.test(digitClassList)) { // se o operador clicado não for o de igualdade
        number2 = arr.join("");
        if (operator === "/" && number2 == 0) {
          result = operate(operator, Number(number1), Number(number2));
          reset();
        } else {
          result = operate(operator, Number(number1), Number(number2));
          if (String(result).replace(/\./, "").length > 16) { // verifica se a length do resultado da operação é maior que 16, desconsiderando o ponto
            display.innerText = String(result).replace(/\./, ",").slice(0, 17);
            number1 = String(result).slice(0, 17);
            operator = digit.innerText;
            displayHistory.innerText = `${String(result).replace(/\./, ",").slice(0, 17)} ${operator}`;
            display.innerText = "";
            number2 = 0;
            haveComma = false;
          } else {
            display.innerText = String(result).replace(/\./, ",").slice(0, 17);
            number1 = String(result).slice(0, 17);
            operator = digit.innerText;
            displayHistory.innerText = `${String(result).replace(/\./, ",").slice(0, 17)} ${operator}`;
            display.innerText = "";
            arr = []
            number2 = 0;
            haveComma = "";
          }
        }
      } else {
        number2 = arr.join("")
        if (operator === "/" && number2 == 0) {
          result = operate(operator, Number(number1), Number(number2));
          reset();
        } else {
          result = operate(operator, Number(number1), Number(number2));
          if (String(result).replace(/\./, "").length > 16) { // verifica se a length do resultado da operação é maior que 16, desconsiderando o ponto
            displayHistory.innerText = `${displayHistory.innerText} ${number2.replace(/\./, ",")} =`;
            display.innerText = String(result).replace(/\./, ",").slice(0, 17);
            number1 = String(result).slice(0, 17);
            haveComma = false;
          } else {
            displayHistory.innerText = `${displayHistory.innerText} ${number2.toString().replace(/\./, ",")} =`;
            display.innerText = String(result).replace(/\./, ",").slice(0, 17);
            number1 = String(result).slice(0, 17);
            arr = []
            haveComma = false;
          }
        }
      }
    }
  }
};

const showInput = (digit) => {
  display.innerText += digit.innerText;
};

const reset = () => {
  number = 0;
  number1 = 0;
  number2 = 0;
  operator = "";
  arr = [];
  result = 0;
  display.innerText = "";
  displayHistory.innerText = "";
  haveComma = false;
};

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => {
  if (n2 === 0) return alert("Não é possível dividir por zero");
  return n1 / n2;
};

const operate = (operator, n1, n2) => {
  if (operator == "+") {
    return add(n1, n2);
  } else if (operator == "-") {
    return subtract(n1, n2);
  } else if (operator == "*") {
    return multiply(n1, n2);
  } else if (operator == "/") {
    return divide(n1, n2);
  }
};

digits.forEach((digit) => {
  digit.addEventListener("click", getInput);
});

window.addEventListener("keydown", getInput);
