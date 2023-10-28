import React, { useState, useRef } from "react";
import ImageUploadIcon from "./ImageUploadIcon";

const CustomFileInput = ({ onChange }) => {
  const [droppedFiles, setDroppedFiles] = useState([]);
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

    const files = Array.from(e.dataTransfer.files);
    setDroppedFiles(files);
    onChange(files);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setDroppedFiles(files);
    onChange(files);
  };

  const handleClearFiles = () => {
    setDroppedFiles([]);
    onChange([]);
  };

  return (
    <div
      className={`border-dashed border-2 p-8 rounded-lg text-center ${
        isDragging
          ? "bg-blue-100 border-blue-500"
          : "bg-gray-100 border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-center">
        <ImageUploadIcon />
      </div>
      <p className="text-sm text-gray-400 my-2">
        Drag and drop images here, or click add image
      </p>
      <button
        className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        Add Image
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
      />
      {droppedFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-5 justify-center flex-wrap">
            {droppedFiles.map((file, index) => (
              <div
                key={index}
                className="bg-white p-2 rounded-lg shadow-lg mb-2 w-24 h-24"
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-full w-full object-contain rounded"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100"></div>
                )}

                <p className="flex-grow truncate text-xs mt-3">{file.name}</p>
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFiles}
          >
            Clear Files
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;
