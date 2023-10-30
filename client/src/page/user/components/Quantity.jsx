import React from "react";

const Quantity = ({ increment, decrement, count }) => {
  return (
    <div className="flex gap-5 items-center border border-gray-500 rounded-lg p-2 font-bold">
      <button onClick={decrement} className="px-2 hover:bg-white rounded-full">
        -
      </button>
      {count}
      <button onClick={increment} className="px-2 hover:bg-white rounded-full">
        +
      </button>
    </div>
  );
};

export default Quantity;
