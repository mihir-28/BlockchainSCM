import React from "react";
import HomeHero from "../components/Home/HomeHero";
import Features from "../components/Home/Features";
import DevStatus from "../components/Home/DevStatus";
import Testimonials from "../components/Home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <Features />
      <DevStatus />
      <Testimonials />
    </div>
  );
};

export default HomePage;