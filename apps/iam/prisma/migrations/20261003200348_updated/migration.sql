/*
  Warnings:

  - Made the column `device_id` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "device_id" SET NOT NULL;
