const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const cursoRepo = require('../models/curso');
const usuarioRepo = require('../models/usuario');
const matriculaRepo = require('../models/matricula');
require('./helpers');

//paths
const dirPublico = path.join(__dirname, '../public');
const dirPartial = path.join(__dirname, '../views/partials');
const dirNodeModules = path.join(__dirname , '../node_modules')

//registers
app.use(express.static(dirPublico));
app.use(bodyParser.urlencoded({extended: false}));
hbs.registerPartials(dirPartial);
app.engine("hbs", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'hbs');
app.use('/css', express.static(dirNodeModules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNodeModules + '/jquery/dist'));
app.use('/js', express.static(dirNodeModules + '/popper.js/dist'));
app.use('/js', express.static(dirNodeModules + '/bootstrap/dist/js'));


//End points

app.get('/', (req,res) => {
    let cursos = cursoRepo.buscarPorEstado("disponible");
    res.render('listarCursos', {
        cursos: cursos
    });
});

app.get('/cursos', (req,res) => {
    let cursos = cursoRepo.buscarPorEstado("disponible");
    res.render('listarCursos', {
        cursos: cursos
    });
});

app.get('/cursos/crear', (req, res) => {
    
    res.render("crearCurso");
});

app.post('/cursos/crear', (req, res) => {
    
    let curso = {
        id: req.body.cursoId,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        estado: "disponible",
        horas: req.body.horas,
        modalidad: req.body.modalidad
    };

    var mensaje = cursoRepo.crear(curso);

    res.render("crearCurso", {
        mensaje: mensaje
    });
});

app.listen(3000, () => {
    console.log("Escuchando sobre el puerto 3000");
});
