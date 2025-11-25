import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  format,
} from "date-fns";
// import { useGetUpcomingSessionsQuery } from "../../app/authApi";
import { toast } from "react-toastify";

const TalentDatesCalendar = ({
  sessionsData: data,
  onSelectSession,
  isLoading,
  isError,
  error,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [openModalFor, setOpenModalFor] = useState(null); // Date object for which modal is open

  // const { data, isLoading, isError, error } = useGetUpcomingSessionsQuery();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.data?.message || "Failed to load talent available dates"
      );
    }
  }, [isError, error]);

  const navigateMonth = (direction) => {
    setCurrentDate(
      direction === 1 ? addMonths(currentDate, 1) : subMonths(currentDate, 1)
    );
  };

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDay = getDay(monthStart);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    daysInMonth.forEach((day) => days.push(day));
    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    if (isConfirmedDate(date)) {
      setOpenModalFor(date);
    }
  };

  const normalizeDate = (dateStr) => {
    const parsed = new Date(dateStr);
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  };

  const isConfirmedDate = (date) => {
    if (!data?.sessions) return false;
    return data.sessions.some((session) => {
      const sessionDate = normalizeDate(session.sessionDate);
      return isSameDay(sessionDate, date);
    });
  };

  const sessionsForDate = (date) => {
    if (!data?.sessions || !date) return [];
    return (
      data.sessions
        .filter((s) => isSameDay(normalizeDate(s.sessionDate), date))
        // optional: sort by sessionTime ascending if present
        .sort((a, b) =>
          (a.sessionTime || "").localeCompare(b.sessionTime || "")
        )
    );
  };

  const closeModal = () => setOpenModalFor(null);

  if (isLoading) {
    return (
      <div className="bg-white/5 w-[40%] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading calendar...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 h-full flex flex-col">
        <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
          Talent Dates Available
        </h2>

        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110"
          >
            <FaChevronLeft />
          </button>

          <h2 className="text-2xl font-bold gradient-text">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <button
            onClick={() => navigateMonth(1)}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center font-semibold p-2 text-gray-300 text-xs"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 flex-1">
            {generateCalendarDays().map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const confirmed = isConfirmedDate(date);
              const selected = selectedDate && isSameDay(selectedDate, date);
              const dayNumber = date.getDate();

              return (
                <div key={date.toString()} className="aspect-square">
                  <button
                    onClick={() => handleDateClick(date)}
                    className={`w-full h-full flex flex-col items-center justify-center text-sm font-medium rounded-lg transition-all relative ${
                      selected
                        ? "bg-[#a38b41] text-white ring-2 ring-white/50"
                        : confirmed
                        ? "bg-[#a38b41]/50 text-white hover:bg-[#a38b41]/70"
                        : "hover:bg-white/10 text-gray-300 border border-white/5"
                    }`}
                    title={confirmed ? "Click to view sessions" : "No sessions"}
                  >
                    {dayNumber}
                    {confirmed && (
                      <FaCheckCircle className="absolute top-1 right-1 text-white text-xs" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== Modal: Sessions for selected date ===== */}
      {openModalFor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onKeyDown={(e) => e.key === "Escape" && closeModal()}
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
            aria-hidden="true"
          />
          {/* content */}
          <div className="relative z-10 w-[95vw] max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Sessions on {format(openModalFor, "EEE, MMM d, yyyy")}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-white/10 transition"
                aria-label="Close"
                title="Close"
              >
                <FaTimes className="text-white cursor-pointer" />
              </button>
            </div>

            <div className="p-4 overflow-auto">
              <SessionsTable
                onSelectSession={onSelectSession}
                sessions={sessionsForDate(openModalFor)}
                onClose={closeModal}
              />
            </div>

            {/* <div className="p-3 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer text-white text-sm"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

/* ---------- Table that shows EXACT payload fields ---------- */
function SessionsTable({ sessions, onSelectSession, onClose }) {
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return (
      <div className="text-sm text-white/80">
        No sessions found for this date.
      </div>
    );
  }

  const asInt = (v) => (v === 0 || v === "0" ? 0 : Number(v) || null);
  const money = (v) => (typeof v === "number" ? `$${v.toFixed(2)}` : v ?? "—");

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm border border-white/10 rounded-lg overflow-hidden">
        <thead className="bg-white/5 text-white/80">
          <tr>
            <Th>Location</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Length</Th>
            <Th>Buffer</Th>
            <Th>Time&nbsp;Zone</Th>
            <Th>Access</Th>
            <Th>Price</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {sessions.map((s) => {
            const len = asInt(s.sessionLength);
            const buf = asInt(s.bufferTime);
            return (
              <tr key={s._id} className="">
                <Td>{s.where || "—"}</Td>
                <Td>
                  {s.sessionDate
                    ? format(new Date(s.sessionDate), "EEE, MMM d, yyyy")
                    : "—"}
                </Td>
                <Td>{s.sessionTime || "—"}</Td>
                <Td>{len != null ? `${len} min` : "—"}</Td>
                <Td>{buf != null ? `${buf} min` : "—"}</Td>
                <Td>{s.timeZone || "—"}</Td>
                <Td className="capitalize">
                  {Array.isArray(s.accessType) 
                    ? s.accessType.map(at => at.type).join(", ") 
                    : s.accessType || "—"}
                </Td>
                <Td>
                  {Array.isArray(s.accessType) 
                    ? s.accessType.map(at => `$${at.price}`).join(", ")
                    : money(s.price)}
                </Td>
                <Td>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs ${
                      s.isActive
                        ? "bg-emerald-600/30 text-emerald-200"
                        : "bg-zinc-600/30 text-zinc-200"
                    }`}
                  >
                    {s.isActive ? "Active" : "Inactive"}
                  </span>
                </Td>
                <Td>
                  <button
                    type="button"
                    onClick={() => {
                      console.log("[CHILD] clicked:", { s });
                      try {
                        if (!onSelectSession) {
                          throw new Error(
                            "onSelectSession prop is missing in TalentDatesCalendar"
                          );
                        }
                        const id = s?.s_id ?? s?._id;
                        const data = s?.sessionData ?? s;
                        onSelectSession(id, data);
                      } finally {
                        onClose?.();
                      }
                    }}
                    className="bg-[#a38b41] py-1 px-3 rounded-md cursor-pointer whitespace-nowrap"
                  >
                    inverse Request
                  </button>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }) {
  return <th className="px-3 py-2 font-medium">{children}</th>;
}
function Td({ children }) {
  return <td className="px-3 py-2 text-white/90">{children}</td>;
}

export default TalentDatesCalendar;
