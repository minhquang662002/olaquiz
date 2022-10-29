/*
  Warnings:

  - Added the required column `score` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Exercise_name_key";

-- DropIndex
DROP INDEX "Test_name_key";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "score" INTEGER NOT NULL;
