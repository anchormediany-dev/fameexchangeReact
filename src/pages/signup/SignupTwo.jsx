import { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaLock, FaUser, FaChevronDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { Link } from "react-router-dom";
import SignupOtpVerification from "../../components/SignupOtpVerification";
import siteLogo from "../../assets/images/site-logo.png";

const talentOptions = ["Actor", "Model", "Athlete", "Entertainer"];
const representationOptions = [
  "Brand Ambassador",
  "Host",
  "Social Media",
  "Spokesperson",
];
const habitOptions = [
  "Reading",
  "Traveling",
  "Cooking",
  "Fitness",
  "Gaming",
  "Music",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    talentName: "",
    stageName: "",
    brandName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    talentName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [hasRepresentation, setHasRepresentation] = useState(false);
  const [isOver18, setIsOver18] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  // Dropdown states
  const [showTalentDropdown, setShowTalentDropdown] = useState(false);
  const [showRepresentationDropdown, setShowRepresentationDropdown] =
    useState(false);
  const [showHabitsDropdown, setShowHabitsDropdown] = useState(false);
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [selectedRepresentationTypes, setSelectedRepresentationTypes] =
    useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);

  const talentDropdownRef = useRef(null);
  const representationDropdownRef = useRef(null);
  const habitsDropdownRef = useRef(null);

  // Validation
  const isEmailValid = formData.email.includes("@");
  const isPasswordValid = formData.password.length >= 6;
  const passwordsMatch = formData.password === formData.confirmPassword;
  const isTalentNameValid = formData.talentName.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !isEmailValid ||
      !isPasswordValid ||
      !passwordsMatch ||
      !isTalentNameValid ||
      !isOver18
    )
      return;
    console.log("Submit", {
      ...formData,
      talents: selectedTalents,
      representationTypes: selectedRepresentationTypes,
      habits: selectedHabits,
    });
    setIsOtpOpen(true);
  };
  // Your are checkbox
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ["Talent", "Athlete", "Influencer"];

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Dropdown toggle functions
  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((t) => t !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        talentDropdownRef.current &&
        !talentDropdownRef.current.contains(event.target)
      ) {
        setShowTalentDropdown(false);
      }
      if (
        representationDropdownRef.current &&
        !representationDropdownRef.current.contains(event.target)
      ) {
        setShowRepresentationDropdown(false);
      }
      if (
        habitsDropdownRef.current &&
        !habitsDropdownRef.current.contains(event.target)
      ) {
        setShowHabitsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isOtpOpen ? (
        <MotionPageWrapper>
          <div className="flex items-center justify-center min-h-screen px-4 py-12 relative bg-[#171717] overflow-hidden">
            {/* Overlay circles */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
            <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[40px] right-[40px] w-[80px] h-[80px] rounded-full bg-white opacity-[0.04]" />

            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 z-10">
              {/* Left: Signup Form (3/4 width on large screens) */}
              <div className="lg:w-[60%] bg-[#222222] p-8 rounded-xl border border-[#333333]">
                <h2 className="text-white text-3xl font-bold mb-8">
                  Join Fame Exchange
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First row - Talent Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Talent Name */}
                    <div>
                      <label
                        htmlFor="talentName"
                        className="block text-white text-sm font-medium mb-2"
                      >
                        Talent Name*
                      </label>
                      <div
                        className={`flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d] ${
                          touched.talentName && !isTalentNameValid
                            ? "border-red-500"
                            : "border-[#F3BA18]"
                        }`}
                      >
                        <FaUser className="text-gray-400 mr-3" />
                        <input
                          type="text"
                          id="talentName"
                          name="talentName"
                          placeholder="Talent Name"
                          value={formData.talentName}
                          onChange={handleChange}
                          onBlur={() =>
                            setTouched({ ...touched, talentName: true })
                          }
                          className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                        />
                      </div>
                      {touched.talentName && !isTalentNameValid && (
                        <p className="text-red-500 text-xs mt-1">
                          Talent name is required
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
                            : "border-[#F3BA18]"
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

                  {/* Second row - Stage Name and Brand Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stage Name */}
                    <div>
                      <label
                        htmlFor="stageName"
                        className="block text-white text-sm font-medium mb-2"
                      >
                        Stage Name
                      </label>
                      <div className="flex items-center border border-[#F3BA18] rounded-lg px-4 py-3 bg-[#2d2d2d]">
                        <FaUser className="text-gray-400 mr-3" />
                        <input
                          type="text"
                          id="stageName"
                          name="stageName"
                          placeholder="Stage Name"
                          value={formData.stageName}
                          onChange={handleChange}
                          className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Brand Name */}
                    <div>
                      <label
                        htmlFor="brandName"
                        className="block text-white text-sm font-medium mb-2"
                      >
                        Brand Name
                      </label>
                      <div className="flex items-center border border-[#F3BA18] rounded-lg px-4 py-3 bg-[#2d2d2d]">
                        <FaUser className="text-gray-400 mr-3" />
                        <input
                          type="text"
                          id="brandName"
                          name="brandName"
                          placeholder="Brand Name"
                          value={formData.brandName}
                          onChange={handleChange}
                          className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Single row - Password and Confirm Password */}
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
                            : "border-[#F3BA18]"
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
                          onBlur={() =>
                            setTouched({ ...touched, password: true })
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
                      {touched.password && !isPasswordValid && (
                        <p className="text-red-500 text-xs mt-1">
                          Password must be at least 6 characters
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
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
                            : "border-[#F3BA18]"
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
                      onChange={(e) => setIsOver18(e.target.checked)}
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
                  <div className="flex sm:flex-row flex-col sm:items-center gap-3">
                    <h3 className="text-white font-medium">You Are:</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                            className="h-5 w-5 rounded border-2 border-[#F3BA18] bg-transparent text-[#F3BA18] focus:ring-[#F3BA18] focus:ring-offset-[#171717]"
                          />
                          <span className="text-white">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Talent Dropdown */}
                  <div>
                    {/* <label className="block text-white text-sm font-medium mb-2">
                      What is your talent? (Select all that apply)*
                    </label> */}
                    <div className="relative" ref={talentDropdownRef}>
                      <button
                        type="button"
                        onClick={() =>
                          setShowTalentDropdown(!showTalentDropdown)
                        }
                        className="w-full flex items-center justify-between border border-[#F3BA18] rounded-lg px-4 py-3 bg-[#2d2d2d] text-white text-left"
                      >
                        <span>
                          {selectedTalents.length > 0
                            ? selectedTalents.join(", ")
                            : "What's Your Talent(s)"}
                        </span>
                        <FaChevronDown
                          className={`transition-transform ${
                            showTalentDropdown ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showTalentDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-[#2d2d2d] border border-[#F3BA18] rounded-lg shadow-lg max-h-60 overflow-auto">
                          {talentOptions.map((talent) => (
                            <div
                              key={talent}
                              className="p-3 hover:bg-[#3d3d3d]"
                            >
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedTalents.includes(talent)}
                                  onChange={() =>
                                    toggleSelection(
                                      talent,
                                      selectedTalents,
                                      setSelectedTalents
                                    )
                                  }
                                  className="rounded bg-transparent border-[#F3BA18] text-[#F3BA18] focus:ring-[#F3BA18] h-5 w-5"
                                />
                                <span className="text-white">{talent}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {touched.talentName && !isOver18 && (
                    <p className="text-red-500 text-xs mt-1">
                      You must be 18 or older to sign up
                    </p>
                  )}

                  {/* Representation Checkbox and Dropdown */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="representation"
                        checked={hasRepresentation}
                        onChange={(e) => {
                          setHasRepresentation(e.target.checked);
                          if (!e.target.checked) {
                            setSelectedRepresentationTypes([]);
                            setShowRepresentationDropdown(false);
                          }
                        }}
                        className="rounded bg-transparent border-[#F3BA18] text-[#F3BA18] focus:ring-[#F3BA18] h-5 w-5"
                      />
                      <label
                        htmlFor="representation"
                        className={`text-sm ${
                          hasRepresentation ? "text-[#F3BA18]" : "text-gray-400"
                        }`}
                      >
                        I am Represented
                      </label>
                    </div>

                    {hasRepresentation && (
                      <div>
                        {/* <label className="block text-white text-sm font-medium mb-2">
                          Representation Type (Select all that apply)
                        </label> */}
                        <div
                          className="relative"
                          ref={representationDropdownRef}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setShowRepresentationDropdown(
                                !showRepresentationDropdown
                              )
                            }
                            className="w-full flex items-center justify-between border border-[#F3BA18] rounded-lg px-4 py-3 bg-[#2d2d2d] text-white text-left"
                          >
                            <span>
                              {selectedRepresentationTypes.length > 0
                                ? selectedRepresentationTypes.join(", ")
                                : "Representation Type"}
                            </span>
                            <FaChevronDown
                              className={`transition-transform ${
                                showRepresentationDropdown
                                  ? "transform rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                          {showRepresentationDropdown && (
                            <div className="absolute z-10 mt-1 w-full bg-[#2d2d2d] border border-[#F3BA18] rounded-lg shadow-lg max-h-60 overflow-auto">
                              {representationOptions.map((type) => (
                                <div
                                  key={type}
                                  className="p-3 hover:bg-[#3d3d3d]"
                                >
                                  <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={selectedRepresentationTypes.includes(
                                        type
                                      )}
                                      onChange={() =>
                                        toggleSelection(
                                          type,
                                          selectedRepresentationTypes,
                                          setSelectedRepresentationTypes
                                        )
                                      }
                                      className="rounded bg-transparent border-[#F3BA18] text-[#F3BA18] focus:ring-[#F3BA18] h-5 w-5"
                                    />
                                    <span className="text-white">{type}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={
                      !isEmailValid ||
                      !isPasswordValid ||
                      !passwordsMatch ||
                      !isTalentNameValid ||
                      !isOver18
                    }
                    className="w-full bg-gradient-to-r from-[#F3BA18] to-[#FF9900] hover:from-[#FF9900] hover:to-[#F3BA18] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    Sign Up
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

                {/* Link to Login */}
                <p className="text-gray-400 text-center mt-6 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#F3BA18] hover:underline">
                    Log In
                  </Link>
                </p>
              </div>

              {/* Right Side Welcome (1/4 width on large screens) */}
              <div className="lg:w-[40%] flex flex-col items-start text-white space-y-6 pt-6">
                <Link to="/">
                  <img src={siteLogo} alt="Logo" />
                </Link>
                <h1 className="custom-heading-two mt-5">
                  WELCOME TO <br />{" "}
                  <span className="custom-heading-seven">THE FAME ECHANGE</span>
                </h1>
                <p className="text-white">
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
