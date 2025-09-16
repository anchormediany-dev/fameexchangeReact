import React, { useState, useRef } from "react";
import idCardPlaceholder from "../assets/images/id-card-placeholder.png";
import { FaPencilAlt } from "react-icons/fa";
import { useVerifyIdMutation } from "../app/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const VerifyId = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const [verifyId, { isLoading }] = useVerifyIdMutation();
  const role = localStorage.getItem("userRole");
  const isFan = role;
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store file for FormData
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // For preview only
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeImage = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      toast.error("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("images", imageFile);

    try {
      const response = await verifyId(formData).unwrap();
      toast.success(
        response?.message || "ID verification submitted successfully."
      );
      setTimeout(() => {
        const role = (localStorage.getItem("userRole") || "").toUpperCase();
        const dest = role === "TALENT" ? "/networth-calculator" : "/";
        navigate(dest, { state: { role }, replace: true });
      }, 500);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to upload ID."
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden flex items-center justify-center">
        {/* Background Bubbles */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03] animate-bubble1" />
        <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06] animate-bubble2" />
        <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06] animate-bubble3" />
        <div className="absolute bottom-[40px] right-[40px] w-[80px] h-[80px] rounded-full bg-white opacity-[0.04] animate-bubble4" />
        <div className="absolute top-[50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white opacity-[0.05] animate-bubble5" />
        <div className="absolute bottom-[-80px] left-[-30px] w-[200px] h-[200px] rounded-full bg-white opacity-[0.04] animate-bubble6" />

        {/* Content */}
        <div className="z-10 flex flex-col items-center gap-8 text-center p-6">
          <div
            className="relative w-48 h-48 rounded-md overflow-hidden cursor-pointer"
            onMouseEnter={() => selectedImage && setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={selectedImage ? handleChangeImage : handleButtonClick}
          >
            <img
              src={selectedImage || idCardPlaceholder}
              alt="Identity verification"
              className={`object-cover w-full h-full transition-opacity duration-300 ${
                isHovering && selectedImage ? "opacity-50" : "opacity-100"
              }`}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              ref={fileInputRef}
            />
            {isHovering && selectedImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-primary text-black rounded-full p-2 cursor-pointer">
                  <FaPencilAlt />
                </div>
              </div>
            )}
          </div>

          {!selectedImage && (
            <h2 className="text-white heading-500-40">
              We need to verify your ID
            </h2>
          )}

          {!selectedImage && (
            <button
              onClick={handleButtonClick}
              className="bg-black w-full hover:scale-105 text-primary heading-500-23 px-6 py-3 rounded-xl transition-all duration-300 relative group cursor-pointer"
            >
              Upload
            </button>
          )}

          {selectedImage && (
            <button
              onClick={handleSubmit}
              className="bg-black w-full hover:scale-105 text-primary px-6 py-3 rounded-xl transition-all duration-300 relative group cursor-pointer heading-500-23"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyId;
