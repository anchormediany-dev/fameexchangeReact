import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import faqItems from "../../data/faqData";
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

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="flex-grow mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2"
        id="faqs"
      >
        <div className="container max-w-screen-xl mx-auto flex flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* <h2 className="gredient-text text-center text-3xl sm:text-4xl lg:text-5xl font-bold">
            Frequently Asked Questions
          </h2> */}
          {isError ? (
            <div
              style={{
                textAlign: "center",
                color: "#a38b41",
                margin: "40px 0",
              }}
            >
              {isError
                ? "Failed to load FAQs. Please try again."
                : "No frequently asked questions available."}
            </div>
          ) : (
            <div className=" mx-auto">
              <h2 className="gredient-text text-center text-3xl sm:text-4xl lg:text-5xl font-bold">
                GENERAL QUESTIONS ABOUT THE FAME EXCHANGE
              </h2>
              {data?.data?.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  toggleOpen={toggleOpen}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default FAQ;
