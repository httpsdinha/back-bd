-- DropForeignKey
ALTER TABLE "livro" DROP CONSTRAINT "livro_autorId_fkey";

-- AddForeignKey
ALTER TABLE "livro" ADD CONSTRAINT "livro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "autor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
