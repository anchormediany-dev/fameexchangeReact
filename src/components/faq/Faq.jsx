import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import faqImage from "../../assets/images/faq.png";
import faqItems from "../../data/faqData";

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const goldColor = "#a38b41";
  const borderStyle = "2px solid #d9c698";

  return (
    <div
      className="faq-section relative w-full min-h-[80vh] overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${faqImage})`, opacity: 0.25 }}
      />

      {/* Content */}
      <div className="relative z-10 container px-4 py-12 2xl:py-16">
        <section className="flex flex-col xl:flex-row justify-between">
          {/* Left Section */}
          <div className="mb-10 w-full xl:max-w-xl">
            <h3 className="custom-heading-six mb-1 text-[#a38b41]">FAQ</h3>
            <h2 className="custom-heading-one text-[#a38b41] uppercase">
              FREQUENTLY ASKED <br /> QUESTIONS
            </h2>
            <p className="text-[#a38b41] mt-4">
              Looking for answers now? Just ask your question
              <br />
              and it will be answered.
            </p>
          </div>

          {/* Right Section - FAQ Accordion */}
          <div className="w-full xl:max-w-xl space-y-4">
            {faqItems.slice(0, 4).map((faq, index) => (
              <div
                key={index}
                style={{ border: borderStyle, borderRadius: 0 }}
                className="transition-all duration-300"
              >
                <div
                  className="flex justify-between items-center p-4 text-white cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-base font-medium">{faq.question}</h3>
                  {openFaq === index ? (
                    <FaMinus className="text-yellow-400" />
                  ) : (
                    <FaPlus className="text-yellow-400" />
                  )}
                </div>

                {openFaq === index && (
                  <div className="p-4 pt-0 text-white">
                    <p className="text-sm md:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}

            {/* View All Button */}
            <button
              onClick={() => navigate("/faq")}
              className="mt-6 flex items-center cursor-pointer justify-self-center px-6 py-3 rounded-lg gradient-bg text-black font-semibold shadow-md hover:scale-105 transition-transform duration-200"
            >
              <span className="text-base">View All FAQs</span>
              <FiArrowRightCircle className="ml-2 text-xl " />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faq;
