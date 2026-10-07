-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_role_id_is_active_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_user_id_is_active_fkey";

-- DropIndex
DROP INDEX "comments_is_active_id_key";

-- DropIndex
DROP INDEX "operations_is_active_id_key";

-- DropIndex
DROP INDEX "otps_is_active_id_key";

-- DropIndex
DROP INDEX "permissions_is_active_id_key";

-- DropIndex
DROP INDEX "resources_is_active_id_key";

-- DropIndex
DROP INDEX "role_permissions_is_active_id_key";

-- DropIndex
DROP INDEX "roles_is_active_id_key";

-- DropIndex
DROP INDEX "scopes_is_active_id_key";

-- DropIndex
DROP INDEX "sessions_is_active_id_key";

-- DropIndex
DROP INDEX "tasks_is_active_id_key";

-- DropIndex
DROP INDEX "user_permissions_is_active_id_key";

-- DropIndex
DROP INDEX "user_roles_is_active_id_key";

-- DropIndex
DROP INDEX "user_tasks_is_active_id_key";

-- DropIndex
DROP INDEX "users_is_active_id_key";

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
