import React from "react";
import { renderStars, timeAgo } from "../../../Common/functions";
import { URL } from "../../../Common/links";

const ReviewRow = ({ review }) => {
  return (
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
      </div>
      {/* Review Body */}
      <div className="py-2">
        <h1 className="font-semibold">{review.title}</h1>
        <p className="text-gray-500">{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewRow;
