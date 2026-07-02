import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import coinSpin from "../assets/home/coin.gif";

const MESSAGES = [
  "Calculating your social net worth…",
  "Do you qualify to be a tradeable asset?",
  "Cross-referencing your connected platforms…",
  "Running the FameScore algorithm…",
  "Almost there…",
];

const MESSAGE_INTERVAL_MS = 1400;

export default function FameScoreCalculatingModal({ open }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setMessageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-live="polite"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="relative w-full max-w-sm bg-[#1f1f1f] border border-[#333] rounded-2xl p-10 flex flex-col items-center text-center gap-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="relative flex items-center justify-center h-32 w-32">
              <div className="absolute inset-0 rounded-full bg-[#F3BA18]/20 blur-xl animate-pulse" />
              <img
                src={coinSpin}
                alt=""
                className="relative w-28 h-28 select-none"
                draggable={false}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-white text-lg font-semibold min-h-[3.5rem] flex items-center justify-center"
              >
                {MESSAGES[messageIndex]}
              </motion.p>
            </AnimatePresence>

            <p className="text-gray-500 text-xs">
              This only takes a few seconds — hang tight.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
