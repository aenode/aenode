-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "user_agent" DROP NOT NULL,
ALTER COLUMN "ip_address" DROP NOT NULL,
ALTER COLUMN "device_id" DROP DEFAULT;
