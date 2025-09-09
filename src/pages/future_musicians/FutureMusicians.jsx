// import { useState, useRef, useEffect } from "react";
// import { FaSearch, FaTimes } from "react-icons/fa";
// import { motion, useInView, useAnimation } from "framer-motion";

// const FutureMusicians = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchValue.trim()) {
//       console.log("Searching for:", searchValue);
//     }
//   };

//   const clearSearch = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setSearchValue("");
//   };

//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   // Animation variants
//   const fadeInUpVariant = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   const tableRowVariant = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.6,
//         delay: 0.2 + i * 0.1,
//         ease: "easeOut",
//       },
//     }),
//   };

//   const talentTokenData = [
//     {
//       name: "APEX",
//       fullName: "Digital Artist",
//       talentName: "John Doe",
//       socialCalculation: 20000,
//       trading: "Active",
//       sponsored: "Yes",
//       image:
//         "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       name: "NOVA",
//       fullName: "Pop Sensation",
//       talentName: "Jane Smith",
//       socialCalculation: 150000,
//       trading: "Active",
//       sponsored: "No",
//       image:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       name: "ECHO",
//       fullName: "Indie Musician",
//       talentName: "Emily Carter",
//       socialCalculation: 8000,
//       trading: "Inactive",
//       sponsored: "No",
//       image:
//         "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww",
//     },
//     {
//       name: "FLUX",
//       fullName: "Electronic Producer",
//       talentName: "Liam Scott",
//       socialCalculation: 12000,
//       trading: "Active",
//       sponsored: "Yes",
//       image:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       name: "VIBE",
//       fullName: "R&B Artist",
//       talentName: "Ava Brown",
//       socialCalculation: 32000,
//       trading: "Inactive",
//       sponsored: "No",
//       image:
//         "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
//     },
//     {
//       name: "SYNTH",
//       fullName: "Synthwave Producer",
//       talentName: "Noah Lee",
//       socialCalculation: 27500,
//       trading: "Active",
//       sponsored: "Yes",
//       image:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
//     },
//   ];

//   return (
//     <section className="w-full z-10 bg-[#171717] py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8 min-h-screen pt-20 md:pt-24">
//       <div className="2xl:gap-16 gap-12 px-4 container mx-auto sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20 z-10">
//         {/* Modern Compact Search Bar */}
//         <section className="flex justify-end items-center">
//           <div className="lg:w-[25%] mb-3">
//             <div className="relative group">
//               <div
//                 className={`
//                   relative overflow-hidden rounded-2xl transition-all duration-500 ease-out
//                   ${
//                     isFocused
//                       ? "bg-white/10 border border-yellow-400/40 shadow-2xl shadow-yellow-400/20 scale-[1.02]"
//                       : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8"
//                   }
//                 `}
//               >
//                 {/* Animated background gradient */}
//                 <div
//                   className={`
//                     absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10
//                     transition-opacity duration-500 pointer-events-none z-5 ${
//                       isFocused ? "opacity-100" : "opacity-0"
//                     }
//                   `}
//                 />

//                 {/* Search Input */}
//                 <input
//                   type="text"
//                   value={searchValue}
//                   onChange={(e) => setSearchValue(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       handleSearch(e);
//                     }
//                   }}
//                   placeholder="Search"
//                   className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
//                 />

//                 {/* Search Actions */}
//                 <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
//                   {/* Clear Button */}
//                   {searchValue && (
//                     <button
//                       type="button"
//                       onClick={clearSearch}
//                       className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10 active:scale-95 z-30"
//                     >
//                       <FaTimes size={12} />
//                     </button>
//                   )}

//                   {/* Search Button */}
//                   <button
//                     type="button"
//                     disabled={!searchValue.trim()}
//                     onClick={handleSearch}
//                     className={`
//                       group/search relative overflow-hidden px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 flex items-center gap-2 z-30
//                       ${
//                         searchValue.trim()
//                           ? "bg-gradient-to-r from-yellow-500 cursor-pointer via-yellow-400 to-yellow-300 text-black shadow-lg hover:shadow-xl hover:shadow-yellow-400/30 hover:scale-110 active:scale-95"
//                           : "bg-gray-600/30 text-gray-500 cursor-not-allowed"
//                       }
//                     `}
//                   >
//                     <FaSearch size={11} className="relative z-10" />
//                     <span className="relative z-10 hidden sm:inline">
//                       Enter
//                     </span>

