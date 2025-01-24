const { io } = require('../index'); // Se importa io de index.js
const { validarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket_controller');

io.on('connection', async client =>  {
    console.log('Cliente conectado');

    const [valido, uid] = validarJWT(client.handshake.headers['x-token']);

    if (!valido) {
        console.log('No se pudo validar el JWT');
        // console.log(uid);
        return client.disconnect();
    }
    clienteConectado = await usuarioConectado(uid);
    console.log('Cliente autenticado por websocket');

    client.join(uid);
    

    client.on('disconnect', () => { 
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

    client.on('mensaje-personal', async (payload) => {
        console.log('Mensaje personal recibido:', payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

  });