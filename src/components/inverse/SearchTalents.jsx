import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import talents from "../../data/talentData";
const SearchTalents = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Slight timeout ensures DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim()) {
      const results = talents.filter((talent) =>
        talent.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };
  const handleSelectTalent = (talent) => {
    setSelectedTalent(talent);
    setSearchValue("");
    setShowResults(false);
  };
  return (
    <section className="flex justify-end items-center">
      <div className="lg:w-[25%] mb-3 relative">
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              placeholder="Search talents..."
              className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
            />

            {/* Search Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchValue && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    setSearchResults([]);
                  }}
                  className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10 active:scale-95 z-30"
                >
                  <FaTimes size={12} />
                </button>
              )}
              <div className="p-2 text-gray-400">
                <FaSearch size={12} />
              </div>
            </div>
          </div>

          {showResults && searchResults.length > 0 && (
            <div className="absolute z-50 mt-2 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
              {searchResults.map((talent) => (
                <div
                  key={talent.id}
                  className="p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-3"
                  onClick={() => handleSelectTalent(talent)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                    {talent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white">{talent.name}</div>
                    {/* <div className="text-xs text-gray-400">
                      {talent.category} • {talent.price}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchTalents;
