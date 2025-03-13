import React, { useEffect, useRef } from 'react';
import NetworkAnimation from '../Common/NetworkAnimation';
import { motion } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            const elements = containerRef.current.querySelectorAll('.parallax');
            elements.forEach(el => {
                const speed = el.getAttribute('data-speed') || 1;
                const xOffset = x * speed * 20;
                const yOffset = y * speed * 20;
                el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center overflow-hidden" ref={containerRef}>
            {/* Background elements */}
            <NetworkAnimation opacity={0.15} zIndex={0} />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="parallax absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cta/5 blur-3xl" data-speed="2"></div>
                <div className="parallax absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cta/10 blur-3xl" data-speed="1.5"></div>
                <div className="parallax absolute top-20 left-1/4 w-16 h-16 rounded-full border border-cta/30" data-speed="3"></div>
                <div className="parallax absolute bottom-20 right-1/4 w-24 h-24 rounded-full border border-cta/20" data-speed="2.5"></div>

                {/* Tech-inspired grid lines */}
                <div className="absolute inset-0 opacity-20">
                    <div className="h-px bg-cta/30 absolute top-1/4 left-0 right-0"></div>
                    <div className="h-px bg-cta/30 absolute top-2/4 left-0 right-0"></div>
                    <div className="h-px bg-cta/30 absolute top-3/4 left-0 right-0"></div>
                    <div className="w-px bg-cta/30 absolute left-1/4 top-0 bottom-0"></div>
                    <div className="w-px bg-cta/30 absolute left-2/4 top-0 bottom-0"></div>
                    <div className="w-px bg-cta/30 absolute left-3/4 top-0 bottom-0"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-cta mb-6 leading-tight">
                            Redefining Supply Chains
                            <span className="block text-text/90 text-xl md:text-2xl mt-2 font-primary">through blockchain innovation</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                    >
                        <div className="bg-panel/30 backdrop-blur-sm rounded-lg p-6 border border-cta/10 transform hover:scale-105 transition-transform duration-300 hover:border-cta/30">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cta/10 mb-4">
                                    <span className="text-cta text-xl font-bold">01</span>
                                </div>
                                <h3 className="font-display text-cta mb-2">Transparency</h3>
                                <p className="text-text/70 text-sm">Complete visibility across all supply chain activities</p>
                            </div>
                        </div>

                        <div className="bg-panel/30 backdrop-blur-sm rounded-lg p-6 border border-cta/10 transform hover:scale-105 transition-transform duration-300 hover:border-cta/30 md:translate-y-4">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cta/10 mb-4">
                                    <span className="text-cta text-xl font-bold">02</span>
                                </div>
                                <h3 className="font-display text-cta mb-2">Security</h3>
                                <p className="text-text/70 text-sm">Immutable records protected by advanced cryptography</p>
                            </div>
                        </div>

                        <div className="bg-panel/30 backdrop-blur-sm rounded-lg p-6 border border-cta/10 transform hover:scale-105 transition-transform duration-300 hover:border-cta/30">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cta/10 mb-4">
                                    <span className="text-cta text-xl font-bold">03</span>
                                </div>
                                <h3 className="font-display text-cta mb-2">Efficiency</h3>
                                <p className="text-text/70 text-sm">Automated processes reducing costs and delays</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex justify-center mt-12"
                    >
                        <div className="animate-bounce bg-cta/20 p-2 w-10 h-10 ring-1 ring-cta/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-cta" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;