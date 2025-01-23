const { response } = require("express");
const { validationResult } = require("express-validator");

const crearUsuario = (req, res = response) => {
    res.status(200).json({ message: 'Bienvenido a nuestro chat server' });
};

module.exports = { crearUsuario };