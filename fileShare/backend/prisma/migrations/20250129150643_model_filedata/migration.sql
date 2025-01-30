/*
  Warnings:

  - You are about to drop the `FileData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FileData";

-- CreateTable
CREATE TABLE "fileData" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fileData_pkey" PRIMARY KEY ("id")
);
