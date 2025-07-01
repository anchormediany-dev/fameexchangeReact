import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import siteLogo from "../assets/images/site-logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const navLinks = [
  { name: "Home", scrollTo: "home" },
  { name: "Stocks", scrollTo: "stocks" },
  { name: "Brands", scrollTo: "brands" },
  { name: "Meet & Greet", scrollTo: "meet_greet" },
  { name: "Advertising", scrollTo: "advertising" },
  { name: "Events", scrollTo: "events" },
  { name: "About Us", scrollTo: "about_us" },
  { name: "Contact us", scrollTo: "contact_us" },
];

const history = { scrollTarget: null };

// ...imports remain unchanged

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNavClick = ({ scrollTo, path, isRoute }) => {
    setIsOpen(false);
    if (isRoute && path) {
      navigate(path);
    } else {
      if (location.pathname !== "/") {
        history.scrollTarget = scrollTo;
        navigate("/");
      } else {
        handleScroll(scrollTo);
      }
    }
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsOpen(false);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsOpen(false);
  };
  const closeSignupModal = () => setIsSignupModalOpen(false);

  useEffect(() => {
    if (location.pathname === "/" && history.scrollTarget) {
      setTimeout(() => handleScroll(history.scrollTarget), 200);
      history.scrollTarget = null;
    }
  }, [location]);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.innerHeight / 2;
      let currentSection = null;
      navLinks.forEach(({ scrollTo }) => {
        const section = document.getElementById(scrollTo);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= scrollPos && rect.bottom > scrollPos) {
            currentSection = scrollTo;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black shadow-lg font-medium text-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={siteLogo} alt="Logo" className="h-12" />
          </Link>

          <div className="hidden xl:flex items-center gap-4 ml-4">
            {navLinks.map((link) => (
              <span
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`cursor-pointer text-white text-sm hover:text-yellow-400 ${
                  activeSection === link.scrollTo ? "text-yellow-400" : ""
                }`}
              >
                {link.name}
              </span>
            ))}

            <form onSubmit={handleSearch} className="relative w-44 ml-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-8 py-1.5 rounded-full text-xs text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <FaSearch className="absolute left-2.5 top-2 text-gray-400 text-sm" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-sm"
                >
                  &#x2715;
                </button>
              )}
            </form>

            <button
              onClick={openLoginModal}
              className="custom-button-outline !py-1"
            >
              Login
            </button>
            <button
              onClick={openSignupModal}
              className="custom-button-two rounded-full !py-1"
            >
              Sign Up
            </button>
          </div>

          <div className="xl:hidden flex gap-2 items-center">
            <MdOutlinePerson
              className="text-white text-xl"
              onClick={openLoginModal}
            />
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-black px-4 pt-2 pb-4 space-y-2"
            >
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-8 py-2 rounded text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-sm" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    &#x2715;
                  </button>
                )}
              </form>

              {navLinks.map((link) => (
                <div
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`cursor-pointer text-white text-sm hover:text-yellow-400 ${
                    activeSection === link.scrollTo ? "text-yellow-400" : ""
                  }`}
                >
                  {link.name}
                </div>
              ))}

              <div className="pt-2 border-t border-gray-700 space-y-1">
                <button
                  onClick={openLoginModal}
                  className="text-white text-sm hover:text-yellow-400 w-full text-left"
                >
                  Login
                </button>
                <button
                  onClick={openSignupModal}
                  className="text-white text-sm hover:text-yellow-400 w-full text-left"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/forgot-password");
                  }}
                  className="text-xs text-gray-300 underline w-full text-left mt-1"
                >
                  Forgot username/password?
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </>
  );
};

export default Navbar;
