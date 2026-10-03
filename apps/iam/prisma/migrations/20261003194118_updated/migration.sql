/*
  Warnings:

  - You are about to drop the column `expires_at` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `last_used_at` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expires_at",
DROP COLUMN "last_used_at",
ADD COLUMN     "usage" INTEGER DEFAULT 0,
ALTER COLUMN "token" SET DEFAULT 'Not Set';
