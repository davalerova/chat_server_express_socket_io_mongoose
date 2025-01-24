const { io } = require('../index'); // Se importa io de index.js
const { validarJWT } = require('../helpers/jwt');


io.on('connection', async client =>  {
    console.log('Cliente conectado');

    const [valido, uid] = validarJWT(client.handshake.headers['x-token']);

    if (!valido) {
        console.log('No se pudo validar el JWT');
        // console.log(uid);
        return client.disconnect();
    }else{
        console.log('Cliente autenticado por websocket');
    }

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

  });