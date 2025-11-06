import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import siteLogo from "../assets/images/site-logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { openSignupModal as openSignupModalAction } from "../features/auth/signupModalSlice";
import ProfileMenu from "./ProfileMenu";
const navLinks = [
  { name: "Home", path: "/", isRoute: true },
  { name: "Top Talent", path: "/branded-tokens-shares", isRoute: true },
  { name: "Trading Chart", scrollTo: "trading-chart" },
  { name: "Inverse", path: "/inverse", isRoute: true },
  { name: "Futures", path: "/future", isRoute: true },
  // { name: "Stocks", scrollTo: "stocks" },
  // { name: "Brands", scrollTo: "brands" },
  // { name: "Meet & Greet", scrollTo: "meet_greet" },
  // { name: "Advertising", scrollTo: "advertising" },
  // This is comment.
  { name: "Events", path: "/events", isRoute: true },
  { name: "About Us", path: "/about-us", isRoute: true },
  { name: "Contact us", path: "/contact-us", isRoute: true },
];

const history = { scrollTarget: null };

const Navbar = () => {
  const dispatch = useDispatch();
  const userLocalData = JSON.parse(localStorage.getItem("user"));
  const userId = userLocalData?.id;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [ignoreScroll, setIgnoreScroll] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getActiveLink = () => {
    const routeLink = navLinks.find(
      (link) => link.isRoute && link.path === location.pathname
    );

    if (routeLink) {
      return routeLink.path;
    }
    return activeSection;
  };

  const activeLink = getActiveLink();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // or your login/homepage
  };
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
    if (scrollTo === "home") {
      setIgnoreScroll(true);
      setActiveSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (location.pathname !== "/") {
        navigate("/");
      }
      setTimeout(() => setIgnoreScroll(false), 1000);
      return;
    }
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
    // setIsLoginModalOpen(true);
    // setIsOpen(false);
    navigate("/login");
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
      if (ignoreScroll) return;

      const scrollPos = window.scrollY + window.innerHeight / 2;
      let currentSection = activeSection;

      // Always show Home as active when at the very top of the page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      navLinks.forEach(({ scrollTo }) => {
        const section = document.getElementById(scrollTo);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionBottom = sectionTop + rect.height;

          if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
            currentSection = scrollTo;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [ignoreScroll, activeSection]);
  const currentUser = useMemo(() => {
    const name =
      userLocalData?.fullName ||
      userLocalData?.name ||
      userLocalData?.username ||
      (userLocalData?.firstName
        ? `${userLocalData.firstName} ${userLocalData?.lastName || ""}`.trim()
        : "User");

    const email = userLocalData?.email || "";
    const avatarUrl =
      userLocalData?.avatarUrl ||
      userLocalData?.avatar ||
      userLocalData?.profilePicture ||
      userLocalData?.image ||
      "";

    return { name, email, avatarUrl };
  }, [userLocalData]);
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black shadow-lg font-medium text-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <Link
            to="/"
            onClick={() => {
              setIgnoreScroll(true);
              setActiveSection("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => setIgnoreScroll(false), 1000);
            }}
          >
            <img src={siteLogo} alt="Logo" className="h-20" />
          </Link>

          <div className="hidden xl:flex items-center gap-5 ml-4">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <span
                  onClick={() => handleNavClick(link)}
                  className={`cursor-pointer text-white text-sm gredient-text-two transition-colors duration-300 ${
                    (link.isRoute && link.path === activeLink) ||
                    (!link.isRoute && link.scrollTo === activeLink)
                      ? "gredient-text"
                      : ""
                  }`}
                >
                  {link.name}
                </span>
                {((link.isRoute && link.path === activeLink) ||
                  (!link.isRoute && link.scrollTo === activeLink)) && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 w-full h-0.5 gradient-bg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}

            <div className="flex items-center gap-5 ml-4">
              <form onSubmit={handleSearch} className="relative w-44">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-8 py-1.5 rounded-full text-xs text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                />
                <FaSearch className="absolute left-2.5 top-2 text-gray-400 text-sm" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-sm transition-colors duration-200"
                  >
                    &#x2715;
                  </button>
                )}
              </form>
              {userId ? (
                <>
                  {" "}
                  {/* <motion.button
                    onClick={handleLogout}
                    className="custom-button-outline !py-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </> */}
                  <ProfileMenu user={currentUser} onLogout={handleLogout} />
                </>
              ) : (
                <>
                  {" "}
                  <motion.button
                    onClick={openLoginModal}
                    className="custom-button-outline !py-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => dispatch(openSignupModalAction())}
                    className="custom-button-two rounded-full !py-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </>
              )}
            </div>
          </div>

          <div className="xl:hidden flex gap-4 items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <MdOutlinePerson
                className="text-white text-xl cursor-pointer"
                onClick={openLoginModal}
              />
            </motion.div>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden bg-black px-4 pt-2 pb-4 space-y-3 overflow-hidden"
            >
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-8 py-2 rounded text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                />
                <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-sm" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 text-sm transition-colors duration-200"
                  >
                    &#x2715;
                  </button>
                )}
              </form>

              <div className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(link)}
                    className={`cursor-pointer text-white text-sm  p-2 rounded transition-colors duration-300 ${
                      activeSection === link.scrollTo
                        ? "gredient-text bg-gray-800"
                        : ""
                    }`}
                  >
                    {link.name}
                  </motion.div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-700 space-y-2">
                <motion.button
                  onClick={openLoginModal}
                  className="w-full text-left"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-white text-sm  transition-colors duration-300">
                    Login
                  </span>
                </motion.button>
                <motion.button
                  onClick={() => dispatch(openSignupModalAction())}
                  className="w-full text-left"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-white text-sm  transition-colors duration-300">
                    Sign Up
                  </span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/forgot-password");
                  }}
                  className="w-full text-left"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-xs text-gray-300 underline  transition-colors duration-300 mt-1">
                    Forgot username/password?
                  </span>
                </motion.button>
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
