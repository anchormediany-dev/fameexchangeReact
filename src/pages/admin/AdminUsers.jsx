// components/admin/AdminUsers.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useGetUsersQuery, useDeleteUserMutation } from "../../app/authApi";

import ConfirmDialog from "../../utils/ConfirmDialog";
import { Link } from "react-router-dom";
import { imgSrc } from "../../utils/imgSrc";

const fallbackAvatar =
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&auto=format&fit=crop&q=60";

const formatDate = (iso) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
      active
        ? "border-[#a38b41]/40 bg-white/10"
        : "border-white/10 bg-white/5 hover:bg-white/10"
    }`}
    style={active ? { color: "#d4c374" } : {}}
  >
    {children}
  </button>
);

const AdminUsers = () => {
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Local copy so UI feels instant on delete
  const [usersLocal, setUsersLocal] = useState([]);
  const [activeTab, setActiveTab] = useState("TALENT"); // default tab
  const [pendingId, setPendingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // 🔒 confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (data?.users) setUsersLocal(data.users);
  }, [data]);

  const talents = useMemo(
    () => usersLocal.filter((u) => u.role === "TALENT"),
    [usersLocal]
  );
  const fans = useMemo(
    () => usersLocal.filter((u) => u.role === "FAN"),
    [usersLocal]
  );

  const current = activeTab === "TALENT" ? talents : fans;
  const empty = !current || current.length === 0;

  // Open confirm dialog
  const askDelete = (e, user) => {
    e?.stopPropagation?.();
    setTarget(user);
    setConfirmOpen(true);
    setDeleteError(null);
  };

  const closeConfirm = () => {
    if (isDeleting) return;
    setConfirmOpen(false);
    setTarget(null);
  };

  // Perform delete after confirmation
  const doDelete = async () => {
    if (!target?._id) return;
    const id = target._id;

    setPendingId(id);
    setDeleteError(null);

    try {
      await deleteUser(id).unwrap();
      // Optimistic local removal
      setUsersLocal((prev) => prev.filter((u) => u._id !== id));
      // Optional full sync:
      refetch();
    } catch (err) {
      setDeleteError(
        err?.data?.message || err?.error || "Failed to delete user"
      );
    } finally {
      setPendingId(null);
      closeConfirm();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold"
          style={{
            background: "linear-gradient(to right, #a38b41, #d4c374)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Users
        </h2>

        <div className="flex items-center gap-2">
          <TabButton
            active={activeTab === "TALENT"}
            onClick={() => setActiveTab("TALENT")}
          >
            Talent Users ({talents.length})
          </TabButton>
          <TabButton
            active={activeTab === "FAN"}
            onClick={() => setActiveTab("FAN")}
          >
            Fan Users ({fans.length})
          </TabButton>
        </div>
      </div>

      {/* Delete error banner */}
      {deleteError && (
        <div className="mb-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">{deleteError}</span>
            <button
              className="text-xs underline hover:no-underline"
              onClick={() => setDeleteError(null)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {(isLoading || isFetching) && (
        <div className="space-y-3">
          {/* Mobile skeleton */}
          <div className="block sm:hidden space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={`m-skel-${i}`}
                className="bg-white/5 rounded-xl p-4 animate-pulse"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white/10 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10" />
                      <div className="space-y-1">
                        <div className="h-3 w-36 bg-white/10 rounded" />
                        <div className="h-2 w-24 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="h-3 w-40 bg-white/10 rounded" />
                    <div className="h-3 w-64 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop skeleton */}
          <div className="hidden sm:block">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {[
                      "S.No",
                      "Name",
                      "Role",
                      "Active",
                      "Created",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left p-3 text-gray-300 font-semibold text-sm"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={`d-skel-${i}`} className="border-b border-white/5">
                      {[...Array(6)].map((__, j) => (
                        <td key={j} className="p-3">
                          <div className="h-4 w-full max-w-[180px] bg-white/10 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-4">
          <div>
            <p className="font-semibold">Failed to load users</p>
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

      {/* Empty */}
      {!isLoading && !isFetching && !isError && empty && (
        <div className="text-center text-gray-300 py-10">
          <p className="text-lg font-medium">
            No {activeTab === "TALENT" ? "talent" : "fan"} users found
          </p>
          <p className="text-sm opacity-70">
            They’ll appear here once available.
          </p>
        </div>
      )}

      {/* Mobile Card View */}
      {!isLoading && !isFetching && !isError && !empty && (
        <div className="block sm:hidden space-y-4">
          {current.map((u, index) => (
            <div
              key={u?._id || index}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-[#a38b41] rounded-lg flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </span>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={imgSrc(u?.image)}
                          alt={name || "user"}
                          className="w-10 h-10 rounded-xl object-cover border-2 border-white/10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#a38b41]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold  text-white text-sm">
                          {u?.name || "Unnamed"}
                        </h4>
                        <div className="text-xs text-gray-400 capitalize">
                          {u?.role || "—"} •{" "}
                          <span
                            className={
                              u?.is_active ? "text-green-400" : "text-red-400"
                            }
                          >
                            {u?.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => askDelete(e, u)}
                      disabled={pendingId === u?._id}
                      className="shrink-0 px-2 py-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition flex items-center gap-1 disabled:opacity-60"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-xs">
                        {pendingId === u?._id ? "Removing..." : "Remove"}
                      </span>
                    </button>
                  </div>

                  <p className="text-gray-400 text-xs">
                    Joined: {formatDate(u?.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop Table View */}
      {!isLoading && !isFetching && !isError && !empty && (
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  S.No
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Name
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Role
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Active
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Created
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {current.map((u, index) => (
                <tr
                  key={u?._id || index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-3">
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: "#a38b41" }}
                    >
                      {index + 1}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={imgSrc(u?.image)}
                          alt={u?.name || "user"}
                          className="w-10 h-10 rounded-xl object-cover border-2 border-white/10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#a38b41]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div>
                        {u?.role === "FAN" && (
                          <Link
                            to={`/fan/user-details/${u?._id}`}
                            className="font-semibold underline text-white text-sm block"
                          >
                            {u?.name || "—"}
                          </Link>
                        )}
                        {u?.role === "TALENT" && (
                          <Link
                            to={`/talent/user-details/${u?._id}`}
                            className="font-semibold underline text-white text-sm block"
                          >
                            {u?.name || "—"}
                          </Link>
                        )}
                        <span className="text-xs text-gray-400">
                          {u?.email || "—"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="text-gray-300 text-sm capitalize">
                      {u?.role || "—"}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`text-sm ${
                        u?.is_active ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {u?.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className="text-gray-300 text-sm">
                      {formatDate(u?.created_at)}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={(e) => askDelete(e, u)}
                      disabled={pendingId === u?._id}
                      className="px-2 py-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition flex items-center gap-1 disabled:opacity-60"
                      title="Remove user"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-xs">
                        {pendingId === u?._id ? "Removing..." : "Remove"}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Confirmation dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={closeConfirm}
        onConfirm={doDelete}
        pending={isDeleting}
        variant="danger"
        title="Delete this user?"
        // description={
        //   target
        //     ? `You’re about to delete “${
        //         target.name || target.email || "this user"
        //       }”. This action cannot be undone.`
        //     : ""
        // }
        confirmLabel={isDeleting ? "Deleting…" : "Delete"}
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default AdminUsers;
