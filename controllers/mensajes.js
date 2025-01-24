
const Mensaje  = require("../models/mensaje");
const obtenerChat = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;
        const miId = req.decoded.uid;
        const mensajesDe = req.params.de ;
        const mensajes = await Mensaje.find({ $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }] })
        .sort({createdAt: 'desc'})
        .skip(desde)
        .limit(30);
        res.status(200).json({ ok: true, mensajes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al obtener mensajes, hable con el administrador' });
    }
};

module.exports = { 
    obtenerChat,
 };