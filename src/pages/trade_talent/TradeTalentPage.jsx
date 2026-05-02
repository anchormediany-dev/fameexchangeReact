import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useGetTalentByIdQuery,
  useGetTalentQuoteQuery,
  useGetTalentChartQuery,
  useGetTalentStatsQuery,
  useGetWalletQuery,
  useGetOpenPositionsQuery,
  useTradePreviewMutation,
  useTradeOpenMutation,
} from "../../app/tradingApi";
import { useGetTalentQuery } from "../../app/authApi";
import TradeSuccessModal from "../../components/trading/TradeSuccessModal";
import ClosePositionModal from "../../components/trading/ClosePositionModal";
import DepositModal from "../../components/trading/DepositModal";

// â”€â”€ helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const fmt = (n, d = 2) => Number(n || 0).toFixed(d);
const fmtPnl = (v) => (v >= 0 ? `+$${fmt(v)}` : `-$${fmt(Math.abs(v))}`);
const pnlClass = (v) =>
  v > 0 ? "text-green-400" : v < 0 ? "text-red-400" : "text-gray-400";
const formatVol = (v) => {
  if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return String(v);
};

const TradeTalentPage = () => {
  const { id: talentIdParam } = useParams();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  // â”€â”€ local state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [selectedTalentId, setSelectedTalentId] = useState(talentIdParam || "");
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState("");
  const [chartRange, setChartRange] = useState("1D");
  const [talentSearch, setTalentSearch] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(null);
  const [closingPosition, setClosingPosition] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [quoteExpiry, setQuoteExpiry] = useState(null);
  const previewTimer = useRef(null);
  const expiryInterval = useRef(null);

  useEffect(() => {
    if (talentIdParam) setSelectedTalentId(talentIdParam);
  }, [talentIdParam]);

  // â”€â”€ API queries â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // ── API queries ──────────────────────────────────────────────────────────
  // Use the SAME talent listing endpoint as /inverse so the dropdown is
  // populated by /user/getusers (taleUsers). Filtered to TALENT role and
  // searched client-side.
  const { data: usersData } = useGetTalentQuery();
  const talentList = (usersData?.taleUsers || [])
    .filter((u) => (u.role || "").toUpperCase() === "TALENT")
    .filter((u) =>
      talentSearch
        ? (u.name || "").toLowerCase().includes(talentSearch.toLowerCase())
        : true
    );

  const { data: talentDetail } = useGetTalentByIdQuery(selectedTalentId, {
    skip: !selectedTalentId,
  });

  const { data: quoteData } = useGetTalentQuoteQuery(selectedTalentId, {
    skip: !selectedTalentId,
    pollingInterval: 5000,
  });

  const { data: chartData } = useGetTalentChartQuery(
    { id: selectedTalentId, range: chartRange },
    { skip: !selectedTalentId }
  );

  const { data: statsData } = useGetTalentStatsQuery(selectedTalentId, {
    skip: !selectedTalentId,
  });

  const { data: walletData, refetch: refetchWallet } = useGetWalletQuery(
    undefined,
    { pollingInterval: 15000 }
  );

  const { data: positionsData, refetch: refetchPositions } =
    useGetOpenPositionsQuery({ page: 1, limit: 50 }, { pollingInterval: 15000 });

  const [tradePreview, { isLoading: previewLoading }] =
    useTradePreviewMutation();
  const [tradeOpen, { isLoading: tradeLoading }] = useTradeOpenMutation();

  const talent = talentDetail?.talent;
  const quote = quoteData?.quote;
  const wallet = walletData?.wallet;
  const positions = positionsData?.positions || [];
  const chartPoints = (chartData?.data || []).map((p) => ({
    time: new Date(p.recorded_at).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: p.price,
    volume: p.volume,
  }));
  const stats = statsData?.stats?.stats;

  // â”€â”€ preview debounce â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const fetchPreview = useCallback(
    async (amt) => {
      if (!selectedTalentId || !amt || parseFloat(amt) <= 0) {
        setPreviewData(null);
        return;
      }
      try {
        const res = await tradePreview({
          talent_id: selectedTalentId,
          side: tradeType,
          amount: parseFloat(amt),
        }).unwrap();
        setPreviewData(res.preview);
        setQuoteExpiry(res.preview.quote_expires_in_seconds || 10);
      } catch (err) {
        setPreviewData(null);
        if (err?.data?.message) toast.error(err.data.message);
      }
    },
    [selectedTalentId, tradeType, tradePreview]
  );

  useEffect(() => {
    clearTimeout(previewTimer.current);
    if (amount && parseFloat(amount) > 0 && selectedTalentId) {
      previewTimer.current = setTimeout(() => fetchPreview(amount), 400);
    } else {
      setPreviewData(null);
    }
    return () => clearTimeout(previewTimer.current);
  }, [amount, tradeType, selectedTalentId, fetchPreview]);

  // Quote expiry countdown
  useEffect(() => {
    clearInterval(expiryInterval.current);
    if (quoteExpiry && quoteExpiry > 0) {
      expiryInterval.current = setInterval(() => {
        setQuoteExpiry((prev) => {
          if (prev <= 1) {
            clearInterval(expiryInterval.current);
            setPreviewData(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(expiryInterval.current);
  }, [quoteExpiry]);

  // â”€â”€ execute trade â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleConfirmTrade = async () => {
    if (!previewData || !previewData.can_execute) return;
    const idempotency_key = `${user?._id || user?.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const res = await tradeOpen({
        talent_id: selectedTalentId,
        side: tradeType,
        amount: parseFloat(amount),
        quote_price: previewData.entry_price,
        idempotency_key,
      }).unwrap();
      setShowSuccessModal(res.trade);
      setPreviewData(null);
      setAmount("");
      refetchWallet();
      refetchPositions();
    } catch (err) {
      toast.error(err?.data?.message || "Trade failed. Please try again.");
    }
  };

  // â”€â”€ chart tooltip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const ChartTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-xs">
        <div className="text-gray-400">{d.time}</div>
        <div className="text-white font-mono">${fmt(d.price, 4)}</div>
        {d.volume != null && (
          <div className="text-gray-500">Vol: {formatVol(d.volume)}</div>
        )}
      </div>
    );
  };

  const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y", "10Y"];
  const statPeriods = [
    { key: "24h", label: "24H" },
    { key: "1w", label: "1W" },
    { key: "1m", label: "1M" },
    { key: "3m", label: "3M" },
    { key: "1y", label: "1Y" },
    { key: "10y", label: "10Y" },
  ];

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen pt-20 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto mt-6 lg:mt-10">
        {/* â”€â”€ Main Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* â”€â”€ Left: Order Box â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5">
              {/* BUY / SELL tabs */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setTradeType("buy")}
                  className={`flex-1 py-3 rounded-lg font-semibold tracking-wide transition-all cursor-pointer ${
                    tradeType === "buy"
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20 scale-[1.02]"
                      : "bg-[#1a1a1a] text-white border border-green-600/30 hover:bg-green-600/10"
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeType("sell")}
                  className={`flex-1 py-3 rounded-lg font-semibold tracking-wide transition-all cursor-pointer ${
                    tradeType === "sell"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20 scale-[1.02]"
                      : "bg-[#1a1a1a] text-white border border-red-600/30 hover:bg-red-600/10"
                  }`}
                >
                  SELL
                </button>
              </div>

              {/* Talent selector */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                  Select Talent
                </label>
                <input
                  type="text"
                  value={talentSearch}
                  onChange={(e) => setTalentSearch(e.target.value)}
                  placeholder="Search talents..."
                  className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm mb-2"
                />
                <select
                  value={selectedTalentId}
                  onChange={(e) => {
                    setSelectedTalentId(e.target.value);
                    setPreviewData(null);
                    setAmount("");
                    navigate(`/trade-talent/${e.target.value}`, {
                      replace: true,
                    });
                  }}
                  className="w-full p-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm"
                >
                  <option value="">— Choose a talent —</option>
                  {talentList.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                      {t.symbol ? ` (${t.symbol})` : ""}
                      {t.current_price != null
                        ? ` — $${fmt(t.current_price)}`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quote display */}
              {quote && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                    <div className="text-[10px] text-gray-500 uppercase mb-1">
                      Bid
                    </div>
                    <div className="text-green-400 font-mono font-semibold">
                      ${fmt(quote.bid, 4)}
                    </div>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                    <div className="text-[10px] text-gray-500 uppercase mb-1">
                      Ask
                    </div>
                    <div className="text-red-400 font-mono font-semibold">
                      ${fmt(quote.ask, 4)}
                    </div>
                  </div>
                </div>
              )}

              {/* Amount input */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm font-mono"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2 mb-4">
                {[50, 100, 500, 1000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(String(v))}
                    className="flex-1 text-xs py-2 border border-[#2a2a2a] rounded-lg text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer"
                  >
                    ${v}
                  </button>
                ))}
              </div>

              {/* Preview loading */}
              {previewLoading && (
                <div className="flex justify-center py-4">
                  <div className="w-5 h-5 border-2 border-[#c9a227] border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Preview data */}
              {previewData && (
                <div className="bg-[#0a0a0a] rounded-xl p-4 mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Entry Price</span>
                    <span className="text-white font-mono">
                      ${fmt(previewData.entry_price, 4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Units</span>
                    <span className="text-white font-mono">
                      {fmt(previewData.estimated_units, 6)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee (0.5%)</span>
                    <span className="text-white font-mono">
                      -${fmt(previewData.fee)}
                    </span>
                  </div>
                  <div className="border-t border-[#1f1f1f] my-1" />
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-300">Total Required</span>
                    <span className="text-[#c9a227] font-mono">
                      ${fmt(previewData.total_required)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Available</span>
                    <span className="text-gray-400 font-mono">
                      ${fmt(previewData.wallet_balance)}
                    </span>
                  </div>
                  {!previewData.can_execute && (
                    <div className="text-red-400 text-xs text-center mt-2">
                      Insufficient balance
                    </div>
                  )}
                  {quoteExpiry != null && quoteExpiry > 0 && (
                    <div className="text-center text-xs text-gray-500 mt-1">
                      Quote expires in {quoteExpiry}s
                    </div>
                  )}
                  {quoteExpiry === 0 && (
                    <div className="text-center">
                      <button
                        onClick={() => fetchPreview(amount)}
                        className="text-[#c9a227] text-xs underline cursor-pointer"
                      >
                        Quote expired â€” Refresh
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Confirm Order */}
              <button
                onClick={handleConfirmTrade}
                disabled={
                  !previewData ||
                  !previewData.can_execute ||
                  tradeLoading ||
                  quoteExpiry === 0
                }
                className={`w-full py-3 rounded-lg font-semibold tracking-wide transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  tradeType === "buy"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {tradeLoading
                  ? "Executing..."
                  : `Confirm ${tradeType.toUpperCase()} Order`}
              </button>

              {/* Fund Account */}
              <button
                onClick={() => setShowDepositModal(true)}
                className="w-full mt-3 border border-[#c9a227] text-[#c9a227] py-3 rounded-lg font-semibold hover:bg-[#c9a227] hover:text-black transition-colors cursor-pointer"
              >
                FUND ACCOUNT
              </button>

              {/* Wallet summary */}
              {wallet && (
                <div className="mt-4 bg-[#0a0a0a] rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Available Balance</span>
                    <span className="text-white font-mono">
                      ${fmt(wallet.available_balance)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Equity</span>
                    <span className="text-white font-mono">
                      ${fmt(wallet.total_equity)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Realized P&L</span>
                    <span
                      className={`font-mono ${pnlClass(wallet.realized_pnl)}`}
                    >
                      {fmtPnl(wallet.realized_pnl)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Unrealized P&L</span>
                    <span
                      className={`font-mono ${pnlClass(wallet.unrealized_pnl)}`}
                    >
                      {fmtPnl(wallet.unrealized_pnl)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Open Positions</span>
                    <span className="text-white font-mono">
                      {wallet.open_positions_count || 0}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* â”€â”€ Right: Chart + Stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Card */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5">
              {talent ? (
                <>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        {talent.image && (
                          <img
                            src={talent.image}
                            alt={talent.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <h2 className="text-xl font-bold text-white">
                          {talent.name}
                        </h2>
                        <span className="text-sm text-gray-500 font-mono bg-[#1a1a1a] px-2 py-0.5 rounded">
                          {talent.symbol}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-mono text-white">
                          ${fmt(talent.current_price, 4)}
                        </span>
                        <span
                          className={`text-sm font-medium font-mono ${
                            talent.change_amount >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {talent.change_amount >= 0 ? "+" : ""}$
                          {fmt(talent.change_amount)} (
                          {talent.change_amount >= 0 ? "+" : ""}
                          {fmt(talent.change_percent)}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2 sm:mt-0 bg-[#0a0a0a] p-1 rounded-lg flex-wrap">
                      {ranges.map((r) => (
                        <button
                          key={r}
                          onClick={() => setChartRange(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                            chartRange === r
                              ? "bg-[#c9a227] text-black font-semibold"
                              : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="w-full h-72 md:h-80">
                    {chartPoints.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartPoints}
                          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient
                              id="priceGrad"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#c9a227"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#c9a227"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6b7280", fontSize: 10 }}
                            minTickGap={30}
                          />
                          <YAxis
                            domain={["auto", "auto"]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6b7280", fontSize: 10 }}
                            tickFormatter={(v) => `$${v}`}
                            width={60}
                          />
                          <Tooltip content={<ChartTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#c9a227"
                            strokeWidth={2}
                            fill="url(#priceGrad)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-600">
                        No chart data available
                      </div>
                    )}
                  </div>

                  {/* 24h Stats Bar */}
                  {talent.volume_24h != null && (
                    <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-[#1f1f1f] text-sm">
                      <div>
                        <span className="text-gray-500 text-xs uppercase">
                          24h Volume
                        </span>
                        <div className="text-white font-mono">
                          {formatVol(talent.volume_24h)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs uppercase">
                          24h High
                        </span>
                        <div className="text-white font-mono">
                          ${fmt(talent.high_24h, 4)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs uppercase">
                          24h Low
                        </span>
                        <div className="text-white font-mono">
                          ${fmt(talent.low_24h, 4)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs uppercase">
                          Spread
                        </span>
                        <div className="text-white font-mono">
                          ${fmt(talent.spread, 4)}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-600">
                  {selectedTalentId
                    ? "Loading talent..."
                    : "Select a talent to start trading"}
                </div>
              )}
            </div>

            {/* Stats Table */}
            {stats && (
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5">
                <h3 className="text-lg font-bold text-white mb-4">
                  Market Statistics
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase border-b border-[#1f1f1f]">
                        <th className="py-2 text-left">Period</th>
                        <th className="py-2 text-right">Change</th>
                        <th className="py-2 text-right">Change %</th>
                        <th className="py-2 text-right">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statPeriods.map(({ key, label }) => {
                        const s = stats[key];
                        if (!s) return null;
                        return (
                          <tr
                            key={key}
                            className="border-b border-[#1f1f1f]/50"
                          >
                            <td className="py-2 text-gray-300">{label}</td>
                            <td
                              className={`py-2 text-right font-mono ${pnlClass(s.change_amount)}`}
                            >
                              {s.change_amount >= 0 ? "+" : ""}$
                              {fmt(s.change_amount)}
                            </td>
                            <td
                              className={`py-2 text-right font-mono ${pnlClass(s.change_percent)}`}
                            >
                              {s.change_percent >= 0 ? "+" : ""}
                              {fmt(s.change_percent)}%
                            </td>
                            <td className="py-2 text-right text-gray-400 font-mono">
                              {formatVol(s.volume)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Open Positions */}
            {positions.length > 0 && (
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5">
                <h3 className="text-lg font-bold text-white mb-4">
                  Open Positions{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    ({positions.length})
                  </span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase border-b border-[#1f1f1f]">
                        <th className="py-2 text-left">Talent</th>
                        <th className="py-2 text-center">Side</th>
                        <th className="py-2 text-right">Entry</th>
                        <th className="py-2 text-right">Current</th>
                        <th className="py-2 text-right">Invested</th>
                        <th className="py-2 text-right">P&L</th>
                        <th className="py-2 text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((pos) => (
                        <tr
                          key={pos._id}
                          className="border-b border-[#1f1f1f]/50 hover:bg-[#1a1a1a]/50"
                        >
                          <td className="py-3 text-left">
                            <div className="flex items-center gap-2">
                              {pos.talent_image && (
                                <img
                                  src={pos.talent_image}
                                  alt=""
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                              )}
                              <div>
                                <div className="text-white text-xs">
                                  {pos.talent_name}
                                </div>
                                <div className="text-gray-500 text-[10px] font-mono">
                                  {pos.talent_symbol}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded uppercase ${
                                pos.side === "buy"
                                  ? "bg-green-600/20 text-green-400"
                                  : "bg-red-600/20 text-red-400"
                              }`}
                            >
                              {pos.side}
                            </span>
                          </td>
                          <td className="py-3 text-right font-mono text-gray-300">
                            ${fmt(pos.entry_price)}
                          </td>
                          <td className="py-3 text-right font-mono text-white">
                            ${fmt(pos.current_price)}
                          </td>
                          <td className="py-3 text-right font-mono text-gray-300">
                            ${fmt(pos.invested_amount)}
                          </td>
                          <td className="py-3 text-right">
                            <div
                              className={`font-mono font-semibold ${pnlClass(pos.unrealized_pnl)}`}
                            >
                              {fmtPnl(pos.unrealized_pnl)}
                            </div>
                            <div
                              className={`text-[10px] font-mono ${pnlClass(pos.unrealized_pnl_percent)}`}
                            >
                              {pos.unrealized_pnl_percent >= 0 ? "+" : ""}
                              {fmt(pos.unrealized_pnl_percent)}%
                            </div>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setClosingPosition(pos)}
                              className="text-xs bg-red-600/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-600/30 transition-colors cursor-pointer"
                            >
                              Close
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* â”€â”€ Modals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {showSuccessModal && (
        <TradeSuccessModal
          trade={showSuccessModal}
          onClose={() => setShowSuccessModal(null)}
        />
      )}
      {closingPosition && (
        <ClosePositionModal
          position={closingPosition}
          onClose={() => setClosingPosition(null)}
          onSuccess={() => {
            setClosingPosition(null);
            refetchWallet();
            refetchPositions();
          }}
        />
      )}
      {showDepositModal && (
        <DepositModal
          onClose={() => setShowDepositModal(false)}
          onSuccess={() => refetchWallet()}
        />
      )}
    </div>
  );
};

export default TradeTalentPage;
