import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 📌 Create File Data */
export const createFileData = async (
  filename: string,
  originalName: string,
  email: string,
  password: string,
  fileUrl: string
) => {
  try {
    const newFileData = await prisma.fileData.create({
      data: {
        filename,
        originalName,
        email,
        password,
        fileUrl,
      },
    });
    return newFileData;
  } catch (error) {
    console.error("❌ Error creating file data:", error);
    throw error;
  }
};

/** 📌 Get File Data by Filename */
export const getFileByFilename = async (filename: string) => {
  try {
    const fileData = await prisma.fileData.findFirst({
        where: { filename },
      });
      
    return fileData;
  } catch (error) {
    console.error("❌ Error fetching file data:", error);
    throw error;
  }
};
