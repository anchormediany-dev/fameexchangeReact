import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaDownload,
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaEnvelope,
  FaImage,
  FaFile,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { imgSrc } from "../utils/imgSrc";

const GOLD = "#a38b41";

const KYCDetailsPageForTalent = ({ data: apiData, error, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "N/A";
  const fmtDT = (d) =>
    d
      ? new Date(d).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      : "N/A";

  const getName = (url) =>
    !url ? "Unknown File" : url.split("/").pop() || "Unknown File";

  const splitUploads = (uploads = []) => {
    const images = [];
    const files = [];
    uploads.forEach((u) => {
      const doc = {
        id: u._id || Math.random(),
        name: getName(u.fileUrl),
        type: u.fileType,
        url: u.fileUrl,
        verification: u.verification,
        uploadedAt: u.verifiedAt,
      };
      const ext = (u.fileType || "").toLowerCase();
      ["webp", "jpg", "jpeg", "png", "gif"].includes(ext)
        ? images.push(doc)
        : files.push(doc);
    });
    return { images, files };
  };

  const shape = (() => {
    if (!apiData?.success) return null;
    const { user, userDocument } = apiData;
    const { images, files } = splitUploads(userDocument?.uploads || []);
    return {
      user: {
        name: user?.name || "N/A",
        email: user?.email || "N/A",
        joinDate: fmtDate(user?.createdAt),
        idType: "User",
        docsType: "KYC Documents",
        stageName: user?.stage_name || "N/A",
        tokenBrandName: user?.token_brand_name || "N/A",
      },
      status: {
        current: (userDocument?.status || "pending").toLowerCase(),
        requestStarted: fmtDate(userDocument?.createdAt),
        lastUpdated: fmtDate(userDocument?.updatedAt),
        isVerified: !!userDocument?.isKYCVerified,
        rejectionReason: userDocument?.rejectionReason || "",
      },
      docs: { images, files },
    };
  })();

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner
            className="animate-spin text-3xl"
            style={{ color: GOLD }}
          />
          <p className="text-gray-400 mt-2">Loading KYC details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-center text-red-400">
          <FaTimes className="text-3xl mx-auto mb-2" />
          <p>Error loading KYC details</p>
        </div>
      </div>
    );
  }

  const kyc = shape || {
    user: {
      name: "—",
      email: "—",
      joinDate: "—",
      idType: "—",
      docsType: "—",
      stageName: "—",
      tokenBrandName: "—",
    },
    status: {
      current: "pending",
      requestStarted: "—",
      lastUpdated: "—",
      isVerified: false,
      rejectionReason: "",
    },
    docs: { images: [], files: [] },
  };

  return (
    <div className="bg-[#171717]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: details + documents (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header strip (avatar + name + email + status) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(90deg, ${GOLD}, #c2ab67)`,
                  }}
                >
                  <span className="text-black font-bold text-lg">
                    {String(kyc.user.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">
                    {kyc.user.name}
                  </div>
                  <div className="text-gray-400 text-sm">{kyc.user.email}</div>
                </div>
              </div>
              <StatusPill status={kyc.status.current} />
            </div>
          </motion.div>

          {/* KYC details grid (like top card in screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <FaUser className="mr-2" style={{ color: GOLD }} /> KYC Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField
                icon={FaUser}
                label="Full Name"
                value={kyc.user.name}
              />
              <InfoField
                icon={FaCalendarAlt}
                label="Join Date"
                value={kyc.user.joinDate}
              />
              <InfoField
                icon={FaIdCard}
                label="ID Type"
                value={kyc.user.idType}
              />
              <InfoField
                icon={FaIdCard}
                label="Documents Type"
                value={kyc.user.docsType}
              />
              <InfoField
                icon={FaEnvelope}
                label="User Email"
                value={kyc.user.email}
              />
              <InfoField
                icon={FaUser}
                label="Stage Name"
                value={kyc.user.stageName}
              />
              <InfoField
                icon={FaIdCard}
                label="Token Brand Name"
                value={kyc.user.tokenBrandName}
                full
              />
            </div>
          </motion.div>

          {/* Documents block (images + files) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-6"
          >
            {!!kyc.docs.images.length && (
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FaImage className="mr-2" style={{ color: GOLD }} /> Document
                  Images ({kyc.docs.images.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kyc.docs.images.map((doc) => (
                    <ImageDoc
                      key={doc.id}
                      doc={doc}
                      onOpen={() => setSelectedImage(doc)}
                    />
                  ))}
                </div>
              </div>
            )}

            {!!kyc.docs.files.length && (
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FaFile className="mr-2" style={{ color: GOLD }} /> Files (
                  {kyc.docs.files.length})
                </h3>
                <div className="space-y-3">
                  {kyc.docs.files.map((f) => (
                    <FileRow key={f.id} file={f} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT: status panel (1 col) */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FaClock className="mr-2" style={{ color: GOLD }} /> KYC Status
            </h2>
            <div className="space-y-4">
              <StatusPill status={kyc.status.current} />
              <KV label="Request Started" value={kyc.status.requestStarted} />
              <KV label="Last Updated" value={kyc.status.lastUpdated} />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">KYC Verified</span>
                <span>
                  {kyc.status.isKYCVerified ? (
                    <FaCheckCircle className="text-green-400 text-lg" />
                  ) : (
                    <FaTimesCircle className="text-red-400 text-lg" />
                  )}
                </span>
              </div>
              {!!kyc.status.rejectionReason && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">
                    <strong>Rejection Reason:</strong>{" "}
                    {kyc.status.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen image viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imgSrc(selectedImage.url)}
              alt={selectedImage.name}
              className="rounded-lg max-w-full max-h-full"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/800x600?text=Image")
              }
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ——— Small bits ——— */
const StatusPill = ({ status }) => {
  const map = {
    approved: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      dot: "bg-green-400",
      br: "border-green-500/20",
    },
    rejected: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      dot: "bg-red-400",
      br: "border-red-500/20",
    },
    pending: {
      bg: "bg-[#a38b41]/10",
      text: "text-[#a38b41]",
      dot: "bg-[#a38b41]",
      br: "border-[#a38b41]/20",
    },
  };
  const s = map[status] || map.pending;
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${s.bg} ${s.text} ${s.br}`}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${s.dot}`} />{" "}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const InfoField = ({ icon: Icon, label, value, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <div className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-600">
      <div
        className="p-2 rounded-lg"
        style={{ background: "rgba(163,139,65,.1)" }}
      >
        <Icon size={16} style={{ color: GOLD }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-400 mb-1">{label}</div>
        <div className="text-white font-medium truncate">{value}</div>
      </div>
    </div>
  </div>
);

const ImageDoc = ({ doc, onOpen }) => (
  <div className="group relative bg-[#2a2a2a] rounded-lg overflow-hidden border border-gray-600 hover:border-[#a38b41] transition-all">
    {/* <div className="relative aspect-video">
      <img
        src={imgSrc(doc.url)}
        alt={doc.name}
        className="w-full h-full object-cover"
        onClick={onOpen}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
    </div> */}
    <div className="p-3">
      <p className="">
        <a
          href={imgSrc(doc?.url)}
          download
          target="_blank"
          className="p-2  hover:text-[#a38b41] transition-colors text-blue-400 underline text-sm font-medium truncate max-w-xs"
        >
          {doc?.name}
        </a>
      </p>
      {/* <p className="text-gray-400 text-xs capitalize">
        {doc.type} • {doc.verification?.status || "—"}
      </p> */}
    </div>
  </div>
);

const FileRow = ({ file }) => (
  <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 hover:border-[#a38b41] transition-all">
    <p className="">
      <a
        href={imgSrc(file?.url)}
        download
        target="_blank"
        className="p-2  hover:text-[#a38b41] transition-colors text-blue-400 underline text-sm font-medium truncate max-w-xs"
      >
        {file?.name}
      </a>
    </p>
  </div>
);

const KV = ({ label, value, valueClass = "text-white" }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-400">{label}</span>
    <span className={valueClass}>{value}</span>
  </div>
);

export default KYCDetailsPageForTalent;
