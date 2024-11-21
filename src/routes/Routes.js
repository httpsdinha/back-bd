const express = require('express');
const router = express.Router();
const { createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = require('../controllers/Controller');

router.post('/usuarios', createUsuario);
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

module.exports = router;
