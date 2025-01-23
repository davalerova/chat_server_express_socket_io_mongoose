const { response } = require("express");
const { validationResult } = require("express-validator");

const crearUsuario = (req, res = response) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ ok: false, errores: errores.mapped() });
    }
    res.status(200).json({ message: 'Bienvenido a nuestro chat server' });
};

module.exports = { crearUsuario };