const express = require('express');

const usuariosController = require ('../controllers/usuariosController');

const router = express.Router();

router.get('/', usuariosController.listarUsuarios);

router.get('/:id', usuariosController.listarUsuariosId);

router.post('/', usuariosController.agregarUsuario);

router.put("/:id", usuariosController.actualizarUsuario);

router.delete("/:id", usuariosController.eliminarUsuario);

module.exports = router;