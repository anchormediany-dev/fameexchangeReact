import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import siteLogo from "../assets/images/site-logo.png";
import googlePlay from "../assets/images/google-play.png";
import appStore from "../assets/images/app-store.png";
import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";
import { useNavigate } from "react-router-dom";
import { useGetSiteSettingsQuery } from "../app/authApi";
const Footer = () => {
  const navigate = useNavigate();
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonPlatform, setComingSoonPlatform] = useState("");
  const openComingSoon = (platform) => {
    setComingSoonPlatform(platform);
    setComingSoonOpen(true);
  };
  const closeComingSoon = () => setComingSoonOpen(false);
  const currentYear = new Date().getFullYear();
  // Admin-controlled footer link visibility (by section + path).
  const { data: siteSettingsResp } = useGetSiteSettingsQuery();
  const footerItems = siteSettingsResp?.data?.footerItems || [];
  const isFooterVisible = (section, path) => {
    if (!footerItems.length) return true;
    const match = footerItems.find(
      (f) => f.section === section && f.path === path
    );
    return match ? match.visible !== false : true;
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.2,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const appImageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const bottomBarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      className="bg-black text-white w-full py-12 2xl:py-16"
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true, amount: 0.1 }}
      // variants={containerVariants}
    >
      <div className="z-10 space-y-8 container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8"
          // variants={containerVariants}
        >
          {/* Left Block */}
          <motion.div
            className="space-y-4"
            // variants={itemVariants}
          >
            {/* Logo Row */}
            <motion.div
              className="flex items-start"
              // variants={logoVariants}
            >
              <img
                src={siteLogo}
                alt="TFE Logo"
                className="bottom-3 right-10 h-auto"
              />
            </motion.div>

            <motion.p
              className="footer_paragraph text-center text-[#81a2b8]"
              // variants={itemVariants}
            >
              Fan Engagement with Real Benefits: Fans are not just spectators
              but active participants. Beyond intrinsic value. "THE FAME
              EXCHANGE" allows Fans to actively support theirfavorite Talent,
              offering tangible benefits that go beyond the virtual realm.
            </motion.p>
            <motion.div className="flex justify-center" variants={itemVariants}>
              <motion.button
                type="button"
                onClick={() => navigate("/signup/fan")}
                className="bg-[#a38b41] hover:brightness-110 cursor-pointer font-medium text-black py-3 px-6 mt-2 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c]"
                // variants={buttonVariants}
                // whileHover="hover"
                // whileTap="tap"
              >
                GET STARTED
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="footer_nav_title mb-5 text-[#f2f2f2]"
              // variants={itemVariants}
            >
              SERVICES
            </motion.h3>
            <motion.ul
              className="space-y-2 footer_nav_link"
              variants={containerVariants}
            >
              {isFooterVisible("services", "/how-to-buy-sell") && (
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/how-to-buy-sell" className="hover:text-primary">
                    How To Buy/Sell
                  </Link>
                </motion.div>
              </motion.li>
              )}
              {isFooterVisible("services", "/anti-money-laundering") && (
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link
                    to="/anti-money-laundering"
                    className="hover:text-primary"
                  >
                    Anti-Money Laundering
                  </Link>
                </motion.div>
              </motion.li>
              )}
            </motion.ul>
          </motion.div>

          {/* About */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="footer_nav_title mb-5 text-[#f2f2f2]"
              variants={itemVariants}
            >
              ABOUT
            </motion.h3>
            <motion.ul
              className="space-y-2 footer_nav_link"
              variants={containerVariants}
            >
              {isFooterVisible("about", "/anti-money-laundering") && (
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link
                    to="/anti-money-laundering"
                    className="hover:text-primary"
                  >
                    Anti-Money Laundering
                  </Link>
                </motion.div>
              </motion.li>
              )}
              {isFooterVisible("about", "/faq") && (
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/faq" className="hover:text-primary">
                    FAQ
                  </Link>
                </motion.div>
              </motion.li>
              )}
              {isFooterVisible("about", "/about-us") && (
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/about-us" className="hover:text-primary">
                    About Us
                  </Link>
                </motion.div>
              </motion.li>
              )}
              {/* <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/help-support" className="hover:text-primary">
                    Help & Support
                  </Link>
                </motion.div>
              </motion.li> */}
            </motion.ul>
          </motion.div>

          {/* Apps */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="footer_nav_title text-[#f2f2f2] mb-5"
              variants={itemVariants}
            >
              APPS
            </motion.h3>
            <motion.div
              className="flex flex-col gap-8"
              variants={containerVariants}
            >
              <motion.img
                src={appStore}
                alt="App Store"
                onClick={() => openComingSoon("iOS")}
                className="object-cover max-w-48 cursor-pointer"
                variants={appImageVariants}
                whileHover="hover"
              />
              <motion.img
                src={googlePlay}
                alt="Google Play"
                onClick={() => openComingSoon("Android")}
                className="object-cover max-w-48 cursor-pointer"
                variants={appImageVariants}
                whileHover="hover"
              />
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Newsletter />
            <motion.div
              className="flex space-x-4 mt-8 justify-center md:justify-start"
              variants={containerVariants}
            >
              <motion.div
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebookF className="cursor-pointer" size={20} />
              </motion.div>
              <motion.div
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <FaXTwitter className="cursor-pointer" size={20} />
              </motion.div>
              <motion.div
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram className="cursor-pointer" size={20} />
              </motion.div>
              <motion.div
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <FaYoutube className="cursor-pointer" size={20} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-gray-700 mt-10 pt-4 text-center"
          variants={bottomBarVariants}
        >
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-2"
            variants={containerVariants}
          >
            <motion.p className="footer_copyright" variants={itemVariants}>
              COPYRIGHT {currentYear} ALL RIGHTS RESERVED PRIVACY
            </motion.p>
            <motion.p className="footer_copyright" variants={itemVariants}>
              <Link
                className="hover:underline hover:text-primary"
                to="/privacy-policy"
              >
                POLICY
              </Link>
              /{" "}
              <Link
                className="hover:underline hover:text-primary"
                to="/terms-conditions"
              >
                TERMS & CONDITIONS
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Coming Soon Modal for App Store / Google Play */}
      <AnimatePresence>
        {comingSoonOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeComingSoon}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-md bg-[#1c1c1c] border border-[#a38b41]/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] bg-clip-text text-transparent mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-300 mb-2">
                Our {comingSoonPlatform} app is on the way.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Sign up to join the waiting list and get priority access on launch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    closeComingSoon();
                    navigate("/signup/fan");
                  }}
                  className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] hover:brightness-110 cursor-pointer font-medium text-black py-3 px-6 rounded-md transition-all"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={closeComingSoon}
                  className="border border-white/20 text-white py-3 px-6 rounded-md hover:bg-white/10 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;
