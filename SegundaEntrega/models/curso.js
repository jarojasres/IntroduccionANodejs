const fileHelper = require('../helpers/fileHelper');
const path = require('path');
const pathDb = path.join(__dirname, "../db/cursos.json");
const cursos = fileHelper.read(pathDb);

const crear = (cursoNuevo) => {

    let cursosConElMismoId = buscarPorId(cursoNuevo.id);
    console.log(cursosConElMismoId);
    if(cursosConElMismoId) {
        return {
            mensaje: `El curso con id [${cursoNuevo.id}], ya existe`,
            clase: 'alert-danger'
        };
    } 

    cursos.push(cursoNuevo);
    guardar();
    return {
        mensaje: `El curso [${cursoNuevo.id}] ${cursoNuevo.nombre}, se creó correctamente`,
        clase: "alert-success"
    };
};

const buscarPorEstado = (estado) => {

    return cursos.filter(item => item.estado === estado);
}

const buscarPorId = (id) => {
    
    return cursos.find(item => item.id === id);
}

const guardar = () => {
    let data = JSON.stringify(cursos);
    
    fileHelper.write(pathDb, data);
}

module.exports = {
    crear,
    buscarPorEstado
};