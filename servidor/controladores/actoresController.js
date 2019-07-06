const bdConn = require('../lib/db')

const obtenerActores = (req, res) => {
    bdConn.query(
        'SELECT * FROM actor', 
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).send(error);
            }
            res.status(200).json(result);
        });
}

module.exports = {obtenerActores}