import React from "react";

const JustLoading = ({ size }) => {
  return (
    <div
      className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-blue-500`}
    ></div>
  );
};

export default JustLoading;
