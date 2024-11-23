const express = require('express');
const router = express.Router();
const { 
    createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario 
} = require('../controllers/usuarioController');
const { 
    createLivro, getLivros, getLivroById, updateLivro, deleteLivro 
} = require('../controllers/livroController');

// Ensure all controller functions are defined
if (!createUsuario || !getUsuarios || !getUsuarioById || !updateUsuario || !deleteUsuario) {
    throw new Error('One or more usuarioController functions are undefined');
}
if (!createLivro || !getLivros || !getLivroById || !updateLivro || !deleteLivro) {
    throw new Error('One or more livroController functions are undefined');
}

// Usuario routes
router.post('/usuarios', createUsuario);
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

// Livro routes
router.post('/livros', createLivro);
router.get('/livros', getLivros);
router.get('/livros/:id', getLivroById);
router.put('/livros/:id', updateLivro);
router.delete('/livros/:id', deleteLivro);

module.exports = router;
