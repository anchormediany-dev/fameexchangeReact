import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { FiChevronLeft, FiChevronRight, FiPlus, FiX, FiTrash2 } from "react-icons/fi";
import {
  useGetMyCalendarPostsQuery,
  useCreateCalendarPostMutation,
  useUpdateCalendarPostMutation,
  useDeleteCalendarPostMutation,
} from "../../../app/futuresHubApi";

const STATUS_COLORS = {
  draft: "bg-gray-500",
  scheduled: "bg-[#a38b41]",
  posted: "bg-emerald-500",
};

function startOfWeek(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - date.getDay());
  return date;
}

function toKey(d) {
  return d.toISOString().slice(0, 10);
}

export default function ContentCalendarPage() {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const { data, isLoading } = useGetMyCalendarPostsQuery();
  const [createPost] = useCreateCalendarPostMutation();
  const [updatePost] = useUpdateCalendarPostMutation();
  const [deletePost] = useDeleteCalendarPostMutation();
  const [activeDay, setActiveDay] = useState(null);
  const [title, setTitle] = useState("");

  const posts = data?.data || [];

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const postsByDay = useMemo(() => {
    const map = {};
    for (const p of posts) {
      map[p.date] = map[p.date] || [];
      map[p.date].push(p);
    }
    return map;
  }, [posts]);

  const handleAdd = async (dateKey) => {
    if (!title.trim()) return;
    try {
      await createPost({ date: dateKey, title: title.trim(), status: "draft" }).unwrap();
      setTitle("");
      setActiveDay(null);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't add post.");
    }
  };

  const cycleStatus = async (post) => {
    const next = post.status === "draft" ? "scheduled" : post.status === "scheduled" ? "posted" : "draft";
    try {
      await updatePost({ id: post._id, status: next }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't update status.");
    }
  };

  const monthFmt = { month: "short", day: "numeric" };
  const rangeLabel = `${days[0].toLocaleDateString(undefined, monthFmt)} — ${days[6].toLocaleDateString(undefined, { ...monthFmt, year: "numeric" })}`;

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1">Content Calendar</h1>
      <p className="text-gray-400 text-sm mb-6">Plan and track your content across platforms.</p>

      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setWeekStart((d) => { const n = new Date(d); n.setDate(n.getDate() - 7); return n; })}
          className="text-gray-400 hover:text-white p-2"
        >
          <FiChevronLeft size={18} />
        </button>
        <p className="text-white font-semibold text-sm">{rangeLabel}</p>
        <button
          type="button"
          onClick={() => setWeekStart((d) => { const n = new Date(d); n.setDate(n.getDate() + 7); return n; })}
          className="text-gray-400 hover:text-white p-2"
        >
          <FiChevronRight size={18} />
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : (
        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => {
            const key = toKey(d);
            const dayPosts = postsByDay[key] || [];
            const isToday = key === toKey(new Date());
            return (
              <div
                key={key}
                className={`bg-[#191919] border rounded-xl p-3 min-h-[160px] flex flex-col ${
                  isToday ? "border-[#a38b41]" : "border-[#2a2a2a]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase">{d.toLocaleDateString(undefined, { weekday: "short" })}</p>
                    <p className={`text-sm font-bold ${isToday ? "text-[#e6ca7c]" : "text-white"}`}>{d.getDate()}</p>
                  </div>
                  <button type="button" onClick={() => { setActiveDay(key); setTitle(""); }} className="text-gray-500 hover:text-[#a38b41] transition">
                    <FiPlus size={16} />
                  </button>
                </div>

                <div className="flex-1 space-y-1.5">
                  {dayPosts.map((p) => (
                    <div key={p._id} className="group flex items-center gap-1.5 bg-[#111111] rounded-lg px-2 py-1.5">
                      <button
                        type="button"
                        onClick={() => cycleStatus(p)}
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_COLORS[p.status]}`}
                        title={`Status: ${p.status} (click to change)`}
                      />
                      <p className="text-gray-300 text-xs flex-1 truncate">{p.title}</p>
                      <button
                        type="button"
                        onClick={() => deletePost(p._id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition flex-shrink-0"
                      >
                        <FiTrash2 size={11} />
                      </button>
                    </div>
                  ))}
                </div>

                {activeDay === key && (
                  <div className="mt-2 flex gap-1">
                    <input
                      autoFocus
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAdd(key)}
                      placeholder="Post title"
                      className="flex-1 min-w-0 bg-[#111111] border border-[#2a2a2a] rounded px-2 py-1 text-xs text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
                    />
                    <button type="button" onClick={() => setActiveDay(null)} className="text-gray-500 hover:text-white">
                      <FiX size={14} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-500" /> Draft</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#a38b41]" /> Scheduled</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Posted</span>
        <span className="text-gray-600">· click a dot to cycle status</span>
      </div>
    </div>
  );
}
