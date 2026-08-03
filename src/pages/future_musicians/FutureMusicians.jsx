import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useCallback,
  useDeferredValue,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetAllSponsorshipsQuery } from "../../app/authApi";
import {
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaMusic,
  FaRunning,
  FaFilm,
  FaUserTie,
  FaMicrophone,
  FaInstagram,
} from "react-icons/fa";
import { imgSrc } from "../../utils/imgSrc";

/* ---------------- state & reducer ---------------- */
const initialState = {
  search: "",
  category: null,
  dropdownOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "CLEAR_SEARCH":
      return { ...state, search: "" };
    case "SET_CATEGORY":
      return { ...state, category: action.payload, dropdownOpen: false };
    case "TOGGLE_DROPDOWN":
      return { ...state, dropdownOpen: !state.dropdownOpen };
    case "CLOSE_DROPDOWN":
      return { ...state, dropdownOpen: false };
    default:
      return state;
  }
}

/* ---------------- icons ---------------- */
const ICONS = {
  Athlete: <FaRunning className="mr-2" />,
  Actor: <FaFilm className="mr-2" />,
  Model: <FaUserTie className="mr-2" />,
  Musician: <FaMusic className="mr-2" />,
  Band: <FaMusic className="mr-2" />,
  Entertainer: <FaMicrophone className="mr-2" />,
  "Brand Ambassador": <FaUserTie className="mr-2" />,
  Host: <FaMicrophone className="mr-2" />,
  "Social Media Rep": <FaInstagram className="mr-2" />,
  Spokesperson: <FaMicrophone className="mr-2" />,
};

/* ---------------- helpers ---------------- */
const normalize = (s) =>
  (s || "")
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

// Safer category reader
const userCategories = (u) => {
  if (!Array.isArray(u?.talent)) return [];
  return u.talent
    .map((t) => (t && typeof t === "object" ? t.category : null))
    .filter(Boolean);
};

// Safe image getter for talent user object
const firstImageUrl = (u) => {
  if (u?.image) return u.image;
  const arr = u?.images;
  if (!Array.isArray(arr) || arr.length === 0) return null;

  const withFile = arr.find((x) => x && typeof x === "object" && x.fileUrl);
  if (withFile) return withFile.fileUrl;

  // Some backends return weird objects with numeric keys
  const weird = arr.find(
    (x) =>
      x && typeof x === "object" && Object.keys(x).some((k) => /^\d+$/.test(k))
  );
  if (weird) {
    const s = Object.keys(weird)
      .filter((k) => /^\d+$/.test(k))
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => weird[k])
      .join("");
    return s || null;
  }
  return null;
};

const buildHaystack = (u) =>
  normalize(
    [
      u?.name,
      u?.email,
      u?.token_brand_name,
      u?.token_name,
      u?.token?.symbol,
      u?.token?.ticker,
      u?.tokenSymbol,
      u?.tokenTicker,
      ...userCategories(u),
    ]
      .filter(Boolean)
      .join(" ")
  );

const parseQuery = (q) => {
  const terms = normalize(q).split(" ").filter(Boolean);
  const filters = { name: [], email: [], token: [], cat: [] };
  const free = [];

  for (const t of terms) {
    const m = t.match(/^(\w+):(.*)$/);
    if (m && m[2]) {
      const key = m[1];
      const val = m[2];
      if (filters[key]) filters[key].push(val);
      else free.push(t);
    } else {
      free.push(t);
    }
  }
  return { filters, free };
};

