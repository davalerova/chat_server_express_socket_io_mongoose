const express = require('express');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT;

// DB Config
const { dbConnection } = require('./database/config');
dbConnection();

// App de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());


// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); // Se exporta io para poder usarlo en socket.js
require('./sockets/socket'); // Se importa socket.js


// Path público
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));


// Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));



server.listen(PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Server started on port', PORT);

});