/*
  Warnings:

  - You are about to alter the column `price` on the `Items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Items` MODIFY `price` DOUBLE NOT NULL;
