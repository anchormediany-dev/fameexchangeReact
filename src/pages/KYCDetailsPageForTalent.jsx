// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useGetKYCDocumentsQuery } from "../app/authApi";
// import {
//   FaCheck,
//   FaTimes,
//   FaDownload,
//   FaExpand,
//   FaUser,
//   FaIdCard,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaEnvelope,
//   FaPaperclip,
//   FaPaperPlane,
//   FaImage,
//   FaFile,
//   FaClock,
//   FaSpinner,
// } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { imgSrc } from "../utils/imgSrc";

// const KYCDetailsPageForTalent = ({ data: apiData, error, isLoading }) => {
//   //   const { id: userId } = useParams();
//   //   const { data: apiData, isLoading, error } = useGetKYCDocumentsQuery(userId);
//   const [kycStatus, setKycStatus] = useState("pending");
//   const [comment, setComment] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Format date function
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     });
//   };

//   // Format datetime function
//   const formatDateTime = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false,
//     });
//   };

//   // Extract file name from URL
//   const getFileNameFromUrl = (url) => {
//     if (!url) return "Unknown File";
//     return url.split("/").pop() || "Unknown File";
//   };

//   // Categorize documents
//   const categorizeDocuments = (uploads = []) => {
//     const images = [];
//     const files = [];

//     uploads.forEach((upload) => {
//       const document = {
//         id: upload._id || Math.random(),
//         name: getFileNameFromUrl(upload.fileUrl),
//         type: upload.fileType,
//         url: upload.fileUrl,
//         verification: upload.verification,
//         uploadedAt: upload.verifiedAt,
//       };

//       if (
//         ["webp", "jpg", "jpeg", "png", "gif"].includes(
//           upload.fileType?.toLowerCase()
//         )
//       ) {
//         images.push(document);
//       } else {
//         files.push(document);
//       }
//     });

//     return { images, files };
//   };

//   // Process API data
//   const processApiData = () => {
//     if (!apiData?.success) return null;

//     const { user, userDocument } = apiData;
//     const { images, files } = categorizeDocuments(userDocument?.uploads);

//     return {
//       user: {
//         name: user?.name || "N/A",
//         email: user?.email || "N/A",
//         joinDate: formatDate(user?.createdAt),
//         idType: "User", // You might want to get this from API
//         documentType: "KYC Documents",
//         dateOfIssue: "N/A", // You might want to get this from API
//         dateOfExpiry: "N/A", // You might want to get this from API
//         address: "N/A", // You might want to get this from API
//         stageName: user?.stage_name || "N/A",
//         talent: user?.talent?.join(", ") || "N/A",
//         tokenBrandName: user?.token_brand_name || "N/A",
//       },
//       status: {
//         current: userDocument?.status?.toLowerCase() || "pending",
//         requestStarted: formatDate(userDocument?.createdAt),
//         lastUpdated: formatDate(userDocument?.updatedAt),
//         isKYCVerified: userDocument?.isKYCVerified || false,
//         rejectionReason: userDocument?.rejectionReason || "",
//       },
//       documents: {
//         images,
//         files,
//       },
//       messages:
//         userDocument?.messages?.map((msg) => ({
//           id: msg._id || Math.random(),
//           user: msg.role === "user" ? user?.name : "Admin",
//           text: msg.text,
//           time: formatDateTime(msg.sentAt),
//           isAdmin: msg.role !== "user",
//           images: msg.images || [],
//           files: msg.files || [],
//         })) || [],
//       submission: {
//         user: user?.name || "N/A",
//         date: formatDateTime(userDocument?.createdAt),
//       },
//     };
//   };

