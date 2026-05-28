import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import { openSignupModal as openSignupModalAction } from "../features/auth/signupModalSlice";

/**
 * Renders children blurred behind a sign-in / sign-up prompt when
 * the user is not authenticated.
 *
 * Use to gate full-page features (e.g. /trade-talent) without
 * redirecting away from the URL — the user still sees a preview of
 * what awaits them once they log in.
 */
const AuthGate = ({ children, title = "Sign in required", message }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((s) => s.auth?.accessToken);
  const user = useSelector((s) => s.auth?.user);
  const isAuthenticated = !!(accessToken && user);

  if (isAuthenticated) return children;

  return (
    <div className="relative min-h-screen">
      {/* Blurred page preview */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none filter blur-md opacity-50"
      >
        {children}
      </div>

      {/* Overlay popup */}
      <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 pt-[120px] pb-8">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-md bg-[#1c1c1c] border border-[#a38b41]/40 rounded-2xl p-8 shadow-2xl text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#a18a3f] to-[#e6ca7c] flex items-center justify-center">
            <FiLock className="text-3xl text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-300 mb-6">
            {message ||
              "Please sign in to your Fame Exchange account to start trading talent."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] hover:brightness-110 cursor-pointer font-medium text-black py-3 px-6 rounded-md transition-all"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => dispatch(openSignupModalAction())}
              className="border border-[#a38b41] text-[#a38b41] hover:bg-[#a38b41]/10 py-3 px-6 rounded-md transition-all cursor-pointer"
            >
              Create Account
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 text-xs text-gray-400 hover:text-white underline cursor-pointer"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthGate;
