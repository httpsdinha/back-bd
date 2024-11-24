const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment');
const express = require('express');
const router = express.Router();

const createLivro = async (req, res) => {
  const { titulo, autor, genero } = req.body;
  try {
    const autorExistente = await prisma.autor.upsert({
      where: { nome: autor },
      update: {},
      create: { nome: autor },
    });
    const generoExistente = await prisma.genero.upsert({
      where: { nome: genero },
      update: {},
      create: { nome: genero },
    });
    const livro = await prisma.livro.create({
      data: {
        titulo,
        genero,
        autor: {
          connect: { id: autorExistente.id }
        },
        generos: {
          connect: { id: generoExistente.id }
        }
      },
    });
    await prisma.livroGenero.create({
      data: {
        livroId: livro.id,
        generoid: generoExistente.id
      }
    });
    res.status(201).json(livro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLivros = async (req, res) => {
  try {
    const livros = await prisma.livro.findMany();
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLivroById = async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(id) },
    });
    if (livro) {
      res.status(200).json(livro);
    } else {
      res.status(404).json({ error: 'Livro not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLivroWithAutor = async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(id) },
      include: { autor: true },
    });
    if (livro) {
      res.status(200).json(livro);
    } else {
      res.status(404).json({ error: 'Livro not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateLivro = async (req, res) => {
  const { id } = req.params;
  const { titulo, genero, autorId } = req.body;
  const data = { titulo, genero };

  if (autorId) {
    data.autor = { connect: { id: autorId } };
  }

  try {
    const livro = await prisma.livro.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).json(livro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteLivro = async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(id) },
      include: { autor: true, LivroGenero: true },
    });

    if (!livro) {
      return res.status(404).json({ error: 'Livro not found' });
    }

    // Remove references in LivroGenero
    await prisma.livroGenero.deleteMany({
      where: { livroId: livro.id },
    });

    await prisma.livro.delete({
      where: { id: parseInt(id) },
    });

    const autorLivros = await prisma.livro.findMany({
      where: { autorId: livro.autorId },
    });

    if (autorLivros.length === 0) {
      await prisma.autor.delete({
        where: { id: livro.autorId },
      });
    }

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

router.post('/livros', createLivro);
router.get('/livros', getLivros);
router.get('/livros/:id', getLivroById);
router.get('/livros/:id/autor', getLivroWithAutor);
router.put('/livros/:id', updateLivro);
router.delete('/livros/:id', deleteLivro);

module.exports = router;

module.exports = {
  createLivro,
  getLivros,
  getLivroById,
  getLivroWithAutor,
  updateLivro,
  deleteLivro
};