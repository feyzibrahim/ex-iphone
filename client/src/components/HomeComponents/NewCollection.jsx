import React from "react";
import iMac from "../../assets/collection/iMac.png";
import iPhone from "../../assets/collection/iPhone.png";
import iPad from "../../assets/collection/iPad.png";
import iWatch from "../../assets/collection/iWatch.png";
import airPods from "../../assets/collection/airPods.png";
import airTags from "../../assets/collection/airTags.png";
import homePod from "../../assets/collection/homePod.png";
import iAcc from "../../assets/collection/iAcc.png";

const NewCollection = () => {
  const list = [
    { title: "iMac", img: iMac },
    { title: "iPhone", img: iPhone },
    { title: "iPad", img: iPad },
    { title: "iWatch", img: iWatch },
    { title: "airPods", img: airPods },
    { title: "airTags", img: airTags },
    { title: "homePod", img: homePod },
    { title: "iAcc", img: iAcc },
  ];

  return (
    <>
      <h1 className="text-center text-2xl lg:text-5xl text-gray-500 lg:text-gray-400 mt-10 font-extrabold">
        Newest Collection Available
      </h1>
      <div className="grid grid-cols-2 mx-auto lg:flex gap-5 p-10 justify-center">
        {list.map((li) => {
          return (
            <div>
              <img src={li.img} alt={li.title} />
              <p className="text-center mt-3 text-sm font-bold">{li.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NewCollection;
