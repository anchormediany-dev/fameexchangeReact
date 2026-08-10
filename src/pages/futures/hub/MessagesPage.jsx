import { useState } from "react";
import { toast } from "react-toastify";
import { FiSend, FiMessageSquare } from "react-icons/fi";
import {
  useGetMyConversationsQuery,
  useGetConversationMessagesQuery,
  useSendConversationMessageMutation,
} from "../../../app/futuresHubApi";

function Thread({ conversationId, fanName }) {
  const { data, isLoading } = useGetConversationMessagesQuery(conversationId, { pollingInterval: 4000 });
  const [sendMessage, { isLoading: sending }] = useSendConversationMessageMutation();
  const [draft, setDraft] = useState("");

  const messages = data?.data || [];

  const handleSend = async (e) => {
    e.preventDefault();
    const content = draft.trim();
    if (!content) return;
    setDraft("");
    try {
      await sendMessage({ id: conversationId, content }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't send message.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[#2a2a2a]">
        <p className="text-white font-semibold text-sm">{fanName}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <p className="text-gray-500 text-sm text-center py-10">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-10">No messages yet — say hello.</p>
        ) : (
          messages.map((m) => (
            <div key={m._id} className={`flex ${m.senderRole === "talent" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                  m.senderRole === "talent"
                    ? "bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black"
                    : "bg-[#191919] border border-[#2a2a2a] text-gray-200"
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
  );
}

export default function MessagesPage() {
  const { data, isLoading } = useGetMyConversationsQuery(undefined, { pollingInterval: 8000 });
  const [activeId, setActiveId] = useState(null);

  const conversations = data?.data || [];
  const active = conversations.find((c) => c._id === activeId);

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1">Fan Messages</h1>
      <p className="text-gray-400 text-sm mb-6">Direct messages from your subscribers.</p>

      <div className="grid sm:grid-cols-[280px_1fr] gap-0 bg-[#191919] border border-[#2a2a2a] rounded-2xl overflow-hidden" style={{ height: "560px" }}>
        <div className="border-r border-[#2a2a2a] overflow-y-auto">
          <div className="p-4 border-b border-[#2a2a2a]">
            <p className="text-white font-semibold text-sm">Conversations</p>
          </div>
          {isLoading ? (
            <p className="text-gray-500 text-sm text-center py-10 px-4">Loading…</p>
          ) : conversations.length === 0 ? (
            <div className="text-center py-10 px-4">
              <FiMessageSquare className="text-gray-600 mx-auto mb-2" size={22} />
              <p className="text-gray-500 text-sm">No messages yet</p>
            </div>
          ) : (
            conversations.map((c) => (
              <button
                key={c._id}
                type="button"
                onClick={() => setActiveId(c._id)}
                className={`w-full text-left px-4 py-3 border-b border-[#2a2a2a] transition ${
                  activeId === c._id ? "bg-[#a38b41]/10" : "hover:bg-[#1e1e1e]"
                }`}
              >
                <p className="text-white text-sm font-semibold truncate">{c.fanId?.name || "Fan"}</p>
                <p className="text-gray-500 text-xs truncate mt-0.5">{c.last_message_preview || "—"}</p>
              </button>
            ))
          )}
        </div>
        <div>
          {active ? (
            <Thread conversationId={active._id} fanName={active.fanId?.name || "Fan"} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FiMessageSquare className="text-gray-600 mx-auto mb-2" size={22} />
                <p className="text-gray-500 text-sm">Select a conversation to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
