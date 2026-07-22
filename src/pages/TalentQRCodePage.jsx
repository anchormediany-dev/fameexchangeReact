import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MotionPageWrapper from "../components/MotionPageWrapper";
import ProfileQRCode from "../components/ProfileQRCode";
import { useApplyToBeTalentMutation } from "../app/tradingApi";

// Reuses the idempotent apply-to-be-talent endpoint purely as a read: calling
// it again for an existing application just returns the same talent record
// (see talentApplicationService.applyToBeTalent's alreadyApplied branch) —
// no new backend endpoint needed just to look up "my own talent id".
export default function TalentQRCodePage() {
  const navigate = useNavigate();
  const [applyToBeTalent, { isLoading }] = useApplyToBeTalentMutation();
  const [talent, setTalent] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    applyToBeTalent()
      .unwrap()
      .then((res) => setTalent(res.talent))
      .catch((err) => {
        setErrorMsg(err?.data?.message || "Couldn't load your profile.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen py-16 px-4">
        <div className="container max-w-lg mx-auto">
          <h1 className="text-white text-2xl font-bold mb-6 text-center">
            Share Your Profile
          </h1>

          {isLoading && (
            <p className="text-gray-400 text-center">Loading…</p>
          )}

          {errorMsg && (
            <p className="text-red-400 text-center">{errorMsg}</p>
          )}

          {talent && talent.tier === "tradeable" && (
            <ProfileQRCode talentId={talent._id} />
          )}

          {talent && talent.tier !== "tradeable" && (
            <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-8 text-center space-y-3">
              <p className="text-white">
                Your profile isn't live for trading yet, so there's nothing to
                share publicly just yet.
              </p>
              <p className="text-gray-400 text-sm">
                Once you're tradeable, your QR code and shareable link will
                appear here automatically.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 text-white/50 text-sm hover:text-white/70 transition block mx-auto"
          >
            ← Back
          </button>
        </div>
      </div>
    </MotionPageWrapper>
  );
}
