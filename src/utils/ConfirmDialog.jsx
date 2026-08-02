// components/ui/ConfirmDialog.jsx
import { useEffect, useRef } from "react";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";

const VARIANTS = {
  danger: {
    iconClass: "text-red-300",
    chipClass: "bg-red-500/20 border-red-400/30",
    confirmBtn:
      "bg-red-500/20 text-red-200 border border-red-400/30 hover:bg-red-500/30",
  },
  default: {
    iconClass: "text-yellow-300",
    chipClass: "bg-yellow-500/20 border-yellow-400/30",
    confirmBtn:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20",
  },
};

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  pending = false,
  variant = "danger", // "danger" | "default"
  icon = null,
  children,
}) => {
  const confirmRef = useRef(null);
  const v = VARIANTS[variant] ?? VARIANTS.default;

  useEffect(() => {
    if (open) {
      // focus the confirm button for quick keyboard access
      setTimeout(() => confirmRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !pending) onClose?.();
      if ((e.key === "Enter" || e.key === " ") && !pending) onConfirm?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, pending, onClose, onConfirm]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={pending ? undefined : onClose}
      />
      {/* Dialog */}
      <div
        className="relative h-full w-full flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <div className="w-[min(92vw,560px)] bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-2xl p-5">
          <div className="flex items-start gap-3">
            <div
              className={`shrink-0 w-10 h-10 rounded-xl ${v.chipClass} flex items-center justify-center`}
            >
              {icon ? (
                icon
              ) : variant === "danger" ? (
                <FiTrash2 className={`w-5 h-5 ${v.iconClass}`} />
              ) : (
                <FiAlertTriangle className={`w-5 h-5 ${v.iconClass}`} />
              )}
            </div>

            <div className="min-w-0">
              <h3
                id="confirm-title"
                className="text-lg font-semibold"
                style={{
                  background: "linear-gradient(to right, #a38b41, #d4c374)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {title}
              </h3>
              {description ? (
                <p className="text-sm text-gray-300 mt-1">{description}</p>
              ) : null}
            </div>
          </div>

          {children ? (
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 max-h-48 overflow-auto">
              {children}
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm disabled:opacity-60"
            >
              {cancelText}
            </button>
            <button
              type="button"
              ref={confirmRef}
              onClick={onConfirm}
              disabled={pending}
              className={`px-3 py-2 rounded-lg transition text-sm disabled:opacity-60 ${v.confirmBtn} flex items-center gap-2`}
            >
              {pending ? "Please wait..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
