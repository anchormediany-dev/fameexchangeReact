import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaLock } from "react-icons/fa";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import MotionPageWrapper from "../components/MotionPageWrapper";

// 1. Define Yup schema
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Must be at least 8 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/\d/, "Must include at least one number")
    .matches(/[^A-Za-z0-9]/, "Must include at least one special character"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2. Set up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 3. onSubmit handler
  const onSubmit = (data) => {
    console.log("Resetting password to:", data.newPassword);
    // your reset logic here...
  };

  return (
    <MotionPageWrapper>
      <div className="flex items-center justify-center px-4 py-16 relative overflow-hidden bg-[#0b0b0b]">
        {/* Background Circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
        <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[30px] right-[60px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />

        <div className="w-full max-w-md bg-transparent p-8 rounded-lg text-center space-y-6 z-10 border border-[#272727]">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Reset Password
          </h2>

          {/* 4. Wrap inputs in a form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password */}
            <div className="text-left space-y-1">
              <label className="text-white text-sm">New Password</label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 bg-transparent ${
                  errors.newPassword ? "border-red-500" : "border-[#F3BA18]"
                }`}
              >
                <FaLock className="text-white mr-2" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...register("newPassword")}
                  className="bg-transparent outline-none w-full text-white text-p5 placeholder:font-normal placeholder-white"
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
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="text-left space-y-1">
              <label className="text-white text-sm">Confirm Password</label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 bg-transparent ${
                  errors.confirmPassword ? "border-red-500" : "border-[#F3BA18]"
                }`}
              >
                <FaLock className="text-white mr-2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="bg-transparent outline-none w-full text-white text-p5 placeholder:font-normal placeholder-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-2 text-white hover:text-[#F3BA18]"
                >
                  {showConfirmPassword ? (
                    <IoEyeSharp size={20} />
                  ) : (
                    <IoEyeOffSharp size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-[#F3BA18] py-2 hover:bg-[#F3BA18] hover:text-black font-medium rounded-md transition-all duration-300 text-p5 2xl:text-p1"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </MotionPageWrapper>
  );
};

export default ResetPassword;
