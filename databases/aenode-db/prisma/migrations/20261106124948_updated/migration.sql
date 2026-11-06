-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "App_uuid_key" ON "App"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "App_name_key" ON "App"("name");
