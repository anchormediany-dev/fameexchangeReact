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
  const [openIndex, setOpenIndex] = useState(null);
  const { data, isLoading, error, isError } = useGetAllFaqsQuery();

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ---- sort + slice ----
  const allFaqsRaw = data?.data || [];

  // first sort api data (assuming there is an "order" field)
  const allFaqs = [...allFaqsRaw].sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    return 0; // fallback: keep original order
  });

  const generalFaqs = allFaqs.slice(0, 20); // 01–20
  const fansFaqs = allFaqs.slice(20, 30); // 20–30
  const talentFaqs = allFaqs.slice(30, 40); // 30–40
  const businessFaqs = allFaqs.slice(40, 45); // 40–45
  const securityFaqs = allFaqs.slice(45, 50); // 45–50
  const supportFaqs = allFaqs.slice(50, 53); // 50–53

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="flex-grow mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2"
        id="faqs"
      >
        <div className="container max-w-screen-xl mx-auto flex flex-col gap-12 px-4 sm:px-6 lg:px-8">
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
          ) : !allFaqs.length ? (
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
            <div className="mx-auto max-w-4xl space-y-10">
              {/* 01–20 GENERAL QUESTIONS */}
              {generalFaqs.length > 0 && (
                <div>
                  <h2 className="gredient-text text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                    GENERAL QUESTIONS ABOUT THE FAME EXCHANGE
                  </h2>
                  {generalFaqs.map((faq, idx) => {
                    const globalIndex = 0 + idx;
                    return (
                      <FAQItem
                        key={globalIndex}
                        faq={faq}
                        index={globalIndex}
                        isOpen={openIndex === globalIndex}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* 20–30 FANS / INVESTORS */}
              {fansFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    FANS / INVESTORS
                  </h2>
                  {fansFaqs.map((faq, idx) => {
                    const globalIndex = 20 + idx;
                    return (
                      <FAQItem
                        key={globalIndex}
                        faq={faq}
                        index={globalIndex}
                        isOpen={openIndex === globalIndex}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* 30–40 TALENT / ATHLETES / INFLUENCERS */}
              {talentFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    TALENT / ATHLETES / INFLUENCERS
                  </h2>
                  {talentFaqs.map((faq, idx) => {
                    const globalIndex = 30 + idx;
                    return (
                      <FAQItem
                        key={globalIndex}
                        faq={faq}
                        index={globalIndex}
                        isOpen={openIndex === globalIndex}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* 40–45 BUSINESS / PARTNERSHIPS */}
              {businessFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    BUSINESS / PARTNERSHIPS
                  </h2>
                  {businessFaqs.map((faq, idx) => {
                    const globalIndex = 40 + idx;
                    return (
                      <FAQItem
                        key={globalIndex}
                        faq={faq}
                        index={globalIndex}
                        isOpen={openIndex === globalIndex}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* 45–50 SECURITY / LEGAL / COMPLIANCE */}
              {securityFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    SECURITY / LEGAL / COMPLIANCE
                  </h2>
                  {securityFaqs.map((faq, idx) => {
                    const globalIndex = 45 + idx;
                    return (
                      <FAQItem
                        key={globalIndex}
                        faq={faq}
                        index={globalIndex}
                        isOpen={openIndex === globalIndex}
                        toggleOpen={toggleOpen}
                      />
                    );
                  })}
                </div>
              )}

              {/* 50–53 SUPPORT & CONTACT */}
              {supportFaqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="gredient-text text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    SUPPORT & CONTACT
                  </h2>
                  {supportFaqs.map((faq, idx) => {
                    const globalIndex = 50 + idx;
                    return (
                      <FAQItem
                        key={globalIndex}
                        faq={faq}
                        index={globalIndex}
                        isOpen={openIndex === globalIndex}
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
