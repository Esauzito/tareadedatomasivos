const express = require('express');

const rolesController = require ('../controllers/rolesController');

const router = express.Router();

router.get('/', rolesController.listarRoles);

router.get('/:id', rolesController.listarRolesId);

router.post('/', rolesController.agregarRol);

router.put("/:id", rolesController.actualizarRol);

router.delete("/:id", rolesController.eliminarRol);

module.exports = router;