const hbs = require('hbs');

hbs.registerHelper('stringify', obj => {return JSON.stringify(obj)});