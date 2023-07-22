const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const checks = require('../middlewares/checks');
const {validarChecks} = require('../middlewares/validarChecks');
const {validarId} = require('../middlewares/validarId');
const {validarDni} = require('../middlewares/validarDni');
const {validarEmail} = require('../middlewares/validarEmail');
const {validarApellido} = require('../middlewares/validarApellido');
const {validarNombre} = require('../middlewares/validarNombre');
const apiExternalController = require('../controllers/apiExternalController');

router.post('/crear', checks, validarChecks, apiController.crear);
router.get('/info', apiController.info);
router.get('/estadisticas', apiController.estadisticas);
router.get('/buscar/id/:id', validarId ,apiController.buscarPorId);
router.get('/buscar/dni/:dni', validarDni, apiController.buscarPorDni);
router.get('/buscar/email/:email', validarEmail, apiController.buscarPorEmail);
router.get('/buscar/apellido/:apellido', validarApellido, apiController.buscarPorApellido);
router.get('/buscar/nombre/:nombre', validarNombre, apiController.buscarPorNombre);
router.get('/buscar/query', apiController.buscarPorQuery); //http://localhost:3030/v1/buscar/query?nombre=Rodrigo&apellido=Avila
router.get('/buscar/aprobados', apiController.buscarPorAprobados);
router.put('/editar/:id', validarId, checks, validarChecks, apiController.editar);
router.delete('/eliminar/:id', validarId, apiController.eliminar);
router.get('/personajes', apiExternalController.personajes);

module.exports = router;