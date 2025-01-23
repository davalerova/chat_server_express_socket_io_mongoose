const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    online: { type: Boolean, default: false }
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...objeto } = this.toObject();
    objeto.uid = _id;
    return objeto;
});

module.exports = model('Usuario', UsuarioSchema);