import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNetworthCalculateMutation } from "../app/authApi";
import FameExchangeLoader from "./FameExchangeLoader";

const NetworthCalculator = () => {
  const navigate = useNavigate();
  const [saveNetworth, { isLoading, error }] = useNetworthCalculateMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    tokenBrandName: "",
    tokenName: "",
    tokenSupply: "",
    youtube: "",
    twitter: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    snapchat: "",

    //  youtube: "https://www.youtube.com/@MrBeast",
    // twitter: "https://twitter.com/MrBeast",
    // instagram: "https://www.instagram.com/mrbeast",
    // facebook: "https://www.facebook.com/MrBeast",
    // tiktok: "https://www.tiktok.com/@mrbeast",
    // snapchat: "https://www.snapchat.com/add/mrbeast",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.tokenBrandName.trim()) {
      newErrors.tokenBrandName = "Token Brand Name is required";
      isValid = false;
    }

    if (!formData.tokenName.trim()) {
      newErrors.tokenName = "Token Name is required";
      isValid = false;
    }

    if (!formData.tokenSupply.trim()) {
      newErrors.tokenSupply = "Token Supply is required";

      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await saveNetworth(formData).unwrap();
      console.log("Networth saved successfully:", response);
      const netWorth =
        response?.data?.netWorth ??
        response?.data?.data?.netWorth ??
        response?.netWorth ??
        null;

      if (netWorth !== null && netWorth !== undefined) {
        localStorage.setItem("netWorth", String(netWorth));
        console.log("netWorth:", netWorth);
      } else {
        console.log("netWorth not found in response");
      }

      navigate("/", {
        state: {
          isCalculatingNetworth: true,
          calculationData: response,
        },
      });
    } catch (error) {
      console.error("Failed to save networth:", error);
      // Handle API errors here
      setErrors((prev) => ({
        ...prev,
        apiError: "Failed to calculate networth. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden flex items-center justify-center">
      {/* Background Bubbles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03] animate-bubble1" />
      <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06] animate-bubble2" />
      <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06] animate-bubble3" />
      <div className="absolute bottom-[40px] right-[40px] w-[80px] h-[80px] rounded-full bg-white opacity-[0.04] animate-bubble4" />
      <div className="absolute top-[50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white opacity-[0.05] animate-bubble5" />
      <div className="absolute bottom-[-80px] left-[-30px] w-[200px] h-[200px] rounded-full bg-white opacity-[0.04] animate-bubble6" />
      {/* Bubbles from the reference image - Adjusted positions and sizes */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white opacity-[0.04]" />
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-white opacity-[0.03]" />
      <div className="absolute bottom-10 right-40 w-16 h-16 rounded-full bg-white opacity-[0.05]" />
      <div className="absolute bottom-32 left-60 w-32 h-32 rounded-full bg-white opacity-[0.02]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center container p-6 md:p-10 lg:p-16 w-full">
        <h1 className="py-5 heading-500-50 text-primary mb-10">
          Networth Calculator
        </h1>

        {errors.apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6 w-full">
            {/* Full Name - Taking full width */}
            <div className="md:col-span-2">
              <label htmlFor="fullName" className="text-white block mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className={`bg-transparent border  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 heading-400-15 focus:outline-none focus:border-[2px] ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Talent Brand */}
            <div className="md:col-span-2">
              <h2 className="text-white heading-500-30 mb-3">Talent Brand</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="tokenBrandName"
                    className="text-white block mb-1"
                  >
                    Talent Brand Name
                  </label>
                  <input
                    type="text"
                    id="tokenBrandName"
                    placeholder="Talent Brand Name"
                    className={`bg-transparent border  rounded-xl heading-400-15 px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px] ${
                      errors.tokenBrandName ? "border-red-500" : ""
                    }`}
                    value={formData.tokenBrandName}
                    onChange={handleChange}
                  />
                  {errors.tokenBrandName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tokenBrandName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="tokenName" className="text-white block mb-1">
                    Ticker Symbol
                  </label>
                  <input
                    id="tokenName"
                    placeholder="Ticker Symbol"
                    className={`bg-transparent border heading-400-15  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px] ${
                      errors.tokenName ? "border-red-500" : ""
                    }`}
                    value={formData.tokenName}
                    onChange={handleChange}
                  />
                  {errors.tokenName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tokenName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="tokenSupply"
                    className="text-white block mb-1"
                  >
                    Total Share Supply
                  </label>
                  <input
                    type="text"
                    id="tokenSupply"
                    placeholder="Total Share Supply"
                    className={`bg-transparent border heading-400-15  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px] ${
                      errors.tokenSupply ? "border-red-500" : ""
                    }`}
                    value={formData.tokenSupply}
                    onChange={handleChange}
                  />
                  {errors.tokenSupply && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tokenSupply}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="md:col-span-2">
              <h2 className="text-white heading-500-30 mb-3">Social Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="twitter" className="text-white block mb-1">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    placeholder="Twitter URL"
                    className="bg-transparent heading-400-15 border  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="youtube" className="text-white block mb-1">
                    Youtube
                  </label>
                  <input
                    type="url"
                    id="youtube"
                    placeholder="YouTube URL"
                    className="bg-transparent heading-400-15 border  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                    value={formData.youtube}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="facebook" className="text-white block mb-1">
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    placeholder="Facebook URL"
                    className="bg-transparent heading-400-15 border  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                    value={formData.facebook}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="tiktok" className="text-white block mb-1">
                    Tiktok
                  </label>
                  <input
                    type="url"
                    id="tiktok"
                    placeholder="TikTok URL"
                    className="bg-transparent heading-400-15 border  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                    value={formData.tiktok}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="instagram" className="text-white block mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    placeholder="Instagram URL"
                    className="bg-transparent border heading-400-15  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="snapchat" className="text-white block mb-1">
                    Snapchat
                  </label>
                  <input
                    type="url"
                    id="snapchat"
                    placeholder="Snapchat URL"
                    className="bg-transparent border heading-400-15  rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                    value={formData.snapchat}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-black w-full hover:scale-105 text-[#CCCC00] px-6 py-3 rounded-xl transition-all duration-300 relative group heading-500-23 cursor-pointer mt-10 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Calculating..." : "Calculate"}
          </button>
        </form>
        {isLoading && (
          <div className="mt-6 flex justify-center">
            <FameExchangeLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworthCalculator;
