/*
  Warnings:

  - A unique constraint covering the columns `[name,description]` on the table `scopes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "scopes" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "scopes_name_description_key" ON "scopes"("name", "description");
