import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaUserShield, FaSignOutAlt } from 'react-icons/fa'
import MobileNavbar from './MobileNavbar'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  // Handle scroll behavior for smart navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      const isVisible =
        prevScrollPos > currentScrollPos ||
        currentScrollPos < 10 ||
        prevScrollPos > 0 && prevScrollPos - currentScrollPos > 70

      setPrevScrollPos(currentScrollPos)

      // Only update state when visibility changes to reduce renders
      if (visible !== isVisible) {
        setVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, visible])

  // Function to handle login button click
  const handleLoginClick = () => {
    navigate('/login')
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  }
  
  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  // Function to go to dashboard
  const goToDashboard = () => {
    navigate('/dashboard')
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)

    // If opening the mobile menu, ensure navbar is visible
    if (!isMobileMenuOpen) {
      setVisible(true)
    }
  }

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`bg-panel sticky top-0 z-50 py-8 px-6 md:px-12 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
        } shadow-lg`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="font-display text-cta text-xl md:text-2xl">NexChain</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="font-primary text-text hover:text-cta transition-colors">
            Home
          </Link>
          <Link to="/about" className="font-primary text-text hover:text-cta transition-colors">
            About
          </Link>
          <Link to="/features" className="font-primary text-text hover:text-cta transition-colors">
            Features
          </Link>
          <Link to="/contact" className="font-primary text-text hover:text-cta transition-colors">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={goToDashboard}
                className="bg-background/40 text-text hover:bg-background/60 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-500/20 text-red-500 hover:bg-red-500/30 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-cta hover:bg-cta/80 text-background font-bold py-2 px-4 rounded-lg flex items-center transition-colors"
            >
              <FaUserShield className="mr-2" />
              Log In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text hover:text-cta"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <MobileNavbar
          currentUser={currentUser}
          handleLogout={handleLogout}
          handleLoginClick={handleLoginClick}
          goToDashboard={goToDashboard}
          onClose={closeMobileMenu}
        />
      )}
    </nav>
  )
}

export default Navbar