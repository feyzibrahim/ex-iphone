import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import JustLoading from "../../components/JustLoading";
import DescReview from "./components/DescReview";
import Quantity from "./components/Quantity";
import toast from "react-hot-toast";
import { URL } from "../../Common/api";
import { config } from "../../Common/configurations";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../redux/actions/user/wishlistActions";
import ProductDetailsStarAndRating from "./components/ProductDetailsStarAndRating";
import { addToBuyNowStore } from "../../redux/reducers/user/buyNowSlice";
import ImageZoom from "../../components/ImageZoom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let [currentImage, setCurrentImage] = useState("");

  // Adding a product to wishlist
  const dispatchAddWishlist = () => {
    dispatch(addToWishlist({ product: id }));
  };

  // Product loading when the page loads
  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/user/product/${id}`, {
        withCredentials: true,
      });

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

  const increment = async () => {
    const { data } = await axios.get(
      `${URL}/user/product-quantity/${id}`,
      config
    );

    if (data.stockQuantity > count) {
      setCount((c) => c + 1);
    } else {
      toast.error("Quantity Insufficient");
    }
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
        `${URL}/user/cart`,
        {
          product: id,
          quantity: count,
        },
        { ...config, withCredentials: true }
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

  // Checking if this product exists in the wishlist
  const { wishlist } = useSelector((state) => state.wishlist);
  const isProductInWishlist = wishlist.some((item) => item.product._id === id);

  return (
    <div className="px-5 lg:px-40 py-20 bg-gray-100">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <JustLoading size={20} />
        </div>
      ) : product ? (
        <>
          <div className="lg:flex gap-10 justify-center">
            {/* Product Images */}
            <div className="lg:w-1/2 bg-white p-5 rounded flex flex-col items-center h-fit">
              <div className="w-80 h-80 lg:w-96 lg:h-96 hidden lg:block">
                {currentImage && (
                  <ImageZoom
                    imageUrl={`${URL}/img/${currentImage}`}
                    width={400}
                    zoomedValue={820}
                    zoomedWidth={500}
                  />
                )}
              </div>
              <div className="w-80 lg:w-96 lg:h-96 lg:hidden mx-auto">
                {currentImage && (
                  <img
                    src={`${URL}/img/${currentImage}`}
                    alt="Product"
                    className="w-60 h-60 object-cover"
                  />
                )}
              </div>

              <div className="flex gap-1 lg:gap-5 mt-5">
                {product.moreImageURL &&
                  product.moreImageURL.map((image, i) => (
                    <div
                      key={i}
                      className={`flex justify-center items-center w-12 h-12 lg:w-20 lg:h-20 overflow-clip border ${
                        currentImage === image
                          ? "border-gray-500"
                          : "border-gray-300"
                      } hover:border-gray-500 p-2 cursor-pointer `}
                      onClick={() => setCurrentImage(image)}
                    >
                      <img
                        className="w-full h-full object-contain"
                        key={i}
                        src={`${URL}/img/${image}`}
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/* Product Details */}
            <div className="lg:w-1/2">
              {product.numberOfReviews > 0 && (
                <ProductDetailsStarAndRating
                  numberOfReviews={product.numberOfReviews}
                  rating={product.rating}
                />
              )}
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
                {product.offer && (
                  <>
                    <span className="text-gray-500 line-through">
                      {parseInt(
                        ((product.price + product.markup) *
                          (product.offer + 100)) /
                          100
                      )}
                      ₹
                    </span>
                    <span className="bg-orange-500 px-3 py-1 ml-5 text-base rounded">
                      {product.offer}% Off
                    </span>
                  </>
                )}
              </p>
              {product.attributes &&
                product.attributes.slice(0, 4).map((at, index) => (
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
                  disabled={cartLoading}
                >
                  {cartLoading ? "Loading" : "Add to Cart"}
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  className="w-full font-semibold hover:bg-blue-500 rounded-lg p-2 bg-blue-700 text-white"
                  onClick={() => {
                    dispatch(addToBuyNowStore({ product, count }));
                    navigate(`/buy-now`);
                  }}
                >
                  Buy Now
                </button>

                {isProductInWishlist ? (
                  <div className="border border-gray-500 rounded-lg p-3">
                    <AiFillHeart />
                  </div>
                ) : (
                  <button
                    className="border border-gray-500 rounded-lg px-3 hover:bg-white"
                    onClick={dispatchAddWishlist}
                  >
                    <AiOutlineHeart />
                  </button>
                )}
              </div>
            </div>
          </div>
          <DescReview product={product} id={id} />
        </>
      ) : (
        <p>No Details</p>
      )}
    </div>
  );
};

export default ProductDetails;
