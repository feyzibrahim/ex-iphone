import React, { useState, useRef } from "react";
import ImageUploadIcon from "./ImageUploadIcon";

const CustomSingleFileInput = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0]; // Only consider the first dropped file
    setSelectedFile(file);
    onChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Only consider the first selected file
    setSelectedFile(file);
    onChange(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    onChange([]);
  };

  return (
    <div
      className={`h-64 w-64 border-dashed border-2 rounded-lg text-center ${
        isDragging
          ? "bg-blue-100 border-blue-500"
          : "bg-gray-100 border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="h-full w-full px-8 pt-4 pb-20">
          <div className="bg-white p-2 h-full w-full rounded-lg shadow-lg">
            {selectedFile.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
                className="object-cover w-full h-full rounded"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100"></div>
            )}
            <p className="truncate text-xs mt-3">{selectedFile.name}</p>
          </div>
          <button
            className=" bg-red-500 text-white font-bold py-2 px-4 rounded mt-6"
            onClick={handleClearFile}
          >
            Clear File
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-8">
          <div>
            <div className="flex justify-center">
              <ImageUploadIcon />
            </div>
            <p className="text-sm text-gray-400 my-2">
              Drag and drop an image here, or click to upload
            </p>
            <button
              type="button"
              className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
              onClick={handleButtonClick}
            >
              Upload Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSingleFileInput;
