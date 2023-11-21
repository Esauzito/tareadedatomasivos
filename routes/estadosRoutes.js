const express = require('express');

const estadosController = require ('../controllers/estadosController');

const router = express.Router();

router.get('/', estadosController.listarEstados);

router.get('/:id', estadosController.listarEstadosId);

router.post('/', estadosController.agregarEstado);

router.put("/:id",estadosController.actualizarEstado);

router.delete("/:id", estadosController.eliminarEstado);

module.exports = router;