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

            if (resultado.length === 0) {

                return res.json({ message: 'El usuario no existe'});

            }

            if (resultado.length > 0){
                
                let user = resultado[0];
                let idUser = user.id;

                let token = jwt.sign({ idUser }, clave.secret, {expiresIn: 1000});

                db.query(`UPDATE users SET token = '${token}' where id = ${user.id}`);

                res.json({ valido: true, token: token, id: idUser })

            }

        })

    })

    app.delete('/perfilmenu/borrar/:id', (req, res) => {
        
        db.query(`DELETE FROM users WHERE id = ` + req.params.id, (err, results) => {

            if (err) {

                console.error(err);
                res.json("Error en la base de datos");

            } else {

                res.json({msg: 'Se ha borrado correctamente.'})

            }

        })

    })

    app.post('/perfil/changePass', (req, res) => {

        let {contraseña, id} = req.body;
        
        db.query(`update users set contraseña = '${contraseña}' where id = ${id}`, (err, results) => {

            if (err) {

                console.error(err);
                res.json("Error en la base de datos.")

            } else {

                res.json({msg: "Se ha cambiado correctamente."})

            }

        })

    })

    app.get('/perfil/infoperfil/:id', (req, res) => {

        db.query('Select * from users where id = ' + req.params.id, (err, results) => {

            if (err) {

                console.error(err);
                res.json('Error en la base de datos.')

            } else {

                res.json( results)
            }

        })

    })

}