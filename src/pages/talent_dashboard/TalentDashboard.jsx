import { useState } from "react";
import moment from "moment-timezone";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./TalentDashboard.css";
import CreateSession from "../../components/talent/create_session/CreateSession";
const localizer = momentLocalizer(moment);

const TalentDashboard = () => {
  // const [settings, setSettings] = useState({
  //   sessionLength: 30,
  //   price: 50,
  //   bufferTime: 15,
  //   timeZone: moment.tz.guess(),
  //   accessType: "browser",
  //   isActive: false,
  //   sessionDateTime: "",
  // });
  // const handleSessionSubmit = () => {
  //   if (!settings.sessionDateTime) {
  //     alert("Please select a date and time for the session");
  //     return;
  //   }
  // };

  const [events, setEvents] = useState([]);

  // Configurable session length was disabled above (settings state
  // commented out) — this previously referenced an undefined `settings`
  // and crashed on every slot selection. Default matches what that
  // settings object was originally initialized to.
  const DEFAULT_SESSION_LENGTH_MINUTES = 30;

  const handleSelectSlot = ({ start }) => {
    const newEvent = {
      title: "Available Session",
      start,
      end: moment(start).add(DEFAULT_SESSION_LENGTH_MINUTES, "minutes").toDate(),
      allDay: false,
    };
    setEvents([...events, newEvent]);
  };

 

  return (
    <div className="min-h-screen bg-[#171717] text-white mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16">
      <div className="container mx-auto space-y-10">
        {/* Create Session */}
        <CreateSession />

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
