import React from "react";

const ProductCards = ({ data }) => {
  return (
    <div className="flex-shrink-0 text-center">
      <img src={data.img} alt={data.title} />
      <div className="flex gap-2 justify-center my-2">
        {data.colors.map((col) => {
          return (
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: col }}
            ></div>
          );
        })}
      </div>
      <p className="text-orange-800 font-bold my-2">New</p>
      <h1 className="text-2xl font-bold my-2">{data.title}</h1>
      <h2 className=" my-2">From ₹{data.price}</h2>
      <button className="btn-blue-no-pad px-3 lg:px-12 py-1 text-white">
        Buy
      </button>
    </div>
  );
};

export default ProductCards;
