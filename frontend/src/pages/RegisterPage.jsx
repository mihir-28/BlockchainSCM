import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaPhone, FaUserPlus, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import NetworkAnimation from '../components/Common/NetworkAnimation';
import { isMobileDevice } from '../utils/deviceDetection';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signup, signInWithGoogle } = useAuth();

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
    
    // Check password strength if password field is being updated
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    // Calculate password strength based on criteria
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (passwordStrength < 75) {
      tempErrors.password = "Password is not strong enough";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.company.trim()) {
      tempErrors.company = "Company name is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Create additional user data object
        const userData = {
          displayName: formData.name,
          company: formData.company,
          phone: formData.phone,
          creationTime: new Date().toISOString(),
          lastLoginTime: new Date().toISOString(),
          role: 'user'
        };
        
        // Sign up with email and password
        await signup(formData.email, formData.password, userData);
        // Redirect to wallet connection
        navigate('/wallet-connection');
      } catch (error) {
        let errorMessage = "Registration failed. Please try again.";
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = "Email is already in use. Try logging in instead.";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "Invalid email address.";
        } else if (error.code === 'auth/weak-password') {
          errorMessage = "Password is too weak. Please choose a stronger password.";
        }
        
        setRegisterError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setRegisterError('');
    setIsGoogleLoading(true);
    
    try {
      await signInWithGoogle();
      // Redirect to wallet connection
      navigate('/wallet-connection');
    } catch (error) {
      let errorMessage = "Google sign-in failed. Please try again.";
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in popup was closed. Please try again.";
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = "Multiple popups detected. Please try again.";
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = "An account with this email already exists using a different sign-in method.";
      }
      
      setRegisterError(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-400";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background animations */}
      <NetworkAnimation opacity={0.15} zIndex={0} />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -bottom-48 -right-48"></div>
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -top-48 -left-48"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-panel/30 backdrop-blur-sm rounded-xl border border-cta/20 p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cta/10 mb-4">
                <FaUserPlus className="text-cta text-2xl" />
              </div>
              <h1 className="text-3xl font-display font-bold text-cta mb-2">Create Account</h1>
              <p className="text-text/70">Join the NexChain blockchain supply chain network</p>
            </div>
            
            {registerError && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-sm mb-6">
                {registerError}
              </div>
            )}
            
            {/* Google Sign In Button */}
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
                    Continue with Google
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
                <span className="px-3 bg-panel/30 text-text/50 text-xs">OR REGISTER WITH EMAIL</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-text/90 mb-1 text-sm">Full Name</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-10 py-3 bg-background/60 border ${errors.name ? 'border-red-500/50' : 'border-cta/20'} 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-text/90 mb-1 text-sm">Email Address</label>
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
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-text/90 mb-1 text-sm">Password</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaLock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-10 py-3 bg-background/60 border ${errors.password ? 'border-red-500/50' : 'border-cta/20'} 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/50 hover:text-cta"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="h-2 w-full bg-gray-300/30 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        <span className="text-xs ml-2 w-12 text-text/70">{getPasswordStrengthLabel()}</span>
                      </div>
                      <ul className="text-xs text-text/60">
                        <li className={formData.password.length >= 8 ? "text-green-500" : ""}>• At least 8 characters</li>
                        <li className={/[A-Z]/.test(formData.password) ? "text-green-500" : ""}>• At least 1 uppercase letter</li>
                        <li className={/[0-9]/.test(formData.password) ? "text-green-500" : ""}>• At least 1 number</li>
                        <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : ""}>• At least 1 special character</li>
                      </ul>
                    </div>
                  )}
                  
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-text/90 mb-1 text-sm">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaLock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-10 py-3 bg-background/60 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-cta/20'} 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-text/90 mb-1 text-sm">Company</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaBuilding />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-10 py-3 bg-background/60 border ${errors.company ? 'border-red-500/50' : 'border-cta/20'} 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                      placeholder="Your company name"
                    />
                  </div>
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-text/90 mb-1 text-sm">Phone (Optional)</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-text/50">
                      <FaPhone />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-10 py-3 bg-background/60 border border-cta/20
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-cta/30 rounded bg-background/60 focus:ring-cta/30 focus:ring-2"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-text/70">
                      I agree to the <a href="/terms" className="text-cta hover:text-cta/80">Terms of Service</a> and <a href="/privacy" className="text-cta hover:text-cta/80">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
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
                  ) : "Create Account"}
                </button>
              </div>
              
              <div className="mt-6 text-center text-sm text-text/70">
                Already have an account? <Link to="/login" className="text-cta hover:text-cta/80 transition-colors">Log In</Link>
              </div>
            </form>
          </motion.div>
          
          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Secure & Immutable",
                description: "Your supply chain data is secured with blockchain-inspired technology for maximum transparency.",
                icon: "🔒"
              },
              {
                title: "Real-time Tracking",
                description: "Track products throughout the entire supply chain with real-time updates and notifications.",
                icon: "📊"
              },
              {
                title: "Collaborative Platform",
                description: "Connect with partners and stakeholders in a unified, collaborative ecosystem.",
                icon: "🤝"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-panel/20 backdrop-blur-sm p-6 rounded-xl border border-cta/10 hover:border-cta/30 transition-all duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-cta mb-2">{feature.title}</h3>
                <p className="text-sm text-text/70">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;