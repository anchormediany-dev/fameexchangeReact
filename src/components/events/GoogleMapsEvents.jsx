import { useState } from "react";
import { FiPlus, FiZoomIn, FiZoomOut, FiNavigation } from "react-icons/fi";
import { BsBuilding, BsGoogle } from "react-icons/bs";

const GoogleMapsEvents = () => {
  const [mapZoom, setMapZoom] = useState(12);
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

  return (
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
            LIST & POST YOUR EVENT
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
              onClick={() => setMapZoom((prev) => Math.min(prev + 1, 18))}
              className="w-6 h-6 bg-black/50 rounded text-white text-xs hover:bg-black/70 transition-colors flex items-center justify-center"
            >
              <FiZoomIn className="w-3 h-3" />
            </button>
            <button
              onClick={() => setMapZoom((prev) => Math.max(prev - 1, 8))}
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
                  selectedEvent?.date === event.date ? "scale-125 z-20" : "z-10"
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
            {selectedEvent?.name || "Select an event"} • {calendarEvents.length}{" "}
            events
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
            SPONSOR A FUTURE
          </span>
        </div>
      </button>
    </div>
  );
};

export default GoogleMapsEvents;
