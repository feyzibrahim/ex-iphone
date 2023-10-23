import React from "react";
import sideView from "../../assets/appleWatchCol/sideView.png";
import Front from "../../assets/appleWatchCol/Front.png";
import ProductCards from "../ProductCards";

import Eight from "../../assets/appleWatchCol/8.png";
import Se from "../../assets/appleWatchCol/se.png";
import Ultra from "../../assets/appleWatchCol/Ultra.png";

const AppleWatchCollection = () => {
  const list = [
    {
      title: "Apple Watch 8",
      img: Eight,
      price: 18000,
      colors: ["#777", "#42ffb4", "#ff0055"],
    },
    {
      title: "Apple Watch Ultra",
      img: Ultra,
      price: 13300,
      colors: ["#777", "#80ff59", "#1612ff"],
    },
    {
      title: "Apple Watch SE",
      img: Se,
      price: 10000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
    {
      title: "Apple Watch 8",
      img: Eight,
      price: 18000,
      colors: ["#777", "#42ffb4", "#ff0055"],
    },
    {
      title: "Apple Watch Ultra",
      img: Ultra,
      price: 13300,
      colors: ["#777", "#80ff59", "#1612ff"],
    },
    {
      title: "Apple Watch SE",
      img: Se,
      price: 10000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
    {
      title: "Apple Watch 8",
      img: Eight,
      price: 18000,
      colors: ["#777", "#42ffb4", "#ff0055"],
    },
    {
      title: "Apple Watch Ultra",
      img: Ultra,
      price: 13300,
      colors: ["#777", "#80ff59", "#1612ff"],
    },
    {
      title: "Apple Watch SE",
      img: Se,
      price: 10000,
      colors: ["#777", "#ff7af6", "#38ff67", "#fcc728", "#ff351f"],
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center m-10 lg:mx-20 p-5 lg:px-20 lg:py-10 bg-color-two-side rounded-2xl ">
        <img src={sideView} alt="Side View" className="w-10 lg:w-auto" />
        <h1 className="text-3xl lg:text-8xl font-bold text-white">
          Apple Watch
        </h1>
        <img src={Front} alt="Front" className="w-10 lg:w-auto" />
      </div>
      <div className="flex gap-20 px-5 overflow-x-scroll scrollbar-hide py-10">
        {list.map((data, index) => {
          return <ProductCards key={index} data={data} />;
        })}
      </div>
    </>
  );
};

export default AppleWatchCollection;
