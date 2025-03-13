import React from 'react'
import { Link } from 'react-router-dom'
import { FaWallet } from 'react-icons/fa'

const MobileNavbar = ({ isConnected, walletAddress, connectWallet, formatAddress }) => {
    return (
        <div className="md:hidden bg-panel/95 px-6 py-4 absolute top-full left-0 right-0 border-t border-cta/20">
            <div className="flex flex-col space-y-4">
                <Link to="/" className="font-primary text-text hover:text-cta transition-colors py-2">
                    Home
                </Link>
                <Link to="/about" className="font-primary text-text hover:text-cta transition-colors py-2">
                    About
                </Link>
                <Link to="/features" className="font-primary text-text hover:text-cta transition-colors py-2">
                    Features
                </Link>
                <Link to="/contact" className="font-primary text-text hover:text-cta transition-colors py-2">
                    Contact
                </Link>

                {/* Wallet Connection for Mobile */}
                <div className="pt-2 border-t border-text/10">
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
                            className="bg-cta hover:bg-cta/80 text-background font-bold py-2 px-4 rounded-lg flex items-center w-full justify-center transition-colors"
                        >
                            <FaWallet className="mr-2" />
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MobileNavbar