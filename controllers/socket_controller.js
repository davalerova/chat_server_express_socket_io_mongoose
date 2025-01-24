const Usuario = require("../models/usuario_model");
const Mensaje = require("../models/mensaje");


const usuarioConectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const guardarMensaje = async (payload) => {
    try {
        const mensajeNuevo = new Mensaje(payload);
        await mensajeNuevo.save();
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}

module.exports = { 
    usuarioConectado,
    usuarioDesconectado,
    guardarMensaje
};