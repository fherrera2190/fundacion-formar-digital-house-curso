const tarea = function Tarea(titulo, estado = "pendiente") {
    this.titulo = titulo;
    this.estado = estado;
};

module.exports = tarea;
