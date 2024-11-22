/*
  Warnings:

  - You are about to drop the column `id_emprestimo` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `autor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emprestimo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log_alteracao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `autor` to the `livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "emprestimo" DROP CONSTRAINT "emprestimo_id_livro_fkey";

-- DropForeignKey
ALTER TABLE "emprestimo" DROP CONSTRAINT "emprestimo_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "livro" DROP CONSTRAINT "livro_id_autor_fkey";

-- DropIndex
DROP INDEX "usuarios_id_emprestimo_key";

-- AlterTable
ALTER TABLE "livro" ADD COLUMN     "autor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "id_emprestimo";

-- DropTable
DROP TABLE "autor";

-- DropTable
DROP TABLE "emprestimo";

-- DropTable
DROP TABLE "log_alteracao";
