import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/Common/ScrollToTop";
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
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import WalletConnectionPage from "./pages/WalletConnectionPage";
// import NotFoundPage from "./pages/NotFoundPage";
import ProductRegistrationForm from "./components/Products/ProductRegistrationForm";

import './index.css';

// Import mock data for dashboard
import { kpiData, recentTransactions } from "./data/mockData";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <ScrollToTop />
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
            <Route path="transactions" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Transactions page coming soon</div>} />
            <Route path="analytics" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Analytics page coming soon</div>} />
            <Route path="settings" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Settings page coming soon</div>} />
            <Route path="profile" element={<div className="p-6 bg-panel/30 border border-cta/10 rounded-lg text-center">Profile page coming soon</div>} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-background">
            <div className="bg-panel/30 backdrop-blur-sm border border-cta/20 p-8 rounded-xl text-center">
              <h1 className="text-3xl font-display font-bold text-cta mb-4">404 - Page Not Found</h1>
              <p className="text-text/70 mb-6">The page you are looking for doesn't exist.</p>
              <a href="/" className="bg-cta hover:bg-cta/90 text-background font-bold py-2 px-6 rounded-lg transition-colors">
                Go Home
              </a>
            </div>
          </div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;