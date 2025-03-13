import React, { useState, useEffect } from 'react';

const CustomHover = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Function to update mouse position
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        // Function to handle mouse leaving the window
        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        // Clean up event listeners when component unmounts
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            <div
                className="absolute rounded-full bg-gradient-to-br from-cta/30 to-cta/5 blur-2xl"
                style={{
                    height: '250px',
                    width: '250px',
                    left: `${mousePosition.x - 125}px`,
                    top: `${mousePosition.y - 125}px`,
                    transition: 'transform 0.1s ease-out, opacity 0.3s ease-in-out',
                    opacity: isVisible ? 0.6 : 0,
                    transform: `translate3d(0, 0, 0) scale(${isVisible ? 1 : 0.8})`,
                }}
            />
        </div>
    );
};

export default CustomHover;
