import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetKYCDocumentsQuery,
  useAdminKycConfirmationMutation,
} from "../app/authApi";
import {
  FaCheck,
  FaTimes,
  FaDownload,
  FaExpand,
  FaUser,
  FaIdCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaPaperclip,
  FaPaperPlane,
  FaImage,
  FaFile,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { imgSrc } from "../utils/imgSrc";

const KYCDetailsPage = () => {
  const { id: userId } = useParams();
  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useGetKYCDocumentsQuery(userId);
  const [adminKycConfirmation, { isLoading: isVerifying }] =
    useAdminKycConfirmationMutation();
  const [kycStatus, setKycStatus] = useState("pending");
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRejectionPopup, setShowRejectionPopup] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [verifyingDocumentId, setVerifyingDocumentId] = useState(null);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Format datetime function
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Extract file name from URL
  const getFileNameFromUrl = (url) => {
    if (!url) return "Unknown File";
    return url.split("/").pop() || "Unknown File";
  };

  // Handle individual document verification
  const handleDocumentVerification = async (action) => {
    
    try {
      // setVerifyingDocumentId(documentId);
      const userDocumentId = apiData?.userDocument?._id;
      const verificationData = {
        selectedRequestId: userDocumentId,
        action: action,
        rejectionReason: action === "REJECTED" ? rejectionReason : "",
      };

      await adminKycConfirmation(verificationData).unwrap();

      // Refetch data to get updated status
      await refetch();

      // Reset rejection reason and close popup
      setRejectionReason("");
      setShowRejectionPopup(false);
      setVerifyingDocumentId(null);

      console.log(`Document ${action} successfully`);
    } catch (error) {
      console.error("Error verifying document:", error);
      setVerifyingDocumentId(null);
    }
  };

  // Handle KYC verification (for entire application)
  const handleKYCVerification = async (action) => {
    try {
      // Get the user document ID from API data
      const userDocumentId = apiData?.userDocument?._id;

      if (!userDocumentId) {
        console.error("No user document ID found");
        return;
      }

      const verificationData = {
        selectedRequestId: userDocumentId,
        action: action,
        rejectionReason: action === "REJECTED" ? rejectionReason : "",
      };

      await adminKycConfirmation(verificationData).unwrap();

      // Refetch data to get updated status
      await refetch();

      // Reset rejection reason and close popup
      setRejectionReason("");
      setShowRejectionPopup(false);

      console.log(`KYC ${action} successfully`);
    } catch (error) {
      console.error("Error verifying KYC:", error);
    }
  };

  // Handle reject button click for individual document
  const handleDocumentRejectClick = () => {
    setShowRejectionPopup(true);
  };

  // Handle reject confirmation for individual document
  const handleDocumentRejectConfirm = () => {
    if (
      rejectionReason.trim() ||
      window.confirm(
        "Are you sure you want to reject without providing a reason?"
      )
    ) {
      handleDocumentVerification(verifyingDocumentId, "REJECTED");
    }
  };

  // Handle reject cancel
  const handleRejectCancel = () => {
    setShowRejectionPopup(false);
    setRejectionReason("");
    setVerifyingDocumentId(null);
  };

  // Process API data
  const processApiData = () => {
    if (!apiData?.success) return null;

    const { user, userDocument } = apiData;
    const talentUploads = userDocument?.uploads || [];
    const talentDocumentId = userDocument?._id || "";

    return {
      user: {
        name: user?.name || "N/A",
        email: user?.email || "N/A",
        joinDate: formatDate(user?.createdAt),
        idType: "User",
        documentType: "KYC Documents",
        dateOfIssue: "N/A",
        dateOfExpiry: "N/A",
        address: "N/A",
        stageName: user?.stage_name || "N/A",
        talent: user?.talent?.join(", ") || "N/A",
        tokenBrandName: user?.token_brand_name || "N/A",
      },
      status: {
        current: userDocument?.status?.toLowerCase() || "pending",
        requestStarted: formatDate(userDocument?.createdAt),
        lastUpdated: formatDate(userDocument?.updatedAt),
        isKYCVerified: userDocument?.isKYCVerified || false,
        rejectionReason: userDocument?.rejectionReason || "",
      },
      talentUploads: talentUploads.map((upload) => ({
        id: upload._id || Math.random(),
        name: getFileNameFromUrl(upload.fileUrl),
        type: upload.fileType,
        url: upload.fileUrl,
        verification: upload.verification,
        uploadedAt: upload.verifiedAt,
        documentId: upload._id, // Add document ID for individual verification
      })),
      messages:
        userDocument?.messages?.map((msg) => ({
          id: msg._id || Math.random(),
          user: msg.role === "user" ? user?.name : "Admin",
          text: msg.text,
          time: formatDateTime(msg.sentAt),
          isAdmin: msg.role !== "user",
          images: msg.images || [],
          files: msg.files || [],
        })) || [],
      submission: {
        user: user?.name || "N/A",
        date: formatDateTime(userDocument?.createdAt),
      },
      userDocumentId: userDocument?._id, // Add user document ID for verification
    };
  };

  const kycData = processApiData() || {
    user: {
      name: "Loading...",
      email: "Loading...",
      joinDate: "Loading...",
      idType: "Loading...",
      documentType: "Loading...",
      dateOfIssue: "Loading...",
      dateOfExpiry: "Loading...",
      address: "Loading...",
      stageName: "Loading...",
      talent: "Loading...",
      tokenBrandName: "Loading...",
    },
    status: {
      current: "pending",
      requestStarted: "Loading...",
      lastUpdated: "Loading...",
      isKYCVerified: false,
      rejectionReason: "",
    },
    talentUploads: [],
    messages: [],
    submission: {
      user: "Loading...",
      date: "Loading...",
    },
    userDocumentId: null,
  };

  const handleStatusUpdate = (status) => {
    setKycStatus(status);
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log("Comment sent:", comment);
      setComment("");
    }
  };

  const StatusIndicator = ({ status }) => (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
        status === "approved"
          ? "bg-green-500/10 text-green-400 border-green-500/20"
          : status === "rejected"
          ? "bg-red-500/10 text-red-400 border-red-500/20"
          : "bg-[#a38b41]/10 text-[#a38b41] border-[#a38b41]/20"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          status === "approved"
            ? "bg-green-400"
            : status === "rejected"
            ? "bg-red-400"
            : "bg-[#a38b41]"
        }`}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-[#171717] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-3xl text-[#a38b41] mx-auto mb-4" />
          <p className="text-gray-400">Loading KYC details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#171717] min-h-screen flex items-center justify-center">
        <div className="text-center text-red-400">
          <FaTimes className="text-3xl mx-auto mb-4" />
          <p>Error loading KYC details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#171717] py-12 2xl:py-16 px-4 min-h-screen">
      <div className="container mt-10 lg:mt-16 2xl:mt-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* KYC Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FaUser className="mr-2 text-[#a38b41]" />
                User Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  icon={FaUser}
                  label="Full Name"
                  value={kycData.user.name}
                />
                <InfoField
                  icon={FaCalendarAlt}
                  label="Join Date"
                  value={kycData.user.joinDate}
                />
                <InfoField
                  icon={FaIdCard}
                  label="ID Type"
                  value={kycData.user.idType}
                />
                <InfoField
                  icon={FaIdCard}
                  label="Documents Type"
                  value={kycData.user.documentType}
                />
                <InfoField
                  icon={FaEnvelope}
                  label="User Email"
                  value={kycData.user.email}
                />
                <InfoField
                  icon={FaUser}
                  label="Stage Name"
                  value={kycData.user.stageName}
                />
                <InfoField
                  icon={FaIdCard}
                  label="Token Brand Name"
                  value={kycData.user.tokenBrandName}
                  colSpan="full"
                />
              </div>
            </motion.div>

            {/* Documents Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Talent Uploads */}
              {kycData.talentUploads?.length > 0 && (
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <FaImage className="mr-2 text-[#a38b41]" />
                    Documents ({kycData.talentUploads?.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {kycData.talentUploads?.map((document) => (
                      <DocumentCard
                        key={document.id}
                        document={document}
                        onApprove={() => handleDocumentVerification("VERIFIED")}
                        onReject={() => handleDocumentVerification("REJECTED")}
                        isVerifying={
                          verifyingDocumentId === document.documentId
                        }
                        verificationStatus={document.verification?.status}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Messages Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Communication ({kycData.messages.length})
              </h2>

              {/* Messages List */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {kycData.messages.length > 0 ? (
                  kycData.messages.map((message) => (
                    <CommentBubble key={message.id} comment={message} />
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No messages yet
                  </p>
                )}
              </div>

              {/* Add Comment */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Reply / Send Message
                </h3>
                <div className="space-y-3">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a38b41] focus:border-transparent outline-none text-white resize-none"
                    rows="3"
                  />
                  <div className="flex justify-end items-center">
                    <button
                      onClick={handleSendComment}
                      disabled={!comment.trim()}
                      className="px-6 py-2 cursor-pointer bg-gradient-to-r from-[#a38b41] to-[#c2ab67] text-black rounded-lg hover:from-[#b59a4a] hover:to-[#d4bc7d] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <FaPaperPlane />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right 1/3 */}
          <div className="space-y-6">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaClock className="mr-2 text-[#a38b41]" />
                KYC Status
              </h2>

              <div className="space-y-4">
                <StatusIndicator status={kycData.status.current} />

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Request Started</span>
                    <span className="text-white">
                      {kycData.status.requestStarted}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-white">
                      {kycData.status.lastUpdated}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">KYC Verified</span>
                    <span
                      className={`font-medium ${
                        kycData.status.isKYCVerified
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {kycData.status.isKYCVerified ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {kycData.status.rejectionReason && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 text-sm">
                      <strong>Rejection Reason:</strong>{" "}
                      {kycData.status.rejectionReason}
                    </p>
                  </div>
                )}

                {/* KYC Verification Actions */}
                {/* <div className="pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium text-white mb-3">
                    Verify KYC Application
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleKYCVerification("VERIFIED")}
                      disabled={
                        isVerifying || kycData.status.current === "approved"
                      }
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                    >
                      {isVerifying ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaCheck />
                      )}
                      <span>Approve KYC</span>
                    </button>

                    <button
                      onClick={() => handleKYCVerification("REJECTED")}
                      disabled={
                        isVerifying || kycData.status.current === "rejected"
                      }
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                    >
                      {isVerifying ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaTimes />
                      )}
                      <span>Reject KYC</span>
                    </button>
                  </div>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rejection Reason Popup */}
      {showRejectionPopup && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Rejection Reason
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Please provide a reason for rejecting this document (optional):
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-white resize-none text-sm mb-4"
              rows="3"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleRejectCancel}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDocumentRejectConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <FaTimes />
                <span>Reject Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
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
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Image+Not+Found";
              }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const InfoField = ({ icon: Icon, label, value, colSpan }) => (
  <div className={colSpan === "full" ? "md:col-span-2" : ""}>
    <div className="flex items-center space-x-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-600">
      <div className="p-2 bg-[#a38b41]/10 rounded-lg">
        <Icon className="text-[#a38b41]" size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          {label}
        </label>
        <span className="text-white font-medium truncate">{value}</span>
      </div>
    </div>
  </div>
);

