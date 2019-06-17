const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const cursoRepo = require('../models/curso');
const usuarioRepo = require('../models/usuario');
const matriculaRepo = require('../models/matricula');


//paths
const dirPublico = path.join(__dirname, '../public');
const dirPartial = path.join(__dirname, '../views/partials');
const dirNodeModules = path.join(__dirname , '../node_modules');
const dirViews = path.join(__dirname, '../views');

//registers
app.use(express.static(dirPublico));
app.use(bodyParser.urlencoded({extended: false}));
hbs.registerPartials(dirPartial);
app.engine("hbs", exphbs(
    { 
        defaultLayout: "main",
        helpers: {
            section: function(name, options){
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this); 
                return null;
            },
            stringify: function(data, options) {
                
                return JSON.stringify(data);
            },
            currency: function(data, options) {
                
                return parseFloat(data).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                
            },
            equals: function(string1, string2, options) {
                if(string1 === string2) {
                    return options.fn(this);
                } 
                return options.inverse(this);
            }            
        } 
    }));

app.set('view engine', 'hbs');
app.set('views', dirViews);
app.use('/css', express.static(dirNodeModules + '/bootstrap/dist/css'));
app.use('/css', express.static(dirNodeModules + '/@fortawesome/fontawesome-free/css'));
app.use('/js', express.static(dirNodeModules + '/jquery/dist'));
app.use('/js', express.static(dirNodeModules + '/popper.js/dist'));
app.use('/js', express.static(dirNodeModules + '/bootstrap/dist/js'));
app.use('/js', express.static(dirPublico + '/js'));
app.use('/js', express.static(dirNodeModules + '/@fortawesome/fontawesome-free/js'));

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

app.get('/cursos/cambiarEstado/:id/:estado', (req,res) => {

    cursoRepo.cambiarEstado(req.params.id, req.params.estado);

    res.send(true);
});

app.get('/matriculas/estudiantes/:id', (req, res) => {
    
    let identificaciones = matriculaRepo.obtenerIdentificacionesEstudiantesRegistrados(req.params.id);
    let usuarios = usuarioRepo.obtenerUsuarioPorIdentificaciones(identificaciones);
    res.send(usuarios);
});

app.get("/matriculas/eliminarEstudiante/:identificacion/:cursoId", (req,res) => {

    matriculaRepo.eliminarEstudiante(req.params.cursoId, req.params.identificacion);
    res.send(true);
});

app.get('/matricular', (req, res) => {
    let cursos = cursoRepo.buscarPorEstado("disponible");
    res.render("matricular", {
        cursos: cursos
    });
});

app.post('/matricular', (req, res) => {

    let cursos = cursoRepo.buscarPorEstado("disponible");

    let usuario = {
        identificacion: req.body.identificacion,
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono
    };

    let matricula = {
        usuarioId: req.body.identificacion,
        cursoId: req.body.cursoId,
        fecha: new Date()
    };

    usuarioRepo.actualizar(usuario);
    let mensaje = matriculaRepo.matricular(matricula);

    res.render("matricular", {
        cursos: cursos,
        mensaje: mensaje
    });
});

app.get('/coordinacion', (req, res) => {
    let cursos = cursoRepo.todos();

    res.render('coordinacion', {
        cursos: cursos 
    });
});

app.listen(3000, () => {
    console.log("Escuchando sobre el puerto 3000");
});
