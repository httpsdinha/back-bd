-- CreateTable
CREATE TABLE "autor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "autor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "autor_nome_key" ON "autor"("nome");

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
