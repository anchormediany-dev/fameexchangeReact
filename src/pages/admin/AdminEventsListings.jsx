// components/admin/AdminEventsListings.jsx
import React, { useState } from "react";
import { FiGlobe, FiPhone, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  useGetAdminEventsQuery,
  useDeleteEventMutation,
} from "../../app/authApi";
import { toast } from "react-toastify";

import ConfirmDialog from "../../utils/ConfirmDialog";
import { imgSrc } from "../../utils/imgSrc";

const fallbackLogo =
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&auto=format&fit=crop&q=60";

const normalizeUrl = (u) =>
  !u ? "#" : /^https?:\/\//i.test(u) ? u : `https://${u}`;

const toAbsolute = (p) => imgSrc(p);

const getThumb = (e) =>
  toAbsolute(e.logo) ||
  toAbsolute(e.event_cover) ||
  toAbsolute(e.event_images?.[0]) ||
  fallbackLogo;

const AdminEventsListings = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetAdminEventsQuery();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const [pendingId, setPendingId] = useState(null);

  // 🔒 confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const events = data?.data || data?.events?.data || [];
  const empty = !events || events.length === 0;

  const askDelete = (ev, event) => {
    ev?.stopPropagation?.();
    setTarget(event);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (isDeleting) return;
    setConfirmOpen(false);
    setTarget(null);
  };

  const doDelete = async () => {
    if (!target?._id) return;
    const id = target._id;

    try {
      setPendingId(id);
      await deleteEvent(id).unwrap();
      toast.success("Event deleted");
      refetch(); // stay in sync
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to delete");
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
          All Events
        </h2>
        <button
          className="custom-button-two"
          onClick={() => navigate("/admin/add-event")}
        >
          Add Event
        </button>
      </div>

      {/* Loading */}
      {(isLoading || isFetching) && (
        <div className="space-y-3">
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
          <div className="hidden sm:block">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {[
                      "S.No",
                      "Event Name",
                      "Location",
                      "Address",
                      "Phone",
                      "Website",
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
                      {[...Array(7)].map((__, j) => (
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
            <p className="font-semibold">Failed to load events</p>
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
          <p className="text-lg font-medium">No events found</p>
          <p className="text-sm opacity-70">
            Events you create will appear here.
          </p>
        </div>
      )}

      {/* Mobile Card View */}
      {!isLoading && !isFetching && !isError && !empty && (
        <div className="block sm:hidden space-y-4">
          {events.map((e, index) => (
            <div
              key={e?._id || index}
              onClick={() => e?._id && navigate(`/event-details/${e._id}`)}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-[#a38b41] rounded-lg flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={getThumb(e)}
                        alt={e?.title || "event"}
                        className="w-10 h-10 rounded-xl object-cover border-2 border-white/10"
                        onError={(ev) => (ev.currentTarget.src = fallbackLogo)}
                      />
                      <div>
                        <h4 className="font-semibold text-white text-sm">
                          {e?.title || "Untitled Event"}
                        </h4>
                        <span className="text-xs text-gray-400 capitalize">
                          {e?.category || "—"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(ev) => askDelete(ev, e)}
                      className="shrink-0 px-2 py-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition flex items-center gap-1"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-xs">
                        {pendingId === e?._id ? "Deleting..." : "Delete"}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <IoLocationOutline className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-sm">
                      {e?.location || "—"}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm">{e?.address || "—"}</p>

                  <div className="flex flex-wrap gap-2">
                    {e?.phone && (
                      <a
                        href={`tel:${e.phone}`}
                        className="flex items-center space-x-1 text-blue-400 text-sm"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        <FiPhone className="w-3 h-3" />
                        <span>{e.phone}</span>
                      </a>
                    )}

                    {e?.website && (
                      <a
                        href={normalizeUrl(e.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-400 text-sm"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        <FiGlobe className="w-3 h-3" />
                        <span className="truncate max-w-40">{e.website}</span>
                      </a>
                    )}
                  </div>
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
                  Event Name
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Location
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Address
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Phone
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Website
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((e, index) => (
                <tr
                  key={e?._id || index}
                  onClick={() => e?._id && navigate(`/event-details/${e._id}`)}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
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
                          src={getThumb(e)}
                          alt={e?.title || "event"}
                          className="w-10 h-10 rounded-xl object-cover border-2 border-white/10 group-hover:border-[#a38b41]/30 transition-colors"
                          onError={(ev) =>
                            (ev.currentTarget.src = fallbackLogo)
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#a38b41]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div>
                        <span className="font-semibold text-white text-sm block">
                          {e?.title || "Untitled Event"}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">
                          {e?.category || "—"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <IoLocationOutline className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium text-sm">
                        {e?.location || "—"}
                      </span>
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="text-gray-300 text-sm">
                      {e?.address || "—"}
                    </span>
                  </td>

                  <td className="p-3">
                    {e?.phone ? (
                      <a
                        href={`tel:${e.phone}`}
                        className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        <FiPhone className="w-3 h-3" />
                        <span className="text-sm">{e.phone}</span>
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>

                  <td className="p-3">
                    {e?.website ? (
                      <a
                        href={normalizeUrl(e.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        <FiGlobe className="w-3 h-3" />
                        <span className="truncate max-w-28 text-sm">
                          {e.website}
                        </span>
                        <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3" onClick={(ev) => ev.stopPropagation()}>
                    <button
                      onClick={(ev) => askDelete(ev, e)}
                      disabled={pendingId === e?._id}
                      className="px-2 py-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition flex items-center gap-1 disabled:opacity-60"
                      title="Delete event"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-xs">
                        {pendingId === e?._id ? "Deleting..." : "Delete"}
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
        title="Delete this event?"
        // description={
        //   target
        //     ? `You’re about to delete “${
        //         target.title || "Untitled Event"
        //       }”. This action cannot be undone.`
        //     : ""
        // }
        confirmLabel={isDeleting ? "Deleting…" : "Delete"}
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default AdminEventsListings;
