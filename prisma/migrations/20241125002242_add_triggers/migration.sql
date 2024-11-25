/*
  Warnings:

  - You are about to drop the `Trigger` table. If the table is not empty, all the data it contains will be lost.

*/

-- Alterando a tabela "LogAlteracao"
ALTER TABLE "LogAlteracao" 
ADD COLUMN "dadosAntigos" JSONB, -- Para armazenar o estado anterior
ADD COLUMN "dadosNovos" JSONB,   -- Para armazenar o estado novo
ALTER COLUMN "descricao" DROP NOT NULL, -- Tornando "descricao" opcional
ALTER COLUMN "registroId" DROP NOT NULL; -- Tornando "registroId" opcional

-- Removendo a tabela "Trigger"
DROP TABLE "Trigger";

-- Criando a função de trigger
CREATE OR REPLACE FUNCTION log_alteracao()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "LogAlteracao" ("tabela", "acao", "descricao", "registroId", "dataHora", "dadosAntigos", "dadosNovos")
  VALUES (
    TG_TABLE_NAME,                -- Nome da tabela alterada
    TG_OP,                        -- Ação realizada (INSERT, UPDATE, DELETE)
    CONCAT('Before: ', row_to_json(OLD), ', After: ', row_to_json(NEW)),
    COALESCE(NEW.id, OLD.id),     -- ID do registro (após ou antes da alteração)
    CURRENT_TIMESTAMP,            -- Data e hora da alteração
    row_to_json(OLD),             -- Dados antigos (NULL para INSERT)
    row_to_json(NEW)              -- Dados novos (NULL para DELETE)
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Associando o trigger à tabela "usuarios"
CREATE TRIGGER log_usuarios_changes
AFTER INSERT OR UPDATE OR DELETE ON "usuarios"
FOR EACH ROW EXECUTE FUNCTION log_alteracao();
