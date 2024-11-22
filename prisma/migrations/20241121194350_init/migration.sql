/*
  Warnings:

  - A unique constraint covering the columns `[id_emprestimo]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_emprestimo_key" ON "usuarios"("id_emprestimo");
