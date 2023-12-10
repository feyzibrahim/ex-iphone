import React from "react";
import ImageZoom from "../../../../../components/ImageZoom";
import Image from "../../../../../assets/iphone.png";

const TrackOrder = () => {
  return (
    <div>
      <ImageZoom
        width={400}
        zoomedValue={800}
        imageUrl={`https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3`}
      />
    </div>
  );
};

export default TrackOrder;
