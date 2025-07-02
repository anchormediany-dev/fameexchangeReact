import React from "react";
import { motion } from "framer-motion";
import terms from "../../data/termsData";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FiFileText, FiCalendar, FiEdit2 } from "react-icons/fi";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white relative">
      {/* Background Gradient Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#b8962d]/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8962d]/5 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      {/* Header */}
      <Navbar />

      {/* Main Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="inline-flex gradient-bg items-center justify-center px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
            <FiFileText className="text-[#171717] mr-2" />
            <span className="text-[#171717] font-medium text-sm uppercase tracking-wider">
              Terms & Conditions
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Legal <span className="gredient-text">Agreement</span>
          </h1>
          <div className="flex justify-center items-center gap-6 text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              <span>
                Effective: <span className="gredient-text">June 15, 2025</span>
              </span>
            </div>
            <div className="flex items-center">
              <FiEdit2 className="mr-2" />
              <span>
                Last updated:{" "}
                <span className="gredient-text">June 15, 2025</span>
              </span>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        {terms.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-8 bg-white/5 p-6 rounded-xl shadow-md border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[#e2cb68] text-xl">{section.icon}</div>
              <h2 className="text-xl font-semibold gradientText">
                {section.title}
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: terms.length * 0.05 + 0.1 }}
          className="mt-16 text-sm text-gray-400 border-t border-gray-700 pt-8"
        >
          <p className="font-semibold text-white text-lg mb-2">
            Contact Information
          </p>
          <p>The Fame Exchange</p>
          <p>📍 825 E Gate Blvd, Garden City, NY 11530</p>
          <p>📧 legal@thefameexchange.com</p>
          <p>📞 1-800-123-4567</p>
          <p>🌐 www.thefameexchange.com</p>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsConditions;
