import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiLock, FiUsers, FiHeart } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import AuthGate from "../../components/AuthGate";
import SubscriptionCheckoutModal from "./SubscriptionCheckoutModal";
import {
  useGetFuturesTalentProfileQuery,
  useGetFanTiersQuery,
  useStartFanSubscriptionCheckoutMutation,
  useGetTalentExclusiveContentQuery,
  useGetTalentProjectsQuery,
  useStartProjectSupportMutation,
} from "../../app/futuresHubApi";

// A talent's public Fame Futures presence — fan tiers to subscribe to,
// tier-gated exclusive content, and active crowdfunding projects. The
// natural landing point for a fan-tier subscribe link or shared content
// link; didn't exist before Phase 6 (Phase 3 built fan-tier subscriptions
// and Phase 3's project-support payments with no page to reach them from).

function FanTiersList({ talentId }) {
  const { data: tiersRes, isLoading } = useGetFanTiersQuery(talentId);
  const [startFanSubscriptionCheckout] = useStartFanSubscriptionCheckoutMutation();
  const [checkoutTier, setCheckoutTier] = useState(null);

  const tiers = (tiersRes?.data || []).filter((t) => t.status === "active");
  if (isLoading || tiers.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-white font-bold text-xl mb-1 flex items-center gap-2">
        <FiHeart className="text-[#a38b41]" /> Support This Creator
      </h2>
      <p className="text-gray-400 text-sm mb-5">Subscribe for exclusive perks.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div key={t._id} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
            <p className="text-white font-bold">{t.name}</p>
            <p className="text-2xl font-black text-[#a38b41] mt-1">
              ${t.price}
              <span className="text-sm text-gray-400 font-normal">/mo</span>
            </p>
            {t.description && <p className="text-gray-500 text-xs mt-2">{t.description}</p>}
            <button
              type="button"
              onClick={() => setCheckoutTier(t)}
              className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-xs font-semibold hover:brightness-110 transition"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {checkoutTier && (
        <SubscriptionCheckoutModal
          title={checkoutTier.name}
          priceLabel={`$${checkoutTier.price}/mo`}
          ctaVerb="Subscribe"
          startCheckout={() => startFanSubscriptionCheckout({ tierId: checkoutTier._id }).unwrap()}
          onClose={() => setCheckoutTier(null)}
          onSuccess={() => setCheckoutTier(null)}
        />
      )}
    </div>
  );
}

function ExclusiveContentList({ talentId }) {
  const { data: contentRes, isLoading } = useGetTalentExclusiveContentQuery(talentId);
  const content = contentRes?.data || [];
  if (isLoading || content.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-white font-bold text-xl mb-1">Exclusive Content</h2>
      <p className="text-gray-400 text-sm mb-5">Subscribe to unlock.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {content.map((c) => (
          <div key={c._id} className="bg-[#191919] border border-[#2a2a2a] rounded-xl p-4 relative overflow-hidden">
            <p className="text-white font-semibold text-sm">{c.title}</p>
            <p className="text-gray-500 text-xs mt-0.5 capitalize">{c.type}</p>
            {c.locked ? (
              <div className="mt-3 flex items-center gap-1.5 text-gray-500 text-xs">
                <FiLock size={12} /> Subscribe to unlock
              </div>
            ) : (
              <a
                href={c.content_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[#a38b41] text-xs font-semibold hover:underline"
              >
                View →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [supporting, setSupporting] = useState(false);
  const [amount, setAmount] = useState(10);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [startProjectSupport] = useStartProjectSupportMutation();

  const progress = project.funding_goal > 0 ? Math.min(100, (project.total_raised / project.funding_goal) * 100) : 0;

  return (
    <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
      <p className="text-white font-bold">{project.title}</p>
      {project.description && <p className="text-gray-400 text-sm mt-1">{project.description}</p>}
      <div className="mt-4 mb-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-[#a38b41]">${(project.total_raised || 0).toLocaleString()}</span>
        <span className="text-gray-500">of ${(project.funding_goal || 0).toLocaleString()}</span>
      </div>
      <div className="h-2 rounded-full bg-[#2a2a2a] overflow-hidden">
        <div className="h-full bg-[#a38b41] rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      {!supporting ? (
        <button
          type="button"
          onClick={() => setSupporting(true)}
          disabled={project.status !== "active"}
          className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-xs font-semibold hover:brightness-110 transition disabled:opacity-40"
        >
          {project.status === "active" ? "Support This Project" : "Funding Closed"}
        </button>
      ) : (
        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg pl-6 pr-3 py-2 text-sm text-white outline-none focus:border-[#a38b41]"
            />
          </div>
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-xs font-semibold px-4 rounded-lg hover:brightness-110 transition"
          >
            Continue
          </button>
        </div>
      )}

      {checkoutOpen && (
        <SubscriptionCheckoutModal
          title={project.title}
          priceLabel={`$${Number(amount).toLocaleString()}`}
          ctaVerb="Support"
          startCheckout={() =>
            startProjectSupport({ projectId: project._id, amount: Number(amount) }).unwrap()
          }
          onClose={() => setCheckoutOpen(false)}
          onSuccess={() => {
            setCheckoutOpen(false);
            setSupporting(false);
          }}
        />
      )}
    </div>
  );
}

function ProjectsList({ talentId }) {
  const { data: projectsRes, isLoading } = useGetTalentProjectsQuery(talentId);
  const projects = projectsRes?.data || [];
  if (isLoading || projects.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-white font-bold text-xl mb-1">Crowdfunding Projects</h2>
      <p className="text-gray-400 text-sm mb-5">Support what this creator is building.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}

export default function FuturesCreatorProfile() {
  const { userId } = useParams();
  const { data: profileRes, isLoading } = useGetFuturesTalentProfileQuery(userId);
  const profile = profileRes?.data;

  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen text-white">
        <Navbar />
        <div className="pt-32 pb-20">
          {isLoading ? (
            <div className="text-center text-gray-400 py-24">Loading…</div>
          ) : !profile ? (
            <div className="text-center text-gray-400 py-24">Creator not found.</div>
          ) : (
            <div className="max-w-3xl mx-auto px-4">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#2a2a2a] mx-auto mb-4 flex items-center justify-center text-[#a38b41] text-2xl font-bold">
                  {profile.stage_name?.[0]?.toUpperCase()}
                </div>
                <h1 className="text-3xl font-black text-white">{profile.stage_name}</h1>
                {profile.niche && <p className="text-[#a38b41] text-sm mt-1">{profile.niche}</p>}
                {profile.bio && <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto">{profile.bio}</p>}
                {profile.total_followers > 0 && (
                  <p className="text-gray-500 text-xs mt-3 flex items-center justify-center gap-1.5">
                    <FiUsers size={12} /> {profile.total_followers.toLocaleString()} followers
                  </p>
                )}
              </div>

              <AuthGate
                title="Sign in to support this creator"
                message="Sign in to your Fame Exchange account to subscribe, back a project, or view exclusive content."
              >
                <FanTiersList talentId={userId} />
                <ProjectsList talentId={userId} />
                <ExclusiveContentList talentId={userId} />
              </AuthGate>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
