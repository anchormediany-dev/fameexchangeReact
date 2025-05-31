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

const InversePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7)); // August 2024
  const [attendanceOption, setAttendanceOption] = useState("interested");
  const [eventType, setEventType] = useState("liveInPerson");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [mapZoom, setMapZoom] = useState(12);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [fanRequest, setFanRequest] = useState({
    talentName: "",
    date: "",
    time: "",
    desiredLocation: "",
  });

  // State for Response Form
  const [responseForm, setResponseForm] = useState({
    availableDates: "",
    time: "",
    place: "",
    fansName: "",
  });

  // Handler for Fan Request Form
  const handleFanRequestChange = (field, value) => {
    setFanRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handler for Response Form
  const handleResponseChange = (field, value) => {
    setResponseForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Button handlers
  const handleClear = () => {
    setFanRequest({
      talentName: "",
      date: "",
      time: "",
      desiredLocation: "",
    });
  };

  const handleSendRequest = () => {
    console.log("Sending request:", fanRequest);
    // Add your send request logic here
  };

  const handleCancel = () => {
    handleClear();
  };

  const handleAccepted = () => {
    console.log("Request accepted:", responseForm);
    // Add your acceptance logic here
  };

  const handleRejected = () => {
    console.log("Request rejected:", responseForm);
    // Add your rejection logic here
  };
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
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20 ">
        {/* Modern Compact Search Bar */}
        <section className="flex justify-end items-center">
          <div className="lg:w-[25%] mb-3">
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
                    <span className="relative z-10 hidden sm:inline">
                      Enter
                    </span>

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
        </section>
        <div className="flex flex-col 2xl:gap-16 gap-12 ">
          {/* First Row - Stretched Three Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
            {/* Right Column - 50% - Stretched */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              {/* Welcome section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4 flex-1">
                <div className="text-center mb-6">
                  <h1 className="custom-heading-seven mb-2 uppercase">
                    <span className="font-semibold">Welcome to our </span>
                    <br />
                    <span className="font-bold text-primary2">Inverse</span>
                  </h1>
                </div>
                <p className="text-gray-400 leading-relaxed text-center">
                  Experience the revolutionary platform that connects fans
                  directly with their favourite talents. Our Inverse system
                  allows you to request personalized interactions, schedule
                  meetings, and create unforgettable moments with the
                  personalities you admire most.
                </p>
              </div>

              {/* Image section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4 flex-1">
                <div className="flex flex-col gap-2 justify-center ">
                  <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
                    Talent Token Brand
                  </h2>
                  <img
                    className="rounded-md"
                    src="https://images.unsplash.com/photo-1472691681358-fdf00a4bfcfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxldmVudHxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                  />
                </div>
              </div>
            </div>
            {/* Middle Column - 50% - Stretched Calendar */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              {/* Compact Buy Tickets */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4">
                <div>
                  <h2 className="text-2xl font-bold uppercase text-white mb-6 text-center">
                    Request your{" "}
                    <span className="font-bold text-primary2">
                      "Inverse Experience"
                    </span>
                  </h2>
                  <a
                    href="#tickets"
                    className="max-w-[80%] mx-auto flex items-center justify-center space-x-2 p-3 rounded-xl transition-all duration-300 font-semibold hover:scale-105  text-white"
                    style={{ backgroundColor: "#a38b41" }}
                  >
                    <span className="text-sm">Inverse Request</span>
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              {/* Celender section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4 h-full flex flex-col">
                {/* Compact Calendar Header */}
                <h2 className="text-2xl  font-bold text-primary2 mb-6 text-center">
                  Talent Dates Available
                </h2>
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
                                  ? `${event.color} text-white  ${
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
          </div>
        </div>
        {/* Request form and talent confirmation */}
        <div className="flex flex-col 2xl:gap-16 gap-12 mt-10 lg:mt-16 2xl:mt-20 ">
          {/* First Row - Stretched Three Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
            {/* Right Column - 50% - Stretched */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              {/* Fan Request Form section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4 flex-1">
                <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
                  Fan Inverse Request Form
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Talent Selected
                    </label>
                    <input
                      type="text"
                      value={fanRequest.talentName}
                      onChange={(e) =>
                        handleFanRequestChange("talentName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter talent name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={fanRequest.date}
                      onChange={(e) =>
                        handleFanRequestChange("date", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={fanRequest.time}
                      onChange={(e) =>
                        handleFanRequestChange("time", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Desired Location
                    </label>
                    <input
                      type="text"
                      value={fanRequest.desiredLocation}
                      onChange={(e) =>
                        handleFanRequestChange(
                          "desiredLocation",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter desired location"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-8 justify-center">
                  <button
                    onClick={handleClear}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Send Request
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            {/* Middle Column - 50% - Stretched Calendar */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              {/* Talent Confirmation section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl  p-3 md:p-4 h-full flex flex-col">
                {/* Response Form */}

                <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
                  Talent Confirmation
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Available Dates
                    </label>
                    <select
                      value={responseForm.availableDates}
                      onChange={(e) =>
                        handleResponseChange("availableDates", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 outline outline-1 outline-gray-300 text-primary2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="">Select available date</option>
                      <option value="2025-06-01">June 1, 2025</option>
                      <option value="2025-06-02">June 2, 2025</option>
                      <option value="2025-06-03">June 3, 2025</option>
                      <option value="2025-06-04">June 4, 2025</option>
                      <option value="2025-06-05">June 5, 2025</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={responseForm.time}
                      onChange={(e) =>
                        handleResponseChange("time", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Place
                    </label>
                    <select
                      value={responseForm.place}
                      onChange={(e) =>
                        handleResponseChange("place", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-400 outline outline-1 outline-gray-300 text-primary2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="">Select place</option>
                      <option value="new-york">New York</option>
                      <option value="los-angeles">Los Angeles</option>
                      <option value="chicago">Chicago</option>
                      <option value="houston">Houston</option>
                      <option value="phoenix">Phoenix</option>
                      <option value="philadelphia">Philadelphia</option>
                      <option value="san-antonio">San Antonio</option>
                      <option value="san-diego">San Diego</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Fan's Name
                    </label>
                    <input
                      type="text"
                      value={responseForm.fansName}
                      onChange={(e) =>
                        handleResponseChange("fansName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter fan's name"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8 justify-center">
                  <button
                    onClick={handleAccepted}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Accepted
                  </button>
                  <button
                    onClick={handleRejected}
                    className="px-8 py-3 bg-primary2 text-white rounded-lg hover:bg-primary2 transition-colors font-medium"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InversePage;
