import { useState } from "react";
import { useGetFuturesTalentsQuery } from "../../app/tradingApi";
import { useSelector } from "react-redux";
import PledgeModal from "./PledgeModal";
import { FiStar, FiClock, FiTrendingUp, FiUsers, FiExternalLink } from "react-icons/fi";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { openExternal } from "../../utils/nativeLinks";

// FameScore is 0-100. Note there's no single "score >= X means qualified"
// number anymore — qualification is a multi-factor gate (total followers,
// engagement rate, platform count, growth trend), so a high score here
// doesn't by itself guarantee this talent would qualify. This bar is just
// an honest 0-100 strength indicator, not a qualification progress bar.
function ScoreBar({ score }) {
  const pct = Math.min(100, Math.max(0, score || 0));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>FameScore</span>
        <span className="text-[#F3BA18]">{(score || 0).toFixed(0)} / 100</span>
      </div>
      <div className="h-1.5 bg-[#333] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#a38b41] to-[#F3BA18] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function TalentCard({ talent, onPledge, isLoggedIn }) {
  const img = talent.image;

  return (
    <div className="group bg-gradient-to-b from-[#1f1f1f] to-[#161616] border border-white/8 hover:border-[#F3BA18]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F3BA18]/10 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[#0a0a0a] overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={talent.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-[#F3BA18]/30 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a]">
            {talent.name?.[0]?.toUpperCase() || "?"}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Days remaining badge */}
        {talent.days_remaining !== null && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur border border-white/10 rounded-full px-2.5 py-1 text-xs text-gray-300">
            <FiClock className="w-3 h-3" />
            {talent.days_remaining > 0 ? `${talent.days_remaining}d left` : "Closing"}
          </div>
        )}

        {/* Future badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#F3BA18]/15 backdrop-blur border border-[#F3BA18]/30 rounded-full px-2.5 py-1 text-xs text-[#F3BA18] font-semibold uppercase tracking-wider">
          <FiStar className="w-3 h-3" />
          Future
        </div>

        {/* Name pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-bold text-lg leading-tight truncate">{talent.name}</p>
          <p className="text-[#F3BA18] text-xs uppercase tracking-wider mt-0.5">${talent.symbol}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-4 flex-1">
        <ScoreBar score={talent.fame_score} />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#2a2a2a] rounded-lg p-3">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Total Pledged</p>
            <p className="text-white font-bold text-sm">
              ${(talent.total_pledged || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="bg-[#2a2a2a] rounded-lg p-3">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Proj. Price</p>
            <p className="text-white font-bold text-sm">
              ${(talent.projected_price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Bonus callout */}
        <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-700/20 rounded-lg px-3 py-2">
          <FiTrendingUp className="text-emerald-400 flex-shrink-0 w-3.5 h-3.5" />
          <p className="text-emerald-300 text-xs">+15% bonus shares on graduation</p>
        </div>

        {/* CTA */}
        <button
          onClick={() => isLoggedIn ? onPledge(talent) : (window.location.href = "/login")}
          className="mt-auto w-full custom-button-two py-2.5 rounded-xl font-semibold text-sm"
        >
          {isLoggedIn ? "Pledge Support →" : "Sign in to Pledge →"}
        </button>
      </div>
    </div>
  );
}

// "What is the Futures Section?" explainer box — lives once in the hero
// (always visible regardless of how many futures talents exist), linking
// out to famefutures.com rather than the in-app qualify flow.
function FameFuturesCTA({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-[#1f1f1f] to-[#191919] border border-[#F3BA18]/20 rounded-2xl p-6 ${className}`}>
      <h3 className="text-white font-bold text-base mb-1.5">What is the Futures Section?</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        The Futures Section gives creators the AI tools, strategy, and ecosystem needed to
        grow their brand, audience, revenue, and market value — preparing them for the Fame
        Exchange.
      </p>
      <a
        href="https://famefutures.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          openExternal("https://famefutures.com");
        }}
        className="block w-full sm:w-auto sm:inline-block text-center bg-[#F3BA18] text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#dbb934] transition-colors"
      >
        Start Building Your Asset!
      </a>
    </div>
  );
}

// Companion box, same style, sitting directly underneath the explainer —
// links out to the membership-sponsorship page on famefutures.com.
function SponsorMembershipCTA({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-[#1f1f1f] to-[#191919] border border-[#F3BA18]/20 rounded-2xl p-6 ${className}`}>
      <h3 className="text-white font-bold text-base mb-1.5">
        Would you like to sponsor a future's membership?
      </h3>
      <a
        href="https://famefutures.com/membership"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          openExternal("https://famefutures.com/membership");
        }}
        className="mt-3 block w-full sm:w-auto sm:inline-block text-center bg-[#F3BA18] text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#dbb934] transition-colors"
      >
        Click Here!
      </a>
    </div>
  );
}

