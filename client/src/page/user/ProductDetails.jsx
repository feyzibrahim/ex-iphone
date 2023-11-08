import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar, AiFillHeart } from "react-icons/ai";
import axios from "axios";

import DescReview from "./components/DescReview";
import Quantity from "./components/Quantity";
import toast from "react-hot-toast";
import { URL } from "../../Common/links";

const ProductDetails = () => {
  const { id } = useParams();

  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let [currentImage, setCurrentImage] = useState("");

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/user/product/${id}`);

      if (data) {
        setProduct(data.product);
        setLoading(false);
        setCurrentImage(data.product.imageURL);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  let [count, setCount] = useState(1);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((c) => c - 1);
    }
  };

  const [cartLoading, setCartLoading] = useState(false);
  const addToCart = async () => {
    setCartLoading(true);
    await axios
      .post(
        `http://localhost:4000/user/cart`,
        {
          product: id,
          quantity: count,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((data) => {
        toast.success("Added to cart");
        setCartLoading(false);
      })
      .catch((error) => {
        const err = error.response.data.error;
        toast.error(err);
        setCartLoading(false);
      });
  };

  return (
    <div className="px-5 lg:px-40 py-20 bg-gray-100">
      {product ? (
        <>
          <div className="lg:flex gap-10 justify-center">
            {/* Product Images */}
            <div className="lg:w-1/2 bg-white p-5 rounded flex flex-col items-center">
              <div className="w-80 h-80 lg:w-96 lg:h-96 flex">
                {currentImage && (
                  <img
                    src={`http://localhost:4000/img/${currentImage}`}
                    alt="Some to be"
                    className="w-full h-full object-contain"
                  />
                )}
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
                {product.moreImageURL &&
                  product.moreImageURL.map((image, i) => (
                    <div
                      key={i}
                      className={`flex justify-center items-center w-20 h-20 overflow-clip border ${
                        currentImage === image
                          ? "border-gray-500"
                          : "border-gray-300"
                      } hover:border-gray-500 p-2 cursor-pointer `}
                      onClick={() => setCurrentImage(image)}
                    >
                      <img
                        className="w-full h-full object-contain"
                        key={i}
                        src={`http://localhost:4000/img/${image}`}
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
              <h1 className="text-2xl font-bold my-2">{product.name}</h1>

              <div className="flex gap-3 text-gray-500">
                <p>
                  Availability:{" "}
                  <span
                    className={`font-semibold capitalize ${
                      product.status === "published" && "text-green-600"
                    } ${product.status === "low quantity" && "text-red-600"}`}
                  >
                    {product.status === "published"
                      ? "In Stock"
                      : product.status}
                  </span>
                </p>
                <p>
                  Brand: <span className="font-semibold">Apple</span>{" "}
                </p>
                <p>
                  Category:{" "}
                  <span className="font-semibold">
                    {product.category && product.category.name}
                  </span>
                </p>
              </div>
              <p className="text-xl font-semibold my-2">
                <span className="text-blue-600">
                  {product.price + product.markup}₹
                </span>
                {"  "}
                <span className="text-gray-500 line-through">
                  {(product.price + product.markup) * 1.25}₹
                </span>
                <span className="bg-orange-500 px-3 py-1 ml-5 text-base rounded">
                  25% Off
                </span>
              </p>
              {product.attributes &&
                product.attributes.slice(0, 5).map((at, index) => (
                  <div key={index}>
                    <p className="font-semibold text-gray-500 text-sm">
                      {at.name}
                    </p>
                    <p className="py-2 px-3 capitalize rounded bg-white ">
                      {at.value}
                    </p>
                  </div>
                ))}
              <div className="flex my-4 gap-3">
                <Quantity
                  count={count}
                  decrement={decrement}
                  increment={increment}
                />
                <button
                  onClick={addToCart}
                  className="w-full font-semibold text-blue-700 border border-blue-700 rounded-lg p-2 hover:bg-blue-700 hover:text-white"
                >
                  {cartLoading ? "Loading" : "Add to Cart"}
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
          <DescReview description={product.description} />
        </>
      ) : (
        <p>No Details</p>
      )}
    </div>
  );
};

export default ProductDetails;
