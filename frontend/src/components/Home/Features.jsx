import React from 'react';
import { Link } from 'react-router-dom';
import features from '../../data/features';

const Features = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-background to-panel">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-4">Key Features</h2>
          <p className="text-text/80 max-w-2xl mx-auto">
            Our blockchain-powered supply chain management solution offers everything you need to optimize operations and build trust with partners and customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-panel/50 backdrop-blur-sm rounded-lg p-6 hover:bg-panel/80 transition-all duration-300 hover:transform hover:-translate-y-1 border border-cta/10 hover:border-cta/30"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-cta mb-3 text-center">{feature.title}</h3>
              <p className="text-text/80 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/features"
            className="bg-cta hover:bg-cta/80 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center group"
          >
            Explore All Features
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;