//                     {/* Button shine effect */}
//                     {searchValue.trim() && (
//                       <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/search:translate-x-full transition-transform duration-700" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Search bar shine effect */}
//                 <div
//                   className={`
//                     absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent
//                     transition-transform duration-1000 pointer-events-none z-5 ${
//                       isFocused ? "translate-x-full" : ""
//                     }
//                   `}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Future Musicians */}
//         <div ref={sectionRef} id="brands" className="">
//           <div className="relative z-10">
//             <motion.h1
//               variants={fadeInUpVariant}
//               initial="hidden"
//               animate={controls}
//               transition={{ delay: 0.2 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center text-[#a38b41] tracking-tight leading-tight"
//             >
//               FUTURE MUSICIANS
//             </motion.h1>

//             {/* Table Container */}
//             <motion.div
//               variants={fadeInUpVariant}
//               initial="hidden"
//               animate={controls}
//               transition={{ delay: 0.3 }}
//               className="overflow-x-auto"
//             >
//               <div className="min-w-[1000px] bg-gradient-to-br from-[#1a1a1a]/90 to-[#252525]/90 backdrop-blur-xl rounded-3xl border border-gray-600/30 overflow-hidden shadow-2xl">
//                 {/* Table Header */}
//                 <div className="grid grid-cols-5 gap-2 md:gap-4 py-5 px-6 bg-gradient-to-r from-[#2d2d2d] via-[#353535] to-[#2d2d2d] text-sm text-gray-200 font-bold border-b border-gray-500/40 backdrop-blur-sm">
//                   <div className="text-left">TALENT TOKEN NAME</div>
//                   <div className="text-center">TALENT NAME</div>
//                   <div className="text-center">SOCIAL CALCULATION</div>
//                   <div className="text-center">TRADING</div>
//                   <div className="text-center">SPONSORED</div>
//                 </div>

//                 {/* Table Body */}
//                 <div className="divide-y divide-gray-700/30">
//                   {talentTokenData.map((token, index) => (
//                     <motion.div
//                       key={index}
//                       custom={index}
//                       variants={tableRowVariant}
//                       initial="hidden"
//                       animate={controls}
//                       whileHover={{
//                         backgroundColor: "rgba(255,255,255,0.08)",
//                         scale: 1.01,
//                         transition: { duration: 0.3 },
//                       }}
//                       className="grid grid-cols-5 gap-4 items-center py-5 px-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
//                     >
//                       {/* Talent Token (Logo + Name) */}
//                       <div className="flex items-center gap-3 md:gap-4">
//                         <motion.div
//                           whileHover={{ scale: 1.1, rotate: 3 }}
//                           transition={{ duration: 0.3 }}
//                           className="relative"
//                         >
//                           <img
//                             src={token.image}
//                             alt={token.name}
//                             className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-600 group-hover:border-yellow-400 transition-all duration-300 shadow-lg"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
//                         </motion.div>
//                         <div className="min-w-0">
//                           <div className="text-sm md:text-base font-bold text-white group-hover:text-yellow-300 transition-colors duration-300 truncate">
//                             {token.name}
//                           </div>
//                           <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 truncate">
//                             {token.fullName}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Talent Name */}
//                       <div className="text-center text-sm md:text-base text-gray-200 group-hover:text-white transition-colors duration-300 font-medium">
//                         {token.talentName}
//                       </div>

//                       {/* Social Calculation */}
//                       <div className="text-center text-sm md:text-base text-gray-200 group-hover:text-white transition-colors duration-300 font-semibold">
//                         {token.socialCalculation.toLocaleString()}
//                       </div>

//                       {/* Trading Status */}
//                       <div className="text-center">
//                         <span
//                           className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
//                             token.trading === "Active"
//                               ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
//                               : "bg-red-500/20 text-red-300 border border-red-500/40"
//                           }`}
//                         >
//                           {token.trading}
//                         </span>
//                       </div>

//                       {/* Sponsored Status */}
//                       <div className="text-center">
//                         <span
//                           className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
//                             token.sponsored === "Yes"
//                               ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
//                               : "bg-gray-500/20 text-gray-300 border border-gray-500/40"
//                           }`}
//                         >
//                           {token.sponsored}
//                         </span>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Modern Floating Background Elements */}
//             <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
//               <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-pulse"></div>
//               <div
//                 className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/4 rounded-full blur-3xl animate-pulse"
//                 style={{ animationDelay: "1s" }}
//               ></div>
//               <div
//                 className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/3 rounded-full blur-3xl animate-pulse"
//                 style={{ animationDelay: "2s" }}
//               ></div>
//               <div
//                 className="absolute top-3/4 left-1/4 w-64 h-64 bg-orange-500/3 rounded-full blur-3xl animate-pulse"
//                 style={{ animationDelay: "3s" }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FutureMusicians;
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

