
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createLivro = async (req, res) => {
  const { titulo, id_autor, genero, quantidade, data_criacao, autor } = req.body;
  try {
    const livro = await prisma.livro.create({
      data: {
        titulo,
        id_autor,
        genero,
        quantidade,
        data_criacao,
        autor,
      },
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

const updateLivro = async (req, res) => {
  const { id } = req.params;
  const { titulo, id_autor, genero, quantidade, data_criacao, autor } = req.body;
  try {
    const livro = await prisma.livro.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        id_autor,
        genero,
        quantidade,
        data_criacao,
        autor,
      },
    });
    res.status(200).json(livro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteLivro = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.livro.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createLivro,
  getLivros,
  getLivroById,
  updateLivro,
  deleteLivro,
};