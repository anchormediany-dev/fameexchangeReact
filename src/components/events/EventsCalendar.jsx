import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7));
  const [calendarEvents] = useState([
    {
      date: 15,
      name: "Jake's Exchange",
      category: "networking",
      color: "bg-blue-500",
      lat: 40.7589,
      lng: -73.9851,
    },
    {
      date: 18,
      name: "Summer Festival",
      category: "music",
      color: "bg-purple-500",
      lat: 40.7831,
      lng: -73.9712,
    },
    {
      date: 22,
      name: "Tech Meetup",
      category: "tech",
      color: "bg-green-500",
      lat: 40.7505,
      lng: -73.9934,
    },
    {
      date: 25,
      name: "Art Gallery",
      category: "art",
      color: "bg-pink-500",
      lat: 40.7614,
      lng: -73.9776,
    },
    {
      date: 29,
      name: "Food Festival",
      category: "food",
      color: "bg-orange-500",
      lat: 40.7282,
      lng: -74.0776,
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(calendarEvents[0]);
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
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getEventForDate = (day) => {
    return calendarEvents.find((event) => event.date === day);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="lg:col-span-2 h-full">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4 h-full flex flex-col">
        {/* Compact Calendar Header */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                ></span>
                {selectedEvent.name}
              </p>
            )}
          </div>

          <button
            onClick={() => navigateMonth(1)}
            className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Compact Calendar Grid */}
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-3">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center font-semibold p-1 sm:p-2 text-gray-300 text-xs"
              >
                {day.slice(0, 3)}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 flex-1">
            {generateCalendarDays().map((day, index) => {
              const event = day ? getEventForDate(day) : null;
              const isSelected =
                selectedEvent && event && selectedEvent.date === event.date;
              return (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      onClick={() => event && handleEventClick(event)}
                      className={`w-full h-full flex flex-col items-center justify-center text-xs font-medium rounded-lg transition-all duration-300 hover:scale-105 relative ${
                        event
                          ? `${event.color} text-white shadow-md ${
                              isSelected
                                ? "ring-2 ring-white/70 ring-offset-2 ring-offset-gray-800 scale-110"
                                : "hover:ring-2 hover:ring-white/50"
                            }`
                          : "hover:bg-white/10 text-gray-300 border border-white/5 hover:border-[#a38b41]/30"
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm">
                        {day}
                      </span>
                      {event && (
                        <span className="text-xs mt-1 truncate w-full px-1 hidden sm:block">
                          {event.name.split(" ")[0]}
                        </span>
                      )}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