/* ---------------- component ---------------- */
export default function FutureTalents() {
  const [{ search, category, dropdownOpen }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [searchParams, setSearchParams] = useSearchParams();

  // ---- API params state (with sensible defaults) ----
  const today = new Date().toISOString().slice(0, 10);
  const [page, setPage] = useState(1);
  const [from] = useState("2025-01-01");
  const [to] = useState(today);
  const [sort] = useState("oldest");
  const limit = 10;

  // ---- fetch from API ----
  const { data, isLoading, isError, error } = useGetAllSponsorshipsQuery({
    page,
    from,
    to,
    sort,
    limit,
  });

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // API returns { success, data: [...events], sponsoredTalents: [...], pagination: {...} }
  // We use the aggregated `sponsoredTalents` list (unique talents).
  const rawTalents = Array.isArray(data?.sponsoredTalents)
    ? data.sponsoredTalents
    : [];

  // Normalize into the "user" shape the table expects
  const talents = useMemo(
    () =>
      rawTalents.map((t) => ({
        _id: t.sponsoredId,
        name: t.name,
        email: t.email,
        role: t.role,
        images: t.images,
        token_brand_name: t.token_brand_name,
        talent: t.talent, // may be [], undefined, or array of {category, subcategory[]}
      })),
    [rawTalents]
  );

  const pagination = data?.pagination;

  // Derive available categories and counts
  const { categories, totalWithAnyCategory } = useMemo(() => {
    const counts = new Map(); // category -> count
    let withAny = 0;
    for (const u of talents) {
      const cats = userCategories(u);
      if (cats.length) withAny++;
      // Count each category once per user (avoid double count if duplicate)
      const uniq = new Set(cats);
      for (const c of uniq) counts.set(c, (counts.get(c) || 0) + 1);
    }
    const list = Array.from(counts.keys()).sort((a, b) => a.localeCompare(b));
    return {
      categories: list,
      categoryCounts: counts,
      totalWithAnyCategory: withAny,
    };
  }, [talents]);

  // Restore category from ?cat=
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && cat !== category) {
      dispatch({ type: "SET_CATEGORY", payload: cat });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // close category dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        dispatch({ type: "CLOSE_DROPDOWN" });
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // search handlers
  const onSearchChange = useCallback((e) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  }, []);
  const clearSearch = useCallback(() => {
    dispatch({ type: "CLEAR_SEARCH" });
    inputRef.current?.focus();
  }, []);
  const onSearchKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        clearSearch();
      }
    },
    [clearSearch]
  );

  const toggleDropdown = useCallback(
    () => dispatch({ type: "TOGGLE_DROPDOWN" }),
    []
  );

  const selectCategory = useCallback(
    (c) => {
      dispatch({ type: "SET_CATEGORY", payload: c });
      const next = new URLSearchParams(searchParams);
      if (c) next.set("cat", c);
      else next.delete("cat");
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Smooth UI while typing
  const deferredSearch = useDeferredValue(search);

  /* ---------- filters (client-side) ---------- */
  const matchesCategory = useCallback(
    (u) => {
      if (!category) return true;
      const cats = userCategories(u).map(normalize);
      return cats.includes(normalize(category));
    },
    [category]
  );

  const matchesSearch = useCallback(
    (u) => {
      const q = normalize(deferredSearch);
      if (!q) return true;

      const { filters, free } = parseQuery(q);

      if (filters.name.length) {
        const v = normalize(u?.name);
        if (!filters.name.every((t) => v.includes(t))) return false;
      }
      if (filters.email.length) {
        const v = normalize(u?.email);
        if (!filters.email.every((t) => v.includes(t))) return false;
      }
      if (filters.cat.length) {
        const cats = userCategories(u).map(normalize).join(" ");
        if (!filters.cat.every((t) => cats.includes(t))) return false;
      }
      if (filters.token.length) {
        const tokenStr = normalize(
          [
            u?.token_brand_name,
            u?.token_name,
            u?.token?.symbol,
            u?.token?.ticker,
            u?.tokenSymbol,
            u?.tokenTicker,
          ]
            .filter(Boolean)
            .join(" ")
        );
        if (!filters.token.every((t) => tokenStr.includes(t))) return false;
      }

      if (free.length) {
        const hay = buildHaystack(u);
        if (!free.every((t) => hay.includes(t))) return false;
      }

      return true;
    },
    [deferredSearch]
  );

  const filtered = useMemo(
    () => talents.filter(matchesCategory).filter(matchesSearch),
    [talents, matchesCategory, matchesSearch]
  );

  // ---- pagination handlers ----
  const canPrev = Boolean(pagination?.hasPrev);
  const canNext = Boolean(pagination?.hasNext);
  const pages = pagination?.pages || 1;

  const goFirst = () => setPage(1);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(pages, p + 1));
  const goLast = () => setPage(pages);

  return (
    <section className="bg-[#171717] min-h-screen text-white px-4 sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
      <div className="py-12 2xl:py-16 container mx-auto">
        {/* Top controls */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Category (derived) */}
            <div className="relative w-full md:w-auto" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full md:w-72 px-4 py-3 rounded-lg bg-[#2d2d2d] border border-gray-600 text-white"
              >
                <span className="flex items-center">
                  {category
                    ? ICONS[category] ?? <FaUserTie className="mr-2" />
                    : null}
                  {category || "All categories"}
                </span>
                <FaChevronDown
                  className={`ml-2 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute z-50 mt-2 bg-[#2d2d2d] rounded-md w-full md:w-72 border border-gray-700 overflow-hidden max-h-80 overflow-y-auto">
                  {/* All */}
                  <div
                    onClick={() => selectCategory(null)}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
                      !category ? "text-yellow-400" : ""
                    }`}
                  >
                    <span className="flex items-center">
                      <FaUserTie className="mr-2" />
                      All categories
                    </span>
                    {/* <span className="text-xs bg-[#1f1f1f] border border-gray-700 px-2 py-0.5 rounded">
                      {totalWithAnyCategory || 0}
                    </span> */}
                  </div>

                  {/* Each category with count */}
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => selectCategory(cat)}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
                        category === cat ? "text-yellow-400" : ""
                      }`}
                    >
                      <span className="flex items-center">
                        {ICONS[cat] ?? <FaUserTie className="mr-2" />}
                        {cat}
                      </span>
                      {/* <span className="text-xs bg-[#1f1f1f] border border-gray-700 px-2 py-0.5 rounded">
                        {categoryCounts.get(cat) || 0}
                      </span> */}
                    </div>
                  ))}

                  {/* No category talents quick filter (optional) */}
                  {totalWithAnyCategory < talents.length && (
                    <div
                      onClick={() => selectCategory("__none__")}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
                        category === "__none__" ? "text-yellow-400" : ""
                      }`}
                    >
                      <span className="flex items-center">
                        <FaUserTie className="mr-2" />
                        No Category
                      </span>
                      {/* <span className="text-xs bg-[#1f1f1f] border border-gray-700 px-2 py-0.5 rounded">
                        {talents.length - (totalWithAnyCategory || 0)}
                      </span> */}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-[40%] lg:w-[30%]">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={onSearchChange}
                onKeyDown={onSearchKeyDown}
                placeholder="Search Talent…"
                aria-label="Search talents by name, email, token, or category"
                className="w-full h-11 pl-4 pr-20 rounded-lg bg-[#2d2d2d] border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
              />
              {search ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
                  aria-label="Clear search"
                  title="Clear"
                >
                  <FaTimes className="text-gray-400 hover:text-gray-300" />
                </button>
              ) : null}
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-400 uppercase">
            {category && category !== "__none__"
              ? `${category} Talents`
              : category === "__none__"
              ? "Talents Without Category"
              : "Futures"}
          </h2>
          <p className="text-gray-400 mt-2">
            {isLoading
              ? "Loading talents…"
              : isError
              ? error?.data?.message ||
                error?.error ||
                "Failed to load talents."
              : ""}
          </p>
        </div>

        {/* Card Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-gray-400">Loading…</div>
        ) : isError ? (
          <div className="py-12 text-center text-red-300">
            {error?.data?.message || error?.error || "Something went wrong."}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No matching talents found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filtered.map((u) => {
              const img = firstImageUrl(u);
              const cats = userCategories(u);
              if (category === "__none__" && cats.length > 0) return null;

              const brand =
                u?.token_brand_name ||
                u?.token_name ||
                u?.token?.symbol ||
                u?.token?.ticker ||
                u?.tokenSymbol ||
                u?.tokenTicker ||
                "—";

              return (
                <Link
                  to={`/talent-profile/${u?._id}`}
                  key={u._id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1f1f1f] to-[#141414] border border-white/10 hover:border-[#a38b41]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#a38b41]/20 flex flex-col"
                >
                  {/* Image area */}
                  <div className="relative w-full aspect-[4/5] bg-[#0a0a0a] overflow-hidden">
                    {img ? (
                      <img
                        src={imgSrc(img)}
                        alt={u?.name || "talent"}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl text-gray-600 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a]">
                        {u?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    {/* Gradient overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Categories chips */}
                    {cats.length > 0 && (
                      <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5">
                        {cats.slice(0, 2).map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-black/60 backdrop-blur border border-white/10 text-[#d4c374]"
                          >
                            {c}
                          </span>
                        ))}
                        {cats.length > 2 && (
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-black/60 backdrop-blur border border-white/10 text-gray-300">
                            +{cats.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Name + brand pinned to bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-lg font-bold text-white leading-tight truncate">
                        {u?.name || "—"}
                      </div>
                      <div className="mt-1 text-xs text-[#d4c374] uppercase tracking-wider truncate">
                        {brand}
                      </div>
                    </div>
                  </div>

                  {/* Footer / categories full list */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="text-xs text-gray-400">
                      <span className="text-gray-500 uppercase tracking-wider mr-2">
                        Category
                      </span>
                      <span className="text-gray-200">
                        {cats.length ? cats.join(", ") : "—"}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <span className="inline-flex items-center justify-center w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#a38b41]/10 text-[#d4c374] border border-[#a38b41]/30 group-hover:bg-[#a38b41] group-hover:text-black transition-colors">
                        View Profile
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-xs text-gray-400">
              Page {pagination.page} of {pagination.pages} • Total{" "}
              {pagination.total}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goFirst}
                disabled={!canPrev}
                className="px-3 py-2 rounded bg-[#2d2d2d] border border-gray-700 disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={goPrev}
                disabled={!canPrev}
                className="px-3 py-2 rounded bg-[#2d2d2d] border border-gray-700 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-2 text-sm">
                {pagination.page} / {pagination.pages}
              </span>
              <button
                onClick={goNext}
                disabled={!canNext}
                className="px-3 py-2 rounded bg-[#2d2d2d] border border-gray-700 disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={goLast}
                disabled={!canNext}
                className="px-3 py-2 rounded bg-[#2d2d2d] border border-gray-700 disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
