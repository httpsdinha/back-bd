const { createLog, getLogs: fetchLogs } = require('../models/logModel');

async function logChange(req, res) {
  const { tabela, acao, descricao, registroId, usuarioId } = req.body;
  try {
    await createLog(tabela, acao, descricao, registroId, usuarioId);
    res.status(201).json({ message: 'Log created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create log' });
  }
}

async function getLogs(req, res) {
  try {
    console.log("Fetching logs...");
    const logs = await fetchLogs();
    console.log("Logs fetched successfully:", logs);
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
}

module.exports = {
  logChange,
  getLogs,
};
