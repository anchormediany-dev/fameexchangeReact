import { useState, useRef, useEffect } from "react";
import { FaHeart, FaFileAlt, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_BASE_URL;
const ImageSwitchForAdmin = ({ userData }) => {
  const tickets = [
    {
      id: "1",
      eventId: "101",
      eventName: "Music Fiesta 2025",
      date: "2025-03-15",
      time: "19:00",
      venue: "Madison Square Garden",
      city: "New York",
    },
    {
      id: "2",
      eventId: "102",
      eventName: "Tech Conference 2025",
      date: "2025-04-22",
      time: "09:00",
      venue: "Convention Center",
      city: "San Francisco",
    },
    {
      id: "3",
      eventId: "103",
      eventName: "Startup Pitch Night",
      date: "2025-05-10",
      time: "18:30",
      venue: "Innovation Hub",
      city: "Austin",
    },
    {
      id: "4",
      eventId: "104",
      eventName: "Jazz Festival",
      date: "2025-06-05",
      time: "20:00",
      venue: "Riverfront Park",
      city: "New Orleans",
    },
    {
      id: "5",
      eventId: "105",
      eventName: "Comedy Night Special",
      date: "2025-07-18",
      time: "21:00",
      venue: "Laugh Factory",
      city: "Los Angeles",
    },
    {
      id: "6",
      eventId: "106",
      eventName: "Food & Wine Expo",
      date: "2025-08-12",
      time: "11:00",
      venue: "Metro Convention",
      city: "Chicago",
    },
    {
      id: "7",
      eventId: "107",
      eventName: "Film Premiere Gala",
      date: "2025-09-25",
      time: "19:30",
      venue: "Hollywood Theater",
      city: "Los Angeles",
    },
    {
      id: "8",
      eventId: "108",
      eventName: "Sports Championship",
      date: "2025-10-08",
      time: "15:00",
      venue: "National Stadium",
      city: "Miami",
    },
    {
      id: "9",
      eventId: "109",
      eventName: "Art Exhibition Opening",
      date: "2025-11-14",
      time: "18:00",
      venue: "Modern Art Museum",
      city: "Boston",
    },
    {
      id: "10",
      eventId: "110",
      eventName: "New Year's Eve Concert",
      date: "2025-12-31",
      time: "22:00",
      venue: "Times Square",
      city: "New York",
    },
  ];
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
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 flex-1">
            <div className="group relative flex-1 flex flex-col h-full">
              <section>
                <h2
                  className="text-xl uppercase text-[#a38b41] mb-5 font-bold"
                  style={{
                    background: "linear-gradient(to right, #a38b41, #d4c374)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                Purchased Tickets
                </h2>

                <div className="h-[400px] overflow-y-auto overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {/* <th className="p-3 text-left text-sm text-gray-300">
                          S.No
                        </th> */}
                        <th className="p-3 text-left text-sm text-gray-300">
                          Event
                        </th>
                        <th className="p-3 text-left text-sm text-gray-300">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((t, i) => (
                        <tr
                          key={t.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          {/* <td className="p-3 text-sm text-gray-200">{i + 1}</td> */}
                          <td className="p-3">
                            <button
                              onClick={() =>
                                navigate(`/event-details/${t.eventId}`)
                              }
                              className="text-sm cursor-pointer text-white underline underline-offset-2 hover:text-[#d4c374]"
                            >
                              {t?.eventName}
                            </button>
                          </td>
                          <td className="p-3">
                            <div className="text-sm  text-white  hover:text-[#d4c374]">
                              Your event is on: {t?.date}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSwitchForAdmin;
