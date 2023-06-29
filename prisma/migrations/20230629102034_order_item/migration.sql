-- DropForeignKey
ALTER TABLE `Items` DROP FOREIGN KEY `Items_order_id_fkey`;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;
