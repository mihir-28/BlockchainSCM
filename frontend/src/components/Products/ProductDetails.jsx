import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaQrcode, FaHistory, FaDownload } from 'react-icons/fa';
import { products } from '../../data/mockData'; // Import products from mockData

// We'll keep the detailed sample products for now as they have more information
// than the basic products in mockData
const detailedProducts = [
  { 
    id: 'PRD001', 
    name: 'Organic Coffee Beans', 
    serialNumber: 'SN7824501', 
    origin: 'Colombia', 
    dateAdded: '2023-05-15', 
    status: 'Active',
    description: 'Premium organic coffee beans sourced directly from local farmers.',
    manufacturingDate: '2023-04-10',
    batchNumber: 'B10045',
    expiryDate: '2024-04-10',
    category: 'Food & Beverage',
    subcategory: 'Coffee',
    weight: '500g',
    dimensions: '15cm x 10cm x 5cm',
    certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance'],
    supplier: 'Colombian Coffee Collective',
    blockchainInfo: {
      transactionHash: '0x7c8b5d29cb3fa8ec13a47454681b3c8b12b141a56c9a1e5f77d6c37c17300803',
      blockNumber: 8573921,
      timestamp: '2023-05-15 14:32:45'
    },
    history: [
      { event: 'Product Registered', date: '2023-05-15 14:32:45', by: 'Coffee Producers Inc.' },
      { event: 'Quality Verification', date: '2023-05-16 10:15:22', by: 'Quality Control Dept.' },
      { event: 'Shipment Initiated', date: '2023-05-18 08:45:11', by: 'Logistics Department' }
    ]
  },
  { 
    id: 'PRD002', 
    name: 'Premium Tea Leaves', 
    serialNumber: 'SN9361507', 
    origin: 'India', 
    dateAdded: '2023-05-22', 
    status: 'Active',
    description: 'High-quality tea leaves harvested from the highlands of Darjeeling.',
    manufacturingDate: '2023-05-01',
    batchNumber: 'B10062',
    expiryDate: '2024-05-01',
    category: 'Food & Beverage',
    subcategory: 'Tea',
    weight: '250g',
    dimensions: '12cm x 8cm x 4cm',
    certifications: ['Organic', 'GMO-Free'],
    supplier: 'Darjeeling Tea Estates',
    blockchainInfo: {
      transactionHash: '0x9a7d3e5f8c21b4d6a2e7f9c0b1d2a3e4f5c6b7a8d9e0f1c2b3a4d5e6f7a8c9b0d1',
      blockNumber: 8574532,
      timestamp: '2023-05-22 11:45:32'
    },
    history: [
      { event: 'Product Registered', date: '2023-05-22 11:45:32', by: 'Darjeeling Tea Estates' },
      { event: 'Quality Verification', date: '2023-05-23 09:30:15', by: 'Quality Control Dept.' },
      { event: 'Packaging Completed', date: '2023-05-24 14:22:05', by: 'Production Dept.' },
      { event: 'Shipment Initiated', date: '2023-05-26 08:15:43', by: 'Logistics Department' }
    ]
  },
  { 
    id: 'PRD003', 
    name: 'Organic Cacao Nibs', 
    serialNumber: 'SN5243876', 
    origin: 'Peru', 
    dateAdded: '2023-06-05', 
    status: 'Active',
    description: 'Raw cacao nibs from sustainably grown cacao beans in Peru.',
    manufacturingDate: '2023-05-20',
    batchNumber: 'B10078',
    expiryDate: '2024-11-20',
    category: 'Food & Beverage',
    subcategory: 'Cacao Products',
    weight: '350g',
    dimensions: '14cm x 9cm x 4cm',
    certifications: ['Organic', 'Fair Trade', 'Non-GMO'],
    supplier: 'Peruvian Cacao Collective',
    blockchainInfo: {
      transactionHash: '0xe3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
      blockNumber: 8578921,
      timestamp: '2023-06-05 10:23:17'
    },
    history: [
      { event: 'Product Registered', date: '2023-06-05 10:23:17', by: 'Peruvian Cacao Collective' },
      { event: 'Quality Verification', date: '2023-06-06 13:45:22', by: 'Quality Control Dept.' },
      { event: 'Packaging Completed', date: '2023-06-07 11:32:45', by: 'Production Dept.' },
      { event: 'Shipment Initiated', date: '2023-06-09 07:55:18', by: 'Logistics Department' },
      { event: 'Shipment Received', date: '2023-06-15 14:22:31', by: 'Distribution Center' }
    ]
  }
];

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  
  // Try to match by ID - case-insensitive to be more forgiving
  let product = detailedProducts.find(
    p => p.id.toLowerCase() === productId.toLowerCase()
  );
  
  // If not found, look in the basic products from mockData
  if (!product) {
    const basicProduct = products.find(
      p => p.id.toLowerCase() === productId.toLowerCase()
    );
    
    if (basicProduct) {
      // Create a more detailed version for display
      product = {
        ...basicProduct,
        serialNumber: `SN${Math.floor(Math.random() * 9000000) + 1000000}`,
        description: `${basicProduct.name} from ${basicProduct.manufacturer}`,
        batchNumber: `B${Math.floor(Math.random() * 90000) + 10000}`,
        expiryDate: '2024-12-31',
        category: 'General Products',
        subcategory: basicProduct.origin,
        weight: 'N/A',
        dimensions: 'N/A',
        certifications: ['Quality Assured'],
        supplier: basicProduct.manufacturer,
        blockchainInfo: {
          transactionHash: basicProduct.transactionHash || '0x0000...0000',
          blockNumber: Math.floor(Math.random() * 9000000) + 1000000,
          timestamp: basicProduct.registrationDate
        },
        history: [
          { event: 'Product Registered', date: basicProduct.registrationDate, by: basicProduct.manufacturer }
        ]
      };
    }
  }
  
  // If product not found
  if (!product) {
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
          <p className="text-text/60">The requested product could not be found.</p>
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
  
  // Render product details
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
          <button className="bg-cta/10 border border-cta/20 text-cta rounded-lg px-4 py-2 text-sm flex items-center hover:bg-cta/20 transition-colors">
            <FaQrcode className="mr-2" /> Generate QR
          </button>
          <button className="bg-panel/60 border border-cta/20 text-text rounded-lg px-4 py-2 text-sm flex items-center hover:bg-panel transition-colors">
            <FaDownload className="mr-2" /> Export Data
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main product info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic details */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-text">Product Details</h2>
              <div className={`px-3 py-1 rounded-full text-sm flex items-center ${
                product.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {product.status === 'Active' ? (
                  <><FaCheckCircle className="mr-1" /> Active</>
                ) : (
                  <><FaTimesCircle className="mr-1" /> Inactive</>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-text/60 text-sm">Product ID</p>
                <p className="text-text">{product.id}</p>
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
                <p className="text-text">{product.dateAdded}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Batch Number</p>
                <p className="text-text">{product.batchNumber}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Expiry Date</p>
                <p className="text-text">{product.expiryDate}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-text/60 text-sm">Description</p>
                <p className="text-text">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Additional details */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-text mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-text/60 text-sm">Category</p>
                <p className="text-text">{product.category}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Subcategory</p>
                <p className="text-text">{product.subcategory}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Weight</p>
                <p className="text-text">{product.weight}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Dimensions</p>
                <p className="text-text">{product.dimensions}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Manufacturing Date</p>
                <p className="text-text">{product.manufacturingDate}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Supplier</p>
                <p className="text-text">{product.supplier}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-text/60 text-sm">Certifications</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.certifications.map((cert, index) => (
                    <span 
                      key={index}
                      className="bg-cta/10 text-cta px-3 py-1 rounded-full text-xs"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Event history */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-text">Event History</h2>
              <button className="text-cta text-sm hover:text-cta/80 transition-colors flex items-center">
                <FaHistory className="mr-1" /> Full History
              </button>
            </div>
            <div className="space-y-4">
              {product.history.map((event, index) => (
                <div 
                  key={index}
                  className={`relative pl-6 pb-4 ${
                    index === product.history.length - 1 ? '' : 'border-l border-cta/20'
                  }`}
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
        
        {/* Blockchain info and QR code */}
        <div className="space-y-6">
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-text mb-4">Blockchain Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-text/60 text-sm">Transaction Hash</p>
                <p className="text-cta text-sm font-mono break-all">{product.blockchainInfo.transactionHash}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Block Number</p>
                <p className="text-text">{product.blockchainInfo.blockNumber}</p>
              </div>
              <div>
                <p className="text-text/60 text-sm">Timestamp</p>
                <p className="text-text">{product.blockchainInfo.timestamp}</p>
              </div>
              <div className="pt-2 mt-2 border-t border-cta/10">
                <a 
                  href={`https://etherscan.io/tx/${product.blockchainInfo.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cta text-sm hover:text-cta/80 flex items-center"
                >
                  View on Explorer 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm text-center">
            <h2 className="text-lg font-medium text-text mb-4">QR Code</h2>
            <div className="bg-white p-4 mx-auto w-48 h-48 flex items-center justify-center rounded-lg shadow-sm">
              {/* Placeholder for QR code - in a real app, you would generate this dynamically */}
              <div className="grid grid-cols-10 grid-rows-10 gap-0.5">
                {Array(100).fill().map((_, i) => (
                  <div 
                    key={i}
                    className={`w-3 h-3 ${Math.random() > 0.3 ? 'bg-black' : 'bg-white'}`}
                  ></div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-text/60 text-sm">Scan to verify product authenticity</p>
            <button className="mt-2 text-cta text-sm hover:text-cta/80 transition-colors">
              Download QR Code
            </button>
          </div>
          
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-text mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-2 bg-cta/10 hover:bg-cta/20 text-cta border border-cta/30 rounded-lg flex items-center justify-center transition-colors">
                <FaHistory className="mr-2" /> Transfer Ownership
              </button>
              <button className="w-full py-2 bg-background/30 hover:bg-background/50 text-text border border-cta/10 rounded-lg flex items-center justify-center transition-colors">
                <FaQrcode className="mr-2" /> Update Status
              </button>
              <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-lg flex items-center justify-center transition-colors">
                <FaTimesCircle className="mr-2" /> Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;