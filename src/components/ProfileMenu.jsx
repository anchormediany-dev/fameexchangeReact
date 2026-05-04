// components/ProfileMenu.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiExternalLink,
  FiEye,
  FiLink,
  FiLogOut,
  FiCreditCard,
} from "react-icons/fi";
import { useAuth } from "../utils/auth/useAuth";
export default function ProfileMenu({
  user = { name: "User", avatarUrl: "" },
  onLogout,
}) {
  const navigate = useNavigate();
  const { user: userDetails, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);
  const userLocalData = JSON.parse(localStorage.getItem("user"));
  const isRoleTalent = userLocalData?.role === "TALENT";
  const isRoleFan = userLocalData?.role === "FAN";
  const isRoleAdmin = userLocalData?.role === "ADMIN";
  const roleId = userLocalData?.id;

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  useEffect(() => {
    const onDown = (e) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        close();
      }
    };
    const onEsc = (e) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const items = [
    {
      label: "Logout",
      icon: FiLogOut,
      danger: true,
      action: () => {
        close();
        onLogout?.();
      },
    },
  ];

  const Initial = ({ name }) => {
    const first = (name || "U").trim()[0]?.toUpperCase() ?? "U";
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full gradient-bg text-white text-sm font-semibold shadow-md ring-2 ring-white/50 dark:ring-white/10">
        {first}
      </div>
    );
  };

  return (
    <div className="relative text-black">
      {/* Trigger */}
      <motion.button
        ref={btnRef}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className=""
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {user?.avatarUrl ? (
          <img
            src={user?.avatarUrl}
            alt={user?.name || "User"}
            className="h-4 w-4 rounded-full object-cover ring-2 ring-white/60 dark:ring-white/10"
          />
        ) : (
          <Initial name={user?.name} />
        )}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-neutral-500 dark:text-neutral-300"
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-gray-700 bg-[#2a2a2a] p-3 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-3 flex items-center gap-3 rounded-lg bg-[#1f1f1f] px-3 py-3 border border-gray-700">
              {user?.avatarUrl ? (
                <img
                  src={user?.avatarUrl}
                  alt={user?.name || "User"}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/50"
                />
              ) : (
                <Initial name={user?.name} />
              )}

              {/* Text block can shrink & wrap */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.name || "User"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      userDetails?.role === "ADMIN"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : userDetails?.role === "TALENT"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : userDetails?.role === "FAN"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                    }`}
                  >
                    {userDetails?.role?.toUpperCase() || "USER"}
                  </span>
                </div>
              </div>
            </div>

            <div className="my-2 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            {isRoleTalent && (
              <div className="flex flex-col gap-2 mb-2">
                <Link
                  to={`/talent/${roleId}`}
                  className="flex gap-3 items-center px-3 py-2.5 rounded-lg text-white hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-700"
                >
                  <FiLink className="text-[18px] text-primary" />
                  <span className="text-sm font-medium">View Profile</span>
                </Link>
                <Link
                  to={`/update-profile/${roleId}`}
                  className="flex gap-3 items-center px-3 py-2.5 rounded-lg text-white hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-700"
                >
                  <FiEdit className="text-[18px] text-primary" />
                  <span className="text-sm font-medium">Update Profile</span>
                </Link>
                <Link
                  to={`/verify-id`}
                  className="flex gap-3 items-center px-3 py-2.5 rounded-lg text-white hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-700"
                >
                  <FiExternalLink className="text-[18px] text-primary" />
                  <span className="text-sm font-medium">KYC</span>
                </Link>
                <Link
                  to="/trading-dashboard"
                  onClick={close}
                  className="flex gap-3 items-center px-3 py-2.5 rounded-lg text-white hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-700"
                >
                  <FiCreditCard className="text-[18px] text-primary" />
                  <span className="text-sm font-medium">
                    Wallet &amp; Transactions
                  </span>
                </Link>
              </div>
            )}
            {isRoleFan && (
              <div className="flex flex-col gap-2 mb-2">
                <Link
                  to={`/fan/${roleId}`}
                  className="flex gap-3 items-center px-3 py-2.5 rounded-lg text-white hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-700"
                >
                  <FiLink className="text-[18px] text-primary" />
                  <span className="text-sm font-medium">View Profile</span>
                </Link>
                <Link
                  to={`/update-profile/${roleId}`}
                  className="flex gap-3 items-center px-3 py-2.5 rounded-lg text-white hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-700"
                >
                  <FiEdit className="text-[18px] text-primary" />
                  <span className="text-sm font-medium">Update Profile</span>
                </Link>
                <Link
                  to="/trading-dashboard"
                  onClick={close}
                  className="flex gap-3 items-center px-3 py-2.5 rounded-lg text-white hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-700"
                >
                  <FiCreditCard className="text-[18px] text-primary" />
                  <span className="text-sm font-medium">
                    Wallet &amp; Transactions
                  </span>
                </Link>
              </div>
            )}
            {isRoleAdmin && (
              <div className="mb-2">
                <Link
                  to={`/admin`}
                  className="flex gap-3 items-center px-3 py-2.5 rounded-lg text-white hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-700"
                >
                  <FiLink className="text-[18px] text-primary" />
                  <span className="text-sm font-medium">Admin Dashboard</span>
                </Link>
              </div>
            )}
            {/* {isRoleFan && (
              <Link
                to={`/talent/${roleId}`}
                className="flex gap-3 justify-center items-center"
              >
                {" "}
                <FiLink className="text-[18px]" />
                <span className="text-sm font-medium">Open Profile</span>
              </Link>
            )} */}
            {/* Divider before logout */}
            <div className="my-2 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            
            {/* Items */}
            <ul className="space-y-1">
              {items.map(({ label, icon: Icon, action, danger }) => (
                <li key={label}>
                  <button
                    onClick={action}
                    className={[
                      "group flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg text-left transition",
                      danger
                        ? "text-red-300 hover:bg-red-500/10 hover:text-red-200 border border-transparent hover:border-red-500/30"
                        : "text-white hover:bg-[#1f1f1f] border border-transparent hover:border-gray-700",
                    ].join(" ")}
                  >
                    <span className="grid h-4 w-4 place-items-center">
                      <Icon className="text-[18px]" />
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
