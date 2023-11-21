const express = require('express');

const marcasController = require ('../controllers/marcasController');

const router = express.Router();

router.get('/', marcasController.listarMarcas);

router.get('/:id', marcasController.listarMarcasId);

router.post('/', marcasController.agregarMarca);

router.put("/:id",marcasController.actualizarMarca);

router.delete("/:id", marcasController.eliminarMarca);

module.exports = router;