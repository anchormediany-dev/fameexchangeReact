import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SlSettings } from "react-icons/sl";

const data = [
  { time: "1", value: 0.003 },
  { time: "2", value: 0.002 },
  { time: "3", value: 0.0018 },
  { time: "4", value: 0.0025 },
  { time: "5", value: 0.004 },
  { time: "6", value: 0.0035 },
  { time: "7", value: 0.0045 },
  { time: "8", value: 0.004 },
  { time: "9", value: 0.005 },
  { time: "10", value: 0.0048 },
  { time: "11", value: 0.0052 },
  { time: "12", value: 0.005 },
];

export default function PortfolioDashboard() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <div className="relative min-h-screen bg-[#0b0b0b] text-white p-4 md:p-10 font-sans overflow-hidden">
      {/* Portfolio Overview */}
      <div className="mb-6 z-10 relative">
        <h1 className="text-xl md:text-3xl font-semibold">
          Your Portfolio Is Worth{" "}
          <span className="text-yellow-400">$29,908.45</span>
        </h1>
        <p className="text-md md:text-xl text-yellow-300 mt-1">
          Famecoin Balance <span className="text-yellow-300">1808.24</span>
        </p>
        <p className="text-red-500 text-sm">(-2.01%)</p>
      </div>

      {/* Graph Filters + Advanced */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-4 text-xs md:text-sm text-gray-400">
          {["LIVE", "1D", "1W", "1M", "2M", "1Y", "2Y"].map((label, i) => (
            <span
              key={i}
              className={`cursor-pointer ${
                label === "1D" ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <button className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-600 text-gray-300 text-xs hover:bg-gray-800 transition">
          <SlSettings className="text-sm" />
          Advanced
        </button>
      </div>

      {/* Chart Section */}
      <div className="w-full h-48 md:h-72 mb-8 bg-[#151515] rounded-xl shadow-inner px-2 md:px-6 py-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="time" hide />
            <YAxis domain={["auto", "auto"]} hide />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={1.5}
              dot={false}
              strokeOpacity={0.9}
              className="shadow-lg"
              style={{
                filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[100px] relative z-10">
        {/* Buy/Sell Section */}
        <div className="bg-[#111] rounded-xl p-4">
          <div className="flex border-b border-gray-700 mb-4">
            <button
              onClick={() => setActiveTab("buy")}
              className={`py-2 px-4 font-semibold ${
                activeTab === "buy"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-400"
              }`}
            >
              Buy Doge
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`py-2 px-4 font-semibold ${
                activeTab === "sell"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-400"
              }`}
            >
              Sell Doge
            </button>
          </div>

          <div>
            <label className="block mb-1">
              {activeTab === "buy" ? "Buy In" : "Sell In"}
            </label>
            <div className="flex items-center bg-[#222] px-4 py-2 rounded mb-3">
              <span className="text-gray-400 mr-2">USD</span>
            </div>

            <label className="block mb-1">Amount</label>
            <input
              type="number"
              placeholder="$0.00"
              className="w-full bg-[#222] px-4 py-2 rounded mb-3 text-white"
            />

            <p className="text-red-500 text-sm mb-2">
              Estimated Price{" "}
              <span className="float-right text-white">$0.0051326</span>
            </p>
            <p className="text-white text-sm mb-4">
              Estimated DOGE <span className="float-right">0.00</span>
            </p>

            <button className="w-full py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition">
              Preview Order
            </button>

            <p className="text-gray-400 text-sm mt-3">$0.32 Available</p>
            <p className="text-red-500 text-xs mt-1">✓ Add to Lists</p>
          </div>
        </div>

        {/* Portfolio Metrics */}
        <div className="space-y-6">
          <div className="bg-[#111] rounded-xl p-4">
            <h3 className="text-lg text-yellow-400 font-semibold">
              You Equity
            </h3>
            <p className="text-white text-xl font-bold">$0.02525869</p>
            <p className="text-gray-400 text-sm mt-2">
              Today's Return:{" "}
              <span className="text-red-400">~$0.0098 (-2.95%)</span>
            </p>
            <p className="text-gray-400 text-sm">
              Total Return:{" "}
              <span className="text-red-400">~$0.0098 (-2.95%)</span>
            </p>
          </div>

          <div className="bg-[#111] rounded-xl p-4">
            <h3 className="text-lg text-yellow-400 font-semibold">
              You Average Cost
            </h3>
            <p className="text-white text-xl font-bold">$0.01425869</p>
            <p className="text-gray-400 text-sm mt-2">
              Quantity: <span className="text-white">5.32</span>
            </p>
            <p className="text-gray-400 text-sm">
              Portfolio: <span className="text-white">85.23%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
