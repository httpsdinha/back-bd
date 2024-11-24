const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAutor = async (req, res) => {
  const { nome } = req.body;
  try {
    const autor = await prisma.autor.create({
      data: { nome },
    });
    res.status(201).json(autor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAutores = async (req, res) => {
  try {
    const autores = await prisma.autor.findMany();
    res.status(200).json(autores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAutorById = async (req, res) => {
  const { id } = req.params;
  try {
    const autor = await prisma.autor.findUnique({
      where: { id: parseInt(id) },
    });
    if (autor) {
      res.status(200).json(autor);
    } else {
      res.status(404).json({ error: 'Autor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAutor = async (req, res) => {
  const { nome } = req.params;
  try {
    const autor = await prisma.autor.findUnique({
      where: { nome },
    });
    if (autor) {
      res.status(200).json(autor);
    } else {
      res.status(404).json({ error: 'Autor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAutor = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const autor = await prisma.autor.update({
      where: { id: parseInt(id) },
      data: { nome },
    });
    res.status(200).json(autor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAutor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.autor.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAutores = async (req, res) => {
  try {
    const autores = await prisma.autor.findMany();
    res.status(200).json(autores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAutor,
  getAutores,
  getAutorById,
  getAutor,
  updateAutor,
  deleteAutor,
  getAllAutores
};
