import React, { useState } from "react";
import moment from "moment-timezone";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./TalentDashboard.css";
const localizer = momentLocalizer(moment);
const timeZones = moment.tz.names();

const TalentDashboard = () => {
  const [settings, setSettings] = useState({
    sessionLength: 30,
    price: 50,
    bufferTime: 15,
    timeZone: moment.tz.guess(),
    accessType: "browser",
    isActive: false,
  });

  const [events, setEvents] = useState([]);

  const handleSelectSlot = ({ start }) => {
    const newEvent = {
      title: "Available Session",
      start,
      end: moment(start).add(settings.sessionLength, "minutes").toDate(),
      allDay: false,
    };
    setEvents([...events, newEvent]);
  };

  const toggleActivation = () => {
    setSettings((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16">
      <div className="container mx-auto space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary2">
              INVERSE Meet & Greet
            </h1>
            <p className="text-gray-400 mt-1">
              Configure your availability for fans
            </p>
          </div>
          <button
            onClick={toggleActivation}
            className={`px-5 py-2 rounded-full font-semibold text-white transition ${
              settings.isActive
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {settings.isActive ? "Active" : "Inactive"}
          </button>
        </div>

        {/* Settings */}
        <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 shadow space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Session Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Session Length */}
            <div>
              <label className="block text-sm text-white mb-2">
                Session Length
              </label>
              <select
                value={settings.sessionLength}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    sessionLength: parseInt(e.target.value),
                  })
                }
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4 "
              >
                {[15, 30, 60].map((min) => (
                  <option key={min} value={min}>
                    {min} minutes
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm text-white mb-2">
                Price per Session ($)
              </label>
              <input
                type="number"
                value={settings.price}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4 placeholder-gray-400"
              />
            </div>

            {/* Buffer Time */}
            <div>
              <label className="block text-sm text-white mb-2">
                Buffer Time
              </label>
              <select
                value={settings.bufferTime}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    bufferTime: parseInt(e.target.value),
                  })
                }
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
              >
                {[5, 10, 15, 20].map((min) => (
                  <option key={min} value={min}>
                    {min} minutes
                  </option>
                ))}
              </select>
            </div>

            {/* Time Zone */}
            <div>
              <label className="block text-sm text-white mb-2">Time Zone</label>
              <select
                value={settings.timeZone}
                onChange={(e) =>
                  setSettings({ ...settings, timeZone: e.target.value })
                }
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
              >
                {timeZones.slice(0, 100).map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            {/* VR / Browser */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm text-white mb-2">
                Access Type
              </label>
              <div className="flex gap-4">
                {["vr", "browser"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="accessType"
                      value={type}
                      checked={settings.accessType === type}
                      onChange={(e) =>
                        setSettings({ ...settings, accessType: e.target.value })
                      }
                      className="gredient-text bg-transparent"
                    />
                    <span className="capitalize text-white">{type} access</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">Calendar Availability</h2>
          <div className="h-[500px] bg-white rounded-md overflow-hidden">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelectSlot}
              defaultView="week"
              min={new Date(0, 0, 0, 8)}
              max={new Date(0, 0, 0, 20)}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">Availability Preview</h2>
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="gredient-border p-4 rounded-lg bg-[#2d2d2d]"
                >
                  <p className="font-semibold gredient-text">
                    {moment(event.start).format("dddd, MMMM D, YYYY")}
                  </p>
                  <p className="text-white">
                    {moment(event.start).format("hh:mm A")} -{" "}
                    {moment(event.end).format("hh:mm A")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">
              No availability slots added yet.
            </p>
          )}
          <button className="mt-6 px-6 py-3 custom-button-two transition-all duration-300">
            Publish to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentDashboard;
