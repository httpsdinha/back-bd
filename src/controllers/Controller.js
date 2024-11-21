// ...existing code...
const db = require('../models/Model');

const createUsuario = async (req, res) => {
    const { nome, email, cpf, senha, status } = req.body;
    if (!nome || !email || !cpf || !senha || !status) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const result = await db.query(
            `INSERT INTO usuarios (nome, email, cpf, senha, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [nome, email, cpf, senha, status]
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
    const { nome, email, cpf, senha, status } = req.body;
    const fields = [];
    const values = [];
    let query = 'UPDATE usuarios SET ';

    if (nome) {
        fields.push('nome');
        values.push(nome);
    }
    if (email) {
        fields.push('email');
        values.push(email);
    }
    if (cpf) {
        fields.push('cpf');
        values.push(cpf);
    }
    if (senha) {
        fields.push('senha');
        values.push(senha);
    }
    if (status) {
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
