/*
  Warnings:

  - A unique constraint covering the columns `[device_id,is_active]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "device_id" SET DEFAULT 'deviceId';

-- CreateIndex
CREATE UNIQUE INDEX "Session_device_id_is_active_key" ON "Session"("device_id", "is_active");