// ---------- reducer & state ----------
const initialState = {
  search: "",
  category: null, // null => show ALL by default (important!)
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

// ---------- helpers ----------
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

const normalize = (s) => (s || "").toString().trim().toLowerCase();

const userCategories = (u) =>
  Array.isArray(u?.talent)
    ? u.talent.map((t) => t?.category).filter(Boolean)
    : [];

const firstImageUrl = (u) => {
  if (u?.image) return u.image;
  const arr = u?.images;
  if (!Array.isArray(arr) || arr.length === 0) return null;

  // common case: { fileUrl: "uploads/..." }
  const withFile = arr.find((x) => x && typeof x === "object" && x.fileUrl);
  if (withFile) return withFile.fileUrl;

  // odd case in sample: object with numeric keys -> reconstruct string
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

// ---------- component ----------
export default function FutureTalents() {
  const [{ search, category, dropdownOpen }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { data, isLoading, isError, error } = useGetTalentQuery();

  const dropdownRef = useRef(null);
  const talents = Array.isArray(data?.taleUsers) ? data.taleUsers : [];

  // unique categories from API (stable & sorted)
  const categories = useMemo(() => {
    const set = new Set();
    for (const u of talents) {
      for (const c of userCategories(u)) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [talents]);

  // click-outside to close dropdown
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

  // handlers
  const onSearchChange = useCallback((e) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  }, []);
  const clearSearch = useCallback(() => dispatch({ type: "CLEAR_SEARCH" }), []);
  const toggleDropdown = useCallback(
    () => dispatch({ type: "TOGGLE_DROPDOWN" }),
    []
  );
  const selectCategory = useCallback(
    (c) => dispatch({ type: "SET_CATEGORY", payload: c }),
    []
  );

  // useDeferredValue to keep UI responsive while typing
  const deferredSearch = useDeferredValue(search);

  // predicates
  const matchesCategory = useCallback(
    (u) => {
      if (!category) return true; // show all by default
      const cats = userCategories(u).map(normalize);
      return cats.includes(normalize(category));
    },
    [category]
  );

  const matchesSearch = useCallback(
    (u) => {
      const q = normalize(deferredSearch);
      if (!q) return true;

      const hay = [
        u?.name,
        u?.email,
        u?.token_brand_name,
        u?.token_name,
        ...userCategories(u),
      ]
        .filter(Boolean)
        .join(" ");

      return normalize(hay).includes(q);
    },
    [deferredSearch]
  );

  // filtered list
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
                {/* “All” – show everything */}
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
              value={search}
              onChange={onSearchChange}
              placeholder={`Search talents...`}
              className="w-full px-4 py-3 rounded-lg bg-[#2d2d2d] border border-gray-600 placeholder-gray-400 text-white"
            />
            {search && (
              <FaTimes
                className="absolute right-10 top-3 text-gray-400 cursor-pointer"
                onClick={clearSearch}
              />
            )}
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
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
              : `
         
              `}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-xl">
          <div className="grid grid-cols-5 text-sm font-semibold bg-[#2d2d2d] text-gray-300 py-4 px-6">
            <div>TALENT</div>
            <div className="text-center">EMAIL</div>
            <div className="text-center">TOKEN BRAND</div>
            <div className="text-center">CATEGORIES</div>
            <div className="text-center">CREATED</div>
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
              const created = u?.createdAt ? new Date(u.createdAt) : null;
              return (
                <div
                  key={u._id}
                  className="grid grid-cols-5 items-center py-4 px-6 border-t border-gray-700 hover:bg-[#1f1f1f] transition"
                >
                  {/* TALENT */}
                  <div className="flex items-center gap-4">
                    {img ? (
                      <img
                        src={img}
                        alt={u.name}
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
                    {u?.token_brand_name || u?.token_name || "—"}
                  </div>

                  {/* CATEGORIES */}
                  <div className="text-center text-gray-200 text-sm">
                    {cats.length ? cats.join(", ") : "—"}
                  </div>

                  {/* CREATED */}
                  <div className="text-center text-gray-300 text-sm">
                    {created ? created.toLocaleDateString() : "—"}
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
