const Usuario  = require("../models/usuario_model");

const getUsuarios = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;
        const usuarios = await Usuario.find({ _id: { $ne: req.decoded.uid } })
        .sort('-online')
        .skip(desde)
        .limit(10);
        res.status(200).json({ ok: true, usuarios });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al obtener usuarios, hable con el administrador' });
    }
};

module.exports = { 
    getUsuarios,
 };