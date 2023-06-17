/*
  Warnings:

  - You are about to drop the column `name` on the `grades` table. All the data in the column will be lost.
  - Added the required column `grade` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "grades" DROP COLUMN "name",
ADD COLUMN     "grade" DOUBLE PRECISION NOT NULL;
