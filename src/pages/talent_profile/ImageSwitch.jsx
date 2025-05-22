import { useState, useRef, useEffect } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaHeart,
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const imageVariants = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face",
];

const actions = [
  {
    label: "Sponsor Talent",
    icon: FaHeart,
    description: "Support this talent's career development",
  },
  {
    label: "Inverse Request",
    icon: FaFileAlt,
    description: "Request this talent for your project",
  },
];

const TalentProfileEditor = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState(
    `Sarah Mitchell | Lifestyle Influencer | Los Angeles, CA

Professional Summary:
With over 5 years of experience in content creation, I specialize in fashion, travel, and wellness content that inspires authenticity. My work has been featured in Vogue, Cosmopolitan, and Travel + Leisure.

Key Achievements:
- Grew Instagram following from 0 to 500k+ in 3 years
- Collaborated with 50+ brands including Nike, Sephora, and Airbnb
- Named "Top Rising Influencer" by Influencer Magazine (2022)
- Launched successful merchandise line with 10k+ units sold

Content Focus Areas:
• Affordable fashion styling
• Sustainable travel tips
• Mental health awareness
• Body positivity advocacy
• Minimalist lifestyle

Current Projects:
- Developing my own skincare line (launching Q3 2023)
- Hosting monthly IG Live Q&A sessions
- Writing an e-book on building authentic social media presence

Personal Philosophy:
I believe in creating content that empowers rather than just sells. My mission is to help people feel confident in their own skin while discovering the joy of simple, intentional living.

When I'm not working:
- Hiking the trails of Malibu
- Exploring local coffee shops
- Practicing yoga and meditation
- Volunteering at animal shelters`
  );
  const galleryRef = useRef(null);
  const [visibleThumbs, setVisibleThumbs] = useState(4);
  const bioContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleThumbs(3);
      } else if (window.innerWidth < 768) {
        setVisibleThumbs(4);
      } else {
        setVisibleThumbs(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleActionClick = (label) => {
    console.log(`${label} clicked`);
  };

  const saveBio = () => {
    setEditingBio(false);
  };

  const cancelEdit = () => {
    setEditingBio(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % imageVariants.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + imageVariants.length) % imageVariants.length
    );
  };

  const scrollThumbs = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container  grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        {/* Modern Smart Gallery - First Column */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6">
          <div className="relative group mb-4">
            <div className="aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg relative">
              <img
                src={imageVariants[selectedImage]}
                alt="Main"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm">
                  {selectedImage + 1}/{imageVariants.length}
                </span>
              </div>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              ref={galleryRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
            >
              {imageVariants.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 aspect-[3/4] w-20 md:w-24 rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedImage === idx
                      ? "ring-2 ring-[#a38b41] scale-105"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img
                    src={img}
                    alt={`img-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            {imageVariants.length > visibleThumbs && (
              <>
                <button
                  onClick={() => scrollThumbs("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 text-white p-1 rounded-full hidden md:block"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={() => scrollThumbs("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 text-white p-1 rounded-full hidden md:block"
                >
                  <FaChevronRight size={12} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Bio Section - Second Column */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4"></div>

          <div className="flex-1 flex flex-col">
            <div className="space-y-4 flex-1">
              <div className="group relative flex-1 flex flex-col h-full">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase text-gray-400 font-semibold">
                    Detailed Biography
                  </label>
                  {!editingBio && (
                    <button
                      onClick={() => setEditingBio(true)}
                      className="text-[#a38b41] text-xs flex items-center gap-1 hover:underline"
                    >
                      <FaEdit size={10} /> Edit Bio
                    </button>
                  )}
                </div>
                {editingBio ? (
                  <div className="flex-1 flex flex-col h-full">
                    <textarea
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      rows={12}
                      className="flex-1 w-full text-sm px-3 py-2 bg-white/10 text-white border border-white/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#a38b41] mb-3 font-mono"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1.5 bg-red-600/80 hover:bg-red-700 text-white rounded-lg text-xs flex items-center gap-1"
                      >
                        <FaTimes size={10} />
                        Cancel
                      </button>
                      <button
                        onClick={saveBio}
                        className="px-3 py-1.5 bg-[#a38b41] hover:bg-[#8a7637] text-white rounded-lg text-xs flex items-center gap-1"
                      >
                        <FaSave size={10} />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={bioContainerRef}
                    className="flex-1 px-3 py-2 bg-white/5 text-white border border-white/10 rounded-lg overflow-y-auto max-h-[500px]"
                  >
                    <pre className="text-sm whitespace-pre-wrap font-sans">
                      {bioText}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards - Third Column */}
        <div className="space-y-4 md:space-y-6">
          {actions.map(({ label, icon: Icon, description }) => (
            <div
              key={label}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 hover:shadow-[#a38b41]/20 hover:border-[#a38b41]/50 transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a38b41]/20 flex items-center justify-center mb-3">
                  <Icon className="text-[#a38b41] text-lg md:text-xl" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1">
                  {label}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm mb-3">
                  {description}
                </p>
                <button
                  onClick={() => handleActionClick(label)}
                  className="w-full bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
                >
                  {label}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentProfileEditor;
