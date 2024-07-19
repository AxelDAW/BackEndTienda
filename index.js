let express = require('express');
let app = express();
let cors = require('cors');
let cfg = require('./config/app');

app.use( cors() );
app.use( express.json() );

app.listen(cfg.API_PUERTO, () =>{

    console.log(`API escuchando en el puerto ${cfg.API_PUERTO}`);

    require('./routes/Users')( app );

})