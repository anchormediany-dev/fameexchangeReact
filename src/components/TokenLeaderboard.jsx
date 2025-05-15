import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import FeatureSection from "./FeatureSection";
import Futures from "./Futures";
import { Link } from "react-router-dom";

const tokenData = [
  {
    name: "PINK",
    ticker: "",
    price: "$30,448.36",
    change: "+4.38%",
    volume: "$575,133,390,800.07",
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
    name: "LADY GAGA",
    ticker: "LG",
    price: "$2,032.88",
    change: "+3.71%",
    volume: "$242,905,689,273.08",
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
    name: "AREOSMITH",
    ticker: "AREO",
    price: "$0.539243",
    change: "+3.20%",
    volume: "$17,899,492,334.76",
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
    name: "LUKE BRYAB",
    ticker: "LB",
    price: "$0.087579",
    change: "+2.37%",
    volume: "$11,449,751,884.63",
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
    name: "GUNS-N-ROSES",
    ticker: "GNR",
    price: "$10.07",
    change: "+3.53%",
    volume: "$9,825,193,231.74",
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

const TokenLeaderboard = () => {
  return (
    <section
      id="token-leaderboard"
      className="text-white px-4 py-12 min-h-screen overflow-hidden relative"
      style={{
        backgroundImage: `
          radial-gradient(at top left, #434343 0%, transparent 60%),
          radial-gradient(at top right, #363636 0%, transparent 60%),
          radial-gradient(at bottom left, #2d2d2d 0%, transparent 60%),
          radial-gradient(at bottom right, #111111 0%, transparent 60%),
          linear-gradient(to bottom, #0b0b0b, #000)`,
        backgroundColor: "#000000",
      }}
    >
      {/* Decorative Bubbles */}
      <div className="absolute w-60 h-60 bg-white/10 rounded-full top-[-80px] left-[-60px] z-0" />
      <div className="absolute w-40 h-40 bg-white/10 rounded-full bottom-[-40px] right-[-40px] z-0" />
      <div className="absolute w-32 h-32 bg-white/5 rounded-full bottom-[100px] right-[50px] z-0" />
      <div className="container">
        <h2 className="text-p2 py-5 sm:text-p1 md:text-h6 lg:text-h5 xl:text-h4 2xl:text-h3 lg:text-5xl font-bold text-center text-primary">
          20
          <span className="text-white"> TOP BRANDED TALENT TOKENS</span>
        </h2>

        <div className="space-y-6">
          {tokenData.map((token, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center gap-1 md:justify-between bg-[#111111] rounded-xl px-6 py-4 shadow-lg hover:scale-[1.01] transition-transform"
            >
              <div className="text-p4 pl-5 md:pl-0 2xl:text-p1 font-bold md:w-[160px] lg:w-[240px] xl:w-[320px]">
                {token.name}{" "}
                <span className="text-sm text-gray-400 font-light">
                  {token.ticker}
                </span>
              </div>
              <div className="w-28 text-right md:text-left text-white font-medium">
                {token.price}
              </div>
              <div className="w-20 text-right md:text-left text-darkOrange font-medium">
                {token.change}
              </div>
              <div className="flex-1 text-gray-300 text-sm text-right md:text-left truncate">
                {token.volume}
              </div>
              <div className="flex-1 mr-3 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={token.graphData}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#A68736"
                      strokeWidth={1}
                      dot={false}
                      animationDuration={800}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <button className="bg-gray cursor-pointer text-yellow-400 px-8 py-3 rounded-xl transition-colors duration-300 shadow-[4px_4px_4px_#000000EB,_-4px_-4px_12px_#FFFFFF08]">
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/talent-tokens"
            className="bg-lightYellow hover:scale-105 cursor-pointer text-black font-medium px-6 py-3 rounded-md transition-all duration-300 relative group text-p5 2xl:text-p1"
          >
            Discover More
          </Link>
        </div>
      </div>
      <FeatureSection />
      <Futures />
    </section>
  );
};

export default TokenLeaderboard;
