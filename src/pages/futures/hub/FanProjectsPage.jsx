import { useState } from "react";
import { FiBriefcase, FiHeart } from "react-icons/fi";
import {
  useGetMyFuturesFanProfileQuery,
  useGetTalentProjectsQuery,
  useStartProjectSupportMutation,
} from "../../../app/futuresHubApi";
import SubscriptionCheckoutModal from "../SubscriptionCheckoutModal";

function ProjectCard({ project }) {
  const [supporting, setSupporting] = useState(false);
  const [amount, setAmount] = useState(10);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [startProjectSupport] = useStartProjectSupportMutation();

  const progress = project.funding_goal > 0 ? Math.min(100, (project.total_raised / project.funding_goal) * 100) : 0;

  return (
    <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl overflow-hidden">
      {project.image_url && (
        <img src={project.image_url} alt={project.title} className="w-full aspect-video object-cover" />
      )}
      <div className="p-5">
        <p className="text-white font-bold">{project.title}</p>
        {project.description && <p className="text-gray-400 text-sm mt-1">{project.description}</p>}
        {project.video_url && <video src={project.video_url} controls className="w-full rounded-lg mt-3 bg-black" />}
        {project.audio_url && <audio src={project.audio_url} controls className="w-full mt-3" />}

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
            {project.status === "active" ? "Fund This Project" : "Funding Closed"}
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
            ctaVerb="Fund"
            startCheckout={() => startProjectSupport({ projectId: project._id, amount: Number(amount) }).unwrap()}
            onClose={() => setCheckoutOpen(false)}
            onSuccess={() => {
              setCheckoutOpen(false);
              setSupporting(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function FanProjectsPage() {
  const { data: fanProfileRes } = useGetMyFuturesFanProfileQuery();
  const talentId = fanProfileRes?.data?.talentId;
  const { data: projectsRes, isLoading } = useGetTalentProjectsQuery(talentId, { skip: !talentId });
  const projects = projectsRes?.data || [];

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiBriefcase className="text-[#a38b41]" /> Projects
      </h1>
      <p className="text-gray-400 text-sm mb-6">Support what your creator is building.</p>

      {!talentId ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiHeart className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">Subscribe to a creator first</p>
          <p className="text-gray-500 text-sm">Once you're supporting a creator, their projects show up here.</p>
        </div>
      ) : isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiBriefcase className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">No active projects</p>
          <p className="text-gray-500 text-sm">Check back soon.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
