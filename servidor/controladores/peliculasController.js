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
                        returnPeliculasJson(resultCompetencia[0].nombre, resultPeliculas))
                }
            )
        }
    )
}

function returnPeliculasJson(competencia, result) {
    return {
        'competencia': competencia,
        'peliculas': result 
    }
}

const obtenerPeliculasGanadoras = (req, res) => {
    
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
                'SELECT p.id, p.titulo, p.poster, v.competencia_id, COUNT(*) AS votos FROM pelicula p INNER JOIN voto v ON p.id = v.pelicula_id GROUP BY titulo, p.id, v.competencia_id HAVING v.competencia_id = ? ORDER BY COUNT(*) DESC LIMIT 3',
                [competenciaId],
                (error, resultGanadoras) => {
                    if (error) {
                        console.log(error)
                        return res.status(500).json(error)
                    }
                    res.status(200).json(
                        returnResultadosJson(resultCompetencia[0].nombre, resultGanadoras))
                }
            )
        }
    )
}

function returnResultadosJson(competencia, result) {
    return {
        'competencia': competencia,
        'resultados': result
    }
}

module.exports = {
    obtenerPeliculas,
    obtenerPeliculasGanadoras
}