import { useState, useEffect } from "react";
import {
  FiShield,
  FiDatabase,
  FiUser,
  FiShare2,
  FiClock,
  FiLock,
  FiLink,
  FiMail,
} from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("information-collected");

  const sections = [
    {
      id: "information-collected",
      title: "1. Information We Collect",
      icon: <FiDatabase className="text-[#F3BA18]" />,
      content: [
        {
          subtitle: "a. Personal Information:",
          text: `Fans/Investors: When you create an account, we collect your name, email address, phone number, payment information, and other details necessary for processing transactions.

Talent/Artists/Influencers/Athletes: In addition to the information above, we also collect professional details such as career information, social media profiles, and public recognition metrics to help determine the value of Branded Talent Shares (BTS).`,
        },
        {
          subtitle: "b. Usage Data:",
          text: `We automatically collect information about how you interact with our platform, including your IP address, browser type, operating system, device information, and browsing activity on the platform. This helps us analyze trends, improve functionality, and ensure the security of the platform.`,
        },
        {
          subtitle: "c. Cookies and Tracking Technologies:",
          text: `We use cookies and similar tracking technologies to track activity on our platform. Cookies are small files stored on your device that help us improve your user experience by remembering your preferences and enabling features like secure login.`,
        },
      ],
    },
    {
      id: "how-we-use",
      title: "2. How We Use Your Information",
      icon: <FiShare2 className="text-[#F3BA18]" />,
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
      id: "how-we-share",
      title: "3. How We Share Your Information",
      icon: <FiUser className="text-[#F3BA18]" />,
      content: [
        {
          subtitle: "a. Service Providers:",
          text: `We may share your information with third-party service providers who help us operate the platform. These providers are bound by contractual obligations to protect your data.`,
        },
        {
          subtitle: "b. Legal Compliance:",
          text: `We may disclose your personal data if required to do so by law or in response to valid legal requests by public authorities.`,
        },
        {
          subtitle: "c. Business Transfers:",
          text: `If we are involved in a merger, acquisition, or sale of assets, your personal data may be transferred. We will notify you beforehand.`,
        },
      ],
    },
    {
      id: "data-retention",
      title: "4. Data Retention",
      icon: <FiClock className="text-[#F3BA18]" />,
      text: `We retain your personal data for as long as your account is active or as needed to provide services. Contact our support team to deactivate your account or request deletion.`,
    },
    {
      id: "your-rights",
      title: "5. Your Rights",
      icon: <FiLock className="text-[#F3BA18]" />,
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
      id: "data-security",
      title: "6. Data Security",
      icon: <FiShield className="text-[#F3BA18]" />,
      text: `We implement appropriate measures like encryption and firewalls. However, no online method is 100% secure.`,
    },
    {
      id: "third-party",
      title: "7. Third-Party Links",
      icon: <FiLink className="text-[#F3BA18]" />,
      text: `Our platform may link to third-party websites. We're not responsible for their privacy policies.`,
    },
    {
      id: "children-privacy",
      title: "8. Children's Privacy",
      icon: <FiUser className="text-[#F3BA18]" />,
      text: `We do not knowingly collect personal data from children under 13. If found, we will delete such data.`,
    },
    {
      id: "policy-changes",
      title: "9. Changes to This Policy",
      icon: <FiClock className="text-[#F3BA18]" />,
      text: `We may update this policy. Review periodically for updates.`,
    },
    {
      id: "contact-us",
      title: "10. Contact Us",
      icon: <FiMail className="text-[#F3BA18]" />,
      text: `The Fame Exchange
Email: privacy@thefameexchange.com
Phone: 1-800-123-4567
Website: www.thefameexchange.com`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".policy-section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MotionPageWrapper>
      <div className="min-h-screen bg-[#171717] text-white">
        <Navbar />

        <div className="container mx-auto mt-10 lg:mt-16 px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F3BA18]/20 text-[#F3BA18] mb-6">
              <FiShield className="mr-2" />
              <span className="text-sm font-medium">Privacy Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F3BA18]">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-400">
              Effective Date: June 15, 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-[#222222] rounded-xl p-8 mb-12 border border-[#333333]">
            <p className="text-gray-300 text-lg leading-relaxed">
              At The Fame Exchange, we are committed to protecting your privacy
              and ensuring that your personal data is handled in a secure and
              responsible manner. This Privacy Policy outlines the types of
              information we collect, how we use it, and the steps we take to
              protect your personal data. By using our platform, you agree to
              the collection and use of your information in accordance with this
              policy.
            </p>
          </div>

          {/* Table of Contents (Sticky) */}
          <div className="sticky top-24 z-20 mb-8 bg-[#222222]/90 backdrop-blur-sm border border-[#333333] rounded-xl p-4 shadow-lg">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              Jump to Section
            </h3>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 flex items-center ${
                    activeSection === section.id
                      ? "bg-[#F3BA18] text-[#171717]"
                      : "bg-[#333333] hover:bg-[#F3BA18]/20 text-gray-300"
                  }`}
                >
                  {section.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={`policy-section bg-[#222222] rounded-xl border border-[#333333] p-8 transition-all ${
                  activeSection === section.id ? "border-[#F3BA18]/50" : ""
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg mr-4 bg-[#F3BA18]/10">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>

                {section.text && (
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.text}
                  </p>
                )}

                {section.bullets && (
                  <ul className="mt-4 space-y-3">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#F3BA18] mr-2 mt-1">•</span>
                        <span className="text-gray-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.note && (
                  <div className="mt-6 p-4 bg-[#333333] border-l-4 border-[#F3BA18] rounded-r-lg">
                    <p className="text-gray-400 italic">{section.note}</p>
                  </div>
                )}

                {section.content && (
                  <div className="mt-6 space-y-6">
                    {section.content.map((content, i) => (
                      <div
                        key={i}
                        className="bg-[#333333]/50 p-4 rounded-lg border border-[#444444]"
                      >
                        {content.subtitle && (
                          <h3 className="text-lg font-semibold text-[#F3BA18] mb-2">
                            {content.subtitle}
                          </h3>
                        )}
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {content.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </MotionPageWrapper>
  );
};

export default PrivacyPolicy;
