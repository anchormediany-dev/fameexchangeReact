import { useState } from "react";
import {
  FiUpload,
  FiVideo,
  FiUsers,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";

const EventsPreferencesActions = () => {
  const [attendanceOption, setAttendanceOption] = useState("interested");
  const [eventType, setEventType] = useState("liveInPerson");
  const [uploadedLogo, setUploadedLogo] = useState(null);
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

  return (
    <div className="lg:col-span-1 flex flex-col space-y-3 h-full">
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
                label: "Virtual By Inverse",
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
            COMING TO THE SHOW?
          </span>
        </h3>
        <a
          href="#tickets"
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl transition-all duration-300 font-semibold hover:scale-105 shadow-lg text-white"
          style={{ backgroundColor: "#a38b41" }}
        >
          <IoTicketOutline className="w-4 h-4" />
          <span className="text-sm">BUY YOUR TICKETS HERE NOW!</span>
          <FiExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Compact Upload */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
        <h3
          className="text-sm font-bold mb-3 text-center"
          style={{ color: "#a38b41" }}
        >
          Upload Image
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
              Flyer Logo, Image of event
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
  );
};

export default EventsPreferencesActions;
