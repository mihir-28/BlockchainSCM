import React from "react";
import HomeHero from "../components/Home/HomeHero";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <Features />
      <Testimonials />
    </div>
  );
};

export default HomePage;