const DocumentCard = ({
  document,
  onExpand,
  onApprove,
  onReject,
  isVerifying,
  verificationStatus,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };

  return (
    <div className="group relative bg-[#2a2a2a] rounded-lg overflow-hidden border border-gray-600 hover:border-[#a38b41] transition-all">
      <div className="p-4 flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {/* <div className="p-2 bg-[#a38b41]/10 rounded-lg">
              <FaFile className="text-[#a38b41]" />
            </div> */}
            <div>
              <a
                href={imgSrc(document?.url)}
                download
                target="_blank"
                className="text-blue-400 hover:text-blue-300 underline text-xs"
              >
                <p className="text-blue-400 underline text-sm font-medium">
                  {document?.name}
                </p>
              </a>
              {/* <p className="text-gray-400 text-xs capitalize">
                {document.type}
              </p> */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <a
              href={imgSrc(document?.url)}
              download
              target="_blank"
              className="text-blue-400 hover:text-blue-300 underline text-xs"
            >
              View/Download File
            </a> */}
            {/* {verificationStatus && (
              <span
                className={`text-xs font-medium ${getStatusColor(
                  verificationStatus
                )}`}
              >
                Status: {getStatusText(verificationStatus)}
              </span>
            )} */}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={onApprove}
              disabled={isVerifying || verificationStatus === "approved"}
              className="flex items-center space-x-1 px-3 py-2 cursor-pointer bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded text-sm transition-colors disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <FaSpinner className="animate-spin" size={12} />
              ) : (
                <FaCheck size={12} />
              )}
              <span>Approve</span>
            </button>

            <button
              onClick={onReject}
              disabled={isVerifying || verificationStatus === "rejected"}
              className="flex items-center cursor-pointer space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded text-sm transition-colors disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <FaSpinner className="animate-spin" size={12} />
              ) : (
                <FaTimes size={12} />
              )}
              <span>Reject</span>
            </button>
          </div>

          {/* Utility Buttons */}
          <div className="flex space-x-1 ml-2">
            {/* <button
              onClick={onExpand}
              className="p-2 bg-[#a38b41] hover:bg-[#b59a4a] text-white rounded transition-colors"
              title="Expand"
            >
              <FaExpand size={14} />
            </button> */}
            {/* <a
              href={imgSrc(document?.url)}
              download
              target="_blank"
              className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded transition-colors"
              title="Download"
            >
              <FaDownload size={14} />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentBubble = ({ comment }) => (
  <div className={`flex ${comment.isAdmin ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-xs lg:max-w-md rounded-2xl p-3 ${
        comment.isAdmin
          ? "bg-gradient-to-r from-[#a38b41] to-[#c2ab67] text-black"
          : "bg-[#2a2a2a] text-white border border-gray-600"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={`text-sm font-medium ${
            comment.isAdmin ? "text-black" : "text-[#a38b41]"
          }`}
        >
          {comment.user}
        </span>
        <span
          className={`text-xs ${
            comment.isAdmin ? "text-black/70" : "text-gray-400"
          }`}
        >
          {comment.time}
        </span>
      </div>
      <p className="text-sm">{comment.text}</p>
    </div>
  </div>
);

export default KYCDetailsPage;
