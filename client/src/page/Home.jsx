import React from "react";
import BgImage from "../assets/iphone.png";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden">
      <h1>Discover Most Affordable Apple Products</h1>
      <p>
        Find the best, reliable and affordable apple products here. We focus on
        the product quality. Here you can find all the products apple ever made.
        Even the products apple officially stopped selling. So why you are
        waiting? Just order now!
      </p>
      <img src={BgImage} alt="Bg Image" />
    </div>
  );
};

export default Home;
