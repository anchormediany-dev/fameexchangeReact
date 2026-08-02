import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MotionPageWrapper from "./MotionPageWrapper";
// import VerifyId from "../components/VerifyId";
import { useVerifyOtpMutation, useResendOtpMutation } from "../app/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { openSignupModal as openSignupModalAction } from "../features/auth/signupModalSlice";
const SignupOtpVerification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || sessionStorage.getItem("signupEmail");
  const [code, setCode] = useState(["", "", "", ""]);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [verifyOtp, { isLoading, isError, error }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  useEffect(() => {
    if (!email) {
      dispatch(openSignupModalAction());
    }
  }, [email, navigate]);

  // Hooks above must all run every render (Rules of Hooks) — the early
  // return has to come after every hook call, not before.
  if (!email) return null;
  const handleResendOtp = async () => {
    try {
      const res = await resendOtp({ email }).unwrap();
      toast.success(res.message || "OTP resent successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP.");
    }
  };
  const handleChange = (value, index) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleContinue = async () => {
    if (code.some((c) => c.trim() === "")) {
      toast.error("Please enter all 4 digits");
      return;
    }

    try {
      const otp = code.join("");
      const res = await verifyOtp({ email, otp }).unwrap();
      toast.success("OTP Verified Successfully!");
      setTimeout(() => {
        navigate("/verify-id");
      }, 500);
      // setIsVerifyOpen(true);
    } catch (err) {
      toast.error(err?.data?.error || "OTP verification failed.");
    }
  };

  return (
    <>
      {/* {!isVerifyOpen ? ( */}
      <MotionPageWrapper>
        <div className="flex items-center h-screen justify-center px-4 py-16 relative overflow-hidden bg-[#0b0b0b]">
          {/* Background circles */}
          <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
          <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
          <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
          <div className="absolute bottom-[30px] right-[60px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />

          <div className="w-full max-w-md bg-transparent p-8 rounded-lg text-center space-y-6 z-10 border border-[#272727]">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Verification
            </h2>
            <p className="text-grayLabel text-sm">
              Enter the OTP sent to <b>{email}</b>
            </p>

            {/* OTP Boxes */}
            <div className="flex justify-center gap-4 mt-4">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-white text-xl rounded border border-[#F3BA18] bg-transparent outline-none focus:ring-2 focus:ring-[#F3BA18] transition"
                />
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={isLoading}
              className="w-full bg-black cursor-pointer text-[#F3BA18] py-2 hover:bg-[#F3BA18] hover:text-black font-medium rounded-md transition-all duration-300 text-p5 2xl:text-p1 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Continue"}
            </button>

            {/* Resend */}
            <p className="text-xs text-white mt-2">
              Didn't receive a code?
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-[#F3BA18] underline ml-1 cursor-pointer hover:underline"
              >
                {isResending ? "Sending..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </MotionPageWrapper>
      {/* ) : (
        <VerifyId />
      )} */}
    </>
  );
};

export default SignupOtpVerification;
