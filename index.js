const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();


// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); // Se exporta io para poder usarlo en socket.js
require('./sockets/socket'); // Se importa socket.js

// Mensajes de sockets


const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

const PORT = process.env.PORT;

server.listen(PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Server started on port', PORT);

});