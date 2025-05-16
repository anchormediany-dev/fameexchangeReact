import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { Link } from "react-router-dom";
import SignupOtpVerification from "../../components/SignupOtpVerification";
import siteLogo from "../../assets/images/site-logo.png";
const representationOptions = [
  "Agent",
  "Manager",
  "Attorney",
  "Business Manager",
];
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [hasRepresentation, setHasRepresentation] = useState(false);
  const [representationType, setRepresentationType] = useState("");
  const [isOver18, setIsOver18] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 6;
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid || !passwordsMatch) return;
    console.log("Submit", { email, password });
    setIsOtpOpen(true);
  };

  return (
    <>
      {!isOtpOpen ? (
        <MotionPageWrapper>
          <div className="flex items-center justify-center px-4 py-12 relative bg-[#0b0b0b] overflow-hidden">
            {/* Overlay circles */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
            <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[40px] right-[40px] w-[80px] h-[80px] rounded-full bg-white opacity-[0.04]" />

            <div className="container w-full md:flex-row flex-col-reverse  flex gap-5 z-10">
              {/* Left: Signup Form */}
              <div className="bg-transparent p-8 rounded-lg space-y-6 border border-[#686868] w-full max-w-md">
                <h2 className=" text-white heading-700-40">Sign Up</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-white heading-500-20"
                    >
                      Email
                    </label>
                    <div
                      className={`flex items-center border rounded-md px-3 py-2 mt-1 bg-transparent ${
                        touched.email && !isEmailValid
                          ? "border-red-500"
                          : "border-[#F3BA18]"
                      }`}
                    >
                      <FaEnvelope className="text-white mr-2" />
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched({ ...touched, email: true })}
                        className="bg-transparent outline-none w-full text-white heading-400-15 placeholder:font-normal placeholder-white"
                      />
                    </div>
                    {touched.email && !isEmailValid && (
                      <p className="text-red text-xs mt-1">
                        Invalid email address
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="text-white heading-500-20"
                    >
                      Password
                    </label>
                    <div
                      className={`flex items-center border rounded-md px-3 py-2 mt-1 bg-transparent ${
                        touched.password && !isPasswordValid
                          ? "border-red-500"
                          : "border-[#F3BA18]"
                      }`}
                    >
                      <FaLock className="text-white mr-2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() =>
                          setTouched({ ...touched, password: true })
                        }
                        className="bg-transparent outline-none w-full text-white heading-400-15 placeholder:font-normal placeholder-white"
                      />
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
                    {touched.password && !isPasswordValid && (
                      <p className="text-red text-xs mt-1">
                        Password must be at least 6 characters
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="text-white heading-500-20"
                    >
                      Confirm Password
                    </label>
                    <div
                      className={`flex items-center border rounded-md px-3 py-2 mt-1 bg-transparent ${
                        touched.confirmPassword && !passwordsMatch
                          ? "border-red-500"
                          : "border-[#F3BA18]"
                      }`}
                    >
                      <FaLock className="text-white mr-2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirm-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() =>
                          setTouched({ ...touched, confirmPassword: true })
                        }
                        className="bg-transparent outline-none w-full text-white heading-400-15placeholder:font-normal placeholder-white"
                      />
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
                    {touched.confirmPassword && !passwordsMatch && (
                      <p className="text-red text-xs mt-1">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 mt-4 text-white text-sm">
                    {/* I Have Representation */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="representation"
                          checked={hasRepresentation}
                          onChange={(e) => {
                            setHasRepresentation(e.target.checked);
                            if (!e.target.checked) setRepresentationType("");
                          }}
                          className="custom-checkbox"
                        />
                        <label
                          htmlFor="representation"
                          className={`heading-400-20 ${
                            hasRepresentation
                              ? "text-primary"
                              : "text-grayLabel2"
                          }`}
                        >
                          I Have Representation
                        </label>
                      </div>

                      {hasRepresentation && (
                        <div className="relative">
                          <select
                            value={representationType}
                            onChange={(e) =>
                              setRepresentationType(e.target.value)
                            }
                            className="bg-black  text-primary font-normal heading-400-15 px-3 py-2 rounded-md w-52 focus:outline-none"
                          >
                            <option value="" disabled hidden>
                              Representation Type
                            </option>
                            {representationOptions.map((option) => (
                              <option
                                key={option}
                                value={option}
                                className="text-white heading-400-15"
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* I'm over 18 */}
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="over18"
                        checked={isOver18}
                        onChange={(e) => setIsOver18(e.target.checked)}
                        className="custom-checkbox"
                      />
                      <label
                        htmlFor="over18"
                        className={`heading-400-20 ${
                          isOver18 ? "text-primary" : "text-grayLabel2"
                        }`}
                      >
                        I'm over 18 years old
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-black w-full hover:scale-105 text-primary  px-6 py-3 rounded-md transition-all duration-300 relative group cursor-pointer heading-500-23"
                  >
                    Sign Up
                  </button>
                </form>

                {/* Divider */}
                <div className="text-center relative text-gray-500 heading-500-23">
                  <div className="absolute w-full h-px bg-[#272727] top-2 left-0 z-0" />
                  <span className="bg-[#0b0b0b] px-4 z-10 relative">OR</span>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <button className="w-full flex cursor-pointer hover:opacity-50 text-white heading-500-23 items-center justify-center gap-3 bg-black py-2 rounded-md transition">
                    <FcGoogle size={20} />
                    Continue With Google
                  </button>
                  <button className="w-full flex cursor-pointer hover:opacity-50 text-white heading-500-23 items-center justify-center gap-3 bg-black py-2 rounded-md transition">
                    <FaFacebookF size={20} className="text-[#1877F2]" />
                    <span>Continue With Facebook</span>
                  </button>
                </div>

                {/* Link to Login */}
                <p className="heading-400-10 text-gray-500 text-center mt-4">
                  Already have an account?
                  <Link to="/login" className="text-[#F3BA18] ml-1 underline">
                    Log In
                  </Link>
                </p>
              </div>

              {/* Right Side Welcome */}
              <div className=" md:flex flex-col mb-5 md:mb-0 md:mt-14 max-w-[400px] items-start text-white space-y-4 px-4">
                <Link to="/">
                  <img className="w-96 h-40" src={siteLogo} alt="Logo" />
                </Link>
                <h1 className="heading-700-50 mt-5">Welcome!</h1>
                <p className="text-white heading-500-35">
                  Secure, fast, and fair — your trusted partner in global
                  currency exchange.
                </p>
              </div>
            </div>
          </div>
        </MotionPageWrapper>
      ) : (
        <SignupOtpVerification />
      )}
    </>
  );
};

export default Signup;
