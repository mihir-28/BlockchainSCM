import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // When the route changes, reset the scroll position to the top
        window.scrollTo(0, 0);
    }, [pathname]);

    return null; // This component doesn't render anything
};

export default ScrollToTop;