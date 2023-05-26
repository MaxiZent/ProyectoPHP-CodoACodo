let nombre;
nombre = "Juan";

console.log(nombre);

let edad = 24;

console.log("edad");

let contador = 1;
console.log(contador);

contador = contador + 1; // 2
console.log(contador);

contador = contador + 1; //3
console.log(contador);

// forma igual //

++contador; //4
console.log(contador);

contador += 5; //9
console.log(contador);

//una persona quiere saber
//si es mayor de edad

/*
print "ingrese su edad"
14
si edad >= 18
entonces "Es mayor de edad"
*/

/* let edad1;
edad1 = "45";

let edad2;
edad2 = 45;

edad = 15;
// True
if (edad > 18) {
    console.log("Es mayor de edad");
} else {
    console.log("edad: " + edad);
    console.log("Es menor de edad");
*/

let dia = 8;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miercoles");
    break;
  case 4:
    console.log("Jueves");
    break;
  case 5:
    console.log("Viernes");
    break;
  case 6:
  case 7:
    console.log("Fin de semana");
    break;
  default:
    console.log("No es dia valido");
    break;
}

/* Estructuras de repetición */

/* while */

let contadorr = 1;
/*
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
*/

while (contadorr <= 10) {
  console.log(contadorr);
  contadorr++;
}

/* do while*/
contadorr = 1;
do {
  console.log(contadorr);
  contadorr++;
} while (contadorr <= 10);

/* for */
for (let contador2 = 1; contador2 <= 10; contador2++) {
  console.log(contador2);
}

// AMBITO (SCOPE) DE UNA VARIABLE - fuera de FOR
// ES ======>
// console.log(contador2);

// CUENTA ATRAS

for (let i = 10; i >= 0; i--) {
  if (i == 0) {
    console.log("Despegue");
  }
  else {
    console.log("Faltan " + i + " Segundos")
  }
}

//IMPRIMIR NUMEROS PARES HASTA 10

for (let i = 0; i <= 10; i++) {
  console.log(i);
}

//IMPRIMIR TABLAS DE MULTIPLICAR



/* Ejercicios */
/*
Se ingresan números hasta que se introduce un cero.
La computadora muestra el máximo y el mínimo. 
*/
let numero, maximo = 0, minimo = 999999;
do {
    numero = prompt("Ingrese un número, 0 para terminar");
    if(numero > maximo) {
        maximo = numero;
    }
    if(numero < minimo && numero != 0) {
        minimo = numero;
    }
} while (numero != 0)

console.log("Máximo: " + maximo);
console.log("Mínimo: " + minimo);