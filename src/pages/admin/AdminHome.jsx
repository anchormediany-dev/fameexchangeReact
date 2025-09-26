// pages/AdminDashboard.jsx
import React, { useMemo, useState } from "react";
import {
  useGetAdminDashboardQuery,
  useDeleteSessionByAdminMutation,
} from "../../app/authApi";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import ConfirmDialog from "../../utils/ConfirmDialog";
import { toast } from "react-toastify";
const API_BASE = (import.meta.env?.VITE_API_URL || "").replace(/\/$/, "");
const toAbsolute = (pathOrUrl) => {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!API_BASE) return pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return pathOrUrl.startsWith("/")
    ? `${API_BASE}${pathOrUrl}`
    : `${API_BASE}/${pathOrUrl}`;
};

const Section = ({ title, right }) => (
  <div className="flex items-center justify-between mb-3">
    <h3
      className="text-lg font-semibold"
      style={{
        background: "linear-gradient(to right, #a38b41, #d4c374)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {title}
    </h3>
    {right}
  </div>
);

const StatCard = ({ label, value, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-white/30"
  >
    <div className="text-sm text-gray-300">{label}</div>
    <div className="text-2xl font-bold text-white mt-1">{value}</div>
  </button>
);

const SkeletonStat = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-pulse">
    <div className="h-3 w-24 bg-white/10 rounded" />
    <div className="h-6 w-20 bg-white/10 rounded mt-2" />
    <div className="h-2 w-28 bg-white/10 rounded mt-2" />
  </div>
);

const Chip = ({ children }) => (
  <span className="px-2 py-0.5 rounded-lg text-xs border border-white/10 bg-white/5">
    {children}
  </span>
);

const formatDate = (iso, withTime = false) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return withTime ? d.toLocaleString() : d.toLocaleDateString();
  } catch {
    return iso;
  }
};

/** Get the first alphabetic initial (fallback to “?”) */
const getInitial = (str) => {
  if (!str) return "?";
  const m = String(str)
    .trim()
    .match(/[A-Za-z]/);
  return m ? m[0].toUpperCase() : "?";
};

/** Reusable avatar that falls back to a letter if image missing/error */
const Avatar = ({
  src,
  name,
  size = "md", // "sm" | "md" | "lg"
  rounded = "xl",
  border = true,
}) => {
  const [errored, setErrored] = useState(false);
  const initial = useMemo(() => getInitial(name), [name]);

  const sizeCls =
    size === "lg" ? "w-12 h-12" : size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const radius = rounded === "xl" ? "rounded-xl" : "rounded-lg";
  const borderCls = border ? "border-2 border-white/10" : "";

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={name || "user"}
        className={`${sizeCls} ${radius} object-cover ${borderCls}`}
        onError={() => setErrored(true)}
      />
    );
  }

  return (
    <div
      className={`${sizeCls} ${radius} ${borderCls} bg-white/10 flex items-center justify-center`}
    >
      <span className="text-white font-semibold">{initial}</span>
    </div>
  );
};

