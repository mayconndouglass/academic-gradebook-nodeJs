/*
  Warnings:

  - You are about to drop the column `number_abscences` on the `absences` table. All the data in the column will be lost.
  - Added the required column `number_absences` to the `absences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "absences" DROP COLUMN "number_abscences",
ADD COLUMN     "number_absences" DECIMAL(65,30) NOT NULL;
