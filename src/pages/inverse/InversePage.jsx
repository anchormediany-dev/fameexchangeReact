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
import talents from "../../data/talentData";


const InversePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6)); // July 2025
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [talentAvailabilityEvents, setTalentAvailabilityEvents] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [fanRequest, setFanRequest] = useState({
    talentName: "",
    date: "",
    time: "",
    desiredLocation: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });
  const [responseForm, setResponseForm] = useState({
    availableDates: "",
    time: "",
    place: "",
    fansName: "",
  });

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim()) {
      const results = talents.filter((talent) =>
        talent.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Select a talent
  const handleSelectTalent = (talent) => {
    setSelectedTalent(talent);
    setFanRequest((prev) => ({
      ...prev,
      talentName: talent.name,
    }));
    setSearchValue("");
    setShowResults(false);

    // Convert talent availability to calendar events
    const availabilityEvents = talent.availability.map((dateStr) => {
      const date = new Date(dateStr);
      return {
        date: date.getDate(),
        name: `${talent.name} Available`,
        category: "talent",
        color: "bg-yellow-500",
        talentId: talent.id,
      };
    });

    setTalentAvailabilityEvents(availabilityEvents);
  };

  // Handle fan request form changes
  const handleFanRequestChange = (field, value) => {
    setFanRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle response form changes
  const handleResponseChange = (field, value) => {
    setResponseForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Clear form
  const handleClear = () => {
    setFanRequest({
      talentName: "",
      date: "",
      time: "",
      desiredLocation: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      cardName: "",
    });
  };

  // Send request
  const handleSendRequest = () => {
    console.log("Sending request:", fanRequest);
    // Add your send request logic here
  };

  // Cancel request
  const handleCancel = () => {
    handleClear();
  };

  // Accept request
  const handleAccepted = () => {
    console.log("Request accepted:", responseForm);
    // Add your acceptance logic here
  };

  // Reject request
  const handleRejected = () => {
    console.log("Request rejected:", responseForm);
    // Add your rejection logic here
  };

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Generate calendar days
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

  // Get events for calendar
  const getEventForDate = (day) => {
    return talentAvailabilityEvents.find((event) => event.date === day);
  };

  // Month names
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

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Format card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, "");
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
        {/* Search Bar */}
        <section className="flex justify-end items-center">
          <div className="lg:w-[25%] mb-3 relative">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8">
                {/* Search Input */}
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  placeholder="Search talents..."
                  className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
                />

                {/* Search Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                  {searchValue && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchValue("");
                        setSearchResults([]);
                      }}
                      className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10 active:scale-95 z-30"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}
                  <div className="p-2 text-gray-400">
                    <FaSearch size={12} />
                  </div>
                </div>
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
                  {searchResults.map((talent) => (
                    <div
                      key={talent.id}
                      className="p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-3"
                      onClick={() => handleSelectTalent(talent)}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        {talent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {talent.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {talent.category} • {talent.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col 2xl:gap-16 gap-12">
          {/* First Row - Stretched Three Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
            {/* Right Column - 50% - Stretched */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              {/* Welcome section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
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

              {/* Selected Talent Info */}
              {/* {selectedTalent && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
                  <h2 className="text-xl font-bold text-primary2 mb-4 text-center">
                    Selected Talent
                  </h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                      {selectedTalent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">
                        {selectedTalent.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedTalent.category} • {selectedTalent.price}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {selectedTalent.description}
                  </p>
                </div>
              )} */}

              {/* Image section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
                <div className="flex flex-col gap-2 justify-center">
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
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4">
                <div>
                  <h2 className="text-2xl font-bold uppercase text-white mb-6 text-center">
                    Request your{" "}
                    <span className="font-bold text-primary2">
                      "Inverse Experience"
                    </span>
                  </h2>
                  <a
                    href="#tickets"
                    className="max-w-[80%] mx-auto flex items-center justify-center space-x-2 p-3 rounded-xl transition-all duration-300 font-semibold hover:scale-105 text-white"
                    style={{ backgroundColor: "#a38b41" }}
                  >
                    <span className="text-sm">Inverse Request</span>
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Calendar section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 h-full flex flex-col">
                <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
                  {selectedTalent
                    ? `${selectedTalent.name}'s Availability`
                    : "Talent Dates Available"}
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
                  </div>

                  <button
                    onClick={() => navigateMonth(1)}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Calendar Grid */}
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
                      return (
                        <div key={index} className="aspect-square">
                          {day && (
                            <button
                              className={`w-full h-full flex flex-col items-center justify-center text-xs font-medium rounded-lg transition-all duration-300 ${
                                event
                                  ? "bg-yellow-500 text-white hover:ring-2 hover:ring-white/50"
                                  : "hover:bg-white/10 text-gray-300 border border-white/5 hover:border-[#a38b41]/30"
                              }`}
                            >
                              <span className="font-bold text-xs sm:text-sm">
                                {day}
                              </span>
                              {event && (
                                <span className="text-xs mt-1 truncate w-full px-1 hidden sm:block">
                                  Available
                                </span>
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
        <div className="flex flex-col 2xl:gap-16 gap-12 mt-10 lg:mt-16 2xl:mt-20">
          {/* First Row - Stretched Three Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
            {/* Right Column - 50% - Stretched */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              {/* Fan Request Form section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
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
                  {/* Payment Information Section */}
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-lg font-medium text-gray-300 mb-4">
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={fanRequest.cardNumber}
                          onChange={(e) =>
                            handleFanRequestChange(
                              "cardNumber",
                              formatCardNumber(e.target.value)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          inputMode="numeric"
                          pattern="[0-9\s]{13,19}"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          value={fanRequest.cardExpiry}
                          onChange={(e) =>
                            handleFanRequestChange(
                              "cardExpiry",
                              formatExpiry(e.target.value)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="MM/YY"
                          maxLength="5"
                          inputMode="numeric"
                          pattern="\d\d/\d\d"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={fanRequest.cardCvv}
                          onChange={(e) =>
                            handleFanRequestChange("cardCvv", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="•••"
                          maxLength="3"
                          inputMode="numeric"
                          pattern="\d{3,4}"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          value={fanRequest.cardName}
                          onChange={(e) =>
                            handleFanRequestChange("cardName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
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
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 h-full flex flex-col">
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
                      {selectedTalent?.availability.map((date, index) => (
                        <option key={index} value={date}>
                          {date}
                        </option>
                      ))}
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
