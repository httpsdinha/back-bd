const {
    createEmprestimo: createEmprestimoModel,
    getEmprestimos: getEmprestimosModel,
    getEmprestimoById: getEmprestimoByIdModel,
    updateEmprestimo: updateEmprestimoModel,
    deleteEmprestimo: deleteEmprestimoModel
} = require('../models/emprestimoModel');

const createEmprestimo = async (req, res) => {
    try {
        // Mapear os dados do front-end para o formato esperado
        const data = {
            usuarioId: req.body.usuarioId, // Certifique-se de que este é o ID correto
            livroId: req.body.livroId, // Certifique-se de que este é o ID correto
            dataEmprestimo: req.body.dataEmprestimo,
            dataDevolucao: req.body.dataDevolucao,
            statusDevolucao: req.body.statusDevolucao
        };

        const newEmprestimo = await createEmprestimoModel(data);
        res.status(201).json(newEmprestimo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmprestimos = async (req, res) => {
    try {
        const emprestimos = await getEmprestimosModel();
        res.status(200).json(emprestimos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmprestimoById = async (req, res) => {
    try {
        const emprestimo = await getEmprestimoByIdModel(req.params.id);
        if (emprestimo) {
            res.status(200).json(emprestimo);
        } else {
            res.status(404).json({ message: 'Emprestimo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEmprestimo = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Debugging line
        const updatedEmprestimo = await updateEmprestimoModel(req.params.id, req.body);
        res.status(200).json(updatedEmprestimo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEmprestimo = async (req, res) => {
    try {
        await deleteEmprestimoModel(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEmprestimo,
    getEmprestimos,
    getEmprestimoById,
    updateEmprestimo,
    deleteEmprestimo
};
