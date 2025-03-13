import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaExchangeAlt, FaQrcode, FaUsers, FaFileContract } from 'react-icons/fa';

const Working = () => {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        {
            id: 1,
            icon: <FaBox />,
            title: "Product Registration",
            description: "Each product gets a unique digital identity stored on the blockchain when it enters the supply chain."
        },
        {
            id: 2,
            icon: <FaExchangeAlt />,
            title: "Transfer Recording",
            description: "Every handoff between supply chain partners is recorded as a transaction on the blockchain."
        },
        {
            id: 3,
            icon: <FaQrcode />,
            title: "QR Code Integration",
            description: "Physical products link to their digital records via QR codes for easy verification."
        },
        {
            id: 4,
            icon: <FaUsers />,
            title: "Stakeholder Access",
            description: "Authorized stakeholders can view real-time product location and history."
        },
        {
            id: 5,
            icon: <FaFileContract />,
            title: "Smart Contracts",
            description: "Automated execution of agreements when predefined conditions are met."
        }
    ];

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Animated background lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute h-full w-full">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute left-0 right-0 h-px bg-gradient-to-r from-cta/0 via-cta/10 to-cta/0"
                            style={{ top: `${i * 10 + 5}%` }}
                        ></div>
                    ))}
                </div>
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
                        How It Works
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cta/0 via-cta to-cta/0"></span>
                    </h2>
                    <p className="text-text/80 max-w-2xl mx-auto">
                        Our blockchain solution creates a seamless, secure tracking system from manufacturer to customer
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                        <div className="bg-panel/30 backdrop-blur rounded-lg border border-cta/10 p-6">
                            <div className="space-y-2">
                                {steps.map((step) => (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0.7 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        className={`cursor-pointer p-4 rounded-lg transition-all duration-300 ${activeStep === step.id ? 'bg-cta/20 border border-cta/30' : 'hover:bg-panel/50'}`}
                                        onClick={() => setActiveStep(step.id)}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep === step.id ? 'bg-cta text-background' : 'bg-panel/70 text-cta'}`}>
                                                {step.icon}
                                            </div>
                                            <div className="ml-4">
                                                <h4 className={`font-display font-bold ${activeStep === step.id ? 'text-cta' : 'text-text'}`}>
                                                    {step.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="relative h-full">
                            {steps.map((step) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: activeStep === step.id ? 1 : 0,
                                        scale: activeStep === step.id ? 1 : 0.9,
                                        display: activeStep === step.id ? 'block' : 'none'
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-panel/50 backdrop-blur-md rounded-xl overflow-hidden border border-cta/20 h-full"
                                >
                                    <div className="p-8 h-full flex flex-col">
                                        <div className="flex items-center mb-6">
                                            <div className="w-16 h-16 rounded-full bg-cta/20 flex items-center justify-center text-cta text-2xl">
                                                {step.icon}
                                            </div>
                                            <h3 className="ml-4 text-2xl font-display font-bold text-cta">{step.title}</h3>
                                        </div>

                                        <div className="mb-8 text-lg text-text">
                                            {step.description}
                                        </div>

                                        <div className="flex-1 relative">
                                            {/* Visual representation that changes based on the active step */}
                                            <div className="absolute inset-0 bg-panel/30 rounded-lg overflow-hidden border border-cta/10">
                                                <div className="h-full w-full relative">
                                                    {/* Step 1: Product Registration */}
                                                    {step.id === 1 && (
                                                        <div className="p-4 h-full flex flex-col items-center justify-center">
                                                            <div className="relative">
                                                                <div className="w-32 h-32 border-4 border-dashed border-cta/30 flex items-center justify-center rounded-lg">
                                                                    <div className="w-16 h-16 bg-cta/20 rounded flex items-center justify-center animate-pulse">
                                                                        <FaBox className="text-2xl text-cta" />
                                                                    </div>
                                                                </div>
                                                                <div className="absolute -bottom-4 -right-4 w-24 h-8 bg-panel border border-cta/20 rounded text-xs flex items-center justify-center text-cta">
                                                                    ID: 0x8f4a...3b2c
                                                                </div>
                                                            </div>

                                                            <div className="mt-8 text-center">
                                                                <div className="text-cta font-mono text-sm">
                                                                    {`{ "productId": "0x8f4a3b2c", "timestamp": ${Date.now()} }`}
                                                                </div>
                                                                <div className="mt-2 text-xs text-text/70">
                                                                    Registering product on blockchain...
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Step 2: Transfer Recording */}
                                                    {step.id === 2 && (
                                                        <div className="p-4 h-full flex flex-col items-center justify-center">
                                                            <div className="flex items-center">
                                                                <div className="w-20 h-20 bg-panel/90 border border-cta/20 rounded flex items-center justify-center">
                                                                    <div className="text-xs text-center">
                                                                        <div className="text-text/70">Manufacturer</div>
                                                                        <div className="text-cta font-mono mt-1">0x71a2...</div>
                                                                    </div>
                                                                </div>

                                                                <div className="mx-4 w-32 relative">
                                                                    <div className="h-0.5 w-full bg-cta/30"></div>
                                                                    <div className="absolute top-0 -mt-2 left-0 right-0">
                                                                        <div className="animate-ping absolute h-4 w-4 rounded-full bg-cta/30"></div>
                                                                        <div className="absolute h-4 w-4 rounded-full bg-cta/60 flex items-center justify-center">
                                                                            <FaBox className="text-xs text-background" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="w-20 h-20 bg-panel/90 border border-cta/20 rounded flex items-center justify-center">
                                                                    <div className="text-xs text-center">
                                                                        <div className="text-text/70">Distributor</div>
                                                                        <div className="text-cta font-mono mt-1">0x93b4...</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-8 text-center">
                                                                <div className="text-cta font-mono text-sm">
                                                                    {`{ "transfer": {"from": "0x71a2...", "to": "0x93b4...", "productId": "0x8f4a3b2c"} }`}
                                                                </div>
                                                                <div className="mt-2 text-xs text-text/70">
                                                                    Recording transfer on blockchain...
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Step 3: QR Code Integration */}
                                                    {step.id === 3 && (
                                                        <div className="p-4 h-full flex flex-col items-center justify-center">
                                                            <div className="relative">
                                                                <div className="w-40 h-40 bg-white p-2 rounded-lg">
                                                                    <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-0.5">
                                                                        {[...Array(36)].map((_, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}
                                                                            ></div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cta/20 border border-cta flex items-center justify-center">
                                                                    <FaBox className="text-sm text-cta" />
                                                                </div>
                                                            </div>

                                                            <div className="mt-6 text-center">
                                                                <div className="text-sm text-text flex items-center justify-center">
                                                                    <FaQrcode className="text-cta mr-2" /> Scan for full product journey
                                                                </div>
                                                                <div className="mt-4 text-xs text-text/70 max-w-xs">
                                                                    QR codes provide an interface between physical products and their digital twins on the blockchain
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Step 4: Stakeholder Access */}
                                                    {step.id === 4 && (
                                                        <div className="p-4 h-full flex flex-col items-center justify-center">
                                                            <div className="relative">
                                                                <div className="w-64 h-40 bg-panel/90 border border-cta/30 rounded-lg p-3 overflow-hidden">
                                                                    <div className="text-xs text-cta mb-2 font-mono">ProductID: 0x8f4a3b2c</div>

                                                                    <div className="space-y-2 text-xs">
                                                                        <div className="flex justify-between">
                                                                            <span className="text-text/70">Manufacturer:</span>
                                                                            <span className="text-text">GlobalTech Inc.</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-text/70">Production Date:</span>
                                                                            <span className="text-text">2023-05-15</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-text/70">Current Location:</span>
                                                                            <span className="text-cta">Distribution Center 3</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-text/70">Next Destination:</span>
                                                                            <span className="text-text">Retailer XYZ</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="absolute -top-2 -right-2 w-24 h-8 bg-panel border border-cta/20 rounded text-xs flex items-center justify-center text-text/70">
                                                                    <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div> Live Updates
                                                                </div>
                                                            </div>

                                                            <div className="mt-8 flex gap-4">
                                                                <div className="w-10 h-10 rounded-full bg-panel/70 border border-cta/20 flex items-center justify-center animate-pulse">
                                                                    <FaUsers className="text-cta text-sm" />
                                                                </div>
                                                                <div className="w-10 h-10 rounded-full bg-panel/70 border border-cta/20 flex items-center justify-center animate-pulse" style={{ animationDelay: "0.2s" }}>
                                                                    <FaUsers className="text-cta text-sm" />
                                                                </div>
                                                                <div className="w-10 h-10 rounded-full bg-panel/70 border border-cta/20 flex items-center justify-center animate-pulse" style={{ animationDelay: "0.4s" }}>
                                                                    <FaUsers className="text-cta text-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Step 5: Smart Contracts */}
                                                    {step.id === 5 && (
                                                        <div className="p-4 h-full flex flex-col items-center justify-center">
                                                            <div className="relative">
                                                                <div className="w-64 h-48 bg-panel/90 border border-cta/30 rounded-lg p-3 overflow-hidden font-mono text-xs">
                                                                    <div className="text-cta mb-2">// Smart Contract</div>
                                                                    <div className="text-text/90">
                                                                        <div>function <span className="text-cta">transferProduct</span>(</div>
                                                                        <div className="pl-4">address _from,</div>
                                                                        <div className="pl-4">address _to,</div>
                                                                        <div className="pl-4">uint256 _productId</div>
                                                                        <div>) public {`{`}</div>
                                                                        <div className="pl-4">// Verify sender</div>
                                                                        <div className="pl-4"><span className="text-cta">require</span>(msg.sender == _from);</div>
                                                                        <div className="pl-4">// Transfer ownership</div>
                                                                        <div className="pl-4">products[_productId].owner = _to;</div>
                                                                        <div className="pl-4">// Record timestamp</div>
                                                                        <div className="pl-4">products[_productId].updateTime = block.timestamp;</div>
                                                                        <div className="pl-4">// Emit event</div>
                                                                        <div className="pl-4"><span className="text-cta">emit</span> ProductTransferred(_from, _to, _productId);</div>
                                                                        <div>{`}`}</div>
                                                                    </div>
                                                                </div>

                                                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cta/20 border border-cta flex items-center justify-center">
                                                                    <FaFileContract className="text-sm text-cta" />
                                                                </div>
                                                            </div>

                                                            <div className="mt-6 text-center">
                                                                <div className="text-xs text-text/70 max-w-xs">
                                                                    Smart contracts automatically execute and enforce predefined rules, eliminating the need for intermediaries
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Working;