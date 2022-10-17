/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateIndex
CREATE UNIQUE INDEX "Test_name_key" ON "Test"("name");
