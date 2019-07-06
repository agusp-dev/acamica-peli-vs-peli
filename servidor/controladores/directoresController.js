const bdConn = require('../lib/db')

const obtenerDirectores = (req, res) => {
    bdConn.query(
        'SELECT * FROM director', 
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error);
            }
            res.status(200).json(result);
        });
}

module.exports = {obtenerDirectores}