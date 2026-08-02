import { useState, useEffect } from "react";
import MotionPageWrapper from "./MotionPageWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useVerifyOtpMutation,
  useForgetPasswordMutation,
} from "../app/authApi";

const Verification = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resend, { isLoading: isResending }] = useForgetPasswordMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) navigate("/forgot-password", { replace: true });
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value.replace(/\D/g, "");
    setCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleContinue = async () => {
    const otp = code.join("");
    if (otp.length !== 4 || !email) return;

    try {
      await verifyOtp({ email, otp }).unwrap(); // { email, otp }
      navigate("/reset-password", { state: { email, otp } });
    } catch (err) {
      console.error("OTP verify failed:", err);
      alert(err?.data?.message || "Invalid code");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await resend({ email }).unwrap();
      alert("OTP resent to your email");
    } catch (err) {
      console.error("Resend failed:", err);
      alert(err?.data?.message || "Failed to resend");
    }
  };

  return (
    <MotionPageWrapper>
      <div className="flex items-center justify-center px-4 py-16 relative overflow-hidden bg-[#0b0b0b]">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white opacity-[0.03]" />
        <div className="absolute top-[120px] right-[180px] w-[120px] h-[120px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[100px] left-[80px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />
        <div className="absolute bottom-[30px] right-[60px] w-[50px] h-[50px] rounded-full bg-white opacity-[0.06]" />

        <div className="w-full max-w-md bg-transparent p-8 rounded-lg text-center space-y-6 z-10 border border-[#272727]">
          <h2 className="heading-700-40 text-white">Verification</h2>
          <p className="text-grayLabel heading-500-30">Enter Your Code Here</p>

          <div className="flex justify-center gap-4 mt-4">
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
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-12 h-12 md:w-14 md:h-14 text-center text-white text-xl rounded border border-[#F3BA18] bg-transparent outline-none focus:ring-2 focus:ring-[#F3BA18] transition"
              />
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full bg-black cursor-pointer disabled:opacity-60 text-[#F3BA18] py-2 hover:bg-[#F3BA18] hover:text-black rounded-md transition-all duration-300 heading-500-23"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>

          <p className="heading-500-20 text-white mt-2">
            I Don't Receive A Code{" "}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-[#F3BA18] underline cursor-pointer hover:underline ml-1 disabled:opacity-60"
            >
              {isResending ? "Resending..." : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </MotionPageWrapper>
  );
};

export default Verification;
