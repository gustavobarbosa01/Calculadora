function calcularDisplay(){
  
  limparDiplay();
  
  var arrayValoresDisplay = [];
  var valor = "";

  for (var i = 0; i < valorAnterior.length; i++) {
    switch(valorAnterior[i]){
      case "+":
      case "-":
      case "*":
      case "/":
        if(valor != "") {
          arrayValoresDisplay.push(parseFloat(valor));
        }
        arrayValoresDisplay.push(valorAnterior[i]);
        valor = "";
        break;
      default:
        valor += valorAnterior[i];
    }
  }
  
  if(valor != "") {
    arrayValoresDisplay.push(parseFloat(valor));
  }
  
  realizarCalculo = false;
  if(arrayValoresDisplay.length >= 3) {
    realizarCalculo = true;
  }
  
  //   28 + 5 - 75 * 3
  //   28 + 5 - 225
  //   33 - 225
  //   192  
  
  while(realizarCalculo && (arrayValoresDisplay.includes('*') || arrayValoresDisplay.includes('/'))) {

    if(arrayValoresDisplay.includes('*')) {
      var indiceOperador = arrayValoresDisplay.indexOf('*');
      var op1 = arrayValoresDisplay[indiceOperador - 1];
      var op2 = arrayValoresDisplay[indiceOperador + 1];

      arrayValoresDisplay[indiceOperador - 1] = op1 * op2;

      delete arrayValoresDisplay[indiceOperador];
      delete arrayValoresDisplay[indiceOperador + 1];

      arrayValoresDisplay = arrayValoresDisplay.filter(function(n){return n; });
    }

    if(arrayValoresDisplay.includes('/')) {
      var indiceOperador = arrayValoresDisplay.indexOf('/');
      var op1 = arrayValoresDisplay[indiceOperador - 1];
      var op2 = arrayValoresDisplay[indiceOperador + 1];

      arrayValoresDisplay[indiceOperador - 1] = op1 / op2;

      delete arrayValoresDisplay[indiceOperador];
      delete arrayValoresDisplay[indiceOperador + 1];

      arrayValoresDisplay = arrayValoresDisplay.filter(function(n){return n; });
    }

    if(arrayValoresDisplay.length < 3) {
      realizarCalculo = false;
    }

  }

  if(arrayValoresDisplay.length >= 3) {
    realizarCalculo = true;
  }

  while(realizarCalculo && (arrayValoresDisplay.includes('+') || arrayValoresDisplay.includes('-'))) {

    if(arrayValoresDisplay.includes('+')) {
      var indiceOperador = arrayValoresDisplay.indexOf('+');
      var op1 = arrayValoresDisplay[indiceOperador - 1];
      var op2 = arrayValoresDisplay[indiceOperador + 1];

      arrayValoresDisplay[indiceOperador - 1] = op1 + op2;

      delete arrayValoresDisplay[indiceOperador];
      delete arrayValoresDisplay[indiceOperador + 1];

      arrayValoresDisplay = arrayValoresDisplay.filter(function(n){return n; });
    }

    if(arrayValoresDisplay.includes('-')) {
      var indiceOperador = arrayValoresDisplay.indexOf('-');
      var op1 = arrayValoresDisplay[indiceOperador - 1];
      var op2 = arrayValoresDisplay[indiceOperador + 1];

      arrayValoresDisplay[indiceOperador - 1] = op1 - op2;

      delete arrayValoresDisplay[indiceOperador];
      delete arrayValoresDisplay[indiceOperador + 1];

      arrayValoresDisplay = arrayValoresDisplay.filter(function(n){return n; });
    }

    if(arrayValoresDisplay.length < 3) {
      realizarCalculo = false;
    }

  }

  exibirResultado(arrayValoresDisplay[0]);

  /*return  resultado;

  if(valorAnterior.indexOf("+")!==-1){
    var soma = "+"
    selecionaOperadores(valorAnterior,soma);
  }else
  if(valorAnterior.indexOf("-")!==-1){
    var subtrai = "-"
    selecionaOperadores(valorAnterior,subtrai);
  }else
  if(valorAnterior.indexOf("*")!==-1){
    var multiplica = "*"
    selecionaOperadores(valorAnterior,multiplica);
  }else
  if(valorAnterior.indexOf("/")!==-1){
    var divide = "/"
    selecionaOperadores(valorAnterior,divide);
  }*/
}



























//var display = document.querySelector(".display");
var digitoDisplay = "";
var valorAnterior;


function add(valor){
  digitoDisplay = document.querySelector(".display").value += valor;
  
  return digitoDisplay;
}

function inverterValor(){
  var valor = window.document.getElementById("display").value;
  if(!isNaN(valor)){
    window.document.getElementById("display").value = parseFloat(valor) * (-1);  
  }
}
function limparUltimoNumero(){
  var arrayValoresDisplay = [];
  var valor = "";

  var valorDisplay = window.document.getElementById("display").value;

  for (var i = 0; i < valorDisplay.length; i++) {
    switch(valorDisplay[i]){
      case "+":
      case "-":
      case "*":
      case "/":
        if(valor != "") {
          arrayValoresDisplay.push(valor);
        }
        arrayValoresDisplay.push(valorDisplay[i]);
        valor = "";
        break;
      default:
        valor += valorDisplay[i];
    }
  }

  if(arrayValoresDisplay.length > 1){
    window.document.getElementById("display").value = arrayValoresDisplay.slice(0, arrayValoresDisplay.length).join('');
  }
}

