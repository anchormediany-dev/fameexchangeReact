import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const colorFor = (cat = "") => "bg-green-500"; // your schema: green for all

const sameDay = (a, b) =>
  a &&
  b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const EventsCalendar = ({ events = [], selectedDate = null, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const navigateMonth = (direction) => {
    const d = new Date(currentDate);
    d.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(d);
  };

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Map events -> days for current month
  const eventsByDay = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      if (!e?.datetime) return;
      const d = new Date(e.datetime);
      if (
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear()
      ) {
        const day = d.getDate();
        (map[day] ||= []).push({
          id: e.id,
          name: e.name || e.title || "Event",
          time: formatTime(d),
          color: colorFor(e.category || e.type),
          raw: d,
        });
      }
    });
    Object.values(map).forEach((arr) => arr.sort((a, b) => a.raw - b.raw));
    return map;
  }, [events, currentDate]);

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = Array.from({ length: firstDay }, () => null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const today = new Date();
  const isToday = (d) =>
    d &&
    today.getFullYear() === currentDate.getFullYear() &&
    today.getMonth() === currentDate.getMonth() &&
    today.getDate() === d;

  const handleDayClick = (day) => {
    const clicked = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    // toggle: select if different, clear if same
    if (selectedDate && sameDay(selectedDate, clicked)) {
      onDateChange?.(null);
      setSelectedEvent(null);
    } else {
      onDateChange?.(clicked);
      const firstEvent = (eventsByDay[day] || [])[0] || null;
      setSelectedEvent(firstEvent);
    }
  };

  return (
    <div className="lg:col-span-2 h-full">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Previous month"
          >
            <FiChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          <div className="text-center">
            <h2
              className="text-lg sm:text-2xl font-bold"
              style={{
                background: "linear-gradient(to right, #a38b41, #d4c374)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            {selectedEvent && (
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${selectedEvent.color}`}
                />
                {selectedEvent.name} ·{" "}
                {new Date(selectedEvent.raw).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>

          <button
            onClick={() => navigateMonth(1)}
            className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Next month"
          >
            <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Week header */}
        <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-3">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center font-semibold p-1 sm:p-2 text-gray-300 text-xs"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 flex-1">
          {generateCalendarDays().map((day, idx) => {
            const dayEvents = day ? eventsByDay[day] || [] : [];
            const hasEvents = dayEvents.length > 0;

            const isSelected =
              selectedDate &&
              sameDay(
                selectedDate,
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day || 1
                )
              );

            const nativeTitle = hasEvents
              ? dayEvents.map((e) => `${e.name} • ${e.time}`).join("\n")
              : "";

            return (
              <div key={idx} className="aspect-square">
                {day && (
                  <div className="relative group w-full h-full">
                    <button
                      onClick={() => handleDayClick(day)}
                      title={nativeTitle}
                      aria-pressed={!!isSelected}
                      className={[
                        "w-full h-full flex flex-col items-center justify-start pt-1 text-xs font-medium rounded-lg transition-all duration-300 border",
                        hasEvents
                          ? "bg-white/10 border-white/20 hover:border-[#a38b41]/40"
                          : "border-white/5 hover:border-[#a38b41]/30",
                        isSelected
                          ? "ring-2 ring-[#a38b41] bg-[#a38b41]/20"
                          : "hover:scale-105",
                        isToday(day)
                          ? "outline outline-1 outline-[#a38b41]/60"
                          : "",
                        "text-gray-200",
                      ].join(" ")}
                    >
                      <span className="font-bold text-xs sm:text-sm">
                        {day}
                      </span>

                      {/* dots */}
                      {/* count badge (replaces dots) */}
                      {hasEvents && (
                        <div className="mt-1 w-full flex justify-center">
                          <span
                            className="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold
                                       bg-[#a38b41]/15 border border-[#a38b41]/40 text-[#f2e9c7]"
                            aria-label={`${dayEvents.length} ${
                              dayEvents.length === 1 ? "event" : "events"
                            }`}
                          >
                            {dayEvents.length}{" "}
                            {dayEvents.length > 1 ? "events" : "event"}
                          </span>
                        </div>
                      )}
                    </button>

                    {/* Hover tooltip */}
                    {hasEvents && (
                      <div className="pointer-events-none hidden group-hover:block absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full z-20">
                        <div className="bg-[#a38b41] text-white text-xs rounded-md border border-white/10 shadow-xl p-2 min-w-44 max-w-64">
                          <div className="font-semibold mb-1">
                            {monthNames[currentDate.getMonth()].slice(0, 3)}{" "}
                            {day}
                          </div>
                          <ul className="space-y-1">
                            {dayEvents.map((e) => (
                              <li
                                key={e.id + e.time}
                                className="flex items-center gap-2"
                              >
                                {/* <span className="w-2 h-2 rounded-full bg-green-500" /> */}
                                <span className="truncate">{e.name}</span>
                                <span className="opacity-80 ml-auto">
                                  {e.time}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
