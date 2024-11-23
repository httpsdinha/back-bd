require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    createAutor: (params) => pool.query(
        `INSERT INTO autores (nome) VALUES ($1) RETURNING *`,
        params
    ),
    getAutores: () => pool.query(`SELECT * FROM autores`),
    getAutorById: (id) => pool.query(`SELECT * FROM autores WHERE id = $1`, [id]),
    updateAutor: (params) => pool.query(
        `UPDATE autores SET nome = $1 WHERE id = $2 RETURNING *`,
        params
    ),
    deleteAutor: (id) => pool.query(`DELETE FROM autores WHERE id = $1 RETURNING *`, [id]),
};
