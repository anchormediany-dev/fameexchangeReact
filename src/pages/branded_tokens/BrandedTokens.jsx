import React, { useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import btcChart from "../../assets/images/BTC_Logo.png";
import dcrChart from "../../assets/images/DCR_Logo.png";
import bnbChart from "../../assets/images/BNB_Logo.png";
import { FiSearch } from "react-icons/fi";
import Footer from "../../components/Footer";
import BrandedTokensNavbar from "../../components/BrandedTokensNavbar";

const chartData = [
  { value: 10 },
  { value: 20 },
  { value: 15 },
  { value: 30 },
  { value: 25 },
  { value: 40 },
];

const TokenRow = ({ name, price, change, volume, marketcap, index }) => {
  const isPositive = change >= 0;
  const bgColor = index % 2 === 0 ? "bg-[#0b0b0b]" : "bg-[#111]";
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-0 items-center py-4 px-3 text-white heading-500-20 ${bgColor}`}
    >
      <div className="md:px-2">{name}</div>
      <div className="md:px-2">${price}</div>
      <div
        className={`md:px-2 ${
          isPositive ? "text-[#15CF5F]" : "text-[#FF000D]"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}
      </div>
      <div className="md:px-2">{volume}</div>
      <div className="md:px-2">{marketcap}</div>
      <div className="w-full md:px-2">
        <ResponsiveContainer width="100%" height={30}>
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FFF"
              strokeWidth={2}
              dot={false}
            />
            <Tooltip contentStyle={{ display: "none" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="md:px-2">
        <button className="w-full md:w-auto bg-[#0B0B0B] text-primary heading-500-15 shadow-inset-light px-5 py-3 rounded-[12px] transition duration-300 ease-in-out hover:bg-primary hover:text-[#0B0B0B] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          Trade
        </button>
      </div>
    </div>
  );
};

const initialTokens = [
  {
    name: "Billy Idol",
    price: 0.01,
    change: 0.052,
    volume: "$1.00 D",
    marketcap: "$500 H",
  },
  {
    name: "Billy Idol",
    price: 0.6,
    change: 0.052,
    volume: "$2.00 D",
    marketcap: "$1K",
  },
  {
    name: "Billy Idol",
    price: 0.5,
    change: 0.052,
    volume: "$1.00 D",
    marketcap: "$1K",
  },
  {
    name: "Billy Idol",
    price: 0.2,
    change: 0.052,
    volume: "$1.00 D",
    marketcap: "$500 H",
  },
  {
    name: "Billy Idol",
    price: 0.1,
    change: -0.052,
    volume: "$1.00 D",
    marketcap: "$500 H",
  },
  {
    name: "Billy Idol",
    price: 0.5,
    change: 0.052,
    volume: "$2.00 D",
    marketcap: "$500 H",
  },
];

export default function BrandedTokens() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTokens = initialTokens.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-gradient-custom-horizontal bg-gradient-custom-vertical">
      <div className="relative min-h-screen container mt-20 text-white px-4 py-12 overflow-hidden">
        <BrandedTokensNavbar />

        {/* Background circles */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#686868] opacity-20"
              style={{
                width: `${20 + i * 5}px`,
                height: `${20 + i * 5}px`,
                top: `${(i * 10) % 100}%`,
                left: `${(i * 15) % 100}%`,
              }}
            ></div>
          ))}
        </div>

        {/* Heading */}
        <div className="relative z-10 mb-12">
          <h1 className="heading-500-50">
            TOP TALENT <span className="text-primary">TOKENS</span>
          </h1>
        </div>

        {/* Token Mini Charts */}
        <div className="relative z-10 flex flex-wrap gap-10 mb-10 lg:mb-20">
          {[
            { name: "BTC", image: btcChart },
            { name: "DCR", image: dcrChart },
            { name: "BNB", image: bnbChart },
          ].map((token, i) => (
            <div key={i} className="flex gap-[30px] items-center">
              <div className="flex flex-col items-center">
                <img
                  src={token.image}
                  alt={`${token.name} chart`}
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="heading-500-40 mt-2">{token.name}</p>
              </div>
              <ResponsiveContainer width={100} height={30}>
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#FFF"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative z-10 max-w-2xl mx-auto mb-10">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]">
            <FiSearch size={24} />
          </span>
          <input
            type="text"
            placeholder="Search Your Favourite Talent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[75%] pl-10 pr-4 py-3 rounded-[13px] placeholder:text-[#454545] heading-400-15 placeholder:font-normal placeholder:text-xs bg-transparent text-white border border-[#808080] focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Token Table */}
        <div className="relative z-10 w-full border border-[#1a1a1a] mx-auto bg-black/30 rounded-lg overflow-hidden">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-7 items-center bg-[#1a1a1a] heading-500-20 text-[#404040] p-4 uppercase">
            <div className="px-2">Name</div>
            <div className="px-2">Price</div>
            <div className="px-2">24 HR Change</div>
            <div className="px-2">24 HR Volume</div>
            <div className="px-2">24 HR Market Cap</div>
            <div className="px-2">Chart</div>
            <div className="px-2"></div>
          </div>

          {/* Rows */}
          {filteredTokens.map((token, i) => (
            <TokenRow key={i} index={i} {...token} />
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}
