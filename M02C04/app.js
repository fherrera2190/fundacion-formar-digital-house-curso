console.clear();
const moduloFuncionesDeTareas = require('./modulos/funcionesDeTareas.js')
const argv = require('process').argv;
require('colors');
const accion = argv[2] === undefined ? undefined : argv[2].toLowerCase();

switch (accion) {
    //Lista todas las tareas existente con el comando:
    //node app listart
    case 'listar':
        console.log('------------------\nListado de tareas\n------------------'.green);
        moduloFuncionesDeTareas.listar();
        console.log();
        break;
    //Crea una tarea con el comando:
    //node app crear titulo
    case 'crear':
        if (argv[3] === undefined) {
            console.log('Error: no ingreso un titulo'.red);
            break
        }
        console.log(moduloFuncionesDeTareas.crear(argv[3]));
        break;
    //Muestras todas las tareas con el estado pasado como argumento
    //node app filtrar estado
    case 'filtrar':
        if (argv[3] === undefined) {
            console.log('Error: no ingreso un estado'.red);
            break
        }
        moduloFuncionesDeTareas.filtrarPorEstado(argv[3]);
        break;
    //Modifica el estado de una tarea con el comando :
    //node app modificar numeroroTarea nuevoEstado
    case 'modificar':
        if (+argv[3] < 1) {
            console.log("El no existe una terea en esa posicion".red)
            break;
        }
        if (argv[4] === undefined) {
            console.log("Error: no ingreso el nuevo estado de la tarea".red)
            break;
        }
        moduloFuncionesDeTareas.modificarEstado(+argv[3], argv[4]);
        break;
    //Elimina una tarea con el comando :
    //node app borrar numeroDeTarea 
    case 'borrar':
        if (+argv[3] < 1 || !argv[3]) {
            console.log("El no existe una terea en esa posicion".red)
            break;
        }
        moduloFuncionesDeTareas.borrarTarea(+argv[3] - 1);
        break;
    case (undefined):
        console.log('------------------------------------\nAtención - Tienes que pasarme una acción\nLas acciones disponibles son: listar,crear, filtrar, modificar y borrar\n----------------------------------------'.yellow);
        break;
    default:
        console.log('------------------------------------\nNo entiendo qué quieres hacer\nLas acciones disponibles son: listar,crear, filtrar\n------------------------------------'.red);
        break;
}