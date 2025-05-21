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

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
      <nav
        id="home"
        className="absolute w-full z-50 bg-transparent transition-all duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-[80px]">
            <Link
              to="/"
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }
            >
              <img src={siteLogo} alt="Logo" className="h-12" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex font-navlink xl:space-x-6 space-x-3 items-center">
              {navLinks.map((link) => (
                <span
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`cursor-pointer transition ${
                    link.isRoute
                      ? activeRoute === link.path
                        ? "text-primary underline"
                        : "text-white hover:text-primary"
                      : activeSection === link.scrollTo
                      ? "text-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {link.name}
                </span>
              ))}
            </div>

            {/* Desktop Search and Profile */}
            <div className="hidden lg:flex gap-5 items-center">
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
                  />
                  {searchQuery && (
                    <button
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
                    </button>
                  )}
                </div>
              </form>
              <MdOutlinePerson className="text-white" size={32} />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="text-white"
              >
                <FaSearch size={20} />
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="lg:hidden bg-black p-4">
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
                />
                {searchQuery && (
                  <button
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
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black overflow-hidden"
            >
              <div className="px-6 pt-4 pb-6 space-y-4">
                {navLinks.map((link) => (
                  <span
                    key={link.name}
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
                  >
                    {link.name}
                  </span>
                ))}
                <div className="pt-4">
                  <button
                    onClick={openLoginModal}
                    className="flex items-center gap-2 text-white"
                  >
                    <MdOutlinePerson size={24} />
                    <span>Account</span>
                  </button>
                </div>
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

export default Navbar2;
