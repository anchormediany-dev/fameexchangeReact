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

const Navbar3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
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
    setActiveRoute(location.pathname);
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

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={siteLogo} alt="Logo" className="h-14" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <span
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`cursor-pointer text-white hover:text-yellow-400 ${
                  activeSection === link.scrollTo ? "text-yellow-400" : ""
                }`}
              >
                {link.name}
              </span>
            ))}

            {/* Improved Search */}
            <form onSubmit={handleSearch} className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-10 py-2 rounded-md text-sm text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  &#x2715;
                </button>
              )}
            </form>

            {/* Profile */}
            <MdOutlinePerson
              className="text-white text-2xl cursor-pointer"
              onClick={openLoginModal}
            />
          </div>

          {/* Mobile Toggle */}
          <div className="xl:hidden flex gap-3 items-center">
            <MdOutlinePerson
              className="text-white text-2xl"
              onClick={openLoginModal}
            />
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-black px-6 pt-3 pb-6 space-y-3"
            >
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-10 py-2 rounded-md text-sm text-black bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    &#x2715;
                  </button>
                )}
              </form>

              {/* Nav Links */}
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`cursor-pointer text-white hover:text-yellow-400 ${
                    activeSection === link.scrollTo ? "text-yellow-400" : ""
                  }`}
                >
                  {link.name}
                </div>
              ))}

              {/* Auth Actions */}
              <div className="pt-3 border-t border-gray-700">
                <button
                  onClick={openLoginModal}
                  className="text-white hover:text-yellow-400 w-full text-left"
                >
                  Login
                </button>
                <button
                  onClick={openSignupModal}
                  className="text-white hover:text-yellow-400 w-full text-left"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/forgot-password");
                  }}
                  className="text-sm text-gray-300 underline w-full text-left mt-1"
                >
                  Forgot username/password?
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </>
  );
};

export default Navbar3;
