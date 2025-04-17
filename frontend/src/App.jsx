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
import RoleSelectionPage from "./pages/RoleSelectionPage";
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
import AdminSetup from "./components/Admin/AdminSetup";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized"; // Import the Unauthorized page
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import RoleManagement component
import RoleManagement from "./components/Admin/RoleManagement";

import './index.css';

// Import mock data for dashboard
import { kpiData, recentTransactions } from "./data/mockData";


// Keep your original routes that never use transitions
const ROUTES_WITHOUT_TRANSITIONS = [
  '/login',
  '/register',
  '/wallet-connection',
  '/unauthorized',
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
  const isStaticNoTransitionRoute = ROUTES_WITHOUT_TRANSITIONS.some(route => {
    // Special case for dashboard routes
    if (route === '/dashboard') {
      return currentPath.startsWith('/dashboard');
    }
    // Normal exact or child route matching
    return currentPath === route || currentPath.startsWith(route + '/');
  });

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
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="/select-role" element={
              <ProtectedRoute>
                <RoleSelectionPage />
              </ProtectedRoute>
            } />
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
              {/* Only MANUFACTURER and ADMIN can register new products */}
              <Route path="new" element={
                <ProtectedRoute requiredRoles={['MANUFACTURER_ROLE', 'ADMIN_ROLE']}>
                  <ProductRegistrationForm />
                </ProtectedRoute>
              } />
            </Route>

            {/* Other dashboard routes */}
            <Route path="transactions" element={<TransactionsPage />} />
            
            {/* Only ADMIN, MANUFACTURER and DISTRIBUTOR can access analytics */}
            <Route path="analytics" element={
              <ProtectedRoute requiredRoles={['ADMIN_ROLE', 'MANUFACTURER_ROLE', 'DISTRIBUTOR_ROLE']}>
                <div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Analytics page coming soon</div>
              </ProtectedRoute>
            } />
            
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            
            {/* Admin-only route for role management */}
            <Route path="roles" element={
              <ProtectedRoute requiredRoles={['ADMIN_ROLE']}>
                <RoleManagement />
              </ProtectedRoute>
            } />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />

          {/* Admin setup route */}
          <Route path="/admin-setup" element={<AdminSetup />} />
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

      {/* Toast container - place it at the end */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Matches your dark theme
      />
    </>
  );
};

export default App;