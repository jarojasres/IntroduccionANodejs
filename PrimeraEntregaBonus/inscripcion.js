const ofertaCursos = require('./oferta-cursos');
const fileHelper = require('./helper/file-helper');
const opciones = require("./comandos/inscripcion-curso");
const nombreArchivoInscripcion = "inscripcion.txt";
const express = require('express');
const app = express();

const argv = require('yargs')
             .command('inscribir',  'Inscripción cursos de extensión', opciones)
             .argv;

if(argv.Id) {
    var curso = ofertaCursos.consultarInformacionCurso(argv.Id);
    if(curso) {
        //actualizarArchivoInscripcion(argv, curso);
        reportarInscripcion(argv, curso);
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

function reportarInscripcion(nuevoEstudiante, curso) {

    var texto = "<h2>Pre inscripción realizada</h2>" + 
                "<b>Fecha Inscripción:</b> " + new Date().toDateString() + "<br/>" +
                "<b>Inscrito:</b> " + nuevoEstudiante.cedula + " - " + nuevoEstudiante.nombre  + "<br/>" +
                "<b>Curso:</b> " + curso.id + " - " + curso.nombre + "<br/>" +
                "<b>Duración:</b> " + curso.duracion + "<br/>" + 
                "<b>Valor:</b> " + curso.valor.toLocaleString("co-ES");

    app.get("/preinscripcion", function(req, res){

        res.send(texto);
    });

    console.log("Consulte los resultados de la preinscripción en http://localhost/preinscripcion");
}

app.listen(3000);