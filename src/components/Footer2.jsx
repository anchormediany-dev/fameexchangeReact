import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import siteLogo from "../assets/images/site-logo.png";
import googlePlay from "../assets/images/google-play.png";
import appStore from "../assets/images/app-store.png";
import { Link } from "react-router-dom";

const Footer = () => {
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

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
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

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    focus: {
      scale: 1.02,
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="z-10 space-y-8 container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8"
          variants={containerVariants}
        >
          {/* Left Block */}
          <motion.div className="space-y-4" variants={itemVariants}>
            {/* Logo Row */}
            <motion.div className="flex items-start" variants={logoVariants}>
              <img
                src={siteLogo}
                alt="Coin Logo"
                className="bottom-3 right-10 h-auto"
              />
            </motion.div>

            <motion.p
              className="footer_paragraph text-center text-[#81a2b8]"
              variants={itemVariants}
            >
              Fan Engagement with Real Benefits: Fans are not just spectators
              but active participants. Beyond intrinsic value. "THE FAME
              EXCHANGE" allows Fans to actively support their favorite Talent,
              offering tangible benefits that go beyond the virtual realm.
            </motion.p>
            <motion.div className="flex justify-center" variants={itemVariants}>
              <motion.button
                className="bg-[#a38b41] hover:brightness-110 cursor-pointer font-medium text-black py-3 px-6 mt-2 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c]"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                GET STARTED
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="footer_nav_title mb-5 text-[#f2f2f2]"
              variants={itemVariants}
            >
              SERVICES
            </motion.h3>
            <motion.ul
              className="space-y-2 footer_nav_link"
              variants={containerVariants}
            >
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/how-to-buy-sell" className="hover:text-primary">
                    How To Buy/Sell
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/about-crypto" className="hover:text-primary">
                    About Crypt
                  </Link>
                </motion.div>
              </motion.li>
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
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/how-to-buy-sell" className="hover:text-primary">
                    How To Buy/Sell
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/about-crypto" className="hover:text-primary">
                    About Crypt
                  </Link>
                </motion.div>
              </motion.li>
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
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/faq" className="hover:text-primary">
                    FAQ
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li variants={linkVariants}>
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link to="/about-us" className="hover:text-primary">
                    About Us
                  </Link>
                </motion.div>
              </motion.li>
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
                className="object-cover max-w-48 cursor-pointer"
                variants={appImageVariants}
                whileHover="hover"
              />
              <motion.img
                src={googlePlay}
                alt="Google Play"
                className="object-cover max-w-48 cursor-pointer"
                variants={appImageVariants}
                whileHover="hover"
              />
            </motion.div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="footer_nav_title text-[#f2f2f2] mb-5"
              variants={itemVariants}
            >
              NEWSLETTER
            </motion.h3>
            <motion.p
              className="footer_paragraph mb-4 text-[#bfbfbf]"
              variants={itemVariants}
            >
              Sign up today for tips and the latest news and information
            </motion.p>
            <motion.input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full p-2 bg-transparent border-b border-white outline-none"
              variants={inputVariants}
              whileFocus="focus"
            />
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
                <FaTwitter className="cursor-pointer" size={20} />
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
              COPYRIGHT 2025 ALL RIGHTS RESERVED PRIVACY
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
    </motion.footer>
  );
};

export default Footer;
