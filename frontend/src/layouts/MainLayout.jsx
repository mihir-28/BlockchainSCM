import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import CustomHover from '../components/Common/CustomHover';
// import BlockchainDebugger from '../components/Debug/BlockchainDebugger';

const MainLayout = () => {
    return (
        <>
            {/* <CustomHover /> */}
            <Navbar />
            <main className="relative z-10">
                <Outlet />
            </main>
            <Footer />
            {/* <BlockchainDebugger /> */}
        </>
    );
};

export default MainLayout;