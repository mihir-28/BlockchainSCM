import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaWallet, FaBars, FaTimes } from 'react-icons/fa'
import MobileNavbar from './MobileNavbar'

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

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

  // Function to check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log("Make sure you have MetaMask installed!")
        return
      }

      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        setIsConnected(true)
        setWalletAddress(account)
        console.log("Found an authorized account:", account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert("MetaMask is required to connect a wallet")
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setIsConnected(true)
      setWalletAddress(accounts[0])
      console.log("Connected:", accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  // Function to format wallet address for display
  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)

    // If opening the mobile menu, ensure navbar is visible
    if (!isMobileMenuOpen) {
      setVisible(true)
    }
  }

  return (
    <nav
      className={`bg-panel sticky top-0 z-50 py-8 px-6 md:px-12 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
        } shadow-lg`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="font-display text-cta text-xl md:text-2xl">BlockchainSCM</div>
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

        {/* Wallet Connection */}
        <div className="hidden md:flex items-center">
          {isConnected ? (
            <div className="flex items-center bg-background/40 rounded-lg px-4 py-2">
              <FaWallet className="text-cta mr-2" />
              <span className="text-text text-sm">
                {formatAddress(walletAddress)}
              </span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-cta hover:bg-cta/80 text-background font-bold py-2 px-4 rounded-lg flex items-center transition-colors"
            >
              <FaWallet className="mr-2" />
              Connect Wallet
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
          isConnected={isConnected}
          walletAddress={walletAddress}
          connectWallet={connectWallet}
          formatAddress={formatAddress}
        />
      )}
    </nav>
  )
}

export default Navbar