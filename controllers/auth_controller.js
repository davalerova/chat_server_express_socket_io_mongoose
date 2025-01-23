const { response } = require("express");
const Usuario = require("../models/usuario_model");

const crearUsuario = async (req, res = response) => {
    
    const usuario = Usuario(req.body);
    await usuario.save();

    res.status(200).json({ message: 'Bienvenido a nuestro chat server' });
};

module.exports = { crearUsuario };