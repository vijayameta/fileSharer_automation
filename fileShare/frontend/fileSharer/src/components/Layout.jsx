import React, { useState } from "react";
import { Button, Input, message, Upload, Image, Card } from "antd";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
import myImage from "../assets/image.png";

function Layout() {
  const { Dragger } = Upload;
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [downloadFileName, setDownloadFileName] = useState("");
  const [downloadPassword, setDownloadPassword] = useState("");

  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("File uploaded successfully.");
    } catch (error) {
      message.error("File upload failed.");
    }
  };

  const handleDownload = async () => {
    if (!downloadFileName || !downloadPassword) {
      message.error("Please provide both filename and password.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/download/${downloadFileName}`,
        { password: downloadPassword },
        { responseType: "blob" }
      );

      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = downloadFileName;
      link.click();
      message.success("File downloaded successfully!");
    } catch (error) {
      message.error("Error downloading file.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "80%",
          maxWidth: "900px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Side - Download Section */}
          <div style={{ width: "48%" }}>
            <h3 style={{ textAlign: "center", color: "#1890ff" }}>
              Download File
            </h3>
            <Image
              width="100%"
              src={myImage}
              style={{ borderRadius: "10px", marginBottom: "20px" }}
            />
            <Input
              style={{ marginBottom: "10px" }}
              placeholder="Enter File Name"
              value={downloadFileName}
              onChange={(e) => setDownloadFileName(e.target.value)}
            />
            <Input
              style={{ marginBottom: "10px" }}
              placeholder="Enter Password"
              type="password"
              value={downloadPassword}
              onChange={(e) => setDownloadPassword(e.target.value)}
            />
            <Button
              onClick={handleDownload}
              type="primary"
              block
              style={{ marginTop: "10px" }}
            >
              Download
            </Button>
          </div>

          {/* Right Side - Upload Section */}
          <div style={{ width: "48%" }}>
            <h3 style={{ textAlign: "center", color: "#52c41a" }}>
              Upload & Share
            </h3>
            <Dragger {...uploadProps} style={{ borderRadius: "10px", maxHeight: "54%" }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
            <Input
              style={{ marginTop: "10px" }}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              style={{ marginTop: "10px" }}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={handleUpload}
              type="primary"
              block
              style={{ marginTop: "10px" }}
            >
              Upload
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Layout;
