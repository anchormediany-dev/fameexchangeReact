import { useState, useEffect, useRef, useCallback } from "react";

const TradeTalentPage = () => {
  const [selectedTalent, setSelectedTalent] = useState("Taylor Swift");
  const [tradeType, setTradeType] = useState("BUY");
  const [amount, setAmount] = useState("600.00");
  const [timeframe, setTimeframe] = useState("1M");
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
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

  // OHLC data for candlestick charts per talent & timeframe
  const talentData = {
    "Taylor Swift": {
      ticker: "SWFT",
      price: 125.5,
      change: 15.2,
      changePercent: 13.8,
      ohlc: {
        "1D": [
          { t: "09:30", o: 124.2, h: 125.0, l: 123.8, c: 124.8 },
          { t: "10:00", o: 124.8, h: 125.3, l: 124.5, c: 125.1 },
          { t: "10:30", o: 125.1, h: 125.8, l: 124.9, c: 125.5 },
          { t: "11:00", o: 125.5, h: 126.2, l: 125.0, c: 125.8 },
          { t: "11:30", o: 125.8, h: 126.0, l: 125.3, c: 125.6 },
          { t: "12:00", o: 125.6, h: 126.1, l: 125.2, c: 125.9 },
          { t: "12:30", o: 125.9, h: 126.5, l: 125.7, c: 126.3 },
          { t: "13:00", o: 126.3, h: 126.8, l: 125.8, c: 126.0 },
          { t: "13:30", o: 126.0, h: 126.4, l: 125.5, c: 125.7 },
          { t: "14:00", o: 125.7, h: 126.2, l: 125.4, c: 126.1 },
          { t: "14:30", o: 126.1, h: 126.6, l: 125.8, c: 125.9 },
          { t: "15:00", o: 125.9, h: 126.3, l: 125.5, c: 125.5 },
        ],
        "1W": [
          { t: "Mon", o: 121.2, h: 123.5, l: 120.8, c: 122.5 },
          { t: "Tue", o: 122.5, h: 124.0, l: 121.9, c: 123.8 },
          { t: "Wed", o: 123.8, h: 125.2, l: 123.0, c: 124.1 },
          { t: "Thu", o: 124.1, h: 125.8, l: 123.5, c: 125.5 },
          { t: "Fri", o: 125.5, h: 126.2, l: 124.8, c: 125.5 },
        ],
        "1M": [
          { t: "W1", o: 110.0, h: 114.0, l: 108.0, c: 112.0 },
          { t: "W2", o: 112.0, h: 115.5, l: 110.5, c: 114.8 },
          { t: "W3", o: 114.8, h: 118.0, l: 113.0, c: 117.2 },
          { t: "W4", o: 117.2, h: 120.5, l: 116.0, c: 119.8 },
          { t: "W5", o: 119.8, h: 122.0, l: 118.5, c: 121.0 },
          { t: "W6", o: 121.0, h: 124.5, l: 120.0, c: 123.5 },
          { t: "W7", o: 123.5, h: 126.0, l: 122.0, c: 125.5 },
        ],
        "3M": [
          { t: "Jan", o: 105.0, h: 110.0, l: 102.0, c: 108.0 },
          { t: "Feb", o: 108.0, h: 115.0, l: 106.0, c: 112.0 },
          { t: "Mar", o: 112.0, h: 118.0, l: 110.0, c: 116.5 },
          { t: "Apr", o: 116.5, h: 122.0, l: 114.0, c: 120.0 },
          { t: "May", o: 120.0, h: 126.5, l: 118.0, c: 125.5 },
        ],
        "1Y": [
          { t: "Q1", o: 85.0, h: 95.0, l: 82.0, c: 92.0 },
          { t: "Q2", o: 92.0, h: 105.0, l: 88.0, c: 100.0 },
          { t: "Q3", o: 100.0, h: 115.0, l: 96.0, c: 112.0 },
          { t: "Q4", o: 112.0, h: 127.0, l: 108.0, c: 125.5 },
        ],
        "5Y": [
          { t: "2020", o: 45.0, h: 58.0, l: 40.0, c: 55.0 },
          { t: "2021", o: 55.0, h: 72.0, l: 52.0, c: 68.0 },
          { t: "2022", o: 68.0, h: 85.0, l: 64.0, c: 80.0 },
          { t: "2023", o: 80.0, h: 98.0, l: 75.0, c: 92.0 },
          { t: "2024", o: 92.0, h: 127.0, l: 85.0, c: 125.5 },
        ],
      },
    },
    BTS: {
      ticker: "BTS",
      price: 89.75,
      change: -2.15,
      changePercent: -2.3,
      ohlc: {
        "1D": [
          { t: "09:30", o: 90.2, h: 90.8, l: 89.5, c: 89.8 },
          { t: "10:00", o: 89.8, h: 90.5, l: 89.2, c: 89.5 },
          { t: "10:30", o: 89.5, h: 90.1, l: 89.0, c: 89.1 },
          { t: "11:00", o: 89.1, h: 90.0, l: 88.5, c: 89.9 },
          { t: "11:30", o: 89.9, h: 90.3, l: 89.4, c: 89.6 },
          { t: "12:00", o: 89.6, h: 90.2, l: 89.1, c: 89.75 },
          { t: "12:30", o: 89.75, h: 90.4, l: 89.3, c: 89.5 },
          { t: "13:00", o: 89.5, h: 90.1, l: 89.0, c: 89.8 },
          { t: "13:30", o: 89.8, h: 90.2, l: 89.3, c: 89.6 },
          { t: "14:00", o: 89.6, h: 90.0, l: 89.2, c: 89.9 },
          { t: "14:30", o: 89.9, h: 90.1, l: 89.4, c: 89.7 },
          { t: "15:00", o: 89.7, h: 90.0, l: 89.5, c: 89.75 },
        ],
        "1W": [
          { t: "Mon", o: 91.2, h: 92.0, l: 90.5, c: 90.5 },
          { t: "Tue", o: 90.5, h: 91.5, l: 89.8, c: 89.8 },
          { t: "Wed", o: 89.8, h: 90.8, l: 89.0, c: 89.1 },
          { t: "Thu", o: 89.1, h: 90.2, l: 88.5, c: 89.5 },
          { t: "Fri", o: 89.5, h: 90.5, l: 89.0, c: 89.75 },
        ],
        "1M": [
          { t: "W1", o: 95.0, h: 96.5, l: 92.0, c: 93.0 },
          { t: "W2", o: 93.0, h: 94.5, l: 90.0, c: 91.5 },
          { t: "W3", o: 91.5, h: 93.0, l: 89.0, c: 90.0 },
          { t: "W4", o: 90.0, h: 91.5, l: 88.0, c: 89.75 },
        ],
        "3M": [
          { t: "Mar", o: 94.0, h: 97.0, l: 92.0, c: 96.0 },
          { t: "Apr", o: 96.0, h: 97.0, l: 91.0, c: 93.0 },
          { t: "May", o: 93.0, h: 94.0, l: 87.0, c: 89.75 },
        ],
        "1Y": [
          { t: "Q1", o: 95.0, h: 100.0, l: 88.0, c: 92.0 },
          { t: "Q2", o: 92.0, h: 96.0, l: 85.0, c: 88.0 },
          { t: "Q3", o: 88.0, h: 95.0, l: 86.0, c: 92.0 },
          { t: "Q4", o: 92.0, h: 94.0, l: 87.0, c: 89.75 },
        ],
        "5Y": [
          { t: "2020", o: 105.0, h: 112.0, l: 95.0, c: 98.0 },
          { t: "2021", o: 98.0, h: 108.0, l: 90.0, c: 92.0 },
          { t: "2022", o: 92.0, h: 100.0, l: 85.0, c: 94.0 },
          { t: "2023", o: 94.0, h: 102.0, l: 88.0, c: 91.0 },
          { t: "2024", o: 91.0, h: 96.0, l: 85.0, c: 89.75 },
        ],
      },
    },
    "Ariana Grande": {
      ticker: "ARII",
      price: 142.25,
      change: 8.7,
      changePercent: 6.5,
      ohlc: {
        "1D": [
          { t: "09:30", o: 140.2, h: 141.0, l: 139.8, c: 141.1 },
          { t: "10:00", o: 141.1, h: 141.8, l: 140.5, c: 141.8 },
          { t: "10:30", o: 141.8, h: 142.5, l: 141.2, c: 142.5 },
          { t: "11:00", o: 142.5, h: 143.0, l: 141.8, c: 142.1 },
          { t: "11:30", o: 142.1, h: 142.8, l: 141.5, c: 142.25 },
          { t: "12:00", o: 142.25, h: 143.0, l: 141.8, c: 142.5 },
          { t: "12:30", o: 142.5, h: 143.2, l: 142.0, c: 142.8 },
          { t: "13:00", o: 142.8, h: 143.5, l: 142.2, c: 142.4 },
          { t: "13:30", o: 142.4, h: 142.9, l: 141.8, c: 142.0 },
          { t: "14:00", o: 142.0, h: 142.6, l: 141.5, c: 142.3 },
          { t: "14:30", o: 142.3, h: 142.8, l: 141.9, c: 142.1 },
          { t: "15:00", o: 142.1, h: 142.5, l: 141.8, c: 142.25 },
        ],
        "1W": [
          { t: "Mon", o: 135.2, h: 138.0, l: 134.5, c: 137.5 },
          { t: "Tue", o: 137.5, h: 140.0, l: 136.8, c: 139.8 },
          { t: "Wed", o: 139.8, h: 142.0, l: 139.0, c: 141.1 },
          { t: "Thu", o: 141.1, h: 143.0, l: 140.5, c: 142.5 },
          { t: "Fri", o: 142.5, h: 143.5, l: 141.5, c: 142.25 },
        ],
        "1M": [
          { t: "W1", o: 125.0, h: 130.0, l: 124.0, c: 128.0 },
          { t: "W2", o: 128.0, h: 133.0, l: 127.0, c: 132.0 },
          { t: "W3", o: 132.0, h: 136.0, l: 130.0, c: 135.0 },
          { t: "W4", o: 135.0, h: 139.0, l: 134.0, c: 138.0 },
          { t: "W5", o: 138.0, h: 141.0, l: 136.5, c: 140.0 },
          { t: "W6", o: 140.0, h: 143.0, l: 139.0, c: 142.25 },
        ],
        "3M": [
          { t: "Mar", o: 135.0, h: 140.0, l: 132.0, c: 138.0 },
          { t: "Apr", o: 138.0, h: 142.0, l: 136.0, c: 140.0 },
          { t: "May", o: 140.0, h: 144.0, l: 138.0, c: 142.25 },
        ],
        "1Y": [
          { t: "Q1", o: 115.0, h: 128.0, l: 112.0, c: 125.0 },
          { t: "Q2", o: 125.0, h: 138.0, l: 122.0, c: 135.0 },
          { t: "Q3", o: 135.0, h: 142.0, l: 130.0, c: 140.0 },
          { t: "Q4", o: 140.0, h: 145.0, l: 136.0, c: 142.25 },
        ],
        "5Y": [
          { t: "2020", o: 68.0, h: 82.0, l: 60.0, c: 78.0 },
          { t: "2021", o: 78.0, h: 92.0, l: 72.0, c: 88.0 },
          { t: "2022", o: 88.0, h: 105.0, l: 82.0, c: 100.0 },
          { t: "2023", o: 100.0, h: 118.0, l: 95.0, c: 115.0 },
          { t: "2024", o: 115.0, h: 145.0, l: 110.0, c: 142.25 },
        ],
      },
    },
  };

  const currentData = talentData[selectedTalent] || talentData["Taylor Swift"];
  const chartOhlc = currentData.ohlc[timeframe] || currentData.ohlc["1M"];

  const [holdingsData] = useState([
    { talentName: "Taylor Swift", ticker: "SWFT", shares: 10 },
    { talentName: "BTS", ticker: "BTS", shares: 50 },
    { talentName: "Ariana Grande", ticker: "ARII", shares: 30 },
    { talentName: "Elvis", ticker: "ELVS", shares: 100 },
    { talentName: "Rolling Stones", ticker: "RLST", shares: 20 },
    { talentName: "Il Volo", ticker: "VOLO", shares: 50 },
    { talentName: "Kim Kardashian", ticker: "KIMK", shares: 10 },
  ]);

  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

  // Draw candlestick chart on canvas
  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !chartOhlc || chartOhlc.length === 0) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 20, right: 60, bottom: 40, left: 10 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    // Clear
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    // Price range
    const allPrices = chartOhlc.flatMap((c) => [c.h, c.l]);
    const minP = Math.min(...allPrices);
    const maxP = Math.max(...allPrices);
    const range = maxP - minP || 1;
    const padRange = range * 0.1;
    const yMin = minP - padRange;
    const yMax = maxP + padRange;

    const priceToY = (p) =>
      padding.top + chartH - ((p - yMin) / (yMax - yMin)) * chartH;

    // Grid lines
    const gridLines = 5;
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px monospace";
    ctx.textAlign = "right";

    for (let i = 0; i <= gridLines; i++) {
      const p = yMin + ((yMax - yMin) * i) / gridLines;
      const y = priceToY(p);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
      ctx.fillText("$" + p.toFixed(2), w - 5, y + 4);
    }

    // Candlesticks
    const candleCount = chartOhlc.length;
    const totalSpace = chartW;
    const candleWidth = Math.max(
      6,
      Math.min(40, (totalSpace / candleCount) * 0.6)
    );
    const gap =
      (totalSpace - candleWidth * candleCount) / (candleCount + 1);

    chartOhlc.forEach((candle, i) => {
      const x =
        padding.left + gap + i * (candleWidth + gap) + candleWidth / 2;
      const isUp = candle.c >= candle.o;
      const color = isUp ? "#c9a227" : "#8b6914";
      const bodyTop = priceToY(Math.max(candle.o, candle.c));
      const bodyBottom = priceToY(Math.min(candle.o, candle.c));
      const bodyHeight = Math.max(1, bodyBottom - bodyTop);

      // Wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, priceToY(candle.h));
      ctx.lineTo(x, priceToY(candle.l));
      ctx.stroke();

      // Body
      ctx.fillStyle = isUp ? "#c9a227" : "#8b6914";
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);

      // Body border for polish
      ctx.strokeStyle = isUp ? "#dbb934" : "#6b5210";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);

      // Label
      ctx.fillStyle = "#6b7280";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(candle.t, x, h - 10);
    });

    // Volume bars (subtle)
    const maxVol = Math.max(...chartOhlc.map((c) => Math.abs(c.c - c.o)));
    chartOhlc.forEach((candle, i) => {
      const x =
        padding.left + gap + i * (candleWidth + gap) + candleWidth / 2;
      const vol = Math.abs(candle.c - candle.o);
      const barH = maxVol > 0 ? (vol / maxVol) * 30 : 5;
      const isUp = candle.c >= candle.o;
      ctx.fillStyle = isUp
        ? "rgba(201, 162, 39, 0.15)"
        : "rgba(139, 105, 20, 0.15)";
      ctx.fillRect(
        x - candleWidth / 2,
        h - padding.bottom - barH,
        candleWidth,
        barH
      );
    });
  }, [chartOhlc]);

  useEffect(() => {
    drawChart();
    const handleResize = () => drawChart();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawChart]);

  // Canvas mouse hover for tooltip
  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    if (!canvas || !tooltip) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const w = rect.width;
    const padding = { left: 10, right: 60 };
    const chartW = w - padding.left - padding.right;
    const candleCount = chartOhlc.length;
    const candleWidth = Math.max(
      6,
      Math.min(40, (chartW / candleCount) * 0.6)
    );
    const gap = (chartW - candleWidth * candleCount) / (candleCount + 1);

    let found = null;
    chartOhlc.forEach((candle, i) => {
      const x =
        padding.left + gap + i * (candleWidth + gap) + candleWidth / 2;
      if (Math.abs(mouseX - x) < candleWidth / 2 + gap / 2) {
        found = candle;
      }
    });

    if (found) {
      tooltip.style.display = "block";
      tooltip.style.left = `${e.clientX - rect.left + 15}px`;
      tooltip.style.top = `${e.clientY - rect.top - 10}px`;
      tooltip.innerHTML = `
        <div style="font-size:11px;line-height:1.6">
          <div style="color:#9ca3af">${found.t}</div>
          <div>O: <span style="color:#c9a227">$${found.o.toFixed(2)}</span></div>
          <div>H: <span style="color:#22c55e">$${found.h.toFixed(2)}</span></div>
          <div>L: <span style="color:#ef4444">$${found.l.toFixed(2)}</span></div>
          <div>C: <span style="color:#c9a227">$${found.c.toFixed(2)}</span></div>
        </div>
      `;
    } else {
      tooltip.style.display = "none";
    }
  };

  const handleCanvasMouseLeave = () => {
    if (tooltipRef.current) tooltipRef.current.style.display = "none";
  };

  const handleOrderOptionChange = (option) => {
    setOrderOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  const handlePaymentFormChange = (field, value) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full z-10 bg-[#0a0a0a] py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8 min-h-screen pt-20 md:pt-24">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20 z-10">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
          {/* Left Column - Trading Panel */}
          <div className="lg:col-span-1 h-full space-y-6">
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5 flex-1 h-full">
              {/* Buy/Sell */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setTradeType("BUY")}
                  className={`flex-1 px-8 py-3 cursor-pointer text-white rounded-lg font-semibold tracking-wide transition-all ${
                    tradeType === "BUY"
                      ? "bg-green-600 shadow-lg shadow-green-600/20 scale-105"
                      : "bg-[#1a1a1a] border border-green-600/30 hover:bg-green-600/10"
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeType("SELL")}
                  className={`flex-1 px-8 py-3 cursor-pointer text-white rounded-lg font-semibold tracking-wide transition-all ${
                    tradeType === "SELL"
                      ? "bg-red-600 shadow-lg shadow-red-600/20 scale-105"
                      : "bg-[#1a1a1a] border border-red-600/30 hover:bg-red-600/10"
                  }`}
                >
                  SELL
                </button>
              </div>

              {/* Talent Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Talent Name
                  </label>
                  <select
                    value={selectedTalent}
                    onChange={(e) => setSelectedTalent(e.target.value)}
                    className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-[#c9a227] text-sm"
                  >
                    {Object.keys(talentData).map((talent) => (
                      <option key={talent} value={talent}>
                        {talent}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Ticker Symbol
                  </label>
                  <input
                    type="text"
                    value={currentData.ticker}
                    readOnly
                    className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-gray-400 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              {/* Order Options */}
              <div className="space-y-2 mb-6">
                {[
                  { key: "bestPrice", label: "Best Price" },
                  { key: "highestLowest", label: "Highest or Lowest" },
                  { key: "recoveringInvestment", label: "Recovering Investment" },
                ].map((option) => (
                  <label key={option.key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={orderOptions[option.key]}
                      onChange={() => handleOrderOptionChange(option.key)}
                      className="w-4 h-4 text-[#c9a227] bg-[#0f0f0f] border-[#2a2a2a] rounded focus:ring-[#c9a227] focus:ring-2"
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
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Currency
                  </label>
                  <select className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                      $
                    </span>
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full pl-7 pr-3 py-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm font-mono"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Share Price */}
              <div className="mb-6 p-3 bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Est. Share Price</span>
                  <span className="font-bold text-white font-mono">
                    ${currentData.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-[#c9a227] px-8 py-3 text-black rounded-lg font-semibold cursor-pointer hover:bg-[#dbb934] transition-colors tracking-wide">
                  REVIEW ORDER
                </button>
                <button className="w-full border border-[#c9a227] text-[#c9a227] px-8 py-3 cursor-pointer rounded-lg font-semibold hover:bg-[#c9a227] hover:text-black transition-colors tracking-wide">
                  FUND ACCOUNT
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Chart & Holdings */}
          <div className="lg:col-span-2 h-full space-y-6">
            {/* Chart Section */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-white">
                      {selectedTalent}
                    </h2>
                    <span className="text-sm text-gray-500 font-mono bg-[#1a1a1a] px-2 py-0.5 rounded">
                      {currentData.ticker}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono text-white">
                      ${currentData.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm font-medium font-mono ${
                        currentData.change >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {currentData.change >= 0 ? "+" : ""}$
                      {currentData.change.toFixed(2)} (
                      {currentData.change >= 0 ? "+" : ""}
                      {currentData.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 mt-2 sm:mt-0 bg-[#0a0a0a] p-1 rounded-lg">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        timeframe === tf
                          ? "bg-[#c9a227] text-black font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candlestick Chart Canvas */}
              <div className="relative w-full h-80 mb-4">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full rounded-lg"
                  style={{ display: "block" }}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseLeave={handleCanvasMouseLeave}
                />
                <div
                  ref={tooltipRef}
                  className="absolute pointer-events-none bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 z-10"
                  style={{ display: "none" }}
                />
              </div>

              {/* Financial Metrics */}
              <section className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#1f1f1f]">
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col lg:flex-row gap-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      Available Balance
                    </div>
                    <div className="font-bold text-white font-mono">
                      $9,000.00
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      Current Invested
                    </div>
                    <div className="font-bold text-white font-mono">
                      $3,250.00
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col lg:flex-row gap-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      Daily Average
                    </div>
                    <div className="font-bold text-white font-mono">
                      $12.45
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      Today&apos;s P&amp;L
                    </div>
                    <div className="font-bold text-green-400 font-mono">
                      +$45.20 (+1.39%)
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-between gap-4 mt-3 pt-3 border-t border-[#1f1f1f]">
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Total Shares Held
                  </div>
                  <div className="font-bold text-white font-mono">270</div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Total Returns
                  </div>
                  <div className="font-bold text-green-400 font-mono">
                    +$1,250.00 (+8.2%)
                  </div>
                </div>
              </div>

              <button className="mt-4 bg-[#c9a227] px-8 py-3 text-black rounded-lg font-semibold hover:bg-[#dbb934] transition-colors tracking-wide">
                View Talent Profile
              </button>
            </div>
          </div>
        </div>

        {/* Section Two */}
        <div className="flex flex-col 2xl:gap-16 gap-12 mt-10 lg:mt-16 2xl:mt-20 z-50">
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
            {/* Payment Form */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5 flex-1 h-full">
                <h3 className="text-xl font-bold text-[#c9a227] mb-6 text-center tracking-wide">
                  Payment Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      value={paymentForm.nameOnCard}
                      onChange={(e) =>
                        handlePaymentFormChange("nameOnCard", e.target.value)
                      }
                      className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                      Credit Card / Debit #
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cardNumber}
                      onChange={(e) =>
                        handlePaymentFormChange("cardNumber", e.target.value)
                      }
                      className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm placeholder-gray-600"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Exp Date
                      </label>
                      <input
                        type="text"
                        value={paymentForm.expDate}
                        onChange={(e) =>
                          handlePaymentFormChange("expDate", e.target.value)
                        }
                        className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm placeholder-gray-600"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        CVV #
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cvs}
                        onChange={(e) =>
                          handlePaymentFormChange("cvs", e.target.value)
                        }
                        className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm placeholder-gray-600"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                      Mailing Address
                    </label>
                    <textarea
                      value={paymentForm.mailingAddress}
                      onChange={(e) =>
                        handlePaymentFormChange("mailingAddress", e.target.value)
                      }
                      className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm"
                      rows="3"
                    />
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={paymentForm.checkSame}
                        onChange={(e) =>
                          handlePaymentFormChange("checkSame", e.target.checked)
                        }
                        className="w-4 h-4 text-[#c9a227] bg-[#0f0f0f] border-[#2a2a2a] rounded focus:ring-[#c9a227] focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-300">
                        Same as billing address
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      value={paymentForm.email}
                      onChange={(e) =>
                        handlePaymentFormChange("email", e.target.value)
                      }
                      className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Holdings Table */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5 flex-1 h-full">
                <h3 className="text-xl font-bold text-[#c9a227] mb-6 text-center tracking-wide">
                  Portfolio Holdings (
                  {holdingsData.reduce((sum, h) => sum + h.shares, 0)} Shares)
                </h3>

                {/* Table Header */}
                <div className="grid grid-cols-3 gap-4 py-3 px-4 bg-[#0f0f0f] text-xs text-gray-500 font-bold uppercase tracking-wider border-b border-[#1f1f1f] rounded-t-xl">
                  <div className="text-left">Talent</div>
                  <div className="text-left">Ticker</div>
                  <div className="text-left">Shares Held</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-[#1f1f1f]">
                  {holdingsData.map((holding, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-3 gap-4 py-3 px-4 items-center transition-all duration-300 cursor-pointer ${
                        holding.talentName === selectedTalent
                          ? "bg-[#c9a227]/5 border-l-2 border-[#c9a227]"
                          : "hover:bg-[#1a1a1a]"
                      }`}
                      onClick={() => setSelectedTalent(holding.talentName)}
                    >
                      <div className="text-sm text-gray-200 truncate">
                        {holding.talentName}
                      </div>
                      <div className="text-sm text-gray-400 font-mono">
                        {holding.ticker}
                      </div>
                      <div className="text-sm text-gray-200 font-mono">
                        {holding.shares}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TradeTalentPage;
