/*
  Warnings:

  - You are about to drop the `Autor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Emprestimo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Livro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LogAlteracao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_id_livro_fkey";

-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_id_autor_fkey";

-- DropTable
DROP TABLE "Autor";

-- DropTable
DROP TABLE "Emprestimo";

-- DropTable
DROP TABLE "Livro";

-- DropTable
DROP TABLE "LogAlteracao";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nacionalidade" TEXT,

    CONSTRAINT "autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "id_autor" INTEGER NOT NULL,
    "genero" TEXT,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emprestimo" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_livro" INTEGER NOT NULL,
    "data_emprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_devolucao_prevista" TIMESTAMP(3) NOT NULL,
    "data_devolucao_real" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ativo',

    CONSTRAINT "emprestimo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_alteracao" (
    "id" SERIAL NOT NULL,
    "tabela_afetada" TEXT NOT NULL,
    "tipo_alteracao" TEXT NOT NULL,
    "dados_anteriores" JSONB,
    "dados_novos" JSONB,
    "usuario_responsavel" TEXT NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_alteracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UsuarioLivros" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "_UsuarioLivros_AB_unique" ON "_UsuarioLivros"("A", "B");

-- CreateIndex
CREATE INDEX "_UsuarioLivros_B_index" ON "_UsuarioLivros"("B");

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emprestimo" ADD CONSTRAINT "emprestimo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emprestimo" ADD CONSTRAINT "emprestimo_id_livro_fkey" FOREIGN KEY ("id_livro") REFERENCES "livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioLivros" ADD CONSTRAINT "_UsuarioLivros_A_fkey" FOREIGN KEY ("A") REFERENCES "livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioLivros" ADD CONSTRAINT "_UsuarioLivros_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