function limparDiplay(){
  valorAnterior = digitoDisplay;
  disp = document.querySelector(".display").value = "";
}

function exibirResultado(resultado){
 window.document.getElementById("display").value = resultado;
}

function backspace(){
  var backNumero = document.querySelector(".display").value;
  document.querySelector(".display").value = backNumero.slice(0,-1);
  console.log(backNumero);
}

function getArrayDisplay() {
  var arrayValoresDisplay = [];
  var valor = "";

  for (var i = 0; i < valorAnterior.length; i++) {
    switch(valorAnterior[i]){
      case "+":
      case "-":
      case "*":
      case "/":
        if(valor != "") {
          arrayValoresDisplay.push(parseFloat(valor));
        }
        arrayValoresDisplay.push(valorAnterior[i]);
        valor = "";
        break;
      default:
        valor += valorAnterior[i];
    }
  }
  
  if(valor != "") {
    arrayValoresDisplay.push(parseFloat(valor));
  }

  return arrayValoresDisplay;
}

function calcularDisplay(){
  
  limparDiplay();
  
  var arrayValoresDisplay = getArrayDisplay();
  
  var realizarCalculo = false;
  if(arrayValoresDisplay.length >= 3) {
    realizarCalculo = true;
  }
  
  while(realizarCalculo && (arrayValoresDisplay.includes('*') || arrayValoresDisplay.includes('/'))) {

    var indiceOperador = arrayValoresDisplay.includes('*') ? arrayValoresDisplay.indexOf('*') : 10000; // posição 10000
    var indiceDividir = arrayValoresDisplay.includes('/') ? arrayValoresDisplay.indexOf('/') : 10000;  // posição 3
    var operador = '*';
    
    if(indiceDividir < indiceOperador) { // 3 < 10000
      indiceOperador = indiceDividir;  // indiceOperador = posição3
      operador = '/'; // operador = '/'
    }

    var op1 = arrayValoresDisplay[indiceOperador - 1]; // valor 5
    var op2 = arrayValoresDisplay[indiceOperador + 1]; // valor 7

    if(operador == '*') {
      arrayValoresDisplay[indiceOperador - 1] = op1 * op2;
    } else {
      if(op2 == 0.0){
        exibirResultado('Não é possível dividir por zero');
        return;
      }
      arrayValoresDisplay[indiceOperador - 1] = op1 / op2;
    }   

    delete arrayValoresDisplay[indiceOperador];
    delete arrayValoresDisplay[indiceOperador + 1];

    arrayValoresDisplay = arrayValoresDisplay.filter(function(n){return n !== undefined; }); // Remove os valores "empty" dentro do array

    if(arrayValoresDisplay.length < 3) {
      realizarCalculo = false;
    }
  }

  /*
  [0] = -        - 4 + 5
  [1] = -4
  [2] = +
  [3] = 5
  */

  if(arrayValoresDisplay.length > 1 && arrayValoresDisplay[0] == '-' && (!isNaN(arrayValoresDisplay[1]))) {
    arrayValoresDisplay[1] *= (-1);
    delete arrayValoresDisplay[0];
    arrayValoresDisplay = arrayValoresDisplay.filter(function(n){return n !== undefined; }); // Remove os valores "empty" dentro do array
  }

  if(arrayValoresDisplay.length >= 3) {
    realizarCalculo = true;
  } 

  while(realizarCalculo && (arrayValoresDisplay.includes('+') || arrayValoresDisplay.includes('-'))) {

    var indiceOperador = arrayValoresDisplay.includes('+') ? arrayValoresDisplay.indexOf('+') : 10000;
    var indiceSubtrair = arrayValoresDisplay.includes('-') ? arrayValoresDisplay.indexOf('-') : 10000;
    var operador = '+';
    
    if(indiceSubtrair < indiceOperador) {
      indiceOperador = indiceSubtrair;
      operador = '-';
    }

    var op1 = arrayValoresDisplay[indiceOperador - 1];
    var op2 = arrayValoresDisplay[indiceOperador + 1];

    if(operador == '+') {
      arrayValoresDisplay[indiceOperador - 1] = op1 + op2;
    } else {
      arrayValoresDisplay[indiceOperador - 1] = op1 - op2;
    }

    delete arrayValoresDisplay[indiceOperador];
    delete arrayValoresDisplay[indiceOperador + 1];

    arrayValoresDisplay = arrayValoresDisplay.filter(function(n){return n !== undefined; }); // Remove os valores "empty" dentro do array

    if(arrayValoresDisplay.length < 3) {
      realizarCalculo = false;
    }

  }

  exibirResultado(arrayValoresDisplay[0]);
}


 




 

