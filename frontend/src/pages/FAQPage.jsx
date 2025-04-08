import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaSearch, FaQuestion, FaAngleRight } from 'react-icons/fa';
import NetworkAnimation from '../components/Common/NetworkAnimation';
import { Link } from 'react-router-dom';
import { categories, faqData } from '../data/faqdata';

const FAQPage = () => {
  // State for active category and search
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  
  // Effect to handle searching and filtering
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // When no search term, show faqs from active category
      setFilteredFaqs(faqData[activeCategory] || []);
    } else {
      // When searching, combine all faqs and filter by search term
      const allFaqs = Object.values(faqData).flat();
      const filtered = allFaqs.filter(
        faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm, activeCategory]);
  
  // Toggle FAQ open/close
  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };
  
  // Change category with smooth transition
  const handleCategoryChange = (categoryId) => {
    if (activeCategory === categoryId) return;
    
    setIsChangingCategory(true);
    
    // First animate out the current content
    setTimeout(() => {
      setActiveCategory(categoryId);
      setSearchTerm('');
      setOpenFaqId(null);
      
      // Then animate in the new content after a short delay
      setTimeout(() => {
        setIsChangingCategory(false);
      }, 100);
    }, 300);
  };
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <NetworkAnimation opacity={0.15} zIndex={0} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -top-48 -left-48"></div>
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -bottom-48 -right-48"></div>
      </div>
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cta mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-text/80 max-w-3xl mx-auto">
            Find answers to common questions about our blockchain supply chain management platform.
            Can't find what you're looking for? <Link to="/contact" className="text-cta hover:text-cta/80 transition-colors">Contact our support team</Link>.
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-4 pl-12 bg-background/60 border border-cta/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cta">
              <FaSearch />
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Navigation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <nav className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-4 sticky top-24">
              <h2 className="text-xl font-display font-bold text-cta mb-4 px-2">Categories</h2>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeCategory === category.id && searchTerm === '' 
                          ? 'bg-cta/20 text-cta font-medium'
                          : 'hover:bg-panel/30 text-text/80 hover:text-text'
                      }`}
                    >
                      <span className="mr-3">{category.icon}</span>
                      {category.name}
                      {activeCategory === category.id && searchTerm === '' && (
                        <FaAngleRight className="ml-auto" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-cta/10">
                <Link 
                  to="/support"
                  className="flex items-center px-4 py-3 bg-cta/10 text-cta rounded-lg hover:bg-cta/20 transition-all duration-300"
                >
                  <FaQuestion className="mr-2" />
                  Get More Help
                </Link>
              </div>
            </nav>
          </motion.div>
          
          {/* FAQ Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {searchTerm && (
              <div className="mb-6 pb-4 border-b border-cta/10">
                <p className="text-text/70">
                  {filteredFaqs.length === 0 
                    ? `No results found for "${searchTerm}"` 
                    : `${filteredFaqs.length} result${filteredFaqs.length === 1 ? '' : 's'} for "${searchTerm}"`}
                </p>
              </div>
            )}
            
            {searchTerm.trim() === '' && (
              <motion.h2
                key={activeCategory + "-heading"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-display font-bold text-cta mb-6"
              >
                {categories.find(cat => cat.id === activeCategory)?.name || 'General'} Questions
              </motion.h2>
            )}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchTerm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="min-h-[400px]"
              >
                {filteredFaqs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-8 text-center"
                  >
                    <h3 className="text-xl font-display text-cta mb-2">No Questions Found</h3>
                    <p className="text-text/70">
                      {searchTerm 
                        ? "Try a different search term or browse by category." 
                        : "No questions available in this category yet."}
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: isChangingCategory ? 0.05 : index * 0.05 
                        }}
                        className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                        >
                          <h3 className="text-lg font-display text-cta pr-8">{faq.question}</h3>
                          {openFaqId === faq.id ? (
                            <FaChevronUp className="text-cta flex-shrink-0" />
                          ) : (
                            <FaChevronDown className="text-cta flex-shrink-0" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {openFaqId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 py-5 text-text/80 border-t border-cta/10">
                                <p>{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 bg-cta/10 border border-cta/20 rounded-xl p-6 text-center"
            >
              <h3 className="text-lg font-display font-bold text-cta mb-3">
                Still have questions?
              </h3>
              <p className="text-text/80 mb-4">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-cta hover:bg-cta/90 text-background px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;