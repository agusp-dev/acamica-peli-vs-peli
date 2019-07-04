const bdConn = require('../lib/db')

const obtenerCompetencias = (req, res) => {
    bdConn.query(
        'SELECT * FROM competencia', 
        (error, result) => {
            if (error) return res.status(500).send(error);
            res.status(200).json(returnJson(result));
        });
}

function returnJson(result) {
    return {'competencias': result}
}

module.exports = {obtenerCompetencias}