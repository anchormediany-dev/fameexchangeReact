import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";

export default function ProfileQRCode({ talentId }) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `${window.location.origin}/talent-profile/${talentId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success("Profile link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link — please copy it manually.");
    }
  };

  const handleDownload = () => {
    const canvas = document.getElementById(`profile-qr-${talentId}`);
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "profile-qr-code.png";
    link.click();
  };

  if (!talentId) return null;

  return (
    <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl p-6 space-y-4 text-center">
      <h3 className="text-white text-lg font-bold">Share Your Profile</h3>
      <p className="text-gray-400 text-sm">
        Scan or share this QR code to send fans straight to your public profile.
      </p>
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-xl">
          <QRCodeCanvas
            id={`profile-qr-${talentId}`}
            value={profileUrl}
            size={200}
            level="M"
          />
        </div>
      </div>
      <p className="text-gray-500 text-xs break-all">{profileUrl}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={handleCopy}
          className="custom-button-two px-6 py-2 rounded-lg font-semibold text-sm"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="px-6 py-2 rounded-lg font-semibold text-sm border border-[#444] text-white hover:border-[#F3BA18] hover:text-[#F3BA18] transition"
        >
          Download QR
        </button>
      </div>
    </div>
  );
}
