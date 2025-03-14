import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserShield, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import NetworkAnimation from '../components/Common/NetworkAnimation';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signInWithGoogle, resetPassword } = useAuth();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await login(formData.email, formData.password);
        navigate(from, { replace: true });
      } catch (error) {
        setLoginError(error.message || "Failed to login. Please check your credentials.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setLoginError('');
    setIsGoogleLoading(true);
    
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  const handleOpenResetModal = () => {
    // Prefill with email from login form if available
    setResetEmail(formData.email || '');
    setResetEmailError('');
    setResetSuccess('');
    setShowResetModal(true);
  };
  
  const handleCloseResetModal = () => {
    setShowResetModal(false);
  };
  
  const validateResetEmail = () => {
    if (!resetEmail.trim()) {
      setResetEmailError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError("Email is invalid");
      return false;
    }
    return true;
  };
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetEmailError('');
    setResetSuccess('');
    
    if (validateResetEmail()) {
      setIsResetLoading(true);
      
      try {
        await resetPassword(resetEmail);
        setResetSuccess("Password reset email sent! Check your inbox.");
        // Don't close modal immediately so user can see success message
      } catch (error) {
        setResetEmailError(error.message || "Failed to send password reset email. Please try again.");
      } finally {
        setIsResetLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background */}
      <NetworkAnimation opacity={0.15} zIndex={0} />
      
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-panel/30 backdrop-blur-sm rounded-xl border border-cta/20 p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cta/10 mb-4">
                <FaUserShield className="text-cta text-2xl" />
              </div>
              <h1 className="text-3xl font-display font-bold text-cta mb-2">Login</h1>
              <p className="text-text/70">Access your NexChain account</p>
            </div>
            
            {loginError && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-sm mb-6">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full py-3 px-4 bg-white text-gray-800 font-medium rounded-lg border border-gray-300
                           hover:bg-gray-100 transition-colors flex justify-center items-center"
                >
                  {isGoogleLoading ? (
                    <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <FaGoogle className="mr-2 text-[#4285F4]" />
                      Sign in with Google
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-text/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-panel/30 text-text/50 text-xs">OR SIGN IN WITH EMAIL</span>
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block text-text/90 mb-1 text-sm">Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-10 py-3 bg-background/60 border ${errors.email ? 'border-red-500/50' : 'border-cta/20'} 
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-text/90 mb-1 text-sm">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-10 py-3 bg-background/60 border ${errors.password ? 'border-red-500/50' : 'border-cta/20'} 
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-cta/20 text-cta focus:ring-cta/30"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-text/70">Remember me</label>
                </div>
                <button 
                  type="button" 
                  onClick={handleOpenResetModal}
                  className="text-sm text-cta hover:text-cta/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-cta hover:bg-cta/90 text-background font-bold rounded-lg
                         transition-colors flex justify-center items-center"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Login"}
              </button>
              
              <div className="mt-6 text-center text-sm text-text/70">
                Don't have an account? <Link to="/register" className="text-cta hover:text-cta/80 transition-colors">Register</Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="absolute inset-0 bg-black/70" onClick={handleCloseResetModal}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-panel/90 backdrop-blur-md rounded-xl border border-cta/20 p-6 md:p-8 shadow-xl w-full max-w-md relative z-10"
          >
            <h2 className="text-xl font-display font-bold text-cta mb-4">Reset Password</h2>
            
            {resetSuccess ? (
              <div className="mb-6">
                <div className="bg-green-500/20 border border-green-500/30 text-green-500 px-4 py-3 rounded-lg text-sm mb-4">
                  {resetSuccess}
                </div>
                <button
                  onClick={handleCloseResetModal}
                  className="w-full py-3 px-4 bg-cta hover:bg-cta/90 text-background font-bold rounded-lg transition-colors"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset}>
                <p className="text-text/70 mb-6">
                  Enter your email address below and we'll send you instructions to reset your password.
                </p>
                
                <div className="mb-6">
                  <label htmlFor="resetEmail" className="block text-text/90 mb-1 text-sm">Email</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      id="resetEmail"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className={`w-full px-10 py-3 bg-background/60 border ${resetEmailError ? 'border-red-500/50' : 'border-cta/20'} 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {resetEmailError && <p className="text-red-500 text-xs mt-1">{resetEmailError}</p>}
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseResetModal}
                    className="w-1/2 py-3 px-4 bg-background/50 border border-cta/10 text-text hover:bg-background/80 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isResetLoading}
                    className="w-1/2 py-3 px-4 bg-cta hover:bg-cta/90 text-background font-bold rounded-lg
                             transition-colors flex justify-center items-center"
                  >
                    {isResetLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "Send Reset Link"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;