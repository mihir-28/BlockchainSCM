import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/Common/ScrollToTop";
import BlockchainPreloader from "./components/Common/BlockchainPreloader";
import PageTransition from "./components/Common/PageTransition";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import OverviewPage from "./components/Dashboard/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./components/Products/ProductDetails";
import ProductVerification from "./components/Products/ProductVerification";
import TransactionsPage from "./pages/TransactionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import WalletConnectionPage from "./pages/WalletConnectionPage";
import ProductRegistrationForm from "./components/Products/ProductRegistrationForm";
import TermsPage from './pages/TermsPage';
import PolicyPage from './pages/PolicyPage';
import SupportPage from './pages/SupportPage';
import FAQPage from './pages/FAQPage';
import NotFound from "./pages/NotFound";


// Blockchain related imports
import BlockchainTest from "./components/Blockchain/BlockchainTest";

import './index.css';

// Import mock data for dashboard
import { kpiData, recentTransactions } from "./data/mockData";

// Keep your original routes that never use transitions
const ROUTES_WITHOUT_TRANSITIONS = [
  '/login',
  '/register',
  '/wallet-connection',
  '/dashboard/*',
];

// Dashboard route prefix
const DASHBOARD_PREFIX = '/dashboard';

const AppContent = () => {
  const location = useLocation();
  const prevLocationRef = useRef(location);
  const currentPath = location.pathname;

  // Track if navigation is between dashboard pages
  useEffect(() => {
    prevLocationRef.current = location;
  }, [location]);

  // First check: Is this a route that never uses transitions?
  const isStaticNoTransitionRoute = ROUTES_WITHOUT_TRANSITIONS.some(route =>
    currentPath === route || currentPath.startsWith(route + '/')
  );

  // Second check: Is this internal dashboard navigation?
  const currentIsDashboard = currentPath.startsWith(DASHBOARD_PREFIX);
  const prevIsDashboard = prevLocationRef.current.pathname.startsWith(DASHBOARD_PREFIX);
  const isDashboardInternalNavigation = currentIsDashboard && prevIsDashboard;

  // Disable transitions if either condition is met
  const transitionsDisabled = isStaticNoTransitionRoute || isDashboardInternalNavigation;

  return (
    <>
      <ScrollToTop />
      <PageTransition transitionsDisabled={transitionsDisabled}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="wallet-connection" element={
              <ProtectedRoute>
                <WalletConnectionPage />
              </ProtectedRoute>
            } />
            <Route path="terms-of-service" element={<TermsPage />} />
            <Route path="privacy-policy" element={<PolicyPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="verify/:productId" element={<ProductVerification />} />
          </Route>

          {/* Dashboard routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            {/* Dashboard index/overview route */}
            <Route index element={<OverviewPage kpiData={kpiData} recentTransactions={recentTransactions} />} />

            {/* Products routes */}
            <Route path="products">
              <Route index element={<ProductsPage />} />
              <Route path=":productId" element={<ProductDetails />} />
              <Route path="new" element={<ProductRegistrationForm />} />
            </Route>

            {/* Other dashboard routes */}
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />

          {/* Blockchain test route (for development purposes) */}
          <Route path="/btest" element={<BlockchainTest />} />
        </Routes>
      </PageTransition>
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Check for preloader shown status on initial load
  useEffect(() => {
    const hasShownPreloader = sessionStorage.getItem('preloaderShown');
    if (!hasShownPreloader) {
      setIsLoading(true);
    }
  }, []);

  // Handler for when preloader completes
  const handlePreloaderComplete = () => {
    // Mark preloader as shown in session storage
    sessionStorage.setItem('preloaderShown', 'true');
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <BlockchainPreloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <AuthProvider>
          <BrowserRouter basename="/">
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      )}
    </>
  );
};

export default App;