export default function FuturesPage() {
  const { data, isLoading, isError, refetch } = useGetFuturesTalentsQuery();
  const user = useSelector((s) => s?.auth?.user);
  const [activeTalent, setActiveTalent] = useState(null);

  const talents = data?.talents || [];

  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen text-white">
        {/* ── Hero ────────────────────────────────────────────── */}
        <div className="bg-gradient-to-b from-[#1a1500] to-[#171717] border-b border-[#F3BA18]/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#F3BA18] text-xs uppercase tracking-widest font-semibold">
                  Fame Exchange
                </span>
                <span className="text-gray-600 text-xs">×</span>
                <a
                  href="https://famefutures.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openExternal("https://famefutures.com");
                  }}
                  className="text-[#F3BA18] text-xs uppercase tracking-widest font-semibold flex items-center gap-1 hover:underline"
                >
                  famefutures.com <FiExternalLink className="w-3 h-3" />
                </a>
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Invest in Tomorrow's{" "}
                <span className="text-[#F3BA18]">Biggest Names</span>
              </h1>
              <p className="text-gray-400 mt-4 text-base leading-relaxed max-w-xl">
                Futures are rising talents not yet tradeable on the main exchange. Pledge your support now
                and earn <span className="text-emerald-400 font-semibold">15% bonus shares</span> when
                they graduate to the market — rewarding early believers.
              </p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <FiStar className="text-[#F3BA18]" />
                  <span>Curated rising talent</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FiTrendingUp className="text-emerald-400" />
                  <span>15% bonus on graduation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FiClock className="text-blue-400" />
                  <span>90-day refund guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FiUsers className="text-purple-400" />
                  <span>Community-backed</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <FameFuturesCTA />
              <SponsorMembershipCTA />
            </div>
            </div>
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-[#1f1f1f] rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-[#2a2a2a]" />
                  <div className="p-4 space-y-3">
                    <div className="h-2 bg-[#2a2a2a] rounded w-3/4" />
                    <div className="h-2 bg-[#2a2a2a] rounded w-1/2" />
                    <div className="h-8 bg-[#2a2a2a] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-24 space-y-4">
              <p className="text-red-400 text-sm">Failed to load futures talents.</p>
              <button onClick={refetch} className="custom-button-two px-6 py-2 rounded-lg text-sm font-semibold">
                Try Again
              </button>
            </div>
          ) : talents.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="text-5xl">🌟</div>
              <h2 className="text-white text-xl font-bold">No Futures Yet</h2>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                Talented creators are being evaluated. Check back soon — the next big name is just around the corner.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-white text-xl font-bold">
                  {talents.length} Rising {talents.length === 1 ? "Talent" : "Talents"}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">Sorted by FameScore — highest potential first</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {talents.map((t) => (
                  <TalentCard
                    key={t._id}
                    talent={t}
                    onPledge={setActiveTalent}
                    isLoggedIn={!!user}
                  />
                ))}
              </div>
            </>
          )}

          {/* How it works */}
          <div className="mt-16 bg-gradient-to-br from-[#1f1f1f] to-[#191919] border border-[#333] rounded-2xl p-8">
            <h3 className="text-white font-bold text-lg mb-6 text-center">How Fame Futures Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: "💰",
                  title: "1. Pledge Support",
                  desc: "Choose a rising talent and pledge any amount from $5. Your pledge is charged immediately and secured by Stripe.",
                },
                {
                  icon: "📈",
                  title: "2. They Grow",
                  desc: "As the talent builds their social presence and FameScore rises toward 400, they move closer to graduation.",
                },
                {
                  icon: "🎉",
                  title: "3. Earn Bonus Shares",
                  desc: "On graduation, you receive shares at the graduation price plus a 15% bonus for believing early. Refunds available within 90 days.",
                },
              ].map((step) => (
                <div key={step.title} className="space-y-3">
                  <div className="text-3xl">{step.icon}</div>
                  <h4 className="text-white font-semibold text-sm">{step.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pledge modal */}
      {activeTalent && (
        <PledgeModal
          talent={activeTalent}
          onClose={() => setActiveTalent(null)}
        />
      )}
    </MotionPageWrapper>
  );
}
