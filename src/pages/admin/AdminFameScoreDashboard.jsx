import { useMemo, useState } from "react";
import { useGetFameScoreDashboardQuery } from "../../app/fameScoreAdminApi";

const money = (v) => `$${Number(v || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className="text-white text-2xl font-bold">{value}</div>
      {sub && <div className="text-gray-500 text-xs mt-1">{sub}</div>}
    </div>
  );
}

const COLUMNS = [
  { key: "name", label: "Talent" },
  { key: "fame_score", label: "FameScore" },
  { key: "qualified", label: "Qualified" },
  { key: "platform_count", label: "Platforms" },
  { key: "tier", label: "Tier" },
  { key: "total_revenue", label: "Revenue" },
];

export default function AdminFameScoreDashboard() {
  const { data, isLoading, isError, error, refetch } = useGetFameScoreDashboardQuery();
  const [sortKey, setSortKey] = useState("fame_score");
  const [sortDir, setSortDir] = useState("desc");

  const sortedTalents = useMemo(() => {
    const list = data?.talents ? [...data.talents] : [];
    list.sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (typeof av === "boolean") { av = av ? 1 : 0; bv = bv ? 1 : 0; }
      if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      av = Number(av) || 0;
      bv = Number(bv) || 0;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return list;
  }, [data, sortKey, sortDir]);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const summary = data?.summary;
  const revenue = summary?.revenue;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">FameScore Dashboard</h1>
        <button
          onClick={() => refetch()}
          className="text-sm text-gray-300 hover:text-white border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/5 transition"
        >
          Refresh
        </button>
      </div>

      <p className="text-gray-500 text-xs">
        Read-only reporting — qualification thresholds and fee percentages are code constants (see famescoreConfig.js / feeConfig.js), not editable here.
      </p>

      {isError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-4 text-sm">
          {error?.data?.message || "Failed to load the dashboard."}
        </div>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Evaluated" value={isLoading ? "…" : summary?.total_evaluated ?? 0} />
        <StatCard
          label="Qualified (Tradeable)"
          value={isLoading ? "…" : summary?.qualified_count ?? 0}
          sub={!isLoading && summary ? `${summary.routed_to_futures_count} routed to FameFutures` : undefined}
        />
        <StatCard label="Avg FameScore" value={isLoading ? "…" : `${summary?.avg_score ?? 0} / 100`} />
        <StatCard
          label="Total Revenue"
          value={isLoading ? "…" : money(revenue?.totalRevenue)}
          sub={!isLoading && revenue ? `${revenue.eventCount} events` : undefined}
        />
      </div>

      {!isLoading && revenue && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Listing Fees" value={money(revenue.listingFees)} />
          <StatCard label="Transaction Fees" value={money(revenue.transactionFees)} />
          <StatCard label="Market-Making Spread" value={money(revenue.marketMakingSpreads)} />
        </div>
      )}

      {/* Talent table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="text-left p-3 text-gray-300 font-semibold text-sm cursor-pointer select-none hover:text-white transition whitespace-nowrap"
                >
                  {col.label}
                  {sortKey === col.key && (sortDir === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              [...Array(5)].map((_, i) => (
                <tr key={`skel-${i}`} className="border-b border-white/5">
                  {COLUMNS.map((__, j) => (
                    <td key={j} className="p-3">
                      <div className="h-4 w-full max-w-[140px] bg-white/10 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}

            {!isLoading && sortedTalents.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="p-6 text-center text-gray-500 text-sm">
                  No talents have been evaluated yet.
                </td>
              </tr>
            )}

            {!isLoading &&
              sortedTalents.map((t) => (
                <tr key={t._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">${t.symbol}</div>
                  </td>
                  <td className="p-3 text-white font-mono text-sm">{(t.fame_score ?? 0).toFixed(1)} / 100</td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        t.qualified
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-gray-500/15 text-gray-400"
                      }`}
                      title={t.qualification_reason || undefined}
                    >
                      {t.qualified ? "Qualified" : "Not Qualified"}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300 text-sm">{t.platform_count}</td>
                  <td className="p-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 capitalize">
                      {t.tier}
                    </span>
                  </td>
                  <td className="p-3 text-white font-mono text-sm">{money(t.total_revenue)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
