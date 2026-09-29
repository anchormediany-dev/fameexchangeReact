import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CandlestickChart from "../../components/CandlestickChart";
import { useGetTalentChartQuery, useGetOpenPositionsQuery } from "../../app/tradingApi";

const RANGES = ["1D", "1W", "1M", "3M", "1Y", "5Y", "10Y"];
const fmt = (n, d = 2) => Number(n || 0).toFixed(d);
const fmtPnl = (v) => (v >= 0 ? `+$${fmt(v)}` : `-$${fmt(Math.abs(v))}`);
const pnlColor = (v) => (v > 0 ? "text-green-400" : v < 0 ? "text-red-400" : "text-gray-400");

export default function PortfolioDashboardForFan({ talentId }) {
  const [range, setRange] = useState("1D");
  const isLoggedIn = !!useSelector((s) => s?.auth?.user);

  const { data: chartData, isLoading: chartLoading } = useGetTalentChartQuery(
    { id: talentId, range },
    { skip: !talentId }
  );
  const { data: positionsData, isLoading: positionsLoading } = useGetOpenPositionsQuery(
    { talent_id: talentId, limit: 1 },
    { skip: !talentId || !isLoggedIn }
  );

  const candles = chartData?.data || [];
  const position = positionsData?.positions?.[0] || null;

  return (
    <section>
      <div className="container">
        {/* Chart range filters */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-4 text-xs md:text-sm font-normal text-white">
            {RANGES.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setRange(label)}
                className={`cursor-pointer ${
                  label === range ? "text-yellow-400 font-semibold" : "text-gray-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-48 md:h-72 mb-8 bg-[#151515] rounded-xl shadow-inner px-2 md:px-6 py-4">
          {chartLoading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              Loading chart…
            </div>
          ) : candles.length > 0 ? (
            <CandlestickChart data={candles} height={240} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No chart data available yet.
            </div>
          )}
        </div>

        {/* Your position in this talent */}
        <div className="relative z-10">
          {!isLoggedIn ? (
            <div className="bg-[#111] rounded-xl p-6 border border-[#404040] text-center">
              <p className="text-gray-300 mb-3">Sign in to see your position in this talent.</p>
              <Link
                to="/login"
                className="inline-block bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:brightness-110 transition"
              >
                Sign In
              </Link>
            </div>
          ) : positionsLoading ? (
            <div className="bg-[#111] rounded-xl p-6 border border-[#404040] text-center text-gray-500">
              Loading your position…
            </div>
          ) : !position ? (
            <div className="bg-[#111] rounded-xl p-6 border border-[#404040] text-center">
              <p className="text-gray-300 mb-3">You don't own any shares of this talent yet.</p>
              <Link
                to={`/trade-talent/${talentId}`}
                className="inline-block bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:brightness-110 transition"
              >
                Start Trading
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#111] rounded-xl p-4 border border-[#404040]">
                <h3 className="text-sm font-normal">Your Equity</h3>
                <p className="text-primary text-2xl font-medium">
                  ${fmt(position.units * position.current_price)}
                </p>
                <p className={`flex justify-between text-sm mt-2 ${pnlColor(position.unrealized_pnl)}`}>
                  <span>Unrealized P&amp;L:</span>
                  <span>
                    {fmtPnl(position.unrealized_pnl)} ({fmt(position.unrealized_pnl_percent)}%)
                  </span>
                </p>
              </div>

              <div className="bg-[#111] rounded-xl p-4 border border-[#404040]">
                <h3 className="text-sm font-normal">Your Average Cost</h3>
                <p className="text-primary text-2xl font-medium">${fmt(position.entry_price, 4)}</p>
                <p className="text-white flex justify-between text-sm mt-2">
                  <span>Shares</span>
                  <span>{fmt(position.units, 0)}</span>
                </p>
                <p className="text-white flex justify-between text-sm mt-2">
                  <span>Invested</span>
                  <span>${fmt(position.invested_amount)}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
