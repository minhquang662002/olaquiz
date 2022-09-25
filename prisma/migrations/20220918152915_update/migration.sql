/*
  Warnings:

  - You are about to drop the column `postCategoryId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `preview_content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `preview_image` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `vocabTopicId` on the `Vocabulary` table. All the data in the column will be lost.
  - You are about to drop the `PostCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VocabCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VocabTopic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('VOCABULARY', 'POST');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "VocabTopic" DROP CONSTRAINT "VocabTopic_vocabCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_vocabTopicId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postCategoryId",
DROP COLUMN "preview_content",
DROP COLUMN "preview_image",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vocabulary" DROP COLUMN "vocabTopicId";

-- DropTable
DROP TABLE "PostCategory";

-- DropTable
DROP TABLE "VocabCategory";

-- DropTable
DROP TABLE "VocabTopic";

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_url_key" ON "Category"("name", "url");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
