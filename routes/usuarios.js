/*
 * Esta ruta se encarga de gestionar las peticiones de autenticación
 * Path: /api/usuarios
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuarios');

const router = Router();


router.get('/', validarJWT, getUsuarios);

module.exports = router;