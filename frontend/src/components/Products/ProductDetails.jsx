import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as productService from '../../services/productService';
import web3Service from '../../services/web3Service'; // Add this import
import {
  FaCheck, FaTimes, FaExchangeAlt, FaEdit, FaHistory, FaQrcode,
  FaArrowLeft, FaDownload, FaCheckCircle, FaTimesCircle,
  FaExternalLinkAlt, FaSpinner
} from 'react-icons/fa';
import UpdateProduct from './UpdateProduct';
import { QRCodeSVG } from 'qrcode.react';
import { showTransferSuccessToast, showTransferErrorToast } from '../../services/toastService';

const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [transferTarget, setTransferTarget] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  // Block explorer URL
  const blockExplorerUrl = 'https://etherscan.io';

  // QR code data
  const [qrCodeData, setQrCodeData] = useState('');

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const productData = await productService.getProduct(productId);
      
      // Use the same verification logic as in ProductVerification
      if (productData.blockchainDataAvailable && productData.onChain) {
        // Use the helper function from productService
        const { isVerified, verificationSource } = productService.verifyProductData(productData);
        productData.isVerified = isVerified;
        productData.verificationSource = verificationSource;
      } else {
        // Default to database verification if blockchain data isn't available
        productData.isVerified = true;
        productData.verificationSource = 'database';
      }
      
      setProduct(productData);

      // Generate QR code data
      const baseVerificationUrl = `${window.location.origin}/verify`;
      const qrData = `${baseVerificationUrl}/${productData.blockchainId}`;
      setQrCodeData(qrData);
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleUpdateComplete = () => {
    setShowUpdateModal(false);
    fetchProductDetails(); // Refresh data after update
  };

  // QR code download function
  const downloadQrCode = () => {
    // Get the SVG element
    const svg = document.getElementById('product-qr-code');
    if (!svg) return;

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set dimensions 
    canvas.width = 350;
    canvas.height = 350;

    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    img.onload = function () {
      // Draw image on canvas with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Load and draw the logo on top of the QR code
      const logo = new Image();
      logo.onload = function () {
        // Calculate center position
        const logoWidth = canvas.width / 5;  // 20% of QR size
        const logoHeight = canvas.height / 5;
        const logoX = (canvas.width - logoWidth) / 2;
        const logoY = (canvas.height - logoHeight) / 2;

        // Draw logo in the center
        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

        // Download as PNG
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `product-${product.blockchainId}-qr.png`;
        link.href = dataURL;
        link.click();
      };

      // Set source for logo
      logo.src = "/icon-black.jpg";
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  // Handle transfer ownership
  const handleTransferOwnership = async () => {
    // Improved Ethereum address validation
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

    if (!transferTarget.trim() || !ethAddressRegex.test(transferTarget)) {
      showTransferErrorToast('Please enter a valid Ethereum address (0x followed by 40 hexadecimal characters)');
      return;
    }

    setIsTransferring(true);
    try {
      const blockchainId = product.blockchainId;
      console.log(`Transferring product ${blockchainId} to ${transferTarget}`);

      const result = await productService.transferProduct(blockchainId, transferTarget);
      console.log('Product transferred:', result);

      // Replace alert with toast
      showTransferSuccessToast();

      // Add a slight delay before refreshing to ensure Firebase has updated
      setTimeout(() => {
        fetchProductDetails(); // This should get the latest data including the new owner
      }, 1000);
    } catch (err) {
      console.error('Error transferring ownership:', err);

      // More detailed error message based on error type
      let errorMessage = 'Failed to transfer ownership. Please try again.';
      if (err.message && err.message.includes('address')) {
        errorMessage = 'Invalid Ethereum address format. Please check the address and try again.';
      } else if (err.message && err.message.includes('denied')) {
        errorMessage = 'Transaction was denied. Please confirm the transaction in your wallet.';
      } else if (err.message && err.message.includes('failed')) {
        errorMessage = 'Blockchain transaction failed. Please check your account has enough funds.';
      }

      showTransferErrorToast(errorMessage);
    } finally {
      setIsTransferring(false);
      setTransferTarget('');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/dashboard/products')}
            className="mr-4 text-text/60 hover:text-cta transition-colors"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-semibold text-text">Loading Product...</h1>
        </div>
        <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-12 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <FaSpinner className="text-cta text-3xl animate-spin mb-4" />
            <p className="text-text/60">Loading blockchain data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/dashboard/products')}
            className="mr-4 text-text/60 hover:text-cta transition-colors"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-semibold text-text">Product Not Found</h1>
        </div>
        <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 text-center">
          <p className="text-text/60">{error || 'The requested product could not be found.'}</p>
          <button
            onClick={() => navigate('/dashboard/products')}
            className="mt-4 px-4 py-2 bg-cta text-background rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Product history data
  const productHistory = [
    {
      event: 'Product Created',
      date: new Date(Number(product.onChain.createTime) * 1000).toLocaleString(),
      by: product.manufacturer
    },
    {
      event: 'Product Updated',
      date: new Date(Number(product.onChain.updateTime) * 1000).toLocaleString(),
      by: product.manufacturer
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/dashboard/products')}
            className="mr-4 text-text/60 hover:text-cta transition-colors"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-semibold text-text">{product.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="bg-cta/10 border border-cta/20 text-cta rounded-lg px-4 py-2 text-sm flex items-center hover:bg-cta/20 transition-colors"
          >
            <FaQrcode className="mr-2" /> Generate QR
          </button>
          <button className="bg-panel/60 border border-cta/20 text-text rounded-lg px-4 py-2 text-sm flex items-center hover:bg-panel transition-colors">
            <FaDownload className="mr-2" /> Export Data
          </button>
        </div>
      </div>

      {/* Blockchain verification banner */}
      <div className={`rounded-xl p-4 flex items-center justify-between ${
        product.isVerified ? 'bg-cta/10 border border-cta/20' : 'bg-red-500/10 border border-red-500/20'
      }`}>
        <div className="flex items-center">
          <div className={`rounded-full p-2 mr-3 ${
            product.isVerified ? 'bg-cta/20' : 'bg-red-500/20'
          }`}>
            {product.isVerified ? (
              <FaCheckCircle className="text-cta text-lg" />
            ) : (
              <FaTimesCircle className="text-red-400 text-lg" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-text">
              {product.isVerified ? 'Blockchain Verified' : 'Not Verified'}
            </h3>
            <p className="text-xs text-text/70">
              {product.isVerified 
                ? product.verificationSource === 'blockchain-full'
                  ? "This product's information is fully verified on the blockchain."
                  : product.verificationSource === 'blockchain-exists'
                    ? "This product exists on the blockchain, indicating it is authentic." 
                    : "This product is in our database but blockchain verification is unavailable."
                : "This product's authenticity could not be verified"}
            </p>
          </div>
        </div>
        <a
          href={`${blockExplorerUrl}/address/${product.onChain.owner}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cta hover:text-cta/80 flex items-center text-sm"
        >
          View on Explorer <FaExternalLinkAlt className="ml-1 text-xs" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main product info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic details */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-text">Product Details</h2>
              <div className={`px-3 py-1 rounded-full text-sm flex items-center ${product.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {product.isVerified ? (
                  <><FaCheckCircle className="mr-1" /> Verified</>
                ) : (
                  <><FaTimesCircle className="mr-1" /> Not Verified</>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-text/60 text-sm">Product ID</p>
                <p className="text-text">{product.blockchainId}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Serial Number</p>
                <p className="text-text">{product.serialNumber}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Origin</p>
                <p className="text-text">{product.origin}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Date Added</p>
                <p className="text-text">
                  {new Date(Number(product.onChain.createTime) * 1000).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Manufacturer</p>
                <p className="text-text">{product.manufacturer}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Current Owner</p>
                <p className="text-text font-mono text-sm">
                  {shortenAddress(product.onChain.owner)}
                  <a
                    href={`${blockExplorerUrl}/address/${product.onChain.owner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-cta hover:text-cta/80 inline-flex items-center"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-text/60 text-sm">Description</p>
                <p className="text-text">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Blockchain details */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-text mb-4">Blockchain Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-text/60 text-sm">Created At</p>
                <p className="text-text">
                  {new Date(Number(product.onChain.createTime) * 1000).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Last Updated</p>
                <p className="text-text">
                  {new Date(Number(product.onChain.updateTime) * 1000).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Transaction Hash</p>
                <p className="text-text font-mono text-xs break-all">{product.transactionHash}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Data Hash</p>
                <p className="text-text font-mono text-xs break-all">{product.onChain.dataHash}</p>
              </div>
            </div>
          </div>

          {/* Event history */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-text">Event History</h2>
              <button className="text-cta text-sm hover:text-cta/80 transition-colors flex items-center">
                <FaHistory className="mr-1" /> Full History
              </button>
            </div>
            <div className="space-y-4">
              {productHistory.map((event, index) => (
                <div
                  key={index}
                  className={`relative pl-6 pb-4 ${index === productHistory.length - 1 ? '' : 'border-l border-cta/20'}`}
                >
                  <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-cta/30 border border-cta"></div>
                  <p className="text-text font-medium">{event.event}</p>
                  <div className="flex justify-between text-sm text-text/60 mt-1">
                    <span>{event.date}</span>
                    <span>{event.by}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* QR Code */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
            <h2 className="text-lg font-medium text-text mb-4">Product QR Code</h2>
            <div className="bg-white p-3 rounded-lg mb-4 flex items-center justify-center">
              {qrCodeData && (
                <QRCodeSVG
                  id="product-qr-code"
                  value={qrCodeData}
                  size={160}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: "/icon-black.jpg",
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              )}
            </div>
            <button
              onClick={downloadQrCode}
              className="w-full py-2 bg-cta/10 hover:bg-cta/20 text-cta border border-cta/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <FaDownload className="mr-2" /> Download QR Code
            </button>
          </div>

          {/* Transfer Ownership */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-text mb-4">Transfer Ownership</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-text/90 mb-1 text-sm">Recipient Address</label>
                <input
                  type="text"
                  value={transferTarget}
                  onChange={(e) => setTransferTarget(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 bg-background/50 border border-cta/20 rounded-md focus:outline-none focus:border-cta/50 font-mono text-sm"
                />
              </div>
              <button
                onClick={handleTransferOwnership}
                disabled={isTransferring || !transferTarget.trim()}
                className="w-full py-2 bg-cta/10 hover:bg-cta/20 text-cta border border-cta/30 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTransferring ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Transferring...
                  </>
                ) : (
                  <>
                    <FaExchangeAlt className="mr-2" /> Transfer Ownership
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-text mb-4">Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="w-full py-2 bg-background/30 hover:bg-background/50 text-text border border-cta/10 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaEdit className="mr-2" /> Update Information
              </button>
              <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-lg flex items-center justify-center transition-colors">
                <FaTimesCircle className="mr-2" /> Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-panel border border-cta/20 rounded-2xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-medium text-text mb-6">Product Verification QR Code</h2>

            <div className="flex flex-col items-center mb-6">
              <div className="bg-white p-6 rounded-xl mb-6">
                {qrCodeData && (
                  <QRCodeSVG
                    id="product-qr-modal-code"
                    value={qrCodeData}
                    size={240}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: "/icon-black.jpg",
                      height: 36,
                      width: 36,
                      excavate: true,
                    }}
                  />
                )}
              </div>

              <p className="text-text/70 text-center text-sm mb-4">
                Scan this QR code to verify the authenticity of the product on the blockchain
              </p>

              <button
                onClick={downloadQrCode}
                className="px-6 py-2 bg-cta/10 hover:bg-cta/20 text-cta border border-cta/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaDownload className="mr-2" /> Download QR Code
              </button>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowQrModal(false)}
                className="px-6 py-2 bg-background/50 hover:bg-background text-text border border-cta/20 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Product Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-panel max-w-lg w-full rounded-xl shadow-lg">
            <UpdateProduct
              product={product}
              onUpdateComplete={handleUpdateComplete}
              onCancel={() => setShowUpdateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;