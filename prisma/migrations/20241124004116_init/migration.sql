/*
  Warnings:

  - You are about to drop the column `livroTitulos` on the `autor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "livro" DROP CONSTRAINT "livro_autorId_fkey";

-- AlterTable
ALTER TABLE "autor" DROP COLUMN "livroTitulos";

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
