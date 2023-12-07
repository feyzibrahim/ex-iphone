import React, { useEffect, useState } from "react";
import { BiBadgeCheck, BiCheckShield, BiPhoneCall } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import axios from "axios";
import { URL } from "../../../Common/api";
import ReviewRow from "./ReviewRow";
import { renderStars } from "../../../Common/functions";

const DescReview = ({ product, id }) => {
  // Toggle between description and Reviews
  const [descriptionOrReview, setDescriptionOrReview] = useState(true);
  const toggleDescReview = () => {
    setDescriptionOrReview(!descriptionOrReview);
  };

  // Loading data
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [ratingCount, setRatingCount] = useState([]);

  const loadReviews = async () => {
    try {
      const { data } = await axios.get(`${URL}/user/reviews/${id}`, {
        withCredentials: true,
      });
      setReviews(data.reviews);
      const ratingCounts = Array(5).fill(0);

      data.reviews.forEach((review) => {
        const rating = review.rating;
        ratingCounts[rating - 1]++;
      });

      setRatingCount(ratingCounts);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div className="bg-white mt-5">
      <div className="flex justify-center gap-8 border-b">
        <button
          className={`uppercase text-xs py-3 ${
            descriptionOrReview
              ? "border-b-2 border-blue-500 font-semibold"
              : ""
          }`}
          onClick={toggleDescReview}
        >
          Description
        </button>
        <button
          className={`uppercase text-xs py-3 ${
            !descriptionOrReview
              ? "border-b-2 border-blue-500 font-semibold"
              : ""
          }`}
          onClick={toggleDescReview}
        >
          Review
        </button>
      </div>
      {descriptionOrReview ? (
        <div className="p-5 lg:flex gap-5">
          <div className="w-full">
            <h1 className="font-semibold my-2">Description</h1>
            <p className="text-xs font-semibold text-gray-500">
              {product.description}
            </p>
          </div>
          <div className="shrink-0">
            <ul>
              <li className="font-semibold my-2">Feature</li>
              <li className="description-ul">
                <span className="text-blue-700 text-xl">
                  <BiBadgeCheck />
                </span>
                Free 1 Month Warranty
              </li>
              <li className="description-ul">
                <span className="text-blue-700 text-xl">
                  <FaShippingFast />
                </span>
                Free Shipping & Faster Delivery
              </li>
              <li className="description-ul">
                <span className="text-blue-700 text-xl">
                  <BiCheckShield />
                </span>
                100% Money-back guarantee
              </li>
              <li className="description-ul">
                <span className="text-blue-700 text-xl">
                  <BiPhoneCall />
                </span>
                24/7 Customer Support
              </li>
              <li className="description-ul">
                <span className="text-blue-700 text-xl">
                  <RiSecurePaymentLine />
                </span>
                Secure payment method
              </li>
            </ul>
          </div>
          <div className="text-gray-500 shrink-0">
            <ul>
              <li className="font-semibold text-black my-2">
                Shipping information
              </li>
              <li>
                <span className="text-black py-1">Courier:</span> 2 - 4 days,
                free shipping
              </li>
              <li>
                <span className="text-black py-1">Local Shipping: </span>
                up to one week, 200₹
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-5">
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="bg-blue-50 py-10 px-20 flex flex-col items-center gap-3 rounded">
                  <h1 className="text-5xl font-semibold">
                    {Number.isInteger(product.rating)
                      ? `${product.rating}.0`
                      : product.rating.toFixed(1)}
                  </h1>
                  <div className="flex text-xl">
                    {renderStars(product.rating)}
                  </div>
                  <p className="font-semibold">
                    Customer Rating{" "}
                    <span className="text-gray-500">
                      ({product.numberOfReviews})
                    </span>
                  </p>
                </div>
                {/* 1 - 5 rating graph chart */}
                <div className="flex flex-col-reverse gap-3 justify-center">
                  {ratingCount &&
                    ratingCount.map((item, index) => {
                      const width = parseInt(
                        (item / product.numberOfReviews) * 100
                      );
                      return (
                        <div className="flex items-center gap-5" key={index}>
                          <div className="flex">{renderStars(index + 1)}</div>
                          <div className="h-1 bg-gray-200 rounded-full w-96">
                            <div
                              className={`h-1 bg-yellow-400 rounded-full`}
                              style={{ width: `${width}%` }}
                            ></div>
                          </div>
                          <div className="flex gap-2 text-xs font-semibold">
                            <p>{width}%</p>
                            <p className="text-gray-500">({item})</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="pt-5">
                <h1 className="font-bold text-lg">Customer Feedback</h1>
                <div>
                  {reviews &&
                    reviews.map((review) => (
                      <ReviewRow review={review} key={review._id} />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DescReview;
