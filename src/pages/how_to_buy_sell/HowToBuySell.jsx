import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HowToBuySell/HeroSection";
import UserTypesSection from "../../components/HowToBuySell/UserTypesSection";
import FeatureCards from "../../components/HowToBuySell/FeatureCards";
import OptionalFeaturesTable from "../../components/HowToBuySell/OptionalFeaturesTable";
import TipsAndNotes from "../../components/HowToBuySell/TipsAndNotes";
import CallToAction from "../../components/HowToBuySell/CallToAction";
import {
  FiBarChart2,
  FiShoppingCart,
  FiStar,
  FiUser,
  FiSearch,
  FiCreditCard,
  FiDollarSign,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";

const HowToBuySell = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const stepVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "backOut" },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
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
  const featureCards = [
    {
      icon: <FiStar />,
      title: "Bonus For Super Fans",
      description:
        "Enjoy exclusive discounts, early BTS access, and VIP fan experiences.",
    },
    {
      icon: <FiBarChart2 />,
      title: "Investor Tools",
      description:
        "Access real-time data, trend signals, and performance analytics.",
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
    "Engage with the talent’s posts and BTS to increase your potential influence.",
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
      <HeroSection
        colors={colors}
        itemVariants={itemVariants}
        fadeIn={fadeIn}
      />
      <section className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-left mb-10"
        >
          <h2 className="text-3xl font-semibold text-white mb-4">
            What is a Branded Talent Share (BTS)?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            A <strong>Branded Talent Share (BTS)</strong> is a digital
            engagement unit that allows fans, super fans, and investors to show
            support for a Talent (Artist, Athlete, or Influencer) while
            participating in their rising popularity. BTS are{" "}
            <strong>not securities or equity shares</strong>—they represent
            <strong>
              fan-driven sentiment, social value, and brand momentum
            </strong>
            .
          </p>
        </motion.div>
      </section>
      <UserTypesSection
        userTypes={userTypes}
        itemVariants={itemVariants}
        containerVariants={containerVariants}
        colors={colors}
      />

      <section className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16">
        <div
          className="flex border-b mb-8"
          style={{ borderColor: colors.border }}
        >
          <button
            onClick={() => setActiveTab("buy")}
            className={`px-6 py-3  font-medium text-lg !flex items-center ${
              activeTab === "buy"
                ? "gredient-border-bottom gredient-text"
                : "opacity-70 text-gray-300"
            }`}
          >
            <FiShoppingCart
              className={`mr-2 ${
                activeTab === "buy" ? "text-[#e2cb68]" : "text-gray-400"
              }`}
            />{" "}
            How to Buy BTS
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`px-6 py-3  font-medium text-lg !flex items-center ${
              activeTab === "sell"
                ? "gredient-border-bottom gredient-text"
                : "opacity-70 text-gray-300"
            }`}
          >
            <FiDollarSign
              className={`mr-2 ${
                activeTab === "sell" ? "text-[#e2cb68]" : "text-gray-400"
              }`}
            />{" "}
            How to Sell BTS
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
            >
              {/* Buy Steps - Static Implementation */}
              <div className="relative">
                <div
                  className="absolute left-8 top-0 h-full w-0.5 bg-gray-600 opacity-30"
                  style={{ marginLeft: "28px" }}
                ></div>

                {/* Step 1 */}
                <motion.div
                  custom={0}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center mr-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
                    >
                      <FiUser />
                    </motion.div>
                    <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
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
                      <span className="text-xl font-bold mr-3 gredient-text">
                        Step 1
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        Create an Account
                      </h3>
                    </div>
                    <ul className="space-y-2 pl-1">
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          Visit <a href="#">www.thefameexchange.com</a>
                        </span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          Click on <strong>Sign Up</strong>
                        </span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          Choose your role:{" "}
                          <strong>Fan, Super Fan, or Investor</strong>
                        </span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>Complete the registration form</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          Verify your identity (KYC may be required for larger
                          purchases)
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  custom={1}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center mr-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
                    >
                      <FiSearch />
                    </motion.div>
                    <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
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
                      <span className="text-xl font-bold mr-3 gredient-text">
                        Step 2
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        Browse Talent Profiles
                      </h3>
                    </div>
                    <ul className="space-y-2 pl-1">
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          Use the search bar or explore trending Talent
                        </span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>View each profile’s:</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          <strong>Fame Score</strong> (brand strength)
                        </span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>BTS Value</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>Performance Chart</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>News & Social Mentions</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>Upcoming Events or Drops</span>
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  custom={2}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center mr-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
                    >
                      <FiCreditCard />
                    </motion.div>
                    <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
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
                      <span className="text-xl font-bold mr-3 gredient-text">
                        Step 3
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        Add Funds
                      </h3>
                    </div>
                    <ul className="space-y-2 pl-1">
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>Go to your Wallet Dashboard</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>Add funds via:</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>Credit/Debit Card</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>ACH Transfer</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>Apple Pay / Google Pay (if available)</span>
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  custom={3}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center mr-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
                    >
                      <FiShoppingCart />
                    </motion.div>
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
                      <span className="text-xl font-bold mr-3 gredient-text">
                        Step 4
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        Buy BTS
                      </h3>
                    </div>
                    <ul className="space-y-2 pl-1">
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          Click <strong>Buy BTS</strong> on the Talent’s page
                        </span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>Select the number of shares</span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          Confirm the total and{" "}
                          <strong>click “Purchase”</strong>
                        </span>
                      </li>
                      <li
                        className="flex items-start gap-2 text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiArrowRight className="mt-1 text-base gredient-icon" />
                        <span>
                          Your BTS will be added instantly to your{" "}
                          <strong>Holdings Dashboard</strong>
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>
              </div>

              <FeatureCards
                features={featureCards}
                colors={colors}
                itemVariants={itemVariants}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sell"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Sell Steps - Static Implementation */}
              <div className="relative">
                <div
                  className="absolute left-8 top-0 h-full w-0.5 bg-gray-600 opacity-30"
                  style={{ marginLeft: "28px" }}
                ></div>

                {/* Step 1 */}
                <motion.div
                  custom={0}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center mr-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
                    >
                      <FiBarChart2 />
                    </motion.div>
                    <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
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
                      <span className="text-xl font-bold mr-3 gredient-text">
                        Step 1
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        Access Your Portfolio
                      </h3>
                    </div>
                    <ol className="space-y-2 pl-1 list-decimal list-inside text-sm font-medium custom-golden-list">
                      <li className="text-white">
                        <span>
                          Navigate to your <strong>Holdings Dashboard</strong>
                        </span>
                      </li>
                      <li className="text-white">
                        <span>View all BTS you currently own</span>
                      </li>
                    </ol>
                  </motion.div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  custom={1}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center mr-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
                    >
                      <FiUser />
                    </motion.div>
                    <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
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
                      <span className="text-xl font-bold mr-3 gredient-text">
                        Step 2
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        Select the Talent You Want to Sell
                      </h3>
                    </div>
                    <ol className="space-y-2 pl-1 list-decimal list-inside text-sm font-medium custom-golden-list">
                      <li className="text-white">
                        <span>
                          Click the Talent name to view current market trends
                          and your purchase history
                        </span>
                      </li>
                      <li className="text-white">
                        <span>
                          Choose <strong>Sell BTS</strong>
                        </span>
                      </li>
                    </ol>
                  </motion.div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  custom={2}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center mr-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
                    >
                      <FiDollarSign />
                    </motion.div>
                    <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
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
                      <span className="text-xl font-bold mr-3 gredient-text">
                        Step 3
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        Set Sale Amount and Price
                      </h3>
                    </div>
                    <ol className="space-y-2 pl-1 list-decimal list-inside text-sm font-medium custom-golden-list">
                      <li className="text-white">
                        <span>You can:</span>
                        <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
                          <li className="text-white">
                            Sell at <strong>current market price</strong>, or
                          </li>
                          <li className="text-white">
                            Set a <strong>custom ask price</strong>
                          </li>
                          <li className="text-white">
                            Choose the number of shares to sell
                          </li>
                        </ul>
                      </li>
                    </ol>
                  </motion.div>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  custom={3}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center mr-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
                    >
                      <FiCheck />
                    </motion.div>
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
                      <span className="text-xl font-bold mr-3 gredient-text">
                        Step 4
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        Confirm Sale
                      </h3>
                    </div>

                    <ul className="space-y-2 pl-1">
                      {" "}
                      <li> <strong>Review fees (if any) and net return</strong></li>{" "}
                      <ol className="space-y-2 pl-1 list-decimal list-inside text-sm font-medium custom-golden-list">
                        <li className="text-white">
                          Click <strong>“Confirm Sale”</strong>
                        </li>
                        <li className="text-white">
                          Funds will be credited back to your Wallet once the
                          sale is completed
                        </li>
                      </ol>
                    </ul>
                  </motion.div>
                </motion.div>
              </div>

              <FeatureCards
                features={[
                  {
                    icon: <FiBarChart2 />,
                    title: "Super Fans and Investors",
                    description:
                      "Super Fans and Investors can place Limit Orders, set up Auto-Sell Rules, and monitor Live BTS Marketboards",
                  },
                ]}
                colors={colors}
                itemVariants={itemVariants}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <OptionalFeaturesTable
        optionalFeatures={optionalFeatures}
        colors={colors}
        itemVariants={itemVariants}
        containerVariants={containerVariants}
      />
      <TipsAndNotes
        tips={tips}
        importantNotes={importantNotes}
        itemVariants={itemVariants}
        containerVariants={containerVariants}
        colors={colors}
      />
      <CallToAction colors={colors} itemVariants={itemVariants} />
      <Footer />
    </motion.div>
  );
};

export default HowToBuySell;
