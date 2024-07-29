import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setFile(droppedFile);
      onFileUpload(droppedFile);
    } else {
      alert("Please upload an XLSX file.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    } else {
      alert("Please upload an XLSX file.");
    }
  };

  return (
    <div className="p-6">
      <div
        className={`border-2 border-dashed rounded-full py-8 px-10 flex gap-x-6 items-end cursor-pointer transition-colors duration-300 ${
          isDragging ? "border-black" : "border-gray-300"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-700 mb-1.5 text-lg">
          {file
            ? `Uploaded file: ${file.name}`
            : "Drag and drop an XLSX file here or"}
        </p>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Select XLSX File
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
