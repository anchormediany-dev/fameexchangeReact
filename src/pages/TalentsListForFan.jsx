import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useGetTalentQuery } from "../app/authApi";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
const toUrl = (path) => {
  if (!path) return null;
  const clean = String(path).replace(/\\/g, "/");
  return clean.startsWith("http") ? clean : IMAGE_BASE + clean;
};

const firstImageUrl = (user) => {
  if (Array.isArray(user?.images) && user.images.length) {
    for (const itm of user.images) {
      if (itm && typeof itm === "object") {
        if (itm.fileUrl) return toUrl(itm.fileUrl);
        // object of indexed chars -> rebuild string
        const keys = Object.keys(itm).filter((k) => /^\d+$/.test(k));
        if (keys.length) {
          keys.sort((a, b) => Number(a) - Number(b));
          const rebuilt = keys.map((k) => itm[k]).join("");
          const url = toUrl(rebuilt);
          if (url) return url;
        }
      } else if (typeof itm === "string" && itm.trim()) {
        const url = toUrl(itm);
        if (url) return url;
      }
    }
  }
  if (user?.image) {
    const url = toUrl(user.image);
    if (url) return url;
  }
  return null;
};

const getName = (u) => (u?.name || "").trim();
const getEmail = (u) => (u?.email || "").trim();

const TalentCard = ({ user, onClick }) => {
  const name = getName(user) || "Unnamed";
  const email = getEmail(user) || "—";
  const src = firstImageUrl(user);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <button
      onClick={() => onClick?.(user)}
      className="group flex items-center w-full gap-2 p-5 cursor-pointer rounded-lg bg-white/5 border border-white/10
                 hover:border-[#a38b41]/50 hover:bg-white/10 transition min-w-0"
      title={name}
    >
      <div className="flex flex-col w-full items-center gap-2">
        {" "}
        <div className="relative w-16 h-16 shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
            {src ? (
              <img src={src} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-white/70">{initials || "?"}</span>
            )}
          </div>
          {user.social_worth > 0 && (
            <img
              src="/profileverified-fameexchange.png"
              alt="Social Verified"
              title="Social media verified"
              className="absolute -top-1 -left-1 w-6 h-6 drop-shadow-md"
            />
          )}
        </div>
        <div className="min-w-0 text-left">
          <div className="text-sm text-white truncate">{name}</div>
          {/* <div className="text-[11px] text-gray-400 truncate">{email}</div> */}
        </div>
      </div>
    </button>
  );
};

const TalentCompactList = ({ className = "" }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTalentQuery();
  const talents = Array.isArray(data?.taleUsers) ? data.taleUsers : [];

  // search
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const filtered = talents.filter((t) => {
    if (!debounced) return true;
    const n = getName(t).toLowerCase();
    const e = getEmail(t).toLowerCase();
    return n.includes(debounced) || e.includes(debounced);
  });

  const handleTalentClick = (user) => {
    navigate(`/talent-profile/${user._id}`);
  };

  return (
    <div className={`w-full container mt-20 py-20 mx-auto ${className}`}>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-white mb-6">All Talents</h1>

      {/* Search bar (compact) */}
      <div className="relative mb-3">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-sm" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search talents"
          className="w-full h-9 pl-9 pr-8 rounded-lg bg-white/5 border border-white/10
                     focus:outline-none focus:ring-1 focus:ring-[#a38b41] text-sm text-white placeholder-white/50"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 text-xs hover:text-white"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="text-[11px] text-gray-400 mb-2">
        {isLoading
          ? "Loading talents…"
          : isError
          ? "Failed to load talents."
          : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : filtered.length ? (
        <>
          {" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((u) => (
              <TalentCard
                key={u._id || u.id}
                user={u}
                onClick={handleTalentClick}
              />
            ))}
          </div>
          {/* <div className="w-full flex justify-center mt-8">
            {" "}
            <button className="custom-button-two">Discover More</button>
          </div> */}
        </>
      ) : (
        <div className="text-sm text-gray-400 py-6 text-center">
          No talents match "{q}".
        </div>
      )}
    </div>
  );
};

export default TalentCompactList;
