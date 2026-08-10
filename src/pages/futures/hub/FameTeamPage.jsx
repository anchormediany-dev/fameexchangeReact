import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLock, FiMessageCircle, FiCheck, FiUser } from "react-icons/fi";
import { useGetAdvisorsQuery, useSelectAdvisorsMutation } from "../../../app/futuresHubApi";
import TeamIntroVideo from "./TeamIntroVideo";

const MAX_SELECTED = 5;

function AdvisorAvatar({ advisor, locked, size = 56 }) {
  const [failed, setFailed] = useState(false);
  const showImage = advisor.avatar_url && !failed;

  return (
    <div
      className="rounded-full overflow-hidden shrink-0 bg-[#111111] border border-[#2a2a2a] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <img
          src={advisor.avatar_url}
          alt={advisor.name}
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover ${locked ? "grayscale opacity-50" : ""}`}
        />
      ) : (
        <FiUser className="text-gray-600" size={size * 0.45} />
      )}
    </div>
  );
}

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
        <div className="flex items-center gap-3 mb-2">
          <AdvisorAvatar advisor={advisor} locked={false} size={44} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-white font-bold truncate">{advisor.name}</p>
              {isSelected && <FiCheck className="text-[#a38b41] shrink-0" />}
            </div>
            <p className="text-[#a38b41] text-xs font-semibold">{advisor.title}</p>
          </div>
        </div>
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
      <div className="flex items-center gap-3 mb-2">
        <AdvisorAvatar advisor={advisor} locked={locked} size={56} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-white font-bold truncate">{advisor.name}</p>
            {locked ? <FiLock className="text-gray-600 shrink-0" size={14} /> : <FiMessageCircle className="text-[#a38b41] shrink-0" size={14} />}
          </div>
          <p className="text-[#a38b41] text-xs font-semibold">{advisor.title}</p>
        </div>
      </div>
      <p className="text-gray-500 text-xs">{advisor.role}</p>
      {advisor.free && <p className="text-emerald-400 text-[10px] font-semibold uppercase tracking-wide mt-3">Free</p>}
    </div>
  );

  if (locked) return cardBody;
  return <Link to={`/futures/advisor/${advisor.key}`}>{cardBody}</Link>;
}

export default function FameTeamPage() {
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
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
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

      <TeamIntroVideo />

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
