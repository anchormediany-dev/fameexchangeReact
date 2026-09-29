import { useDispatch } from "react-redux";
import { FiTrendingUp, FiShield, FiDollarSign, FiUsers, FiVideo, FiCalendar } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { openSignupModal } from "../../features/auth/signupModalSlice";

// Matches the real free-tier roster in fameexchangeAPI's
// services/futuresAdvisorPersonas.js — kept in sync manually since this is
// static marketing copy, not a live query (no personalized "unlocked"
// state to fetch for a visitor who doesn't have an account yet).
const FREE_ADVISORS = [
  { name: "Maya", title: "Vision Coach", avatar: "/futures-advisors/vision_coach.jpg" },
  { name: "Devin", title: "Growth Architect", avatar: "/futures-advisors/growth_architect.jpg" },
  { name: "Marcus", title: "Brand Protector", avatar: "/futures-advisors/brand_protector.jpg" },
  { name: "Kenji", title: "Opportunity Agent", avatar: "/futures-advisors/opportunity_agent.jpg" },
  { name: "Andre", title: "Career Manager", avatar: "/futures-advisors/career_manager.jpg" },
];

const FEATURES = [
  {
    icon: FiUsers,
    title: "AI Advisor Team",
    desc: "5 free AI coaches, plus 12+ specialists covering monetization, fan-building, film, music, and more.",
  },
  {
    icon: FiTrendingUp,
    title: "Growth Studio",
    desc: "Viral content ideas, growth insights, and a daily plan tailored to your niche.",
  },
  {
    icon: FiCalendar,
    title: "Content Calendar",
    desc: "Plan and schedule your content across every platform in one place.",
  },
  {
    icon: FiShield,
    title: "Brand Protection",
    desc: "Risk detection and deal review before you sign anything.",
  },
  {
    icon: FiDollarSign,
    title: "Monetization Lab",
    desc: "Fan memberships, exclusive content, and project funding — real revenue, on your terms.",
  },
  {
    icon: FiVideo,
    title: "Fame Live & Messaging",
    desc: "Go live and message your most engaged fans directly.",
  },
];

export default function FuturesPublicPreview() {
  const dispatch = useDispatch();
  const openSignup = () => dispatch(openSignupModal());

  return (
    <div className="bg-[#171717] min-h-screen text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[#a38b41] text-xs uppercase tracking-widest font-semibold mb-3">
            Fame Futures
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Build Your Fame, Backed by AI</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The AI tools, strategy, and ecosystem creators use to grow their audience, protect
            their brand, and prepare for the Fame Exchange.
          </p>
          <button
            type="button"
            onClick={openSignup}
            className="mt-8 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold px-8 py-3.5 rounded-lg hover:brightness-110 transition-all text-lg"
          >
            Get Started Free
          </button>
        </div>

        {/* Advisor showcase */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Meet Your Fame Team</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {FREE_ADVISORS.map((a) => (
              <div key={a.name} className="flex flex-col items-center w-28">
                <img
                  src={a.avatar}
                  alt={a.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#a38b41]/40 mb-2"
                />
                <p className="font-bold text-sm">{a.name}</p>
                <p className="text-[#a38b41] text-xs text-center">{a.title}</p>
              </div>
            ))}
            <button
              type="button"
              onClick={openSignup}
              className="flex flex-col items-center justify-center w-28 h-[104px] rounded-full border-2 border-dashed border-gray-600 text-gray-400 text-xs text-center px-2 hover:border-[#a38b41] hover:text-[#a38b41] transition-colors"
            >
              +12 more specialists
            </button>
          </div>
        </div>

        {/* Feature grid */}
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-2xl p-6">
              <Icon className="text-[#a38b41] mb-3" size={24} />
              <h3 className="font-bold mb-1.5">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to start building?</h2>
          <p className="text-gray-400 mb-6">
            Free to join. Choose your path as a creator or a fan.
          </p>
          <button
            type="button"
            onClick={openSignup}
            className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold px-8 py-3.5 rounded-lg hover:brightness-110 transition-all text-lg"
          >
            Create Your Account
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
