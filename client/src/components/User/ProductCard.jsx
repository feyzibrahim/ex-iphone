import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-lg cursor-pointer"
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
    >
      <div className="overflow-hidden rounded-lg h-56">
        <img
          src={`http://localhost:4000/img/${product.imageURL}`}
          alt={product.name}
          className="object-contain w-full h-full"
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
        <span className="text-gray-500 line-through">
          {parseInt(product.price * 1.25)}₹
        </span>
        {" " + product.price}₹
      </p>
    </div>
  );
};

export default ProductCard;
