-- AlterTable
ALTER TABLE "absences" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "max_abscences" DROP NOT NULL;

-- AlterTable
ALTER TABLE "grades" ALTER COLUMN "description" DROP NOT NULL;
