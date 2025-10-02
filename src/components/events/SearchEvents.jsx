// components/events/SearchEvents.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { truncate } from "../../utils/truncate";
import { useDebounce } from "use-debounce";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop";

const MIN_CHARS = 4;
const DEBOUNCE_MS = 600;

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
  isActive = false,
  results = [],
  resultsLoading = false,
  resultsError = null,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [openAfterSubmit, setOpenAfterSubmit] = useState(false);

  // debounce typed value
  const [qDebounced] = useDebounce(searchValue, DEBOUNCE_MS);

  // keep stable refs to parent handlers (avoid effect re-firing on identity change)
  const onSearchRef = useRef(onSearch);
  const onClearRef = useRef(onClear);
  useEffect(() => void (onSearchRef.current = onSearch), [onSearch]);
  useEffect(() => void (onClearRef.current = onClear), [onClear]);

  // de-dupe guard in case something still causes a re-run
  const lastFiredRef = useRef("");

  const wrapperRef = useRef(null);
  const trimmed = searchValue.trim();
  const belowMin = trimmed.length > 0 && trimmed.length < MIN_CHARS;

  // Debounced auto-search
  useEffect(() => {
    const q = qDebounced.trim();

    if (!q) {
      lastFiredRef.current = "";
      onClearRef.current?.();
      setOpenAfterSubmit(false);
      return;
    }
    if (q.length < MIN_CHARS) return;

    // prevent duplicate trigger for the same q
    if (lastFiredRef.current === q) return;
    lastFiredRef.current = q;

    setOpenAfterSubmit(true);
    onSearchRef.current?.(q);
  }, [qDebounced]); // <- only depends on debounced value

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (trimmed.length < MIN_CHARS) return;
      setOpenAfterSubmit(true);
      // no direct onSearch call here (debounced effect handles it)
    },
    [trimmed]
  );

  const clearSearch = useCallback((e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setSearchValue("");
    setOpenAfterSubmit(false);
    lastFiredRef.current = "";
    onClearRef.current?.();

    const input = wrapperRef.current?.querySelector("input[type='text']");
    input?.focus?.();
  }, []);

  const handleInputBlur = (e) => {
    const form = e.currentTarget.closest("form");
    setTimeout(() => {
      if (!form.contains(document.activeElement)) {
        setIsFocused(false);
        // keep dropdown if already opened
      }
    }, 100);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (searchValue) {
          clearSearch(e);
        } else {
          setIsFocused(false);
          setOpenAfterSubmit(false);
        }
      }
    },
    [searchValue, clearSearch]
  );

  const showDropdown = useMemo(() => {
    return (
      belowMin ||
      ((openAfterSubmit || isActive) &&
        (resultsLoading || resultsError || results.length > 0))
    );
  }, [
    belowMin,
    openAfterSubmit,
    isActive,
    resultsLoading,
    resultsError,
    results.length,
  ]);

  return (
    <section className="grid grid-cols-2 items-center gap-10 w-full mb-[40px]">
      <h2
        className="text-2xl font-bold"
        style={{
          background: `linear-gradient(to right, #d4c374)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Events
      </h2>

      <div>
        {" "}
        <h2 className="text-2xl font-bold uppercase text-white mb-6 text-center" />
        <div className="" ref={wrapperRef}>
          <div className="relative z-20">
            <form onSubmit={handleSearch} className="group" role="search">
              <div
                className={`
                relative overflow-hidden rounded-full transition-all duration-500 ease-out
                ${
                  isFocused
                    ? "bg-white/10 border border-[#a38b41]/40 shadow-2xl shadow-[#a38b41]/20 scale-[1.02]"
                    : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8"
                }
              `}
              >
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-[#a38b41]/10 via-transparent to-[#a38b41]/10 
                  transition-opacity duration-500 pointer-events-none ${
                    isFocused ? "opacity-100" : "opacity-0"
                  }
                `}
                />

                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  placeholder={`Search events`}
                  className="relative z-10 w-full h-14 sm:h-16 bg-[#fff] pl-5 pr-24 text-black placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                  {searchValue && (
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={clearSearch}
                      className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-full hover:bg-white/10 active:scale-95 z-30"
                      title="Clear"
                      aria-label="Clear search"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={trimmed.length < MIN_CHARS || isSearching}
                    onMouseDown={(e) => e.preventDefault()}
                    className={`
                    group/search relative overflow-hidden px-8 py-2 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-2 z-30
                    ${
                      trimmed.length >= MIN_CHARS && !isSearching
                        ? "bg-gradient-to-r from-[#a38b41] cursor-pointer via-[#c2ab67] to-[#e6ca7c] text-black shadow-lg hover:shadow-xl hover:shadow-[#a38b41]/30 hover:scale-110 active:scale-95"
                        : "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                    }
                  `}
                    title={isSearching ? "Searching..." : "Search"}
                  >
                    <FaSearch size={11} className="relative" />
                    <span className="relative hidden sm:inline">
                      {isSearching ? "Searching…" : "Enter"}
                    </span>
                    {trimmed.length >= MIN_CHARS && !isSearching && (
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/search:translate-x-full transition-transform duration-700" />
                    )}
                  </button>
                </div>

                <div
                  className={`
                  absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent 
                  transition-transform duration-1000 pointer-events-none ${
                    isFocused ? "translate-x-full" : ""
                  }
                `}
                />
              </div>
            </form>

            {showDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl  overflow-hidden">
                {belowMin && (
                  <div className="p-3 text-xs text-gray-400">
                    Type at least {MIN_CHARS} characters to search.
                  </div>
                )}

                {!belowMin && resultsLoading && (
                  <div className="p-3 text-xs text-[#a38b41]">Searching…</div>
                )}

                {!belowMin && !resultsLoading && resultsError && (
                  <div className="p-3 text-xs text-red-400">{resultsError}</div>
                )}

                {!belowMin &&
                  !resultsLoading &&
                  !resultsError &&
                  results.length > 0 && (
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

                {!belowMin &&
                  !resultsLoading &&
                  !resultsError &&
                  results.length === 0 && (
                    <div className="p-3 text-xs text-gray-400">
                      No results found.
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchEvents;
