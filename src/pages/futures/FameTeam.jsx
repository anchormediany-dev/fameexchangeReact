import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLock, FiMessageCircle, FiCheck } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import AuthGate from "../../components/AuthGate";
import {
  useGetAdvisorsQuery,
  useSelectAdvisorsMutation,
} from "../../app/futuresHubApi";

const MAX_SELECTED = 5;

function AdvisorCard({ advisor, selecting, isSelected, onToggleSelect, canSelect }) {
  const locked = !advisor.unlocked;

  if (selecting) {
    return (
      <button
        type="button"
        onClick={() => onToggleSelect(advisor.key)}
        disabled={!canSelect && !isSelected}
        className={`text-left rounded-2xl p-5 border transition-all ${
          isSelected
            ? "border-[#a38b41] bg-[#a38b41]/10"
            : "border-[#2a2a2a] bg-[#191919] hover:border-[#444]"
        } disabled:opacity-40`}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-white font-bold">{advisor.name}</p>
          {isSelected && <FiCheck className="text-[#a38b41]" />}
        </div>
        <p className="text-[#a38b41] text-xs font-semibold mb-1">{advisor.title}</p>
        <p className="text-gray-500 text-xs">{advisor.role}</p>
      </button>
    );
  }

  const cardBody = (
    <div
      className={`rounded-2xl p-5 border h-full ${
        locked ? "border-[#2a2a2a] bg-[#161616] opacity-60" : "border-[#2a2a2a] bg-[#191919] hover:border-[#a38b41]/40"
      } transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-white font-bold">{advisor.name}</p>
        {locked ? <FiLock className="text-gray-600" size={14} /> : <FiMessageCircle className="text-[#a38b41]" size={14} />}
      </div>
      <p className="text-[#a38b41] text-xs font-semibold mb-1">{advisor.title}</p>
      <p className="text-gray-500 text-xs">{advisor.role}</p>
      {advisor.free && <p className="text-emerald-400 text-[10px] font-semibold uppercase tracking-wide mt-3">Free</p>}
    </div>
  );

  if (locked) return cardBody;
  return <Link to={`/futures/advisor/${advisor.key}`}>{cardBody}</Link>;
}

function FameTeamContent() {
  const { data: advisorsRes, isLoading } = useGetAdvisorsQuery();
  const [selectAdvisors, { isLoading: saving }] = useSelectAdvisorsMutation();
  const [selecting, setSelecting] = useState(false);
  const [draft, setDraft] = useState([]);

  const advisors = advisorsRes?.data || [];
  const plan = advisorsRes?.plan;
  const savedSelected = advisorsRes?.selected_advisors || [];
  const isStarter = plan === "starter";

  useEffect(() => {
    setDraft(savedSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advisorsRes]);

  const toggleSelect = (key) => {
    setDraft((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : prev.length < MAX_SELECTED ? [...prev, key] : prev
    );
  };

  const handleSave = async () => {
    try {
      await selectAdvisors(draft).unwrap();
      toast.success("Fame Team updated!");
      setSelecting(false);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't save selection.");
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-400 py-24">Loading…</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <div>
          <p className="text-[#a38b41] text-xs uppercase tracking-widest font-semibold mb-1">
            Fame Futures
          </p>
          <h1 className="text-3xl font-black text-white">My Fame Team</h1>
          <p className="text-gray-400 mt-1">Your {advisors.length} AI advisors, working around the clock.</p>
        </div>
        {isStarter && !selecting && (
          <button
            type="button"
            onClick={() => setSelecting(true)}
            className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
          >
            {savedSelected.length}/{MAX_SELECTED} bonus advisors chosen — Edit
          </button>
        )}
      </div>

      {selecting && (
        <div className="bg-[#191919] border border-[#a38b41]/30 rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <p className="text-gray-300 text-sm">
            Choose up to {MAX_SELECTED} bonus advisors ({draft.length}/{MAX_SELECTED} selected).
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setSelecting(false);
                setDraft(savedSelected);
              }}
              className="text-gray-400 text-sm px-3 py-2 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {advisors
          .filter((a) => !selecting || !a.free)
          .map((advisor) => (
            <AdvisorCard
              key={advisor.key}
              advisor={advisor}
              selecting={selecting}
              isSelected={draft.includes(advisor.key)}
              canSelect={draft.length < MAX_SELECTED}
              onToggleSelect={toggleSelect}
            />
          ))}
      </div>
    </div>
  );
}

export default function FameTeam() {
  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen text-white">
        <Navbar />
        <div className="pt-32">
          <AuthGate
            title="Sign in to Fame Futures"
            message="Sign in to your Fame Exchange account to see your Fame Team."
          >
            <FameTeamContent />
          </AuthGate>
        </div>
        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
