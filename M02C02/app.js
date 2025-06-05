console.clear();
const argv = require('process').argv;
const calculadora = require('./modulos/calculadora')
const operacion = argv[3];
const numeroA = +argv[2];
const numeroB = +argv[4];

switch (true) {
    case (operacion === 'sumar' || operacion === '+'):
        console.log(`Resultado: ${calculadora.sumar(numeroA, numeroB)}`);
        break;
    case (operacion === 'restar' || operacion === '-'):
        console.log(`Resultado: ${calculadora.restar(numeroA, numeroB)}`);
        break;
    case (operacion === 'multiplicar' || operacion === '*'):
        console.log(`Resultado: ${calculadora.multiplicar(numeroA, numeroB)}`);
        break;
    case (operacion === 'dividir' || operacion === '/'):
        console.log(`Resultado: ${calculadora.dividir(numeroA, numeroB)}`);
        break;
    default:
        console.log('No se que hacer');
        break;
}
