const express = require('express');
const router = express.Router();
const { 
    createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario 
} = require('../controllers/usuarioController');
const { 
    createLivro, getLivros, getLivroById, updateLivro, deleteLivro 
} = require('../controllers/livroController');
const { 
    createAutor, getAutores, getAutorById, updateAutor, deleteAutor, getAutor, getAllAutores 
} = require('../controllers/autorController');

// Ensure all controller functions are defined
if (!createUsuario || !getUsuarios || !getUsuarioById || !updateUsuario || !deleteUsuario) {
    throw new Error('One or more usuarioController functions are undefined');
}
if (!createLivro || !getLivros || !getLivroById || !updateLivro || !deleteLivro) {
    throw new Error('One or more livroController functions are undefined');
}
if (!createAutor || !getAutores || !getAutorById || !updateAutor || !deleteAutor || !getAutor || !getAllAutores) {
    throw new Error('One or more autorController functions are undefined');
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

// Autor routes
router.post('/autores', createAutor);
router.get('/autores', getAllAutores);
router.get('/autores/:id', getAutorById);
router.get('/autores/nome/:nome', getAutor);
router.put('/autores/:id', updateAutor);
router.delete('/autores/:id', deleteAutor);

module.exports = router;
