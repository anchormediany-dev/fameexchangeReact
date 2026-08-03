import { useState } from "react";
import { SlSettings } from "react-icons/sl";
import CandlestickChart from "./CandlestickChart";
import PurchaseConfirmationModal from "./PurchaseConfirmationModal";

// Portfolio value snapshots — synthesize OHLC so the chart renders as candlesticks
const RAW = [0.003, 0.002, 0.0018, 0.0025, 0.004, 0.0035, 0.0045, 0.004, 0.005, 0.0048, 0.0052, 0.005];
const BASE_TS = 1704067200; // 2024-01-01 00:00 UTC in seconds
const data = RAW.map((close, i) => {
  const open = i === 0 ? close : RAW[i - 1];
  return {
    time: BASE_TS + i * 86400,
    open,
    high: Math.max(open, close) * 1.004,
    low:  Math.min(open, close) * 0.996,
    close,
  };
});

export default function PortfolioDashboard({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="container">
        {/* Portfolio Overview */}
        <div className="mb-6 z-10 relative">
          <h1 className="text-xl md:text-3xl font-semibold">
            Your Portfolio Is Worth{" "}
            <span className="text-yellow-400">
              {userData?.data?.networth[0]?.netWorth}{" "}
              {userData?.data?.networth[0]?.currency}
            </span>
          </h1>
          <p className="text-md md:text-xl text-yellow-300 mt-1">
            USD Balance <span className="text-yellow-300">1808.24</span>
          </p>
          <p className="text-red-500 text-sm">(-2.01%)</p>
        </div>

        {/* Graph Filters + Advanced */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-4 text-xs md:text-sm font-normal text-white">
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
        <div className="w-full mb-8 bg-[#151515] rounded-xl shadow-inner px-2 md:px-4 py-4">
          <CandlestickChart data={data} height={240} />
        </div>

        <div className=" relative z-10">
          {/* Portfolio Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#111] rounded-xl p-4 border border-[#404040]">
              <h3 className="text-sm  font-normal">You Equity</h3>
              <p className="text-primary text-2xl font-medium">$0.02525869</p>
              <p className="text-white flex justify-between text-sm mt-2">
                <span> Today's Return: </span>
                <span>~$0.0098 (-2.95%)</span>
              </p>
              <p className="text-white flex justify-between text-sm mt-2">
                <span> Total Return:</span>
                <span>~$0.0098 (-2.95%)</span>
              </p>
            </div>

            <div className="bg-[#111] rounded-xl p-4 border border-[#404040]">
              <h3 className="text-sm  font-normal">You Average cost</h3>
              <p className="text-primary text-2xl font-medium">$0.01425869</p>
              <p className="text-white flex justify-between text-sm mt-2">
                <span> Quantity </span>
                <span>5.32</span>
              </p>
              <p className="text-white flex justify-between text-sm mt-2">
                <span> Portfolio</span>
                <span>85.23%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <PurchaseConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
