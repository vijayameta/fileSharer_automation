-- CreateTable
CREATE TABLE "FileData" (
    "id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "FileData_pkey" PRIMARY KEY ("id")
);
