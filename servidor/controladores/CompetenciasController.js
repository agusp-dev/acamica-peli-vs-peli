const bdConn = require('../lib/db')

const obtenerCompetencias = (req, res) => {
    bdConn.query(
        'SELECT * FROM competencia', 
        (error, result) => procesarResultado(res, error, result));
}

const procesarResultado = (res, error, result) => {
    if (error) {
        res.status(404).send('Error obteniendo competencias');
        console.log(error)
        return;
    }
    res.status(200).send(JSON.stringify({'competencias': result}));
}

module.exports = {obtenerCompetencias}