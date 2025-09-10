import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  useGetAllFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "../../app/authApi";
import { FiRefreshCcw, FiEdit2, FiTrash2, FiX, FiSave } from "react-icons/fi";
import ConfirmDialog from "../../utils/ConfirmDialog";

export default function AdminFaq() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllFaqsQuery();

  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const rows = Array.isArray(data?.data) ? data.data : [];
  const total = data?.total ?? rows.length;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { question: "", answer: "" },
  });

  const [editingId, setEditingId] = useState(null);

  // 🔒 confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const onSubmit = async (form) => {
    try {
      if (editingId) {
        await updateFaq({ id: editingId, ...form }).unwrap();
        toast.success("FAQ updated.");
      } else {
        await createFaq(form).unwrap();
        toast.success("FAQ created.");
      }
      reset({ question: "", answer: "" });
      setEditingId(null);
    } catch (e) {
      // handled by error UI; optionally console.error(e)
    }
  };

  const onEdit = (faq) => {
    setEditingId(faq._id);
    setValue("question", faq.question || "");
    setValue("answer", faq.answer || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onCancelEdit = () => {
    reset({ question: "", answer: "" });
    setEditingId(null);
  };

  // 🧾 open confirm for delete
  const askDelete = (row) => {
    setTarget(row);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (isDeleting) return;
    setConfirmOpen(false);
    setTarget(null);
  };

  const doDelete = async () => {
    if (!target?._id) return;
    try {
      await deleteFaq(target._id).unwrap();
      toast.success("FAQ deleted.");
      closeConfirm();
    } catch (e) {
      toast.error(
        e?.data?.message || e?.error || e?.message || "Failed to delete FAQ."
      );
    }
  };

  const saving = isCreating || isUpdating || isSubmitting;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-white">Admin — FAQs</h1>

        <motion.button
          type="button"
          onClick={refetch}
          disabled={isFetching}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          aria-busy={isFetching}
          className="
            relative inline-flex items-center gap-2 rounded-xl px-4 py-2
            bg-gradient-to-br from-white/10 to-white/5
            hover:from-white/20 hover:to-white/10
            text-white text-sm font-medium
            ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]
            backdrop-blur-md transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#a38b41]/40
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isFetching ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
              <span>Refreshing…</span>
            </>
          ) : (
            <>
              <FiRefreshCcw className="h-4 w-4" />
              <span>Refresh</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-white font-semibold">
            {editingId ? "Update FAQ" : "Add FAQ"}
          </div>
          {editingId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
              title="Cancel edit"
            >
              <FiX className="h-4 w-4" />
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Question</label>
            <input
              className="w-full rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a38b41]/40"
              placeholder="Type the question…"
              {...register("question", {
                required: "Question is required",
                minLength: { value: 3, message: "Min 3 characters" },
                maxLength: { value: 500, message: "Max 500 characters" },
              })}
            />
            {errors.question && (
              <p className="mt-1 text-xs text-red-300">
                {errors.question.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Answer</label>
            <textarea
              rows={4}
              className="w-full rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a38b41]/40"
              placeholder="Write the answer…"
              {...register("answer", {
                required: "Answer is required",
                minLength: { value: 3, message: "Min 3 characters" },
              })}
            />
            {errors.answer && (
              <p className="mt-1 text-xs text-red-300">
                {errors.answer.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="
                inline-flex items-center gap-2 rounded-xl px-4 py-2
                bg-[#a38b41] text-black font-semibold
                shadow-md hover:opacity-90 transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              <FiSave className="h-4 w-4" />
              {editingId
                ? isUpdating
                  ? "Updating…"
                  : "Update FAQ"
                : isCreating
                ? "Saving…"
                : "Add FAQ"}
            </motion.button>

            {!editingId && (
              <button
                type="button"
                onClick={() => reset({ question: "", answer: "" })}
                className="text-sm text-white/80 hover:text-white"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Card */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="text-gray-300 mb-3">
          Total FAQs: <span className="text-white font-semibold">{total}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  S.No
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Question
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Answer
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Loading */}
            {isLoading ? (
              <tbody>
                {[...Array(4)].map((_, i) => (
                  <tr
                    key={`skeleton-${i}`}
                    className="border-b border-white/10"
                  >
                    <td className="p-3">
                      <div className="h-6 w-10 bg-white/10 animate-pulse rounded" />
                    </td>
                    <td className="p-3">
                      <div className="h-5 w-56 bg-white/10 animate-pulse rounded" />
                    </td>
                    <td className="p-3">
                      <div className="h-5 w-72 bg-white/10 animate-pulse rounded mb-1" />
                      <div className="h-5 w-64 bg-white/10 animate-pulse rounded" />
                    </td>
                    <td className="p-3">
                      <div className="h-8 w-28 bg-white/10 animate-pulse rounded" />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : isError ? (
              <tbody>
                <tr>
                  <td colSpan={4} className="p-6 text-center text-red-300">
                    {error?.data?.error ||
                      error?.data?.message ||
                      error?.error ||
                      "Failed to load FAQs."}
                  </td>
                </tr>
              </tbody>
            ) : rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-300">
                    No FAQs yet.
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {rows.map((r, idx) => {
                  const shortAnswer =
                    r.answer && r.answer.length > 140
                      ? r.answer.slice(0, 140) + "…"
                      : r.answer || "—";

                  return (
                    <tr
                      key={r._id}
                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="p-3">
                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-md bg-[#a38b41] text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="p-3 text-white text-sm">{r.question}</td>
                      <td className="p-3 text-gray-300 text-sm">
                        {shortAnswer}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(r)}
                            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-white/10 text-white hover:bg-white/20 transition"
                            title="Edit"
                          >
                            <FiEdit2 className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => askDelete(r)} // 👈 open confirm modal
                            disabled={isDeleting}
                            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-red-500/20 text-red-200 hover:bg-red-500/30 transition disabled:opacity-60"
                            title="Delete"
                          >
                            <FiTrash2 className="h-3.5 w-3.5" />
                            {isDeleting && target?._id === r._id
                              ? "Deleting…"
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={closeConfirm}
        onConfirm={doDelete}
        pending={isDeleting}
        variant="danger"
        title="Delete this FAQ?"
        // description={
        //   target
        //     ? `You’re about to delete “${
        //         target.question || "this FAQ"
        //       }”. This action cannot be undone.`
        //     : ""
        // }
      />
    </div>
  );
}
