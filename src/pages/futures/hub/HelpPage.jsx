import { useState } from "react";
import { toast } from "react-toastify";
import { FiHelpCircle, FiChevronDown, FiSend, FiMessageCircle } from "react-icons/fi";
import { useAskHelpQuestionMutation } from "../../../app/futuresHubApi";

const FAQS = [
  {
    q: "How do I fix or update my social media profiles?",
    a: "Head to Settings, scroll to Social Platforms, and update any handle or follower count — your total followers recalculate automatically when you save.",
  },
  {
    q: "How do I change my stage name or bio?",
    a: "Go to Settings and edit the Stage Name or Bio fields, then hit Save Changes.",
  },
  {
    q: "How do fans join my fan club?",
    a: "Fans subscribe to one of your custom tiers from Fan Memberships (Elite plan required to create tiers) or from your public creator page.",
  },
  {
    q: "How do I create missions for my fans?",
    a: "Go to Fan Missions, either write your own or use \"Generate with AI\" for suggestions, then publish — your fans will see it under their Missions tab.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#2a2a2a] last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-white text-sm font-semibold">{q}</span>
        <FiChevronDown className={`text-gray-500 transition-transform flex-shrink-0 ml-3 ${open ? "rotate-180" : ""}`} size={16} />
      </button>
      {open && <p className="text-gray-400 text-sm pb-4 pr-6">{a}</p>}
    </div>
  );
}

export default function HelpPage() {
  const [askQuestion, { isLoading: asking }] = useAskHelpQuestionMutation();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    try {
      const res = await askQuestion(question.trim()).unwrap();
      setAnswer(res.data.answer);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't get an answer — try again.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiHelpCircle className="text-[#a38b41]" /> Help Center
      </h1>
      <p className="text-gray-400 text-sm mb-6">Find quick answers below, or ask your own question and our assistant will help.</p>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6 max-w-2xl">
        <p className="text-white font-semibold flex items-center gap-1.5 mb-3">
          <FiMessageCircle className="text-[#a38b41]" /> Ask a Question
        </p>
        <form onSubmit={handleAsk} className="space-y-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here… e.g. How do I update my Instagram followers?"
            rows={3}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <button
            type="submit"
            disabled={asking || !question.trim()}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
          >
            <FiSend size={14} /> {asking ? "Asking…" : "Ask"}
          </button>
        </form>
        {answer && (
          <div className="mt-4 bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 max-w-2xl">
        <p className="text-white font-semibold mb-1">Frequently Asked Questions</p>
        <div className="mt-2">
          {FAQS.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
}
