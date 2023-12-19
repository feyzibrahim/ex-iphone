import React from "react";
import { URL } from "../Common/api";
import { Link } from "react-router-dom";

const ProductCards = ({ data }) => {
  return (
    <div className="flex-shrink-0 text-center">
      <div className="w-56 h-56 mx-auto">
        <img
          className="h-full w-full object-contain"
          src={`${URL}/img/${data.imageURL}`}
          alt={data.name}
        />
      </div>
      <p className="text-orange-800 font-bold my-2">New</p>
      <h1 className="text-2xl font-bold my-2 w-56 line-clamp-1">{data.name}</h1>
      <h2 className=" my-2">From ₹{data.price + data.markup}</h2>
      <Link
        className="btn-blue-no-pad px-3 lg:px-12 py-1 text-white"
        to="/login"
      >
        Buy
      </Link>
    </div>
  );
};

export default ProductCards;
