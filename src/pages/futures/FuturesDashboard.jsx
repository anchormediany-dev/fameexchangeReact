import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams, Routes, Route, Navigate } from "react-router-dom";
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
import FuturesHubLayout from "./hub/FuturesHubLayout";
import DashboardOverview from "./hub/DashboardOverview";
import FameTeamPage from "./hub/FameTeamPage";
import DailyPlanPage from "./hub/DailyPlanPage";
import CareerRoadmapPage from "./hub/CareerRoadmapPage";
import MembershipPage from "./hub/MembershipPage";
import FanMembershipsPage from "./hub/FanMembershipsPage";
import ProjectsPage from "./hub/ProjectsPage";
import ExclusiveContentPage from "./hub/ExclusiveContentPage";
import FanDashboardOverview from "./hub/FanDashboardOverview";
import FanSupportingPage from "./hub/FanSupportingPage";
import FanRewardsPage from "./hub/FanRewardsPage";
import FanReferralsPage from "./hub/FanReferralsPage";
import FanMissionsPage from "./hub/FanMissionsPage";
import MissionApprovalsPage from "./hub/MissionApprovalsPage";
import ReferralDashboardPage from "./hub/ReferralDashboardPage";
import FanProgressPage from "./hub/FanProgressPage";
import LeaderboardPage from "./hub/LeaderboardPage";
import FanShoutoutsPage from "./hub/FanShoutoutsPage";
import FanMissionsListPage from "./hub/FanMissionsListPage";
import FanProjectsPage from "./hub/FanProjectsPage";
import FanExclusiveContentPage from "./hub/FanExclusiveContentPage";
import FanLeaderboardPage from "./hub/FanLeaderboardPage";
import FanGlobalLeaderboardPage from "./hub/FanGlobalLeaderboardPage";
import FanFameLivePage from "./hub/FanFameLivePage";
import FanMembershipPage from "./hub/FanMembershipPage";
import GrowthStudioPage from "./hub/GrowthStudioPage";
import ContentCalendarPage from "./hub/ContentCalendarPage";
import CollabsPage from "./hub/CollabsPage";
import MonetizationLabPage from "./hub/MonetizationLabPage";
import MessagesPage from "./hub/MessagesPage";
import FanMessagesPage from "./hub/FanMessagesPage";
import ModerationPage from "./hub/ModerationPage";
import InsightsPage from "./hub/InsightsPage";
import GrowthInsightsPage from "./hub/GrowthInsightsPage";
import FameLivePage from "./hub/FameLivePage";
import FameAdvisorsVaultPage from "./hub/FameAdvisorsVaultPage";
import BrandProtectionPage from "./hub/BrandProtectionPage";
import SettingsPage from "./hub/SettingsPage";
import HelpPage from "./hub/HelpPage";

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

function FanPathCard({ onCreate, creating, referredBy }) {
  return (
    <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-6">
      <FiUsers className="w-8 h-8 text-[#a38b41] mb-3" />
      <h3 className="text-white font-bold text-lg mb-2">I'm a Fan</h3>
      <p className="text-gray-400 text-sm mb-4">
        Follow and support creators as they grow — join their missions, earn XP, and get
        exclusive access.
      </p>
      {referredBy && (
        <p className="text-emerald-400 text-xs mb-3">You were referred by a friend — they'll earn XP when you join!</p>
      )}
      <button
        type="button"
        disabled={creating}
        onClick={() => onCreate(referredBy ? { referredBy } : {})}
        className="w-full border border-[#a38b41] text-[#a38b41] font-semibold py-2.5 rounded-lg hover:bg-[#a38b41]/10 transition-all disabled:opacity-60"
      >
        {creating ? "Creating…" : "Join as a Fan"}
      </button>
    </div>
  );
}

