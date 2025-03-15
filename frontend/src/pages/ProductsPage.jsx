import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useOutletContext } from 'react-router-dom';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';
import ProductRegistrationForm from '../components/Products/ProductRegistrationForm';
import ProductsList from '../components/Products/ProductsList';
import ProductDetails from '../components/Products/ProductDetails';
import { products } from '../data/mockData'; // Import products from mockData

const ProductsPage = () => {
  // Get currentUser from the outlet context
  const { currentUser } = useOutletContext() || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    origin: '',
    dateFrom: '',
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Initialize filteredProducts with all products
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // Get unique origins for the filter dropdown
  const uniqueOrigins = [...new Set(products.map(product => product.origin))];

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Function to reset all filters
  const resetFilters = () => {
    setFilters({
      status: '',
      origin: '',
      dateFrom: '',
    });
    setSearchTerm('');
  };

  // Filter products based on search term and filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowercasedSearch) ||
        product.id.toLowerCase().includes(lowercasedSearch) ||
        product.manufacturer.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(product => 
        product.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    
    // Apply origin filter
    if (filters.origin) {
      result = result.filter(product => 
        product.origin === filters.origin
      );
    }
    
    // Apply date filter
    if (filters.dateFrom) {
      const filterDate = new Date(filters.dateFrom);
      result = result.filter(product => {
        const productDate = new Date(product.registrationDate);
        return productDate >= filterDate;
      });
    }
    
    setFilteredProducts(result);
  }, [searchTerm, filters]);

  return (
    <Routes>
      <Route path="/" element={
        <div className="space-y-6">
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-text">Product Management</h2>
                <p className="text-text/60 text-sm">Register and manage your products on the blockchain</p>
              </div>
              <button 
                onClick={() => navigate('/dashboard/products/new')}
                className="bg-cta hover:bg-cta/90 text-background font-medium rounded-lg px-4 py-2 flex items-center transition-colors"
              >
                <FaPlus className="mr-2" /> Register New Product
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-background/50 border border-cta/10 rounded-lg py-2 pl-10 pr-4 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
                />
                <FaSearch className="absolute left-3 top-3 text-text/50" />
              </div>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="bg-background/50 border border-cta/10 rounded-lg px-4 py-2 text-text flex items-center hover:border-cta/30 transition-all"
              >
                <FaFilter className="mr-2 text-cta" /> Filters
              </button>
            </div>
            
            {filterOpen && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-text/70 text-sm mb-1">Status</label>
                  <select 
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full bg-background/50 border border-cta/10 rounded-lg py-2 px-3 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text/70 text-sm mb-1">Origin</label>
                  <select 
                    name="origin"
                    value={filters.origin}
                    onChange={handleFilterChange}
                    className="w-full bg-background/50 border border-cta/10 rounded-lg py-2 px-3 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
                  >
                    <option value="">All Origins</option>
                    {uniqueOrigins.map(origin => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-text/70 text-sm mb-1">Date From</label>
                  <input
                    type="date"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    className="w-full bg-background/50 border border-cta/10 rounded-lg py-2 px-3 text-text focus:outline-none focus:ring-1 focus:ring-cta/30"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full bg-background/50 border border-cta/10 rounded-lg px-4 py-2 text-text/80 hover:text-text transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Products List with filtered results */}
          <ProductsList products={filteredProducts} />
          
          {/* Show message when no products match filters */}
          {filteredProducts.length === 0 && (
            <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-8 text-center mt-6">
              <p className="text-text/60">No products match your search criteria</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-cta/10 text-cta border border-cta/20 rounded-lg hover:bg-cta/20 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      } />
      <Route path="/new" element={<ProductRegistrationForm currentUser={currentUser} />} />
      <Route path="/:productId" element={<ProductDetails />} />
    </Routes>
  );
};

export default ProductsPage;