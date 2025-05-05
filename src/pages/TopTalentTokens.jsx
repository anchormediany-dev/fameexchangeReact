import React, { useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import btcChart from "../assets/images/BTC_Logo.png";
import dcrChart from "../assets/images/DCR_Logo.png";
import bnbChart from "../assets/images/BNB_Logo.png";
import { FiSearch } from "react-icons/fi";
import TopTalentTokensNavbar from "../components/TopTalentTokensNavbar";
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
  const bgColor = index % 2 === 0 ? "bg-[#0b0b0b] " : "bg-[#111]";
  return (
    <div
      className={`flex flex-wrap md:flex-nowrap items-center justify-between text-white text-sm py-3 px-4  ${bgColor}`}
    >
      <div className="w-1/2 md:w-1/5">{name}</div>
      <div className="w-1/2 md:w-1/5">${price}</div>
      <div
        className={`w-1/2 md:w-1/5 ${
          isPositive ? "text-[#15CF5F]" : "text-[#FF000D]"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}
      </div>
      <div className="w-1/2 md:w-1/5">{volume}</div>
      <div className="w-1/2 md:w-1/5">{marketcap}</div>
      <div className="w-full md:w-1/5 mt-2 md:mt-0">
        <ResponsiveContainer width={60} height={30}>
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FFF"
              strokeWidth={2}
              dot={false}
            />
            <Tooltip wrapperClassName="hidden" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <button className="ml-0 md:ml-4 mt-2 md:mt-0 bg-[#0B0B0B] text-primary text-xs shadow-inset-light font-semibold px-5 py-3 rounded-[12px] transition duration-300 ease-in-out hover:bg-primary hover:text-[#0B0B0B] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        Trade
      </button>
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

export default function TopTalentTokens() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTokens = initialTokens.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen container bg-[#0b0b0b] mt-20 text-white px-4 py-10 overflow-hidden">
      <TopTalentTokensNavbar />
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

      <div className="relative z-10 mb-12">
        <h1 className="lg:text-h6 text-p3 font-medium">
          TOP TALENT <span className="text-primary">TOKENS</span>
        </h1>
      </div>

      <div className="relative z-10 flex flex-wrap  gap-10 mb-10 lg:mb-20">
        {[
          { name: "BTC", image: btcChart },
          { name: "DCR", image: dcrChart },
          { name: "BNB", image: bnbChart },
        ].map((token, i) => (
          <div key={i} className="flex gap-[30px] items-center">
            <div className="flex flex-col items-center ">
              <img
                src={token.image}
                alt={`${token.name} chart`}
                className="w-20 h-20 object-contain mb-2"
              />{" "}
              <p className="text-p4 mt-2 font-medium lg:text-p2">
                {token.name}
              </p>
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

      <div className="relative z-10 max-w-2xl mx-auto mb-10">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#808080]">
          <FiSearch size={18} />
        </span>
        <input
          type="text"
          placeholder="Search Your Favourite Talent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[75%] pl-10 pr-4 py-3 rounded-[13px] placeholder:text-[#454545] bg-transparent text-white border border-[#808080] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl border border-[#1a1a1a] mx-auto bg-black/30 rounded-lg overflow-hidden">
        <div className="hidden md:flex items-center justify-between bg-[#1a1a1a] font-medium text-[#404040] p-7 text-xs uppercase">
          <div className="w-1/5">Name</div>
          <div className="w-1/5">Price</div>
          <div className="w-1/5">24 Hr Change</div>
          <div className="w-1/5">24 Hr Volume</div>
          <div className="w-1/5">24 Hr Marketcap</div>
          <div className="w-1/5">Chart</div>
          <div className="w-auto">Action</div>
        </div>
        {filteredTokens.map((token, i) => (
          <TokenRow key={i} index={i} {...token} />
        ))}
      </div>
    </div>
  );
}
