import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSend, FiLock } from "react-icons/fi";
import {
  useGetFanConversationQuery,
  useGetConversationMessagesQuery,
  useSendConversationMessageMutation,
} from "../../../app/futuresHubApi";

export default function FanMessagesPage() {
  const { data, isLoading } = useGetFanConversationQuery();
  const [draft, setDraft] = useState("");

  const allowed = data?.data?.allowed;
  const conversation = data?.data?.conversation;

  const { data: msgsData } = useGetConversationMessagesQuery(conversation?._id, {
    skip: !conversation?._id,
    pollingInterval: 4000,
  });
  const [sendMessage, { isLoading: sending }] = useSendConversationMessageMutation();

  const messages = msgsData?.data || [];

  const handleSend = async (e) => {
    e.preventDefault();
    const content = draft.trim();
    if (!content) return;
    setDraft("");
    try {
      await sendMessage({ id: conversation._id, content }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't send message.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  if (!allowed) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-4">
        <div className="w-14 h-14 rounded-2xl bg-[#191919] border border-[#2a2a2a] flex items-center justify-center mx-auto mb-5">
          <FiLock className="text-[#a38b41]" size={22} />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Active Membership Required</h1>
        <p className="text-gray-400 text-sm mb-6">
          Subscribe to your favorite talent's Fan Club to start sending direct messages.
        </p>
        <Link
          to="/futures/dashboard/supporting"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all"
        >
          Find Talent
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1">Messages</h1>
      <p className="text-gray-400 text-sm mb-6">Direct messages with your creator.</p>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl flex flex-col max-w-2xl" style={{ height: "540px" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-10">Say hello to get started.</p>
          ) : (
            messages.map((m) => (
              <div key={m._id} className={`flex ${m.senderRole === "fan" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    m.senderRole === "fan"
                      ? "bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black"
                      : "bg-[#111111] border border-[#2a2a2a] text-gray-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSend} className="p-3 border-t border-[#2a2a2a] flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message…"
            disabled={sending}
            className="flex-1 bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={sending || !draft.trim()}
            className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black rounded-lg px-4 hover:brightness-110 transition disabled:opacity-50"
          >
            <FiSend size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
