const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const usuarioSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

})

/*
El valor unique en este esquema, junto con mongoose-unique-validator pasado como plug-in,
nos va a garantizar que no haya dos usuarios que puedan compartir nombre, o sea, su email.
*/

usuarioSchema.plugin(uniqueValidator);

module.exports =mongoose.model('Uniario', usuarioSchema);