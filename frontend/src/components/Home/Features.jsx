import React from 'react';
import { FaRoute, FaClipboardCheck, FaChartBar, FaShieldAlt, FaExchangeAlt, FaUserShield } from 'react-icons/fa';

const Features = () => {
    const features = [
        {
            icon: <FaRoute className="text-4xl text-cta" />,
            title: "Product Tracking",
            description: "Track products in real-time throughout the entire supply chain with immutable blockchain records."
        },
        {
            icon: <FaClipboardCheck className="text-4xl text-cta" />,
            title: "Transaction Logging",
            description: "Secure, transparent logging of all transactions and handoffs between supply chain partners."
        },
        {
            icon: <FaChartBar className="text-4xl text-cta" />,
            title: "Real-Time Analytics",
            description: "Comprehensive analytics dashboard providing insights into supply chain performance."
        },
        {
            icon: <FaShieldAlt className="text-4xl text-cta" />,
            title: "Enhanced Security",
            description: "Military-grade encryption and decentralized storage protecting your supply chain data."
        },
        {
            icon: <FaExchangeAlt className="text-4xl text-cta" />,
            title: "Smart Contracts",
            description: "Automated execution of agreements when predefined conditions are met, reducing delays."
        },
        {
            icon: <FaUserShield className="text-4xl text-cta" />,
            title: "Access Control",
            description: "Granular permissions ensuring partners only access the information they need."
        },
    ];

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
                    <button className="bg-cta hover:bg-cta/80 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300">
                        Explore All Features
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Features;