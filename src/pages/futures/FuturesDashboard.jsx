import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiUser, FiUsers, FiArrowRight } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import AuthGate from "../../components/AuthGate";
import {
  useGetMyFuturesTalentProfileQuery,
  useGetMyFuturesFanProfileQuery,
  useCreateMyFuturesTalentProfileMutation,
  useCreateMyFuturesFanProfileMutation,
} from "../../app/futuresHubApi";

// Phase 2 of the Fame Futures rebuild (see
// ~/.claude/plans/soft-wiggling-tiger.md) — identity + qualification gate
// only. The AI coaching / missions / memberships dashboard content itself
// lands in later phases; for now, a qualifying/created profile shows a
// simple placeholder confirming the identity layer works end to end.

function CreatorPathCard({ qualifies, isLoadingProfile, onCreate, creating }) {
  const [niche, setNiche] = useState("");

  if (isLoadingProfile) return null;

  if (!qualifies) {
    return (
      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-6">
        <FiUser className="w-8 h-8 text-[#a38b41] mb-3" />
        <h3 className="text-white font-bold text-lg mb-2">I'm a Creator</h3>
        <p className="text-gray-400 text-sm mb-4">
          Fame Futures is currently open to approved FameExchange talent. Apply as a talent
          first, then come back here.
        </p>
        <Link
          to="/connect-socials"
          className="inline-flex items-center gap-2 text-[#a38b41] text-sm font-semibold hover:underline"
        >
          Apply as talent <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#191919] border border-[#a38b41]/30 rounded-2xl p-6">
      <FiUser className="w-8 h-8 text-[#a38b41] mb-3" />
      <h3 className="text-white font-bold text-lg mb-2">I'm a Creator</h3>
      <p className="text-gray-400 text-sm mb-4">
        You're an approved talent — create your Fame Futures profile to get started.
      </p>
      <input
        type="text"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        placeholder="Your niche (e.g. Musician, Actor)"
        className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 mb-3 outline-none focus:border-[#a38b41]"
      />
      <button
        type="button"
        disabled={creating}
        onClick={() => onCreate({ niche })}
        className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
      >
        {creating ? "Creating…" : "Create My Profile"}
      </button>
    </div>
  );
}

function FanPathCard({ onCreate, creating }) {
  return (
    <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-6">
      <FiUsers className="w-8 h-8 text-[#a38b41] mb-3" />
      <h3 className="text-white font-bold text-lg mb-2">I'm a Fan</h3>
      <p className="text-gray-400 text-sm mb-4">
        Follow and support creators as they grow — join their missions, earn XP, and get
        exclusive access.
      </p>
      <button
        type="button"
        disabled={creating}
        onClick={() => onCreate({})}
        className="w-full border border-[#a38b41] text-[#a38b41] font-semibold py-2.5 rounded-lg hover:bg-[#a38b41]/10 transition-all disabled:opacity-60"
      >
        {creating ? "Creating…" : "Join as a Fan"}
      </button>
    </div>
  );
}

function DashboardContent() {
  const user = useSelector((s) => s?.auth?.user);
  const {
    data: talentProfileRes,
    isLoading: talentLoading,
  } = useGetMyFuturesTalentProfileQuery();
  const { data: fanProfileRes, isLoading: fanLoading } = useGetMyFuturesFanProfileQuery();
  const [createTalentProfile, { isLoading: creatingTalent }] =
    useCreateMyFuturesTalentProfileMutation();
  const [createFanProfile, { isLoading: creatingFan }] = useCreateMyFuturesFanProfileMutation();

  const talentProfile = talentProfileRes?.data;
  const qualifiesAsTalent = Boolean(talentProfileRes?.qualifies);
  const fanProfile = fanProfileRes?.data;
  const isLoading = talentLoading || fanLoading;

  if (isLoading) {
    return <div className="text-center text-gray-400 py-24">Loading…</div>;
  }

  // Already has a profile of some kind — placeholder confirming the
  // identity layer works; the real dashboard (AI chat, missions, etc.)
  // lands in later phases.
  if (talentProfile || fanProfile) {
    const profile = talentProfile || fanProfile;
    const name = talentProfile ? talentProfile.stage_name : fanProfile.display_name;
    return (
      <div className="max-w-2xl mx-auto text-center py-24">
        <h1 className="text-3xl font-bold text-white mb-3">Welcome, {name}</h1>
        <p className="text-gray-400">
          Your Fame Futures {talentProfile ? "creator" : "fan"} profile is set up.
        </p>
        <p className="text-gray-500 text-sm mt-4">
          AI coaching, missions, and memberships are coming online in the next phase of this
          build — check back soon.
        </p>
      </div>
    );
  }

  // No profile yet — choose a path.
  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <div className="text-center mb-10">
        <p className="text-[#a38b41] text-xs uppercase tracking-widest font-semibold mb-2">
          Fame Futures
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-white">
          Welcome, {user?.name || "there"}
        </h1>
        <p className="text-gray-400 mt-2">How do you want to show up here?</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <CreatorPathCard
          qualifies={qualifiesAsTalent}
          isLoadingProfile={isLoading}
          creating={creatingTalent}
          onCreate={(body) => createTalentProfile(body)}
        />
        <FanPathCard creating={creatingFan} onCreate={(body) => createFanProfile(body)} />
      </div>
    </div>
  );
}

export default function FuturesDashboard() {
  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen text-white">
        <Navbar />
        <div className="pt-32">
          <AuthGate
            title="Sign in to Fame Futures"
            message="Sign in to your Fame Exchange account to get started."
          >
            <DashboardContent />
          </AuthGate>
        </div>
        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
