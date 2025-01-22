const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        console.log('Conectando con MongoDB...');
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexión con MongoDB establecida');
    } catch (error) {
        console.log('Error al conectar con MongoDB:', error);
        process.exit(1);
    }
}

module.exports = { dbConnection };