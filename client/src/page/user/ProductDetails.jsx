import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  return <div className="h-screen items-center justify-center">{id}</div>;
};

export default ProductDetails;
