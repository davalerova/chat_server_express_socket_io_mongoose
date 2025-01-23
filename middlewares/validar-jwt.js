const jwt = require('jsonwebtoken');
require('dotenv').config();

const validarJWT = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.headers['x-token'];
    if (!token) {
        return res.status(401).json({ ok: false, msg: 'No se ha proporcionado un token de autenticación' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ ok: false, msg: 'Token de autenticación inválido' });
        }
        req.decoded = decoded;
        // console.log(decoded);
        next();
    });
};

module.exports = { validarJWT };