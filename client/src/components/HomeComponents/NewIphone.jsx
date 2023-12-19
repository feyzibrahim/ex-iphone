import React, { useEffect, useRef, useState } from "react";
import ProductCards from "../ProductCards";
import { commonRequest } from "../../Common/api";
import { appJson } from "../../Common/configurations";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const NewIphone = () => {
  const [list, setList] = useState([]);

  // For moving to left and right
  const scrollContainerRef = useRef(null);
  let [isLeft, setIsLeft] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 1125;
      setIsLeft(!isLeft);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 1125;
      setIsLeft(!isLeft);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const res = await commonRequest(
        "GET",
        "/public/new-iphone",
        null,
        appJson
      );
      if (res.iphone) {
        setList(res.iphone);
      }
    };
    loadData();
  }, []);

  return (
    <div className="pt-20 lg:py-20 relative">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mb-5 text-gray-800">
        Newest ex.iphones. Collection
      </h1>
      <button
        className="bg-white rounded-full w-10 h-10 text-xl flex items-center justify-center absolute top-1/2 left-0 transform -translate-y-1/2  text-gray-500 hover:text-gray-700"
        onClick={scrollLeft}
      >
        <AiOutlineLeft />
      </button>
      <div
        className="flex justify-center items-center gap-20 px-5 scrollbar-hide overflow-x-scroll py-10 w-full"
        ref={scrollContainerRef}
      >
        {list &&
          list.map((data, index) => <ProductCards key={index} data={data} />)}
      </div>
      <button
        className="bg-white rounded-full w-10 h-10 text-xl flex items-center justify-center absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={scrollRight}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default NewIphone;
