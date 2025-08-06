import React, { useState } from "react";
import moment from "moment-timezone";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
const timeZones = moment.tz.names();
const localizer = momentLocalizer(moment);
const CreateSession = () => {
  const [settings, setSettings] = useState({
    sessionLength: 30,
    price: 50,
    bufferTime: 15,
    timeZone: moment.tz.guess(),
    accessType: "browser",
    isActive: false,
    sessionDateTime: "",
  });
  const handleSessionSubmit = () => {
    if (!settings.sessionDateTime) {
      alert("Please select a date and time for the session");
      return;
    }
  };

  return (
    <section className="flex container flex-col gap-4">
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
      </div>
      <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 shadow space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Create Session
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
          {/* Date and Time */}
          <div>
            <label className="block text-sm text-white mb-2">
              Session Date & Time
            </label>
            <input
              type="datetime-local"
              value={settings.sessionDateTime}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  sessionDateTime: e.target.value,
                })
              }
              className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
            />
          </div>
          {/* Buffer Time */}
          <div>
            <label className="block text-sm text-white mb-2">Buffer Time</label>
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
            <label className="block text-sm text-white mb-2">Access Type</label>
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
        {/* Session Button */}
        <div className="pt-4">
          <button
            onClick={handleSessionSubmit}
            className="custom-button-two w-full"
          >
            Create Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateSession;
