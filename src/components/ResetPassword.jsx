import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaLock } from "react-icons/fa";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import MotionPageWrapper from "./MotionPageWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../app/authApi";
import { toast } from "react-toastify";
const schema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{4}$/, "Enter 4-digit OTP"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Must be at least 8 characters")
    .matches(/\d/, "Must include at least one number"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]); // OTP boxes
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();
  const location = useLocation();

  // Email from navigation or session (fallback)
  const email = location.state?.email || sessionStorage.getItem("fp_email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!email) navigate("/forgot-password", { replace: true });
  }, [email, navigate]);

  // keep hidden "otp" field in sync with the 4 boxes
  useEffect(() => {
    const otp = code.join("");
    setValue("otp", otp, { shouldValidate: true });
  }, [code, setValue]);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;
    const onlyDigit = value.replace(/\D/g, "");
    const next = [...code];
    next[index] = onlyDigit;
    setCode(next);

    if (onlyDigit && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const onSubmit = async (data) => {
    try {
      await trigger("otp");
      const res = await resetPassword({
        email,
        otp: data.otp, // e.g. "1234"
        password: data.newPassword,
      }).unwrap();

      // Clean temp email
      sessionStorage.removeItem("fp_email");
      toast.success(
        res?.data?.message || "Password reset successfully. Please login."
      );
      setTimeout(() => {
        navigate("/login", { replace: true });
      });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <MotionPageWrapper>
      <div className="flex items-center h-screen justify-center px-4 py-16 relative overflow-hidden bg-[#0b0b0b]">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
        <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[30px] right-[60px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />

        <div className="w-full max-w-md bg-transparent p-8 rounded-lg text-center space-y-6 z-10 border border-[#272727]">
          <h2 className="heading-700-40 text-white">Reset Password</h2>

          {/* OTP */}
          <div className="space-y-2">
            <label className="text-white heading-500-20">
              Enter 4-digit OTP
            </label>
            <div className="flex justify-center gap-4 mt-1">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  maxLength={1}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-white text-xl rounded border border-[#F3BA18] bg-transparent outline-none focus:ring-2 focus:ring-[#F3BA18] transition"
                />
              ))}
            </div>
            {/* hidden field bound to RHF for validation */}
            <input type="hidden" {...register("otp")} />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password */}
            <div className="text-left space-y-2">
              <label className="text-white heading-500-20">New Password</label>
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
                  className="bg-transparent outline-none w-full text-white heading-400-15 placeholder:font-normal placeholder-white"
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
              <label className="text-white heading-500-20">
                Confirm Password
              </label>
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
                  className="bg-transparent outline-none w-full text-white heading-400-15 placeholder:font-normal placeholder-white"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-black text-[#F3BA18] py-2 hover:bg-[#F3BA18] hover:text-black rounded-md transition-all duration-300 heading-500-23 disabled:opacity-60"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </MotionPageWrapper>
  );
};

export default ResetPassword;
