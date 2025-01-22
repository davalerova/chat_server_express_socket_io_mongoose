const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        
        console.log('Conectando con MongoDB...');
    } catch (error) {
        console.log('Error al conectar con MongoDB:', error);
        process.exit(1);
    }
}

module.exports = { dbConnection };