/*
  Warnings:

  - Added the required column `STT` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "STT" INTEGER NOT NULL,
ALTER COLUMN "group" SET DATA TYPE TEXT;
