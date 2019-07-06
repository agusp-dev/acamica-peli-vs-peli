const bdConn = require('../lib/db')

const obtenerCompetencias = (req, res) => {
    bdConn.query(
        'SELECT * FROM competencia', 
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error);
            }
            res.status(200).json(returnCompetenciasJson(result));
        });
}

function returnCompetenciasJson(result) {
    return {'competencias': result}
}

const crearCompetencia = (req, res) => {

    const competenciaNombre = req.body.nombre
    if (!competenciaNombre) {
        return res.status(404).json('Los datos son incorrectos');
    }

    const generoId = req.body.genero != 0 ? req.body.genero : undefined
    const directorId = req.body.director != 0 ? req.body.director : undefined
    const actorId = req.body.actor != 0 ? req.body.actor : undefined

    bdConn.query(
        'INSERT INTO `competencia` (`nombre`, `genero_id`, `director_id`, `actor_id`) VALUES (?, ?, ?, ?)',
        [competenciaNombre, generoId, directorId, actorId], 
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error);
            }
            res.status(200).json({});
        });
}

const editarCompetencia = (req, res) => {

    const competenciaId = req.params.id
    const competenciaNombre = req.body.nombre

    if (!competenciaId) {
        return res.status(404).json('No se encuentra la competencia seleccionada');
    }

    if (!competenciaNombre) {
        return res.status(404).json('Nombre vacío');
    }

    bdConn.query(
        `UPDATE competencia SET \`nombre\` = '${competenciaNombre}'  WHERE id = ${competenciaId}`, 
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error);
            }
            res.status(200).json({})
        });
}

const eliminarCompetencia = (req, res) => {

    const competenciaId = req.params.id
    if (!competenciaId) {
        return res.status(404).json('No se encuentra la competencia seleccionada');
    }

    bdConn.query(
        `DELETE FROM voto WHERE competencia_id = ${competenciaId}`, 
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error);
            }

            bdConn.query(
                `DELETE FROM competencia WHERE id = ${competenciaId}`, 
                (error, result) => {
                    if (error) {
                        console.log(error)
                        return res.status(500).json(error);
                    }
                    res.status(200).json({});
                });
        });
}

module.exports = {
    obtenerCompetencias,
    crearCompetencia,
    eliminarCompetencia,
    editarCompetencia
}