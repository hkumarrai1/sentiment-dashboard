import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileCsv } from "react-icons/fa";

const UploadBox = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="upload-box" onDrop={handleDrop} onDragOver={handleDragOver}>
      <FaCloudUploadAlt size={40} />

      {!fileName ? (
        <>
          <p>Drag & Drop CSV here</p>
          <p>or</p>
        </>
      ) : (
        <div style={{ marginTop: "10px" }}>
          <FaFileCsv size={20} />
          <p style={{ marginTop: "5px", fontWeight: "bold" }}>{fileName}</p>
        </div>
      )}

      <label className="upload-btn">
        Browse File
        <input type="file" accept=".csv" onChange={handleChange} hidden />
      </label>
    </div>
  );
};

export default UploadBox;
