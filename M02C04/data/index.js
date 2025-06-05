const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const leerJSON = () => {
    return JSON.parse(readFileSync(path.join(__dirname, 'tareas.json'), 'utf-8'));
}
const escribirJSON = (tareas) => {
    writeFileSync(path.join(__dirname, 'tareas.json'), JSON.stringify(tareas, null, 3));
}

module.exports = {
    leerJSON,
    escribirJSON,
}
