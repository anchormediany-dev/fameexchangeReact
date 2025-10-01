import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { imgSrc } from "../../utils/imgSrc";
const SearchTalents = ({
  usersData,
  isUsersLoading,
  refetchUsers,
  setSelectedSearchUser,
  setIsTalentName,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUserData");
      if (!raw) return;

      const parsed = JSON.parse(raw);
      // Your payload shows: { success, data: { profile, sessions, ... } }
      const profile = parsed?.data?.profile || parsed?.profile || null;

      const role = (profile?.role || profile?.usertype || "")
        .toString()
        .toUpperCase();

      if (profile?._id && role === "TALENT") {
        // Prefill input + mark as selected
        setSearchValue(profile.name || "");
        setIsTalentName?.(profile.name || "");
        setSelectedSearchUser?.(profile._id);
        setShowResults(false);
      }
    } catch (e) {
      // ignore JSON errors silently
    }
    // Run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchValue(value);

    // Filter users with role "TALENT"
    const filteredUsers = usersData?.filter((user) => user.role === "TALENT");

    if (value.trim()) {
      // Apply search filter to only "TALENT" users
      const results = filteredUsers.filter((talent) =>
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
    setSearchValue(talent.name);  
    setIsTalentName(talent.name);
    setSearchResults([]);
    setShowResults(false);
    setSelectedSearchUser(talent?._id);
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
              onBlur={() => setTimeout(() => setShowResults(false), 200)} // Adjusted delay
              placeholder="Search talents..."
              className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
            />

            {/* Search Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
              {searchValue && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    setIsTalentName("");
                    setSearchResults([]);
                    setShowResults(false);
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

          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-50 mt-2 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
              {searchResults.map((talent) => (
                <div
                  key={talent._id}
                  className="p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-3"
                  onClick={() => handleSelectTalent(talent)}
                >
                  <div className="max-w-full">
                    <img
                      src={imgSrc(talent?.images[0]?.fileUrl)}
                      alt={"Talent Image"}
                      className="rounded-full w-8 h-8 object-cover mx-auto mb-1"
                    />
                    {/* <p className="text-center">{friend.friendName}</p> */}
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

          {/* If no results found */}
          {showResults && searchResults.length === 0 && (
            <div className="p-3 text-gray-400">No talents found</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchTalents;
