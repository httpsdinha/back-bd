require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { execSync } = require('child_process'); // Adicione esta linha
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/Routes');

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Gerar Prisma Client
execSync('npx prisma generate'); // Adicione esta linha

// Usar as rotas
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
