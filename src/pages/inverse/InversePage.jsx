import { useState, useEffect } from "react";
import {
  FiSearch,
  FiMapPin,
  FiUpload,
  FiCalendar,
  FiClock,
  FiUser,
  FiMail,
  FiPhone,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { IoTicketSharp } from "react-icons/io5";
import { BsSpotify, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoIosFlash } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";

const InversePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([
    18, 19, 22, 23, 29, 30, 31,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "20:00",
    location: "",
    name: "",
    email: "",
    phone: "",
    ticketType: [],
  });
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Electronic Vibes",
      artist: "DJ Nexus",
      image:
        "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024-08-18",
      likes: 1247,
    },
    {
      id: 2,
      title: "Indie Night",
      artist: "The Waves",
      image:
        "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024-08-22",
      likes: 892,
    },
    {
      id: 3,
      title: "Hip Hop Legends",
      artist: "MC Flow",
      image:
        "https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "2024-08-29",
      likes: 2156,
    },
  ]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Calendar functions
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

  const isDateSelected = (day) => {
    return selectedDates.includes(day);
  };

  const toggleDateSelection = (day) => {
    if (isDateSelected(day)) {
      setSelectedDates(selectedDates.filter((d) => d !== day));
    } else {
      setSelectedDates([...selectedDates, day]);
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTicketTypeChange = (type) => {
    const newTypes = formData.ticketType.includes(type)
      ? formData.ticketType.filter((i) => i !== type)
      : [...formData.ticketType, type];
    handleInputChange("ticketType", newTypes);
  };

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
  const currentEvent = events[currentEventIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      nextEvent();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#171717] text-white mt-20">
      {/* Modern Header */}
      <header className="relative ">
        <div className="relative max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <IoIosFlash className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  EventFlow
                </h1>
                <p className="text-gray-400 text-sm">
                  Live • Music • Experience
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-3 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold  ">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Featured Events */}
        <div className="xl:col-span-1 space-y-6">
          {/* Featured Event Carousel */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 ">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Events</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevEvent}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextEvent}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="w-full h-64 object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold mb-1">{currentEvent.title}</h3>
                <p className="text-gray-300 mb-2">{currentEvent.artist}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {currentEvent.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentEventIndex
                      ? "bg-purple-500 w-6"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Social Media Integration */}
          {/* <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Connect & Share</h3>
            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 group">
                <BsSpotify className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Spotify</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 group">
                <BsInstagram className="w-8 h-8 text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Instagram</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 group">
                <BsTwitter className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Twitter</span>
              </button>
            </div>
          </div> */}

          {/* Upload Section */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Sponsor Image</h3>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-2xl cursor-pointer hover:border-purple-500 transition-all duration-300 group">
              <FiUpload className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mb-2 transition-colors" />
              <span className="text-gray-400 group-hover:text-purple-500 transition-colors">
                Upload Sponsor Images
              </span>
              <input type="file" accept="image/*" className="hidden" multiple />
            </label>
          </div>
        </div>

        {/* Middle Column - Calendar */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 ">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-4">
                <FiCalendar className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-green-400 font-semibold">
                  Available Event Dates
                </span>
              </div>

              <div className="flex items-center justify-center space-x-6 mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h4>
                <button
                  onClick={() => navigateMonth(1)}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold p-3 text-gray-400 text-sm"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {generateCalendarDays().map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      onClick={() => toggleDateSelection(day)}
                      className={`w-full h-full flex items-center justify-center text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDateSelected(day)
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white  "
                          : "hover:bg-white/10 text-gray-300"
                      }`}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <HiOutlineLocationMarker className="w-6 h-6 mr-3 text-red-500" />
              <h3 className="text-xl font-bold">Event Locations</h3>
            </div>
            <div className="h-48 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl flex items-center justify-center border border-white/10">
              <div className="text-center">
                <FiMapPin className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-gray-400">Interactive Map</p>
                <p className="text-sm text-gray-500">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Event Booking */}
        <div className="xl:col-span-1 space-y-6">
          {/* Event Booking Form */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 ">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Book Your Experience
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Event Name
                </label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) =>
                    handleInputChange("eventName", e.target.value)
                  }
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Select or type event name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    <FiCalendar className="inline w-4 h-4 mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    <FiClock className="inline w-4 h-4 mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  <FiMapPin className="inline w-4 h-4 mr-1" />
                  Venue Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder="Enter venue or location"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  <FiMail className="inline w-4 h-4 mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  <FiPhone className="inline w-4 h-4 mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Ticket Types */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-300">
                  <IoTicketSharp className="inline w-4 h-4 mr-1" />
                  Ticket Types
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["General", "VIP", "Premium", "Backstage"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300 group"
                    >
                      <input
                        type="checkbox"
                        checked={formData.ticketType.includes(type)}
                        onChange={() => handleTicketTypeChange(type)}
                        className="mr-3 rounded text-purple-500 focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-sm group-hover:text-white transition-colors">
                        {type}
                      </span>
                      {type === "VIP" && (
                        <FiStar className="w-4 h-4 ml-auto text-yellow-500" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button className="py-4 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-2xl transition-all duration-300 font-semibold">
                  Clear Form
                </button>
                <button className="py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl transition-all duration-300 font-semibold  ">
                  Submit Request
                </button>
              </div>
            </div>
          </div>

          {/* Event Confirmation & Tickets */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Event Confirmation
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="font-semibold text-gray-300">Status:</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                  Confirmed
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="font-semibold text-gray-300">Event Time:</span>
                <span className="text-white">8:00 PM</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="font-semibold text-gray-300">Venue:</span>
                <span className="text-white">Madison Square Garden</span>
              </div>

              <div className="pt-4 space-y-3">
                <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl transition-all duration-300 font-semibold ">
                  Confirm Booking
                </button>

                <button className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-2xl transition-all duration-300 font-semibold ">
                  Reschedule Event
                </button>

                <button className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-2xl transition-all duration-300 font-bold text-lg flex items-center justify-center">
                  <IoTicketSharp className="w-6 h-6 mr-2" />
                  Get Tickets Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InversePage;
