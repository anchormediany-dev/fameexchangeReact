import React, { useState } from "react";
import {
  useUploadKYCDocumentsMutation,
  useGetKYCDocumentsQuery,
} from "../app/authApi";
import { useAuth } from "../utils/auth/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import KYCDetailsPageForTalent from "../pages/KYCDetailsPageForTalent";

const KYCUpload = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error } = useGetKYCDocumentsQuery(user?.id);
  const kycStatus =
    data?.userDocument?.isKYCVerified || data?.user?.KYC_Verified;
  console.log(kycStatus);
  const [formData, setFormData] = useState({ text: "" });
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress] = useState(0);

  const theme = {
    primary: "#a38b41",
    bg: "bg-[#171717]",
    card: "bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]",
    border: "border border-white/10",
    text: "text-white",
    sub: "text-gray-400",
  };

  const handleImageUpload = (e) => {
    const selected = Array.from(e.target.files || []);
    const next = selected.map((f) =>
      Object.assign(f, {
        preview: URL.createObjectURL(f),
        id: Math.random().toString(36).slice(2),
      })
    );
    setImages((p) => [...p, ...next]);
  };
  const handleFileUpload = (e) => {
    const selected = Array.from(e.target.files || []);
    const next = selected.map((f) =>
      Object.assign(f, { id: Math.random().toString(36).slice(2) })
    );
    setFiles((p) => [...p, ...next]);
  };
  const removeImage = (id) => setImages((p) => p.filter((x) => x.id !== id));
  const removeFile = (id) => setFiles((p) => p.filter((x) => x.id !== id));
  const formatSize = (bytes = 0) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const [uploadKYCDocuments] = useUploadKYCDocumentsMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      images.forEach((img) => submitData.append("images", img));
      files.forEach((f) => submitData.append("files", f));
      submitData.append("text", formData.text);

      await uploadKYCDocuments(submitData).unwrap();
      toast.success("Your KYC documents have been submitted successfully!");
      setImages([]);
      setFiles([]);
      setFormData({ text: "" });

      setTimeout(() => {
        if (user?.role === "FAN") navigate("/");
        if (user?.role === "TALENT") navigate("/networth-calculator");
      }, 400);
      const imgEl = document.getElementById("image-upload");
      const fileEl = document.getElementById("file-upload");
      if (imgEl) imgEl.value = "";
      if (fileEl) fileEl.value = "";
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`w-full py-10 container px-4 lg:px-8 ${theme.bg}`}>
      <h1 className={`text-3xl font-bold ${theme.text} mb-6`}>
        KYC Details{data?.user?.name ? ` – ${data?.user?.name}` : ""}
      </h1>
      {/* Details & status like the screenshot */}
      <KYCDetailsPageForTalent
        data={data}
        isLoading={isLoading}
        error={error}
      />
      {/* Submission box - mirrors “KYC Submission” like in the image */}
      {/* {kycStatus === false && ( */}
      <div className="mt-12">
        <div className={`${theme.card} ${theme.border} rounded-2xl p-6`}>
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-semibold ${theme.text}`}>
              KYC Submission
            </h2>
            <p className={theme.sub}>
              Complete your verification by uploading required documents
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Message */}
            <div className="mb-6">
              <label className={`block text-sm font-medium ${theme.text} mb-2`}>
                Message (Optional)
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ text: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                style={{ boxShadow: `0 0 0 0px ${theme.primary}` }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.primary}`)
                }
                onBlur={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 0px ${theme.primary}`)
                }
                placeholder="Add any message..."
              />
            </div>

            {/* Images */}
            <div className="mb-6">
              <label className={`block text-sm font-medium ${theme.text} mb-3`}>
                Upload Images
              </label>
              <div
                className={`rounded-2xl p-6 text-center border-dashed ${theme.border}`}
              >
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept=".jpeg,.jpg,.png,.gif,.webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer inline-flex items-center px-6 py-3 rounded-lg ${theme.border} ${theme.text} hover:bg-white/10`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 002 2z"
                    />
                  </svg>
                  Select Images
                </label>
                <p className={`text-sm ${theme.sub} mt-2`}>
                  Click to select multiple images
                </p>
              </div>

              {images.length > 0 && (
                <div className="mt-5">
                  <h4 className={`text-sm font-medium ${theme.text} mb-3`}>
                    Selected Images ({images.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                        <div className={`text-xs ${theme.sub} truncate mt-1`}>
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Files */}
            <div className="mb-6">
              <label className={`block text-sm font-medium ${theme.text} mb-3`}>
                Upload Documents
              </label>
              <div
                className={`rounded-2xl p-6 text-center border-dashed ${theme.border}`}
              >
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer inline-flex items-center px-6 py-3 rounded-lg ${theme.border} ${theme.text} hover:bg-white/10`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  Select Documents
                </label>
                <p className={`text-sm ${theme.sub} mt-2`}>
                  Click to select multiple files
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-5 space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${theme.border}`}
                    >
                      <div className="flex items-center">
                        <svg
                          className="w-8 h-8 mr-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l6.121 6.121V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div>
                          <div className={theme.text}>{file.name}</div>
                          <div className={`text-xs ${theme.sub}`}>
                            {formatSize(file.size)}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Progress (optional) */}
            {isSubmitting && (
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className={`text-sm font-medium ${theme.text}`}>
                    Upload Progress
                  </span>
                  <span className={`text-sm ${theme.sub}`}>
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${uploadProgress}%`,
                      background: theme.primary,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {/* <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setImages([]);
                  setFiles([]);
                  setFormData({ text: "" });
                  const imgEl = document.getElementById("image-upload");
                  const fileEl = document.getElementById("file-upload");
                  if (imgEl) imgEl.value = "";
                  if (fileEl) fileEl.value = "";
                }}
                className={`px-6 py-2 rounded-lg ${theme.border} ${theme.text} hover:bg-white/10 curoer disabled:opacity-50`}
              >
                Cancel
              </button> */}
              <button
                type="button"
                onClick={() => {
                  navigate("/"); // Navigate to home page
                }}
                className={`px-6 py-2 rounded-lg ${theme.border} ${theme.text} hover:bg-white/10 cursor-pointer`}
              >
                Skip KYC
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (!images.length && !files.length)}
                className="px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: theme.primary,
                  border: `1px solid ${theme.primary}`,
                }}
              >
                {isSubmitting ? "Uploading..." : "Submit Documents"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default KYCUpload;
