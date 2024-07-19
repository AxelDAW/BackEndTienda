module.exports = function ( app ) {

    let db = require('../config/Conexion');
    let jwt = require('jsonwebtoken');
    let clave = require('../config/Clave');

    app.post('/newusu', ( req, res) =>{

        let { nombre, contraseña } = req.body;

        db.query(`INSERT INTO users (nombre, contraseña) VALUES('${nombre}', '${contraseña}')`, (err, resultado) => {

            if (err) {

                console.error('Error en la consulta.',err);
                res.json({message: 'Error del servidor.' })

            } 

            if (resultado) {

                res.json({ valido: true});

            } else {

                res.json({ valido: false})

            }

              

        })


    })

    app.post('/inisesion', (req, res) => {

        let { nombre, pass } = req.body;

        db.query(`Select * from users where nombre = '${nombre}' AND contraseña = '${pass}'`, (err, resultado) => {

            if (err) {

                console.error('Error en la consulta.', err);
                res.json({ message: 'Error en el servidor'})
                return ;

            } 

            if (resultado.length > 0){

                res.json({ valido: true })

            } else {

                res.json({ valido: false })

            }

        })

    })

}