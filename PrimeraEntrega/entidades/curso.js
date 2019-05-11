/**
 * Permite la consulta de la información de los cursos
 */

 //Obtengo los cursos de cursos.json
let cursos = require('./../datos/cursos.json');

/**
 * Permite obtener todos los cursos
 */
function ObtenerCursos() {
    return cursos;
}

/**
 * Permite obtener un curso por su identificador
 * @param {number} id: Identificador del curso 
 */
function ObtenerCursoPorId(id){

    return cursos.find( c => c.id === id);
}

/**
 * Exportación de las funciones
 */
module.exports = {
    ObtenerCursos,
    ObtenerCursoPorId
};