import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaArrowRight,
  FaEnvelope,
  FaCommentAlt,
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import NetworkAnimation from '../components/Common/NetworkAnimation';
import { supportCategories, knowledgeBaseArticles, quickStartGuides } from '../data/supportdata';
import emailjs from '@emailjs/browser';

const SupportPage = () => {
  const [messageStatus, setMessageStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedGuideId, setExpandedGuideId] = useState(null);
  const formRef = useRef();

  // Form submission handler using EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        setMessageStatus({
          success: true,
          message: "Your message has been sent! We'll get back to you soon."
        });
        formRef.current.reset();
        setIsSubmitting(false);
      }, (error) => {
        setMessageStatus({
          success: false,
          message: "Something went wrong. Please try again later."
        });
        setIsSubmitting(false);
      });
  };

  // Toggle expanded guide
  const toggleGuide = (id) => {
    setExpandedGuideId(expandedGuideId === id ? null : id);
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
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cta mb-6">How Can We Help You?</h1>
          <p className="text-text/80 max-w-3xl mx-auto">
            Find answers, learn about our blockchain supply chain platform, and get help from our support team.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles, tutorials, and more..."
              className="w-full px-5 py-4 pl-12 bg-background/60 border border-cta/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cta">
              <FaSearch />
            </div>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-cta hover:bg-cta/90 text-background font-medium py-2 px-4 rounded-lg transition-colors">
              Search
            </button>
          </div>
        </motion.div>

        {/* Support Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {supportCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/10 p-6 hover:border-cta/30 hover:bg-panel/30 transition-all duration-300 text-center flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-full bg-cta/10 flex items-center justify-center mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-cta mb-2">{category.title}</h3>
              <p className="text-text/70 text-sm mb-5">{category.description}</p>
              <Link
                to={category.link}
                className="mt-auto inline-flex items-center text-cta hover:text-cta/80 transition-colors text-sm font-medium"
              >
                Learn More <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Knowledge Base */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-cta mb-4">Knowledge Base</h2>
            <p className="text-text/80 max-w-2xl mx-auto">
              In-depth articles and guides to help you get the most out of our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {knowledgeBaseArticles.map((article, index) => (
              <motion.a
                key={index}
                href="#"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/10 p-5 hover:border-cta/30 hover:bg-panel/30 transition-all duration-300 block group"
              >
                <span className="text-xs font-medium text-cta/70 bg-cta/10 px-2 py-1 rounded-full">
                  {article.category}
                </span>
                <h3 className="text-lg font-display text-cta mt-3 mb-2 group-hover:text-cta/90 transition-colors">
                  {article.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-text/60 text-xs">{article.readTime}</span>
                  <FaArrowRight className="text-cta opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Start Guides (replacing Knowledge Base) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-cta mb-4">Quick Start Guides</h2>
            <p className="text-text/80 max-w-2xl mx-auto">
              Step-by-step instructions to help you get started with key platform features
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {quickStartGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleGuide(guide.id)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none hover:bg-panel/30 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="mr-4 p-2 bg-cta/10 rounded-lg">
                      {guide.icon}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-cta/70 bg-cta/10 px-2 py-1 rounded-full">
                        {guide.category}
                      </span>
                      <h3 className="text-lg font-display text-cta mt-1">
                        {guide.title}
                      </h3>
                    </div>
                  </div>
                  <div>
                    {expandedGuideId === guide.id ? (
                      <FaChevronUp className="text-cta" />
                    ) : (
                      <FaChevronDown className="text-cta" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedGuideId === guide.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-cta/10"
                    >
                      <div className="px-6 py-5">
                        <ol className="list-decimal pl-5 space-y-2 text-text/80">
                          {guide.steps.map((step, idx) => (
                            <li key={idx} className="pl-2">{step}</li>
                          ))}
                        </ol>
                        {guide.tip && (
                          <div className="mt-4 bg-cta/10 p-3 rounded-lg text-sm">
                            <strong className="text-cta">Pro Tip:</strong> {guide.tip}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="inline-flex items-center bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 rounded-lg px-5 py-2 transition-all duration-300 font-medium"
            >
              View All FAQs <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Direct Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl font-display font-bold text-cta mb-4">Still Need Help?</h2>
          <p className="text-text/80 max-w-2xl mx-auto mb-6">
            Our support team is ready to assist you with any questions or issues you may have.
            Reach out via email or our ticketing system for personalized support.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
            <a
              href="mailto:mihirnagda28@gmail.com"
              className="bg-cta hover:bg-cta/90 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <FaEnvelope className="mr-2" /> Email Support
            </a>
            <a
              href="tel:+919137461112"
              className="bg-cta hover:bg-cta/90 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <FaCommentAlt className="mr-2" /> Live Chat
            </a>
          </div>
        </motion.div>

        {/* Quick contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-8 shadow-lg mb-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-cta mb-3">Send Us a Message</h2>
            <p className="text-text/80 max-w-2xl mx-auto">
              Have a quick question? Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="md:col-span-1">
              <label className="block text-text/70 text-sm mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-text/70 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all"
                placeholder="Your email address"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-text/70 text-sm mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all"
                placeholder="What's this about?"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-text/70 text-sm mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                className="w-full px-4 py-3 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <div className="md:col-span-2 text-center">
              {messageStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 p-3 rounded-lg ${messageStatus.success ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}
                >
                  {messageStatus.message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-cta hover:bg-cta/90 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center mx-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-text/60 text-sm"
        >
          <p>Available Monday through Friday, 9AM to 6PM (IST)</p>
          <p className="mt-2">Average response time: &lt;24 hours</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;