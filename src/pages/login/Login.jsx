import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5"; // 👈 Eye icons
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false); // 👈 New state

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) return;
    console.log("Submit", { email, password });
  };

  return (
    <MotionPageWrapper>
      {" "}
      <div className=" flex items-center justify-center px-4 py-12 mt-20 relative overflow-hidden custom-login-bg">
        {/* Overlay circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
        <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />

        <div className="container w-full grid md:grid-cols-2 gap-5 z-10">
          {/* Left: Login Form */}
          <div className="bg-transparent p-8 rounded-lg space-y-6 border border-[#686868] w-full max-w-md">
            <h2 className="text-2xl font-bold text-white">Log In</h2>

            <form onSubmit={handleSubmit} className="space-y-6 ">
              {/* Email */}
              <div>
                <label htmlFor="email" className="text-white text-sm">
                  Email
                </label>
                <div
                  className={`flex items-center border rounded-md px-3 py-2 mt-1 bg-transparent ${
                    touched.email && !isEmailValid
                      ? "border-red-500"
                      : "border-[#F3BA18]"
                  }`}
                >
                  <FaEnvelope className="text-grayDescription mr-2" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    className="bg-transparent outline-none w-full text-white text-p5 placeholder:font-normal placeholder-grayDescription"
                  />
                </div>
                {touched.email && !isEmailValid && (
                  <p className="text-red text-xs mt-1">Invalid email address</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="text-white text-sm">
                  Password
                </label>
                <div
                  className={`flex items-center border rounded-md px-3 py-2 mt-1 bg-transparent ${
                    touched.password && !isPasswordValid
                      ? "border-red-500"
                      : "border-[#F3BA18]"
                  }`}
                >
                  <FaLock className="text-grayDescription mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched({ ...touched, password: true })}
                    className="bg-transparent outline-none w-full text-white text-p5 placeholder:font-normal placeholder-grayDescription"
                  />
                  {/* 👁 Show/Hide toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-white hover:text-[#F3BA18] focus:outline-none"
                  >
                    {showPassword ? (
                      <IoEyeOffSharp size={20} />
                    ) : (
                      <IoEyeSharp size={20} />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link
                    to="/forgot-password"
                    className="text-xs text-white hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                {touched.password && !isPasswordValid && (
                  <p className="text-red text-xs mt-1">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-black w-full hover:scale-105 text-primary font-medium px-6 py-3 rounded-md transition-all duration-300  relative group text-p5  2xl:text-p1"
                // className="w-full bg-black text-primary py-2 rounded-md hover:bg-[#F3BA18] hover:text-black transition-all duration-300 font-semibold"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="text-center relative text-gray-500 text-sm">
              <div className="absolute w-full h-px bg-[#272727] top-2 left-0 z-0" />
              <span className="bg-[#0b0b0b] px-4 z-10 relative">OR</span>
            </div>

            {/* Social */}
            <div className="space-y-3">
              <button className="w-full flex cursor-pointer hover:opacity-50 text-white font-medium  text-p5  2xl:text-p1 items-center justify-center gap-3 bg-black py-2 rounded-md  transition">
                <FcGoogle size={20} />
                Continue With Google
              </button>
              <button className="w-full flex cursor-pointer hover:opacity-50 text-white font-medium  text-p5  2xl:text-p1 items-center justify-center gap-3 bg-black py-2 rounded-md  transition">
                <FaFacebookF size={20} className="text-[#1877F2]" />
                <span> Continue With Facebook</span>
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

          {/* Right: Welcome */}
          <div className="hidden md:flex flex-col md:mt-14 max-w-[400px] items-start text-white space-y-4 px-4">
            <h1 className="text-4xl font-bold">Welcome!</h1>
            <p className="text-grayDescription text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
        </div>
      </div>
    </MotionPageWrapper>
  );
};

export default LoginPage;
