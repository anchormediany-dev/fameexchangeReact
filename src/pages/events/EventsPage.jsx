import { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiUpload,
  FiGlobe,
  FiPhone,
  FiVideo,
  FiUsers,
  FiHeart,
  FiX,
  FiExternalLink,
  FiZoomIn,
  FiZoomOut,
  FiNavigation,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoLocationOutline, IoTicketOutline } from "react-icons/io5";
import { BsBuilding, BsPeople, BsGoogle } from "react-icons/bs";

const UltraModernEventsPllatform = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7)); // August 2024
  const [attendanceOption, setAttendanceOption] = useState("interested");
  const [eventType, setEventType] = useState("liveInPerson");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [mapZoom, setMapZoom] = useState(12);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Predefined events that show on calendar
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

  const [eventsList] = useState([
    {
      id: 1,
      name: "JAKE'S EXCHANGE LAUNCH PARTY",
      location: "New York",
      address: "166 W 46th St, NY 10036",
      phone: "844-206-6006",
      website: "hardrockhotelenwyork.com",
      logo: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
      category: "networking",
    },
    {
      id: 2,
      name: "SUMMER MUSIC FESTIVAL",
      location: "Brooklyn",
      address: "123 Festival Ave, Brooklyn NY",
      phone: "555-123-4567",
      website: "summerfest.com",
      logo: "https://images.unsplash.com/photo-1561489396-888724a1543d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV2ZW50fGVufDB8fDB8fHww",
      category: "music",
    },
    {
      id: 3,
      name: "TECH INNOVATION MEETUP",
      location: "Manhattan",
      address: "789 Tech St, Manhattan NY",
      phone: "555-987-6543",
      website: "techmeetup.com",
      logo: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGV2ZW50fGVufDB8fDB8fHww",
      category: "tech",
    },
    {
      id: 4,
      name: "ART GALLERY OPENING",
      location: "SoHo",
      address: "456 Art Street, SoHo NY",
      phone: "555-456-7890",
      website: "artgallery.com",
      logo: "https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGV2ZW50fGVufDB8fDB8fHww",
      category: "art",
    },
  ]);

  const [carouselEvents] = useState([
    {
      id: 1,
      title: "Electronic Music Festival",
      date: "Aug 15, 2024",
      location: "Central Park",
      image:
        "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$45",
      attendees: "2.5K",
      rating: "4.8",
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      date: "Aug 18, 2024",
      location: "Convention Center",
      image:
        "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$120",
      attendees: "1.2K",
      rating: "4.9",
    },
    {
      id: 3,
      title: "Food & Wine Tasting",
      date: "Aug 22, 2024",
      location: "Rooftop Venue",
      image:
        "https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$65",
      attendees: "850",
      rating: "4.7",
    },
    {
      id: 4,
      title: "Art Exhibition Opening",
      date: "Aug 25, 2024",
      location: "Modern Gallery",
      image:
        "https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$25",
      attendees: "650",
      rating: "4.6",
    },
    {
      id: 5,
      title: "Jazz Night Live",
      date: "Aug 29, 2024",
      location: "Blue Note Club",
      image:
        "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$35",
      attendees: "300",
      rating: "4.8",
    },
    {
      id: 6,
      title: "Comedy Show",
      date: "Aug 30, 2024",
      location: "Comedy Club",
      image:
        "https://images.pexels.com/photos/1627935/pexels-photo-1627935.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$30",
      attendees: "200",
      rating: "4.5",
    },
  ]);

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

  // Responsive carousel logic
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1); // Mobile: 1 slide
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2); // Tablet: 2 slides
      } else {
        setSlidesPerView(3); // Desktop: 3 slides
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

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

  const nextSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev + 1) %
        Math.max(1, Math.ceil(carouselEvents.length / slidesPerView))
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(carouselEvents.length / slidesPerView)) %
        Math.max(1, Math.ceil(carouselEvents.length / slidesPerView))
    );
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo({
          url: e.target.result,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlay, slidesPerView]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      // Add your search logic here
    }
  };

  const clearSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchValue("");
    // Keep focus on input after clearing
    const input = e.target.closest("form").querySelector("input");
    if (input) {
      input.focus();
    }
  };

  const handleInputBlur = (e) => {
    // Only blur if the click is outside the form
    const form = e.currentTarget.closest("form");
    setTimeout(() => {
      if (!form.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 100);
  };
  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20 z-50">
        {/* Modern Compact Search Bar */}
        <div className="w-full flex justify-self-end xl:w-80 2xl:w-96">
          <form onSubmit={handleSearch} className="relative group">
            <div
              className={`
                        relative overflow-hidden rounded-2xl transition-all duration-500 ease-out
                        ${
                          isFocused
                            ? "bg-white/10 border border-[#a38b41]/40 shadow-2xl shadow-[#a38b41]/20 scale-[1.02]"
                            : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8"
                        }
                      `}
            >
              {/* Animated background gradient */}
              <div
                className={`
                          absolute inset-0 bg-gradient-to-r from-[#a38b41]/10 via-transparent to-[#a38b41]/10 
                          transition-opacity duration-500 pointer-events-none z-5 ${
                            isFocused ? "opacity-100" : "opacity-0"
                          }
                        `}
              />

              {/* Search Input */}
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={handleInputBlur}
                placeholder="Search"
                className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
              />

              {/* Search Actions */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                {/* Clear Button */}
                {searchValue && (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                    onClick={clearSearch}
                    className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10 active:scale-95 z-30"
                  >
                    <FaTimes size={12} />
                  </button>
                )}

                {/* Ultra Modern Search Button */}
                <button
                  type="submit"
                  disabled={!searchValue.trim()}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  className={`
                              group/search relative overflow-hidden px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 flex items-center gap-2 z-30
                              ${
                                searchValue.trim()
                                  ? "bg-gradient-to-r from-[#a38b41] cursor-pointer via-[#c2ab67] to-[#e6ca7c] text-black shadow-lg hover:shadow-xl hover:shadow-[#a38b41]/30 hover:scale-110 active:scale-95"
                                  : "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                              }
                            `}
                >
                  <FaSearch size={11} className="relative z-10" />
                  <span className="relative z-10 hidden sm:inline">Enter</span>

                  {/* Button shine effect */}
                  {searchValue.trim() && (
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/search:translate-x-full transition-transform duration-700" />
                  )}
                </button>
              </div>

              {/* Search bar shine effect */}
              <div
                className={`
                          absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent 
                          transition-transform duration-1000 pointer-events-none z-5 ${
                            isFocused ? "translate-x-full" : ""
                          }
                        `}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20 z-50">
          {/* First Row - Stretched Three Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
            {/* Left Column - 25% */}
            <div className="lg:col-span-1 flex flex-col space-y-3 h-full">
              {/* Small List & Post Event Button */}
              <button
                className="w-full group relative overflow-hidden rounded-xl p-3 transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: "#a38b41" }}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <FiPlus className="w-4 h-4 text-white" />
                  <span className="font-semibold text-sm text-white">
                    LIST EVENT
                  </span>
                </div>
              </button>

              {/* Real Google Maps Integration - Flexible Height */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-sm font-bold flex items-center"
                    style={{ color: "#a38b41" }}
                  >
                    <BsGoogle className="w-4 h-4 mr-2 text-blue-400" />
                    GOOGLE MAPS
                  </h3>
                  <div className="flex space-x-1">
                    <button
                      onClick={() =>
                        setMapZoom((prev) => Math.min(prev + 1, 18))
                      }
                      className="w-6 h-6 bg-black/50 rounded text-white text-xs hover:bg-black/70 transition-colors flex items-center justify-center"
                    >
                      <FiZoomIn className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() =>
                        setMapZoom((prev) => Math.max(prev - 1, 8))
                      }
                      className="w-6 h-6 bg-black/50 rounded text-white text-xs hover:bg-black/70 transition-colors flex items-center justify-center"
                    >
                      <FiZoomOut className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl overflow-hidden border border-white/10 relative">
                  {/* Realistic Google Maps Style */}
                  <div
                    className="w-full h-full relative"
                    style={{
                      background: `
                    linear-gradient(45deg, #f0f8e8 25%, transparent 25%),
                    linear-gradient(-45deg, #f0f8e8 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #f0f8e8 75%),
                    linear-gradient(-45deg, transparent 75%, #f0f8e8 75%)
                  `,
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    }}
                  >
                    {/* Map Roads */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-400 opacity-60"></div>
                      <div className="absolute top-2/3 left-0 w-full h-1 bg-gray-400 opacity-60"></div>
                      <div className="absolute left-1/3 top-0 w-1 h-full bg-gray-400 opacity-60"></div>
                      <div className="absolute left-2/3 top-0 w-1 h-full bg-gray-400 opacity-60"></div>
                    </div>

                    {/* Event Markers with Real Positions */}
                    {calendarEvents.map((event, index) => (
                      <div
                        key={event.date}
                        className={`absolute group cursor-pointer transform hover:scale-150 transition-all duration-300 ${
                          selectedEvent?.date === event.date
                            ? "scale-125 z-20"
                            : "z-10"
                        }`}
                        style={{
                          left: `${25 + index * 12}%`,
                          top: `${20 + (index % 3) * 25}%`,
                        }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div
                          className={`w-4 h-4 ${event.color} rounded-full shadow-lg animate-pulse border-2 border-white`}
                        >
                          <div className="absolute -top-2 -left-2 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                          {event.name}
                        </div>
                      </div>
                    ))}

                    {/* Google Maps Style UI Elements */}
                    <div className="absolute bottom-2 right-2 bg-white text-black text-xs px-2 py-1 rounded shadow-md">
                      Google
                    </div>

                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      NYC • Zoom: {mapZoom}
                    </div>

                    {/* Compass */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full shadow-md flex items-center justify-center">
                      <FiNavigation className="w-3 h-3 text-gray-700" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <p className="text-xs text-gray-400">
                    {selectedEvent?.name || "Select an event"} •{" "}
                    {calendarEvents.length} events
                  </p>
                </div>
              </div>

              {/* Small Sponsor Button */}
              <button
                className="w-full group relative overflow-hidden rounded-xl p-3 transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: "#a38b41" }}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <BsBuilding className="w-4 h-4 text-white" />
                  <span className="font-semibold text-sm text-white">
                    SPONSOR
                  </span>
                </div>
              </button>
            </div>

            {/* Middle Column - 50% - Stretched Calendar */}
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
                        background:
                          "linear-gradient(to right, #a38b41, #d4c374)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {monthNames[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
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
                        selectedEvent &&
                        event &&
                        selectedEvent.date === event.date;
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

            {/* Right Column - 25% - Stretched */}
            <div className="lg:col-span-1 flex flex-col space-y-3 h-full">
              {/* Ultra Compact Preferences - Flexible Height */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4 flex-1">
                <h3 className="text-sm font-bold mb-2 text-center">
                  <span
                    style={{
                      background: "linear-gradient(to right, #a38b41, #d4c374)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Preferences
                  </span>
                </h3>

                {/* Compact Attendance */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold mb-3 text-white/90 uppercase tracking-wide flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mr-2"></span>
                    Attendance
                  </h4>
                  <div className="space-y-1.5">
                    {[
                      {
                        key: "notInterested",
                        label: "Not Interested",
                        color: "text-red-400",
                        bgColor: "hover:bg-red-500/10",
                      },
                      {
                        key: "interested",
                        label: "Interested",
                        color: "text-yellow-400",
                        bgColor: "hover:bg-yellow-500/10",
                      },
                      {
                        key: "attending",
                        label: "Attending",
                        color: "text-green-400",
                        bgColor: "hover:bg-green-500/10",
                      },
                    ].map(({ key, label, color, bgColor }) => (
                      <label
                        key={key}
                        className={`flex items-center space-x-3 cursor-pointer group py-2 px-3 rounded-xl transition-all duration-300 border border-transparent hover:border-white/15 ${bgColor} hover:shadow-sm`}
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            name="attendance"
                            checked={attendanceOption === key}
                            onChange={() => setAttendanceOption(key)}
                            className="w-4 h-4 appearance-none border-2 border-gray-500 rounded-full checked:border-amber-500 checked:bg-amber-500 transition-all duration-200 relative"
                          />
                          {attendanceOption === key && (
                            <div className="absolute inset-0 w-4 h-4 rounded-full border-2 border-amber-500 bg-amber-500 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${color} group-hover:text-white transition-colors leading-tight`}
                        >
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Compact Event Type */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-3 text-white/90 uppercase tracking-wide flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mr-2"></span>
                    Event Type
                  </h4>
                  <div className="space-y-1.5">
                    {[
                      {
                        key: "liveInPerson",
                        label: "Live In Person",
                        icon: FiUsers,
                        color: "text-blue-400",
                        bgColor: "hover:bg-blue-500/10",
                      },
                      {
                        key: "virtualByInverse",
                        label: "Virtual",
                        icon: FiVideo,
                        color: "text-purple-400",
                        bgColor: "hover:bg-purple-500/10",
                      },
                    ].map(({ key, label, icon: Icon, color, bgColor }) => (
                      <label
                        key={key}
                        className={`flex items-center space-x-3 cursor-pointer group py-2 px-3 rounded-xl transition-all duration-300 border border-transparent hover:border-white/15 ${bgColor} hover:shadow-sm`}
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            name="eventType"
                            checked={eventType === key}
                            onChange={() => setEventType(key)}
                            className="w-4 h-4 appearance-none border-2 border-gray-500 rounded-full checked:border-amber-500 checked:bg-amber-500 transition-all duration-200"
                          />
                          {eventType === key && (
                            <div className="absolute inset-0 w-4 h-4 rounded-full border-2 border-amber-500 bg-amber-500 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <Icon
                          className={`w-4 h-4 ${color} group-hover:text-white transition-colors flex-shrink-0`}
                        />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compact Buy Tickets */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
                <h3 className="text-sm font-bold mb-2 text-center">
                  <span
                    style={{
                      background: "linear-gradient(to right, #a38b41, #d4c374)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    COMING TO SHOW?
                  </span>
                </h3>
                <a
                  href="#tickets"
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl transition-all duration-300 font-semibold hover:scale-105 shadow-lg text-white"
                  style={{ backgroundColor: "#a38b41" }}
                >
                  <IoTicketOutline className="w-4 h-4" />
                  <span className="text-sm">BUY TICKETS</span>
                  <FiExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Compact Upload */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
                <h3
                  className="text-sm font-bold mb-3 text-center"
                  style={{ color: "#a38b41" }}
                >
                  Upload Logo
                </h3>

                {uploadedLogo ? (
                  <div className="text-center">
                    <div className="relative inline-block">
                      <img
                        src={uploadedLogo.url}
                        alt="Uploaded"
                        className="w-16 h-16 object-cover rounded-xl border-2 border-white/20 mb-2"
                      />
                      <button
                        onClick={() => setUploadedLogo(null)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-green-400 mb-2">Uploaded!</p>
                    <label
                      className="inline-block px-3 py-1 rounded-lg cursor-pointer transition-colors text-xs text-white"
                      style={{ backgroundColor: "#a38b41" }}
                    >
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#a38b41] transition-all duration-300 group">
                    <FiUpload className="w-4 h-4 text-gray-400 group-hover:text-[#a38b41] mb-1 transition-colors" />
                    <span className="text-xs text-gray-400 group-hover:text-[#a38b41] transition-colors text-center">
                      Logo/Flyer
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Second Row - Responsive Events Table */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
            <h2
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(to right, #a38b41, #d4c374)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Events Directory
            </h2>

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
              {eventsList.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-[#a38b41] rounded-lg flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={event.logo}
                          alt="logo"
                          className="w-10 h-10 rounded-xl object-cover border-2 border-white/10"
                        />
                        <div>
                          <h4 className="font-semibold text-white text-sm">
                            {event.name}
                          </h4>
                          <span className="text-xs text-gray-400 capitalize">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IoLocationOutline className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium text-sm">
                          {event.location}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{event.address}</p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`tel:${event.phone}`}
                          className="flex items-center space-x-1 text-blue-400 text-sm"
                        >
                          <FiPhone className="w-3 h-3" />
                          <span>{event.phone}</span>
                        </a>
                        <a
                          href={`https://${event.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-400 text-sm"
                        >
                          <FiGlobe className="w-3 h-3" />
                          <span className="truncate">{event.website}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
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
                  </tr>
                </thead>
                <tbody>
                  {eventsList.map((event, index) => (
                    <tr
                      key={event.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-3">
                        <span className="w-6 h-6 bg-[#a38b41] rounded-lg flex items-center justify-center text-xs font-bold text-white">
                          {index + 1}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={event.logo}
                              alt="logo"
                              className="w-10 h-10 rounded-xl object-cover border-2 border-white/10 group-hover:border-[#a38b41]/30 transition-colors"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#a38b41]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-white text-sm block">
                              {event.name}
                            </span>
                            <span className="text-xs text-gray-400 capitalize">
                              {event.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <IoLocationOutline className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium text-sm">
                            {event.location}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-gray-300 text-sm">
                          {event.address}
                        </span>
                      </td>
                      <td className="p-3">
                        <a
                          href={`tel:${event.phone}`}
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group"
                        >
                          <FiPhone className="w-3 h-3" />
                          <span className="text-sm">{event.phone}</span>
                        </a>
                      </td>
                      <td className="p-3">
                        <a
                          href={`https://${event.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group"
                        >
                          <FiGlobe className="w-3 h-3" />
                          <span className="truncate max-w-28 text-sm">
                            {event.website}
                          </span>
                          <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Third Row - Fully Responsive Carousel */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <h2
                className="text-xl font-bold"
                style={{
                  background: "linear-gradient(to right, #a38b41, #d4c374)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Featured Events
              </h2>
              <div className="flex items-center justify-between sm:justify-end space-x-3">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-xs transition-colors ${
                    isAutoPlay ? "text-white" : "bg-gray-500/20 text-gray-400"
                  }`}
                  style={isAutoPlay ? { backgroundColor: "#a38b41" } : {}}
                >
                  {isAutoPlay ? (
                    <FiPause className="w-3 h-3" />
                  ) : (
                    <FiPlay className="w-3 h-3" />
                  )}
                  <span>Auto</span>
                </button>
                <div className="flex space-x-1">
                  <button
                    onClick={prevSlide}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <FiChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <FiChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({
                  length: Math.ceil(carouselEvents.length / slidesPerView),
                }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div
                      className={`grid gap-4 ${
                        slidesPerView === 1
                          ? "grid-cols-1"
                          : slidesPerView === 2
                          ? "grid-cols-1 sm:grid-cols-2"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      }`}
                    >
                      {carouselEvents
                        .slice(
                          slideIndex * slidesPerView,
                          (slideIndex + 1) * slidesPerView
                        )
                        .map((event) => (
                          <div
                            key={event.id}
                            className="group relative cursor-pointer"
                          >
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#a38b41]/30 transition-all duration-500">
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />

                              {/* Ultra Modern Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                  <h3 className="font-bold text-white mb-2 text-base sm:text-lg">
                                    {event.title}
                                  </h3>
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-gray-300 flex items-center">
                                      <IoLocationOutline className="w-4 h-4 mr-1" />
                                      {event.location}
                                    </span>
                                    <span
                                      className="text-lg font-bold"
                                      style={{ color: "#a38b41" }}
                                    >
                                      {event.price}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span className="flex items-center">
                                      <BsPeople className="w-3 h-3 mr-1" />
                                      {event.attendees}
                                    </span>
                                    <span className="flex items-center">
                                      <FiHeart className="w-3 h-3 mr-1" />
                                      {event.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Modern Glow Effect */}
                              <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 group-hover:ring-[#a38b41]/50 group-hover:ring-offset-2 group-hover:ring-offset-gray-800 transition-all duration-500"></div>

                              {/* Price Badge */}
                              <div
                                className="absolute top-3 right-3 text-white text-xs px-2 py-1 rounded-lg font-semibold"
                                style={{ backgroundColor: "#a38b41" }}
                              >
                                {event.price}
                              </div>
                            </div>

                            {/* Card Info */}
                            <div className="mt-3 text-center">
                              <h4 className="font-semibold text-white mb-1 group-hover:text-[#a38b41] transition-colors">
                                {event.title}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {event.date}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              {Array.from({
                length: Math.ceil(carouselEvents.length / slidesPerView),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-8 h-3"
                      : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                  }`}
                  style={
                    index === currentSlide ? { backgroundColor: "#a38b41" } : {}
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UltraModernEventsPllatform;
