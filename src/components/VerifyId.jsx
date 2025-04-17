import React, { useState, useRef } from "react";
import idCardPlaceholder from "../assets/images/id-card-placeholder.png";
import { FaPencilAlt } from "react-icons/fa";
import NetworthCalculator from "./NetworthCalculator";
const VerifyId = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVerifyCompleted, setIsVerifyCompleted] = useState(false);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
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

  const handleSubmit = () => {
    if (selectedImage) {
      console.log("Submitting image:", selectedImage);
    } else {
      alert("Please upload an image first.");
    }
    setIsVerifyCompleted(true);
  };

  return (
    <>
      {!isVerifyCompleted ? (
        <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden flex items-center justify-center">
          {/* Background Bubbles */}
          <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03] animate-bubble1" />
          <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06] animate-bubble2" />
          <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06] animate-bubble3" />
          <div className="absolute bottom-[40px] right-[40px] w-[80px] h-[80px] rounded-full bg-white opacity-[0.04] animate-bubble4" />
          <div className="absolute top-[50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white opacity-[0.05] animate-bubble5" />
          <div className="absolute bottom-[-80px] left-[-30px] w-[200px] h-[200px] rounded-full bg-white opacity-[0.04] animate-bubble6" />

          {/* Content */}
          <div className=" z-10 flex flex-col items-center gap-8 text-center p-6">
            {/* ID Card Upload Area */}
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

            {/* Conditional Text (Removed after image upload) */}
            {!selectedImage && (
              <h2 className="text-white text-lg md:text-xl font-medium">
                We need to verify you id
              </h2>
            )}

            {/* Upload Button (Initially visible if no image is selected) */}
            {!selectedImage && (
              <button
                onClick={handleButtonClick}
                className="bg-black w-full hover:scale-105 text-primary font-medium px-6 py-3 rounded-xl transition-all duration-300 relative group text-p5 cursor-pointer 2xl:text-p1"
              >
                Upload
              </button>
            )}

            {/* Submit Button (Visible after image is uploaded) */}
            {selectedImage && (
              <button
                onClick={handleSubmit}
                className="bg-black w-full hover:scale-105 text-primary font-medium px-6 py-3 rounded-xl transition-all duration-300 relative group text-p5 cursor-pointer 2xl:text-p1"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <NetworthCalculator />
      )}
    </>
  );
};

export default VerifyId;
