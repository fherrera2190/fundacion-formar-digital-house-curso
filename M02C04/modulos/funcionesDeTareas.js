console.clear();
const { leerJSON, escribirJSON } = require('../data');
const Tarea = require('./Tarea')

module.exports = {
    tareas: leerJSON(),
    listar: function (tareas = this.tareas) {
        tareas.forEach(({ titulo, estado }, i) => {
            console.log(`${i + 1}. ${titulo} - ${estado}`)
        });
    },
    buscar: function (parametro, tipo) {
        switch (tipo) {
            case 'number':
                return this.tareas.find((tarea, index) => (index + 1) === parametro);
            case 'titulo':
                return this.tareas.find((tarea) => tarea.titulo.toLowerCase() === parametro.toLowerCase());
            case 'estado':
                return this.tareas.filter(tarea => tarea.estado.toLowerCase() === parametro.toLowerCase());
        }
    },
    crear: function (titulo) {
        const busqueda = this.buscar(titulo, 'titulo');
        if (busqueda) {
            return `No se puede crear la tarea por que ya existe\n`.red
        } else {
            const nuevaTarea = new Tarea(titulo);
            this.tareas.push(nuevaTarea);
            escribirJSON(this.tareas);
            console.log('------------------\nNueva tarea creada\n------------------'.green);
            return `${nuevaTarea.titulo} - ${nuevaTarea.estado}\n`;
        }
    },
    filtrarPorEstado: function (estado) {
        const busqueda = this.buscar(estado, 'estado');
        if (busqueda.length === 0) {
            console.log(('No hay tareas con el estado: ' + estado).red);
        } else {
            console.log(('------------------------------------\nTareas con el estado: ' + estado + '\n------------------------------------').green);
            busqueda.forEach((tarea, index) => { console.log(index + 1 + '. ' + tarea.titulo) })
            return '';
        }
    },
    modificarEstado: function (numeroTarea, nuevoEstado) {
        const busqueda = this.buscar(numeroTarea, 'number');
        if (busqueda === undefined) {
            console.log("El no existe una terea en esa posicion | Consulte la lista de tareas".red)
        } else {
            console.log('-------------------------------\nSe modifico el estado con exito\n-------------------------------'.green);
            busqueda.estado = nuevoEstado;
            escribirJSON(this.tareas);
        }
    },
    borrarTarea: function (numeroTarea) {
        if (numeroTarea >= this.tareas.length) {
            console.log("El no existe una terea en esa posicion".red);
        } else {
            const nuevasTareas = this.tareas.filter((tarea, index) => {
                if (index !== numeroTarea) {
                    return tarea;
                }
            });
            escribirJSON(nuevasTareas);
            console.log(('-------------------------------\nSe elimino la Tarea N°' + (numeroTarea+1) + ' con exito\n-------------------------------').green);
        }
    }
}