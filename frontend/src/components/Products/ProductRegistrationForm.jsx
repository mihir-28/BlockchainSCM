import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaSave, FaEthereum } from 'react-icons/fa';
import web3Service from '../../services/web3Service';

const ProductRegistrationForm = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: currentUser?.company || '',
    origin: '',
    status: 'Active',
    description: ''
  });
  const [errors, setErrors] = useState({});

  // Connect to blockchain on component mount
  useEffect(() => {
    const connectToBlockchain = async () => {
      try {
        const connected = await web3Service.initWeb3();
        const web3Instance = web3Service.getWeb3();
        const currentAccount = web3Instance ? await web3Service.getCurrentAccount() : null;

        // Only consider connected if we have all three: connection, web3 instance, and account
        const fullyConnected = connected && !!web3Instance && !!currentAccount;
        setIsConnected(fullyConnected);

        if (currentAccount) {
          setAccount(currentAccount);
        }
      } catch (err) {
        console.error('Error connecting to blockchain:', err);
        setIsConnected(false);
      }
    };

    connectToBlockchain();
  }, []);

  const countries = [
    'United States', 'China', 'India', 'Brazil', 'Germany', 'Japan',
    'United Kingdom', 'France', 'Italy', 'Canada', 'South Korea', 'Australia',
    'Spain', 'Mexico', 'Indonesia', 'Netherlands', 'Saudi Arabia', 'Turkey',
    'Switzerland', 'Colombia', 'Singapore', 'Peru',
  ].sort();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Product name is required";
      isValid = false;
    }

    if (!formData.manufacturer.trim()) {
      tempErrors.manufacturer = "Manufacturer is required";
      isValid = false;
    }

    if (!formData.origin) {
      tempErrors.origin = "Origin country is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Create blockchain data hash from product details
        const web3 = web3Service.getWeb3();
        const dataHash = web3.utils.sha3(JSON.stringify({
          name: formData.name,
          manufacturer: formData.manufacturer,
          origin: formData.origin,
          description: formData.description,
          status: formData.status,
          timestamp: Date.now()
        }));

        // Log the parameters being sent to ensure origin is included
        console.log("Sending to blockchain:", {
          name: formData.name,
          manufacturer: formData.manufacturer,
          origin: formData.origin,
          description: formData.description,
          dataHash
        });

        // Create product on blockchain with origin parameter
        const result = await web3Service.createProduct(
          formData.name,
          formData.manufacturer,
          formData.origin,
          formData.description,
          dataHash
        );

        console.log("Product registered on blockchain:", result);

        // Extract product ID from blockchain transaction
        let productId;
        if (result.events && result.events.ProductCreated) {
          productId = result.events.ProductCreated.returnValues.productId;
          // Format BigInt productId to string if needed
          if (typeof productId === 'bigint') {
            productId = productId.toString();
          }
        }

        // You would typically send additional product details to your backend here
        // For now just log it and navigate
        console.log("Additional product details:", {
          blockchainId: productId,
          name: formData.name,
          manufacturer: formData.manufacturer,
          origin: formData.origin,
          status: formData.status,
          description: formData.description,
          registrationDate: new Date().toISOString(),
          transactionHash: result.transactionHash,
        });

        // Show success message and redirect
        alert('Product successfully registered on blockchain!');
        navigate('/dashboard/products');
      } catch (error) {
        console.error("Error registering product:", error);
        alert('Failed to register product on blockchain. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard/products')}
              className="mr-4 text-text/60 hover:text-cta transition-colors"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-2xl font-semibold text-text">Register New Product</h1>
          </div>

          {/* Show blockchain connection status - responsive layout */}
          <div className={`px-3 py-1.5 mt-2 sm:mt-0 rounded-full text-sm flex items-center w-fit ${isConnected && account ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
            <FaEthereum className="mr-1.5 flex-shrink-0" />
            <span>{isConnected && account ? 'Blockchain Connected' : 'Not Connected'}</span>
          </div>
        </div>
      </div>

      <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm">
        {!isConnected || !account ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-500">Please connect to the blockchain to register products.</p>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-green-500">Connected with account: {account}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-text/90 mb-1 text-sm">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background border ${errors.name ? 'border-red-500/50' : 'border-cta/20'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30`}
                placeholder="e.g. Organic Coffee Beans"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Manufacturer */}
            <div>
              <label htmlFor="manufacturer" className="block text-text/90 mb-1 text-sm">
                Manufacturer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background border ${errors.manufacturer ? 'border-red-500/50' : 'border-cta/20'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30`}
                placeholder="e.g. Your Company Name"
              />
              {errors.manufacturer && (
                <p className="text-red-500 text-xs mt-1">{errors.manufacturer}</p>
              )}
            </div>

            {/* Country of Origin */}
            <div>
              <label htmlFor="origin" className="block text-text/90 mb-1 text-sm">
                Country of Origin <span className="text-red-500">*</span>
              </label>
              <select
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background border ${errors.origin ? 'border-red-500/50' : 'border-cta/20'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30`}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin}</p>}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-text/90 mb-1 text-sm">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-text/90 mb-1 text-sm">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-background border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30"
                placeholder="Provide a detailed description of the product..."
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/dashboard/products')}
              className="mr-4 px-6 py-3 bg-background/50 border border-cta/10 text-text rounded-lg hover:bg-background/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isConnected}
              className={`px-6 py-3 ${isConnected
                ? 'bg-cta hover:bg-cta/90'
                : 'bg-gray-400 cursor-not-allowed'
                } text-background font-medium rounded-lg transition-colors flex items-center justify-center`}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <FaSave className="mr-2" /> Register on Blockchain
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductRegistrationForm;