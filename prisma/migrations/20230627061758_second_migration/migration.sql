-- AlterTable
ALTER TABLE `Order` ADD COLUMN `status` ENUM('pending', 'completed', 'cancelled') NOT NULL DEFAULT 'pending';
