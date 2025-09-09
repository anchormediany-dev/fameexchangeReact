import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useCallback,
  useDeferredValue,
} from "react";
import { useGetTalentQuery } from "../../app/authApi";
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

const userCategories = (u) =>
  Array.isArray(u?.talent)
    ? u.talent.map((t) => t?.category).filter(Boolean)
    : [];

const firstImageUrl = (u) => {
  if (u?.image) return u.image;
  const arr = u?.images;
  if (!Array.isArray(arr) || arr.length === 0) return null;

  const withFile = arr.find((x) => x && typeof x === "object" && x.fileUrl);
  if (withFile) return withFile.fileUrl;

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

/** Build a searchable haystack for a user */
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

/** Advanced query parsing: name: , email: , token: , cat: */
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

  // Base fetch (kept simple; we filter client-side as you type)
  const { data, isLoading, isError, error } = useGetTalentQuery();

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const talents = Array.isArray(data?.taleUsers) ? data.taleUsers : [];

  const categories = useMemo(() => {
    const set = new Set();
    for (const u of talents) {
      for (const c of userCategories(u)) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [talents]);

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
    // keep focus for quick retyping
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
    (c) => dispatch({ type: "SET_CATEGORY", payload: c }),
    []
  );

  // Smooth UI while typing
  const deferredSearch = useDeferredValue(search);

  /* ---------- filters ---------- */
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

      // scoped filters
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

      // free terms across entire haystack
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

  return (
    <section className="bg-[#171717] min-h-screen text-white px-4 sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
      <div className="py-12 2xl:py-16 container mx-auto">
        {/* Top controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          {/* Category (derived) */}
          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-lg bg-[#2d2d2d] border border-gray-600 text-white"
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
              <div className="absolute z-50 mt-2 bg-[#2d2d2d] rounded-md w-full md:w-64 border border-gray-700 overflow-hidden max-h-80 overflow-y-auto">
                <div
                  onClick={() => selectCategory(null)}
                  className={`px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
                    !category ? "text-yellow-400" : ""
                  }`}
                >
                  All categories
                </div>

                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => selectCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
                      category === cat ? "text-yellow-400" : ""
                    }`}
                  >
                    {ICONS[cat] ?? <FaUserTie className="mr-2" />}
                    {cat}
                  </div>
                ))}
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
              aria-label="Search talents by name, email, or token"
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

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-400 uppercase">
            {category ? `${category} Talents` : "All Talents"}
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

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-xl">
          {/* fixed: 4 columns (header & rows match) */}
          <div className="grid grid-cols-4 text-sm font-semibold bg-[#2d2d2d] text-gray-300 py-4 px-6">
            <div>TALENT</div>
            <div className="text-center">EMAIL</div>
            <div className="text-center">TOKEN BRAND</div>
            <div className="text-center">CATEGORIES</div>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-gray-400">Loading…</div>
          ) : isError ? (
            <div className="py-8 text-center text-red-300">
              {error?.data?.message || error?.error || "Something went wrong."}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No matching talents found.
            </div>
          ) : (
            filtered.map((u) => {
              const img = firstImageUrl(u);
              const cats = userCategories(u);
              return (
                <div
                  key={u._id}
                  className="grid grid-cols-4 items-center py-4 px-6 border-t border-gray-700 hover:bg-[#1f1f1f] transition"
                >
                  {/* TALENT */}
                  <div className="flex items-center gap-4">
                    {img ? (
                      <img
                        src={img}
                        alt={u?.name || "talent"}
                        className="w-10 h-10 rounded-full object-cover border border-gray-600"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#2d2d2d] border border-gray-600 flex items-center justify-center text-sm">
                        {u?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <div className="font-bold">{u?.name || "—"}</div>
                      <div className="text-xs text-gray-400">
                        {u?.role || "—"}
                      </div>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="text-center text-gray-200 text-sm break-all">
                    {u?.email || "—"}
                  </div>

                  {/* TOKEN BRAND */}
                  <div className="text-center text-white text-sm">
                    {u?.token_brand_name ||
                      u?.token_name ||
                      u?.token?.symbol ||
                      u?.token?.ticker ||
                      u?.tokenSymbol ||
                      u?.tokenTicker ||
                      "—"}
                  </div>

                  {/* CATEGORIES */}
                  <div className="text-center text-gray-200 text-sm">
                    {cats.length ? cats.join(", ") : "—"}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
