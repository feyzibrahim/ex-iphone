import React from "react";
import BgImage from "../../assets/iphone.png";
import NewsLetter from "../../assets/newletter.png";

import { BiSearch } from "react-icons/bi";
import NewCollection from "../../components/HomeComponents/NewCollection";
import fourIphones from "../../assets/fourIphone.png";
import NewIphone from "../../components/HomeComponents/NewIphone";
import { useSelector } from "react-redux";
import ImageSlider from "../../components/HomeComponents/ImageSlider";
import JustLoading from "../../components/JustLoading";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const gotoLogin = () => {
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <JustLoading size={20} />
      </div>
    );
  }

  return (
    <div className="">
      {/* Landing Session */}
      <div className="lg:h-screen bg-color lg:flex lg:items-center overflow-clip">
        <div className="lg:w-1/2 flex-shrink-0 text-white pt-32 px-10 lg:pl-48 ">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Discover Most Affordable Apple Products
          </h1>
          <p className="font-semibold text-gray-500 text-sm lg:text-lg mb-10 lg:mb-3">
            Find the best, reliable and affordable apple products here. We focus
            on the product quality. Here you can find all the products apple
            ever made. Even the products apple officially stopped selling. So
            why you are waiting? Just order now!
          </p>
          <div className="flex justify-between rounded-2xl py-2 pl-2 lg:pl-5 pr-2 bg-white font-semibold">
            <div className="flex items-center lg:gap-3">
              <BiSearch className="text-2xl text-blue-600" />
              <input
                type="text"
                placeholder="Find the best product"
                className="text-black outline-none w-full"
              />
            </div>
            <button className="btn-blue" onClick={gotoLogin}>
              Search
            </button>
          </div>
        </div>
        {/* BG iPhone Image */}
        <img
          src={BgImage}
          className="lg:w-[1200px] lg:-ml-32 lg:mt-16"
          alt="Bg Image"
        />
      </div>
      {/* ---------- New Collections  ---------*/}
      <NewCollection />

      {/* Four Iphones */}
      <div className="bg-black text-white text-center">
        <h1 className="text-5xl font-bold pt-32">ex.iphones.</h1>
        <p className="text-sm lg:text-xl mt-8 font-bold">
          From ₹25,000 to ₹100,000 Every Model Ever Built
        </p>

        <div className="flex justify-center mt-5 mb-12 items-center gap-5">
          <button className="btn-blue">Buy</button>
          <p className="text-xl font-bold text-blue-500">Learn more</p>
        </div>
        <img src={fourIphones} alt="Four Iphones" className="mx-auto" />
      </div>

      {/* New iPhones Listing */}
      <NewIphone />

      {/* Image Slideshow */}

      <ImageSlider />

      {/* Apple Watch Listing */}
      {/* <AppleWatchCollection /> */}

      {/* Newsletter */}
      <div className="bg-gray-200 py-20">
        <div className="lg:flex lg:items-center mx-10 lg:mx-20 bg-white px-5 lg:px-24 py-10 rounded-3xl shadow-lg">
          <div className="lg:w-1/2">
            <h1 className="text-xl lg:text-3xl font-bold my-2">
              Subscribe To Newsletter
            </h1>
            <p className="text-sm font-bold my-2 text-gray-500">
              Get weekly updates about the latest products in ex.iphone.
            </p>
            <div className="flex justify-between rounded-2xl py-2 pl-2 lg:pl-5 pr-2 bg-gray-200 font-semibold">
              <div className="flex items-center gap-1 lg:gap-3">
                <BiSearch className="text-2xl text-blue-600" />
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="text-black bg-gray-200 outline-none w-2/3"
                />
              </div>
              <button className="btn-blue-no-pad  px-3 lg:px-12 py-2">
                Search
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src={NewsLetter} alt="Newsletter Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
