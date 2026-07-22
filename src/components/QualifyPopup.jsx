import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import { useQuickQualifyMutation } from "../app/authApi";
import { setCredentials } from "../features/auth/authSlice";
import FameScoreCalculatingModal from "./FameScoreCalculatingModal";
import FameScoreBreakdownView from "./FameScoreBreakdownView";

// Scraping happens server-side during this call, but we still floor the
// animation so it never just flashes on a fast/cached response.
const MIN_CALCULATING_MS = 2200;

const SOCIAL_FIELDS = [
  { key: "youtube", label: "YouTube" },
  { key: "twitter", label: "X / Twitter" },
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "tiktok", label: "TikTok" },
  { key: "snapchat", label: "Snapchat" },
];

const EMPTY_SOCIALS = { youtube: "", twitter: "", instagram: "", facebook: "", tiktok: "", snapchat: "" };

export default function QualifyPopup({ open, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quickQualify] = useQuickQualifyMutation();

  const [step, setStep] = useState("contact"); // 'contact' | 'socials' | 'result' | 'breakdown'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [socials, setSocials] = useState(EMPTY_SOCIALS);
  const [errorMsg, setErrorMsg] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const reset = () => {
    setStep("contact");
    setName("");
    setEmail("");
    setSocials(EMPTY_SOCIALS);
    setErrorMsg("");
    setResult(null);
  };

  const handleClose = () => {
    if (calculating) return; // don't dismiss mid-request
    reset();
    onClose();
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setErrorMsg("Please enter your name."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setErrorMsg("");
    setStep("socials");
  };

  const handleSocialsSubmit = async (e) => {
    e.preventDefault();
    const hasAtLeastOne = Object.values(socials).some((v) => v.trim());
    if (!hasAtLeastOne) {
      setErrorMsg("Add at least one social profile link.");
      return;
    }
    setErrorMsg("");
    setCalculating(true);
    const startedAt = Date.now();
    const waitForMinimum = async () => {
      const remaining = MIN_CALCULATING_MS - (Date.now() - startedAt);
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
    };

    try {
      const response = await quickQualify({ name, email, socials }).unwrap();
      await waitForMinimum();
      const decodedUser = jwtDecode(response.token);
      dispatch(setCredentials({ accessToken: response.token, user: decodedUser }));
      setResult(response);
      setStep("result");
    } catch (err) {
      await waitForMinimum();
      setErrorMsg(err?.data?.message || "Couldn't calculate your FameScore right now. Please try again.");
      toast.error(err?.data?.message || "Something went wrong — please try again.");
    } finally {
      setCalculating(false);
    }
  };

  const filledPlatformCount = Object.values(socials).filter((v) => v.trim()).length;

  const goToFutures = () => {
    reset();
    onClose();
    navigate("/futures");
  };

  const goToDashboard = () => {
    reset();
    onClose();
    navigate("/");
  };

  const goToKycVerification = () => {
    reset();
    onClose();
    navigate("/verify-id");
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
        <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl w-full max-w-md p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">
              {step === "result" ? "Your Results" : step === "breakdown" ? "Qualification Details" : "See If You Qualify"}
            </h2>
            <button
              onClick={handleClose}
              disabled={calculating}
              title={calculating ? "Please wait, calculating…" : undefined}
              className="text-gray-500 hover:text-white transition p-1 disabled:opacity-30 disabled:hover:text-gray-500"
            >
              <FiX size={20} />
            </button>
          </div>

          {step === "contact" && (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <p className="text-gray-400 text-sm">
                Find out your FameScore and whether you qualify to be a tradeable Branded Talent Share.
              </p>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F3BA18] transition"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F3BA18] transition"
                />
              </div>
              {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
              <button
                type="submit"
                className="w-full custom-button-two py-3 rounded-lg font-semibold text-sm"
              >
                Continue →
              </button>
            </form>
          )}

          {step === "socials" && (
            <form onSubmit={handleSocialsSubmit} className="space-y-4">
              <p className="text-gray-400 text-sm">
                Add your social profile links — the more platforms, the more accurate your FameScore.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_FIELDS.map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-gray-400 text-xs block mb-1">{label}</label>
                    <input
                      type="url"
                      value={socials[key]}
                      onChange={(e) => setSocials((s) => ({ ...s, [key]: e.target.value }))}
                      placeholder={`${label} URL`}
                      className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F3BA18] transition"
                    />
                  </div>
                ))}
              </div>
              {filledPlatformCount === 1 && (
                <p className="text-[#F3BA18] text-xs bg-[#F3BA18]/10 border border-[#F3BA18]/30 rounded-lg px-3 py-2">
                  Tip: connecting a second platform strengthens your FameScore and unlocks the standard qualification path — a single platform needs a much higher bar to qualify on its own.
                </p>
              )}
              {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("contact")}
                  disabled={calculating}
                  className="flex-1 py-3 rounded-lg border border-[#444] text-gray-400 text-sm hover:border-gray-300 hover:text-white transition disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={calculating}
                  className="flex-1 custom-button-two py-3 rounded-lg font-semibold text-sm disabled:opacity-50"
                >
                  See My FameScore →
                </button>
              </div>
            </form>
          )}

          {step === "result" && result && result.tier === "tradeable" && (
            <div className="text-center space-y-5">
              <div className="text-4xl">🎉</div>
              <h3 className="text-white text-xl font-bold">You're Tradeable!</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{result.message}</p>
              <p className="text-gray-500 text-xs">
                We've created your account with {email} — check your inbox for a code to set your password.
              </p>
              {filledPlatformCount === 1 && (
                <p className="text-[#F3BA18] text-xs bg-[#F3BA18]/10 border border-[#F3BA18]/30 rounded-lg px-3 py-2 text-left">
                  You qualified on a single platform — connect a second from your profile for the full benefits of the standard multi-platform path.
                </p>
              )}
              <div className="flex flex-col gap-3">
                <a
                  href={result.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-button-two px-6 py-3 rounded-lg font-semibold text-sm"
                >
                  View your Talent profile →
                </a>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    onClose();
                    navigate("/talent/qr-code");
                  }}
                  className="px-6 py-3 rounded-lg font-semibold text-sm border border-[#444] text-white hover:border-[#F3BA18] hover:text-[#F3BA18] transition"
                >
                  Share Your Profile
                </button>
                <button
                  type="button"
                  onClick={goToDashboard}
                  className="text-white/50 text-sm hover:text-white/70 transition"
                >
                  Continue to dashboard
                </button>
              </div>
            </div>
          )}

          {step === "result" && result && result.tier !== "tradeable" && result.talent?.qualified_pending_kyc && (
            <div className="text-center space-y-5">
              <h3 className="text-white text-xl font-bold">You Qualified! Just One More Step</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your FameScore is {Number(result.fame_score ?? 0).toFixed(1)} — that qualifies you to go tradeable.
                Complete identity verification (KYC) to unlock your shares. Once approved, your shares go live automatically.
              </p>
              <p className="text-gray-500 text-xs">
                We've created your account with {email} — check your inbox for a code to set your password.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={goToKycVerification}
                  className="custom-button-two px-6 py-3 rounded-lg font-semibold text-sm"
                >
                  Complete Identity Verification →
                </button>
                <button
                  type="button"
                  onClick={goToDashboard}
                  className="text-white/50 text-sm hover:text-white/70 transition"
                >
                  Continue to dashboard
                </button>
              </div>
            </div>
          )}

          {step === "result" && result && result.tier !== "tradeable" && !result.talent?.qualified_pending_kyc && (
            <div className="text-center space-y-5">
              <h3 className="text-white text-xl font-bold">You're Not Tradeable Yet — But You're Close</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your FameScore is {Number(result.fame_score ?? 0).toFixed(1)}. {result.talent?.qualification_reason}{" "}
                On FameFutures, early supporters can back you right now while you grow — and when you hit the threshold, you automatically move to TFE.
              </p>
              <p className="text-gray-500 text-xs">
                We've created your account with {email} — check your inbox for a code to set your password.
              </p>
              {filledPlatformCount === 1 && (
                <p className="text-[#F3BA18] text-xs bg-[#F3BA18]/10 border border-[#F3BA18]/30 rounded-lg px-3 py-2 text-left">
                  You're currently scored on just one platform. Connecting a second platform typically opens an easier path to qualifying — you can add one anytime from your profile.
                </p>
              )}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={goToFutures}
                  className="custom-button-two px-6 py-3 rounded-lg font-semibold text-sm"
                >
                  Start Building on FameFutures →
                </button>
                <button
                  type="button"
                  onClick={() => setStep("breakdown")}
                  className="px-6 py-3 rounded-lg font-semibold text-sm border border-[#444] text-white hover:border-[#F3BA18] hover:text-[#F3BA18] transition"
                >
                  See What It Takes to Qualify
                </button>
                <button
                  type="button"
                  onClick={goToDashboard}
                  className="text-white/50 text-sm hover:text-white/70 transition"
                >
                  Continue to dashboard
                </button>
              </div>
            </div>
          )}

          {step === "breakdown" && result && (
            <FameScoreBreakdownView talent={result.talent} onBack={() => setStep("result")} />
          )}
        </div>
      </div>

      <FameScoreCalculatingModal open={calculating} />
    </>
  );
}
