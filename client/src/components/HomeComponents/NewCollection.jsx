import React, { useEffect, useState } from "react";
import { URL, commonRequest } from "../../Common/api";
import { appJson } from "../../Common/configurations";

const NewCollection = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await commonRequest(
        "GET",
        "/public/collections",
        null,
        appJson
      );
      if (res.categories) {
        setList(res.categories);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl lg:text-5xl text-gray-500 lg:text-gray-400 mt-10 font-extrabold">
        Newest Collection Available
      </h1>
      <div className="grid grid-cols-2 mx-auto lg:flex gap-5 p-10 justify-center">
        {list.map((li, index) => {
          return (
            <div key={index} className="">
              <div className="w-full h-32">
                <img
                  src={`${URL}/img/${li.imgURL}`}
                  alt={li.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-center mt-3 text-sm font-bold">{li.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NewCollection;
