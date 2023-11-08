import React, { useState } from "react";
import { URL } from "../Common/links";

const ImageMagnify = ({ img }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageSize = 300; // Size of the original image
  const magnificationFactor = 4; // Magnification factor

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) * magnificationFactor;
    const y = (e.clientY - rect.top) * magnificationFactor;
    setPosition({ x, y });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px", // Adjust the distance between original and magnified images
      }}
    >
      <div
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          overflow: "hidden",
          position: "relative",
        }}
        onMouseMove={handleMouseMove}
      >
        <img
          src={`${URL}/img/${img}`} // Replace with your image URL
          alt="Original"
          style={{
            width: `${imageSize * magnificationFactor}px`,
            height: `${imageSize * magnificationFactor}px`,
            objectFit: "cover",
            position: "absolute",
            left: `-${position.x}px`,
            top: `-${position.y}px`,
          }}
        />
      </div>
      <div
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          border: "1px solid #ccc",
          backgroundImage: `url('${URL}/img/${img}')`, // Replace with your image URL
          backgroundSize: `${imageSize * magnificationFactor}px ${
            imageSize * magnificationFactor
          }px`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: `-${position.x}px -${position.y}px`,
        }}
      >
        {/* Magnified image container */}
      </div>
    </div>
  );
};

export default ImageMagnify;
