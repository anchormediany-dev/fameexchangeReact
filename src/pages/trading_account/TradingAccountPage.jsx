import { useState, useEffect, useMemo } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import CandlestickChart from "../../components/CandlestickChart";

const TalentTokenDashboard = () => {
  const [selectedTalent, setSelectedTalent] = useState("Taylor Swift");
  const [selectedToken, setSelectedToken] = useState("SWIFTY");
  const [tradeType, setTradeType] = useState("BUY");
  const [amount, setAmount] = useState("600.00");
  const [timeframe, setTimeframe] = useState("1 Month");
  const [orderOptions, setOrderOptions] = useState({
    bestPrice: false,
    highestLowest: false,
    recoveringInvestment: false,
  });
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

  const [paymentForm, setPaymentForm] = useState({
    nameOnCard: "",
    cardNumber: "",
    expDate: "",
    cvs: "",
    mailingAddress: "",
    checkSame: false,
    email: "",
  });

  // Expanded dynamic data for different artists and timeframes
  const talentData = {
    "Taylor Swift": {
      token: "SWIFTY",
      price: 125.5,
      change: 15.2,
      changePercent: 13.8,
      data: {
        "1 Day": [
          { date: "00:00", price: 124.2, timestamp: "2024-05-30T00:00:00Z" },
          { date: "04:00", price: 123.8, timestamp: "2024-05-30T04:00:00Z" },
          { date: "08:00", price: 124.5, timestamp: "2024-05-30T08:00:00Z" },
          { date: "12:00", price: 125.1, timestamp: "2024-05-30T12:00:00Z" },
          { date: "16:00", price: 125.8, timestamp: "2024-05-30T16:00:00Z" },
          { date: "20:00", price: 125.5, timestamp: "2024-05-30T20:00:00Z" },
        ],
        "1 Week": [
          { date: "Mon", price: 121.2, timestamp: "2024-05-24" },
          { date: "Tue", price: 122.5, timestamp: "2024-05-25" },
          { date: "Wed", price: 123.8, timestamp: "2024-05-26" },
          { date: "Thu", price: 124.1, timestamp: "2024-05-27" },
          { date: "Fri", price: 125.5, timestamp: "2024-05-28" },
          { date: "Sat", price: 124.9, timestamp: "2024-05-29" },
          { date: "Sun", price: 125.5, timestamp: "2024-05-30" },
        ],
        "1 Month": [
          { date: "Jan 1", price: 110, timestamp: "2024-01-01" },
          { date: "Jan 15", price: 105, timestamp: "2024-01-15" },
          { date: "Feb 1", price: 95, timestamp: "2024-02-01" },
          { date: "Feb 15", price: 98, timestamp: "2024-02-15" },
          { date: "Mar 1", price: 102, timestamp: "2024-03-01" },
          { date: "Mar 15", price: 108, timestamp: "2024-03-15" },
          { date: "Apr 1", price: 115, timestamp: "2024-04-01" },
          { date: "Apr 15", price: 112, timestamp: "2024-04-15" },
          { date: "May 1", price: 120, timestamp: "2024-05-01" },
          { date: "May 15", price: 118, timestamp: "2024-05-15" },
          { date: "May 30", price: 125.5, timestamp: "2024-05-30" },
        ],
        "3 Months": [
          { date: "Mar", price: 105, timestamp: "2024-03-01" },
          { date: "Mar", price: 108, timestamp: "2024-03-15" },
          { date: "Apr", price: 115, timestamp: "2024-04-01" },
          { date: "Apr", price: 112, timestamp: "2024-04-15" },
          { date: "May", price: 120, timestamp: "2024-05-01" },
          { date: "May", price: 118, timestamp: "2024-05-15" },
          { date: "May", price: 125.5, timestamp: "2024-05-30" },
        ],
        "1Y": [
          { date: "Q1 '24", price: 85, timestamp: "2024-01-01" },
          { date: "Q2 '24", price: 95, timestamp: "2024-04-01" },
          { date: "Q3 '24", price: 110, timestamp: "2024-07-01" },
          { date: "Q4 '24", price: 125.5, timestamp: "2024-10-01" },
        ],
        "5Y": [
          { date: "'20", price: 45, timestamp: "2020-01-01" },
          { date: "'21", price: 62, timestamp: "2021-01-01" },
          { date: "'22", price: 78, timestamp: "2022-01-01" },
          { date: "'23", price: 89, timestamp: "2023-01-01" },
          { date: "'24", price: 125.5, timestamp: "2024-01-01" },
        ],
      },
    },
    BTS: {
      token: "BTS",
      price: 89.75,
      change: -2.15,
      changePercent: -2.3,
      data: {
        "1 Day": [
          { date: "00:00", price: 90.2, timestamp: "2024-05-30T00:00:00Z" },
          { date: "04:00", price: 89.8, timestamp: "2024-05-30T04:00:00Z" },
          { date: "08:00", price: 89.5, timestamp: "2024-05-30T08:00:00Z" },
          { date: "12:00", price: 89.1, timestamp: "2024-05-30T12:00:00Z" },
          { date: "16:00", price: 89.9, timestamp: "2024-05-30T16:00:00Z" },
          { date: "20:00", price: 89.75, timestamp: "2024-05-30T20:00:00Z" },
        ],
        "1 Week": [
          { date: "Mon", price: 91.2, timestamp: "2024-05-24" },
          { date: "Tue", price: 90.5, timestamp: "2024-05-25" },
          { date: "Wed", price: 89.8, timestamp: "2024-05-26" },
          { date: "Thu", price: 89.1, timestamp: "2024-05-27" },
          { date: "Fri", price: 89.5, timestamp: "2024-05-28" },
          { date: "Sat", price: 89.9, timestamp: "2024-05-29" },
          { date: "Sun", price: 89.75, timestamp: "2024-05-30" },
        ],
        "1 Month": [
          { date: "Jan 1", price: 95, timestamp: "2024-01-01" },
          { date: "Jan 15", price: 92, timestamp: "2024-01-15" },
          { date: "Feb 1", price: 88, timestamp: "2024-02-01" },
          { date: "Feb 15", price: 90, timestamp: "2024-02-15" },
          { date: "Mar 1", price: 94, timestamp: "2024-03-01" },
          { date: "Mar 15", price: 96, timestamp: "2024-03-15" },
          { date: "Apr 1", price: 93, timestamp: "2024-04-01" },
          { date: "Apr 15", price: 91, timestamp: "2024-04-15" },
          { date: "May 1", price: 87, timestamp: "2024-05-01" },
          { date: "May 15", price: 89, timestamp: "2024-05-15" },
          { date: "May 30", price: 89.75, timestamp: "2024-05-30" },
        ],
        "3 Months": [
          { date: "Mar", price: 94, timestamp: "2024-03-01" },
          { date: "Mar", price: 96, timestamp: "2024-03-15" },
          { date: "Apr", price: 93, timestamp: "2024-04-01" },
          { date: "Apr", price: 91, timestamp: "2024-04-15" },
          { date: "May", price: 87, timestamp: "2024-05-01" },
          { date: "May", price: 89, timestamp: "2024-05-15" },
          { date: "May", price: 89.75, timestamp: "2024-05-30" },
        ],
        "1Y": [
          { date: "Q1 '24", price: 95, timestamp: "2024-01-01" },
          { date: "Q2 '24", price: 88, timestamp: "2024-04-01" },
          { date: "Q3 '24", price: 92, timestamp: "2024-07-01" },
          { date: "Q4 '24", price: 89.75, timestamp: "2024-10-01" },
        ],
        "5Y": [
          { date: "'20", price: 105, timestamp: "2020-01-01" },
          { date: "'21", price: 98, timestamp: "2021-01-01" },
          { date: "'22", price: 92, timestamp: "2022-01-01" },
          { date: "'23", price: 94, timestamp: "2023-01-01" },
          { date: "'24", price: 89.75, timestamp: "2024-01-01" },
        ],
      },
    },

    "Ariana Grande": {
      token: "ARII",
      price: 142.25,
      change: 8.7,
      changePercent: 6.5,
      data: {
        "1 Day": [
          { date: "00:00", price: 140.2, timestamp: "2024-05-30T00:00:00Z" },
          { date: "04:00", price: 141.1, timestamp: "2024-05-30T04:00:00Z" },
          { date: "08:00", price: 141.8, timestamp: "2024-05-30T08:00:00Z" },
          { date: "12:00", price: 142.5, timestamp: "2024-05-30T12:00:00Z" },
          { date: "16:00", price: 142.1, timestamp: "2024-05-30T16:00:00Z" },
          { date: "20:00", price: 142.25, timestamp: "2024-05-30T20:00:00Z" },
        ],
        "1 Week": [
          { date: "Mon", price: 135.2, timestamp: "2024-05-24" },
          { date: "Tue", price: 137.5, timestamp: "2024-05-25" },
          { date: "Wed", price: 139.8, timestamp: "2024-05-26" },
          { date: "Thu", price: 141.1, timestamp: "2024-05-27" },
          { date: "Fri", price: 142.5, timestamp: "2024-05-28" },
          { date: "Sat", price: 141.9, timestamp: "2024-05-29" },
          { date: "Sun", price: 142.25, timestamp: "2024-05-30" },
        ],
        "1 Month": [
          { date: "Jan 1", price: 125, timestamp: "2024-01-01" },
          { date: "Jan 15", price: 128, timestamp: "2024-01-15" },
          { date: "Feb 1", price: 132, timestamp: "2024-02-01" },
          { date: "Feb 15", price: 130, timestamp: "2024-02-15" },
          { date: "Mar 1", price: 135, timestamp: "2024-03-01" },
          { date: "Mar 15", price: 138, timestamp: "2024-03-15" },
          { date: "Apr 1", price: 140, timestamp: "2024-04-01" },
          { date: "Apr 15", price: 139, timestamp: "2024-04-15" },
          { date: "May 1", price: 141, timestamp: "2024-05-01" },
          { date: "May 15", price: 140.5, timestamp: "2024-05-15" },
          { date: "May 30", price: 142.25, timestamp: "2024-05-30" },
        ],
        "3 Months": [
          { date: "Mar", price: 135, timestamp: "2024-03-01" },
          { date: "Mar", price: 138, timestamp: "2024-03-15" },
          { date: "Apr", price: 140, timestamp: "2024-04-01" },
          { date: "Apr", price: 139, timestamp: "2024-04-15" },
          { date: "May", price: 141, timestamp: "2024-05-01" },
          { date: "May", price: 140.5, timestamp: "2024-05-15" },
          { date: "May", price: 142.25, timestamp: "2024-05-30" },
        ],
        "1Y": [
          { date: "Q1 '24", price: 115, timestamp: "2024-01-01" },
          { date: "Q2 '24", price: 125, timestamp: "2024-04-01" },
          { date: "Q3 '24", price: 135, timestamp: "2024-07-01" },
          { date: "Q4 '24", price: 142.25, timestamp: "2024-10-01" },
        ],
        "5Y": [
          { date: "'20", price: 68, timestamp: "2020-01-01" },
          { date: "'21", price: 85, timestamp: "2021-01-01" },
          { date: "'22", price: 98, timestamp: "2022-01-01" },
          { date: "'23", price: 112, timestamp: "2023-01-01" },
          { date: "'24", price: 142.25, timestamp: "2024-01-01" },
        ],
      },
    },
  };

  const currentData = talentData[selectedTalent] || talentData["Taylor Swift"];
  const chartData = currentData.data[timeframe] || currentData.data["1 Month"];

  const ohlcData = useMemo(() => {
    return chartData.map((p, i) => {
      const prev = i === 0 ? p.price : chartData[i - 1].price;
      const open = prev;
      const close = p.price;
      const ts = p.timestamp
        ? Math.floor(new Date(p.timestamp).getTime() / 1000)
        : 1704067200 + i * 3600;
      return {
        time: ts,
        open,
        high: Math.max(open, close) * 1.004,
        low:  Math.min(open, close) * 0.996,
        close,
      };
    });
  }, [chartData]);

  // Dynamic holdings data that updates based on selections
  const [holdingsData, setHoldingsData] = useState([
    { talentName: "Taylor Swift", tokenName: "SWIFTY", amount: 1 },
    { talentName: "BTS", tokenName: "BTS", amount: 5 },
    { talentName: "Ariana Grande", tokenName: "ARII", amount: 3 },
    { talentName: "Elvis", tokenName: "EL", amount: 10 },
    { talentName: "Rolling Stones", tokenName: "RS", amount: 2 },
    { talentName: "Il Volo", tokenName: "Volo", amount: 5 },
    { talentName: "Kim Kardashian", tokenName: "K", amount: 1 },
  ]);

  const timeframes = ["1 Day", "1 Week", "1 Month", "3 Months", "1Y", "5Y"];

  // Dynamic update of selected token when talent changes
  useEffect(() => {
    setSelectedToken(currentData.token);
  }, [selectedTalent, currentData.token]);

  // Real-time update of financial metrics when amount or talent changes
  useEffect(() => {
    // This will trigger re-calculation of financialMetrics whenever dependencies change
    // The calculations are already happening in the render cycle
  }, [amount, selectedTalent, holdingsData]);


  const handleOrderOptionChange = (option) => {
    setOrderOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, ""); // Only allow numbers and decimal
    setAmount(value);
  };

  const handlePaymentFormChange = (field, value) => {
    setPaymentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate dynamic stats based on current data
  const calculateStats = () => {
    const prices = chartData.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

    return { minPrice, maxPrice, avgPrice };
  };

  const stats = calculateStats();

  return (
    <div className="w-full z-10 bg-[#171717] py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8 min-h-screen pt-20 md:pt-24">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20 z-10">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
          {/* Left Column - Trading Panel */}
          <div className="lg:col-span-1 h-full space-y-6">
            {/* Buy/Sell & Trading Form */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4 flex-1  h-full">
              {/* Buy/Sell Buttons */}
              <div className="flex gap-5 mb-6">
                <button
                  onClick={() => setTradeType("BUY")}
                  className={`flex-1 px-8 py-3 bg-green-600 cursor-pointer text-white rounded-lg hover:bg-green-700 transition-colors font-medium ${
                    tradeType === "BUY"
                      ? "bg-green-600  scale-105"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeType("SELL")}
                  className={`flex-1 px-8 py-3 bg-green-600 cursor-pointer text-white rounded-lg hover:bg-green-700 transition-colors font-medium ${
                    tradeType === "SELL"
                      ? "bg-red-600  scale-105"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  SELL
                </button>
              </div>

              {/* Talent Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Talent Name
                  </label>
                  <select
                    value={selectedTalent}
                    onChange={(e) => setSelectedTalent(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41] focus:border-[#a38b41]"
                  >
                    {Object.keys(talentData).map((talent) => (
                      <option key={talent} value={talent}>
                        {talent}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Talent Ticker Symbol
                  </label>
                  <input
                    type="text"
                    value={currentData.token}
                    readOnly
                    className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-gray-400 rounded"
                  />
                </div>
              </div>

              {/* Order Options */}
              <div className="space-y-2 mb-6">
                {[
                  { key: "bestPrice", label: "Best Price" },
                  { key: "highestLowest", label: "Highest or Lowest" },
                  {
                    key: "recoveringInvestment",
                    label: "Recovering Investment",
                  },
                ].map((option) => (
                  <label key={option.key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={orderOptions[option.key]}
                      onChange={() => handleOrderOptionChange(option.key)}
                      className="w-4 h-4 text-[#a38b41] bg-[#1a1a1a] border-gray-600 rounded focus:ring-[#a38b41] focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Currency and Amount */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Currency Type
                  </label>
                  <select className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41]">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400">
                      $
                    </span>
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Token Price */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Est. Share Price</span>
                  <span className="font-bold text-white">
                    ${currentData.price.toFixed(2)}
                  </span>
                </div>
                {/* <div className="flex justify-between items-center text-xs mt-1">
                  <span className="text-gray-400">Estimated Shares</span>
                  <span className="text-gray-400">
                    {(
                      parseFloat(amount.replace(/,/g, "")) / currentData.price
                    ).toFixed(4)}
                  </span>
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-primary2 px-8 py-3  text-white rounded-lg font-medium cursor-pointer hover:bg-[#c2ab67] transition-colors">
                  REVIEW ORDER
                </button>
                <button className="w-full border-2 border-[#a38b41] text-[#a38b41] px-8 py-3 cursor-pointer  rounded-lg font-medium hover:bg-[#a38b41] hover:text-white transition-colors">
                  IMPORT MORE FUNDS
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Chart & Holdings */}
          <div className="lg:col-span-2 h-full space-y-6">
            {/* Chart Section */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4 flex-1  ">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-1 text-white">
                    {selectedTalent}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      ${currentData.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        currentData.change >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {currentData.change >= 0 ? "+" : ""}$
                      {currentData.change.toFixed(2)}(
                      {currentData.change >= 0 ? "+" : ""}
                      {currentData.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 text-xs rounded transition-colors ${
                        timeframe === tf
                          ? "bg-primary text-black"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Chart */}
              <div className="w-full mb-6">
                <CandlestickChart data={ohlcData} height={320} />
              </div>

              {/* Available balance and current invested amount */}
              <section className="flex flex-col gap-2 mt-6 pt-6">
                <div className="flex justify-between gap-4 ">
                  <div className="flex flex-col lg:flex-row gap-3 ">
                    <div className="text-sm text-gray-400">
                      Available Balance
                    </div>
                    <div className="font-bold text-white">$9,000.00</div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-3 ">
                    <div className="text-sm text-gray-400">
                      Current Invested Amount
                    </div>
                    <div className="font-bold text-white">$000.00</div>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col lg:flex-row gap-3 ">
                    <div className="text-sm text-gray-400">Daily Average</div>
                    <div className="font-bold text-white">$0.00000</div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-3 ">
                    <div className="text-sm text-gray-400">Todays</div>
                    <div className="font-bold text-red-400">
                      -$000.00 (-000.00%)
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-between gap-4 mt-3 pt-3 border-t border-gray-600">
                <div className="flex flex-col lg:flex-row gap-3 ">
                  <div className="text-sm text-gray-400">
                    Quantity Purchased Amount
                  </div>
                  <div className="font-bold text-white">$0.00</div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3 ">
                  <div className="text-sm text-gray-400">Returns</div>
                  <div className="font-bold text-green-400">
                    +$000.00 (+000.00%)
                  </div>
                </div>
              </div>
              {/* <div>
                  <div className="text-sm text-gray-400">Period High</div>
                  <div className="font-bold text-green-400">
                    ${stats.maxPrice.toFixed(2)}
                  </div>
                </div> */}
              {/* <div>
                  <div className="text-sm text-gray-400">Period Low</div>
                  <div className="font-bold text-red-400">
                    ${stats.minPrice.toFixed(2)}
                  </div>
                </div> */}
              {/* <div>
                  <div className="text-sm text-gray-400">Period Average</div>
                  <div className="font-bold text-[#a38b41]">
                    ${stats.avgPrice.toFixed(2)}
                  </div>
                </div> */}

              {/* <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-400">Estimated Shares</div>
                  <div className="font-bold text-white">
                    {(
                      parseFloat(amount.replace(/,/g, "")) / currentData.price
                    ).toFixed(4)}{" "}
                    {currentData.token}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Market Cap Rank</div>
                  <div className="font-bold text-gray-300">#3</div>
                </div>
              </div> */}

              <button className="mt-4 bg-primary2 px-8 py-3  text-white rounded-lg font-medium hover:bg-[#c2ab67] transition-colors">
                Advance to Talent Profile
              </button>
            </div>
          </div>
        </div>
        {/* section two start */}
        <div className="flex flex-col 2xl:gap-16 gap-12 mt-10 lg:mt-16 2xl:mt-20 z-50">
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
            {/* Payment Form */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4 flex-1 h-full">
                <h3 className="text-2xl font-bold text-primary2 mb-6 text-center">
                  Payment Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      value={paymentForm.nameOnCard}
                      onChange={(e) =>
                        handlePaymentFormChange("nameOnCard", e.target.value)
                      }
                      className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Credit Card/ Debit #
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cardNumber}
                      onChange={(e) =>
                        handlePaymentFormChange("cardNumber", e.target.value)
                      }
                      className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41] placeholder-gray-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Exp Date
                      </label>
                      <input
                        type="text"
                        value={paymentForm.expDate}
                        onChange={(e) =>
                          handlePaymentFormChange("expDate", e.target.value)
                        }
                        className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41] placeholder-gray-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        CVS #
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cvs}
                        onChange={(e) =>
                          handlePaymentFormChange("cvs", e.target.value)
                        }
                        className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41] placeholder-gray-500"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Mailing Address
                    </label>
                    <textarea
                      value={paymentForm.mailingAddress}
                      onChange={(e) =>
                        handlePaymentFormChange(
                          "mailingAddress",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41]"
                      rows="3"
                    />
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={paymentForm.checkSame}
                        onChange={(e) =>
                          handlePaymentFormChange("checkSame", e.target.checked)
                        }
                        className="w-4 h-4 text-[#a38b41] bg-[#1a1a1a] border-gray-600 rounded focus:ring-[#a38b41] focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-300">
                        Check if Same
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      value={paymentForm.email}
                      onChange={(e) =>
                        handlePaymentFormChange("email", e.target.value)
                      }
                      className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41]"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Dynamic Holdings Table */}
            {/* Talent Holdings Styled Table */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#252525]/90 backdrop-blur-xl border border-gray-600/30 rounded-3xl p-4 flex-1 h-full">
                <h3 className="text-2xl font-bold text-primary2 mb-6 text-center">
                  Talent Shares Total Held (
                  {holdingsData.reduce((sum, h) => sum + h.amount, 0)})
                </h3>

                {/* Table Header */}
                <div className="grid grid-cols-3 gap-4 py-4 px-4 bg-gradient-to-r from-[#2d2d2d] via-[#353535] to-[#2d2d2d] text-sm text-gray-200 font-bold border-b border-gray-500/40 backdrop-blur-sm rounded-t-2xl">
                  <div className="text-left">Talent Name</div>
                  <div className="text-left">Ticker</div>
                  <div className="text-left">Holdings</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-700/30">
                  {holdingsData.map((holding, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-3 gap-4 py-4 px-4 items-center transition-all duration-300 cursor-pointer ${
                        holding.talentName === selectedTalent
                          ? ""
                          : "hover:bg-[#2a2a2a]"
                      }`}
                      onClick={() => setSelectedTalent(holding.talentName)}
                    >
                      <div className="text-sm text-gray-200 truncate">
                        {holding.talentName}
                      </div>
                      <div className="text-sm text-gray-300 truncate font-medium">
                        "{holding.tokenName}"
                      </div>
                      <div className="text-sm text-gray-200">
                        {holding.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* section two end */}
      </div>
    </div>
  );
};

export default TalentTokenDashboard;
