
const entidadCurso = require('./entidades/curso');


function mostrarOfertaCursos() {
    let cursos = entidadCurso.ObtenerCursos();

    console.log("****** CURSOS DE EDUCACIÓN CONTINUA ****** \n");

cursos.forEach((curso, index) => {

    setTimeout(function () {
        mostrarInformacionCurso(curso); 
    }, (index + 1) * 2000);
      
    });
}

function consultarInformacionCurso(id) {
    let curso = entidadCurso.ObtenerCursoPorId(id);
    if(curso){
        mostrarInformacionCurso(curso);
    }
    else {
        console.log("No hay ningún curso con el id: ["+ id +"]");
    }
    return curso;
}

/**
 * Permite mostar por consola, la información del curso
 * @param {Object} curso 
 */
function mostrarInformacionCurso(curso) {
    
    console.log("Curso: " + curso.nombre + "\n" +
                "\t" + "Identificador: " + curso.id + "\n"  +
                "\t" + "Valor: " + curso.valor + "\n"  +
                "\t" + "Intensidad (horas): " + curso.duracion + 
                "\n"); 
    
}

module.exports = {
    mostrarOfertaCursos,
    consultarInformacionCurso
};