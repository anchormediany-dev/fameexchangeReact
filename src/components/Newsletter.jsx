import { motion } from "framer-motion";

const Newsletter = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div variants={itemVariants}>
      <motion.h3
        className="footer_nav_title text-[#f2f2f2] mb-5"
        variants={itemVariants}
      >
        NEWSLETTER
      </motion.h3>
      <motion.p
        className="footer_paragraph mb-4 text-[#bfbfbf]"
        variants={itemVariants}
      >
        Sign up today for tips and the latest news and information
      </motion.p>
      <motion.input
        type="email"
        placeholder="EMAIL ADDRESS"
        className="w-full p-2 bg-transparent border-b border-white outline-none"
        variants={inputVariants}
        whileFocus="focus"
      />
    </motion.div>
  );
};

export default Newsletter;
