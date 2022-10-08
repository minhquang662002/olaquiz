/*
  Warnings:

  - Made the column `topicId` on table `Vocabulary` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_topicId_fkey";

-- AlterTable
ALTER TABLE "Vocabulary" ALTER COLUMN "topicId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
