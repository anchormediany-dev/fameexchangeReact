import { useGetFameScoreThresholdsQuery } from "../app/tradingApi";

const PLATFORM_LABELS = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "X / Twitter",
  snapchat: "Snapchat",
  twitch: "Twitch",
  spotify: "Spotify",
};

const pct = (v) => `${(Number(v || 0) * 100).toFixed(1)}%`;
const num = (v) => Number(v || 0).toLocaleString();

/**
 * Shows exactly what qualification actually requires — the talent's real
 * per-platform breakdown (already returned by the API on talent.fame_score_
 * breakdown) plus the live threshold constants from the backend (never
 * hardcoded client-side, since they'd drift the moment either changes).
 * Content-only: no modal shell of its own, meant to be dropped into an
 * existing popup/page as a "step".
 */
export default function FameScoreBreakdownView({ talent, onBack }) {
  const { data, isLoading } = useGetFameScoreThresholdsQuery();
  const thresholds = data?.thresholds;
  const singlePlatform = data?.singlePlatformThresholds;

  const breakdown = Array.isArray(talent?.fame_score_breakdown) ? talent.fame_score_breakdown : [];
  const platformCount = breakdown.length;
  const totalFollowers = breakdown.reduce((sum, p) => sum + (Number(p.followers) || 0), 0);
  const avgEngagementRate = totalFollowers > 0
    ? breakdown.reduce((sum, p) => sum + (Number(p.engagementRate) || 0) * (Number(p.followers) || 0), 0) / totalFollowers
    : 0;
  const hasGrowth = breakdown.some((p) => (Number(p.growthRate) || 0) > 0);

  return (
    <div className="space-y-5 text-left">
      <p className="text-gray-400 text-sm">
        Qualification checks two independent paths — meet all the standard thresholds across your platforms, or clear the higher bar on a single platform alone.
      </p>

      {/* Per-platform breakdown */}
      {breakdown.length > 0 && (
        <div className="space-y-2">
          <div className="text-gray-400 text-xs uppercase tracking-wider">Your Platforms</div>
          <div className="space-y-2">
            {breakdown.map((p) => (
              <div key={p.platform} className="bg-[#2a2a2a] rounded-lg p-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-white text-sm font-medium">{PLATFORM_LABELS[p.platform] || p.platform}</div>
                  <div className="text-gray-500 text-xs">
                    {num(p.followers)} followers · {pct(p.engagementRate)} engagement
                    {p.engagementRateSource === "platform_default_estimate" && " (estimated)"}
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className={(p.growthRate ?? 0) > 0 ? "text-emerald-400" : "text-gray-500"}>
                    {p.growthRate == null ? "No growth history yet" : (p.growthRate > 0 ? "Growing ↑" : "Not growing")}
                  </div>
                  {p.verified && <div className="text-[#F3BA18]">Verified</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Standard multi-platform path */}
      <div className="space-y-2">
        <div className="text-gray-400 text-xs uppercase tracking-wider">Standard Path (2+ Platforms)</div>
        {isLoading || !thresholds ? (
          <p className="text-gray-500 text-xs">Loading current thresholds…</p>
        ) : (
          <div className="bg-[#2a2a2a] rounded-lg p-3 space-y-2 text-sm">
            <ThresholdRow label="Total followers" have={num(totalFollowers)} need={`${num(thresholds.minTotalFollowers)}+`} met={totalFollowers >= thresholds.minTotalFollowers} />
            <ThresholdRow label="Avg. engagement rate" have={pct(avgEngagementRate)} need={`${pct(thresholds.minEngagementRate)}+`} met={avgEngagementRate >= thresholds.minEngagementRate} />
            <ThresholdRow label="Platforms connected" have={platformCount} need={`${thresholds.minPlatforms}+`} met={platformCount >= thresholds.minPlatforms} />
            <ThresholdRow label="Growth trend" have={hasGrowth ? "Growing" : "Not yet"} need={thresholds.requireGrowthTrend ? "Required" : "Not required"} met={!thresholds.requireGrowthTrend || hasGrowth} />
          </div>
        )}
      </div>

      {/* Single-platform alternative path */}
      <div className="space-y-2">
        <div className="text-gray-400 text-xs uppercase tracking-wider">Or: Single-Platform Path</div>
        {isLoading || !singlePlatform ? (
          <p className="text-gray-500 text-xs">Loading current thresholds…</p>
        ) : (
          <p className="text-gray-400 text-xs bg-[#2a2a2a] rounded-lg p-3">
            One platform alone clearing <span className="text-white font-semibold">{num(singlePlatform.minFollowers)}+ followers</span> and{" "}
            <span className="text-white font-semibold">{pct(singlePlatform.minEngagementRate)}+ engagement</span> (plus growth trend) qualifies on its own — no need for a second platform.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="w-full py-3 rounded-lg border border-[#444] text-gray-300 text-sm hover:border-gray-300 hover:text-white transition"
      >
        ← Back
      </button>
    </div>
  );
}

function ThresholdRow({ label, have, need, met }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <span className={met ? "text-emerald-400" : "text-gray-300"}>
        {have} <span className="text-gray-500">/ {need}</span> {met && "✓"}
      </span>
    </div>
  );
}
