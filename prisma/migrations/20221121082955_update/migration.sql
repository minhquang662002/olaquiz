/*
  Warnings:

  - A unique constraint covering the columns `[name,practiceTopicId]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `PracticeTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "STT" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_practiceTopicId_key" ON "Exercise"("name", "practiceTopicId");

-- CreateIndex
CREATE UNIQUE INDEX "PracticeTopic_name_key" ON "PracticeTopic"("name");
