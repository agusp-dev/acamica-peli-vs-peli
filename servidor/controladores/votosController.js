const bdConn = require('../lib/db')

const registrarVoto = (req, res) => {

    const competenciaId = req.params.id
    const peliculaId = req.body.idPelicula

    if (!peliculaId || isNaN(peliculaId) || !competenciaId || isNaN(competenciaId)) {
        return res.status(404).json('Datos incorrectos')
    }

    bdConn.query(
        'INSERT INTO voto (`pelicula_id`, `competencia_id`) VALUES (?, ?)',
        [peliculaId, competenciaId],
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error)
            }
            res.status(200).json({});
        }
    )
}

const eliminarVotos = (req, res) => {

    const competenciaId = req.params.id
    if (!competenciaId || isNaN(competenciaId)) {
        return res.status(404).json('Datos incorrectos')
    }

    bdConn.query(
        `DELETE FROM voto WHERE competencia_id=${competenciaId}`,
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error)
            }
            res.status(200).json({});
        }
    )
}

module.exports = {
    registrarVoto,
    eliminarVotos
}