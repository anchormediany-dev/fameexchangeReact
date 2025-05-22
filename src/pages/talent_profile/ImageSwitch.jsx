import { useState, useRef } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaHeart,
  FaFileAlt,
  FaUpload,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

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

const ImageUploadSwitcher = () => {
  // Initialize with default images and 8 slots total
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
    null, // Empty slots
    null,
    null,
    null,
  ]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [editingBio, setEditingBio] = useState(false);
  const [dragOver, setDragOver] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadingSlot, setUploadingSlot] = useState(null);

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
`
  );

  const handleActionClick = (label) => {
    console.log(`${label} clicked`);
  };

  const saveBio = () => {
    setEditingBio(false);
  };

  const cancelEdit = () => {
    setEditingBio(false);
  };

  // Handle file upload
  const handleFileUpload = (file, slotIndex) => {
    if (file && file.type.startsWith("image/")) {
      setUploadingSlot(slotIndex);
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[slotIndex] = e.target.result;
        setImages(newImages);
        setUploadingSlot(null);

        // Auto-select uploaded image if it's the first one or current slot is empty
        if (slotIndex === 0 || !images[selectedImage]) {
          setSelectedImage(slotIndex);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e, slotIndex) => {
    e.preventDefault();
    setDragOver(slotIndex);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    setDragOver(null);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileUpload(files[0], slotIndex);
    }
  };

  // Remove image
  const removeImage = (slotIndex) => {
    const newImages = [...images];
    newImages[slotIndex] = null;
    setImages(newImages);

    // Find next available image to select
    const nextImageIndex = newImages.findIndex((img) => img !== null);
    if (nextImageIndex !== -1) {
      setSelectedImage(nextImageIndex);
    } else {
      setSelectedImage(0); // Default to first slot
    }
  };

  // Trigger file input
  const triggerFileInput = (slotIndex) => {
    setUploadingSlot(slotIndex);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="py-12 2xl:py-16">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        {/* Compact Image Upload Gallery - First Column */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
          {/* Compact Main Image Display */}
          <div className="relative group mb-3">
            <div className="aspect-square md:aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-md relative">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt="Selected"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <FaUpload className="mx-auto mb-1 text-lg md:text-xl" />
                    <p className="text-xs">Select Image</p>
                  </div>
                </div>
              )}

              {/* Compact Image Counter */}
              <div className="absolute bottom-1 left-1 bg-black/60 text-white px-1.5 py-0.5 rounded text-xs">
                {selectedImage + 1}/8
              </div>
            </div>
          </div>

          {/* Responsive Grid: 2 columns on mobile, 4 on larger screens */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className={`relative group aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                  selectedImage === idx
                    ? "ring-1 md:ring-2 ring-[#a38b41] scale-105"
                    : "hover:scale-105"
                }`}
              >
                {images[idx] ? (
                  // Image exists
                  <>
                    <button
                      onClick={() => setSelectedImage(idx)}
                      className="w-full h-full"
                    >
                      <img
                        src={images[idx]}
                        alt={`Slot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {/* Compact remove button */}
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-0.5 right-0.5 bg-red-600 hover:bg-red-700 text-white p-0.5 md:p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    >
                      <FaTimes size={6} className="md:hidden" />
                      <FaTimes size={8} className="hidden md:block" />
                    </button>
                  </>
                ) : (
                  // Empty slot - compact upload area
                  <div
                    className={`w-full h-full bg-white/5 border border-dashed border-white/20 hover:border-[#a38b41]/50 flex items-center justify-center cursor-pointer transition-all ${
                      dragOver === idx ? "border-[#a38b41] bg-[#a38b41]/10" : ""
                    } ${uploadingSlot === idx ? "animate-pulse" : ""}`}
                    onClick={() => triggerFileInput(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, idx)}
                  >
                    <div className="text-center text-gray-400">
                      {uploadingSlot === idx ? (
                        <div className="animate-spin text-[#a38b41]">
                          <FaUpload size={8} className="md:hidden" />
                          <FaUpload size={10} className="hidden md:block" />
                        </div>
                      ) : (
                        <>
                          <FaPlus size={8} className="md:hidden" />
                          <FaPlus size={10} className="hidden md:block" />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0] && uploadingSlot !== null) {
                handleFileUpload(e.target.files[0], uploadingSlot);
              }
            }}
          />
        </div>

        {/* Enhanced Bio Section - Second Column */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col">
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
                      placeholder="Enter your biography here..."
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
                  <div className="flex-1 px-3 py-2 bg-white/5 text-white border border-white/10 rounded-lg overflow-hidden">
                    <pre className="text-sm whitespace-pre-wrap font-sans h-full">
                      {bioText}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards - Third Column */}
        <div className="flex flex-col justify-center gap-5">
          {actions.map(({ label, icon: Icon, description }) => (
            <div
              key={label}
              className="bg-white/5 flex justify-center items-center backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 hover:shadow-[#a38b41]/20 hover:border-[#a38b41]/50 transition-all h-full"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a38b41]/20 flex items-center justify-center mb-3">
                  <Icon className="text-[#a38b41] text-lg md:text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {label}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm mb-3">
                  {description}
                </p>
                <button
                  onClick={() => handleActionClick(label)}
                  className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base"
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

export default ImageUploadSwitcher;
