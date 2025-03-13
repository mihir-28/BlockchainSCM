import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-panel-dark text-text/80 pt-12 pb-8">
            <div className="container mx-auto px-6 md:px-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Information */}
                    <div className="space-y-4">
                        <h3 className="font-display text-cta text-xl">BlockchainSCM</h3>
                        <p className="text-sm">Revolutionizing Supply Chain with Blockchain</p>
                        <p className="text-sm mt-4">
                            Transparent, secure, and efficient supply chain management powered by blockchain technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
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
                    <div>
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
                    <div>
                        <h4 className="font-bold text-text mb-4">Get In Touch</h4>
                        <p className="text-sm mb-2">Email: info@blockchainscm.com</p>
                        <p className="text-sm mb-4">Phone: +1 (555) 123-4567</p>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mt-4">
                            <a href="https://twitter.com/blockchainscm" target="_blank" rel="noopener noreferrer" className="text-text hover:text-cta transition-colors">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="https://facebook.com/blockchainscm" target="_blank" rel="noopener noreferrer" className="text-text hover:text-cta transition-colors">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="https://linkedin.com/company/blockchainscm" target="_blank" rel="noopener noreferrer" className="text-text hover:text-cta transition-colors">
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a href="https://github.com/blockchainscm" target="_blank" rel="noopener noreferrer" className="text-text hover:text-cta transition-colors">
                                <FaGithub className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-text/10 my-8"></div>

                {/* Copyright Row */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm mb-4 md:mb-0">
                        © {currentYear} BlockchainSCM. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/privacy" className="text-xs hover:text-cta transition-colors">Privacy</Link>
                        <span className="text-xs">|</span>
                        <Link to="/terms" className="text-xs hover:text-cta transition-colors">Terms</Link>
                        <span className="text-xs">|</span>
                        <Link to="/cookies" className="text-xs hover:text-cta transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer