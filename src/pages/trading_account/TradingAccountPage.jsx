import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

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

  const [paymentForm, setPaymentForm] = useState({
    nameOnCard: "",
    cardNumber: "",
    expDate: "",
    cvs: "",
    mailingAddress: "",
    checkSame: false,
    email: "",
  });

  const chartRef = useRef(null);

  // Sample data for different artists
  const talentData = {
    "Taylor Swift": {
      token: "SWIFTY",
      price: 125.5,
      change: 15.2,
      changePercent: 13.8,
      data: [
        { date: "2024-01-01", price: 110 },
        { date: "2024-01-15", price: 105 },
        { date: "2024-02-01", price: 95 },
        { date: "2024-02-15", price: 98 },
        { date: "2024-03-01", price: 102 },
        { date: "2024-03-15", price: 108 },
        { date: "2024-04-01", price: 115 },
        { date: "2024-04-15", price: 112 },
        { date: "2024-05-01", price: 120 },
        { date: "2024-05-15", price: 118 },
        { date: "2024-05-30", price: 125.5 },
      ],
    },
    BTS: {
      token: "BTS",
      price: 89.75,
      change: -2.15,
      changePercent: -2.3,
      data: [
        { date: "2024-01-01", price: 95 },
        { date: "2024-01-15", price: 92 },
        { date: "2024-02-01", price: 88 },
        { date: "2024-02-15", price: 90 },
        { date: "2024-03-01", price: 94 },
        { date: "2024-03-15", price: 96 },
        { date: "2024-04-01", price: 93 },
        { date: "2024-04-15", price: 91 },
        { date: "2024-05-01", price: 87 },
        { date: "2024-05-15", price: 89 },
        { date: "2024-05-30", price: 89.75 },
      ],
    },
  };

  const currentData = talentData[selectedTalent] || talentData["Taylor Swift"];

  const holdingsData = [
    { talentName: "Taylor Swift", tokenName: "Swifty", amount: 1 },
    { talentName: "BTS", tokenName: "BTS", amount: 5 },
    { talentName: "Elvis", tokenName: "EL", amount: 10 },
    { talentName: "Rolling Stones", tokenName: "RS", amount: 2 },
    { talentName: "Il Volo", tokenName: "Volo", amount: 5 },
    { talentName: "Kim Kardashian", tokenName: "K", amount: 1 },
  ];

  const timeframes = ["1 Day", "1 Week", "1 Month", "3 Months", "1Y", "5Y"];

  // D3 Chart
  useEffect(() => {
    if (!chartRef.current || !currentData.data) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse dates and create scales
    const parseDate = d3.timeParse("%Y-%m-%d");
    const data = currentData.data.map((d) => ({
      date: parseDate(d.date),
      price: d.price,
    }));

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.price))
      .nice()
      .range([height, 0]);

    // Create line generator
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price))
      .curve(d3.curveMonotoneX);

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""))
      .style("stroke-dasharray", "3,3")
      .style("stroke", "#4b5563")
      .style("stroke-width", 0.5);

    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
      .style("stroke-dasharray", "3,3")
      .style("stroke", "#4b5563")
      .style("stroke-width", 0.5);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")))
      .style("color", "#9ca3af");

    g.append("g").call(d3.axisLeft(yScale)).style("color", "#9ca3af");

    // Add line
    const path = g
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", currentData.change >= 0 ? "#34d399" : "#f87171")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Animate line drawing
    const totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // Add dots
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.price))
      .attr("r", 3)
      .attr("fill", currentData.change >= 0 ? "#34d399" : "#f87171")
      .style("opacity", 0)
      .transition()
      .delay(1500)
      .duration(500)
      .style("opacity", 1);
  }, [selectedTalent, timeframe, currentData]);

  const handleOrderOptionChange = (option) => {
    setOrderOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handlePaymentFormChange = (field, value) => {
    setPaymentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full z-10 bg-[#171717] py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8 min-h-screen pt-20 md:pt-24">
      <div className="2xl:gap-16 gap-12 px-4 container  sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20 z-10">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trading Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Buy/Sell & Trading Form */}
            <div className="bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-600/30 p-6">
              {/* Buy/Sell Buttons */}
              <div className="flex gap-5 mb-6">
                <button
                  onClick={() => setTradeType("BUY")}
                  className={`flex-1 py-2 px-4 rounded font-bold text-white transition-all ${
                    tradeType === "BUY"
                      ? "bg-green-600 shadow-lg scale-105"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeType("SELL")}
                  className={`flex-1 py-2 px-4 rounded font-bold text-white transition-all ${
                    tradeType === "SELL"
                      ? "bg-red-600 shadow-lg scale-105"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  SELL
                </button>
              </div>

              {/* Talent Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Talent Name
                  </label>
                  <select
                    value={selectedTalent}
                    onChange={(e) => setSelectedTalent(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41] focus:border-[#a38b41]"
                  >
                    <option value="Taylor Swift">Taylor Swift</option>
                    <option value="BTS">BTS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Talent Token Brand
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Currency Type
                  </label>
                  <select className="w-full p-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41]">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400">
                      $
                    </span>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-600 bg-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-[#a38b41]"
                    />
                  </div>
                </div>
              </div>

              {/* Token Price */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Est Talent Token Price</span>
                  <span className="font-bold text-white">
                    ${currentData.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-[#a38b41] text-black py-3 rounded font-medium hover:bg-[#c2ab67] transition-colors">
                  REVIEW ORDER
                </button>
                <button className="w-full border-2 border-[#a38b41] text-[#a38b41] py-3 rounded font-medium hover:bg-[#a38b41] hover:text-black transition-colors">
                  IMPORT MORE FUNDS
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-600/30 p-6">
              <h3 className="text-lg font-bold mb-4 text-white">
                Payment Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Mailing Address
                  </label>
                  <textarea
                    value={paymentForm.mailingAddress}
                    onChange={(e) =>
                      handlePaymentFormChange("mailingAddress", e.target.value)
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">
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

          {/* Right Column - Chart & Holdings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Section */}
            <div className="bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-600/30 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-bold mb-2 sm:mb-0 text-white">
                  {selectedTalent}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 text-xs rounded transition-colors ${
                        timeframe === tf
                          ? "bg-[#a38b41] text-black"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-400 mb-4">
                Current Price: ${currentData.token}
              </div>

              <div className="w-full overflow-x-auto">
                <svg
                  ref={chartRef}
                  className="w-full"
                ></svg>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-600">
                <div>
                  <div className="text-sm text-gray-400">Available Balance</div>
                  <div className="font-bold text-white">$9000.00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">
                    Current Invested Amount
                  </div>
                  <div className="font-bold text-white">$800.00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Daily Average</div>
                  <div className="font-bold text-white">$0.00000</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Today's</div>
                  <div
                    className={`font-bold ${
                      currentData.change >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ${currentData.change >= 0 ? "+" : ""}
                    {currentData.change.toFixed(2)} (
                    {currentData.changePercent >= 0 ? "+" : ""}
                    {currentData.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-400">
                    Quantity Purchased Amount
                  </div>
                  <div className="font-bold text-white">$0.00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Returns</div>
                  <div className="font-bold text-green-400">
                    +$0000.00 (+000.00%)
                  </div>
                </div>
              </div>

              <button className="mt-4 bg-[#a38b41] text-black px-6 py-2 rounded hover:bg-[#c2ab67] transition-colors">
                Advance to Talent Profile
              </button>
            </div>

            {/* Holdings Table */}
            <div className="bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-600/30 p-6">
              <h3 className="text-lg font-bold mb-4 text-white">
                Talent Tokens Total Held (22)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-sm font-medium text-gray-300">
                        Talent Name
                      </th>
                      <th className="text-left py-2 text-sm font-medium text-gray-300">
                        Token Name
                      </th>
                      <th className="text-left py-2 text-sm font-medium text-gray-300">
                        Holding Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdingsData.map((holding, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-[#333333]"
                      >
                        <td className="py-2 text-sm text-gray-300">
                          {holding.talentName}
                        </td>
                        <td className="py-2 text-sm font-medium text-gray-200">
                          "{holding.tokenName}"
                        </td>
                        <td className="py-2 text-sm text-gray-300">
                          {holding.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentTokenDashboard;
