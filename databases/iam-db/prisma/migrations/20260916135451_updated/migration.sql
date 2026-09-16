-- CreateTable
CREATE TABLE "scopes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "is_active" BOOLEAN DEFAULT true,
    "name" TEXT NOT NULL,

    CONSTRAINT "scopes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scopes_name_key" ON "scopes"("name");
