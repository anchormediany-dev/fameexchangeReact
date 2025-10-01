import { useState, useRef, useEffect } from "react";
import { FaHeart, FaFileAlt, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_BASE_URL;
const ImageSwitchFan = ({ userData }) => {
  const navigate = useNavigate();
  const biography = userData?.data?.profile?.biography;
  const talentName = userData?.data?.profile?.name;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bioText, setBioText] = useState("");
  const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleInverseClick = () => {
    navigate("/inverse#inverse-request-form");
  };
  const normalizePath = (p) => {
    if (!p) return "";
    const clean = p.replace(/\\/g, "/"); // windows -> url
    return clean.startsWith("/") ? clean : `/${clean}`;
  };
  useEffect(() => {
    // support either { data: { profile } } or { user }
    const profile =
      userData?.data?.profile ?? userData?.user ?? userData?.profile ?? null;
    const rawImages = Array.isArray(profile?.images) ? profile.images : [];

    const urls = rawImages
      .map((it) => (typeof it === "string" ? it : it?.fileUrl))
      .filter(Boolean)
      .map((path) => `${IMAGE_BASE_URL}${normalizePath(path)}`);

    setImages(urls);
    if (urls.length) setSelectedImage(0);
  }, [userData]);

  // Handle file selection
  const handleFileSelect = async (files) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }

    setIsUploading(true);

    try {
      // Read all selected files
      const newImages = await Promise.all(
        imageFiles.map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        })
      );

      // Combine existing images with new ones
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);

      // Auto-select the first new image if no image was selected before
      if (images.length === 0 && newImages.length > 0) {
        setSelectedImage(0);
      }

      // Automatically save to backend
      await saveImagesToBackend(updatedImages);
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error("Error uploading images");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // Helper to convert DataURL to Blob
  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
  // Sponsor functionality
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  useEffect(() => {
    if (isPopupOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isPopupOpen]);

  const handleSponsorClick = () => {
    setIsPopupOpen(true);
  };

  const handleConfirm = () => {
    toast.success(`Successfully sponsored ${talentName}!`);
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  // Close popup when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
      {/* Image Upload Gallery - First Column */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
        {/* Main Image Display */}
        <div className="relative group mb-3">
          <div className="aspect-square md:aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-md relative">
            {images.length > 0 && images[selectedImage] ? (
              <img
                src={images[selectedImage]}
                alt={`Selected ${selectedImage + 1}`}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center transition-all ${
                  dragOver ? "bg-[#a38b41]/10 border-[#a38b41]" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center p-4">
                  <FaUpload className="mx-auto mb-3 text-2xl text-gray-400" />
                  <p className="text-sm text-gray-300">
                    Drag & drop images here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports multiple image selection
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative group aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                selectedImage === idx
                  ? "ring-1 md:ring-2 ring-[#a38b41] scale-105"
                  : "hover:scale-105"
              }`}
            >
              <button
                onClick={() => setSelectedImage(idx)}
                className="w-full h-full"
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          ))}

          {/* Add more images button */}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={(e) => {
            if (e.target.files.length > 0) {
              handleFileSelect(e.target.files);
            }
          }}
        />
      </div>

      {/* Enhanced Bio Section - Second Column */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 flex-1">
            <div className="group relative flex-1 flex flex-col h-full">
              <label className="text-xl uppercase text-[#a38b41] mb-5 font-bold">
                {talentName}
              </label>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase text-gray-400 font-semibold">
                  Biography
                </label>
              </div>
              <div className="flex-1 px-3 py-2 bg-white/5 text-white border border-white/10 rounded-lg overflow-hidden">
                <pre className="text-sm whitespace-pre-wrap font-sans h-full">
                  {biography}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5">
        {/* Sponsor talent */}
        <div className="bg-white/5 flex justify-center items-center backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 hover:shadow-[#a38b41]/20 hover:border-[#a38b41]/50 transition-all h-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a38b41]/20 flex items-center justify-center mb-3">
              <FaHeart className="text-[#a38b41] text-lg md:text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Sponsor Talent
            </h3>
            <p className="text-gray-300 text-xs md:text-sm mb-3">
              Support this talent's career development
            </p>
            <button
              onClick={handleSponsorClick}
              className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base"
            >
              Sponsor Talent
            </button>
          </div>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 max-w-md w-full">
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-full bg-[#a38b41]/20 flex items-center justify-center mb-4">
                  <FaHeart className="text-[#a38b41] text-2xl" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  Confirm Sponsorship
                </h3>

                {/* Message */}
                <p className="text-gray-300 mb-6">
                  Are you sure you would like to sponsor{" "}
                  <span className="text-white font-semibold">{talentName}</span>
                  ?
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    No
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Inverse Request */}
        <div className="bg-white/5 flex justify-center items-center backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 hover:shadow-[#a38b41]/20 hover:border-[#a38b41]/50 transition-all h-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a38b41]/20 flex items-center justify-center mb-3">
              <FaFileAlt className="text-[#a38b41] text-lg md:text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Inverse Request
            </h3>
            <p className="text-gray-300 text-xs md:text-sm mb-3">
              Request this talent for your project
            </p>
            <button
              onClick={handleInverseClick}
              className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base"
            >
              Inverse Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSwitchFan;
