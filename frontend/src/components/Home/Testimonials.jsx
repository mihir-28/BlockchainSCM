import React from 'react';
import testimonials from '../../data/testimonials';

const Testimonials = () => {
    return (
        <div className="py-20 bg-panel">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-cta mb-4">Success Stories</h2>
                    <p className="text-text/80 max-w-2xl mx-auto">
                        See how companies are transforming their supply chains with our blockchain solution.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-background/30 backdrop-blur-sm rounded-lg p-8 border border-cta/10 relative flex flex-col h-full"
                        >
                            {/* Quote marks decoration */}
                            <div className="absolute -top-4 left-4 text-cta/20 text-7xl font-serif">"</div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex-grow">
                                    <p className="text-text mb-6 italic">"{testimonial.quote}"</p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-cta/10">
                                    <div className="flex items-center">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="h-12 w-12 rounded-full object-cover border-2 border-cta/30"
                                        />
                                        <div className="ml-4">
                                            <h4 className="text-cta font-bold">{testimonial.name}</h4>
                                            <p className="text-text/70 text-sm">{testimonial.title}</p>
                                            <p className="text-text/70 text-sm">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to action */}
                <div className="mt-16 text-center p-8 bg-gradient-to-r from-panel to-background rounded-xl border border-cta/20">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-cta mb-4">Ready to Transform Your Supply Chain?</h3>
                    <p className="text-text/80 mb-8 max-w-2xl mx-auto">
                        Join the growing list of companies revolutionizing their operations with blockchain technology.
                    </p>
                    <button className="bg-cta hover:bg-cta/80 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300">
                        Get Started Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;