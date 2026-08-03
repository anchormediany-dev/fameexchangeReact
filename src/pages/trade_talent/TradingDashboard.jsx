import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetWalletQuery,
  useGetOpenPositionsQuery,
  useGetTradeHistoryQuery,
  useGetWalletTransactionsQuery,
} from "../../app/tradingApi";
import ClosePositionModal from "../../components/trading/ClosePositionModal";
import DepositModal from "../../components/trading/DepositModal";

const fmt = (n, d = 2) => Number(n || 0).toFixed(d);
const fmtPnl = (v) => (v >= 0 ? `+$${fmt(v)}` : `-$${fmt(Math.abs(v))}`);
const pnlClass = (v) =>
  v > 0 ? "text-green-400" : v < 0 ? "text-red-400" : "text-gray-400";
const TradingDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("positions");
  const [closingPosition, setClosingPosition] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // Trade history filters
  const [historyPage, setHistoryPage] = useState(1);
  const [historyFilter, setHistoryFilter] = useState({
    side: "",
    trade_type: "",
  });

  // Wallet transaction filters
  const [txPage, setTxPage] = useState(1);
  const [txType, setTxType] = useState("");

  const { data: walletData, refetch: refetchWallet } = useGetWalletQuery(
    undefined,
    { pollingInterval: 15000 }
  );

  const { data: positionsData, refetch: refetchPositions } =
    useGetOpenPositionsQuery({ page: 1, limit: 50 }, { pollingInterval: 15000 });

  const { data: historyData } = useGetTradeHistoryQuery({
    page: historyPage,
    limit: 20,
    ...historyFilter,
  });

  const { data: txData } = useGetWalletTransactionsQuery({
    page: txPage,
    limit: 20,
    type: txType,
  });

  const wallet = walletData?.wallet;
  const positions = positionsData?.positions || [];
  const trades = historyData?.items || [];
  const tradeSummary = historyData?.summary;
  const transactions = txData?.items || [];

  const tabs = [
    { key: "positions", label: "Open Positions", count: positions.length },
    { key: "history", label: "Trade History" },
    { key: "transactions", label: "Wallet History" },
  ];

  const txTypeBadge = (type) => {
    const map = {
      deposit: "bg-green-600/20 text-green-400",
      withdrawal: "bg-red-600/20 text-red-400",
      trade_open: "bg-blue-600/20 text-blue-400",
      trade_close: "bg-purple-600/20 text-purple-400",
      fee: "bg-yellow-600/20 text-yellow-400",
      adjustment: "bg-gray-600/20 text-gray-400",
    };
    return map[type] || "bg-gray-600/20 text-gray-400";
  };

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen pt-20 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto mt-6 lg:mt-10">
        {/* Wallet Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Available Balance",
              value: `$${fmt(wallet?.available_balance)}`,
              cls: "text-white",
            },
            {
              label: "Total Equity",
              value: `$${fmt(wallet?.total_equity)}`,
              cls: "text-white",
            },
            {
              label: "Realized P&L",
              value: fmtPnl(wallet?.realized_pnl || 0),
              cls: pnlClass(wallet?.realized_pnl || 0),
            },
            {
              label: "Unrealized P&L",
              value: fmtPnl(wallet?.unrealized_pnl || 0),
              cls: pnlClass(wallet?.unrealized_pnl || 0),
            },
            {
              label: "Open Positions",
              value: wallet?.open_positions_count || 0,
              cls: "text-white",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4"
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div className={`text-lg font-mono font-semibold ${item.cls}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate("/trade-talent")}
            className="bg-[#c9a227] text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-[#dbb934] transition-colors cursor-pointer"
          >
            Trade Now
          </button>
          <button
            onClick={() => setShowDepositModal(true)}
            className="border border-[#c9a227] text-[#c9a227] px-6 py-2.5 rounded-lg font-semibold hover:bg-[#c9a227] hover:text-black transition-colors cursor-pointer"
          >
            Add Funds
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#111111] p-1 rounded-lg mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#c9a227] text-black"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              {tab.label}
              {tab.count != null && (
                <span className="ml-1.5 text-xs opacity-70">({tab.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-6">
          {/* ── Open Positions ──────────────────────────── */}
          {activeTab === "positions" && (
            <>
              {positions.length === 0 ? (
                <div className="text-center py-16 text-gray-600">
                  <div className="text-4xl mb-4">📊</div>
                  <div className="text-lg mb-2">No open positions</div>
                  <div className="text-sm text-gray-500">
                    Start trading to see your positions here
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase border-b border-[#1f1f1f]">
                        <th className="py-3 text-left">Talent</th>
                        <th className="py-3 text-center">Side</th>
                        <th className="py-3 text-right">Entry Price</th>
                        <th className="py-3 text-right">Current Price</th>
                        <th className="py-3 text-right">Shares</th>
                        <th className="py-3 text-right">Invested</th>
                        <th className="py-3 text-right">P&L</th>
                        <th className="py-3 text-right">Opened</th>
                        <th className="py-3 text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((pos) => (
                        <tr
                          key={pos._id}
                          className="border-b border-[#1f1f1f]/50 hover:bg-[#1a1a1a]/50"
                        >
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              {pos.talent_image && (
                                <img
                                  src={pos.talent_image}
                                  alt=""
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                              )}
                              <div>
                                <div className="text-white font-medium">
                                  {pos.talent_name}
                                </div>
                                <div className="text-gray-500 text-xs font-mono">
                                  {pos.talent_symbol}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded uppercase ${
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
                            {fmt(pos.units, 0)}
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
                          <td className="py-3 text-right text-gray-500 text-xs">
                            {new Date(pos.opened_at).toLocaleDateString()}
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
              )}
            </>
          )}

          {/* ── Trade History ───────────────────────────── */}
          {activeTab === "history" && (
            <>
              {/* Summary */}
              {tradeSummary && (
                <div className="flex flex-wrap gap-6 mb-6 pb-4 border-b border-[#1f1f1f]">
                  <div>
                    <span className="text-xs text-gray-500 uppercase">
                      Total Trades
                    </span>
                    <div className="text-white font-mono font-semibold">
                      {tradeSummary.total_trades}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase">
                      Realized P&L
                    </span>
                    <div
                      className={`font-mono font-semibold ${pnlClass(tradeSummary.realized_pnl)}`}
                    >
                      {fmtPnl(tradeSummary.realized_pnl)}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase">
                      Unrealized P&L
                    </span>
                    <div
                      className={`font-mono font-semibold ${pnlClass(tradeSummary.unrealized_pnl)}`}
                    >
                      {fmtPnl(tradeSummary.unrealized_pnl)}
                    </div>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-4">
                <select
                  value={historyFilter.side}
                  onChange={(e) =>
                    setHistoryFilter((p) => ({
                      ...p,
                      side: e.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-sm text-white"
                >
                  <option value="">All Sides</option>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
                <select
                  value={historyFilter.trade_type}
                  onChange={(e) =>
                    setHistoryFilter((p) => ({
                      ...p,
                      trade_type: e.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-sm text-white"
                >
                  <option value="">All Types</option>
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </select>
              </div>

              {trades.length === 0 ? (
                <div className="text-center py-16 text-gray-600">
                  No trade history yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase border-b border-[#1f1f1f]">
                        <th className="py-3 text-left">Date</th>
                        <th className="py-3 text-left">Talent</th>
                        <th className="py-3 text-center">Side</th>
                        <th className="py-3 text-center">Type</th>
                        <th className="py-3 text-right">Price</th>
                        <th className="py-3 text-right">Amount</th>
                        <th className="py-3 text-right">Shares</th>
                        <th className="py-3 text-right">Fee</th>
                        <th className="py-3 text-right">P&L</th>
                        <th className="py-3 text-right">Ref</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trades.map((t) => (
                        <tr
                          key={t.trade_id}
                          className="border-b border-[#1f1f1f]/50 hover:bg-[#1a1a1a]/50"
                        >
                          <td className="py-3 text-gray-400 text-xs">
                            {new Date(t.created_at).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              {t.talent_image && (
                                <img
                                  src={t.talent_image}
                                  alt=""
                                  className="w-5 h-5 rounded-full object-cover"
                                />
                              )}
                              <span className="text-white text-xs">
                                {t.talent_name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                                t.side === "buy"
                                  ? "bg-green-600/20 text-green-400"
                                  : "bg-red-600/20 text-red-400"
                              }`}
                            >
                              {t.side}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-gray-600/20 text-gray-400">
                              {t.trade_type}
                            </span>
                          </td>
                          <td className="py-3 text-right font-mono text-gray-300">
                            ${fmt(t.price)}
                          </td>
                          <td className="py-3 text-right font-mono text-white">
                            ${fmt(t.amount)}
                          </td>
                          <td className="py-3 text-right font-mono text-gray-400">
                            {fmt(t.units, 0)}
                          </td>
                          <td className="py-3 text-right font-mono text-gray-500">
                            ${fmt(t.fee)}
                          </td>
                          <td className="py-3 text-right">
                            {t.pnl != null ? (
                              <span
                                className={`font-mono font-semibold ${pnlClass(t.pnl)}`}
                              >
                                {fmtPnl(t.pnl)}
                              </span>
                            ) : (
                              <span className="text-gray-600">—</span>
                            )}
                          </td>
                          <td className="py-3 text-right text-[10px] text-gray-600 font-mono">
                            {t.reference_no?.slice(-8)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {historyData?.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-[#1f1f1f]">
                      <button
                        onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                        disabled={historyPage <= 1}
                        className="px-3 py-1 text-xs border border-[#2a2a2a] rounded text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        Prev
                      </button>
                      <span className="px-3 py-1 text-xs text-gray-500">
                        {historyPage} / {historyData.totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setHistoryPage((p) =>
                            Math.min(historyData.totalPages, p + 1)
                          )
                        }
                        disabled={historyPage >= historyData.totalPages}
                        className="px-3 py-1 text-xs border border-[#2a2a2a] rounded text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ── Wallet Transactions ─────────────────────── */}
          {activeTab === "transactions" && (
            <>
              <div className="flex flex-wrap gap-3 mb-4">
                <select
                  value={txType}
                  onChange={(e) => {
                    setTxType(e.target.value);
                    setTxPage(1);
                  }}
                  className="px-3 py-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-sm text-white"
                >
                  <option value="">All Types</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                  <option value="trade_open">Trade Open</option>
                  <option value="trade_close">Trade Close</option>
                  <option value="fee">Fees</option>
                </select>
              </div>

              {transactions.length === 0 ? (
                <div className="text-center py-16 text-gray-600">
                  No transactions yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase border-b border-[#1f1f1f]">
                        <th className="py-3 text-left">Date</th>
                        <th className="py-3 text-center">Type</th>
                        <th className="py-3 text-right">Amount</th>
                        <th className="py-3 text-right">Balance Before</th>
                        <th className="py-3 text-right">Balance After</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr
                          key={tx._id}
                          className="border-b border-[#1f1f1f]/50 hover:bg-[#1a1a1a]/50"
                        >
                          <td className="py-3 text-gray-400 text-xs">
                            {new Date(tx.createdAt).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${txTypeBadge(tx.type)}`}
                            >
                              {tx.type?.replace("_", " ")}
                            </span>
                          </td>
                          <td
                            className={`py-3 text-right font-mono font-semibold ${
                              tx.amount >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {tx.amount >= 0 ? "+" : ""}${fmt(Math.abs(tx.amount))}
                          </td>
                          <td className="py-3 text-right font-mono text-gray-500">
                            ${fmt(tx.balance_before)}
                          </td>
                          <td className="py-3 text-right font-mono text-gray-300">
                            ${fmt(tx.balance_after)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {txData?.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-[#1f1f1f]">
                      <button
                        onClick={() => setTxPage((p) => Math.max(1, p - 1))}
                        disabled={txPage <= 1}
                        className="px-3 py-1 text-xs border border-[#2a2a2a] rounded text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        Prev
                      </button>
                      <span className="px-3 py-1 text-xs text-gray-500">
                        {txPage} / {txData.totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setTxPage((p) => Math.min(txData.totalPages, p + 1))
                        }
                        disabled={txPage >= txData.totalPages}
                        className="px-3 py-1 text-xs border border-[#2a2a2a] rounded text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
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

export default TradingDashboard;
