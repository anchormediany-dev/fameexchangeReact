import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import siteLogo from "../assets/images/site-logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { MdOutlinePerson } from "react-icons/md";

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

const history = {
  scrollTarget: null,
};

const Navbar3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1 + i * 0.05,
        ease: "easeOut",
      },
    }),
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3, delay: 0.1 },
      },
    },
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
        ease: "easeOut",
      },
    }),
  };

  const navbarVariants = {
    visible: {
      backgroundColor: "rgba(0, 0, 0, 1)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      height: "90px",
    },
  };

  const searchInputVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      width: "0%",
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setShowMobileSearch(false);
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

  useEffect(() => {
    if (location.pathname === "/" && history.scrollTarget) {
      const id = history.scrollTarget;
      setTimeout(() => handleScroll(id), 200);
      history.scrollTarget = null;
    }
    setActiveRoute(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.innerHeight / 2;

      let currentSection = null;
      navLinks.forEach(({ scrollTo }) => {
        if (!scrollTo) return;
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

  // Set loaded state for entrance animations
  useEffect(() => {
    setLoaded(true);
  }, []);

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

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        id="home"
        className="fixed w-full flex z-50"
        initial="visible"
        animate="visible"
        variants={navbarVariants}
      >
        <div className="container px-4">
          <div className="flex justify-between items-center h-full">
            {/* Logo with animation */}
            <motion.div
              initial="hidden"
              animate={loaded ? "visible" : "hidden"}
              variants={logoVariants}
            >
              <Link
                to="/"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
                className="inline-block"
              >
                <img
                  src={siteLogo}
                  alt="Logo"
                  className="h-16 transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </motion.div>

            {/* Desktop Nav Links with staggered animation */}
            <div className="hidden lg:flex font-navlink xl:space-x-6 space-x-3 items-center">
              {navLinks.map((link, i) => (
                <motion.span
                  key={link.name}
                  custom={i}
                  initial="hidden"
                  animate={loaded ? "visible" : "hidden"}
                  variants={navItemVariants}
                  onClick={() => handleNavClick(link)}
                  className={`cursor-pointer transition-colors relative ${
                    link.isRoute
                      ? activeRoute === link.path
                        ? "text-primary"
                        : "text-white hover:text-primary"
                      : activeSection === link.scrollTo
                      ? "text-primary"
                      : "text-white hover:text-primary"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                  {/* Animated underline effect */}
                  {(link.isRoute
                    ? activeRoute === link.path
                    : activeSection === link.scrollTo) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                      layoutId="navUnderline"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.span>
              ))}
            </div>

            {/* Desktop Search and Profile with animation */}
            <motion.div
              initial="hidden"
              animate={loaded ? "visible" : "hidden"}
              variants={navItemVariants}
              custom={navLinks.length}
              className="hidden lg:flex gap-5 items-center"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 text-gray-400 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400"
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(224, 170, 13, 0.3)",
                    }}
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </form>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
                onClick={openLoginModal}
              >
                <MdOutlinePerson className="text-white" size={32} />
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button with animation */}
            <motion.div
              initial="hidden"
              animate={loaded ? "visible" : "hidden"}
              variants={navItemVariants}
              custom={navLinks.length}
              className="lg:hidden flex items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="text-white"
              >
                <FaSearch size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-white"
              >
                {isOpen ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes size={24} />
                  </motion.div>
                ) : (
                  <FaBars size={24} />
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Search Bar with animation */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={searchInputVariants}
              className="lg:hidden bg-black p-4"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 text-gray-400 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400"
                    autoFocus
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu with animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="lg:hidden bg-black overflow-hidden"
            >
              <div className="px-6 pt-4 pb-6 space-y-4">
                {navLinks.map((link, i) => (
                  <motion.span
                    key={link.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={mobileNavItemVariants}
                    onClick={() => handleNavClick(link)}
                    className={`block font-navlink cursor-pointer transition ${
                      link.isRoute
                        ? activeRoute === link.path
                          ? "text-primary"
                          : "text-white hover:text-primary"
                        : activeSection === link.scrollTo
                        ? "text-primary"
                        : "text-white hover:text-primary"
                    }`}
                    whileTap={{ scale: 0.97, x: 2 }}
                  >
                    {link.name}
                  </motion.span>
                ))}
                <motion.div
                  className="pt-4"
                  custom={navLinks.length}
                  initial="hidden"
                  animate="visible"
                  variants={mobileNavItemVariants}
                >
                  <motion.button
                    onClick={openLoginModal}
                    className="flex items-center gap-2 text-white"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdOutlinePerson size={24} />
                    <span>Account</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </>
  );
};

export default Navbar3;
