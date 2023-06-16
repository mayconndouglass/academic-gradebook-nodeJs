/*
  Warnings:

  - You are about to alter the column `hours` on the `subjects` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "hours" SET DATA TYPE INTEGER;
