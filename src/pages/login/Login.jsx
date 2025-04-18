import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import ForgotPassword from "../../components/ForgotPassword";
import { Link } from "react-router-dom";
import siteLogo from "../../assets/images/site-logo.png";
// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[^\d][\w.-]+@[\w.-]+\.\w+$/, "Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include one uppercase letter")
    .matches(/[0-9]/, "Must include one number")
    .matches(/[^A-Za-z0-9]/, "Must include one special character"),
});

const LoginPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login submitted: ", data);
  };

  return (
    <>
      {!showForgotPassword ? (
        <MotionPageWrapper>
          <div className="flex items-center justify-center px-4 py-12 relative bg-[#0b0b0b] overflow-hidden">
            {/* Circles */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
            <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[40px] right-[40px] w-[80px] h-[80px] rounded-full bg-white opacity-[0.04]" />

            <div className="container w-full grid md:grid-cols-2 gap-5 z-10">
              {/* Login Form */}
              <div className="bg-transparent p-8 rounded-lg space-y-6 border border-[#686868] w-full max-w-md">
                <h2 className="text-2xl font-bold text-white">Log In</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="text-white text-sm">
                      Email
                    </label>
                    <div
                      className={`flex items-center border rounded-md px-3 py-2 mt-1 bg-transparent ${
                        errors.email ? "border-red-500" : "border-[#F3BA18]"
                      }`}
                    >
                      <FaEnvelope className="text-white mr-2" />
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        {...register("email")}
                        className="bg-transparent outline-none w-full text-white placeholder-white text-p5"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="text-white text-sm">
                      Password
                    </label>
                    <div
                      className={`flex items-center border rounded-md px-3 py-2 mt-1 bg-transparent ${
                        errors.password ? "border-red-500" : "border-[#F3BA18]"
                      }`}
                    >
                      <FaLock className="text-white mr-2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        {...register("password")}
                        className="bg-transparent outline-none w-full text-white placeholder-white text-p5"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 text-white hover:text-[#F3BA18]"
                      >
                        {showPassword ? (
                          <IoEyeOffSharp size={20} />
                        ) : (
                          <IoEyeSharp size={20} />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-end mt-1">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs text-white hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-black w-full hover:scale-105 text-primary font-medium px-6 py-3 rounded-md transition-all duration-300 group text-p5 cursor-pointer 2xl:text-p1"
                  >
                    Log In
                  </button>
                </form>

                {/* Divider */}
                <div className="text-center relative text-gray-500 text-sm">
                  <div className="absolute w-full h-px bg-[#272727] top-2 left-0 z-0" />
                  <span className="bg-[#0b0b0b] px-4 z-10 relative">OR</span>
                </div>

                {/* Social Auth */}
                <div className="space-y-3">
                  <button className="w-full flex cursor-pointer hover:opacity-50 text-white font-medium text-p5 2xl:text-p1 items-center justify-center gap-3 bg-black py-2 rounded-md transition">
                    <FcGoogle size={20} />
                    Continue With Google
                  </button>
                  <button className="w-full flex cursor-pointer hover:opacity-50 text-white font-medium text-p5 2xl:text-p1 items-center justify-center gap-3 bg-black py-2 rounded-md transition">
                    <FaFacebookF size={20} className="text-[#1877F2]" />
                    <span>Continue With Facebook</span>
                  </button>
                </div>

                {/* Sign Up */}
                <p className="text-p5 text-gray-500 text-center mt-4">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-[#F3BA18] hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>

              {/* Right Side Welcome */}
              <div className="hidden md:flex flex-col md:mt-14 max-w-[400px] items-start text-white space-y-4 px-4">
                <Link to="/">
                  <img className="w-96 h-40" src={siteLogo} alt="Logo" />
                </Link>
                <h1 className="text-4xl font-bold mt-5">Welcome!</h1>
                <p className="text-white text-lg">
                  Secure, fast, and fair — your trusted partner in global
                  currency exchange.
                </p>
              </div>
            </div>
          </div>
        </MotionPageWrapper>
      ) : (
        <ForgotPassword />
      )}
    </>
  );
};

export default LoginPage;
