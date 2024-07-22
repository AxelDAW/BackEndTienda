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

}