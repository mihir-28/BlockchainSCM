import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserShield, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'

const MobileNavbar = ({ currentUser, handleLoginClick, handleLogout, goToDashboard, onClose }) => {
  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-panel/95 backdrop-blur-sm shadow-lg border-t border-cta/10 pt-4 pb-8 px-6">
      <div className="flex flex-col space-y-4">
        <Link 
          to="/" 
          className="font-primary text-text hover:text-cta transition-colors py-3 border-b border-text/10"
          onClick={onClose}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className="font-primary text-text hover:text-cta transition-colors py-3 border-b border-text/10"
          onClick={onClose}
        >
          About
        </Link>
        <Link 
          to="/features" 
          className="font-primary text-text hover:text-cta transition-colors py-3 border-b border-text/10"
          onClick={onClose}
        >
          Features
        </Link>
        <Link 
          to="/contact" 
          className="font-primary text-text hover:text-cta transition-colors py-3 border-b border-text/10"
          onClick={onClose}
        >
          Contact
        </Link>
        
        {/* Auth Buttons for Mobile */}
        <div className="py-3">
          {currentUser ? (
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  goToDashboard()
                  onClose()
                }}
                className="bg-background/40 text-text hover:bg-background/60 font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaTachometerAlt className="mr-2" />
                Dashboard
              </button>
              <button 
                onClick={() => {
                  handleLogout()
                  onClose()
                }}
                className="bg-red-500/20 text-red-500 hover:bg-red-500/30 font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLoginClick()
                onClose()
              }}
              className="w-full bg-cta hover:bg-cta/80 text-background font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <FaUserShield className="mr-2" />
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileNavbar