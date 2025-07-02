import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiUser,
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiAlertCircle,
  FiBarChart2,
  FiBell,
  FiCreditCard,
  FiClock,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiInfo,
  FiMail,
  FiGlobe,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const HowToBuySell = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Color scheme
  const colors = {
    primary: "#F3BA18",
    primaryDark: "#FF9900",
    background: "#171717",
    cardBg: "#222222",
    inputBg: "#2d2d2d",
    border: "#333333",
    text: "#FFFFFF",
    textSecondary: "#CCCCCC",
    error: "#FF4D4D",
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const stepVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "backOut",
      },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const userTypes = [
    {
      type: "Fan",
      icon: <FiUser />,
      description: "Casual supporter, may purchase small quantities of BTS",
      features: ["Buy/Sell BTS", "Join meet & greets"],
    },
    {
      type: "Super Fan",
      icon: <FiStar />,
      description: "Highly engaged supporter, often holds large BTS quantities",
      features: ["BTS trading", "Premium perks", "Early access"],
    },
    {
      type: "Investor",
      icon: <FiBarChart2 />,
      description: "Financially motivated, focused on trending talent",
      features: ["Trading dashboard", "Trend insights", "Analytics"],
    },
  ];

  const buySteps = [
    {
      step: 1,
      title: "Create an Account",
      icon: <FiUser />,
      details: [
        "Visit www.thefameexchange.com",
        "Click Sign Up",
        "Choose your role: Fan, Super Fan, or Investor",
        "Complete the registration form",
        "Verify your identity (KYC may be required for larger purchases)",
      ],
    },
    {
      step: 2,
      title: "Browse Talent Profiles",
      icon: <FiSearch />,
      details: [
        "Use the search bar or explore trending Talent",
        "View each profile's:",
        "• Fame Score (brand strength)",
        "• BTS Value",
        "• Performance Chart",
        "• News & Social Mentions",
        "• Upcoming Events or Drops",
      ],
    },
    {
      step: 3,
      title: "Add Funds",
      icon: <FiCreditCard />,
      details: [
        "Go to your Wallet Dashboard",
        "Add funds via:",
        "• Credit/Debit Card",
        "• ACH Transfer",
        "• Apple Pay / Google Pay (if available)",
      ],
    },
    {
      step: 4,
      title: "Buy BTS",
      icon: <FiShoppingCart />,
      details: [
        "Click Buy BTS on the Talent's page",
        "Select the number of shares",
        "Confirm the total and click 'Purchase'",
        "Your BTS will be added instantly to your Holdings Dashboard",
      ],
    },
  ];

  const sellSteps = [
    {
      step: 1,
      title: "Access Your Portfolio",
      icon: <FiBarChart2 />,
      details: [
        "Navigate to your Holdings Dashboard",
        "View all BTS you currently own",
      ],
    },
    {
      step: 2,
      title: "Select the Talent You Want to Sell",
      icon: <FiUser />,
      details: [
        "Click the Talent name to view current market trends and your purchase history",
        "Choose Sell BTS",
      ],
    },
    {
      step: 3,
      title: "Set Sale Amount and Price",
      icon: <FiDollarSign />,
      details: [
        "You can:",
        "• Sell at current market price, or",
        "• Set a custom ask price",
        "Choose the number of shares to sell",
      ],
    },
    {
      step: 4,
      title: "Confirm Sale",
      icon: <FiCheck />,
      details: [
        "Review fees (if any) and net return",
        "Click 'Confirm Sale'",
        "Funds will be credited back to your Wallet once the sale is completed",
      ],
    },
  ];

  const optionalFeatures = [
    {
      feature: "BTS Watchlist",
      availableTo: "All Users",
      description: "Track favorite Talent and receive updates",
    },
    {
      feature: "Fame Score Alerts",
      availableTo: "Super Fans, Investors",
      description: "Be notified when BTS value or score changes",
    },
    {
      feature: "Virtual Meet & Greet Booking",
      availableTo: "Fans & Up",
      description: "Spend BTS to schedule 1-on-1 VR time with Talent",
    },
    {
      feature: "Priority Drops Access",
      availableTo: "Super Fans",
      description: "Early entry to new or limited-edition BTS sales",
    },
    {
      feature: "Market Insights & Analytics",
      availableTo: "Investors",
      description: "Data dashboards, trending comparisons",
    },
  ];

  const tips = [
    "BTS values fluctuate based on talent visibility, media mentions, and fan activity.",
    "Engage with the talent's posts and BTS to increase your potential influence.",
    "Selling quickly may lead to lower returns, while holding during surges could increase value.",
  ];

  const importantNotes = [
    "BTS are for entertainment and engagement purposes only.",
    "They do not represent legal equity, voting rights, or ownership in a business.",
    "All transactions are in U.S. Dollars.",
    "You may be required to submit ID verification for large-value transactions (per our AML/KYC policy).",
  ];

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <Navbar />

      {/* Hero Section */}
      <motion.section
        variants={fadeIn}
        className="py-16 px-4 sm:px-6 mt-16 lg:px-8 container mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{ color: colors.text }}
        >
          How to <span style={{ color: colors.primary }}>Buy</span> or{" "}
          <span style={{ color: colors.primary }}>Sell</span> a Branded Talent
          Share (BTS)
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl max-w-4xl mx-auto"
          style={{ color: colors.textSecondary }}
        >
          Your complete guide to trading digital engagement units on The Fame
          Exchange platform
        </motion.p>
      </motion.section>

      {/* User Types Section */}
      <motion.section
        variants={containerVariants}
        className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold mb-8 text-center flex items-center justify-center"
          style={{ color: colors.text }}
        >
          <FiUser className="mr-3" style={{ color: colors.primary }} /> User
          Types
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6"
        >
          {userTypes.map((user, index) => (
            <motion.div
              key={user.type}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl transition-all"
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="p-2 rounded-full mr-3"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.background,
                  }}
                >
                  {user.icon}
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: colors.primary }}
                >
                  {user.type}
                </h3>
              </div>
              <p className="mb-4" style={{ color: colors.textSecondary }}>
                {user.description}
              </p>
              <div className="space-y-2">
                {user.features.map((feature, i) => (
                  <p
                    key={i}
                    className="flex items-center"
                    style={{ color: colors.textSecondary }}
                  >
                    <FiCheck
                      className="mr-2"
                      style={{ color: colors.primary }}
                    />{" "}
                    {feature}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Buy/Sell Tabs */}
      <motion.section
        variants={itemVariants}
        className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16"
      >
        <div
          className="flex border-b mb-8"
          style={{ borderColor: colors.border }}
        >
          <button
            onClick={() => setActiveTab("buy")}
            className={`px-6 py-3 font-medium text-lg flex items-center ${
              activeTab === "buy" ? "border-b-2" : "opacity-70"
            }`}
            style={{
              color:
                activeTab === "buy" ? colors.primary : colors.textSecondary,
              borderColor: colors.primary,
            }}
          >
            <FiShoppingCart className="mr-2" /> How to Buy BTS
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`px-6 py-3 font-medium text-lg flex items-center ${
              activeTab === "sell" ? "border-b-2" : "opacity-70"
            }`}
            style={{
              color:
                activeTab === "sell" ? colors.primary : colors.textSecondary,
              borderColor: colors.primary,
            }}
          >
            <FiDollarSign className="mr-2" /> How to Sell BTS
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "buy" ? (
            <motion.div
              key="buy"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Buy Steps */}
              <div className="relative">
                <div
                  className="absolute left-8 top-0 h-full w-0.5 bg-gray-600 opacity-30"
                  style={{ marginLeft: "28px" }}
                ></div>
                {buySteps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    custom={i}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex relative mb-8 last:mb-0"
                  >
                    <div className="flex flex-col items-center mr-6 z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full w-14 h-14 flex items-center justify-center"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.background,
                        }}
                      >
                        {step.icon}
                      </motion.div>
                      {i < buySteps.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex-1 p-6 rounded-xl"
                      style={{
                        backgroundColor: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <span
                          className="text-xl font-bold mr-3"
                          style={{ color: colors.primary }}
                        >
                          Step {step.step}
                        </span>
                        <h3
                          className="text-xl font-bold"
                          style={{ color: colors.text }}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <ul className="space-y-2 pl-1">
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start"
                            style={{ color: colors.textSecondary }}
                          >
                            {!detail.startsWith("•") && i > 0 ? (
                              <span
                                className="mr-2 mt-1"
                                style={{ color: colors.primary }}
                              >
                                •
                              </span>
                            ) : null}
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Buy Tab Features - Now clearly visible */}
              <motion.div
                variants={containerVariants}
                className="grid md:grid-cols-2 gap-6 mt-10"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-xl p-6 border-2"
                  style={{
                    backgroundColor: `${colors.primary}30`,
                    borderColor: colors.primary,
                  }}
                >
                  <div className="flex items-center mb-3">
                    <FiStar
                      className="text-xl mr-3"
                      style={{ color: colors.primary }}
                    />
                    <h4
                      className="text-xl font-bold"
                      style={{ color: colors.primary }}
                    >
                      Super Fan Bonus
                    </h4>
                  </div>
                  <p className="text-lg" style={{ color: colors.text }}>
                    Early access to BTS drops and exclusive discount offers for
                    Super Fans
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-xl p-6 border-2"
                  style={{
                    backgroundColor: `${colors.primary}30`,
                    borderColor: colors.primary,
                  }}
                >
                  <div className="flex items-center mb-3">
                    <FiBarChart2
                      className="text-xl mr-3"
                      style={{ color: colors.primary }}
                    />
                    <h4
                      className="text-xl font-bold"
                      style={{ color: colors.primary }}
                    >
                      Investor Tools
                    </h4>
                  </div>
                  <p className="text-lg" style={{ color: colors.text }}>
                    Advanced analytics, trend alerts, and real-time market data
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="sell"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Sell Steps */}
              <div className="relative">
                <div
                  className="absolute left-8 top-0 h-full w-0.5 bg-gray-600 opacity-30"
                  style={{ marginLeft: "28px" }}
                ></div>
                {sellSteps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    custom={i}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex relative mb-8 last:mb-0"
                  >
                    <div className="flex flex-col items-center mr-6 z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full w-14 h-14 flex items-center justify-center"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.background,
                        }}
                      >
                        {step.icon}
                      </motion.div>
                      {i < sellSteps.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex-1 p-6 rounded-xl"
                      style={{
                        backgroundColor: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <span
                          className="text-xl font-bold mr-3"
                          style={{ color: colors.primary }}
                        >
                          Step {step.step}
                        </span>
                        <h3
                          className="text-xl font-bold"
                          style={{ color: colors.text }}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <ul className="space-y-2 pl-1">
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start"
                            style={{ color: colors.textSecondary }}
                          >
                            {!detail.startsWith("•") && i > 0 ? (
                              <span
                                className="mr-2 mt-1"
                                style={{ color: colors.primary }}
                              >
                                •
                              </span>
                            ) : null}
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Sell Tab Feature - Now clearly visible */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl p-6 border-2 mt-10"
                style={{
                  backgroundColor: `${colors.primary}30`,
                  borderColor: colors.primary,
                }}
              >
                <div className="flex items-center mb-3">
                  <FiTrendingUp
                    className="text-xl mr-3"
                    style={{ color: colors.primary }}
                  />
                  <h4
                    className="text-xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    Advanced Selling Features
                  </h4>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li style={{ color: colors.text }}>
                    Limit orders and price targets
                  </li>
                  <li style={{ color: colors.text }}>Automated sell rules</li>
                  <li style={{ color: colors.text }}>
                    Real-time market depth charts
                  </li>
                  <li style={{ color: colors.text }}>Bulk selling options</li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Optional Features Section */}
      <motion.section
        variants={itemVariants}
        className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16"
      >
        <motion.h2
          whileHover={{ scale: 1.02 }}
          className="text-3xl font-bold mb-8 text-center flex items-center justify-center"
          style={{ color: colors.text }}
        >
          <FiTrendingUp className="mr-3" style={{ color: colors.primary }} />{" "}
          Optional Features
        </motion.h2>

        <motion.div variants={containerVariants} className="overflow-x-auto">
          <motion.table whileHover={{ scale: 1.005 }} className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.primary}` }}>
                <th
                  className="text-left py-4 px-4 font-bold"
                  style={{ color: colors.primary }}
                >
                  Feature
                </th>
                <th
                  className="text-left py-4 px-4 font-bold"
                  style={{ color: colors.primary }}
                >
                  Available To
                </th>
                <th
                  className="text-left py-4 px-4 font-bold"
                  style={{ color: colors.primary }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {optionalFeatures.map((feature, index) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: `${colors.primary}10` }}
                  className="transition-colors"
                  style={{ borderBottom: `1px solid ${colors.border}` }}
                >
                  <td
                    className="py-4 px-4 font-semibold"
                    style={{ color: colors.text }}
                  >
                    {feature.feature}
                  </td>
                  <td
                    className="py-4 px-4"
                    style={{ color: colors.textSecondary }}
                  >
                    {feature.availableTo}
                  </td>
                  <td
                    className="py-4 px-4"
                    style={{ color: colors.textSecondary }}
                  >
                    {feature.description}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </motion.div>
      </motion.section>

      {/* Tips and Notes Section */}
      <motion.section
        variants={itemVariants}
        className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16"
      >
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Tips */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl p-8"
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
            }}
          >
            <motion.h3
              whileHover={{ x: 5 }}
              className="text-2xl font-bold mb-6 flex items-center"
              style={{ color: colors.primary }}
            >
              <FiInfo className="mr-3" /> Tips for All Users
            </motion.h3>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex"
                  style={{ color: colors.textSecondary }}
                >
                  <span className="mr-2" style={{ color: colors.primary }}>
                    •
                  </span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl p-8"
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.error}30`,
            }}
          >
            <motion.h3
              whileHover={{ x: 5 }}
              className="text-2xl font-bold mb-6 flex items-center"
              style={{ color: colors.error }}
            >
              <FiAlertCircle className="mr-3" /> Important Notes
            </motion.h3>
            <ul className="space-y-3">
              {importantNotes.map((note, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex"
                  style={{ color: colors.textSecondary }}
                >
                  <span className="mr-2" style={{ color: colors.error }}>
                    •
                  </span>
                  {note}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={itemVariants}
        className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl p-8"
          style={{
            background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
            color: colors.background,
          }}
        >
          <motion.h2
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Start Trading BTS?
          </motion.h2>
          <motion.p whileHover={{ scale: 1.05 }} className="text-xl mb-6">
            Join The Fame Exchange today and connect with your favorite Talent
          </motion.p>
          <Link to="/signup">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: colors.background,
                color: colors.primary,
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-bold transition-all"
              style={{
                backgroundColor: colors.background,
                color: colors.primary,
              }}
            >
              Join Now
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      <Footer />
    </motion.div>
  );
};

export default HowToBuySell;
