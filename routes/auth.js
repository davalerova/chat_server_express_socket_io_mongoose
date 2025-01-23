/*
 * Esta ruta se encarga de gestionar las peticiones de autenticación
 * Path: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario } = require('../controllers/auth_controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').trim().not().isEmpty(),
    check('nombre', 'El nombre debe tener entre 3 y 50 caracteres').trim().isLength({ min: 3, max: 50 }),
    check('email', 'El email es obligatorio').trim().not().isEmpty(),
    check('email', 'El email es inválido').trim().isEmail(),
    check('password', 'La contraseña es obligatoria').trim().not().isEmpty(),
    check('password', 'La contraseña debe tener por lo menos 8 caracteres').trim().isLength({ min: 8 }),
    validarCampos
], crearUsuario);

module.exports = router;