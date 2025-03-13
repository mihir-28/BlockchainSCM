import React from 'react';
import Hero from '../components/About/Hero';
import Overview from '../components/About/Overview';
import Working from '../components/About/Working';
import Stack from '../components/About/Stack';
import Benefits from '../components/About/Benefits';
import CTA from '../components/About/CTA';

const AboutPage = () => {
    return (
        <div className="bg-background min-h-screen">
            <Hero />
            <Overview />
            <Working />
            <Stack />
            <Benefits />
            <CTA />
        </div>
    );
};

export default AboutPage;