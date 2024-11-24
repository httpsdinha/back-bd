const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEmprestimo = async (data) => {
    // Check if usuarioId exists
    const usuarioExists = await prisma.usuarios.findUnique({ where: { id: data.usuarioId } });
    if (!usuarioExists) {
        throw new Error('Usuario not found');
    }

    // Check if livroId exists
    const livroExists = await prisma.livro.findUnique({ where: { id: data.livroId } });
    if (!livroExists) {
        throw new Error('Livro not found');
    }

    return await prisma.emprestimo.create({
        data: {
            usuarioId: data.usuarioId,
            livroId: data.livroId,
            dataEmprestimo: new Date(data.dataEmprestimo).toISOString(), // Ensure ISO-8601 format
            dataDevolucao: new Date(data.dataDevolucao).toISOString(), // Ensure ISO-8601 format
            statusDevolucao: data.statusDevolucao
        }
    });
};

const getEmprestimos = async () => {
    return await prisma.emprestimo.findMany({
        include: {
            usuarios: {
                select: { nome: true }
            },
            livro: {
                select: { titulo: true }
            }
        }
    });
};

const getEmprestimoById = async (id) => {
    return await prisma.emprestimo.findUnique({
        where: { id: Number(id) },
        include: {
            usuarios: {
                select: { nome: true }
            },
            livro: {
                select: { titulo: true }
            }
        }
    });
};

const updateEmprestimo = async (id, data) => {
    const updateData = {};

    if (data.usuarioId) {
        const usuarioExists = await prisma.usuarios.findUnique({ where: { id: data.usuarioId } });
        if (!usuarioExists) {
            throw new Error('Usuario not found');
        }
        updateData.usuarioId = data.usuarioId;
    }

    if (data.livroId) {
        const livroExists = await prisma.livro.findUnique({ where: { id: data.livroId } });
        if (!livroExists) {
            throw new Error('Livro not found');
        }
        updateData.livroId = data.livroId;
    }

    if (data.dataEmprestimo) {
        updateData.dataEmprestimo = new Date(data.dataEmprestimo).toISOString();
    }

    if (data.dataDevolucao) {
        updateData.dataDevolucao = new Date(data.dataDevolucao).toISOString();
    }

    if (data.statusDevolucao !== undefined) {
        updateData.statusDevolucao = data.statusDevolucao;
    }

    console.log('Update Data:', updateData); // Debugging line

    return await prisma.emprestimo.update({
        where: { id: Number(id) },
        data: updateData
    });
};

const deleteEmprestimo = async (id) => {
    return await prisma.emprestimo.delete({ where: { id: Number(id) } });
};

module.exports = {
    createEmprestimo,
    getEmprestimos,
    getEmprestimoById,
    updateEmprestimo,
    deleteEmprestimo
};
