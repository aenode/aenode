/*
  Warnings:

  - A unique constraint covering the columns `[is_active,id]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `operations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `otps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `resources` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `role_permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `scopes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `user_permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `user_tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_active,id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_is_active_id_key" ON "user_roles"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_id_key" ON "user_roles"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_is_active_id_key" ON "comments"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "operations_is_active_id_key" ON "operations"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "otps_is_active_id_key" ON "otps"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_is_active_id_key" ON "permissions"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "resources_is_active_id_key" ON "resources"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_is_active_id_key" ON "role_permissions"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_is_active_id_key" ON "roles"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "scopes_is_active_id_key" ON "scopes"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_is_active_id_key" ON "sessions"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_is_active_id_key" ON "tasks"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_is_active_id_key" ON "user_permissions"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "user_tasks_is_active_id_key" ON "user_tasks"("is_active", "id");

-- CreateIndex
CREATE UNIQUE INDEX "users_is_active_id_key" ON "users"("is_active", "id");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_is_active_fkey" FOREIGN KEY ("user_id", "is_active") REFERENCES "users"("id", "is_active") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_is_active_fkey" FOREIGN KEY ("role_id", "is_active") REFERENCES "roles"("id", "is_active") ON DELETE CASCADE ON UPDATE CASCADE;
