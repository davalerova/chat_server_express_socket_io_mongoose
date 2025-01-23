const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    online: { type: Boolean, default: false }
});

module.exports = model('Usuario', UsuarioSchema);