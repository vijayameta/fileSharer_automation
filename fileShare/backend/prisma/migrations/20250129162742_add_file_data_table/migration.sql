/*
  Warnings:

  - You are about to drop the `fileData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "fileData";

-- CreateTable
CREATE TABLE "FileData" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileData_pkey" PRIMARY KEY ("id")
);
