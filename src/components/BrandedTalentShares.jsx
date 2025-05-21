import { LineChart, Line, ResponsiveContainer } from "recharts";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import imageText from "../assets/images/fame-exchange-image-text.png";

const BrandedTalentShares = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const tableRowVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const chartVariant = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: (i) => ({
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.6,
        delay: 0.6 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.9 },
    },
  };

  const talentData = [
    {
      name: "Pink",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 400 },
        { pv: 420 },
        { pv: 390 },
        { pv: 430 },
        { pv: 460 },
        { pv: 450 },
        { pv: 470 },
      ],
    },
    {
      name: "Lady Gaga",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 310 },
        { pv: 340 },
        { pv: 320 },
        { pv: 350 },
        { pv: 360 },
        { pv: 370 },
        { pv: 390 },
      ],
    },
    {
      name: "Aerosmith",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 10 },
        { pv: 15 },
        { pv: 12 },
        { pv: 18 },
        { pv: 20 },
        { pv: 25 },
        { pv: 23 },
      ],
    },
    {
      name: "Luke Bryan",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 5 },
        { pv: 7 },
        { pv: 6 },
        { pv: 8 },
        { pv: 7.5 },
        { pv: 9 },
        { pv: 10 },
      ],
    },
    {
      name: "Guns-N-Roses",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 60 },
        { pv: 62 },
        { pv: 61 },
        { pv: 65 },
        { pv: 68 },
        { pv: 67 },
        { pv: 70 },
      ],
    },
  ];

  // Chart animation setup - draw the line progressively
  const chartLineRef = useRef([]);

  useEffect(() => {
    if (isInView && chartLineRef.current.length > 0) {
      chartLineRef.current.forEach((chart, index) => {
        if (chart) {
          setTimeout(() => {
            // Find the SVG path element within the chart
            const path = chart.querySelector(".recharts-line-curve");
            if (path) {
              // Get the total length of the path
              const length = path.getTotalLength();

              // Set up the animation
              path.style.strokeDasharray = length;
              path.style.strokeDashoffset = length;
              path.style.transition = "stroke-dashoffset 1.5s ease-in-out";

              // Trigger the animation
              setTimeout(() => {
                path.style.strokeDashoffset = 0;
              }, 100);
            }
          }, 800 + index * 150); // Staggered delay for each chart
        }
      });
    }
  }, [isInView]);

  return (
    <div
      ref={sectionRef}
      id="brands"
      className="bg-[#171717] text-white py-12 2xl:py-16"
    >
      <motion.div
        variants={fadeInUpVariant}
        initial="hidden"
        animate={controls}
        className="mt-2 container"
      >
        <img
          style={{
            width: "-webkit-fill-available",
          }}
          src={imageText}
          alt="Graphic Text"
        />
      </motion.div>

      <div className="container">
        <motion.h1
          variants={fadeInUpVariant}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.2 }}
          className="custom-heading-two mb-8 text-center"
        >
          Top Branded Talent Shares (BTS)
        </motion.h1>

        {/* Table */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.3 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            {/* Table Body */}
            <tbody>
              {talentData.map((talent, index) => (
                <motion.tr
                  key={index}
                  custom={index}
                  variants={tableRowVariant}
                  initial="hidden"
                  animate={controls}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    transition: { duration: 0.2 },
                  }}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                >
                  {/* Artist Name */}
                  <td className="py-4 custom-heading-six px-4 font-medium">
                    {talent.name}
                  </td>

                  {/* Price */}
                  <td className="py-4 custom-heading-six px-4 text-right">
                    {talent.price}
                  </td>

                  {/* Change */}
                  <td className="py-4 custom-heading-six px-4 text-right text-[#15ab9c]">
                    {talent.change}
                  </td>

                  {/* Volume */}
                  <td className="py-4 px-4 custom-heading-six text-right">
                    {talent.volume}
                  </td>

                  {/* Trade Now Button with Chart */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-4">
                      <motion.div
                        custom={index}
                        variants={chartVariant}
                        initial="hidden"
                        animate={controls}
                        className="w-24 h-10"
                        ref={(el) => (chartLineRef.current[index] = el)}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={talent.graphData}>
                            <Line
                              type="monotone"
                              dataKey="pv"
                              stroke="#15ab9c"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#e0aa0d] cursor-pointer hover:brightness-110 transition-all text-white px-4 py-2 rounded-md whitespace-nowrap"
                      >
                        Trade Now
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Learn More Button */}
        <motion.div
          variants={buttonVariant}
          initial="hidden"
          animate={controls}
          className="mt-10 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#e0aa0d] hover:brightness-110 transition-all cursor-pointer text-white py-3 px-6 rounded-md"
          >
            Learn more
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandedTalentShares;
