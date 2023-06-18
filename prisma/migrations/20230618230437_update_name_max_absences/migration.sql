/*
  Warnings:

  - You are about to drop the column `max_abscences` on the `absences` table. All the data in the column will be lost.
  - Added the required column `max_absences` to the `absences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "absences" DROP COLUMN "max_abscences",
ADD COLUMN     "max_absences" INTEGER NOT NULL;
