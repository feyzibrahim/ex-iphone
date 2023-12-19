import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "@common/api";
import { config } from "@common/configurations";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const [items, setItems] = useState([]);
  // Initial data loading
  const loadData = async () => {
    const { data } = await axios.get(`${URL}/public/banners`, config);
    setItems(data.banners.images);
  };
  useEffect(() => {
    loadData();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full px-5 sm:px-20 pb-12">
      <Slider {...settings}>
        {items &&
          items.map((item) => (
            <div key={item} className="lg:h-[80vh]">
              <img
                src={`${URL}/img/${item}`}
                alt="oskfjii"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
