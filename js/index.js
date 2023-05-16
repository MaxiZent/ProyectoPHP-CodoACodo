

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
let edad1;
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
}
