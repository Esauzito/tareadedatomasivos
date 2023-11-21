const express = require('express');

const ventasController = require ('../controllers/ventasController');

const router = express.Router();

router.get('/', ventasController.listarVentas);

router.get('/:id', ventasController.listarVentasId);

router.post('/', ventasController.agregarVenta);

router.put("/:id", ventasController.actualizarVenta);

router.delete("/:id", ventasController.eliminarVenta);

module.exports = router;