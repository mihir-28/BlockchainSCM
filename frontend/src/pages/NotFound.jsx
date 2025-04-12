import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import NetworkAnimation from '../components/Common/NetworkAnimation';

const NotFound = () => {
  // Get the current location to display the actual path that caused the 404
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <NetworkAnimation opacity={0.15} zIndex={0} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -top-48 -left-48"></div>
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -bottom-48 -right-48"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-panel/30 backdrop-blur-sm rounded-xl border border-cta/20 p-8 md:p-12 shadow-lg max-w-2xl w-full text-center"
          >
            {/* Error icon */}
            <div className="mb-6 relative">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 text-red-500 text-4xl">
                <FaExclamationTriangle />
              </div>

              {/* Digital error code decoration */}
              <div className="absolute top-0 left-0 right-0 text-cta/30 text-xs font-mono overflow-hidden h-full w-full flex justify-center items-center">
                <div className="absolute">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="leading-none" style={{ opacity: 1 - (i * 0.1) }}>404</div>
                  ))}
                </div>
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl font-display font-bold text-cta mb-4"
            >
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text/80 mb-8 max-w-lg mx-auto"
            >
              The page you're looking for doesn't exist or has been moved. Check the URL or navigate back to safety.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/"
                className="bg-cta hover:bg-cta/90 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center"
              >
                <FaHome className="mr-2" /> Return Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="bg-transparent border-2 border-cta text-cta hover:bg-cta/10 font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Go Back
              </button>
            </motion.div>

            {/* Error code display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 border-t border-cta/10 pt-6 text-text/50 text-sm"
            >
              <p>Error Code: <span className="font-mono text-cta">404</span></p>
            </motion.div>
          </motion.div>

          {/* Terminal error animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 flex justify-center"
          >
            <div className="w-full max-w-md bg-gray-900/80 border border-cta/30 rounded-md overflow-hidden font-mono text-sm">
              <div className="bg-gray-800/80 px-4 py-1 flex items-center">
                <div className="flex mr-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-cta/70 text-xs">terminal</div>
              </div>
              <div className="p-4 text-left">
                <div className="flex">
                  <span className="text-cta/60">$</span>
                  <motion.span
                    className="text-text/80 ml-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    find {currentPath}
                  </motion.span>
                </div>

                <motion.div
                  className="text-red-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  Error 404: Page not found on the blockchain network
                </motion.div>

                <div className="flex mt-2">
                  <span className="text-cta/60">$</span>
                  <motion.span
                    className="text-text/80 ml-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.5 }}
                  >
                    return to homepage
                  </motion.span>
                  <motion.span
                    className="inline-block w-2 h-4 bg-cta ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  ></motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;