const AdminDashboard = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetAdminDashboardQuery();
  const [deleteSession, { isLoading: isDeleting, error: deleteSessionError }] =
    useDeleteSessionByAdminMutation();
  const navigate = useNavigate();
  // response envelope: { success, data: {...} }
  const payload = data?.data || {};
  const users = payload?.users || [];
  const teamMembers = (payload?.teamMembers || []).filter((t) => t?.isVisible);
  const sessions = payload?.sessions || [];
  const totalEvents = payload?.totalEvents ?? 0;

  const { totalUsers, talents, fans, activeCount, inactiveCount } =
    useMemo(() => {
      const total = users.length;
      const a = users.filter((u) => u.role === "ADMIN");
      const t = users.filter((u) => u.role === "TALENT");
      const f = users.filter((u) => u.role === "FAN");
      const o = users.filter(
        (u) => !["ADMIN", "TALENT", "FAN"].includes(u.role || "")
      );
      const act = users.filter((u) => u.is_active).length;
      return {
        totalUsers: total,
        talents: t.length,
        fans: f.length,
        activeCount: act,
        inactiveCount: total - act,
      };
    }, [users]);

  // sessions[*].createdBy is an object
  const normalizedSessions = useMemo(
    () =>
      sessions.map((s) => {
        const creator = s?.createdBy || {};
        const raw = creator?.images?.[0]?.fileUrl;
        return {
          ...s,
          _creatorName: creator?.name || creator?.email || "—",
          _creatorEmail: creator?.email || "—",
          _creatorAvatarSrc: raw ? toAbsolute(raw) : "",
        };
      }),
    [sessions]
  );

  const sortedSessions = useMemo(() => {
    return [...normalizedSessions].sort((s1, s2) => {
      const dt1 = new Date(`${s1.sessionDate}T${s1.sessionTime || "00:00"}:00`);
      const dt2 = new Date(`${s2.sessionDate}T${s2.sessionTime || "00:00"}:00`);
      return dt1 - dt2;
    });
  }, [normalizedSessions]);

  const isBusy = isLoading || isFetching;
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
      await deleteSession(id).unwrap();
      // Optimistic local removal
      setUsersLocal((prev) => prev.filter((u) => u._id !== id));
      // Optional full sync:
      refetch();
    } catch (err) {
      console.log("error", { deleteSessionError });
      toast.error(deleteSessionError?.data?.message || "No session found");
      setDeleteError(
        err?.data?.message || err?.error || "Failed to delete user"
      );
    } finally {
      setPendingId(null);
      closeConfirm();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-5">
      <div className="flex items-center justify-between mb-5">
        <h2
          className="text-2xl font-bold"
          style={{
            background: "linear-gradient(to right, #a38b41, #d4c374)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Admin Dashboard
        </h2>
      </div>

      {/* Error */}
      {isError && (
        <div className="mb-4 flex items-center justify-between bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3">
          <div>
            <p className="font-semibold">Failed to load dashboard</p>
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

      {/* Stats */}
      <Section title="Overview" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {isBusy ? (
          <>
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </>
        ) : (
          <>
            <StatCard
              label="Total Users"
              value={totalUsers}
              onClick={() => navigate("/admin/users")}
            />
            <StatCard
              label="Total Events"
              value={totalEvents}
              onClick={() => navigate("/admin/events")}
            />
          </>
        )}
      </div>

      {/* Team Members */}
      <Section
        title="Team members"
        right={
          <span className="text-xs text-gray-400">
            {teamMembers.length} Members
          </span>
        }
      />
      {isBusy ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-white/10 rounded" />
                  <div className="h-2 w-20 bg-white/10 rounded" />
                </div>
              </div>
              <div className="h-3 w-full bg-white/10 rounded mt-4" />
              <div className="h-3 w-2/3 bg-white/10 rounded mt-2" />
            </div>
          ))}
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="text-center text-gray-300 py-6 mb-6">
          No visible team members.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {teamMembers.map((m) => {
            const avatarSrc = m?.imageUrl ? toAbsolute(m.imageUrl) : "";
            return (
              <div
                key={m?._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={avatarSrc} name={m?.name} size="lg" />
                  <div className="min-w-0">
                    <div className="text-white font-medium truncate">
                      {m?.name || "—"}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {m?.title || "—"}
                    </div>
                  </div>
                </div>
                {m?.bio && (
                  <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                    {m.bio}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Sessions */}
      <Section
        title="Sessions"
        right={
          <span className="text-xs text-gray-400">
            {sessions.length} Sessions
          </span>
        }
      />
      <div className="overflow-x-auto">
        {isBusy ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {[
                  "Date",
                  "Time",
                  "Type",
                  "Price",
                  "Time Zone",
                  "Created By",
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
                <tr key={i} className="border-b border-white/5">
                  {[...Array(6)].map((__, j) => (
                    <td key={j} className="p-3">
                      <div className="h-4 w-full max-w-[180px] bg-white/10 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : sessions.length === 0 ? (
          <div className="text-center text-gray-300 py-6">
            No sessions found.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Date
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Time
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Length
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Access Type
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Price
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Time Zone
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Created By
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedSessions.slice(0, 8).map((s) => (
                <tr
                  key={s?._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-3">
                    <span className="text-gray-300 text-sm">
                      {formatDate(s?.sessionDate)}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-300 text-sm">
                      {s?.sessionTime || "—"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-300 text-sm">
                      {s?.sessionLength || "—"}
                    </span>
                  </td>
                  <td className="p-3">
                    <Chip>{s?.accessType || "—"}</Chip>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-300 text-sm">
                      {typeof s?.price === "number" ? `$${s.price}` : "—"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-300 text-sm">
                      {s?.timeZone || "—"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={s?._creatorAvatarSrc}
                        name={s?._creatorName}
                        size="sm"
                        rounded="lg"
                      />
                      <div className="min-w-0">
                        <div className="text-white text-sm font-medium truncate">
                          {s?._creatorName || "—"}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {s?._creatorEmail || "—"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={(e) => askDelete(e, s)}
                      disabled={pendingId === s?._id}
                      className="px-2 py-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition flex items-center gap-1 disabled:opacity-60"
                      title="Remove user"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-xs">
                        {pendingId === s?._id ? "Removing..." : "Remove"}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* ✅ Confirmation dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={closeConfirm}
        onConfirm={doDelete}
        pending={isDeleting}
        variant="danger"
        title="Delete this session?"
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

export default AdminDashboard;
