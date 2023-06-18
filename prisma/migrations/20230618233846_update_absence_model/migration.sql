-- AlterTable
ALTER TABLE "absences" ALTER COLUMN "number_absences" SET DEFAULT 0,
ALTER COLUMN "max_absences" DROP NOT NULL;
