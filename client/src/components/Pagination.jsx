import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";

const Pagination = ({ handleClick, page, number, totalNumber }) => {
  let paginationNum = parseInt(totalNumber / number);

  const renderPaginationNumber = () => {
    const paginationButtons = [];

    for (let i = 1; i <= paginationNum; i++) {
      paginationButtons.push(
        <p
          className={`pagination${page === i ? "-active" : ""}`}
          onClick={() => handleClick("page", i)}
          key={i}
        >
          {i}
        </p>
      );
    }

    return paginationButtons;
  };

  return (
    <div className="flex gap-2 justify-center">
      <p
        className={`pagination-arrows`}
        onClick={() => {
          if (page > 0) {
            handleClick("page", page - 1);
          } else {
            toast.error("Cant go below zero");
          }
        }}
      >
        <BsArrowLeft />
      </p>
      {renderPaginationNumber()}
      <p
        className={`pagination-arrows`}
        onClick={() => {
          if (page < paginationNum) {
            handleClick("page", page + 1);
          } else {
            toast.error("Page End");
          }
        }}
      >
        <BsArrowRight />
      </p>
    </div>
  );
};

export default Pagination;
