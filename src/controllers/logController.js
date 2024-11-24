const { createLog } = require('../models/logModel');

async function logChange(req, res) {
  const { tabela, acao, descricao, registroId, usuarioId } = req.body;
  try {
    await createLog(tabela, acao, descricao, registroId, usuarioId);
    res.status(201).json({ message: 'Log created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create log' });
  }
}

module.exports = {
  logChange,
};
