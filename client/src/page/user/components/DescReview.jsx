import React, { useEffect, useState } from "react";
import { BiBadgeCheck, BiCheckShield, BiPhoneCall } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { URL } from "../../../Common/links";
import { timeAgo } from "../../../Common/functions";

const DescReview = ({ product, id }) => {
  // Toggle between description and Reviews
  const [descriptionOrReview, setDescriptionOrReview] = useState(true);
  const toggleDescReview = () => {
    setDescriptionOrReview(!descriptionOrReview);
  };

  // Rendering stars based on the review
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 1; i <= filledStars; i++) {
      stars.push(<AiFillStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<AiOutlineStar key="half" className="text-yellow-400" />);
    }

    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(
        <AiOutlineStar key={`empty-${i}`} className="text-yellow-400" />
      );
    }

    return stars;
  };

  // Loading data

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [ratingCount, setRatingCount] = useState([]);

  const loadReviews = async () => {
    try {
      const { data } = await axios.get(`${URL}/user/reviews/${id}`);
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
              {" "}
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
                  <h1 className="text-5xl font-semibold">{product.rating}</h1>
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
                              className={`h-1 bg-yellow-400 rounded-full w-[${width}%]`}
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
                      <div key={review._id} className="py-2">
                        {/* Review Header */}
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={`${URL}/img/${review.user.profileImgURL}`}
                              alt="User Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h1>
                              {review.user.firstName} {review.user.lastName} •{" "}
                              <span className="text-gray-500 capitalize">
                                {timeAgo(review.createdAt)}
                              </span>
                            </h1>
                            <div className="flex gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        {/* Review Body */}
                        <div className="py-2">
                          <h1 className="font-semibold">{review.title}</h1>
                          <p className="text-gray-500">{review.body}</p>
                        </div>
                      </div>
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
