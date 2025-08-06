import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
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
  parseISO,
} from "date-fns";
import { useGetConfirmedTalentRequestsQuery } from "../../app/authApi";
import { toast } from "react-toastify";

const ConfirmedRequestsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const { data, isLoading, isError, error } =
    useGetConfirmedTalentRequestsQuery();

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
      toast.error(error?.data?.message || "Failed to load confirmed requests");
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
  };

  const isConfirmedDate = (date) => {
    if (!data?.data) return false;
    return data.data.some((req) => {
      const requestDate = parseISO(req.confirmedDate);
      return isSameDay(requestDate, date);
    });
  };

  const getConfirmedRequestsForDate = (date) => {
    if (!data?.data) return [];
    return data.data.filter((req) => {
      const requestDate = parseISO(req.confirmedDate);
      return isSameDay(requestDate, date);
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 w-[40%] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 w-[40%] backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 mb-6">
      <h2 className="text-2xl font-bold text-primary2 mb-6 text-center gradient-text">
        Confirmed Requests
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

            const isConfirmed = isConfirmedDate(date);
            const isSelected = selectedDate && isSameDay(selectedDate, date);
            const dayNumber = date.getDate();

            return (
              <div key={date.toString()} className="aspect-square">
                <button
                  onClick={() => handleDateClick(date)}
                  className={`w-full h-full flex flex-col items-center justify-center text-sm font-medium rounded-lg transition-all relative ${
                    isSelected
                      ? "bg-[#a38b41] text-white ring-2 ring-white/50"
                      : isConfirmed
                      ? "bg-[#a38b41]/50 text-white hover:bg-[#a38b41]/70"
                      : "hover:bg-white/10 text-gray-300 border border-white/5"
                  }`}
                >
                  {dayNumber}
                  {isConfirmed && (
                    <FaCheckCircle className="absolute top-1 right-1 text-white text-xs" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4 p-3 bg-[#1f1f1f] rounded-lg border border-[#a38b41]/30">
          <h3 className="text-white font-medium mb-2">
            {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          {getConfirmedRequestsForDate(selectedDate).length > 0 ? (
            <ul className="space-y-3">
              {getConfirmedRequestsForDate(selectedDate).map((req) => (
                <li
                  key={req._id}
                  className="text-sm p-2 bg-[#2a2a2a] rounded-md"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FaClock className="text-[#a38b41]" />
                    <span>{req.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaMapMarkerAlt className="text-[#a38b41]" />
                    <span>{req.location}</span>
                  </div>
                  <div className="text-gray-400">With: {req.fanName}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No confirmed meetings</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfirmedRequestsCalendar;
