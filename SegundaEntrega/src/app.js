const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
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

app.get('/', (req, res) => {
    res.render("index", {
        estudiante: "Julian Rojas",
        nota1: 2,
        nota2: 4,
        nota3: 3
    });
});

app.listen(3000, () => {
    console.log("Escuchando sobre el puerto 3000");
});
