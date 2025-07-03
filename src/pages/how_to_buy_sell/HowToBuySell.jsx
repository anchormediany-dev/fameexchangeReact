import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HowToBuySell/HeroSection";
import UserTypesSection from "../../components/HowToBuySell/UserTypesSection";
import StepList from "../../components/HowToBuySell/StepList";
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
      description: "A casual supporter who buys BTS to show support.",
      features: ["Buy and sell BTS", "Access meet & greet sessions"],
    },
    {
      type: "Super Fan",
      icon: <FiStar />,
      description: "An engaged supporter with larger BTS holdings.",
      features: ["Trade BTS", "Unlock premium perks", "Get early access"],
    },
    {
      type: "Investor",
      icon: <FiBarChart2 />,
      description: "A strategic user focused on trends and market growth.",
      features: [
        "Access trading tools",
        "View trend insights",
        "Analyze analytics",
      ],
    },
  ];

  const buySteps = [
    {
      step: 1,
      title: "Create Your Account",
      icon: <FiUser />,
      details: [
        "Go to www.thefameexchange.com",
        "Click on Sign Up",
        "Choose your role: Fan, Super Fan, or Investor",
        "Complete and submit the registration form",
        "Verify your identity (for large purchases, KYC may be needed)",
      ],
    },
    {
      step: 2,
      title: "Explore Talent Profiles",
      icon: <FiSearch />,
      details: [
        "Use the search bar or explore trending Talent",
        "Each profile shows:",
        "Fame Score (brand strength)",
        "BTS Value & Performance Chart",
        "News, social mentions, and upcoming events",
      ],
    },
    {
      step: 3,
      title: "Fund Your Wallet",
      icon: <FiCreditCard />,
      details: [
        "Navigate to the Wallet Dashboard",
        "Choose a payment method:",
        "Credit/Debit Card",
        "ACH Transfer",
        "Apple Pay / Google Pay (if available)",
      ],
    },
    {
      step: 4,
      title: "Buy Your First BTS",
      icon: <FiShoppingCart />,
      details: [
        "On a Talent's profile, click 'Buy BTS'",
        "Select number of shares to purchase",
        "Confirm the amount and click 'Purchase'",
        "Your BTS will appear instantly in your dashboard",
      ],
    },
  ];

  const sellSteps = [
    {
      step: 1,
      title: "Open Your Portfolio",
      icon: <FiBarChart2 />,
      details: [
        "Go to your Holdings Dashboard",
        "View the BTS you currently own",
      ],
    },
    {
      step: 2,
      title: "Choose a Talent to Sell",
      icon: <FiUser />,
      details: [
        "Click on a Talent to view details and trends",
        "Click on 'Sell BTS'",
      ],
    },
    {
      step: 3,
      title: "Set Quantity & Price",
      icon: <FiDollarSign />,
      details: [
        "Choose how many shares to sell",
        "Sell at current market rate, or",
        "Set your own asking price",
      ],
    },
    {
      step: 4,
      title: "Complete Your Sale",
      icon: <FiCheck />,
      details: [
        "Review estimated returns and any fees",
        "Click 'Confirm Sale'",
        "Funds will be added to your wallet after the sale",
      ],
    },
  ];

  const featureCards = [
    {
      icon: <FiStar />,
      title: "Super Fan Rewards",
      description:
        "Enjoy exclusive discounts, early BTS access, and VIP fan experiences.",
    },
    {
      icon: <FiBarChart2 />,
      title: "Powerful Investor Tools",
      description:
        "Access real-time data, trend signals, and performance analytics.",
    },
  ];

  const optionalFeatures = [
    {
      feature: "BTS Watchlist",
      availableTo: "All Users",
      description:
        "Bookmark your favorite Talents and get updates automatically.",
    },
    {
      feature: "Fame Score Alerts",
      availableTo: "Super Fans, Investors",
      description:
        "Get notified when a Talent’s fame score or BTS value changes.",
    },
    {
      feature: "Virtual Meet & Greets",
      availableTo: "Fans & Up",
      description: "Book exclusive 1-on-1 sessions using your BTS balance.",
    },
    {
      feature: "Priority Drops",
      availableTo: "Super Fans",
      description:
        "Be first in line for limited-edition BTS sales and launches.",
    },
    {
      feature: "Advanced Analytics",
      availableTo: "Investors",
      description:
        "Compare trends, visualize performance, and optimize timing.",
    },
  ];

  const tips = [
    "BTS values are influenced by media visibility, fan engagement, and momentum.",
    "Stay active with BTS and Talent pages to increase your community impact.",
    "Consider holding shares during hype surges for potentially higher returns.",
  ];

  const importantNotes = [
    "BTS are for entertainment and engagement purposes only—not investments.",
    "They do not grant equity, ownership, or voting rights.",
    "All transactions are processed in U.S. Dollars (USD).",
    "You may need to complete identity verification for large transactions (per AML/KYC policies).",
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
              <StepList
                steps={buySteps}
                stepVariants={stepVariants}
                colors={colors}
              />
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
              <StepList
                steps={sellSteps}
                stepVariants={stepVariants}
                colors={colors}
              />
              <FeatureCards
                features={[
                  {
                    icon: <FiBarChart2 />,
                    title: "Advanced Selling Features",
                    description:
                      "Limit orders, automated rules, depth charts, and bulk options",
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
