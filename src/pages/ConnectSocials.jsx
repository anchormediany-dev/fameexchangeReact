import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MotionPageWrapper from "../components/MotionPageWrapper";
import SocialConnectionsPanel from "../components/SocialConnectionsPanel";
import FameScoreCalculatingModal from "../components/FameScoreCalculatingModal";
import FameScoreBreakdownView from "../components/FameScoreBreakdownView";
import siteLogo from "../assets/images/site-logo.png";
import { Link } from "react-router-dom";
import { useApplyToBeTalentMutation } from "../app/tradingApi";
import { openExternal } from "../utils/nativeLinks";

// The apply endpoint itself is fast (no live scraping happens at apply-time),
// so we hold the calculating animation open for at least this long —
// otherwise it just flashes and undersells what's happening.
const MIN_CALCULATING_MS = 2800;

export default function ConnectSocials() {
  const navigate = useNavigate();
  const user = useSelector((s) => s?.auth?.user);
  const [applyToBeTalent] = useApplyToBeTalentMutation();
  const [calculating, setCalculating] = useState(false);
  const [applicationResult, setApplicationResult] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const goNext = () => {
    if (user?.role === "TALENT") navigate("/networth-calculator");
    else navigate("/");
  };

  const handleContinue = async () => {
    if (user?.role !== "TALENT") {
      goNext();
      return;
    }

    setCalculating(true);
    const startedAt = Date.now();
    const waitForMinimum = async () => {
      const remaining = MIN_CALCULATING_MS - (Date.now() - startedAt);
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
    };

    try {
      const result = await applyToBeTalent().unwrap();
      await waitForMinimum();
      setApplicationResult(result);
    } catch (e) {
      await waitForMinimum();
      toast.error(e?.data?.message || "Couldn't calculate your network's net worth right now.");
      goNext();
    } finally {
      setCalculating(false);
    }
  };

  return (
    <MotionPageWrapper>
      <div className="flex mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 relative bg-[#171717] min-h-screen">
        <div className="w-full container flex flex-col-reverse lg:flex-row gap-8 z-10">
          {/* Left: panel */}
          <div className="lg:w-[70%]">
            {/* Step header */}
            <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] border border-[#333] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[#F3BA18] text-xs uppercase tracking-widest font-semibold">
                  Step 4 of 4 — Optional
                </span>
              </div>
              <h2 className="text-white text-2xl font-bold">
                Connect Your Social Accounts
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Log in to each platform to prove ownership and pull your real
                follower count. Your&nbsp;
                <span className="text-[#F3BA18] font-medium">social worth</span>
                &nbsp;= total followers across connected platforms — used for
                talent trading. You can skip this now and connect later from
                your profile.
              </p>
            </div>

            <SocialConnectionsPanel returnTo="connect-socials" />

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={goNext}
                className="text-white/50 text-sm hover:text-white/70 transition"
              >
                Skip for now
              </button>
              <button
                type="button"
                onClick={handleContinue}
                disabled={calculating}
                className="custom-button-two px-10 py-3 rounded-lg font-semibold text-sm disabled:opacity-50"
              >
                {calculating ? "Calculating…" : "What's Your Network's Net Worth? →"}
              </button>
            </div>
          </div>

          {/* Right: branding */}
          <div className="lg:w-[30%] flex lg:flex-col flex-row items-center lg:items-start text-white space-y-6 pt-6">
            <Link className="w-full lg:block hidden" to="/">
              <img src={siteLogo} alt="Logo" />
            </Link>
            <div className="flex flex-col">
              <h1 className="mt-5">
                <span className="custom-heading-seven ml-5">WELCOME TO</span>
                <span className="text-xl ml-5"> THE FAME EXCHANGE</span>
              </h1>
              <p className="text-white/80 text-xs ml-5 mt-1">
                Verify your social presence and set your worth before you start
                trading.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FameScoreCalculatingModal open={calculating} />

      {applicationResult && applicationResult.tier === "tradeable" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-8 max-w-md w-full text-center space-y-5">
            <div className="text-4xl">🎉</div>
            <h3 className="text-white text-xl font-bold">You're Tradeable!</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{applicationResult.message}</p>
            <div className="flex flex-col gap-3">
              <a
                href={applicationResult.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openExternal(applicationResult.redirect_url);
                }}
                className="custom-button-two px-6 py-3 rounded-lg font-semibold text-sm"
              >
                Click here to view your Talent profile →
              </a>
              <button
                type="button"
                onClick={() => navigate("/talent/qr-code")}
                className="px-6 py-3 rounded-lg font-semibold text-sm border border-[#444] text-white hover:border-[#F3BA18] hover:text-[#F3BA18] transition"
              >
                Share Your Profile
              </button>
              <button
                type="button"
                onClick={goNext}
                className="text-white/50 text-sm hover:text-white/70 transition"
              >
                Continue to dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {applicationResult && applicationResult.tier !== "tradeable" && applicationResult.talent?.qualified_pending_kyc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-8 max-w-md w-full text-center space-y-5">
            <h3 className="text-white text-xl font-bold">You Qualified! Just One More Step</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your FameScore is {Number(applicationResult.fame_score ?? 0).toFixed(1)} — that qualifies you to go tradeable.
              Complete identity verification (KYC) to unlock your shares. Once approved, your shares go live automatically.
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => navigate("/verify-id")}
                className="custom-button-two px-6 py-3 rounded-lg font-semibold text-sm"
              >
                Complete Identity Verification →
              </button>
              <button
                type="button"
                onClick={goNext}
                className="text-white/50 text-sm hover:text-white/70 transition"
              >
                Continue to dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {applicationResult && applicationResult.tier !== "tradeable" && !applicationResult.talent?.qualified_pending_kyc && !showBreakdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-8 max-w-md w-full text-center space-y-5">
            <h3 className="text-white text-xl font-bold">You're Not Tradeable Yet — But You're Close</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your FameScore is {Number(applicationResult.fame_score ?? 0).toFixed(1)}. {applicationResult.talent?.qualification_reason}{" "}
              On FameFutures, early supporters can back you right now while you grow — and when you hit the threshold, you automatically move to TFE.
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => navigate("/futures")}
                className="custom-button-two px-6 py-3 rounded-lg font-semibold text-sm"
              >
                Start Building on FameFutures →
              </button>
              <button
                type="button"
                onClick={() => setShowBreakdown(true)}
                className="px-6 py-3 rounded-lg font-semibold text-sm border border-[#444] text-white hover:border-[#F3BA18] hover:text-[#F3BA18] transition"
              >
                See What It Takes to Qualify
              </button>
              <button
                type="button"
                onClick={goNext}
                className="text-white/50 text-sm hover:text-white/70 transition"
              >
                Continue to dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {applicationResult && applicationResult.tier !== "tradeable" && showBreakdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-8 max-w-md w-full space-y-5">
            <h3 className="text-white text-xl font-bold text-center">Qualification Details</h3>
            <FameScoreBreakdownView talent={applicationResult.talent} onBack={() => setShowBreakdown(false)} />
          </div>
        </div>
      )}
    </MotionPageWrapper>
  );
}
