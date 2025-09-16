// src/pages/signup/SignupFan.jsx
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { Link, useNavigate } from "react-router-dom";
import siteLogo from "../../assets/images/site-logo.png";
import { useSignupMutation } from "../../app/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const SignupFan = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Only fan fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isOver18, setIsOver18] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Validation
  const isEmailValid = formData.email.includes("@");
  const isPasswordValid = formData.password.length >= 6;
  const passwordsMatch = formData.password === formData.confirmPassword;
  const isNameValid = formData.name.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isEmailValid ||
      !isPasswordValid ||
      !passwordsMatch ||
      !isNameValid ||
      !isOver18 ||
      !agreedTerms
    ) {
      return;
    }

    // FAN payload (no talent fields)
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "FAN",
      is_over_18: isOver18,
      agreed_terms: agreedTerms,
    };

    try {
      const response = await signup(signupData).unwrap();

      // Store auth & go to OTP verify
      const user = {
        id: response.userId,
        email: signupData.email,
        is_verified: false,
        KYC_Verified: false,
      };
      dispatch(setCredentials({ accessToken: response.token, user }));
      localStorage.setItem("userRole", "FAN");
      toast.success(response?.emailVerification || "Signup successful!");
      sessionStorage.setItem("signupEmail", formData.email);

      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      }, 400);
    } catch (err) {
      toast.error(err?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <MotionPageWrapper>
      <div className="flex mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 relative bg-[#171717] overflow-hidden">
        <div className="w-full container flex flex-col-reverse lg:flex-row gap-8 z-10">
          {/* Left: Signup Form */}
          <div className="lg:w-[70%] bg-[#222222] p-8 rounded-xl border border-[#333333]">
            <h2 className="text-white custom-heading-two mb-8">
              Join Fame Exchange
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    User Name*
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d] ${
                      touched.name && !isNameValid
                        ? "border-red-500"
                        : "border-none"
                    }`}
                  >
                    <FaUser className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="User Name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => setTouched({ ...touched, name: true })}
                      className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                    />
                  </div>
                  {touched.name && !isNameValid && (
                    <p className="text-red-500 text-xs mt-1">
                      Name is required
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-medium mb-2"
                  >
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
                      id="email"
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
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-white text-sm font-medium mb-2"
                  >
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
                      id="password"
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
                      className="ml-2 text-gray-400 hover:text-[#F3BA18] focus:outline-none"
                    >
                      {showPassword ? (
                        <IoEyeOffSharp size={20} />
                      ) : (
                        <IoEyeSharp size={20} />
                      )}
                    </button>
                  </div>
                  {touched.password && !isPasswordValid && (
                    <p className="text-red-500 text-xs mt-1">
                      Password must be at least 6 characters
                    </p>
                  )}
                </div>

                {/* Confirm */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Confirm Password*
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d] ${
                      touched.confirmPassword && !passwordsMatch
                        ? "border-red-500"
                        : "border-none"
                    }`}
                  >
                    <FaLock className="text-gray-400 mr-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() =>
                        setTouched({ ...touched, confirmPassword: true })
                      }
                      className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-gray-400 hover:text-[#F3BA18] focus:outline-none"
                    >
                      {showPassword ? (
                        <IoEyeOffSharp size={20} />
                      ) : (
                        <IoEyeSharp size={20} />
                      )}
                    </button>
                  </div>
                  {touched.confirmPassword && !passwordsMatch && (
                    <p className="text-red-500 text-xs mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>

              {/* Age Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="over18"
                  checked={isOver18}
                  onChange={(e) =>
                    isLoading ? null : setIsOver18(e.target.checked)
                  }
                  className="rounded bg-transparent border-[#F3BA18] text-[#F3BA18] focus:ring-[#F3BA18] h-5 w-5"
                />
                <label
                  htmlFor="over18"
                  className={`text-sm ${
                    isOver18 ? "text-[#F3BA18]" : "text-gray-400"
                  }`}
                >
                  I'm over 18 years old*
                </label>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-center space-x-3 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedTerms}
                  onChange={(e) =>
                    isLoading ? null : setAgreedTerms(e.target.checked)
                  }
                  className="rounded gredient-text h-5 w-5 flex-shrink-0"
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{" "}
                  <Link
                    to="/terms-conditions"
                    className="gredient-text hover:underline"
                    target="_blank"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="gredient-text hover:underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                  *
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  !isEmailValid ||
                  !isPasswordValid ||
                  !passwordsMatch ||
                  !isNameValid ||
                  !isOver18 ||
                  !agreedTerms ||
                  isLoading
                }
                className="w-full cursor-pointer custom-button-two text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>

              {error && (
                <div className="text-red-500 text-center mt-2">
                  {error.data?.message || "Signup failed. Please try again."}
                </div>
              )}
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

            {/* Link to Login */}
            <p className="text-gray-400 text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#F3BA18] hover:underline">
                Log In
              </Link>
            </p>
          </div>

          {/* Right Side Welcome */}
          <div className="lg:w-[30%] flex lg:flex-col flex-row items-center lg:items-start text-white space-y-6 pt-6">
            <Link className="w-[100%] lg:block hidden" to="/">
              <img src={siteLogo} alt="Logo" />
            </Link>
            <div className="flex flex-col">
              <h1 className=" mt-5">
                <span className="custom-heading-seven ml-5"> WELCOME TO </span>
                <span className="text-xl ml-5">THE FAME ECHANGE</span>
              </h1>
              <p className="text-white font-normal text-xs ml-5">
                Secure, fast, and fair — your trusted partner in global currency
                exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MotionPageWrapper>
  );
};

export default SignupFan;
