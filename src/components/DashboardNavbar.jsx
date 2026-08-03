import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import siteLogo from "../assets/images/site-logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { FaSearch } from "react-icons/fa";
const navLinks = [
  { name: "Dashboard", scrollTo: "dashboard" },
  { name: "Find Talent", scrollTo: "find-talent" },
  { name: "Notifications", scrollTo: "notifications" },
  // { name: "FAQ's", path: "/faqs", isRoute: true },
];

const history = {
  scrollTarget: null,
};

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

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

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const closeSignupModal = () => setIsSignupModalOpen(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef();

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);
  return (
    <nav className="bg-black fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            <img src={siteLogo} alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex text-white xl:text-p3 text-p4 font-medium xl:space-x-6 space-x-3 items-center">
            {navLinks.map((link) => (
              <span
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`cursor-pointer text-p4 transition ${
                  activeSection === link.scrollTo
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                {link.name}
              </span>
            ))}
            <button
              onClick={toggleSearch}
              className="text-white hover:text-yellow-400 transition"
            >
              <FaSearch size={20} />
            </button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-transparent border border-yellow-400 px-3 py-1 rounded-md text-white outline-none placeholder-white"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden text-white">
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
            className="lg:hidden bg-black text-white px-6 pt-4 pb-6 space-y-4"
          >
            {navLinks.map((link) => (
              <span
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`block text-p5 cursor-pointer transition ${
                  activeSection === link.scrollTo
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                {link.name}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </nav>
  );
};

export default DashboardNavbar;
