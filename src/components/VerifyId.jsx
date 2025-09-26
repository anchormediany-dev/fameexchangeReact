import React, { useState, useRef } from "react";
import {
  useUploadKYCDocumentsMutation,
  useGetKYCDocumentsQuery,
} from "../app/authApi";
import { useAuth } from "../utils/auth/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const KYCUpload = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { data } = useGetKYCDocumentsQuery(user?.id);
  console.log(data, "data here");

  const [formData, setFormData] = useState({
    text: "",
  });

  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Color variables matching InversePage theme
  const themeColors = {
    primary: "#a38b41", // Gold color from InversePage
    background: "bg-gradient-to-br from-gray-900 to-gray-800",
    cardBackground: "bg-white/5 backdrop-blur-xl",
    border: "border border-white/10",
    textPrimary: "text-white",
    textSecondary: "text-gray-400",
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    const newImages = selectedImages.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      })
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  // Remove image
  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) =>
      Object.assign(file, {
        id: Math.random().toString(36).substr(2, 9),
      })
    );
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const [uploadKYCDocuments, { isLoading, error }] =
    useUploadKYCDocumentsMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      images.forEach((image) => submitData.append("images", image));
      files.forEach((file) => submitData.append("files", file));
      submitData.append("text", formData.text);
      const response = await uploadKYCDocuments(submitData).unwrap();

      toast.success("Your KYC documents have been submitted successfully!");

      setImages([]);
      setFiles([]);
      setFormData({ text: "" });
      setTimeout(() => {
        {
          user?.role === "FAN" && navigate("/");
        }
        {
          user?.role === "TALENT" && navigate("/networth-calculator");
        }
      }, 500);
      document.getElementById("image-upload").value = "";
      document.getElementById("file-upload").value = "";
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${themeColors.textPrimary} mb-2`}>
            KYC Verification
          </h1>
          <p className={themeColors.textSecondary}>
            Complete your verification by uploading required documents
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`${themeColors.cardBackground} ${themeColors.border} rounded-2xl p-6 sm:p-8`}
        >
          {/* Message Input */}
          <div className="mb-6">
            <label
              className={`block text-sm font-medium ${themeColors.textPrimary} mb-2`}
            >
              Message (Optional)
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ text: e.target.value })}
              className={`w-full px-4 py-3 ${themeColors.border} rounded-lg focus:ring-2 focus:ring-${themeColors.primary} focus:border-transparent transition-all duration-200 bg-white/5 ${themeColors.textPrimary} resize-none`}
              placeholder="Add any message..."
              rows="4"
            />
          </div>

          {/* Images Upload Section */}
          <div className="mb-6">
            <label
              className={`block text-sm font-medium ${themeColors.textPrimary} mb-4`}
            >
              Upload Images (PNG, JPG, JPEG, WEBP, GIF)
            </label>

            {/* Image Upload Button */}
            <div
              className={`${themeColors.border} border-dashed rounded-2xl p-6 text-center`}
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
                className={`cursor-pointer inline-flex items-center px-6 py-3 ${themeColors.border} rounded-lg hover:bg-white/10 transition-colors duration-200`}
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
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 002 2z"
                  />
                </svg>
                <span className={themeColors.textPrimary}>Select Images</span>
              </label>
              <p className={`text-sm ${themeColors.textSecondary} mt-2`}>
                Click to select multiple images
              </p>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-6">
                <h4
                  className={`text-sm font-medium ${themeColors.textPrimary} mb-3`}
                >
                  Selected Images ({images.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${image.name}`}
                        className="w-full h-24 object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm"
                      >
                        ×
                      </button>
                      <div
                        className={`text-xs ${themeColors.textSecondary} truncate mt-1`}
                      >
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Files Upload Section */}
          <div className="mb-6">
            <label
              className={`block text-sm font-medium ${themeColors.textPrimary} mb-4`}
            >
              Upload Documents (PDF, DOC, DOCX, TXT)
            </label>

            {/* File Upload Button */}
            <div
              className={`${themeColors.border} border-dashed rounded-2xl p-6 text-center`}
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
                className={`cursor-pointer inline-flex items-center px-6 py-3 ${themeColors.border} rounded-lg hover:bg-white/10 transition-colors duration-200`}
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
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <span className={themeColors.textPrimary}>
                  Select Documents
                </span>
              </label>
              <p className={`text-sm ${themeColors.textSecondary} mt-2`}>
                Click to select multiple files
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6">
                <h4
                  className={`text-sm font-medium ${themeColors.textPrimary} mb-3`}
                >
                  Selected Files ({files.length})
                </h4>
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center justify-between p-3 ${themeColors.border} rounded-lg`}
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
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div>
                          <div className={themeColors.textPrimary}>
                            {file.name}
                          </div>
                          <div
                            className={`text-xs ${themeColors.textSecondary}`}
                          >
                            {formatSize(file.size)}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
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
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {isSubmitting && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span
                  className={`text-sm font-medium ${themeColors.textPrimary}`}
                >
                  Upload Progress
                </span>
                <span className={`text-sm ${themeColors.textSecondary}`}>
                  {uploadProgress}%
                </span>
              </div>
              <div className={`w-full bg-gray-700 rounded-full h-2`}>
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setImages([]);
                setFiles([]);
                setFormData({ text: "" });
                document.getElementById("image-upload").value = "";
                document.getElementById("file-upload").value = "";
              }}
              className={`px-6 py-2 ${themeColors.border} rounded-lg hover:bg-white/10 transition-colors duration-200 ${themeColors.textPrimary} disabled:opacity-50`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting || (images.length === 0 && files.length === 0)
              }
              className={`px-6 cursor-pointer py-2 bg-${themeColors.primary} border border-${themeColors.primary} rounded-lg hover:bg-${themeColors.primary}/90 transition-colors duration-200 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
              style={{
                backgroundColor: themeColors.primary,
                borderColor: themeColors.primary,
              }}
            >
              {isSubmitting ? "Uploading..." : "Submit Documents"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default KYCUpload;
