const ofertaCursos = require('./oferta-cursos');
const fileHelper = require('./helper/file-helper');
const opciones = require("./comandos/inscripcion-curso");
const nombreArchivoInscripcion = "inscripcion.txt";

const argv = require('yargs')
             .command('inscribir',  'Inscripción cursos de extensión', opciones)
             .argv;

if(argv.Id) {
    var curso = ofertaCursos.consultarInformacionCurso(argv.Id);
    if(curso) {
        actualizarArchivoInscripcion(argv, curso);
    }
}
else{
    ofertaCursos.mostrarOfertaCursos();

}


function actualizarArchivoInscripcion(nuevoEstudiante, curso) {

    var texto = "Fecha inscripción: " + new Date().toDateString() + "\n" + 
                "Incrito: " + nuevoEstudiante.cedula + " - " + nuevoEstudiante.nombre  + "\n" + 
                "Curso: " + curso.id + " - " + curso.nombre + "\n" +
                "Duración: " + curso.duracion + ", Valor: " + curso.valor.toLocaleString("co-ES");
    
    fileHelper.escribirLinea(texto, nombreArchivoInscripcion);    
}