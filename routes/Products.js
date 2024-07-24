module.exports = function ( app ){

    let db = require('../config/Conexion');
    let jwt = require('jsonwebtoken');
    let clave = require('../config/Clave');

    app.get('/menu', (req, res) => {

        db.query('Select * from productos', (err, resultado) => {

            if (err) {

                console.error('Error en la consulta', err);
                res.json({message: 'Error del servidor'})

            } else {

                res.json(resultado)

            }

        })

    })

    app.post('/perfil/subirprod', (req, res) => {

        let {nombre, desc, precio, dispo, categoria,imagen} = req.body;

        db.query(`Insert into productos (nombre, descripcion, precio, disponibilidad, categoria, imagen)
            values ('${nombre}', '${desc}', ${precio}, ${dispo}, ${categoria}, '${imagen}')`, (err, results) => {

                if (err) {

                    console.error("Error en la consulta", err);
                    res.json({msg: 'Error del servidor'});

                } else {

                    res.json(results)

                }

            })

    })

    app.get('/menu/producto/:id', (req, res) =>{

        db.query('Select * from productos where id = ' + req.params.id, (err, results) => {

            if (err) {

                console.error('Error en la consulta', err);
                res,json({ msg: "Error en el servidor."});

            } else {

                res.json(results);

            }

        })

    })

    app.get('/categorias', (req, res) => {

        db.query()

    })

}