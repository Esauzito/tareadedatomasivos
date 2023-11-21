const express = require('express');

const productsController = require ('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.listarProductos);

router.get('/:id', productsController.listarProductosId);

router.post('/', productsController.agregarProducto);

router.put("/:id", productsController.actualizarProducto);

router.delete("/:id", productsController.eliminarProducto);

module.exports = router;