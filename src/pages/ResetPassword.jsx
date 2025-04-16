import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import MotionPageWrapper from "../components/MotionPageWrapper";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = () => {
    if (!newPassword || newPassword !== confirmPassword) return;
    console.log("Resetting password to:", newPassword);
    // Submit reset logic here
  };

  return (
    <MotionPageWrapper>
      <div className="flex items-center justify-center px-4 py-16 mt-20 relative overflow-hidden custom-login-bg">
        {/* Background Circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
        <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[30px] right-[60px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />

        <div className="w-full max-w-md bg-transparent p-8 rounded-lg text-center space-y-6 z-10 border border-[#272727]">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Reset Password
          </h2>

          {/* New Password */}
          <div className="text-left space-y-1">
            <label className="text-white text-sm">New Password</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-transparent border-[#F3BA18]">
              <FaLock className="text-[#F3BA18] mr-2" />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="ml-2 text-white hover:text-[#F3BA18]"
              >
                {showNewPassword ? (
                  <IoEyeOffSharp size={20} />
                ) : (
                  <IoEyeSharp size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="text-left space-y-1">
            <label className="text-white text-sm">Confirm Password</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-transparent border-[#F3BA18]">
              <FaLock className="text-[#F3BA18] mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-white hover:text-[#F3BA18]"
              >
                {showConfirmPassword ? (
                  <IoEyeOffSharp size={20} />
                ) : (
                  <IoEyeSharp size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleReset}
            className="w-full bg-black text-[#F3BA18] py-2 rounded-md hover:bg-[#F3BA18] hover:text-black transition-all duration-300 font-semibold mt-2"
          >
            Reset Password
          </button>
        </div>
      </div>
    </MotionPageWrapper>
  );
};

export default ResetPassword;
