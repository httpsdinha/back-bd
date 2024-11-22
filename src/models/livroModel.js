
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
    createLivro: (params) => pool.query(
        `INSERT INTO livros (titulo, id_autor, genero, quantidade, data_criacao, autor) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        params
    ),
    getLivros: () => pool.query(`SELECT * FROM livros`),
    getLivroById: (id) => pool.query(`SELECT * FROM livros WHERE id = $1`, [id]),
    updateLivro: (params) => pool.query(
        `UPDATE livros SET titulo = $1, id_autor = $2, genero = $3, quantidade = $4, data_criacao = $5, autor = $6 WHERE id = $7 RETURNING *`,
        params
    ),
    deleteLivro: (id) => pool.query(`DELETE FROM livros WHERE id = $1 RETURNING *`, [id]),
};