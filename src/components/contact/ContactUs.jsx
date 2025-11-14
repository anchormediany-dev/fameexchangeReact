import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mapImage from "../../assets/images/map-ui.png";
import "./ContactUs.css";
import { useContactUsMutation } from "../../app/authApi";
import { toast } from "react-toastify";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactUs, { isLoading, isError, error, isSuccess }] =
    useContactUsMutation();
  useEffect(() => {
    setIsLoaded(true);

    // Initialize animations
    const animatePins = () => {
      const pins = document.querySelectorAll(".map-pin");
      pins.forEach((pin, index) => {
        setTimeout(() => {
          pin.classList.add("pulse");
          setTimeout(() => pin.classList.remove("pulse"), 1000);
        }, index * 300);
      });
    };

    // Run pin animation periodically
    animatePins();
    const interval = setInterval(animatePins, 5000);

    return () => clearInterval(interval);
  }, []);

  // Refined animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut",
      },
    },
  };

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInLeftVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const fadeInRightVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    idle: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const inputFocusVariants = {
    rest: {
      borderColor: "transparent",
    },
    focus: {
      borderColor: "#a38b41",
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await contactUs(formData).unwrap();
      toast.success(response?.message);

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact API error:", err);

      const msg =
        err?.data?.message ||
        err?.error ||
        "Failed to send your message. Please try again.";

      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const handleOpenApp = () => {
    window.open("https://your-app-link-or-store-url.com", "_blank");
  };
  return (
    <motion.div
      id="contact_us"
      className={`contact-container ${isLoaded ? "loaded" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="contact-inner 2xl:py-16 py-12 container">
        <motion.div
          className="contact-form-section"
          variants={fadeInLeftVariants}
        >
          <motion.div className="contact-header" variants={fadeInUpVariants}>
            <motion.h3 variants={fadeInUpVariants}>CONTACT US</motion.h3>
            <motion.h2 variants={fadeInUpVariants}>GET IN TOUCH</motion.h2>
            <motion.p variants={fadeInUpVariants}>
              Lost get directions with our map feature. Use the locator to find
              most all events.
            </motion.p>
          </motion.div>

          <motion.div className="contact-form" variants={containerVariants}>
            <motion.div
              className="md:flex md:flex-row flex-col md:gap-3"
              variants={fadeInUpVariants}
            >
              <motion.div
                className="form-group md:w-[50%]"
                variants={fadeInUpVariants}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="name">Your Name</label>
              </motion.div>

              <motion.div
                className="form-group md:w-[50%]"
                variants={fadeInUpVariants}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="email">Your Email</label>
              </motion.div>
            </motion.div>

            <motion.div className="form-group" variants={fadeInUpVariants}>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="subject">Subject</label>
            </motion.div>

            <motion.div className="form-group" variants={fadeInUpVariants}>
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="message">Write Message</label>
            </motion.div>

            <motion.button
              type="submit"
              onClick={handleSubmit}
              className="custom-button-two"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ display: "inline-block" }}
                >
                  ⟳
                </motion.span>
              ) : (
                "SEND MESSAGE"
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* <motion.div
          className="max-w-full lg:block hidden"
          variants={fadeInRightVariants}
        >
          <motion.img
            src={mapImage}
            alt="Map image"
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          />
          <motion.div className="flex justify-center items-center">
            {" "}
            <motion.button
              className="custom-button-two"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              onClick={handleOpenApp}
            >
              OPEN IN APP
            </motion.button>
          </motion.div>
        </motion.div> */}
        <div className="text-3xl font-bold  text-center text-[#a38b41] mt-4">
          Have something to say? <br />
          Tell us, we appreciate your feedback.
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
