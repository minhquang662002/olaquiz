/*
  Warnings:

  - You are about to drop the column `type` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "type",
ADD COLUMN     "practiceTopicId" TEXT;

-- CreateTable
CREATE TABLE "PracticeTopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "theory" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "PracticeTopic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_practiceTopicId_fkey" FOREIGN KEY ("practiceTopicId") REFERENCES "PracticeTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
