/*
  Warnings:

  - Made the column `secret` on table `Otp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "secret" SET NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "device_id" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" DROP NOT NULL;
