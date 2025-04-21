import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NetworthCalculator = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [tokenBrand, setTokenBrand] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [instagram, setInstagram] = useState("");
  const [snapchat, setSnapchat] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!tokenBrand.trim()) {
      newErrors.tokenBrand = "Token Brand is required";
      isValid = false;
    }

    if (!tokenSupply.trim()) {
      newErrors.tokenSupply = "Token Supply is required";
      isValid = false;
    } else if (!/^\d+$/.test(tokenSupply)) {
      newErrors.tokenSupply = "Token Supply must be a number";
      isValid = false;
    }

    if (!tokenPrice.trim()) {
      newErrors.tokenPrice = "Token Price is required";
      isValid = false;
    } else if (!/^\d+(\.\d+)?$/.test(tokenPrice)) {
      newErrors.tokenPrice = "Token Price must be a number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCalculate = () => {
    if (validateForm()) {
      // In a real application, you would perform the net worth calculation here
      console.log("Form data:", {
        fullName,
        tokenBrand,
        tokenSupply,
        tokenPrice,
        twitter,
        youtube,
        facebook,
        tiktok,
        instagram,
        snapchat,
      });
      navigate("/"); // Navigate to the home page
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
      <div className="relative z-10 flex flex-col items-center p-6 md:p-10 lg:p-16 w-full max-w-2xl">
        <h1 className="py-5 text-p1 sm:text-h6 xl:text-h5 2xl:text-h4 font-medium text-primary mb-10">
          Networth Calculator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6 w-full">
          {/* Full Name - Taking full width */}
          <div className="md:col-span-2">
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              className={`bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px] ${
                errors.fullName ? "border-red-500" : ""
              }`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Token Brand */}
          <div className="md:col-span-2">
            <h2 className="text-white text-p2 2xl:text-p1 font-medium mb-3">
              Token Brand
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  id="tokenBrand"
                  placeholder="Token Brand Name"
                  className={`bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px] ${
                    errors.tokenBrand ? "border-red-500" : ""
                  }`}
                  value={tokenBrand}
                  onChange={(e) => setTokenBrand(e.target.value)}
                />
                {errors.tokenBrand && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tokenBrand}
                  </p>
                )}
              </div>

              <div>
                <input
                  id="tokenPrice"
                  type="number"
                  placeholder="Current Token Price"
                  className={`bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px] ${
                    errors.tokenPrice ? "border-red-500" : ""
                  }`}
                  value={tokenPrice}
                  onChange={(e) => setTokenPrice(e.target.value)}
                />
                {errors.tokenPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tokenPrice}
                  </p>
                )}
              </div>
              {/* Empty div to align with the grid layout */}
              <div></div>
            </div>
          </div>

          {/* Social Media */}
          <div className="md:col-span-2">
            <h2 className="text-white text-p2 2xl:text-p1 font-medium mb-3">
              Social Media
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  id="twitter"
                  placeholder="Twitter"
                  className="bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="youtube"
                  placeholder="Youtube"
                  className="bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="facebook"
                  placeholder="Facebook"
                  className="bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="tiktok"
                  placeholder="Tiktok"
                  className="bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="instagram"
                  placeholder="Instagram"
                  className="bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="snapchat"
                  placeholder="Snapchat"
                  className="bg-transparent border border-primary rounded-xl px-4 py-2 w-full text-white placeholder:text-text-gray-400 focus:outline-none focus:border-[2px]"
                  value={snapchat}
                  onChange={(e) => setSnapchat(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="bg-black w-full hover:scale-105 text-[#CCCC00] font-medium px-6 py-3 rounded-xl transition-all duration-300 relative group text-p5 cursor-pointer mt-10"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default NetworthCalculator;
