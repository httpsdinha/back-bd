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
    createLivro: async (params) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const livroResult = await client.query(
                `INSERT INTO livros (titulo, autor, genero) VALUES ($1, $2, $3) RETURNING *`,
                params
            );
            await client.query(
                `INSERT INTO autores (nome) VALUES ($2) ON CONFLICT (nome) DO NOTHING`,
                [params[1]]
            );
            await client.query(
                `INSERT INTO generos (nome) VALUES ($3) ON CONFLICT (nome) DO NOTHING`,
                [params[2]]
            );
            const generoResult = await client.query(
                `SELECT id FROM generos WHERE nome = $1`,
                [params[2]]
            );
            await client.query(
                `INSERT INTO LivroGenero (livroId, generoid) VALUES ($1, $2)`,
                [livroResult.rows[0].id, generoResult.rows[0].id]
            );
            await client.query('COMMIT');
            return livroResult;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },
    getLivros: () => pool.query(`SELECT * FROM livros`),
    getLivroById: (id) => pool.query(`SELECT * FROM livros WHERE id = $1`, [id]),
    updateLivro: (params) => pool.query(
        `UPDATE livros SET titulo = $1, autor = $2, genero = $3 WHERE id = $4 RETURNING *`,
        params
    ),
    deleteLivro: (id) => pool.query(`DELETE FROM livros WHERE id = $1 RETURNING *`, [id]),
};