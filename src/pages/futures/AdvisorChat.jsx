import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiSend, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import AuthGate from "../../components/AuthGate";
import {
  useGetAdvisorsQuery,
  useGetAdvisorHistoryQuery,
  useSendAdvisorMessageMutation,
} from "../../app/futuresHubApi";

function ChatBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
          isUser
            ? "bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black"
            : "bg-[#191919] border border-[#2a2a2a] text-gray-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function ChatContent({ advisorKey }) {
  const { data: advisorsRes, isLoading: advisorsLoading } = useGetAdvisorsQuery();
  const { data: historyRes, isLoading: historyLoading } = useGetAdvisorHistoryQuery(advisorKey);
  const [sendMessage, { isLoading: sending }] = useSendAdvisorMessageMutation();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);

  const advisor = (advisorsRes?.data || []).find((a) => a.key === advisorKey);
  const messages = historyRes?.data || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, sending]);

  const handleSend = async (e) => {
    e.preventDefault();
    const content = draft.trim();
    if (!content) return;
    setDraft("");
    try {
      await sendMessage({ advisorKey, content }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't send message.");
    }
  };

  if (advisorsLoading || historyLoading) {
    return <div className="text-center text-gray-400 py-24">Loading…</div>;
  }

  if (!advisor) {
    return <div className="text-center text-gray-400 py-24">Advisor not found.</div>;
  }

  if (!advisor.unlocked) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-4">
        <FiLock className="w-8 h-8 text-gray-600 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">
          {advisor.name} · {advisor.title} is locked
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Choose {advisor.name} as one of your bonus advisors, or upgrade your membership to
          unlock the full team.
        </p>
        <Link to="/futures/team" className="text-[#a38b41] font-semibold text-sm hover:underline">
          Back to My Fame Team
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col" style={{ minHeight: "70vh" }}>
      <Link to="/futures/team" className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-white transition mb-4">
        <FiArrowLeft /> My Fame Team
      </Link>
      <div className="mb-4">
        <h1 className="text-2xl font-black text-white">
          {advisor.name} <span className="text-[#a38b41]">· {advisor.title}</span>
        </h1>
        <p className="text-gray-500 text-sm">{advisor.role}</p>
      </div>

      <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-10">
            Say hello to {advisor.name} to get started.
          </p>
        )}
        {messages.map((m) => (
          <ChatBubble key={m._id} role={m.role} content={m.content} />
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="bg-[#191919] border border-[#2a2a2a] text-gray-500 rounded-2xl px-4 py-3 text-sm">
              {advisor.name} is typing…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Message ${advisor.name}…`}
          disabled={sending}
          className="flex-1 bg-[#191919] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={sending || !draft.trim()}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black rounded-lg px-4 hover:brightness-110 transition-all disabled:opacity-50"
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
}

export default function AdvisorChat() {
  const { advisorKey } = useParams();
  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen text-white">
        <Navbar />
        <div className="pt-32">
          <AuthGate
            title="Sign in to Fame Futures"
            message="Sign in to your Fame Exchange account to chat with your Fame Team."
          >
            <ChatContent advisorKey={advisorKey} />
          </AuthGate>
        </div>
        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
