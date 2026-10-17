/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_task_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tasks" DROP CONSTRAINT "user_tasks_task_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tasks" DROP CONSTRAINT "user_tasks_user_id_fkey";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "tasks";

-- DropTable
DROP TABLE "user_tasks";
