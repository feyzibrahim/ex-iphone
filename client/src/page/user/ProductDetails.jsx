import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import {
//   MagnifierContainer,
//   MagnifierPreview,
//   Magnifier,
//   SideBySideMagnifier,
// } from "@vanyapr/react-image-magnifiers";
import { AiFillStar, AiOutlineStar, AiFillHeart } from "react-icons/ai";

import DescReview from "./components/DescReview";

const ProductDetails = () => {
  const { id } = useParams();
  const { userProducts } = useSelector((state) => state.userProducts);

  let currentPro = "";
  userProducts.forEach((pro) => {
    if (pro._id === id) {
      currentPro = pro;
    }
  });

  let [currentImage, setCurrentImage] = useState(currentPro.imageURL);

  let [count, setCount] = useState(1);

  return (
    <div className="px-5 lg:px-40 py-20 bg-gray-100">
      <div className="lg:flex gap-10 justify-center">
        {/* Product Images */}
        <div className="lg:w-1/2 bg-white p-5 rounded flex flex-col items-center">
          <div className="w-80 h-80 lg:w-96 lg:h-96 flex">
            <img
              src={`http://localhost:4000/img/${currentImage}`}
              alt="Some to be"
              className="w-full h-full object-contain"
            />
            {/* <Magnifier
              imageSrc={`http://localhost:4000/img/${currentImage}`}
              imageAlt="Large Image"
              largeImageSrc={`http://localhost:4000/img/${currentImage}`}
              magnifierSize="30%"
            />
            <SideBySideMagnifier
              imageSrc={`http://localhost:4000/img/${currentImage}`}
              imageAlt="Large Image"
              alwaysInPlace={true}
              largeImageSrc={`http://localhost:4000/img/${currentImage}`}
              smallImageSrc={`http://localhost:4000/img/${currentImage}`}
            /> */}
          </div>

          <div className="flex gap-5 mt-5">
            {currentPro.moreImageURL.map((im, i) => (
              <div
                key={i}
                className={`flex justify-center items-center w-20 h-20 overflow-clip border ${
                  currentImage === im ? "border-gray-500" : "border-gray-300"
                } hover:border-gray-500 p-2 cursor-pointer `}
                onClick={() => setCurrentImage(im)}
              >
                <img
                  className="w-full h-full object-contain"
                  key={i}
                  src={`http://localhost:4000/img/${im}`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="lg:w-1/2">
          <div className="flex text-sm items-center gap-1 mt-4 ">
            <span className="text-yellow-400 flex gap-1">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </span>
            <AiOutlineStar />
            <p className="font-semibold">
              4.7 Star Rating{" "}
              <span className="text-gray-500">(20 User Feedback)</span>
            </p>
          </div>
          <h1 className="text-2xl font-bold my-2">{currentPro.name}</h1>

          <div className="flex gap-3 text-gray-500">
            <p>
              Availability:{" "}
              <span
                className={`font-semibold ${
                  currentPro.status === "published" && "text-green-600"
                } ${currentPro.status === "out of stock" && "text-red-600"}`}
              >
                {currentPro.status === "published"
                  ? "In Stock"
                  : currentPro.status}
              </span>
            </p>
            <p>
              Brand: <span className="font-semibold">Apple</span>{" "}
            </p>
            <p>
              Category:{" "}
              <span className="font-semibold">{currentPro.category}</span>
            </p>
          </div>
          <p className="text-xl font-semibold my-2">
            <span className="text-blue-600">{currentPro.price}₹</span>
            {"  "}
            <span className="text-gray-500 line-through">
              {currentPro.price * 1.25}₹
            </span>
            <span className="bg-orange-500 px-3 py-1 ml-5 text-base rounded">
              25% Off
            </span>
          </p>
          {currentPro.attributes &&
            currentPro.attributes.slice(0, 5).map((at, index) => (
              <div key={index}>
                <p className="font-semibold text-gray-500 text-sm">{at.name}</p>
                <p className="py-2 px-3 capitalize rounded bg-white ">
                  {at.value}
                </p>
              </div>
            ))}
          <div className="flex my-4 gap-3">
            <div className="flex gap-5 items-center border border-gray-500 rounded-lg p-2 font-bold">
              <button
                onClick={() => setCount((c) => c - 1)}
                className="px-2 hover:bg-white rounded-full"
              >
                -
              </button>
              {count}
              <button
                onClick={() => setCount((c) => c + 1)}
                className="px-2 hover:bg-white rounded-full"
              >
                +
              </button>
            </div>
            <button className="w-full font-semibold text-blue-700 border border-blue-700 rounded-lg p-2 hover:bg-blue-700 hover:text-white">
              Add to Cart
            </button>
          </div>
          <div className="flex gap-3">
            <button className="w-full font-semibold hover:bg-blue-500 rounded-lg p-2 bg-blue-700 text-white">
              Buy Now
            </button>
            <button className="border border-gray-500 rounded-lg px-3 hover:bg-white">
              <AiFillHeart />
            </button>
          </div>
        </div>
      </div>
      <DescReview description={currentPro.description} />
    </div>
  );
};

export default ProductDetails;
