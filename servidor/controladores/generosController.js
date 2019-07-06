const bdConn = require('../lib/db')

const obtenerGeneros = (req, res) => {
    bdConn.query(
        'SELECT * FROM genero', 
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error);
            }
            res.status(200).json(result);
        });
}

module.exports = {obtenerGeneros}