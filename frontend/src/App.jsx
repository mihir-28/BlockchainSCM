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
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import WalletConnectionPage from "./pages/WalletConnectionPage";

import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/wallet-connection" 
              element={
                <ProtectedRoute>
                  <WalletConnectionPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;