//   const kycData = processApiData() || {
//     user: {
//       name: "Loading...",
//       email: "Loading...",
//       joinDate: "Loading...",
//       idType: "Loading...",
//       documentType: "Loading...",
//       dateOfIssue: "Loading...",
//       dateOfExpiry: "Loading...",
//       address: "Loading...",
//       stageName: "Loading...",
//       talent: "Loading...",
//       tokenBrandName: "Loading...",
//     },
//     status: {
//       current: "pending",
//       requestStarted: "Loading...",
//       lastUpdated: "Loading...",
//       isKYCVerified: false,
//       rejectionReason: "",
//     },
//     documents: {
//       images: [],
//       files: [],
//     },
//     messages: [],
//     submission: {
//       user: "Loading...",
//       date: "Loading...",
//     },
//   };

//   const handleStatusUpdate = (status) => {
//     setKycStatus(status);
//     // TODO: Add API call to update status
//   };

//   const handleSendComment = () => {
//     if (comment.trim()) {
//       console.log("Comment sent:", comment);
//       // TODO: Add API call to send message
//       setComment("");
//     }
//   };

//   const StatusIndicator = ({ status }) => (
//     <div
//       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
//         status === "approved"
//           ? "bg-green-500/10 text-green-400 border-green-500/20"
//           : status === "rejected"
//           ? "bg-red-500/10 text-red-400 border-red-500/20"
//           : "bg-[#a38b41]/10 text-[#a38b41] border-[#a38b41]/20"
//       }`}
//     >
//       <div
//         className={`w-2 h-2 rounded-full mr-2 ${
//           status === "approved"
//             ? "bg-green-400"
//             : status === "rejected"
//             ? "bg-red-400"
//             : "bg-[#a38b41]"
//         }`}
//       />
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </div>
//   );

//   if (isLoading) {
//     return (
//       <div className="bg-[#171717] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <FaSpinner className="animate-spin text-3xl text-[#a38b41] mx-auto mb-4" />
//           <p className="text-gray-400">Loading KYC details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-[#171717] min-h-screen flex items-center justify-center">
//         <div className="text-center text-red-400">
//           <FaTimes className="text-3xl mx-auto mb-4" />
//           <p>Error loading KYC details</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#171717]">
//       <div className="">
//         {/* Header Card */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6 mb-6"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-2">
//                 KYC Details
//               </h1>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-gradient-to-r from-[#a38b41] to-[#c2ab67] rounded-full flex items-center justify-center">
//                     <span className="text-black font-bold text-lg">
//                       {kycData.user.name.charAt(0)}
//                     </span>
//                   </div>
//                   <div>
//                     <h2 className="text-lg font-semibold text-white">
//                       {kycData.user.name}
//                     </h2>
//                     <p className="text-gray-400 text-sm">
//                       {kycData.user.email}
//                     </p>
//                   </div>
//                 </div>
//                 <StatusIndicator status={kycData.status.current} />
//               </div>
//             </div>
//           </div>
//         </motion.div> */}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Content - Left 2/3 */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* KYC Details Card */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6"
//             >
//               <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
//                 <FaUser className="mr-2 text-[#a38b41]" />
//                 User Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InfoField
//                   icon={FaUser}
//                   label="Full Name"
//                   value={kycData.user.name}
//                 />
//                 <InfoField
//                   icon={FaCalendarAlt}
//                   label="Join Date"
//                   value={kycData.user.joinDate}
//                 />
//                 <InfoField
//                   icon={FaIdCard}
//                   label="ID Type"
//                   value={kycData.user.idType}
//                 />
//                 <InfoField
//                   icon={FaIdCard}
//                   label="Documents Type"
//                   value={kycData.user.documentType}
//                 />
//                 <InfoField
//                   icon={FaEnvelope}
//                   label="User Email"
//                   value={kycData.user.email}
//                 />
//                 {/* <InfoField
//                   icon={FaCalendarAlt}
//                   label="Date of Issue"
//                   value={kycData.user.dateOfIssue}
//                 />
//                 <InfoField
//                   icon={FaCalendarAlt}
//                   label="Date of Expiry"
//                   value={kycData.user.dateOfExpiry}
//                 /> */}
//                 <InfoField
//                   icon={FaUser}
//                   label="Stage Name"
//                   value={kycData.user.stageName}
//                 />
//                 {/* <InfoField
//                   icon={FaUser}
//                   label="Talent"
//                   value={kycData.user.talent}
//                 /> */}
//                 <InfoField
//                   icon={FaIdCard}
//                   label="Token Brand Name"
//                   value={kycData.user.tokenBrandName}
//                   colSpan="full"
//                 />
//               </div>
//             </motion.div>

