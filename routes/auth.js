/*
 * Esta ruta se encarga de gestionar las peticiones de autenticación
 * Path: /api/login
 */

const { Router } = require('express');
const { crearUsuario } = require('../controllers/auth_controller');
const router = Router();

router.post('/new', crearUsuario);

module.exports = router;