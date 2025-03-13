import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Implementing this blockchain solution has transformed our supply chain transparency. We've seen a 40% reduction in disputes and significantly improved customer trust.",
            name: "Sarah Johnson",
            title: "Supply Chain Director",
            company: "Global Logistics Co.",
            avatar: "https://randomuser.me/api/portraits/women/45.jpg"
        },
        {
            quote: "The real-time tracking capabilities have revolutionized how we manage inventory and respond to supply chain disruptions. Game-changing technology.",
            name: "Michael Chen",
            title: "Operations Manager",
            company: "Tech Manufacturing Inc.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            quote: "Our customers love the ability to verify product authenticity through the blockchain. It's given us a competitive edge in an industry where trust is everything.",
            name: "Alicia Rodriguez",
            title: "Chief Innovation Officer",
            company: "Premium Goods Ltd.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        }
    ];

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
                            className="bg-background/30 backdrop-blur-sm rounded-lg p-8 border border-cta/10 relative"
                        >
                            {/* Quote marks decoration */}
                            <div className="absolute -top-4 left-4 text-cta/20 text-7xl font-serif">"</div>

                            <div className="relative z-10">
                                <p className="text-text mb-6 italic">"{testimonial.quote}"</p>

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