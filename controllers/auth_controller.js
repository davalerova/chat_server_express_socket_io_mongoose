const { response } = require("express");
const Usuario = require("../models/usuario_model");
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res = response) => {

    const { email } = req.body;

    try {
        if (await Usuario.findOne({ email })) {
            return res.status(400).json({ ok: false, msg: 'El correo ya está registrado' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al buscar usuario en base de datos, hable con el administrador' });
    }
    
    try {
        const usuario = Usuario(req.body);
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(15);
        usuario.password = bcrypt.hashSync(usuario.password, salt);

        await usuario.save();
        res.status(200).json({ ok: true, usuario });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al guardar usuario en base de datos, hable con el administrador' });
    }

};

module.exports = { crearUsuario };