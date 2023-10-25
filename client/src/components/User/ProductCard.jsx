import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
const ProductCard = ({ product }) => {
  return (
    <div className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-lg cursor-pointer">
      <div className="overflow-hidden rounded-lg h-40 md:h-48 lg:h-56">
        <img
          src={`http://localhost:4000/img/${product.imageURL}`}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex text-sm items-center gap-1 mt-4 ">
        <span className="text-yellow-400 flex gap-1">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </span>
        <AiOutlineStar />
        <p>(928)</p>
      </div>
      <p className="font-bold  text-gray-800">{product.name}</p>
      <p className="font-semibold text-md text-blue-500">
        <span className="text-gray-500 line-through">{product.price}₹</span>
        {" " + product.price}₹
      </p>
    </div>
  );
};

export default ProductCard;
