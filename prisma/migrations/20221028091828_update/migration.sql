/*
  Warnings:

  - Added the required column `time` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "time" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "resultId" TEXT,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;
