let mysql = require('mysql');

let conexion = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendasuplementos'

})

conexion.connect((error) => {

    if (error) {

        console.error('Error en la conexión.', error.stack);
        return ;

    }

    console.log('Conectado con éxito.')

})

module.exports = conexion;