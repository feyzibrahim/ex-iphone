import React, { useState, useEffect } from "react";

const ImageZoom = ({ width, zoomedWidth, zoomedValue, imageUrl }) => {
  const [hoverPosition, setHoverPosition] = useState(null);
  const [imageSize, setImageSize] = useState({ width: width, height: width });

  useEffect(() => {
    const img = document.querySelector(".image-style");
    if (img) {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    }
  }, []);

  const handleHover = (e) => {
    const box1Rect = document.querySelector(".box1").getBoundingClientRect();

    const relativeX = e.clientX - box1Rect.left;
    const relativeY = e.clientY - box1Rect.top;

    const x = Math.min(
      box1Rect.width - getBoxSize(),
      Math.max(0, relativeX - getBoxSize() / 2)
    );
    const y = Math.min(
      box1Rect.height - getBoxSize(),
      Math.max(0, relativeY - getBoxSize() / 2)
    );

    setHoverPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  const getBoxSize = () => {
    // Calculate box size based on the width and zoomedValue
    const ratio = 0.2; // You can adjust this ratio to fit your needs
    return Math.min(width * ratio, zoomedValue * ratio);
  };

  const zoomedHeight = (zoomedWidth / imageSize.width) * imageSize.height;

  const getZoomedImagePosition = () => {
    if (hoverPosition) {
      const percentageX = (hoverPosition.x / imageSize.width) * 100;
      const percentageY = (hoverPosition.y / imageSize.height) * 100;

      const bgPosX = Math.floor(
        ((zoomedValue - zoomedWidth) / imageSize.width) * percentageX
      );
      const bgPosY = Math.floor(
        ((zoomedValue - zoomedHeight) / imageSize.height) * percentageY
      );

      return `${-bgPosX}px ${-bgPosY}px`;
    }

    return "0% 0%";
  };

  return (
    <div className="container">
      <div
        className="box1"
        onMouseMove={handleHover}
        onMouseLeave={handleMouseLeave}
        style={{
          width: `${width}px`,
          height: `${width}px`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt="soidj"
          className="image-style"
          style={{ width: `100%`, height: `100%`, objectFit: `contain` }}
        />
        {hoverPosition && (
          <div
            className="mouseSquare"
            style={{
              left: hoverPosition.x + "px",
              top: hoverPosition.y + "px",
              width: `${getBoxSize()}px`,
              height: `${getBoxSize()}px`,
              position: "absolute",
              border: " solid 3px green",
            }}
          ></div>
        )}
      </div>
      {hoverPosition && (
        <div
          className="box2"
          style={{
            width: `${zoomedWidth}px`,
            height: `${zoomedWidth}px`,
            border: "1px solid black",
            position: "absolute",
            top: 80,
            left: "50%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              objectPosition: getZoomedImagePosition(),
              backgroundImage: `url(${imageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: `-${hoverPosition.x}px -${hoverPosition.y}px`,
              backgroundSize: `${zoomedValue}px ${zoomedValue}px`,
              width: `${zoomedWidth}px`,
              height: `${zoomedWidth}px`,
              backgroundColor: `aqua`,
            }}
            className="image-zoom-container"
          ></div>
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
