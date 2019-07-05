const bdConn = require('../lib/db')

const obtenerPeliculas = (req, res) => {
    
    //Se obtiene competencia
    var competenciaId = req.params.id;
    bdConn.query(
        `SELECT nombre FROM competencia WHERE id=${competenciaId}`,
        (error, resultCompetencia) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error) 
            }
            if (resultCompetencia.length == 0) return res.status(404).json('La competencia seleccionada no existe.')
            
            //Se obtienen peliculas aleatorias
            bdConn.query(
                'SELECT id, titulo, poster FROM pelicula ORDER BY RAND() LIMIT 2;',
                (error, resultPeliculas) => {
                    if (error) {
                        console.log(error)
                        return res.status(500).json(error)
                    }
                    res.status(200).json(
                        returnJson(resultCompetencia[0].nombre, resultPeliculas))
                }
            )
        }
    )
}

function returnJson(competencia, result) {
    return {
        'opciones': {
            'competencia': competencia,
            'peliculas': result
        } 
    }
}

module.exports = {obtenerPeliculas}

