import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaGlobeAmericas, FaShieldAlt } from 'react-icons/fa';

const Overview = () => {
    return (
        <section className="py-20 bg-panel relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" stroke="currentColor" strokeWidth="0.5" style={{ color: '#66fcf1' }} />
                </svg>
                
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cta/5 blur-3xl rounded-full"></div>
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-cta/5 blur-3xl rounded-full"></div>
            </div>
            
            <div className="container mx-auto px-6 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="inline-block text-3xl md:text-4xl font-display font-bold text-cta mb-6 relative">
                        Project Overview
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cta/0 via-cta to-cta/0"></span>
                    </h2>
                    <p className="text-text/80 max-w-2xl mx-auto">
                        Our innovative blockchain solution addresses the most pressing challenges in modern supply chains
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="aspect-square max-w-lg mx-auto bg-panel/70 rounded-2xl p-1.5">
                            <div className="bg-background/80 w-full h-full rounded-xl overflow-hidden relative">
                                {/* Animated blockchain visualization */}
                                <div className="absolute inset-0 flex flex-wrap gap-3 p-8 opacity-30">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="h-16 w-16 border border-cta/30 rounded flex items-center justify-center">
                                            <div className={`h-2 w-2 rounded-full bg-cta animate-pulse`} style={{ animationDelay: `${i * 100}ms` }}></div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Content overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="bg-panel/70 backdrop-blur-sm p-8 rounded-xl border border-cta/20 max-w-xs">
                                        <h3 className="font-display text-cta text-xl mb-3">NexChain</h3>
                                        <p className="text-text/90 text-sm">
                                            A decentralized application revolutionizing how products move from manufacturers to customers with complete transparency and security.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-5 -left-5 w-24 h-24 border border-cta/30 rounded-full"></div>
                        <div className="absolute -bottom-5 -right-5 w-16 h-16 border border-cta/20 rounded-full"></div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-8">
                            <div className="flex">
                                <div className="mr-4 flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cta/10 text-cta">
                                        <FaGlobeAmericas className="text-xl" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-cta mb-3">Global Challenge</h3>
                                    <p className="text-text">
                                        Today's supply chains span continents, involving countless stakeholders and creating 
                                        complex challenges for tracking, verification, and compliance.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex">
                                <div className="mr-4 flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cta/10 text-cta">
                                        <FaShieldAlt className="text-xl" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-cta mb-3">Our Solution</h3>
                                    <p className="text-text">
                                        NexChain creates an immutable, shared record of every transaction and transfer, 
                                        enabling all participants to access a single source of truth that cannot be altered.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex">
                                <div className="mr-4 flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cta/10 text-cta">
                                        <FaChartLine className="text-xl" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-cta mb-3">The Impact</h3>
                                    <p className="text-text">
                                        Our platform eliminates disputes, builds trust between stakeholders, reduces fraud, 
                                        and creates unprecedented efficiency through automation and real-time tracking.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Overview;