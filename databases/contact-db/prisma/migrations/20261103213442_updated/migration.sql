/*
  Warnings:

  - You are about to drop the column `userId` on the `Phone` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,phone]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,line1]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Phone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_userId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_userId_fkey";

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropIndex
DROP INDEX "Phone_userId_phone_key";

-- DropIndex
DROP INDEX "addresses_userId_line1_key";

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "postalCode",
DROP COLUMN "userId",
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Email";

-- CreateTable
CREATE TABLE "emails" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emails_user_id_email_key" ON "emails"("user_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_user_id_phone_key" ON "Phone"("user_id", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_user_id_line1_key" ON "addresses"("user_id", "line1");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
