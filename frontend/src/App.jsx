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
            <Route path="terms" element={<TermsPage />} />
            <Route path="policy" element={<PolicyPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="faq" element={<FAQPage />} />
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;