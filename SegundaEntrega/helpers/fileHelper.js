const fs = require('fs');

const read = (path) => {    
    try{
        return require(path);
    }
    catch(error) {
        return [];
    }
};

const write = (path, data) => {

    fs.writeFileSync(path, data);
}

module.exports = {
    read,
    write
};