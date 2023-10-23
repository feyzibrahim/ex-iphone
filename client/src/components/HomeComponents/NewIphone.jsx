import React from "react";

import iphone13 from "../../assets/iPhoneCollection/iphone13.png";
import iphone14 from "../../assets/iPhoneCollection/iphone14.png";
import iphone14pro from "../../assets/iPhoneCollection/iphone14pro.png";
import iphoneSE from "../../assets/iPhoneCollection/iphoneSE.png";
import ProductCards from "../ProductCards";

const NewIphone = () => {
  const list = [
    {
      title: "iPhone 13",
      img: iphone13,
      price: 59000,
      colors: ["#777", "#42ffb4", "#ff0055"],
    },
    {
      title: "iPhone 14",
      img: iphone14,
      price: 59000,
      colors: ["#777", "80ff59"],
    },
    {
      title: "iPhone 14Pro",
      img: iphone14pro,
      price: 59000,
      colors: ["#777", "#80ff59", "#1612ff"],
    },
    {
      title: "iPhone SE",
      img: iphoneSE,
      price: 59000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
    {
      title: "iPhone SE",
      img: iphoneSE,
      price: 59000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
    {
      title: "iPhone SE",
      img: iphoneSE,
      price: 59000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
    {
      title: "iPhone SE",
      img: iphoneSE,
      price: 59000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
    {
      title: "iPhone SE",
      img: iphoneSE,
      price: 59000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
    {
      title: "iPhone SE",
      img: iphoneSE,
      price: 59000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
  ];

  return (
    <div className="pt-20 lg:py-20">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mb-5 text-gray-800">
        Newest ex.iphones. Collection
      </h1>
      <div className="flex gap-20 px-5 overflow-x-scroll scrollbar-hide py-10">
        {list.map((data, index) => {
          return <ProductCards key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default NewIphone;
