import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import {
  useGetExpertInviteByTokenQuery,
  useSubmitExpertLessonMutation,
} from "../../app/futuresHubApi";

// Public, no FameExchange account needed — an outside expert follows a
// tokenized link a talent shared with them to record a video lesson.
function SubmitForm({ token, invite }) {
  const [submitLesson, { isLoading }] = useSubmitExpertLessonMutation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", video_url: "", duration_minutes: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.video_url.trim()) {
      toast.error("Title and video URL are required.");
      return;
    }
    try {
      await submitLesson({
        token,
        title: form.title.trim(),
        description: form.description.trim(),
        video_url: form.video_url.trim(),
        duration_minutes: Number(form.duration_minutes) || 0,
      }).unwrap();
      setSubmitted(true);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't submit lesson.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-white mb-3">Thank you, {invite.expert_name}!</h1>
        <p className="text-gray-400 text-sm">
          Your lesson has been submitted to {invite.talentId?.name || "the Fame Team"} for review.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-16 px-4">
      <p className="text-[#a38b41] text-xs uppercase tracking-widest font-semibold mb-2">Expert Invite</p>
      <h1 className="text-2xl font-black text-white mb-2">
        Hi {invite.expert_name}, you're invited to record a lesson
      </h1>
      {invite.message && <p className="text-gray-400 text-sm mb-6">"{invite.message}"</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Lesson title"
          className="w-full bg-[#191919] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="What does this lesson cover?"
          rows={3}
          className="w-full bg-[#191919] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
        />
        <input
          type="url"
          value={form.video_url}
          onChange={(e) => setForm((f) => ({ ...f, video_url: e.target.value }))}
          placeholder="Video URL (YouTube, Vimeo, direct link…)"
          className="w-full bg-[#191919] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
        />
        <input
          type="number"
          min="0"
          value={form.duration_minutes}
          onChange={(e) => setForm((f) => ({ ...f, duration_minutes: e.target.value }))}
          placeholder="Duration (minutes)"
          className="w-full bg-[#191919] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
        >
          {isLoading ? "Submitting…" : "Submit Lesson"}
        </button>
      </form>
    </div>
  );
}

export default function ExpertInviteSubmit() {
  const { token } = useParams();
  const { data: inviteRes, isLoading, error } = useGetExpertInviteByTokenQuery(token);
  const invite = inviteRes?.data;

  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen text-white">
        <Navbar />
        <div className="pt-32 pb-20">
          {isLoading ? (
            <div className="text-center text-gray-400 py-24">Loading…</div>
          ) : error || !invite ? (
            <div className="text-center text-gray-400 py-24">
              {error?.data?.message || "This invite link is invalid or has already been used."}
            </div>
          ) : (
            <SubmitForm token={token} invite={invite} />
          )}
        </div>
        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
