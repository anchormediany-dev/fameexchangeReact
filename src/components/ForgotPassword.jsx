import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import MotionPageWrapper from "./MotionPageWrapper";
import Verification from "./Verification";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setIsEmailEntered(true);
  };

  return (
    <>
      {!isEmailEntered ? (
        <MotionPageWrapper>
          <div className="min-h-screen flex items-center justify-center px-4 relative bg-[#0b0b0b]">
            {/* Bubbles */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
            <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
            <div className="absolute bottom-[40px] right-[40px] w-[80px] h-[80px] rounded-full bg-white opacity-[0.04]" />

            <div className="bg-transparent border border-[#686868] w-full max-w-md p-8 rounded-lg z-10">
              <h2 className="text-center heading-700-40 text-white mb-6">
                Enter Your Email
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="text-white heading-500-20">
                    Email
                  </label>
                  <div className="flex items-center border border-[#F3BA18] rounded-md px-3 py-2 mt-1 bg-transparent focus-within:ring-2 focus-within:ring-[#F3BA18]">
                    <FaEnvelope className="text-white mr-2" />
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent outline-none w-full text-white heading-400-15  placeholder-white"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black cursor-pointer text-[#F3BA18] py-2  hover:bg-[#F3BA18] hover:text-black rounded-md transition-all duration-300 heading-500-23"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </MotionPageWrapper>
      ) : (
        <>
          <Verification />
        </>
      )}
    </>
  );
};

export default ForgotPassword;
