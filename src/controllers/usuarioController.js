// ...existing code...
const db = require('../models/usuarioModel');

const createUsuario = async (req, res) => {
    const { nome, email, cpf, status } = req.body;
    if (!nome || !email || !cpf || !status) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const result = await db.query(
            `INSERT INTO usuarios (nome, email, cpf, status) VALUES ($1, $2, $3, $4) RETURNING *`,
            [nome, email, cpf, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUsuarios = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM usuarios`);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuario not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, status } = req.body;
    const fields = [];
    const values = [];
    let query = 'UPDATE usuarios SET ';

    if (nome !== undefined) {
        fields.push('nome');
        values.push(nome);
    }
    if (email !== undefined) {
        fields.push('email');
        values.push(email);
    }
    if (cpf !== undefined) {
        fields.push('cpf');
        values.push(cpf);
    }
    if (status !== undefined) {
        fields.push('status');
        values.push(status);
    }

    if (fields.length === 0) {
        return res.status(400).json({ error: "At least one field is required" });
    }

    fields.forEach((field, index) => {
        query += `${field} = $${index + 1}`;
        if (index < fields.length - 1) {
            query += ', ';
        }
    });

    query += ` WHERE id = $${fields.length + 1} RETURNING *`;
    values.push(id);

    try {
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuario not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`DELETE FROM usuarios WHERE id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuario not found" });
        }
        res.status(200).json({ message: "Usuario deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ...existing code...

module.exports = {
    // ...existing exports...
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
};
