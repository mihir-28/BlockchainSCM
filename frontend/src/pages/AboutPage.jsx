import React from 'react';
import AboutHero from '../components/About/AboutHero';
import Overview from '../components/About/Overview';
import Working from '../components/About/Working';
import Stack from '../components/About/Stack';
import Benefits from '../components/About/Benefits';
import AboutCTA from '../components/About/AboutCTA';

const AboutPage = () => {
    return (
        <div className="bg-background min-h-screen">
            <AboutHero />
            <Overview />
            <Working />
            <Stack />
            <Benefits />
            <AboutCTA />
        </div>
    );
};

export default AboutPage;