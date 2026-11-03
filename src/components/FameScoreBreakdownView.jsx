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
 * Shows the talent's OWN real stats (their data — fully fine to show), but
 * deliberately does NOT show the underlying qualification thresholds
 * themselves. The exact formula (follower/engagement/platform-count
 * minimums, growth-tiering percentages, single-platform alternative bar)
 * used to be fetched live from GET /api/famescore/thresholds and displayed
 * as direct "have X / need Y" comparisons — removed per product decision:
 * the qualification bar is the "secret sauce" and shouldn't be
 * reverse-engineerable from the product itself. Content-only: no modal
 * shell of its own, meant to be dropped into an existing popup/page.
 */
export default function FameScoreBreakdownView({ talent, onBack }) {
  const breakdown = Array.isArray(talent?.fame_score_breakdown) ? talent.fame_score_breakdown : [];
  const qualified = !!talent?.qualified;

  return (
    <div className="space-y-5 text-left">
      <div className={`rounded-lg p-3 text-sm font-medium ${qualified ? "bg-emerald-500/10 text-emerald-400" : "bg-[#2a2a2a] text-gray-300"}`}>
        {qualified
          ? "You meet our qualification standards for becoming a tradeable Branded Talent Share."
          : "You haven't yet met our qualification standards. Keep growing your real audience and engagement — consistent growth across multiple platforms is what we look for."}
      </div>

      {/* Per-platform breakdown — the talent's own real data */}
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
                  <div className={p.growthQualifies ? "text-emerald-400" : "text-gray-500"}>
                    {p.growthRate == null ? "No growth history yet" : (p.growthQualifies ? "Growing ↑" : "Declining")}
                  </div>
                  {p.verified && <div className="text-[#F3BA18]">Verified</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-gray-500 text-xs px-1">
        We look at your real reach, engagement, and growth trend across the platforms you've connected. We re-check periodically, so building real momentum over time matters more than any single snapshot.
      </p>

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
