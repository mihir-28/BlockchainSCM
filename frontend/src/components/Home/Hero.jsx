import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import NetworkAnimation from '../Common/NetworkAnimation';

const Hero = () => {
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("MetaMask is required to connect a wallet");
                return;
            }

            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative bg-background overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-panel opacity-90"></div>

            {/* Canvas-based blockchain network visualization */}
            <NetworkAnimation opacity={0.2} zIndex={0} />

            {/* Additional glowing orbs for visual interest */}
            <div className="absolute inset-0 opacity-10 z-0">
                <div className="absolute h-32 w-32 rounded-full bg-cta blur-3xl top-1/4 left-1/4 animate-pulse"></div>
                <div className="absolute h-48 w-48 rounded-full bg-cta blur-3xl bottom-1/3 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute h-24 w-24 rounded-full bg-cta blur-3xl top-2/3 left-1/3 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center min-h-[90vh] py-20">
                    <div className="text-center max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cta mb-6 leading-tight">
                            Revolutionize Your Supply Chain with Blockchain
                        </h1>

                        <p className="text-lg md:text-xl text-text/90 mb-10 max-w-3xl mx-auto">
                            Enhance transparency, traceability, and security across your entire supply chain network with our cutting-edge blockchain solution. Real-time monitoring and immutable records for complete peace of mind.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={connectWallet}
                                className="bg-cta hover:bg-cta/80 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center"
                            >
                                Connect Wallet
                            </button>

                            <Link to="/features" className="bg-transparent border-2 border-cta text-cta hover:bg-cta/10 font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center">
                                Learn More <FaArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>

                    {/* Stats banner */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                        <div className="bg-panel/50 backdrop-blur-sm rounded-lg p-6 text-center">
                            <p className="text-cta font-display text-3xl font-bold">100%</p>
                            <p className="text-text text-sm mt-2">End-to-End Visibility</p>
                        </div>
                        <div className="bg-panel/50 backdrop-blur-sm rounded-lg p-6 text-center">
                            <p className="text-cta font-display text-3xl font-bold">30%</p>
                            <p className="text-text text-sm mt-2">Reduced Processing Time</p>
                        </div>
                        <div className="bg-panel/50 backdrop-blur-sm rounded-lg p-6 text-center">
                            <p className="text-cta font-display text-3xl font-bold">0%</p>
                            <p className="text-text text-sm mt-2">Data Tampering</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;