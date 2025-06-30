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
import { useState, useRef, useEffect } from "react";
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
  FaChild,
  FaLaughSquint,
} from "react-icons/fa";
import { motion, useInView, useAnimation } from "framer-motion";

const FutureTalents = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Musicians");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const talentCategories = [
    { name: "Musicians", icon: <FaMusic className="mr-2" /> },
    { name: "Athletes", icon: <FaRunning className="mr-2" /> },
    { name: "Actors", icon: <FaFilm className="mr-2" /> },
    { name: "Models", icon: <FaUserTie className="mr-2" /> },
    { name: "Entertainers", icon: <FaMicrophone className="mr-2" /> },
    { name: "Influencers", icon: <FaInstagram className="mr-2" /> },
    { name: "Dancers", icon: <FaChild className="mr-2" /> },
    { name: "Comedians", icon: <FaLaughSquint className="mr-2" /> },
  ];

  const talentData = {
    Musicians: [
      {
        name: "APEX",
        fullName: "Digital Artist",
        talentName: "John Doe",
        socialCalculation: 20000,
        trading: "Active",
        sponsored: "Yes",
        image:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        name: "NOVA",
        fullName: "Pop Sensation",
        talentName: "Jane Smith",
        socialCalculation: 150000,
        trading: "Active",
        sponsored: "No",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      {
        name: "ECHO",
        fullName: "Indie Musician",
        talentName: "Emily Carter",
        socialCalculation: 8000,
        trading: "Inactive",
        sponsored: "No",
        image:
          "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww",
      },
    ],
    Athletes: [
      {
        name: "BOLT",
        fullName: "Track Sprinter",
        talentName: "Usain Johnson",
        socialCalculation: 45000,
        trading: "Active",
        sponsored: "Yes",
        image:
          "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXRobGV0ZXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "SWISH",
        fullName: "Basketball Player",
        talentName: "Michael Jordan Jr.",
        socialCalculation: 120000,
        trading: "Active",
        sponsored: "Yes",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
    Actors: [
      {
        name: "STAR",
        fullName: "Film Actor",
        talentName: "Leonardo Parker",
        socialCalculation: 75000,
        trading: "Active",
        sponsored: "Yes",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWN0b3J8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "DRAMA",
        fullName: "Theater Actor",
        talentName: "Sarah Williams",
        socialCalculation: 32000,
        trading: "Inactive",
        sponsored: "No",
        image:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
    // Add similar data for other categories...
    Models: [
      {
        name: "POSE",
        fullName: "Fashion Model",
        talentName: "Alex Morgan",
        socialCalculation: 85000,
        trading: "Active",
        sponsored: "Yes",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vZGVsfGVufDB8fDB8fHww",
      },
    ],
    Entertainers: [
      {
        name: "MAGIC",
        fullName: "Stage Magician",
        talentName: "David Copper",
        socialCalculation: 42000,
        trading: "Active",
        sponsored: "No",
        image:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hZ2ljaWFufGVufDB8fDB8fHww",
      },
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const clearSearch = () => setSearchValue("");

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setShowCategoryDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const tableRowVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.2 + i * 0.1 },
    }),
  };

  const filteredTalents =
    talentData[selectedCategory]?.filter((talent) =>
      [talent.name, talent.fullName, talent.talentName]
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) || [];

  return (
    <section className="bg-[#171717] min-h-screen text-white px-4 sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20 ">
      <div className="py-12 2xl:py-16 container mx-auto" ref={sectionRef}>
        {/* Category + Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          {/* Category Dropdown */}
          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center justify-between w-full md:w-60 px-4 py-3 rounded-lg bg-[#2d2d2d] border border-gray-600 text-white"
            >
              <span className="flex items-center">
                {
                  talentCategories.find((c) => c.name === selectedCategory)
                    ?.icon
                }
                {selectedCategory}
              </span>
              <FaChevronDown
                className={`ml-2 transition-transform ${
                  showCategoryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {showCategoryDropdown && (
              <div className="absolute z-50 mt-2 bg-[#2d2d2d] rounded-md w-full md:w-60 border border-gray-700 overflow-hidden">
                {talentCategories.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
                      selectedCategory === cat.name ? "text-yellow-400" : ""
                    }`}
                  >
                    {cat.icon}
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative w-full md:w-[40%] lg:w-[30%]"
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={`Search ${selectedCategory.toLowerCase()}...`}
              className="w-full px-4 py-3 rounded-lg bg-[#2d2d2d] border border-gray-600 placeholder-gray-400 text-white"
            />
            {searchValue && (
              <FaTimes
                className="absolute right-10 top-3 text-gray-400 cursor-pointer"
                onClick={clearSearch}
              />
            )}
            <button type="submit">
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </button>
          </form>
        </div>

        {/* Title */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          animate={controls}
          className="text-center mb-6"
        >
          <h2 className="text-4xl font-bold text-yellow-400 uppercase">
            Future {selectedCategory}
          </h2>
          <p className="text-gray-400 mt-2">
            Discover and support rising {selectedCategory.toLowerCase()}!
          </p>
        </motion.div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-xl">
          <div className="grid grid-cols-5 text-sm font-semibold bg-[#2d2d2d] text-gray-300 py-4 px-6">
            <div>TALENT TOKEN NAME</div>
            <div className="text-center">TALENT NAME</div>
            <div className="text-center">SOCIAL CALCULATION</div>
            <div className="text-center">TRADING</div>
            <div className="text-center">SPONSORED</div>
          </div>

          {filteredTalents.map((talent, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={tableRowVariant}
              initial="hidden"
              animate={controls}
              className="grid grid-cols-5 items-center py-4 px-6 border-t border-gray-700 hover:bg-[#1f1f1f] transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-600"
                />
                <div>
                  <div className="font-bold">{talent.name}</div>
                  <div className="text-xs text-gray-400">{talent.fullName}</div>
                </div>
              </div>
              <div className="text-center">{talent.talentName}</div>
              <div className="text-center font-semibold text-white">
                {talent.socialCalculation.toLocaleString()}
              </div>
              <div className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    talent.trading === "Active"
                      ? "bg-green-600/20 text-green-400 border border-green-500/40"
                      : "bg-red-600/20 text-red-400 border border-red-500/40"
                  }`}
                >
                  {talent.trading}
                </span>
              </div>
              <div className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    talent.sponsored === "Yes"
                      ? "bg-yellow-400/20 text-yellow-300 border border-yellow-500/40"
                      : "bg-gray-500/20 text-gray-300 border border-gray-500/40"
                  }`}
                >
                  {talent.sponsored}
                </span>
              </div>
            </motion.div>
          ))}

          {filteredTalents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No matching {selectedCategory.toLowerCase()} found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FutureTalents;
