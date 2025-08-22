import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { truncate } from "../../utils/truncate";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop";

const fmt = (s) =>
  s
    ? new Date(s).toLocaleString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const SearchEvents = ({
  onSearch,
  onClear,
  isSearching = false,
  isActive = false, // true after first submit (from parent)
  results = [],
  resultsLoading = false,
  resultsError = null,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [openAfterSubmit, setOpenAfterSubmit] = useState(false); // keep dropdown open after Enter

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setOpenAfterSubmit(true);
    await onSearch?.(searchValue);
  };

  const clearSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchValue("");
    setOpenAfterSubmit(false);
    onClear?.();
    const input = e.target.closest("form").querySelector("input");
    if (input) input.focus();
  };

  const handleInputBlur = (e) => {
    const form = e.currentTarget.closest("form");
    setTimeout(() => {
      if (!form.contains(document.activeElement)) {
        setIsFocused(false);
        // DO NOT close openAfterSubmit here; we want dropdown to stay after Enter
      }
    }, 100);
  };

  // Show dropdown only after Enter (or while focused after submit)
  const showDropdown =
    (openAfterSubmit || isActive) &&
    (resultsLoading || resultsError || results.length > 0);

  return (
    <section className="flex justify-between items-center">
      <h2 className="text-2xl font-bold uppercase text-white mb-6 text-center">
        {/* Request your{" "} */}
        <span className="font-bold text-primary2">All Events</span>
      </h2>
      <div className="lg:w-[25%] mb-3">
        {/* WRAPPER to avoid clipping */}
        <div className="relative z-50">
          <form onSubmit={handleSearch} className="group">
            {/* This inner box can stay overflow-hidden for design */}
            <div
              className={`
                relative overflow-hidden rounded-2xl transition-all duration-500 ease-out
                ${
                  isFocused
                    ? "bg-white/10 border border-[#a38b41]/40 shadow-2xl shadow-[#a38b41]/20 scale-[1.02]"
                    : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8"
                }
              `}
            >
              {/* Animated background gradient */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-r from-[#a38b41]/10 via-transparent to-[#a38b41]/10 
                  transition-opacity duration-500 pointer-events-none z-5 ${
                    isFocused ? "opacity-100" : "opacity-0"
                  }
                `}
              />

              {/* Search Input */}
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={handleInputBlur}
                placeholder="Search"
                className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
              />

              {/* Search Actions */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                {/* Clear Button */}
                {searchValue && (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                    onClick={clearSearch}
                    className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10 active:scale-95 z-30"
                    title="Clear"
                  >
                    <FaTimes size={12} />
                  </button>
                )}

                {/* Search Button (Enter) */}
                <button
                  type="submit"
                  disabled={!searchValue.trim() || isSearching}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  className={`
                    group/search relative overflow-hidden px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 flex items-center gap-2 z-30
                    ${
                      searchValue.trim() && !isSearching
                        ? "bg-gradient-to-r from-[#a38b41] cursor-pointer via-[#c2ab67] to-[#e6ca7c] text-black shadow-lg hover:shadow-xl hover:shadow-[#a38b41]/30 hover:scale-110 active:scale-95"
                        : "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                    }
                  `}
                  title={isSearching ? "Searching..." : "Search"}
                >
                  <FaSearch size={11} className="relative z-10" />
                  <span className="relative z-10 hidden sm:inline">
                    {isSearching ? "Searching…" : "Enter"}
                  </span>

                  {searchValue.trim() && !isSearching && (
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/search:translate-x-full transition-transform duration-700" />
                  )}
                </button>
              </div>

              {/* Search bar shine effect */}
              <div
                className={`
                  absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent 
                  transition-transform duration-1000 pointer-events-none z-5 ${
                    isFocused ? "translate-x-full" : ""
                  }
                `}
              />
            </div>
          </form>

          {/* DROPDOWN lives OUTSIDE the overflow-hidden box */}
          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl  overflow-hidden z-50">
              {/* loading */}
              {resultsLoading && (
                <div className="p-3 text-xs text-[#a38b41]">Searching…</div>
              )}

              {/* error */}
              {!resultsLoading && resultsError && (
                <div className="p-3 text-xs text-red-400">{resultsError}</div>
              )}

              {/* results */}
              {!resultsLoading && !resultsError && results.length > 0 && (
                <ul className="max-h-80 overflow-auto divide-y divide-white/5">
                  {results.map((r) => (
                    <li key={r.id} className="bg-transparent">
                      <Link
                        to={`/event-details/${r.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                      >
                        <img
                          src={r.cover || FALLBACK_COVER}
                          alt=""
                          className="w-12 h-12 rounded-md object-cover border border-[#333]"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="text-sm text-white font-semibold truncate">
                            {r.name}
                          </div>
                          <div className="text-[11px] text-gray-400 truncate">
                            {fmt(r.datetime)}
                            {r.location ? ` · ${r.location}` : ""}
                          </div>
                          {r.details && (
                            <div className="text-[11px] text-gray-500">
                              {truncate(r.details, 100)}
                            </div>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchEvents;
