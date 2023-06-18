/*
  Warnings:

  - You are about to alter the column `max_abscences` on the `absences` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `number_absences` on the `absences` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Made the column `max_abscences` on table `absences` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "absences" ALTER COLUMN "max_abscences" SET NOT NULL,
ALTER COLUMN "max_abscences" SET DATA TYPE INTEGER,
ALTER COLUMN "number_absences" SET DATA TYPE INTEGER;
