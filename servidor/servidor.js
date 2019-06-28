const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const competenciasController = require('./controladores/CompetenciasController')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var puerto = '8080';

app.listen(puerto, () => console.log( "Escuchando en el puerto " + puerto ));

app.get('/competencias', competenciasController.obtenerCompetencias)