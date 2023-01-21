/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Test_name_type_key" ON "Test"("name", "type");
