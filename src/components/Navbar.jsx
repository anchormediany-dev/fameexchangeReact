import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import siteLogo from "../assets/images/site-logo.png";
const navLinks = [
  "Trading Chart",
  "Videos",
  "20 Top Talent Tokens",
  "NFT",
  "In-Verse",
  "Futured",
  "FAQ's",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/">
            <img src={siteLogo} alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((text) => (
              <Link
                key={text}
                to="/"
                className="text-sm hover:text-yellow-400 transition"
              >
                {text}
              </Link>
            ))}
            <Link to="/login" className="text-sm opacity-80 hover:text-yellow-400">
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-primary hover:bg-yellow-600 text-dark font-medium text-sm px-4 py-2 rounded"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black text-white px-6 pt-4 pb-6 space-y-4"
          >
            {navLinks.map((text) => (
              <Link
                key={text}
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-sm hover:text-yellow-400"
              >
                {text}
              </Link>
            ))}
            <Link to="/login" className="block text-sm opacity-80 hover:text-yellow-400">
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-medium text-sm px-4 py-2 rounded"
            >
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
