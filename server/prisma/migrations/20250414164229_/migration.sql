/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `borrow` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `borrowitem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `borrowitem` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `borrowitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `borrow` DROP COLUMN `totalAmount`;

-- AlterTable
ALTER TABLE `borrowitem` DROP COLUMN `price`,
    DROP COLUMN `quantity`,
    DROP COLUMN `totalAmount`;
