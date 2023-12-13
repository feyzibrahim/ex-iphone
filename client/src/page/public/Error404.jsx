import React from "react";
import FourNotFour from "../../assets/404.png";

const Error404 = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <p className="mt-20 font-semibold text-xl">Error 404 | Page Not Found</p>
      <img src={FourNotFour} alt="404" className="w-3/6" />
    </div>
  );
};

export default Error404;
