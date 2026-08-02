// pages/admin/team/AdminTeams.jsx
import { useMemo, useState } from "react";
import {
  useGetTeamQuery,
  useDeleteTeamMutation,
  useUpdateTeamMutation,
} from "../../../app/authApi";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../utils/ConfirmDialog";
import { imgSrc } from "../../../utils/imgSrc";

const toAbsolute = (p) => imgSrc(p);

const chipVisible = (v) =>
  v
    ? "text-green-300 border-green-400/30 bg-green-400/10"
    : "text-yellow-300 border-yellow-400/30 bg-yellow-400/10";

const AdminTeams = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetTeamQuery();
  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();
  const [updateTeam, { isLoading: isSavingOrder }] = useUpdateTeamMutation();

  // API shape: { success, count, data: [...] }
  const teams = useMemo(() => {
    const rows = data?.data || [];
    return [...rows].sort(
      (a, b) => (a?.order ?? 0) - (b?.order ?? 0)
    );
  }, [data]);
  const isBusy = isLoading || isFetching;
  const empty = !teams || teams.length === 0;

  // image error tracking (show name badge if broken)
  const [brokenIds, setBrokenIds] = useState(() => new Set());
  const markBroken = (id) =>
    setBrokenIds((prev) => new Set([...Array.from(prev), id]));

  // confirm modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);

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
      await deleteTeam(target._id).unwrap();
      toast.success("Team member deleted");
      closeConfirm();
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to delete");
    }
  };

  const handleOrderBlur = async (row, value) => {
    const next = Number(value);
    if (!row?._id || !Number.isFinite(next) || next === (row?.order ?? 0)) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("order", String(next));
      await updateTeam({ id: row._id, formData }).unwrap();
      toast.success("Order updated");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to update order");
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-xl font-bold"
          style={{
            background: "linear-gradient(to right, #a38b41, #d4c374)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Team Members
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="custom-button-two"
            onClick={() => navigate("/admin/add-team")}
          >
            Add Member
          </button>
        </div>
      </div>

      {/* Error */}
      {isError && (
        <div className="mb-3 flex items-center justify-between bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3">
          <div>
            <p className="font-semibold">Failed to load team</p>
            <p className="text-sm opacity-80">
              {error?.data?.message || error?.error || "Unknown error"}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
          >
            Retry
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-3 text-gray-300 font-semibold text-sm w-24">
                Order
              </th>
              <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                Member
              </th>
              <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                Title
              </th>
              <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                Visible
              </th>

              <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Loading skeleton */}
            {isBusy &&
              [...Array(5)].map((_, i) => (
                <tr key={`skel-${i}`} className="border-b border-white/5">
                  {[...Array(6)].map((__, j) => (
                    <td key={j} className="p-3">
                      <div className="h-4 w-full max-w-[240px] bg-white/10 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}

            {/* Empty */}
            {!isBusy && !isError && empty && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-300">
                  No team members found.
                </td>
              </tr>
            )}

            {/* Rows */}
            {!isBusy &&
              !isError &&
              !empty &&
              teams.map((t, idx) => {
                const img = toAbsolute(t?.imageUrl);
                const showBadge = !img || brokenIds.has(t?._id);
                return (
                  <tr
                    key={t?._id || idx}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-3">
                      <input
                        type="number"
                        defaultValue={t?.order ?? 0}
                        onBlur={(e) => handleOrderBlur(t, e.target.value)}
                        disabled={isSavingOrder}
                        title="Lower number shows first"
                        className="w-16 bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm"
                      />
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative">
                          <img
                            src={imgSrc(t?.imageUrl)}
                            alt={t?.name || "member"}
                            className="w-10 h-10 rounded-xl object-cover border-2 border-white/10"
                            onError={() => markBroken(t?._id)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#a38b41]/15 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        <div className="min-w-0">
                          <div className="text-white text-sm font-medium truncate">
                            {t?.name || "—"}
                          </div>
                          <div className="text-xs text-gray-400 truncate max-w-[420px]">
                            {t?.bio || "—"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="text-gray-200 text-sm">
                        {t?.title || "—"}
                      </span>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-lg border text-xs ${chipVisible(
                          !!t?.isVisible
                        )}`}
                      >
                        {t?.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => askDelete(t)}
                        className="px-2 py-1 rounded-lg bg-red-500/20 text-red-200 border border-red-400/30 hover:bg-red-500/30 transition flex items-center gap-1 text-xs disabled:opacity-60"
                        disabled={isDeleting && t?._id === target?._id}
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        {isDeleting && t?._id === target?._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Confirm delete (reusable) */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={closeConfirm}
        onConfirm={doDelete}
        pending={isDeleting}
        variant="danger"
        title="Delete team member?"
        // description={
        //   target
        //     ? `You’re about to delete ${
        //         target.name || "this member"
        //       }. This action cannot be undone.`
        //     : ""
        // }
      >
        {/* {target?.title} */}
      </ConfirmDialog>
    </div>
  );
};

export default AdminTeams;
