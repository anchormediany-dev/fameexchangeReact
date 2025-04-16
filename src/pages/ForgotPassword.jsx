import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import MotionPageWrapper from "../components/MotionPageWrapper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    navigate("/verification");
  };

  return (
    <MotionPageWrapper>
      <div className="min-h-screen flex items-center justify-center px-4 relative bg-[#0b0b0b]">
        {/* Bubbles */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
        <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[40px] right-[40px] w-[80px] h-[80px] rounded-full bg-white opacity-[0.04]" />

        <div className="bg-transparent border border-[#686868] w-full max-w-md p-8 rounded-lg z-10">
          <h2 className="text-center text-2xl font-bold text-white mb-6">
            Enter Your Email
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-white text-sm">
                Email
              </label>
              <div className="flex items-center border border-[#F3BA18] rounded-md px-3 py-2 mt-1 bg-transparent focus-within:ring-2 focus-within:ring-[#F3BA18]">
                <FaEnvelope className="text-grayDescription mr-2" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none w-full text-white text-p5 placeholder:font-normal placeholder-grayDescription"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-[#F3BA18] py-2  hover:bg-[#F3BA18] hover:text-black  font-medium  rounded-md transition-all duration-300  text-p5  2xl:text-p1"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </MotionPageWrapper>
  );
};

export default ForgotPassword;
