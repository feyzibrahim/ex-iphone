import React from "react";
import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
import { URL } from "@common/api";

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
          src={`${URL}/img/${product.imageURL}`}
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
        {product.offer && (
          <span className="text-gray-500 line-through">
            {parseInt(
              ((product.price + product.markup) * (product.offer + 100)) / 100
            )}
            ₹
          </span>
        )}
        {" " + (product.price + product.markup)}₹
      </p>
    </div>
  );
};

export default ProductCard;
