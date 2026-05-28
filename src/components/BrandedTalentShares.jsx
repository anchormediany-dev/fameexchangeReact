import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import imageText from "../assets/images/fame-exchange-image-text.png";
import { Link } from "react-router-dom";
import { imgSrc } from "../utils/imgSrc";
import { handleImageError } from "../utils/imagePlaceholder";
import SectionDivider from "./SectionDivider";

// ----- formatting helpers -----
const toNum = (v) => {
  if (v === 0) return 0;
  if (v === null || v === undefined || v === "") return null;
  const n = Number(String(v).replace(/[, $]/g, ""));
  return Number.isFinite(n) ? n : null;
};
const fmtMoney = (v) => {
  const n = toNum(v);
  return n === null
    ? "___"
    : n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: n >= 100 ? 0 : 2,
      });
};
const fmtNumber = (v) => {
  const n = toNum(v);
  return n === null ? "___" : n.toLocaleString("en-US");
};
const fmtPct = (v) => {
  const n = toNum(v);
  if (n === null) return "";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
};
const fmtChange = (v) => {
  const n = toNum(v);
  if (n === null) return "___";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}`;
};
const TalentTokenTicker = ({
  talent,
  isLoading,
  isError,
  error,
  onRefresh,
  viewAll,
}) => {
  if (isLoading) return <div>Loading…</div>;
  if (isError)
    return <div className="text-red-600">{String(error?.data || error)}</div>;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Custom D3 Chart Component
  const D3Chart = ({ data, color, width = 112, height = 56, index }) => {
    const svgRef = useRef(null);

    useEffect(() => {
      if (!data || data.length === 0) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous content

      const margin = { top: 4, right: 4, bottom: 4, left: 4 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Create scales
      const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, innerWidth]);

      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.pv))
        .range([innerHeight, 0]);

      // Create line generator with curve
      const line = d3
        .line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.pv))
        .curve(d3.curveCatmullRom.alpha(0.5)); // Smooth curve

      // Create container group
      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Add the line path
      const path = g
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2.5)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("d", line);

      // Animate the line drawing
      const totalLength = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .delay(1000 + index * 200)
        .ease(d3.easeQuadInOut)
        .attr("stroke-dashoffset", 0);
    }, [data, color, width, height, index, isInView]);

    return (
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible"
      />
    );
  };

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const tableRowVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const chartVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.4 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const talentTokenData = [
    {
      name: "APEX",
      fullName: "Digital Artist",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c22d9acb?w=100&h=100&fit=crop&crop=face",
      comprisedValue: "100,000,000",
      availableTokens: "1,000,000",
      costPerToken: "$100",
      change: "+0.46%",
      volume: "$5,100,671,139",
      isPositive: true,
      graphData: [
        { pv: 120 },
        { pv: 125 },
        { pv: 118 },
        { pv: 135 },
        { pv: 128 },
        { pv: 142 },
        { pv: 138 },
        { pv: 155 },
        { pv: 148 },
        { pv: 162 },
        { pv: 158 },
        { pv: 145 },
        { pv: 152 },
        { pv: 168 },
        { pv: 165 },
        { pv: 172 },
        { pv: 169 },
        { pv: 175 },
      ],
    },
    {
      name: "NOVA",
      fullName: "Pop Sensation",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      comprisedValue: "1,234,472,196",
      availableTokens: "1,000,000",
      costPerToken: "$1,234.50",
      change: "+0.60%",
      volume: "$270,472,963,871.67",
      isPositive: true,
      graphData: [
        { pv: 80 },
        { pv: 88 },
        { pv: 82 },
        { pv: 95 },
        { pv: 90 },
        { pv: 105 },
        { pv: 98 },
        { pv: 112 },
        { pv: 108 },
        { pv: 125 },
        { pv: 118 },
        { pv: 132 },
        { pv: 128 },
        { pv: 140 },
        { pv: 135 },
        { pv: 148 },
        { pv: 142 },
        { pv: 155 },
      ],
    },
    {
      name: "ECHO",
      fullName: "Indie Musician",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      comprisedValue: "0,000,000,000",
      availableTokens: "1,000,000",
      costPerToken: "$0,000.00",
      change: "0.00%",
      volume: "$0,000,000.00",
      isPositive: false,
      graphData: [
        { pv: 140 },
        { pv: 135 },
        { pv: 142 },
        { pv: 128 },
        { pv: 134 },
        { pv: 122 },
        { pv: 118 },
        { pv: 125 },
        { pv: 115 },
        { pv: 108 },
        { pv: 112 },
        { pv: 98 },
        { pv: 105 },
        { pv: 92 },
        { pv: 88 },
        { pv: 95 },
        { pv: 85 },
        { pv: 82 },
      ],
    },
    {
      name: "FLUX",
      fullName: "Electronic Producer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      comprisedValue: "0,000,000,000",
      availableTokens: "1,000,000",
      costPerToken: "$0,000.00",
      change: "+0.00%",
      volume: "$0,000,000.00",
      isPositive: true,
      graphData: [
        { pv: 25 },
        { pv: 32 },
        { pv: 28 },
        { pv: 38 },
        { pv: 35 },
        { pv: 45 },
        { pv: 42 },
        { pv: 38 },
        { pv: 48 },
        { pv: 52 },
        { pv: 48 },
        { pv: 58 },
        { pv: 55 },
        { pv: 62 },
        { pv: 68 },
        { pv: 65 },
        { pv: 72 },
        { pv: 78 },
      ],
    },
    {
      name: "VIBE",
      fullName: "R&B Artist",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      comprisedValue: "0,000,000,000",
      availableTokens: "1,000,000",
      costPerToken: "$0,000.00",
      change: "-0.12%",
      volume: "$0,000,000.00",
      isPositive: false,
      graphData: [
        { pv: 95 },
        { pv: 92 },
        { pv: 98 },
        { pv: 88 },
        { pv: 85 },
        { pv: 92 },
        { pv: 82 },
        { pv: 78 },
        { pv: 85 },
        { pv: 75 },
        { pv: 72 },
        { pv: 78 },
        { pv: 68 },
        { pv: 65 },
        { pv: 72 },
        { pv: 62 },
        { pv: 58 },
        { pv: 55 },
      ],
    },
    {
      name: "SYNTH",
      fullName: "Synthwave Producer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      comprisedValue: "0,000,000,000",
      availableTokens: "1,000,000",
      costPerToken: "$0,000.00",
      change: "+0.25%",
      volume: "$0,000,000.00",
      isPositive: true,
      graphData: [
        { pv: 15 },
        { pv: 18 },
        { pv: 22 },
        { pv: 19 },
        { pv: 28 },
        { pv: 32 },
        { pv: 28 },
        { pv: 35 },
        { pv: 38 },
        { pv: 42 },
        { pv: 38 },
        { pv: 48 },
        { pv: 45 },
        { pv: 52 },
        { pv: 58 },
        { pv: 55 },
        { pv: 62 },
        { pv: 68 },
      ],
    },
  ];
  const isTalent = JSON.parse(localStorage.getItem("user"))?.role === "TALENT";
  const talentWorthData = talent?.concate?.talentTokenData;
  return (
    <div
      ref={sectionRef}
      id="top-talent"
      className="bg-[#171717] text-white  py-12 2xl:py-16"
    >
       <SectionDivider />
      <motion.div
        variants={fadeInUpVariant}
        initial="hidden"
        animate={controls}
        className="mt-2 container"
      >
        {/* <img
          style={{
            width: "-webkit-fill-available",
          }}
          src={imageText}
          alt="Graphic Text"
        /> */}
       
      </motion.div>

      <div className="container mt-10 lg:mt-16 2xl:mt-20 px-4 relative z-10">
        <div className="flex justify-between items-center w-full">
          <motion.h1
            variants={fadeInUpVariant}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
            className="custom-heading-two text-[#a38b41] mb-8 flex-grow text-center" // flex-grow ensures it takes available space
          >
            Top Branded Talent Shares (BTS)
          </motion.h1>

          {!isTalent && (
            <Link
              className="custom-button-two ml-4" // ml-4 adds margin to separate from heading
              to="/all-talents"
            >
              View All Talents
            </Link>
          )}
        </div>
        {/* Table Container */}
        {(() => {
          const items = (talent ?? []).slice(0, viewAll ? 8 : talent.length);

          const renderTableRow = (token, index, compact = false) => {
            const change = toNum(token?.change);
            const isPositive =
              typeof token?.isPositive === "boolean"
                ? token.isPositive
                : (change ?? 0) >= 0;
            const imageUrl =
              token?.image ||
              token?.images?.[0]?.fileUrl ||
              token?.profile_picture ||
              "";
            return (
              <motion.div
                key={token?._id || index}
                custom={token?._id || index}
                variants={tableRowVariant}
                initial="hidden"
                animate={controls}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  scale: 1.01,
                  transition: { duration: 0.3 },
                }}
                className={`grid grid-cols-8 gap-2 ${
                  compact ? "py-3 px-3" : "md:gap-4 py-5 px-6"
                } items-center hover:shadow-lg transition-all duration-300 group`}
              >
                {/* Talent Token Image + Name */}
                <div className="col-span-2 flex items-center gap-2 md:gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <img
                      src={imgSrc(imageUrl)}
                      alt={token?.name || token?.token_brand_name || "talent"}
                      onError={handleImageError}
                      className={`${
                        compact
                          ? "w-10 h-10"
                          : "w-12 h-12 md:w-16 md:h-16"
                      } rounded-full object-cover border-2 border-gray-600 group-hover:border-gray-400 transition-all duration-300 shadow-lg bg-[#1f1f1f]`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
                  </motion.div>
                  <div className="min-w-0">
                    <Link
                      to={`/talent-profile/${token?._id}`}
                      className={`${
                        compact ? "text-xs" : "text-sm md:text-base"
                      } cursor-pointer font-bold text-white group-hover:text-gray-200 transition-colors duration-300 truncate block`}
                    >
                      {token?.name || token?.token_brand_name || "___"}
                    </Link>
                    <div className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 truncate">
                      {token?.token_name || token?.token_brand_name || "___"}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-center ${
                    compact ? "text-[11px]" : "text-xs md:text-sm"
                  } font-medium text-gray-200 group-hover:text-white transition-colors duration-300`}
                >
                  {fmtMoney(token?.bts_worth ?? token?.networth)}
                </div>
                <div
                  className={`text-center ${
                    compact ? "text-[11px]" : "text-xs md:text-sm"
                  } font-semibold text-gray-100 group-hover:text-white transition-colors duration-300`}
                >
                  {fmtMoney(token?.cost_per_unit)}
                </div>
                <div
                  className={`text-center ${
                    compact ? "text-[11px]" : "text-xs md:text-sm"
                  } font-bold transition-all duration-300 ${
                    isPositive
                      ? "text-[#1fbaa1] group-hover:text-emerald-300"
                      : "text-[#e3495d] group-hover:text-red-300"
                  }`}
                >
                  <div>{fmtChange(token?.change)}</div>
                  {token?.change_percent !== undefined &&
                    token?.change_percent !== null && (
                      <div className="text-[10px] opacity-80">
                        {fmtPct(token?.change_percent)}
                      </div>
                    )}
                </div>
                <div
                  className={`text-center ${
                    compact ? "text-[11px]" : "text-xs md:text-sm"
                  } text-gray-200 group-hover:text-white transition-colors duration-300`}
                >
                  {fmtNumber(token?.volume)}
                </div>
                <div className="flex justify-center">
                  <motion.div
                    custom={index}
                    variants={chartVariant}
                    initial="hidden"
                    animate={controls}
                    whileHover={{ scale: 1.08 }}
                    className={`${
                      compact ? "w-16 h-8" : "w-24 h-12 md:w-28 md:h-14"
                    } rounded-xl p-1 flex items-center justify-center`}
                  >
                    {Array.isArray(token?.performance) &&
                    token.performance.length > 0 ? (
                      <D3Chart
                        data={token.performance}
                        color={isPositive ? "#1fbaa1" : "#e3495d"}
                        width={compact ? 64 : 112}
                        height={compact ? 32 : 56}
                        index={index}
                      />
                    ) : (
                      <span className="text-gray-500 text-xs">___</span>
                    )}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/trade-talent/${token?._id}`}
                      className="flex justify-center"
                    >
                      <motion.button
                        className="custom-button-two"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        TRADE
                      </motion.button>
                    </Link>
                    <Link
                      to={`/talent-profile/${token?._id}`}
                      className="flex justify-center"
                    >
                      <motion.button
                        className={`${
                          compact ? "text-[10px]" : "text-xs"
                        } underline cursor-pointer`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        View Profile
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          };

          const renderTableHeader = (compact = false) => (
            <div
              className={`grid grid-cols-8 gap-2 ${
                compact ? "py-3 px-3 text-[10px]" : "md:gap-4 py-5 px-6 text-sm"
              } bg-gradient-to-r from-[#2d2d2d] via-[#353535] to-[#2d2d2d] text-gray-200 font-bold border-b border-gray-500/40 backdrop-blur-sm uppercase tracking-wide`}
            >
              <div className="col-span-2 text-left">Talent Share</div>
              <div className="text-center">BTS Worth</div>
              <div className="text-center">Cost / Unit</div>
              <div className="text-center">Change</div>
              <div className="text-center">Volume</div>
              <div className="text-center">Performance</div>
              <div className="text-center">Action</div>
            </div>
          );

          if (viewAll) {
            // Home page: render the SAME single-row wide table as /branded-tokens-shares
            // but limited to top 8 with a "Discover More" button below.
            return (
              <motion.div
                variants={fadeInUpVariant}
                initial="hidden"
                animate={controls}
                transition={{ delay: 0.3 }}
                className="overflow-x-auto"
              >
                <div className="min-w-[1000px] bg-gradient-to-br from-[#1a1a1a]/90 to-[#252525]/90 backdrop-blur-xl rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl">
                  {renderTableHeader(false)}
                  <div className="divide-y divide-gray-700/30">
                    {items.map((token, index) => renderTableRow(token, index))}
                  </div>
                </div>
              </motion.div>
            );
          }

          // Branded shares page: keep wide table layout with reduced columns
          return (
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.3 }}
              className="overflow-x-auto"
            >
              <div className="min-w-[1000px] bg-gradient-to-br from-[#1a1a1a]/90 to-[#252525]/90 backdrop-blur-xl rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl">
                {renderTableHeader(false)}

                {/* Table Body */}
                <div className="divide-y divide-gray-700/30 h-[1000px] overflow-y-auto overflow-x-hidden">
                  {items.map((token, index) => renderTableRow(token, index))}
                </div>
              </div>
            </motion.div>
          );
        })()}
        {viewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/branded-tokens-shares"
              className="flex justify-center mt-10"
            >
              <motion.button
                className="custom-button-two"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                DISCOVER MORE
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Modern Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/4 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/3 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-3/4 left-1/4 w-64 h-64 bg-orange-500/3 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TalentTokenTicker;
