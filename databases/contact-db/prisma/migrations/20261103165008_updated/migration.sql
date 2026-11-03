/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEmail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPhone` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,email]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,phone]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Phone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_addressId_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEmail" DROP CONSTRAINT "UserEmail_emailId_fkey";

-- DropForeignKey
ALTER TABLE "UserEmail" DROP CONSTRAINT "UserEmail_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPhone" DROP CONSTRAINT "UserPhone_phoneId_fkey";

-- DropForeignKey
ALTER TABLE "UserPhone" DROP CONSTRAINT "UserPhone_userId_fkey";

-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Phone" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "UserAddress";

-- DropTable
DROP TABLE "UserEmail";

-- DropTable
DROP TABLE "UserPhone";

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "phone_code" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subdivisions" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "subdivisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "note" TEXT,
    "country_code" TEXT NOT NULL,
    "subdivision_code" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "subdivisions_name_key" ON "subdivisions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subdivisions_code_key" ON "subdivisions"("code");

-- CreateIndex
CREATE INDEX "subdivisions_country_id_idx" ON "subdivisions"("country_id");

-- CreateIndex
CREATE INDEX "addresses_country_code_idx" ON "addresses"("country_code");

-- CreateIndex
CREATE INDEX "addresses_subdivision_code_idx" ON "addresses"("subdivision_code");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_userId_line1_key" ON "addresses"("userId", "line1");

-- CreateIndex
CREATE UNIQUE INDEX "Email_userId_email_key" ON "Email"("userId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_userId_phone_key" ON "Phone"("userId", "phone");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subdivisions" ADD CONSTRAINT "subdivisions_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "countries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_subdivision_code_fkey" FOREIGN KEY ("subdivision_code") REFERENCES "subdivisions"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
