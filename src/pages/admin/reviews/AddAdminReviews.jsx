import React, { useState } from "react";
import { useCreateReviewMutation } from "../../../app/authApi";
import { toast } from "react-toastify";

const statuses = ["approved", "pending", "rejected"];

const AddAdminReviews = () => {
  const [form, setForm] = useState({
    customerName: "",
    starsRating: "",
    reviewDetail: "",
    status: "pending",
  });

  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // keep starsRating numeric
    if (name === "starsRating") {
      const num = value === "" ? "" : Number(value);
      setForm((s) => ({ ...s, [name]: num }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.customerName?.trim()) return "Customer name is required.";
    if (form.starsRating === "" || Number.isNaN(form.starsRating))
      return "Rating is required.";
    if (form.starsRating < 0 || form.starsRating > 10)
      return "Rating must be between 0 and 10.";
    if (!statuses.includes(form.status)) return "Invalid status.";
    if (!form.reviewDetail?.trim()) return "Review detail is required.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }

    try {
      await createReview({
        customerName: form.customerName.trim(),
        starsRating: Number(form.starsRating),
        reviewDetail: form.reviewDetail.trim(),
        status: form.status,
      }).unwrap();

      toast.success("Review submitted!");
      setForm({
        customerName: "",
        starsRating: "",
        reviewDetail: "",
        status: "pending",
      });
    } catch (err) {
      setErrorMsg(
        err?.data?.message || err?.error || "Failed to submit review"
      );
    }
  };

  const sectionTitleCls =
    "text-lg font-semibold mb-4 col-span-full gredient-text";

  return (
    <div className="bg-[#222222] p-6 rounded-2xl border border-[#333333]">
      <h2
        className="text-xl font-bold mb-6"
        style={{
          background: "linear-gradient(to right, #a38b41, #d4c374)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Add Review
      </h2>

      {errorMsg && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3">
          {errorMsg}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <h3 className={sectionTitleCls}>Basic</h3>

          {/* Customer Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Customer Name*
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
              <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Stars Rating (0–10) */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Rating (0–10)*
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
              <input
                type="number"
                name="starsRating"
                value={form.starsRating}
                onChange={handleChange}
                min="0"
                max="10"
                step="1"
                placeholder="9"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Status*
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white"
                required
              >
                {statuses.map((s) => (
                  <option key={s} value={s} className="bg-[#2d2d2d]">
                    {s[0].toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Review Detail */}
        <div className="grid grid-cols-1 gap-6">
          <h3 className={sectionTitleCls}>Review</h3>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Detail*
            </label>
            <div className="border rounded-lg px-4 py-3 bg-[#2d2d2d]">
              <textarea
                name="reviewDetail"
                value={form.reviewDetail}
                onChange={handleChange}
                rows={5}
                placeholder="Write your review..."
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 custom-button-two text-black rounded-md font-medium hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminReviews;
