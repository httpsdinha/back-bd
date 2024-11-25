const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createLog(tabela, acao, descricao, registroId, usuarioId = null) {
  await prisma.logAlteracao.create({
    data: {
      tabela,
      acao,
      descricao,
      registroId,
      usuarioId,
    },
  });
}

async function getLogs() {
  const logs = await prisma.logAlteracao.findMany();
  return logs;
}

module.exports = {
  createLog,
  getLogs,
};