//             {/* Documents Section */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="space-y-6"
//             >
//               {/* Images */}
//               {kycData.documents.images.length > 0 && (
//                 <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6">
//                   <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
//                     <FaImage className="mr-2 text-[#a38b41]" />
//                     Document Images ({kycData.documents.images.length})
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {kycData.documents.images.map((doc) => (
//                       <DocumentCard
//                         key={doc.id}
//                         document={doc}
//                         onExpand={() => setSelectedImage(doc)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Files */}
//               {kycData.documents.files.length > 0 && (
//                 <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6">
//                   <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
//                     <FaFile className="mr-2 text-[#a38b41]" />
//                     Files ({kycData.documents.files.length})
//                   </h2>
//                   <div className="space-y-3">
//                     {kycData.documents.files.map((file) => (
//                       <FileCard key={file.id} file={file} />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Sidebar - Right 1/3 */}
//           <div className="space-y-6">
//             {/* Status Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 p-6"
//             >
//               <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
//                 <FaClock className="mr-2 text-[#a38b41]" />
//                 KYC Status
//               </h2>

//               <div className="space-y-4">
//                 <StatusIndicator status={kycData.status.current} />

//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-400">Request Started</span>
//                     <span className="text-white">
//                       {kycData.status.requestStarted}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-400">Last Updated</span>
//                     <span className="text-white">
//                       {kycData.status.lastUpdated}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-400">KYC Verified</span>
//                     <span
//                       className={`font-medium ${
//                         kycData.status.isKYCVerified
//                           ? "text-green-400"
//                           : "text-red-400"
//                       }`}
//                     >
//                       {kycData.status.isKYCVerified ? "Yes" : "No"}
//                     </span>
//                   </div>
//                 </div>

//                 {kycData.status.rejectionReason && (
//                   <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
//                     <p className="text-red-400 text-sm">
//                       <strong>Rejection Reason:</strong>{" "}
//                       {kycData.status.rejectionReason}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div
//             className="relative max-w-4xl max-h-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={`http://localhost:3001/${selectedImage.url}`} // Adjust based on your server URL
//               alt={selectedImage.name}
//               className="rounded-lg max-w-full max-h-full"
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/400x300?text=Image+Not+Found";
//               }}
//             />
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Reusable Components
// const InfoField = ({ icon: Icon, label, value, colSpan }) => (
//   <div className={colSpan === "full" ? "md:col-span-2" : ""}>
//     <div className="flex items-center space-x-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-600">
//       <div className="p-2 bg-[#a38b41]/10 rounded-lg">
//         <Icon className="text-[#a38b41]" size={16} />
//       </div>
//       <div className="flex-1 min-w-0">
//         <label className="block text-sm font-medium text-gray-400 mb-1">
//           {label}
//         </label>
//         <span className="text-white font-medium truncate">{value}</span>
//       </div>
//     </div>
//   </div>
// );

// const DocumentCard = ({ document, onExpand }) => (
//   <div className="group relative bg-[#2a2a2a] rounded-lg overflow-hidden border border-gray-600 hover:border-[#a38b41] transition-all">
//     <div className="relative aspect-video">
//       <img
//         src={imgSrc(document.url)}
//         alt={document.name}
//         className="w-full h-full object-cover"
//         onError={(e) => {
//           e.target.src =
//             "https://via.placeholder.com/400x300?text=Image+Not+Found";
//         }}
//       />
//       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
//         <div className="flex space-x-2">
//           {/* <button
//             onClick={onExpand}
//             className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30"
//           >
//             <FaExpand size={14} className="text-white" />
//           </button> */}
//           {/* <a
//             href={`http://localhost:3001/${document.url}`}
//             download
//             className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30"
//           >
//             <FaDownload size={14} className="text-white" />
//           </a> */}
//         </div>
//       </div>
//     </div>
//     <div className="p-3">
//       <p className="text-white text-sm font-medium truncate">{document.name}</p>
//       <p className="text-gray-400 text-xs capitalize">
//         {document.type} • {document.verification?.status}
//       </p>
//     </div>
//   </div>
// );

// const FileCard = ({ file }) => (
//   <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 hover:border-[#a38b41] transition-all">
//     <div className="flex items-center space-x-3">
//       <div className="p-2 bg-[#a38b41]/10 rounded-lg">
//         <FaFile className="text-[#a38b41]" />
//       </div>
//       <div>
//         <p className="text-white text-sm font-medium truncate max-w-xs">
//           {file.name}
//         </p>
//         <p className="text-gray-400 text-xs capitalize">
//           {file.type} • {file.verification?.status}
//         </p>
//       </div>
//     </div>
//     <a
//       href={imgSrc(file.url)}
//       download
//       target="_blank"
//       className="p-2 text-gray-400 hover:text-[#a38b41] transition-colors"
//     >
//       <FaDownload />
//     </a>
//   </div>
// );

// const CommentBubble = ({ comment }) => (
//   <div className={`flex ${comment.isAdmin ? "justify-end" : "justify-start"}`}>
//     <div
//       className={`max-w-xs lg:max-w-md rounded-2xl p-3 ${
//         comment.isAdmin
//           ? "bg-gradient-to-r from-[#a38b41] to-[#c2ab67] text-black"
//           : "bg-[#2a2a2a] text-white border border-gray-600"
//       }`}
//     >
//       <div className="flex items-center justify-between mb-1">
//         <span
//           className={`text-sm font-medium ${
//             comment.isAdmin ? "text-black" : "text-[#a38b41]"
//           }`}
//         >
//           {comment.user}
//         </span>
//         <span
//           className={`text-xs ${
//             comment.isAdmin ? "text-black/70" : "text-gray-400"
//           }`}
//         >
//           {comment.time}
//         </span>
//       </div>
//       <p className="text-sm">{comment.text}</p>
//     </div>
//   </div>
// );

// export default KYCDetailsPageForTalent;
// pages/KYCDetailsPageForTalent.jsx
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
              <KV
                label="KYC Verified"
                value={kyc.status.isVerified ? "Yes" : "No"}
                valueClass={
                  kyc.status.isVerified ? "text-green-400" : "text-red-400"
                }
              />
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
    <div className="relative aspect-video">
      <img
        src={imgSrc(doc.url)}
        alt={doc.name}
        className="w-full h-full object-cover"
        onClick={onOpen}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
    </div>
    <div className="p-3">
      <p className="text-white text-sm font-medium truncate">{doc.name}</p>
      <p className="text-gray-400 text-xs capitalize">
        {doc.type} • {doc.verification?.status || "—"}
      </p>
    </div>
  </div>
);

const FileRow = ({ file }) => (
  <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 hover:border-[#a38b41] transition-all">
    <div className="flex items-center gap-3">
      <div
        className="p-2 rounded-lg"
        style={{ background: "rgba(163,139,65,.1)" }}
      >
        <FaFile style={{ color: GOLD }} />
      </div>
      <div>
        <p className="text-white text-sm font-medium truncate max-w-xs">
          {file.name}
        </p>
        <p className="text-gray-400 text-xs capitalize">
          {file.type} • {file.verification?.status || "—"}
        </p>
      </div>
    </div>
    <a
      href={imgSrc(file.url)}
      download
      target="_blank"
      rel="noreferrer"
      className="p-2 text-gray-400 hover:text-[#a38b41]"
    >
      <FaDownload />
    </a>
  </div>
);

const KV = ({ label, value, valueClass = "text-white" }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-400">{label}</span>
    <span className={valueClass}>{value}</span>
  </div>
);

export default KYCDetailsPageForTalent;
