import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const [quoteIndex, setQuoteIndex] = useState(0)

  // Collection of supply chain related witty lines
  const supplyChainQuotes = [
    "⚡ Running on blockchain and way too much coffee.",
    "🌙 Another sleepless night, another line of code.",
    "💡 Because every great project starts with 'What if?' and coffee.",
    "⏳ Blockchain doesn't sleep, neither do we.",
    "🚀 Built with code, caffeine, and a sprinkle of chaos.",
    "🔗 Automating supply chains, manually surviving life.",
    "☕ Fueled by late-night coffee and impossible deadlines.",
    "🧑‍💻 100% human-developed (we think…).",
    "🛠 Built with passion, powered by caffeine, debugged with frustration.",
    "📦 No supply chain issues here, just an unhealthy sleep schedule.",
    "🌐 Tracking packages with blockchain: because 'lost in transit' is so last century."
  ]

  // Update quote when route changes - sequential pattern
  useEffect(() => {
    // Move to next quote, wrap around to beginning if at the end
    setQuoteIndex((prevIndex) => (prevIndex + 1) % supplyChainQuotes.length)
  }, [location.pathname])

  // Social media links as a constant
  const socialMediaLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-xl" />,
      url: "https://linkedin.com/in/mihir-an28"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-xl" />,
      url: "https://github.com/mihir-28"
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl" />,
      url: "https://instagram.com/kyaayaar.mihir"
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-xl" />,
      url: "https://twitter.com/kyayaar_mihir"
    }
  ]

  return (
    <footer className="bg-panel-dark text-text/80 pt-12 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Information */}
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="font-display text-cta text-xl">NexChain</h3>
            <p className="text-sm">Revolutionizing Supply Chain with Blockchain</p>
            <p className="text-sm mt-4">
              Transparent, secure, and efficient supply chain management powered by blockchain technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h4 className="font-bold text-text mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-cta transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-cta transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/features" className="text-sm hover:text-cta transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-cta transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="text-center lg:text-left">
            <h4 className="font-bold text-text mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm hover:text-cta transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-cta transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/support" className="text-sm hover:text-cta transition-colors">Support</Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-cta transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center lg:text-left">
            <h4 className="font-bold text-text mb-4">Get In Touch</h4>
            <p className="text-sm mb-2">Email: mihirnagda28@gmail.com</p>
            <p className="text-sm mb-4">Phone: +91 91374 61112</p>

            {/* Social Media Icons using the constant */}
            <div className="flex justify-center lg:justify-start space-x-4 mt-4">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text hover:text-cta transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-text/10 my-8"></div>

        {/* Copyright Row with Dynamic Quote */}
        <div className="flex flex-col justify-center items-center text-center">
          <p className='text-[12px] sm:text-sm md:mb-2'>
            {supplyChainQuotes[quoteIndex]}
          </p>
          <p className="text-[12px] sm:text-sm md:mb-2">
            © {currentYear} NexChain. All rights reserved.
          </p>
          <p className="text-[12px] sm:text-sm mx-2">Developed By Mihir Nagda.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer