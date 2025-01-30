import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import nodemailer from "nodemailer";
import { createFileData, getFileByFilename } from "./model/fileData"; // Import database functions

import dotenv from "dotenv";
dotenv.config();


type MulterFile = Express.Multer.File;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
const UPLOAD_DIR = path.join(__dirname, "uploads");
fs.ensureDirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) =>
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

/** 📌 Send Email Function */
const sendEmail = async (email: string, downloadLink: string, password: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'hermann20@ethereal.email',
            pass: 'bfEGwHgFwmJzMdT1tX'
        }
    });
    

  const mailOptions = {
    from: `"vijay ameta" <vijay@12> `,
    to: "ametajoshi23@gmail.com",
    subject: "Your File is Ready for Download",
    text: `You can download your file by entering file name and password: ${downloadLink.split('/').pop()} \n\n Password: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully to", email);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

/** 📌 File Upload API */
app.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
  const file = req.file as MulterFile;
  const { email, password } = req.body;

  if (!file) 
    res.status(400).json({ error: "No file uploaded" });
  if (!email || !password) 
    res.status(400).json({ error: "Email and password are required" });

  const fileUrl = `${req.protocol}://${req.get("host")}/download/${file.filename}`;
  
  try {
    // Save file details to database
    await createFileData(
      file.filename,
      file.originalname,
      email,
      password,
      fileUrl
    );

    // Send email with download link
    await sendEmail(email, fileUrl, password);

    res.json({ message: "File uploaded successfully. Download link sent to email.", fileUrl });
  } catch (error) {
    console.error("❌ Error saving file data:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
});

/** 📌 File Download API with Password Verification */
app.post("/download/:filename", async (req: Request, res: Response) => {
    const { password } = req.body;
    const { filename } = req.params;
  
    // Fetch file data from DB by filename
    const fileData = await getFileByFilename(filename);
  
    // If fileData is null or undefined, return an error response
    if (!fileData) {
       res.status(404).json({ error: "File not found" });
    }
  
  
    const filePath = path.join(UPLOAD_DIR, filename);
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: "File not found" });
    }
  
    // If all checks pass, send the file
    res.download(filePath);
  });
  

/** 📌 Server Start */
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
