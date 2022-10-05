/*
datos que tomamos del proceso de confirguración de la base de datos online MongoDB Altas
*/
// user - pass: dBuser1 : dBuser1
// SRV: mongodb+srv://dBuser1:dBuser1@cluster0.schfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express  = require('express'); // carga el módulo Express
const mongoose = require('mongoose'); // carga el módulo Mongoose
const Meeting = require('./models/meeting'); // carga el esquema de Mongoose que generamos en la carpeta "models"

const calenRoutes = require('./rutas/calendario');
const usuariosRoutes = require('./rutas/usuario');

const app = express(); // instancia nuetra app

/*
usa el método .conect() de Mongoose
para conectarse a nuestra base de datos online MongoDB Altas,
pasándole como parámetro el string que nos dió la misma cuando la configuramos,
al elegir el método de conexión. Ese método .conect() devuelve una Promesa/Promise
que resolvemos con la función .then() (... y .catch() para los posibles errores)
*/
mongoose.connect('mongodb+srv://dBuser1:dBuser1@cluster0.schfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    console.log('Conectados a MongoDB!');
})
.catch((error) => {
    console.log('FALLA al conectarse a MongoDB!');
    console.log(error);

}); 

app.use(express.json()); // para parsear como JSON el cuerpo de nuestra solicitud, y la respuesta

app.use('/api/v1/meetings', calenRoutes);
app.use('/api/v1/auth', usuariosRoutes);


module.exports = app; // exportamos nuestra app para poder tomerla en el server
