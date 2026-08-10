import { useState } from "react";
import { toast } from "react-toastify";
import { FiSend, FiAward } from "react-icons/fi";
import { useGetFanLeaderboardQuery, useSendFanShoutoutMutation } from "../../../app/futuresHubApi";

export default function FanShoutoutsPage() {
  const { data, isLoading } = useGetFanLeaderboardQuery();
  const [sendShoutout, { isLoading: sending }] = useSendFanShoutoutMutation();
  const [activeFanId, setActiveFanId] = useState(null);
  const [message, setMessage] = useState("");

  const fans = data?.data || [];

  const handleSend = async (fanId) => {
    if (!message.trim()) {
      toast.error("Write a message first.");
      return;
    }
    try {
      await sendShoutout({ fanId, message: message.trim() }).unwrap();
      toast.success("Shoutout sent!");
      setActiveFanId(null);
      setMessage("");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't send shoutout.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiAward className="text-[#a38b41]" /> Fan Shoutouts
      </h1>
      <p className="text-gray-400 text-sm mb-6">Reward your top fans with personalized messages.</p>

      {fans.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <p className="text-white font-semibold mb-1">No fans yet</p>
          <p className="text-gray-500 text-sm">Share your invite link to grow your community.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {fans.slice(0, 10).map((f) => (
            <div key={f.userId} className="bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">{f.display_name}</p>
                  <p className="text-gray-500 text-xs">{f.xp.toLocaleString()} XP</p>
                </div>
                {activeFanId !== f.userId && (
                  <button
                    type="button"
                    onClick={() => { setActiveFanId(f.userId); setMessage(""); }}
                    className="text-xs font-semibold text-[#a38b41] hover:underline"
                  >
                    Send Shoutout
                  </button>
                )}
              </div>
              {activeFanId === f.userId && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`A personal message for ${f.display_name}…`}
                    className="flex-1 bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
                  />
                  <button
                    type="button"
                    onClick={() => handleSend(f.userId)}
                    disabled={sending}
                    className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black rounded-lg px-3 hover:brightness-110 transition disabled:opacity-50"
                  >
                    <FiSend size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
