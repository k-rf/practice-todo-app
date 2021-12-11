/*
  Warnings:

  - You are about to drop the column `todoStatusId` on the `Todo` table. All the data in the column will be lost.
  - The primary key for the `TodoStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TodoStatus` table. All the data in the column will be lost.
  - Added the required column `todoStatusName` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todoStatusId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "todoStatusId",
ADD COLUMN     "todoStatusName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TodoStatus" DROP CONSTRAINT "TodoStatus_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TodoStatus_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoStatusName_fkey" FOREIGN KEY ("todoStatusName") REFERENCES "TodoStatus"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
