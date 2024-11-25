const express = require('express');
const router = express.Router();
const { 
    createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario 
} = require('../controllers/usuarioController');
const { 
    createLivro, getLivros, getLivroById, updateLivro, deleteLivro, getLivroWithAutor 
} = require('../controllers/livroController');
const { 
    createAutor, updateAutor, deleteAutor, getAllAutores, getAutorWithLivros, getAllAutoresWithLivros 
} = require('../controllers/autorController');
const { 
    createEmprestimo, getEmprestimos, getEmprestimoById, updateEmprestimo, deleteEmprestimo 
} = require('../controllers/emprestimoController');
const { logChange, getLogs } = require('../controllers/logController');

// Ensure all controller functions are defined
if (!createUsuario || !getUsuarios || !getUsuarioById || !updateUsuario || !deleteUsuario) {
    throw new Error('One or more usuarioController functions are undefined');
}
if (!createLivro || !getLivros || !getLivroById || !updateLivro || !deleteLivro || !getLivroWithAutor) {
    throw new Error('One or more livroController functions are undefined');
}
if (!createAutor || !updateAutor || !deleteAutor || !getAllAutores || !getAutorWithLivros || !getAllAutoresWithLivros) {
    throw new Error('One or more autorController functions are undefined');
}
if (!createEmprestimo || !getEmprestimos || !getEmprestimoById || !updateEmprestimo || !deleteEmprestimo) {
    throw new Error('One or more emprestimoController functions are undefined');
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
router.get('/livros/:id/autor', getLivroWithAutor);
router.put('/livros/:id', updateLivro);
router.delete('/livros/:id', deleteLivro);

// Autor routes
router.post('/autores', createAutor);
router.get('/autores', getAllAutores);
router.put('/autores/:id', updateAutor);
router.delete('/autores/:id', deleteAutor);
router.get('/autores/livros', getAllAutoresWithLivros);
router.get('/autores/:id/livros', getAutorWithLivros);

// Emprestimo routes
router.post('/emprestimos', createEmprestimo);
router.get('/emprestimos', getEmprestimos);
router.get('/emprestimos/:id', getEmprestimoById);
router.put('/emprestimos/:id', updateEmprestimo);
router.delete('/emprestimos/:id', deleteEmprestimo);

// Log routes
router.post('/logs', logChange);
router.get('/logs', getLogs);

module.exports = router;
