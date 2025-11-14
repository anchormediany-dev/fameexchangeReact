import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
// import faqItems from "../../data/faqData"; // not used now
import { useGetAllFaqsQuery } from "../../app/authApi";

const FAQItem = ({ faq, index, isOpen, toggleOpen }) => {
  const questionVariants = {
    open: { color: "#CCCC00" },
    closed: { color: "#ffffff" },
  };

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const answerVariants = {
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="border-b border-[#747474] py-4">
      <motion.div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleOpen(index)}
        variants={questionVariants}
        animate={isOpen ? "open" : "closed"}
      >
        <h3 className=" text-xl font-medium text-[#595959]">{faq.question}</h3>
        <motion.div
          className="text-white"
          variants={iconVariants}
          animate={isOpen ? "open" : "closed"}
        >
          <FaChevronDown />
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-2 overflow-hidden"
        variants={answerVariants}
        animate={isOpen ? "open" : "closed"}
      >
        <p className="text-gray-400 text-base">{faq.answer}</p>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [openKey, setOpenKey] = useState(null);
  const { data, isLoading, error, isError } = useGetAllFaqsQuery();

  const toggleOpen = (key) => {
    setOpenKey(openKey === key ? null : key);
  };

  // ---- map API response (grouped by "type") ----
  const faqGroups = data?.result || [];

  const getFaqsByType = (typeName) => {
    const group = faqGroups.find((g) => g.type === typeName);
    if (!group || !group.questions) return [];
    // sort inside each type (by createdAt, oldest → newest)
    const list = [...group.questions];
    list.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return da - db;
    });
    return list;
  };

  const generalFaqs = getFaqsByType(
    "GENERAL QUESTIONS ABOUT THE FAME EXCHANGE"
  );
  const fansFaqs = getFaqsByType("FANS / INVESTORS");
  const talentFaqs = getFaqsByType("TALENT / ATHLETES / INFLUENCERS");
  const businessFaqs = getFaqsByType("BUSINESS / PARTNERSHIPS");
  const securityFaqs = getFaqsByType("SECURITY / LEGAL / COMPLIANCE");
  const supportFaqs = getFaqsByType("SUPPORT & CONTACT"); // will render when backend adds this type

  const hasFaqs = faqGroups.some(
    (group) => group.questions && group.questions.length > 0
  );

  return (
    <section className="flex flex-col min-h-screen ">
      <Navbar />
      <div
        className="flex-grow mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2 pt-[120px]"
        id="faqs"
      >
        <div className=" flex flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div
              style={{
                textAlign: "center",
                color: "#a38b41",
                margin: "40px 0",
              }}
            >
              Loading FAQs…
            </div>
          ) : isError ? (
            <div
              style={{
                textAlign: "center",
                color: "#a38b41",
                margin: "40px 0",
              }}
            >
              Failed to load FAQs. Please try again.
            </div>
          ) : !hasFaqs ? (
            <div
              style={{
                textAlign: "center",
                color: "#a38b41",
                margin: "40px 0",
              }}
            >
              No frequently asked questions available.
            </div>
          ) : (
            <div className="container space-y-10">
              {/* GENERAL QUESTIONS ABOUT THE FAME EXCHANGE */}
              {generalFaqs.length > 0 && (
                <div>
                  <h2 className="gredient-text text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                    GENERAL QUESTIONS ABOUT THE FAME EXCHANGE
                  </h2>
                  {generalFaqs.map((faq, idx) => {
                    const key = `general-${faq._id || idx}`;
                    return (
                      <FAQItem
                        key={key}
                        faq={faq}
                        index={key}
                        isOpen={openKey === key}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* FANS / INVESTORS */}
              {fansFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    FANS / INVESTORS
                  </h2>
                  {fansFaqs.map((faq, idx) => {
                    const key = `fans-${faq._id || idx}`;
                    return (
                      <FAQItem
                        key={key}
                        faq={faq}
                        index={key}
                        isOpen={openKey === key}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* TALENT / ATHLETES / INFLUENCERS */}
              {talentFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    TALENT / ATHLETES / INFLUENCERS
                  </h2>
                  {talentFaqs.map((faq, idx) => {
                    const key = `talent-${faq._id || idx}`;
                    return (
                      <FAQItem
                        key={key}
                        faq={faq}
                        index={key}
                        isOpen={openKey === key}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* BUSINESS / PARTNERSHIPS */}
              {businessFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    BUSINESS / PARTNERSHIPS
                  </h2>
                  {businessFaqs.map((faq, idx) => {
                    const key = `business-${faq._id || idx}`;
                    return (
                      <FAQItem
                        key={key}
                        faq={faq}
                        index={key}
                        isOpen={openKey === key}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* SECURITY / LEGAL / COMPLIANCE */}
              {securityFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    SECURITY / LEGAL / COMPLIANCE
                  </h2>
                  {securityFaqs.map((faq, idx) => {
                    const key = `security-${faq._id || idx}`;
                    return (
                      <FAQItem
                        key={key}
                        faq={faq}
                        index={key}
                        isOpen={openKey === key}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* SUPPORT & CONTACT (when backend provides this type) */}
              {supportFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    SUPPORT & CONTACT
                  </h2>
                  {supportFaqs.map((faq, idx) => {
                    const key = `support-${faq._id || idx}`;
                    return (
                      <FAQItem
                        key={key}
                        faq={faq}
                        index={key}
                        isOpen={openKey === key}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default FAQ;
