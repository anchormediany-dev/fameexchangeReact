import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const faqData = [
  {
    question: "How can I use the website?",
    answer:
      "To use the website, simply navigate through the different sections using the navigation bar. Click on the titles or buttons to explore the content. If you have specific questions, feel free to reach out through our contact form.",
  },
  {
    question: "What are the website features?",
    answer:
      "Our website offers a variety of features including user registration, content browsing, interactive tools, and personalized recommendations. Explore each section to discover all the functionalities available.",
  },
  {
    question: "Is there a support team available?",
    answer:
      'Yes, we have a dedicated support team ready to assist you. You can contact us through the "Contact Us" page or email us directly. We aim to respond to all inquiries within 24-48 hours.',
  },
  {
    question: "How often is the content updated?",
    answer:
      "We strive to keep our content fresh and relevant. Updates are typically rolled out on a weekly basis, but important announcements and critical information may be updated more frequently.",
  },
];

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
    <div className="border-b border-gray-700 py-4">
      <motion.div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleOpen(index)}
        variants={questionVariants}
        animate={isOpen ? "open" : "closed"}
      >
        <h3 className="text-lg font-medium">{faq.question}</h3>
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
        <p className="text-gray-400">{faq.answer}</p>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16">
      <Navbar />
      <div className="bg-[#0b0b0b] py-12" id="faqs">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                toggleOpen={toggleOpen}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default FAQ;
