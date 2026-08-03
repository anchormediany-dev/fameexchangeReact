import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNewsletterSubscribeMutation } from "../app/authApi";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const [subscribe, { isLoading, reset }] = useNewsletterSubscribeMutation();

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    focus: { scale: 1.02, transition: { duration: 0.2, ease: "easeInOut" } },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#d4c374",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.97, transition: { duration: 0.1 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const response = await subscribe({
        email: email.trim(),
        source: "footer-form",
      }).unwrap();
      toast.success(response?.message);
      setEmail("");
      reset();
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to subscribe. Please try again."
      );
    }
  };

  const isInvalid = !email.trim() || !/^\S+@\S+\.\S+$/.test(email);

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.h3
        className="footer_nav_title text-[#f2f2f2] mb-2"
        variants={itemVariants}
      >
        NEWSLETTER
      </motion.h3>

      <motion.p
        className="footer_paragraph text-[#bfbfbf]"
        variants={itemVariants}
      >
        Sign up today for tips and the latest news and information
      </motion.p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <motion.input
          type="email"
          placeholder="EMAIL ADDRESS"
          className="w-full p-2 bg-transparent border-b border-white outline-none"
          variants={inputVariants}
          whileFocus="focus"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <motion.button
          type="submit"
          className={`w-full py-2 px-4 text-white font-medium rounded-md shadow-md ${
            isInvalid || isLoading
              ? "bg-[#a38b41]/60 cursor-not-allowed"
              : "bg-[#a38b41]"
          }`}
          variants={buttonVariants}
          whileHover={!isInvalid && !isLoading ? "hover" : undefined}
          whileTap={!isInvalid && !isLoading ? "tap" : undefined}
          disabled={isInvalid || isLoading}
        >
          {isLoading ? "SUBSCRIBING..." : "SUBSCRIBE"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Newsletter;
