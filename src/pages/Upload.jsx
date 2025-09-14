import React, { useState } from "react";
import FileUpload from "../components/FileUpload";

export default function Upload() {
  const [uploadStatus, setUploadStatus] = useState(null);

  // Function to handle the selected file
  const handleFileSelected = async (file) => {
    setUploadStatus("Uploading...");

    try {
      // Simulate upload delay, replace this with your real upload logic
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here, you can call your API to upload the file
      // e.g., await uploadFileToServer(file);

      setUploadStatus(`Successfully uploaded: ${file.name}`);
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Utility Bill</h2>
      <FileUpload onFileSelected={handleFileSelected} />
      {uploadStatus && <p className="mt-4 text-sm">{uploadStatus}</p>}
    </div>
  );
}