// Talent-side routes nested under /futures/dashboard/* — every sidebar item
// (all 6 phases of the approved roadmap) now has a real page; unmatched
// sub-paths redirect to the section index instead of 404ing.
function TalentRoutes() {
  return (
    <Routes>
      <Route index element={<DashboardOverview />} />
      <Route path="team" element={<FameTeamPage />} />
      <Route path="daily-plan" element={<DailyPlanPage />} />
      <Route path="career-roadmap" element={<CareerRoadmapPage />} />
      <Route path="growth-studio" element={<GrowthStudioPage />} />
      <Route path="content-calendar" element={<ContentCalendarPage />} />
      <Route path="collabs" element={<CollabsPage />} />
      <Route path="insights" element={<InsightsPage />} />
      <Route path="growth-insights" element={<GrowthInsightsPage />} />
      <Route path="fan-missions" element={<FanMissionsPage />} />
      <Route path="mission-approvals" element={<MissionApprovalsPage />} />
      <Route path="referrals" element={<ReferralDashboardPage />} />
      <Route path="fan-progress" element={<FanProgressPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
      <Route path="fan-shoutouts" element={<FanShoutoutsPage />} />
      <Route path="messages" element={<MessagesPage />} />
      <Route path="moderation" element={<ModerationPage />} />
      <Route path="membership" element={<MembershipPage />} />
      <Route path="fan-memberships" element={<FanMembershipsPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="exclusive-content" element={<ExclusiveContentPage />} />
      <Route path="monetization-lab" element={<MonetizationLabPage />} />
      <Route path="fame-live" element={<FameLivePage />} />
      <Route path="advisors-vault" element={<FameAdvisorsVaultPage />} />
      <Route path="brand-protection" element={<BrandProtectionPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="help" element={<HelpPage />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}

function FanRoutes() {
  return (
    <Routes>
      <Route index element={<FanDashboardOverview />} />
      <Route path="supporting" element={<FanSupportingPage />} />
      <Route path="missions" element={<FanMissionsListPage />} />
      <Route path="leaderboard" element={<FanLeaderboardPage />} />
      <Route path="global-leaderboard" element={<FanGlobalLeaderboardPage />} />
      <Route path="messages" element={<FanMessagesPage />} />
      <Route path="rewards" element={<FanRewardsPage />} />
      <Route path="referrals" element={<FanReferralsPage />} />
      <Route path="membership" element={<FanMembershipPage />} />
      <Route path="projects" element={<FanProjectsPage />} />
      <Route path="exclusive-content" element={<FanExclusiveContentPage />} />
      <Route path="fame-live" element={<FanFameLivePage />} />
      <Route path="advisors-vault" element={<FameAdvisorsVaultPage />} />
      <Route path="help" element={<HelpPage />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}

function DashboardContent() {
  const user = useSelector((s) => s?.auth?.user);
  const [searchParams] = useSearchParams();
  const referredBy = searchParams.get("ref");
  const { data: talentProfileRes, isLoading: talentLoading } = useGetMyFuturesTalentProfileQuery();
  const { data: fanProfileRes, isLoading: fanLoading } = useGetMyFuturesFanProfileQuery();
  const [createTalentProfile, { isLoading: creatingTalent }] = useCreateMyFuturesTalentProfileMutation();
  const [createFanProfile, { isLoading: creatingFan }] = useCreateMyFuturesFanProfileMutation();

  const talentProfile = talentProfileRes?.data;
  const qualifiesAsTalent = Boolean(talentProfileRes?.qualifies);
  const fanProfile = fanProfileRes?.data;
  const isLoading = talentLoading || fanLoading;

  // Loading, and both "no profile" branches below, use the normal site
  // chrome (Navbar/Footer) — only once a role is known does the dedicated
  // sidebar shell take over, matching the reference (no site navbar inside
  // the hub). AuthGate is a no-op once authenticated (which having a
  // profile requires), so it doesn't add any chrome of its own here.
  if (isLoading) {
    return (
      <div className="bg-[#171717] min-h-screen text-white">
        <Navbar />
        <div className="pt-32 text-center text-gray-400 py-24">Loading…</div>
        <Footer />
      </div>
    );
  }

  if (talentProfile) {
    return (
      <FuturesHubLayout role="talent" displayName={talentProfile.stage_name}>
        <TalentRoutes />
      </FuturesHubLayout>
    );
  }

  if (fanProfile) {
    return (
      <FuturesHubLayout role="fan" displayName={fanProfile.display_name}>
        <FanRoutes />
      </FuturesHubLayout>
    );
  }

  // No profile yet — choose a path (unchanged from before the sidebar
  // restructure; this happens before there's a role to build a nav around).
  return (
    <div className="bg-[#171717] min-h-screen text-white">
      <Navbar />
      <div className="pt-32 max-w-3xl mx-auto pb-20 px-4">
        <div className="text-center mb-10">
          <p className="text-[#a38b41] text-xs uppercase tracking-widest font-semibold mb-2">Fame Futures</p>
          <h1 className="text-3xl md:text-4xl font-black text-white">Welcome, {user?.name || "there"}</h1>
          <p className="text-gray-400 mt-2">How do you want to show up here?</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <CreatorPathCard
            qualifies={qualifiesAsTalent}
            isLoadingProfile={isLoading}
            creating={creatingTalent}
            onCreate={(body) => createTalentProfile(body)}
          />
          <FanPathCard creating={creatingFan} referredBy={referredBy} onCreate={(body) => createFanProfile(body)} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function FuturesDashboard() {
  return (
    <MotionPageWrapper>
      <AuthGate
        title="Sign in to Fame Futures"
        message="Sign in to your Fame Exchange account to get started."
      >
        <DashboardContent />
      </AuthGate>
    </MotionPageWrapper>
  );
}
