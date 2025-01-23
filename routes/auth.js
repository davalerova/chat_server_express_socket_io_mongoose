/*
 * Esta ruta se encarga de gestionar las peticiones de autenticación
 * Path: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario } = require('../controllers/auth_controller');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
], crearUsuario);

module.exports = router;