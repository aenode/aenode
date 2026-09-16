/*
  Warnings:

  - You are about to drop the column `is_active` on the `scopes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "scopes" DROP COLUMN "is_active";

-- RenameIndex
ALTER INDEX "scopes_name_key" RENAME TO "scopes:name";
