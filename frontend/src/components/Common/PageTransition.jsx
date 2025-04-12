import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FaCubes } from 'react-icons/fa';

const PageTransition = ({ children, transitionsDisabled = false }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const [showChildren, setShowChildren] = useState(true);
  const [renderedChildren, setRenderedChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousTransitionsDisabledRef = useRef(transitionsDisabled);

  // Format the pathname to be more readable
  const formatPathname = (pathname) => {
    if (pathname === '/') return 'Home';
    return pathname.substring(1).split('/').map(segment => 
      segment.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    ).join(' / ');
  };

  useEffect(() => {
    // Check if we're coming from a disabled route to an enabled route
    const comingFromDisabledRoute = previousTransitionsDisabledRef.current && !transitionsDisabled;
    previousTransitionsDisabledRef.current = transitionsDisabled;
    
    if (transitionsDisabled) {
      // If transitions are disabled, just update content without animations
      setDisplayLocation(location);
      setRenderedChildren(children);
      setShowChildren(true);
      setTransitionStage("fadeIn");
      setIsTransitioning(false);
      return;
    }
    
    // Regular transition logic for enabled routes
    if ((location.pathname !== displayLocation.pathname || comingFromDisabledRoute) && !isTransitioning) {
      setIsTransitioning(true);
      // Hide current content immediately
      setShowChildren(false);
      // Start the transition after ensuring content is hidden
      setTimeout(() => {
        setTransitionStage("fadeOut");
      }, 50);
    }
  }, [location, displayLocation, isTransitioning, children, transitionsDisabled]);

  const handleTransitionComplete = () => {
    // Update the location reference
    setDisplayLocation(location);
    
    // Update the rendered children to the new route's content
    setRenderedChildren(children);
    
    // Change state to start fading in
    setTransitionStage("fadeIn");
    
    // Show the new content after a small delay to ensure proper sequencing
    setTimeout(() => {
      setShowChildren(true);
      // Reset transition state after a delay to ensure animations complete
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 200);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {transitionStage === "fadeOut" && !transitionsDisabled && (
          <motion.div
            className="fixed inset-0 bg-background z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onAnimationComplete={handleTransitionComplete}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{ scale: [0.9, 1.1, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="text-cta text-4xl mb-4">
                <FaCubes />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 1 }}
                className="text-text/70 font-display mb-4 text-sm"
              >
                Navigating to {formatPathname(location.pathname)}
              </motion.div>
              
              <div className="h-1 w-48 bg-panel/30 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cta"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div
        className={`transition-opacity duration-300 ${
          showChildren ? "opacity-100" : "opacity-0 invisible"
        }`}
        style={{ pointerEvents: showChildren ? 'auto' : 'none' }}
      >
        {renderedChildren}
      </div>
    </div>
  );
};

export default PageTransition;