import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import ForgotPassword from "../../components/ForgotPassword";
import siteLogo from "../../assets/images/site-logo.png";
import { jwtDecode } from "jwt-decode";
import { useSigninMutation } from "../../app/authApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../features/auth/authSlice";
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = formData.email.includes("@");
  const isPasswordValid = formData.password.length >= 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!isEmailValid || !isPasswordValid) return;
  //   console.log("Login submitted: ", formData);
  //   navigate("/dashboard");
  // };
  const dispatch = useDispatch();
  const [signin, { isLoading }] = useSigninMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await signin(formData).unwrap(); // response = { message, token }

      const { token } = response;
      const decodedUser = jwtDecode(token); // decodedUser = { id, email, is_verified, ... }
      console.log(decodedUser);
      dispatch(setCredentials({ accessToken: token, user: decodedUser }));
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/verify-id");
      }, 500);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return !showForgotPassword ? (
    <MotionPageWrapper>
      <div className="flex mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 bg-[#171717] overflow-hidden">
        <div className="w-full container flex flex-col lg:flex-row gap-8 z-10">
          {/* Login Form */}
          <div className="lg:w-[70%] bg-[#222222] p-8 rounded-xl border border-[#333333]">
            <h2 className="text-white custom-heading-two mb-8">Welcome Back</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email*
                </label>
                <div
                  className={`flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d] ${
                    touched.email && !isEmailValid
                      ? "border-red-500"
                      : "border-none"
                  }`}
                >
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                  />
                </div>
                {touched.email && !isEmailValid && (
                  <p className="text-red-500 text-xs mt-1">
                    Invalid email address
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Password*
                </label>
                <div
                  className={`flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d] ${
                    touched.password && !isPasswordValid
                      ? "border-red-500"
                      : "border-none"
                  }`}
                >
                  <FaLock className="text-gray-400 mr-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => setTouched({ ...touched, password: true })}
                    className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-400 hover:text-[#F3BA18]"
                  >
                    {showPassword ? (
                      <IoEyeOffSharp size={20} />
                    ) : (
                      <IoEyeSharp size={20} />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-[#F3BA18] hover:underline transition duration-150 ease-in-out"
                  >
                    Forgot Password?
                  </button>
                  <button
                    type="button"
                    onClick={() => console.log("Handle forgot username")}
                    className="text-sm text-[#F3BA18] hover:underline transition duration-150 ease-in-out"
                  >
                    Forgot Username?
                  </button>
                </div>

                {touched.password && !isPasswordValid && (
                  <p className="text-red-500 text-xs mt-1">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isEmailValid || !isPasswordValid}
                className="w-full bg-gradient-to-r cursor-pointer from-[#F3BA18] to-[#FF9900] hover:from-[#FF9900] hover:to-[#F3BA18] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333333]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#222222] px-4 text-gray-400 text-sm">
                  OR
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white py-3 px-4 rounded-lg border border-[#333333] transition">
                <FcGoogle size={20} />
                <span>Continue With Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white py-3 px-4 rounded-lg border border-[#333333] transition">
                <FaFacebookF size={20} className="text-[#1877F2]" />
                <span>Continue With Facebook</span>
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-gray-400 text-center mt-6 text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#F3BA18] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Welcome Section */}
          <div className="lg:w-[30%] flex flex-col justify-center items-start text-white space-y-6 pt-6 px-4">
            <Link className="w-full" to="/">
              <img src={siteLogo} alt="Logo" className="mb-6" />
            </Link>
            <h1 className="text-3xl ml-5 font-bold">WELCOME TO</h1>
            <h2 className="text-xl font-semibold ml-5">THE FAME EXCHANGE</h2>
            <p className="text-sm ml-5">
              Secure, fast, and fair — your trusted partner in global currency
              exchange.
            </p>
          </div>
        </div>
      </div>
    </MotionPageWrapper>
  ) : (
    <ForgotPassword />
  );
};

export default LoginPage;
