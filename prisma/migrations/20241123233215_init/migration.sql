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

    CONSTRAINT "autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "genero" TEXT,
    "autorId" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LivroGenero" (
    "livroId" INTEGER NOT NULL,
    "generoid" INTEGER NOT NULL,

    CONSTRAINT "LivroGenero_pkey" PRIMARY KEY ("livroId","generoid")
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,
    "dataEmprestimo" TIMESTAMP(3) NOT NULL,
    "dataDevolucao" TIMESTAMP(3),
    "statusDevolucao" TEXT NOT NULL,

    CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAlteracao" (
    "id" SERIAL NOT NULL,
    "acao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tabela" TEXT NOT NULL,
    "registroId" INTEGER NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "LogAlteracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UsuarioLivros" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LivroGeneros" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "autor_nome_key" ON "autor"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "Genero"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_UsuarioLivros_AB_unique" ON "_UsuarioLivros"("A", "B");

-- CreateIndex
CREATE INDEX "_UsuarioLivros_B_index" ON "_UsuarioLivros"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LivroGeneros_AB_unique" ON "_LivroGeneros"("A", "B");

-- CreateIndex
CREATE INDEX "_LivroGeneros_B_index" ON "_LivroGeneros"("B");

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivroGenero" ADD CONSTRAINT "LivroGenero_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivroGenero" ADD CONSTRAINT "LivroGenero_generoid_fkey" FOREIGN KEY ("generoid") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAlteracao" ADD CONSTRAINT "LogAlteracao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioLivros" ADD CONSTRAINT "_UsuarioLivros_A_fkey" FOREIGN KEY ("A") REFERENCES "livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioLivros" ADD CONSTRAINT "_UsuarioLivros_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LivroGeneros" ADD CONSTRAINT "_LivroGeneros_A_fkey" FOREIGN KEY ("A") REFERENCES "Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LivroGeneros" ADD CONSTRAINT "_LivroGeneros_B_fkey" FOREIGN KEY ("B") REFERENCES "livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
