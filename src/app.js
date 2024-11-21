require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/Routes');

// Middleware para parsear JSON
app.use(express.json());

// Usar as rotas
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
