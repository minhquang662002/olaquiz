/*
  Warnings:

  - You are about to drop the column `listen_score` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `reading_score` on the `Result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Result" DROP COLUMN "listen_score",
DROP COLUMN "reading_score";
