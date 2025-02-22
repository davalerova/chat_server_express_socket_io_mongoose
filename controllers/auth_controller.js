const { response } = require("express");
const Usuario = require("../models/usuario_model");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

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
        console.log('Usuario creado');
        // Generar JWT
        const token = await generarJWT(usuario.id);
        res.status(200).json({ ok: true, usuario, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al guardar usuario en base de datos, hable con el administrador' });
    }

};

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ ok: false, msg: 'Usuario no encontrado' });
        }
        const passwordCorrecto = bcrypt.compareSync(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(400).json({ ok: false, msg: 'Contraseña incorrecta' });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);
        res.status(200).json({ ok: true, usuario, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al autenticar, hable con el administrador' });
    }
};

const renewToken = async (req, res = response) => {
    const { uid } = req.decoded;
    try {
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(400).json({ ok: false, msg: 'Usuario no encontrado' });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);
        res.status(200).json({ ok: true, usuario, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al autenticar, hable con el administrador' });
    }
};

module.exports = { crearUsuario, login, renewToken };