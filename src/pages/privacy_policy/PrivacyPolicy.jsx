import React, { useState } from "react";
import {
  FiChevronDown,
  FiMail,
  FiPhone,
  FiGlobe,
  FiShield,
  FiLock,
  FiUser,
  FiDatabase,
  FiShare2,
  FiClock,
  FiCheckCircle,
  FiLink,
  FiUsers,
  FiRefreshCw,
} from "react-icons/fi";
import {
  FaUserShield,
  FaRegHandshake,
  FaChartLine,
  FaChild,
} from "react-icons/fa";
import { RiExchangeLine } from "react-icons/ri";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Gradient styles
  const gradientText = {
    background: "linear-gradient(to bottom, #e2cb68 0%, #b8962d 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
  };

  const gradientBg = {
    background: "linear-gradient(to bottom, #e2cb68 0%, #b8962d 100%)",
  };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const sections = [
    {
      title: "Information We Collect",
      icon: <FiDatabase className="text-xl" />,
      content: [
        {
          subtitle: "Personal Information:",
          text: `Fans/Investors: When you create an account, we collect your name, email address, phone number, payment information, and other details necessary for processing transactions. Talent/Artists/Influencers/Athletes: In addition to the information above, we also collect professional details such as career information, social media profiles, and public recognition metrics to help determine the value of Branded Talent Shares (BTS).`,
        },
        {
          subtitle: "Usage Data:",
          text: `We automatically collect information about how you interact with our platform, including your IP address, browser type, operating system, device information, and browsing activity on the platform. This helps us analyze trends, improve functionality, and ensure the security of the platform.`,
        },
        {
          subtitle: "Cookies and Tracking Technologies:",
          text: `We use cookies and similar tracking technologies to track activity on our platform. Cookies are small files stored on your device that help us improve your user experience by remembering your preferences and enabling features like secure login.`,
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <RiExchangeLine className="text-xl" />,
      bullets: [
        "Account Creation and Management",
        "Transaction Processing",
        "Platform Customization",
        "Communication",
        "Analytics and Improvements",
        "Security",
      ],
    },
    {
      title: "How We Share Your Information",
      icon: <FiShare2 className="text-xl" />,
      content: [
        {
          subtitle: "Service Providers:",
          text: `We may share your information with third-party service providers who help us operate the platform. These providers are bound by contractual obligations to protect your data.`,
        },
        {
          subtitle: "Legal Compliance:",
          text: `We may disclose your personal data if required to do so by law or in response to valid legal requests by public authorities.`,
        },
        {
          subtitle: "Business Transfers:",
          text: `If we are involved in a merger, acquisition, or sale of assets, your personal data may be transferred. We will notify you beforehand.`,
        },
      ],
    },
    {
      title: "Data Retention",
      icon: <FiClock className="text-xl" />,
      text: `We retain your personal data for as long as your account is active or as needed to provide services. Contact our support team to deactivate your account or request deletion.`,
    },
    {
      title: "Your Rights",
      icon: <FiUser className="text-xl" />,
      bullets: [
        "Access",
        "Rectification",
        "Erasure",
        "Objection",
        "Portability",
      ],
      note: "To exercise these rights, contact us using the info below. We'll respond in accordance with data protection laws.",
    },
    {
      title: "Data Security",
      icon: <FiLock className="text-xl" />,
      text: `We implement appropriate measures like encryption and firewalls. However, no online method is 100% secure.`,
    },
    {
      title: "Third-Party Links",
      icon: <FiLink className="text-xl" />,
      text: `Our platform may link to third-party websites. We're not responsible for their privacy policies.`,
    },
    {
      title: "Children's Privacy",
      icon: <FaChild className="text-xl" />,
      text: `We do not knowingly collect personal data from children under 13. If found, we will delete such data.`,
    },
    {
      title: "Changes to This Policy",
      icon: <FiRefreshCw className="text-xl" />,
      text: `We may update this policy. Review periodically for updates.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#b8962d]/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8962d]/5 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Header */}
          <div className="text-center mb-20">
            <div
              className="inline-flex items-center justify-center px-6 py-3 rounded-full mb-6 backdrop-blur-sm"
              style={gradientBg}
            >
              <FiShield className="text-[#171717] mr-2" />
              <span className="text-[#171717] font-medium text-sm uppercase tracking-wider">
                Privacy Policy
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Privacy <span style={gradientText}>Matters</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Last updated: <span style={gradientText}>June 15, 2025</span>
            </p>
          </div>

          {/* Introduction Card */}
          <div className="bg-gradient-to-br from-[#16181D] to-[#0E1015] border border-[#2A2D35] rounded-2xl p-8 mb-16 backdrop-blur-sm shadow-2xl">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Our Commitment to You
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  At <span style={gradientText}>The Fame Exchange</span>, we
                  prioritize your privacy and data security. This policy
                  explains how we collect, use, and protect your information in
                  compliance with global data protection regulations.
                </p>
              </div>
              <div className="md:w-1/2 bg-[#1A1D24]/50 border border-[#2A2D35] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <FiCheckCircle className="mr-2" style={gradientText} />
                  Key Principles
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2" style={gradientText}>
                      •
                    </span>
                    <span className="text-gray-300">
                      Transparent data practices
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={gradientText}>
                      •
                    </span>
                    <span className="text-gray-300">
                      Minimal data collection
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={gradientText}>
                      •
                    </span>
                    <span className="text-gray-300">
                      Enterprise-grade security
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={gradientText}>
                      •
                    </span>
                    <span className="text-gray-300">
                      Your control over your data
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Table of Contents (Sticky) */}
          <div className="sticky top-24 z-20 mb-12 bg-[#16181D]/90 backdrop-blur-md border border-[#2A2D35] rounded-xl p-4 shadow-lg">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              Jump to Section
            </h3>
            <div className="flex flex-wrap gap-2">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const element = document.getElementById(`section-${index}`);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs px-3 py-1.5 text-gray-300 rounded-full transition-all duration-200 flex items-center"
                  style={
                    activeSection === index
                      ? gradientBg
                      : { background: "#2A2D35" }
                  }
                >
                  {React.cloneElement(section.icon, {
                    className: `mr-1 text-sm ${
                      activeSection === index ? "text-[#171717]" : ""
                    }`,
                    style: activeSection === index ? {} : gradientText,
                  })}
                  <span
                    className={activeSection === index ? "text-[#171717]" : ""}
                  >
                    {section.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                id={`section-${index}`}
                className={`bg-gradient-to-br from-[#16181D] to-[#0E1015] border border-[#2A2D35] rounded-2xl p-6 transition-all duration-300 ${
                  activeSection === index ? "ring-2 ring-[#b8962d]/30" : ""
                }`}
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                  aria-expanded={activeSection === index}
                  aria-controls={`section-content-${index}`}
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg mr-4" style={gradientBg}>
                      {React.cloneElement(section.icon, {
                        className: "text-[#171717] text-xl",
                      })}
                    </div>
                    <h2
                      className="text-xl md:text-2xl font-bold text-white group-hover:text-[#e2cb68] transition-colors duration-200"
                      style={gradientText}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <FiChevronDown className="text-2xl transition-transform text-[#e2cb68] duration-300" />
                </button>

                <div
                  id={`section-content-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeSection === index
                      ? "mt-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {section.text && (
                    <p className="text-gray-300 leading-relaxed">
                      {section.text}
                    </p>
                  )}

                  {section.bullets && (
                    <ul className="mt-4 space-y-3">
                      {section.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1" style={gradientText}>
                            •
                          </span>
                          <span className="text-gray-300">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.note && (
                    <div
                      className="mt-6 p-4 bg-[#1A1D24] border-l-4 rounded-r-lg"
                      style={{ borderColor: "#b8962d" }}
                    >
                      <p className="text-gray-400 italic">{section.note}</p>
                    </div>
                  )}

                  {section.content && (
                    <div className="mt-6 space-y-6">
                      {section.content.map((content, i) => (
                        <div
                          key={i}
                          className="bg-[#1A1D24]/50 p-4 rounded-lg border border-[#2A2D35]"
                        >
                          <h3
                            className="text-lg font-semibold mb-2"
                            style={gradientText}
                          >
                            {content.subtitle}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {content.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-20 bg-gradient-to-br from-[#16181D] to-[#0E1015] border border-[#2A2D35] rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">
                Have Questions?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Contact our Data Protection Officer for any privacy-related
                inquiries or to exercise your rights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#1A1D24] hover:bg-[#1A1D24]/80 border border-[#2A2D35] rounded-xl p-6 transition-all duration-300 hover:border-[#b8962d]/30 group">
                <div
                  className="p-3 rounded-full inline-flex mb-4 group-hover:bg-[#b8962d]/20 transition-colors duration-300"
                  style={gradientBg}
                >
                  <FiMail className="text-[#171717] text-xl" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                <a
                  href="mailto:privacy@thefameexchange.com"
                  className="hover:underline"
                  style={gradientText}
                >
                  privacy@thefameexchange.com
                </a>
              </div>
              <div className="bg-[#1A1D24] hover:bg-[#1A1D24]/80 border border-[#2A2D35] rounded-xl p-6 transition-all duration-300 hover:border-[#b8962d]/30 group">
                <div
                  className="p-3 rounded-full inline-flex mb-4 group-hover:bg-[#b8962d]/20 transition-colors duration-300"
                  style={gradientBg}
                >
                  <FiPhone className="text-[#171717] text-xl" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                <a
                  href="tel:18001234567"
                  className="hover:underline"
                  style={gradientText}
                >
                  1-800-123-4567
                </a>
              </div>
              <div className="bg-[#1A1D24] hover:bg-[#1A1D24]/80 border border-[#2A2D35] rounded-xl p-6 transition-all duration-300 hover:border-[#b8962d]/30 group">
                <div
                  className="p-3 rounded-full inline-flex mb-4 group-hover:bg-[#b8962d]/20 transition-colors duration-300"
                  style={gradientBg}
                >
                  <FiGlobe className="text-[#171717] text-xl" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">Website</h3>
                <a
                  href="https://www.thefameexchange.com"
                  className="hover:underline"
                  style={gradientText}
                >
                  www.thefameexchange.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
