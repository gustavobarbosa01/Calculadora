function add(valor){ 
  return document.querySelector(".display").value += valor;
}

function inverterValor(){
  var valor = window.document.getElementById("display").value;
  if(!isNaN(valor)){
    window.document.getElementById("display").value = parseFloat(valor) * (-1);  
  }
}

function limparUltimoNumero(){
  var arrayValoresDisplay = getArrayDisplay().map(String);
  if(arrayValoresDisplay.length > 1){
    window.document.getElementById("display").value = arrayValoresDisplay.slice(0, arrayValoresDisplay.length -1).join('');
  }
}

function limparDiplay(){
  document.querySelector(".display").value = "";
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

  var valorDisplay = window.document.getElementById("display").value;
  var arrayValoresDisplay = [];
  var valor = "";
  //Verifica e insere no array
  for (var i = 0; i < valorDisplay.length; i++) {// [10, *, 2, +, 2, /, 2]
    switch(valorDisplay[i]){
      case "+":
      case "-":
      case "*":
      case "/":
        if(valor != "") {
          arrayValoresDisplay.push(parseFloat(valor));
        }
        arrayValoresDisplay.push(valorDisplay[i]);
        valor = ""; 
        break;
      case ",":
        valor += valorDisplay[i].replace(",", ".");
        break;
      default:
        valor += valorDisplay[i]; // valor = 2
    }
  }
  
  if(valor != "") {
    arrayValoresDisplay.push(parseFloat(valor));
  }

  return arrayValoresDisplay;
}

function calcular(op1, op2, operador) {
  switch(operador){
    case "+": return op1 + op2;
    case "-": return op1 - op2;
    case "*": return op1 * op2;
    case "/": {return op1 / op2};
    default: return 0.0;
  }
}

function displayContemDados(arrayValoresDisplay) {
  return arrayValoresDisplay.length >= 3;
}

function removeVazios(arrayValoresDisplay) {
  return arrayValoresDisplay.filter(function(n){return n !== undefined; }); // Remove os valores "empty ou undefined" dentro do array
}

function removerValorArray(array, indice) {
  delete array[indice];
}

function removerValoresCalculados(arrayValoresDisplay, indiceOperador) {
  removerValorArray(arrayValoresDisplay, indiceOperador);
  removerValorArray(arrayValoresDisplay, indiceOperador + 1);
}

function calcularDisplay(){
    
  var arrayValoresDisplay = getArrayDisplay();
  
  while(displayContemDados(arrayValoresDisplay) && (arrayValoresDisplay.includes('*') || arrayValoresDisplay.includes('/'))) {

    var indiceOperador = arrayValoresDisplay.includes('*') ? arrayValoresDisplay.indexOf('*') : 10000;
    var indiceDividir = arrayValoresDisplay.includes('/') ? arrayValoresDisplay.indexOf('/') : 10000;
    var operador = '*';
    
    if(indiceDividir < indiceOperador) {
      indiceOperador = indiceDividir;
      operador = '/'; 
    }

    var op1 = arrayValoresDisplay[indiceOperador - 1];
    var op2 = arrayValoresDisplay[indiceOperador + 1];

    if(operador == '/' && op2 == 0.0){
      exibirResultado('Não é possível dividir por zero');
      return;
    }

    arrayValoresDisplay[indiceOperador - 1] = calcular(op1, op2, operador);
    
    removerValoresCalculados(arrayValoresDisplay, indiceOperador);
    arrayValoresDisplay = removeVazios(arrayValoresDisplay);
  }

  if(arrayValoresDisplay.length > 1 && arrayValoresDisplay[0] == '-' && (!isNaN(arrayValoresDisplay[1]))) {
    arrayValoresDisplay[1] *= (-1);
    removerValorArray(arrayValoresDisplay, 0);
    arrayValoresDisplay = removeVazios(arrayValoresDisplay);
  } 

  while(displayContemDados(arrayValoresDisplay) && (arrayValoresDisplay.includes('+') || arrayValoresDisplay.includes('-'))) {

    var indiceOperador = arrayValoresDisplay.includes('+') ? arrayValoresDisplay.indexOf('+') : 10000;
    var indiceSubtrair = arrayValoresDisplay.includes('-') ? arrayValoresDisplay.indexOf('-') : 10000;
    var operador = '+';
    
    if(indiceSubtrair < indiceOperador) {
      indiceOperador = indiceSubtrair;
      operador = '-';
    }

    var op1 = arrayValoresDisplay[indiceOperador - 1];
    var op2 = arrayValoresDisplay[indiceOperador + 1];

    arrayValoresDisplay[indiceOperador - 1] = calcular(op1, op2, operador);

    removerValoresCalculados(arrayValoresDisplay, indiceOperador);
    arrayValoresDisplay = removeVazios(arrayValoresDisplay);

  }

  exibirResultado(arrayValoresDisplay[0]);
}


 

