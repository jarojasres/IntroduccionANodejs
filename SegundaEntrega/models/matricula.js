const fileHelper = require('../helpers/fileHelper');
const path = require('path');
const pathDb = path.join(__dirname, "../db/matriculas.json");
const matriculas = fileHelper.read(pathDb);

const matricular = (matricula) => {

    let matriculaRepetida = buscarMatricula(matricula.usuarioId, matricula.cursoId);

    if(matriculaRepetida) {
        return {
            mensaje: `El usuario ya está matriculado en este curso`,
            clase: 'alert-danger'
        };
    }

    matriculas.push(matricula);
    guardar();

    return {
        mensaje: 'El registro fue existoso',
        clase: "alert-success"
    };

}

const buscarMatricula = (identificacion, cursoId) => {

    return matriculas.find(item => item.usuarioId === identificacion && item.cursoId == cursoId)
};

const guardar = () => {
    let data = JSON.stringify(matriculas);
    
    fileHelper.write(pathDb, data);
};

const obtenerIdentificacionesEstudiantesRegistrados = (cursoId) => {    

    let identificacionesCurso = matriculas.filter(m => m.cursoId === cursoId).map(item => item.usuarioId);

    return identificacionesCurso;
}

const eliminarEstudiante = (cursoId, usuarioId) => {

    

    let index = matriculas.findIndex(item => item.usuarioId == usuarioId && item.cursoId == cursoId);
    
    if(index != -1) {
        matriculas.splice(index,1);
    }
    //guardar();
}

module.exports = {
    matricular,
    obtenerIdentificacionesEstudiantesRegistrados,
    eliminarEstudiante
};