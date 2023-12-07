import React, { useState } from "react";
import { renderStars, timeAgo } from "@common/functions";
import { URL } from "@common/api";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../../../components/Modal";
import ProductEditReview from "./ProductEditReview";
const ReviewRow = ({ review, product }) => {
  const [editReviewModal, setEditReviewModal] = useState(false);
  const toggleModal = () => {
    setEditReviewModal(!editReviewModal);
  };

  return (
    <>
      {editReviewModal && (
        <Modal
          tab={
            <ProductEditReview
              closeToggle={toggleModal}
              review={review}
              product={product}
            />
          }
        />
      )}
      <div className="py-2">
        {/* Review Header */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {review.user.profileImgURL ? (
              <img
                src={`${URL}/img/${review.user.profileImgURL}`}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200"></div>
            )}
          </div>
          <div>
            <h1>
              {review.user.firstName} {review.user.lastName} •{" "}
              <span className="text-gray-500 capitalize">
                {timeAgo(review.createdAt)}
              </span>
            </h1>
            <div className="flex gap-1">{renderStars(review.rating)}</div>
          </div>
          <div
            onClick={toggleModal}
            className="text-xl text-gray-500 hover:text-gray-700 active:text-black cursor-pointer"
          >
            <AiOutlineEdit />
          </div>
        </div>
        {/* Review Body */}
        <div className="py-2">
          {product && product.productId && (
            <div className="border p-2 rounded-lg flex items-center gap-2">
              <div className="w-10 h-10 shrink-0">
                <img
                  src={`${URL}/img/${product.productId.imageURL}`}
                  alt="Product"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="line-clamp-1">{product.productId.name}</p>
            </div>
          )}
          <h1 className="font-semibold">{review.title}</h1>
          <p className="text-gray-500">{review.body}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewRow;
