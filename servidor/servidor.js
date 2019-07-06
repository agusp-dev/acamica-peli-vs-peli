const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const competenciasController = require('./controladores/competenciasController')
const generosController = require('./controladores/generosController')
const directoresController = require('./controladores/directoresController')
const actoresController = require('./controladores/actoresController')
const peliculasController = require('./controladores/peliculasController')
const votosController = require('./controladores/votosController')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var puerto = '8080';

app.listen(puerto, () => console.log( "Escuchando en el puerto " + puerto ));

app.get('/competencias', competenciasController.obtenerCompetencias)
app.post('/competencias', competenciasController.crearCompetencia)

app.get('/generos', generosController.obtenerGeneros)
app.get('/directores', directoresController.obtenerDirectores)
app.get('/actores', actoresController.obtenerActores)

app.put('/competencias/:id', competenciasController.editarCompetencia)
app.delete('/competencias/:id', competenciasController.eliminarCompetencia)

app.get('/competencias/:id/peliculas', peliculasController.obtenerPeliculas)

app.post('/competencias/:id/voto', votosController.registrarVoto)
app.delete('/competencias/:id/votos', votosController.eliminarVotos)

app.get('/competencias/:id/resultados', peliculasController.obtenerPeliculasGanadoras)

