import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BlockchainPreloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing blockchain');
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Define blockchain loading phases with more supply chain specific language
    const steps = [
      'Initializing blockchain network',
      'Connecting to supply chain nodes',
      'Synchronizing transaction blocks',
      'Verifying product data integrity',
      'Loading supply chain history',
      'Establishing secure connection'
    ];

    // Set total duration (in ms) - 4 seconds
    const totalDuration = 4000;

    // Calculate time per step
    const timePerStep = totalDuration / steps.length;

    // Create step interval
    const stepInterval = setInterval(() => {
      setStepIndex(currentIndex => {
        const nextIndex = currentIndex + 1;

        // If we've completed all steps
        if (nextIndex >= steps.length) {
          clearInterval(stepInterval);

          // Allow a short pause after the final step before hiding
          setTimeout(() => {
            setLoading(false);
            // Call the onComplete callback to notify parent component
            if (onComplete && typeof onComplete === 'function') {
              onComplete();
            }
          }, 500);

          return currentIndex; // Keep the last step visible during final pause
        }

        // Update the loading text to the next step
        setLoadingText(steps[nextIndex]);
        return nextIndex;
      });
    }, timePerStep);

    // Safety cleanup
    return () => {
      clearInterval(stepInterval);
    };
  }, [onComplete]);

  // If not loading, don't render anything
  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-b from-background to-background/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    >
      {/* Improved animated background pattern with consistent positioning */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced blockchain circuit pattern - more realistic */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              {/* Circuit board tracks */}
              <path d="M75,75 L75,150 L150,150 L150,225 L225,225"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="2"
                strokeLinecap="round" />

              <path d="M75,225 L150,225 L150,75 L225,75 L225,150"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="2"
                strokeLinecap="round" />

              <path d="M225,150 L262.5,150 M75,75 L37.5,75 M225,225 L262.5,225 M75,225 L37.5,225"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="2"
                strokeLinecap="round" />

              {/* Junction points */}
              <circle cx="75" cy="75" r="6" fill="rgba(102, 252, 241, 0.6)" />
              <circle cx="75" cy="150" r="6" fill="rgba(102, 252, 241, 0.6)" />
              <circle cx="75" cy="225" r="6" fill="rgba(102, 252, 241, 0.6)" />
              <circle cx="150" cy="75" r="6" fill="rgba(102, 252, 241, 0.6)" />
              <circle cx="150" cy="150" r="6" fill="rgba(102, 252, 241, 0.6)" />
              <circle cx="150" cy="225" r="6" fill="rgba(102, 252, 241, 0.6)" />
              <circle cx="225" cy="75" r="6" fill="rgba(102, 252, 241, 0.6)" />
              <circle cx="225" cy="150" r="6" fill="rgba(102, 252, 241, 0.6)" />
              <circle cx="225" cy="225" r="6" fill="rgba(102, 252, 241, 0.6)" />

              {/* IC-like components */}
              <rect x="175" y="100" width="30" height="50" rx="2"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1.5" />

              <rect x="90" y="175" width="40" height="30" rx="2"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1.5" />

              {/* Pin connectors */}
              <path d="M180,100 L180,90 M185,100 L185,90 M190,100 L190,90 M195,100 L195,90 M200,100 L200,90"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1.5" />

              <path d="M95,175 L95,165 M105,175 L105,165 M115,175 L115,165 M125,175 L125,165"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1.5" />

              {/* Small traces and vias */}
              <circle cx="150" cy="225" r="3" fill="rgba(102, 252, 241, 0.8)" />
              <circle cx="75" cy="150" r="3" fill="rgba(102, 252, 241, 0.8)" />
              <circle cx="225" cy="75" r="3" fill="rgba(102, 252, 241, 0.8)" />

              {/* Additional corner traces */}
              <path d="M20,20 L50,20 L50,50"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1.5"
                strokeLinecap="round" />

              <path d="M250,20 L280,20 L280,50"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1.5"
                strokeLinecap="round" />

              <path d="M20,280 L50,280 L50,250"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1.5"
                strokeLinecap="round" />

              <path d="M250,280 L280,280 L280,250"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1.5"
                strokeLinecap="round" />

              {/* Small component representations */}
              <circle cx="50" cy="50" r="10"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1" />

              <rect x="240" y="240" width="20" height="20"
                fill="none"
                stroke="rgba(102, 252, 241, 0.4)"
                strokeWidth="1" />
            </pattern>

            {/* Glowing effect for circuit paths */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Apply the pattern to the entire background */}
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />

          {/* Add some animated paths */}
          <g filter="url(#glow)">
            <path d="M100,100 L300,100 L500,300 L700,200"
              fill="none"
              stroke="rgba(102, 252, 241, 0.2)"
              strokeWidth="3">
              <animate
                attributeName="stroke-opacity"
                values="0.1;0.3;0.1"
                dur="4s"
                repeatCount="indefinite" />
            </path>

            <path d="M200,500 L400,300 L600,400 L800,200"
              fill="none"
              stroke="rgba(102, 252, 241, 0.2)"
              strokeWidth="3">
              <animate
                attributeName="stroke-opacity"
                values="0.1;0.3;0.1"
                dur="6s"
                repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </div>

      {/* Logo - enhanced with better visual treatment and smoother transitions */}
      <motion.div
        // initial={{ opacity: 0, scale: 0.95 }}
        // animate={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-12 relative"
      >
        {/* Outer glow ring - no reveal animation */}
        <motion.div
          className="absolute -inset-8 rounded-full"
          initial={{ opacity: 0.2 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5,
            opacity: { duration: 3, ease: "easeInOut" }
          }}
          style={{
            background: 'radial-gradient(circle, rgba(102, 252, 241, 0.3) 0%, rgba(102, 252, 241, 0) 70%)'
          }}
        />

        {/* Inner glow ring - no reveal animation */}
        <motion.div
          className="absolute -inset-4 rounded-full"
          initial={{ opacity: 0.4 }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1.5,
            opacity: { duration: 2.5, ease: "easeInOut" }
          }}
          style={{
            background: 'radial-gradient(circle, rgba(102, 252, 241, 0.2) 0%, rgba(102, 252, 241, 0) 60%)'
          }}
        />

        {/* Logo backdrop - smoother shadow transition */}
        <motion.div
          className="absolute inset-0 rounded-full bg-panel/40 backdrop-blur-md -m-4"
          initial={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
          animate={{ boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Animated border - smoother initial state */}
        <motion.div
          className="absolute inset-0 -m-1 rounded-full"
          initial={{
            border: '1px solid rgba(102, 252, 241, 0.3)',
            boxShadow: '0 0 15px rgba(102, 252, 241, 0.2) inset'
          }}
          animate={{
            boxShadow: [
              '0 0 15px rgba(102, 252, 241, 0.2) inset',
              '0 0 20px rgba(102, 252, 241, 0.1) inset',
              '0 0 15px rgba(102, 252, 241, 0.2) inset'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.7
          }}
          style={{
            border: '1px solid rgba(102, 252, 241, 0.3)'
          }}
        />

        {/* Logo element - fixed brightness transition */}
        <div className="relative z-10 bg-background/10 backdrop-blur-md rounded-full px-14 py-6 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="NexChain"
            className="h-20 md:h-28 relative z-10 opacity-100"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(102, 252, 241, 0.2))'
            }}
          />
        </div>
      </motion.div>

      {/* Blockchain visualization - improved */}
      <div className="relative mb-12 w-80 h-20">
        <div className="flex justify-center">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="w-14 h-14 bg-panel/20 backdrop-blur-md border border-cta/30 mx-0.5 flex items-center justify-center relative rounded-md overflow-hidden"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, -6, 0],
                opacity: 1,
                boxShadow: [
                  '0 0 0px rgba(102, 252, 241, 0)',
                  '0 0 15px rgba(102, 252, 241, 0.4)',
                  '0 0 0px rgba(102, 252, 241, 0)'
                ]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
                opacity: { duration: 0.5, delay: i * 0.1 }
              }}
            >
              {/* Hash code */}
              <motion.div
                className="text-xs text-cta font-mono"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
              >
                {(i * 8 + Math.floor(Math.random() * 10)).toString(16)}
              </motion.div>

              {/* Block number */}
              <motion.div
                className="absolute top-1 left-1 text-[10px] text-cta/70 font-mono"
              >
                #{stepIndex + i}
              </motion.div>

              {/* Animated scanning effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cta/10 to-transparent"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />

              {/* Connection line to next block */}
              {i < 5 && (
                <motion.div
                  className="absolute top-1/2 -right-2 w-3 h-0.5 bg-cta/50"
                  animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress indicator - improved */}
      <div className="w-72 h-1.5 bg-panel/20 rounded-full overflow-hidden mb-5 relative">
        <motion.div
          className="h-full bg-gradient-to-r from-cta/70 to-cta"
          initial={{ width: '0%' }}
          animate={{ width: `${(stepIndex + 1) * (100 / 6)}%` }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-10 bg-white/20"
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: `${100 / 6}%` }}
        />
      </div>

      {/* Step counter */}
      <div className="text-xs text-cta/50 font-mono mb-3">
        STEP {stepIndex + 1}/6
      </div>

      {/* Status text - improved */}
      <motion.div
        className="flex items-center bg-panel/10 backdrop-blur-md px-6 py-2 rounded-md border border-cta/20"
        animate={{ boxShadow: ['0 0 0px rgba(102, 252, 241, 0)', '0 0 10px rgba(102, 252, 241, 0.2)', '0 0 0px rgba(102, 252, 241, 0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-cta mr-3"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.p
          className="text-cta/80 text-sm font-mono"
        >
          {loadingText}<motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >...</motion.span>
        </motion.p>
      </motion.div>

      {/* Additional tech details */}
      <motion.div
        className="absolute bottom-4 font-mono text-[10px] text-cta"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        NexChain v0.7.5 • {Math.floor(Math.random() * 1000)} ms ping • {Math.floor(Math.random() * 100) + 400} blocks synced
      </motion.div>
    </motion.div>
  );
};

export default BlockchainPreloader;