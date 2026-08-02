import { useState } from "react";
import {
  FaArrowLeft,
} from "react-icons/fa";
import { useGetTalentOverviewQuery } from "../../app/authApi";
import { useParams, Link } from "react-router-dom";
import ImageSwitchForFanInAdmin from "./ImageSwitchForFanInAdmin";

const FanProfileForAdmin = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetTalentOverviewQuery(id, {
    skip: !id,
  });
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      // Add your search logic here
    }
  };

  const clearSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchValue("");
    // Keep focus on input after clearing
    const input = e.target.closest("form").querySelector("input");
    if (input) {
      input.focus();
    }
  };

  const handleInputBlur = (e) => {
    // Only blur if the click is outside the form
    const form = e.currentTarget.closest("form");
    setTimeout(() => {
      if (!form.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 100);
  };

  const handleRecalculate = () => {
    console.log("Recalculating values...");
    // Add recalculation logic here
  };

  const handleTradingChart = () => {
    console.log("Opening trading chart...");
    // Add chart logic here
  };

  const handleImportFunds = () => {
    console.log("Importing more funds...");
    // Add import funds logic here
  };

  return (
    <section className="w-full bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="container mt-10 lg:mt-16 2xl:mt-20">
        {/* Back to Dashboard */}
        <div className="">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold
                       bg-white/10 border border-white/20 text-white backdrop-blur
                       hover:bg-white/15 hover:border-white/30 transition active:scale-95"
          >
            <FaArrowLeft className="text-white/90" />
            Back to Dashboard
          </Link>
        </div>
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 items-stretch">
          {/* <div className="w-full xl:w-80 2xl:w-96">
            <form onSubmit={handleSearch} className="relative group">
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
               
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-[#a38b41]/10 via-transparent to-[#a38b41]/10 
                  transition-opacity duration-500 pointer-events-none z-5 ${
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
                  placeholder="Search"
                  className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
                />

         
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                
                  {searchValue && (
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()} 
                      onClick={clearSearch}
                      className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10 active:scale-95 z-30"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}

               
                  <button
                    type="submit"
                    disabled={!searchValue.trim()}
                    onMouseDown={(e) => e.preventDefault()} 
                    className={`
                      group/search relative overflow-hidden px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 flex items-center gap-2 z-30
                      ${
                        searchValue.trim()
                          ? "bg-gradient-to-r from-[#a38b41] cursor-pointer via-[#c2ab67] to-[#e6ca7c] text-black shadow-lg hover:shadow-xl hover:shadow-[#a38b41]/30 hover:scale-110 active:scale-95"
                          : "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                      }
                    `}
                  >
                    <FaSearch size={11} className="relative z-10" />
                    <span className="relative z-10 hidden sm:inline">
                      Enter
                    </span>

                    {searchValue.trim() && (
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/search:translate-x-full transition-transform duration-700" />
                    )}
                  </button>
                </div>

        
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
          </div> */}
        </div>
      </div>
      <ImageSwitchForFanInAdmin userData={data} />
    </section>
  );
};

export default FanProfileForAdmin;
