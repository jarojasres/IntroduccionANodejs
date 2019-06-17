const fileHelper = require('../helpers/fileHelper');
const path = require('path');
const pathDb = path.join(__dirname, "../db/usuarios.json");
const usuarios = fileHelper.read(pathDb);

const actualizar = (usuario) => {

    let usuarioDb = buscarPorId(usuario.identificacion);    
    
    if(usuarioDb) {
        let index = usuarios.findIndex(i => i.identificacion === usuario.identificacion);
        usuarios[index] = usuario; 
    }
    else {
    usuarios.push(usuario);
    }
    guardar();
}; 

const buscarPorId = (identificacion) => {
    
    return usuarios.find(item => item.identificacion === identificacion);
};

const obtenerUsuarioPorIdentificaciones = (identificaciones) => {

    if(identificaciones.length === 0) {
        return [];
    }

    let data = usuarios.filter(item => identificaciones.indexOf(item.identificacion) != -1);

    return data;
};

const guardar = () => {
    let data = JSON.stringify(usuarios);
    
    fileHelper.write(pathDb, data);
};

module.exports = {
    actualizar,
    obtenerUsuarioPorIdentificaciones
};