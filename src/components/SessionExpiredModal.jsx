import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { resetSessionExpiredFlag } from "../app/api";

/**
 * Listens for the global `session-expired` window event (dispatched from
 * the RTK Query base layer when the backend reports an expired/invalid
 * JWT) and shows a blocking modal asking the user to log in again.
 */
const SessionExpiredModal = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("session-expired", handler);
    return () => window.removeEventListener("session-expired", handler);
  }, []);

  if (!open) return null;

  const handleLogin = () => {
    setOpen(false);
    resetSessionExpiredFlag();
    // Clear stale credentials so the login screen starts clean.
    dispatch(logout());
    const redirect = `${location.pathname}${location.search}`;
    navigate(`/login?redirect=${encodeURIComponent(redirect)}`, {
      replace: true,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-expired-title"
    >
      <div className="w-full max-w-md bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#c9a227]/15 text-[#c9a227] flex items-center justify-center text-xl font-bold">
            !
          </div>
          <div>
            <h2
              id="session-expired-title"
              className="text-lg font-semibold text-white"
            >
              Session Expired
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Your session has expired. Please login again to continue.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="w-full mt-2 py-3 rounded-lg bg-[#c9a227] text-black font-semibold hover:bg-[#b48f1f] transition-colors cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
