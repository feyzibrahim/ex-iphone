import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
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
      {product.numberOfReviews > 0 ? (
        <RatingStars
          numberOfReviews={product.numberOfReviews}
          rating={product.rating}
        />
      ) : (
        <div className="h-9"></div>
      )}
      <p className="font-bold  text-gray-800 line-clamp-1">{product.name}</p>
      <p className="font-semibold text-md text-blue-500">
        <span className="text-gray-500 line-through">
          {parseInt((product.price + product.markup) * 1.25)}₹
        </span>
        {" " + (product.price + product.markup)}₹
      </p>
    </div>
  );
};

export default ProductCard;
