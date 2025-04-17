import React, { useState } from "react";
import MotionPageWrapper from "./MotionPageWrapper";
import ResetPassword from "../components/ResetPassword";
const Verification = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [isCode, setIsCode] = useState(false);
  const handleChange = (value, index) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus to next box
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleContinue = () => {
    if (code.every((c) => c.trim() !== "")) {
      console.log("OTP Verified:", code.join(""));
    }
    setIsCode(true);
  };

  return (
    <>
      {!isCode ? (
        <MotionPageWrapper>
          <div className="flex items-center justify-center px-4 py-16  relative overflow-hidden bg-[#0b0b0b]">
            {/* Background circles */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
            <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[30px] right-[60px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />

            <div className="w-full max-w-md bg-transparent p-8 rounded-lg text-center space-y-6 z-10 border border-[#272727]">
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                Verification
              </h2>
              <p className="text-grayLabel text-sm">Enter Your Code Here</p>

              {/* OTP Boxes */}
              <div className="flex justify-center gap-4 mt-4">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    className="w-12 h-12 md:w-14 md:h-14 text-center text-white text-xl rounded border border-[#F3BA18] bg-transparent outline-none focus:ring-2 focus:ring-[#F3BA18] transition"
                  />
                ))}
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                className="w-full bg-black cursor-pointer text-[#F3BA18] py-2  hover:bg-[#F3BA18] hover:text-black  font-medium  rounded-md transition-all duration-300  text-p5  2xl:text-p1"
              >
                Continue
              </button>

              {/* Resend */}
              <p className="text-xs text-white mt-2">
                I Don't Receive A Code{" "}
                <button className="text-[#F3BA18] underline cursor-pointer hover:underline ml-1">
                  Resend
                </button>
              </p>
            </div>
          </div>
        </MotionPageWrapper>
      ) : (
        <ResetPassword />
      )}
    </>
  );
};

export default Verification;
