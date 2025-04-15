import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import siteLogo from "../assets/images/site-logo.png";
const navLinks = [
  { name: "Trading Chart", path: "/trading-chart" },
  { name: "Videos", path: "/videos" },
  { name: "20 Top Talent Tokens", path: "/talent-tokens" },
  { name: "NFT", path: "/nft" },
  { name: "In-Verse", path: "/in-verse" },
  { name: "Futured", path: "/futured" },
  { name: "FAQ's", path: "/faqs" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="flex  justify-between items-center h-20">
          {/* Logo */}
          <Link to="/">
            <img src={siteLogo} alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex text-white xl:text-p3 text-p4 font-medium xl:space-x-6 space-x-3 items-center">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="text-p4 hover:text-primary transition"
              >
                {name}
              </Link>
            ))}
            <Link
              to="/login"
              className="relative inline-block text-p5 font-medium text-white group overflow-hidden px-5 py-2"
            >
              <span className="absolute inset-0 w-full h-full bg-primary transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0"></span>
              <span className="absolute inset-0 border border-primary rounded"></span>
              <span className="relative z-10">Log In</span>
            </Link>
            <Link
              to="/signup"
              className="relative inline-block text-p5 font-medium text-black bg-primary px-5 py-2 rounded hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <span className="relative z-10">Sign Up</span>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden text-white">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-black text-white px-6 pt-4 pb-6 space-y-4"
          >
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setIsOpen(false)}
                className="block text-p5 hover:text-primary"
              >
                {name}
              </Link>
            ))}

            {/* Mobile Buttons */}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-p5 font-medium text-white border border-primary px-4 py-2 rounded hover:bg-primary hover:text-black transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block text-p5 font-medium bg-primary text-black px-4 py-2 rounded hover:bg-primary transition"
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
