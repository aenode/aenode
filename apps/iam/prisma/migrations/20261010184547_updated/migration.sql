/*
  Warnings:

  - Made the column `user_agent` on table `sessions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ip_address` on table `sessions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usage` on table `sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "sessions_device_id_is_active_key";

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "user_agent" SET NOT NULL,
ALTER COLUMN "ip_address" SET NOT NULL,
ALTER COLUMN "usage" SET NOT NULL;
