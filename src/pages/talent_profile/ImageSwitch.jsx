import { useState, useRef, useEffect } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaHeart,
  FaFileAlt,
  FaUpload,
  FaTrash,
  FaPlus,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetUserByIdQuery,
  useDeleteProfileImageMutation,
} from "../../app/authApi";

const scrollToCreateSession = () => {
  const el = document.getElementById("create-session");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = "#create-session";
  }
};
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_BASE_URL;

const ImageUploadSwitcher = ({ userData, updateMyProfile }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const { data: userDataOne, isLoading, isError } = useGetUserByIdQuery(userId);
  const [deleteProfileImage] = useDeleteProfileImageMutation();
  const [editingBio, setEditingBio] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bioText, setBioText] = useState("");

  useEffect(() => {
    if (userData?.user?.images?.length) {
      const backendImages = userData?.user?.images?.map(
        (doc) => `${IMAGE_BASE_URL}${doc?.fileUrl?.replace(/\\/g, "/")}`
      );
      setImages(backendImages);
    }
  }, [userData]);

  const saveBio = async () => {
    try {
      const formData = new FormData();
      formData.append("biography", bioText);

      await updateMyProfile(formData).unwrap();
      setBioText(formData.get("biography"));
      setEditingBio(false);
      toast.success("Biography updated successfully");
    } catch (err) {
      console.error("Error updating biography:", err);
    }
  };

  const handleActionClick = (label) => {
    console.log(`${label} clicked`);
  };

  const cancelEdit = () => {
    setEditingBio(false);
  };

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

  // Save images to backend
  const saveImagesToBackend = async (imagesToSave) => {
    try {
      const formData = new FormData();

      // Convert DataURLs to Blobs and add to FormData
      imagesToSave.forEach((img, index) => {
        if (img.startsWith("data:image")) {
          const blob = dataURLtoBlob(img);
          formData.append("images", blob, `image-${index}.png`);
        }
      });

      const res = await updateMyProfile(formData).unwrap();
      toast.success(res?.message || "Images saved successfully");
    } catch (error) {
      console.error("Failed to save images:", error);
      toast.error("Failed to save images");
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

  // Remove image
  const removeImage = async (index) => {
    try {
      // Check if this is an existing image from backend
      if (index < userData?.user?.images?.length) {
        const imageId = userData.user.images[index]._id;
        const response = await deleteProfileImage(imageId).unwrap();
        toast.success(response?.message || "Image deleted successfully");
      }

      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);

      // Adjust selected image index if needed
      if (selectedImage >= newImages.length && newImages.length > 0) {
        setSelectedImage(newImages.length - 1);
      } else if (newImages.length === 0) {
        setSelectedImage(0);
      }

      // Save changes if there are remaining images
      if (newImages.length > 0) {
        await saveImagesToBackend(newImages);
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to delete image");
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

              <button
                onClick={() => removeImage(idx)}
                className="absolute top-0.5 right-0.5 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ))}

          {/* Add more images button */}
          {images.length < 20 && (
            <div
              className={`aspect-square rounded-md overflow-hidden bg-white/5 border border-dashed border-white/20 flex items-center justify-center cursor-pointer transition-all ${
                dragOver ? "border-[#a38b41] bg-[#a38b41]/10" : ""
              } ${isUploading ? "animate-pulse" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center p-2">
                <FaPlus className="mx-auto text-gray-400" />
                <p className="text-xs text-gray-400 mt-1">Add More</p>
              </div>
            </div>
          )}
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
                {userData?.user?.name}
              </label>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase text-gray-400 font-semibold">
                  Biography
                </label>
                {!editingBio && (
                  <button
                    onClick={() => setEditingBio(true)}
                    className="text-[#a38b41] text-xs flex items-center gap-1 hover:underline"
                  >
                    <FaEdit size={10} /> Edit
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
                    {userData?.user?.biography}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards - Third Column */}
      <div className="flex flex-col justify-center gap-5">
        {/* {actions.map(({ label, icon: Icon, description }) => (
          <div
            key={label}
            className="bg-white/5 flex justify-center items-center backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 hover:shadow-[#a38b41]/20 hover:border-[#a38b41]/50 transition-all h-full"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a38b41]/20 flex items-center justify-center mb-3">
                <Icon className="text-[#a38b41] text-lg md:text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{label}</h3>
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
        ))} */}
        {/* Static Actions (no map) */}
        <div className="flex flex-col justify-center gap-5">
          {/* Sponsor Talent */}
          <div className="bg-white/5 flex justify-center items-center backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 hover:shadow-[#a38b41]/20 hover:border-[#a38b41]/50 transition-all h-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a38b41]/20 flex items-center justify-center mb-3">
                <FaHeart className="text-[#a38b41] text-lg md:text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Sponsor Talent
              </h3>
              <p className="text-gray-300 text-xs md:text-sm mb-3">
                Support this talent&apos;s career development
              </p>
              <button
                type="button"
                onClick={() => handleActionClick("Sponsor Talent")}
                className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base"
                aria-label="Sponsor Talent"
              >
                Sponsor Talent
              </button>
            </div>
          </div>

          {/* Manage Availability */}
          <div className="bg-white/5 flex justify-center items-center backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 hover:shadow-[#a38b41]/20 hover:border-[#a38b41]/50 transition-all h-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a38b41]/20 flex items-center justify-center mb-3">
                <FaCalendarAlt className="text-[#a38b41] text-lg md:text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Manage Availability
              </h3>
              <p className="text-gray-300 text-xs md:text-sm mb-3">
                Schedule and manage talent availability sessions
              </p>
              <button
                type="button"
                onClick={scrollToCreateSession}
                className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base"
                aria-label="Manage Availability"
              >
                Manage Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSwitcher;
