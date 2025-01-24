const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = (uid) => {  
    return new Promise((resolve, reject) => {
        const JWT_SECRET = process.env.JWT_SECRET;
        const payload = { uid };

        const token = jwt.sign( payload, JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log('Error al generar JWT:', err);
                reject('No se pudo generar el JWT:' + err);
            }else{
                console.log('JWT generado');
                resolve(token);
            }
        });
        return token;
    });
}

const validarJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        return [true, uid];
        
    } catch (error) {
        return [false, error];
    }
};

module.exports = { generarJWT, validarJWT };