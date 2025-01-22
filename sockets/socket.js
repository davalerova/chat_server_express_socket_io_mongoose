const { io } = require('../index'); // Se importa io de index.js


io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    // client.on('mensaje', data => {
    //     console.log('Mensaje recibido:', data);
    //     io.emit('mensaje', {"nuevo_mensaje": data});
    // });
  });