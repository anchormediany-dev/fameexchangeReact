import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FiGrid,
  FiUsers,
  FiCalendar,
  FiCompass,
  FiTrendingUp,
  FiUserPlus,
  FiBarChart2,
  FiTarget,
  FiCheckSquare,
  FiShare2,
  FiAward,
  FiMessageSquare,
  FiShield,
  FiCreditCard,
  FiStar,
  FiBriefcase,
  FiImage,
  FiDollarSign,
  FiVideo,
  FiBookOpen,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiX,
  FiGift,
  FiGlobe,
} from "react-icons/fi";
import { logout } from "../../../features/auth/authSlice";

// Every nav item Base44's reference has, grouped the same way. All 6
// phases are built — every item below routes to a real page.
const TALENT_NAV = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", to: "", icon: FiGrid, end: true }],
  },
  {
    group: "My Fame Team",
    items: [
      { label: "My Fame Team", to: "team", icon: FiUsers },
      { label: "Daily Plan", to: "daily-plan", icon: FiCalendar },
      { label: "Career Roadmap", to: "career-roadmap", icon: FiCompass },
    ],
  },
  {
    group: "Growth",
    items: [
      { label: "Growth Studio", to: "growth-studio", icon: FiTrendingUp },
      { label: "Content Calendar", to: "content-calendar", icon: FiCalendar },
      { label: "Collabs", to: "collabs", icon: FiUserPlus },
      { label: "Insights", to: "insights", icon: FiBarChart2 },
      { label: "Growth Insights", to: "growth-insights", icon: FiTrendingUp },
    ],
  },
  {
    group: "Fans",
    items: [
      { label: "Fan Missions", to: "fan-missions", icon: FiTarget },
      { label: "Mission Approvals", to: "mission-approvals", icon: FiCheckSquare },
      { label: "Referral Dashboard", to: "referrals", icon: FiShare2 },
      { label: "Fan Progress", to: "fan-progress", icon: FiBarChart2 },
      { label: "Leaderboard", to: "leaderboard", icon: FiAward },
      { label: "Fan Shoutouts", to: "fan-shoutouts", icon: FiMessageSquare },
      { label: "Messages", to: "messages", icon: FiMessageSquare },
      { label: "Moderation", to: "moderation", icon: FiShield },
    ],
  },
  {
    group: "Monetization",
    items: [
      { label: "Membership", to: "membership", icon: FiCreditCard },
      { label: "Fan Memberships", to: "fan-memberships", icon: FiStar },
      { label: "Projects", to: "projects", icon: FiBriefcase },
      { label: "Exclusive Content", to: "exclusive-content", icon: FiImage },
      { label: "Monetization Lab", to: "monetization-lab", icon: FiDollarSign },
    ],
  },
  {
    group: "Resources",
    items: [
      { label: "Fame Live", to: "fame-live", icon: FiVideo },
      { label: "Fame Advisors Vault", to: "advisors-vault", icon: FiBookOpen },
      { label: "Brand Protection", to: "brand-protection", icon: FiShield },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Settings", to: "settings", icon: FiSettings },
      { label: "Help", to: "help", icon: FiHelpCircle },
    ],
  },
];

const FAN_NAV = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", to: "", icon: FiGrid, end: true }],
  },
  {
    group: "Community",
    items: [
      { label: "Supporting", to: "supporting", icon: FiUsers },
      { label: "Missions", to: "missions", icon: FiTarget },
      { label: "Leaderboard", to: "leaderboard", icon: FiAward },
      { label: "Global Leaderboard", to: "global-leaderboard", icon: FiGlobe },
      { label: "Referrals", to: "referrals", icon: FiShare2 },
    ],
  },
  {
    group: "Perks",
    items: [
      { label: "Messages", to: "messages", icon: FiMessageSquare },
      { label: "XP Rewards", to: "rewards", icon: FiGift },
    ],
  },
  {
    group: "Monetization",
    items: [
      { label: "Membership", to: "membership", icon: FiCreditCard },
      { label: "Projects", to: "projects", icon: FiBriefcase },
      { label: "Exclusive Content", to: "exclusive-content", icon: FiImage },
    ],
  },
  {
    group: "Resources",
    items: [
      { label: "Fame Live", to: "fame-live", icon: FiVideo },
      { label: "Fame Advisors Vault", to: "advisors-vault", icon: FiBookOpen },
    ],
  },
  {
    group: "Account",
    items: [{ label: "Help", to: "help", icon: FiHelpCircle }],
  },
];

// NavLink's relative-path + `end` matching gets unreliable when the link
// isn't rendered inside the <Route> tree it's linking within (this sidebar
// sits alongside the nested <Routes>, not inside them) — absolute paths
// sidestep that entirely instead of fighting NavLink's relative resolution.
const BASE = "/futures/dashboard";

function SidebarContent({ role, displayName, roleLabel, onNavigate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = role === "talent" ? TALENT_NAV : FAN_NAV;
  const initial = (displayName || "?").trim().charAt(0).toUpperCase() || "?";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full bg-[#171717] border-r border-[#2a2a2a] w-72">
      <div className="p-5 border-b border-[#2a2a2a]">
        <Link to="/futures/dashboard" className="flex items-center gap-2" onClick={onNavigate}>
          <span className="text-white font-black text-sm tracking-wide">
            THE <span className="text-[#a38b41]">FAME</span> EXCHANGE
          </span>
        </Link>
      </div>

      <div className="p-4 border-b border-[#2a2a2a] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#a38b41] text-black font-bold flex items-center justify-center text-sm flex-shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">{displayName || "—"}</p>
          <p className="text-gray-500 text-xs">{roleLabel}</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {groups.map((g, gi) => (
          <div key={g.group || gi} className="mb-4">
            {g.group && (
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest px-4 mb-1.5">
                {g.group}
              </p>
            )}
            {g.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to ? `${BASE}/${item.to}` : BASE}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#a38b41]/15 text-[#e6ca7c] border-r-2 border-[#a38b41]"
                      : "text-gray-400 hover:text-white hover:bg-[#1e1e1e]"
                  }`
                }
              >
                <item.icon size={16} className="flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-[#2a2a2a]">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1e1e1e] rounded-lg transition-colors"
        >
          <FiLogOut size={16} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default function FuturesHubLayout({ role, displayName, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const roleLabel = role === "talent" ? "Content Creator" : "Fan";

  return (
    <div className="min-h-screen bg-[#171717] flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <SidebarContent role={role} displayName={displayName} roleLabel={roleLabel} />
      </div>

      {/* Mobile top bar + slide-over sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#171717] border-b border-[#2a2a2a] flex items-center justify-between px-4 py-3">
        <span className="text-white font-black text-xs tracking-wide">
          THE <span className="text-[#a38b41]">FAME</span> EXCHANGE
        </span>
        <button type="button" onClick={() => setMobileOpen(true)} className="text-white p-1">
          <FiMenu size={22} />
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 relative">
            <SidebarContent
              role={role}
              displayName={displayName}
              roleLabel={roleLabel}
              onNavigate={() => setMobileOpen(false)}
            />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-[-44px] text-white bg-[#191919] border border-[#2a2a2a] rounded-lg p-2"
            >
              <FiX size={18} />
            </button>
          </div>
          <div className="flex-1 bg-black/60" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
