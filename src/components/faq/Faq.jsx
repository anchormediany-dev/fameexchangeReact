import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import faqImage from "../../assets/images/faq.png";
const Faq = () => {
  const [openFaq, setOpenFaq] = useState(null);

  // Toggle FAQ open/close
  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  // FAQ data
  const faqItems = [
    {
      question: "Does signing up to TFE cost anything?",
      answer:
        "No, signing up to The Fame Exchange is completely free. There are no hidden fees or costs associated with creating an account on our platform.",
    },
    {
      question: "What is a Branded Talent Share (BTS)?",
      answer:
        "A Branded Talent Share (BTS) is a unique feature that allows artists to collaborate with brands while maintaining creative control. It creates mutual value for both the artist and the sponsoring brand.",
    },
    {
      question: "Can I trade multiple artists?",
      answer:
        "Yes, you can trade multiple artists on our platform. There is no limit to the number of artists you can support and trade on The Fame Exchange.",
    },
    {
      question: "How can I get qualified to become part of the TFE platform?",
      answer:
        "To qualify for the TFE platform, you need to meet certain criteria including having an established social media presence and demonstrating talent in your field. You can apply through our qualification form on the website.",
    },
  ];

  // CSS for exact match
  const goldColor = "#a38b41";
  const questionBoxStyle = {
    border: `2px solid #d9c698`,
    borderRadius: "0px",
    position: "relative",
  };

  return (
    <div
      className="faq-section relative w-full min-h-[80vh] overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${faqImage})`,
          opacity: 0.25,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 container px-4 py-12 2xl:py-16">
        <section className="flex justify-between flex-col xl:flex-row">
          {" "}
          {/* FAQ header */}
          <div className="mb-10 w-full xl:max-w-xl">
            <h3 className="custom-heading-six mb-1 text-[#a38b41]">FAQ</h3>
            <h2 className="custom-heading-one text-[#a38b41] uppercase ">
              FREQUENTLY ASKED
              <br />
              QUESTIONS
            </h2>
            <p className="text-[#a38b41]">
              Looking for answers now? Just ask your question
              <br />
              and it will be answered.
            </p>
          </div>
          {/* FAQ accordion */}
          <div className="w-full xl:max-w-xl space-y-4">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                style={questionBoxStyle}
                className="transition-all duration-300"
              >
                <div
                  className="flex justify-between items-center p-4 text-white bg-transparent cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-base font-normal">{faq.question}</h3>
                  <FaPlus />
                </div>

                {openFaq === index && (
                  <div className="p-4 pt-0 text-white">
                    <p className="text-sm md:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faq;
