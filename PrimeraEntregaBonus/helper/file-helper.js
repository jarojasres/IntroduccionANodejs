const fs = require('fs');
const carpeta = "./archivos";

function escribirLinea(texto, nombreArchivo) {
    
    let path  = carpeta + "/" + nombreArchivo;    

    fs.appendFile(path, '\n' + texto + '\n', (err) => {

        if(err) throw err;
        console.log("El archivo" + " " + nombreArchivo + " se actualizó");
    });
}

module.exports  = {
    escribirLinea
}