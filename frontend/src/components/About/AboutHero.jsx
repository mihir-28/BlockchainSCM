import React, { useEffect, useRef, useState } from 'react';
import NetworkAnimation from '../Common/NetworkAnimation';
import { motion } from 'framer-motion';

const AboutHero = () => {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            setMousePosition({ x, y });

            const elements = containerRef.current.querySelectorAll('.parallax');
            elements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 1;
                const xOffset = x * speed * 30;
                const yOffset = y * speed * 30;
                const rotation = parseFloat(el.getAttribute('data-rotation') || 0);

                el.style.transform = rotation
                    ? `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${x * rotation}deg)`
                    : `translate3d(${xOffset}px, ${yOffset}px, 0)`;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center overflow-hidden" ref={containerRef}>
            {/* Background elements */}
            <NetworkAnimation opacity={0.15} zIndex={0} />

            {/* Enhanced decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Larger gradient orbs */}
                <div className="parallax absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-cta/10 to-cta/0 blur-3xl" data-speed="2"></div>
                <div className="parallax absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-gradient-to-bl from-cta/15 to-cta/0 blur-3xl" data-speed="1.5"></div>
                <div className="parallax absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cta/8 to-cta/0 blur-3xl" data-speed="1.8"></div>

                {/* Blockchain-themed elements */}
                {/* Block 1 - Chain link */}
                <div className="parallax absolute top-32 right-[15%] flex" data-speed="2.5" data-rotation="5">
                    <div className="w-12 h-6 border-2 border-cta/30 rounded-full backdrop-blur-sm bg-cta/5"></div>
                    <div className="w-12 h-6 -ml-2 border-2 border-cta/30 rounded-full backdrop-blur-sm bg-cta/5"></div>
                </div>

                {/* Block 2 - Cube */}
                <div className="parallax absolute bottom-32 left-[25%]" data-speed="3" data-rotation="8">
                    <div className="w-16 h-16 relative">
                        <div className="absolute inset-0 border-2 border-cta/20 rotate-45 backdrop-blur-sm bg-cta/5"></div>
                        <div className="absolute inset-0 border-2 border-cta/30 rotate-[30deg] backdrop-blur-sm bg-cta/5"></div>
                    </div>
                </div>

                {/* Block 3 - Hexagon */}
                <div className="parallax absolute top-[35%] left-[15%]" data-speed="2.2" data-rotation="6">
                    <div className="w-14 h-16 bg-cta/5 border border-cta/20 backdrop-blur-sm"
                        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        <div className="w-full h-full flex items-center justify-center opacity-70">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" className="text-cta" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" className="text-cta" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" className="text-cta" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Block 4 - Hash visualization */}
                <div className="parallax absolute bottom-[20%] right-[20%]" data-speed="2.8">
                    <div className="w-32 h-8 px-2 border border-cta/20 rounded-md backdrop-blur-sm bg-cta/5 flex items-center">
                        <div className="text-xs font-mono text-cta/60 truncate">0xf731...</div>
                    </div>
                </div>

                {/* Floating circles with different borders and sizes */}
                <div className="parallax absolute top-20 left-1/4 w-16 h-16 rounded-full border border-cta/30 bg-cta/5 backdrop-blur-sm" data-speed="3"></div>
                <div className="parallax absolute bottom-20 right-1/4 w-24 h-24 rounded-full border border-cta/20 bg-gradient-to-br from-cta/5 to-transparent" data-speed="2.5"></div>
                <div className="parallax absolute top-[40%] right-[30%] w-10 h-10 rounded-full border-2 border-dashed border-cta/40 rotate-45" data-speed="3.2"></div>

                {/* Connected nodes visualization */}
                <div className="parallax absolute top-[60%] left-[35%]" data-speed="1.8">
                    <div className="relative w-40 h-20">
                        <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-cta/10 border border-cta/20"></div>
                        <div className="absolute top-2 left-16 w-4 h-4 rounded-full bg-cta/15 border border-cta/30"></div>
                        <div className="absolute bottom-0 left-8 w-5 h-5 rounded-full bg-cta/10 border border-cta/20"></div>
                        <div className="absolute bottom-3 right-0 w-6 h-6 rounded-full bg-cta/10 border border-cta/30"></div>

                        {/* Connection lines */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 3 L38 14" stroke="currentColor" className="text-cta/40" strokeWidth="0.5" />
                            <path d="M6 3 L28 68" stroke="currentColor" className="text-cta/40" strokeWidth="0.5" />
                            <path d="M38 14 L28 68" stroke="currentColor" className="text-cta/40" strokeWidth="0.5" />
                            <path d="M38 14 L140 65" stroke="currentColor" className="text-cta/40" strokeWidth="0.5" />
                            <path d="M28 68 L140 65" stroke="currentColor" className="text-cta/40" strokeWidth="0.5" />
                        </svg>
                    </div>
                </div>

                {/* Animated blockchain lines - now using gradient for better effect */}
                <div className="absolute inset-0 opacity-20">
                    <div className="parallax h-px bg-gradient-to-r from-transparent via-cta/60 to-transparent absolute top-1/4 left-0 right-0" data-speed="0.5"></div>
                    <div className="parallax h-px bg-gradient-to-r from-transparent via-cta/50 to-transparent absolute top-2/4 left-0 right-0" data-speed="0.7"></div>
                    <div className="parallax h-px bg-gradient-to-r from-transparent via-cta/60 to-transparent absolute top-3/4 left-0 right-0" data-speed="0.6"></div>

                    <div className="parallax w-px bg-gradient-to-b from-transparent via-cta/60 to-transparent absolute left-1/4 top-0 bottom-0" data-speed="0.8"></div>
                    <div className="parallax w-px bg-gradient-to-b from-transparent via-cta/50 to-transparent absolute left-2/4 top-0 bottom-0" data-speed="0.6"></div>
                    <div className="parallax w-px bg-gradient-to-b from-transparent via-cta/60 to-transparent absolute left-3/4 top-0 bottom-0" data-speed="0.9"></div>
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
                        <div className="bg-panel/30 backdrop-blur-sm rounded-lg p-6 border border-cta/10 transform hover:scale-105 transition-transform duration-300 hover:border-cta/30 hover:shadow-lg hover:shadow-cta/5">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cta/10 mb-4">
                                    <span className="text-cta text-xl font-bold">01</span>
                                </div>
                                <h3 className="font-display text-cta mb-2">Transparency</h3>
                                <p className="text-text/70 text-sm">Complete visibility across all supply chain activities</p>
                            </div>
                        </div>

                        <div className="bg-panel/30 backdrop-blur-sm rounded-lg p-6 border border-cta/10 transform hover:scale-105 transition-transform duration-300 hover:border-cta/30 md:translate-y-4 hover:shadow-lg hover:shadow-cta/5">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cta/10 mb-4">
                                    <span className="text-cta text-xl font-bold">02</span>
                                </div>
                                <h3 className="font-display text-cta mb-2">Security</h3>
                                <p className="text-text/70 text-sm">Immutable records protected by advanced cryptography</p>
                            </div>
                        </div>

                        <div className="bg-panel/30 backdrop-blur-sm rounded-lg p-6 border border-cta/10 transform hover:scale-105 transition-transform duration-300 hover:border-cta/30 hover:shadow-lg hover:shadow-cta/5">
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

export default AboutHero;