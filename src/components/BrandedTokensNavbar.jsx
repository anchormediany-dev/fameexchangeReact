import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import siteLogo from "../assets/images/site-logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const navLinks = [
  {
    name: "Trade",
    path: "/trade",
    scrollTo: "trade",
  },
  {
    name: "BRANDED TALENT TOKENS",
    scrollTo: "branded-talent-tokens",
    hasDropdown: true,
    categories: {
      "TOP 20 TOKENS": {
        path: "/top-tokens",
        subCategories: [
          { name: "DeFi", path: "/top-tokens/defi" },
          { name: "NFTs", path: "/top-tokens/nfts" },
          { name: "Gaming", path: "/top-tokens/gaming" },
        ],
      },
      INFLUENCERS: {
        path: "/influencers",
        subCategories: [
          { name: "Instagram Influencers", path: "/influencers/instagram" },
          { name: "TikTok Stars", path: "/influencers/tiktok" },
          { name: "Twitter Personalities", path: "/influencers/twitter" },
        ],
      },
      ATHLETES: {
        path: "/athletes",
        subCategories: [
          { name: "Baseball", path: "/athletes/baseball" },
          { name: "FOOTBALL", path: "/athletes/football" },
          { name: "SOCCER", path: "/athletes/soccer" },
          { name: "NASCAR", path: "/athletes/nascar" },
          { name: "CYCLING", path: "/athletes/cycling" },
          { name: "WEIGHT LIFTING", path: "/athletes/weight-lifting" },
          { name: "POWER LIFTING", path: "/athletes/power-lifting" },
          { name: "SWIMMING", path: "/athletes/swimming" },
          { name: "RUNNING", path: "/athletes/running" },
          { name: "SKIING", path: "/athletes/skiing" },
          { name: "SURFING", path: "/athletes/surfing" },
          { name: "WRESTLING", path: "/athletes/wrestling" },
          { name: "BOXING", path: "/athletes/boxing" },
          { name: "UFC FIGHTING", path: "/athletes/ufc" },
          { name: "TENNIS", path: "/athletes/tennis" },
        ],
      },
      MODELS: {
        path: "/models",
        subCategories: [
          { name: "Fashion Week", path: "/models/fashion-week" },
          { name: "Runway", path: "/models/runway" },
          { name: "Commercial", path: "/models/commercial" },
        ],
      },
      ACTORS: {
        path: "/actors",
        subCategories: [
          { name: "Hollywood", path: "/actors/hollywood" },
          { name: "Bollywood", path: "/actors/bollywood" },
          { name: "TV Series", path: "/actors/tv-series" },
        ],
      },
      MUSICIANS: {
        path: "/musicians",
        subCategories: [
          { name: "Pop", path: "/musicians/pop" },
          { name: "Rock", path: "/musicians/rock" },
          { name: "Hip Hop", path: "/musicians/hip-hop" },
          { name: "Electronic", path: "/musicians/electronic" },
        ],
      },
      ENTERTAINER: {
        path: "/entertainers",
        subCategories: [
          { name: "Stand-up", path: "/entertainers/standup" },
          { name: "Improv", path: "/entertainers/improv" },
          { name: "Variety", path: "/entertainers/variety" },
        ],
      },
    },
  },
  {
    name: "FUTURES",
    path: "/futures",
    scrollTo: "futures",
  },
];

const BrandedTokensNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("TOP 20 TOKENS");
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showTalentTokens, setShowTalentTokens] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle window resize to close dropdown on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnterDropdown = () => {
    clearTimeout(dropdownTimeout);
    setIsOpenDropdown(true);
  };

  const handleMouseLeaveDropdown = () => {
    const timeout = setTimeout(() => {
      setIsOpenDropdown(false);
    }, 200);
    setDropdownTimeout(timeout);
  };

  const toggleMobileCategory = (category) => {
    setMobileActiveCategory(
      mobileActiveCategory === category ? null : category
    );
  };

  const toggleTalentTokens = () => {
    setShowTalentTokens(!showTalentTokens);
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    setIsOpenDropdown(false);
    navigate(path);
  };

  const renderDesktopDropdown = (link) => (
    <div
      ref={dropdownRef}
      className="absolute left-0 mt-2 w-full min-w-[600px] bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-xl z-20 overflow-hidden"
      onMouseEnter={handleMouseEnterDropdown}
      onMouseLeave={handleMouseLeaveDropdown}
    >
      <div className="flex">
        {/* Categories Column */}
        <div className="w-1/2 border-r border-gray-800">
          <h3 className="px-4 py-3 font-normal text-primary text-sm bg-[#222]">
            ALL CATEGORIES
          </h3>
          <ul className="max-h-[400px] overflow-y-auto">
            {Object.entries(link.categories).map(([category, { path }]) => (
              <li
                key={category}
                onMouseEnter={() => setActiveCategory(category)}
                className={`px-4 py-3 cursor-pointer transition-colors flex justify-between items-center ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "  text-white"
                }`}
                onClick={() => handleNavigation(path)}
              >
                <div className="font-normal text-sm">{category}</div>
                {activeCategory === category && (
                  <FaChevronRight className="text-white" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Subcategories Column */}
        <div className="w-1/2">
          <h3 className="px-4 py-3 font-normal text-primary text-sm bg-[#222]">
            ALL SUB-CATEGORIES
          </h3>
          <ul className="max-h-[400px] overflow-y-auto">
            {link.categories[activeCategory]?.subCategories.map(
              ({ name, path }) => (
                <li
                  key={name}
                  className="px-4 py-3 cursor-pointer text-white font-normal hover:bg-primary transition-colors text-sm"
                  onClick={() => handleNavigation(path)}
                >
                  {name}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderMobileTalentTokens = () => {
    const talentTokensLink = navLinks.find((link) => link.hasDropdown);

    return (
      <div className="mt-2">
        <div
          onClick={toggleTalentTokens}
          className="flex justify-between items-center px-4 py-3 bg-[#222] rounded-lg cursor-pointer"
        >
          <span className="font-normal text-white">BRANDED TALENT TOKENS</span>
          <FaChevronDown
            className={`text-white transition-transform ${
              showTalentTokens ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {showTalentTokens && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 space-y-1 mt-1"
          >
            {Object.entries(talentTokensLink.categories).map(
              ([category, { path, subCategories }]) => (
                <div key={category}>
                  <div
                    onClick={() => toggleMobileCategory(category)}
                    className="flex justify-between items-center px-4 py-2 bg-[#333] rounded-lg cursor-pointer"
                  >
                    <span
                      className="font-normal text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigation(path);
                      }}
                    >
                      {category}
                    </span>
                    <FaChevronDown
                      className={`text-white transition-transform ${
                        mobileActiveCategory === category
                          ? "transform rotate-180 "
                          : ""
                      }`}
                    />
                  </div>

                  {mobileActiveCategory === category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 mt-1"
                    >
                      {subCategories.map(({ name, path }) => (
                        <div
                          key={name}
                          className="px-4 py-2 bg-[#444] rounded-lg cursor-pointer hover:bg-[#555] text-white"
                          onClick={() => handleNavigation(path)}
                        >
                          {name}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )
            )}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-black fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <img src={siteLogo} alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex text-white text-base font-medium space-x-8 items-center">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={
                  link.hasDropdown ? handleMouseEnterDropdown : undefined
                }
                onMouseLeave={
                  link.hasDropdown ? handleMouseLeaveDropdown : undefined
                }
              >
                <div className="flex items-center">
                  <Link
                    to={link.path}
                    className={`cursor-pointer transition flex items-center ${
                      location.pathname.includes(link.path)
                        ? "text-primary"
                        : "hover:text-amber-300 text-white"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <FaChevronDown
                        className={`ml-2 text-xs transition-transform duration-200 ${
                          isOpenDropdown ? "transform rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                </div>

                {link.hasDropdown &&
                  isOpenDropdown &&
                  renderDesktopDropdown(link)}
              </div>
            ))}

            <div className="flex space-x-4 ml-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-5 py-2 text-white border border-primary rounded-lg hover:bg-primary hover:text-black transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="px-5 py-2 bg-primary text-black rounded-lg hover:bg-amber-300 transition-colors font-semibold"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white mobile-menu-toggle p-2"
          >
            {isOpen ? (
              <FaTimes size={24} className="text-primary" />
            ) : (
              <FaBars size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#111] text-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks
                .filter((link) => !link.hasDropdown) // Only show non-dropdown links initially
                .map((link) => (
                  <div
                    key={link.name}
                    className={`px-4 py-3 rounded-lg cursor-pointer ${
                      location.pathname.includes(link.path)
                        ? "bg-[#222] text-primary"
                        : "hover:bg-[#222] text-white"
                    }`}
                    onClick={() => handleNavigation(link.path)}
                  >
                    {link.name}
                  </div>
                ))}

              {/* Special handling for BRANDED TALENT TOKENS */}
              {renderMobileTalentTokens()}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => (setIsOpen(false), setIsLoginModalOpen(true))}
                  className="flex-1 py-3 text-white border border-primary rounded-lg hover:bg-primary hover:text-black transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => (setIsOpen(false), setIsSignupModalOpen(true))}
                  className="flex-1 py-3 bg-primary text-black rounded-lg hover:bg-amber-300 transition-colors font-semibold"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </nav>
  );
};

export default BrandedTokensNavbar;
