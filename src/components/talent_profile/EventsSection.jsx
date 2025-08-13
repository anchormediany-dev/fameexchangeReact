import { FaCalendarAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useGetUserByIdQuery } from "../../app/authApi";

const EventsSection = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const { data, isLoading, isError, error } = useGetUserByIdQuery(userId);
  const events = data?.events || [];

  return (
    <div className="lg:col-span-2 bg-[#1f1f1f] rounded-xl shadow-lg">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold flex items-center text-white">
          <FaCalendarAlt className="mr-2 text-yellow-400" /> Events
        </h3>
      </div>

      <div
        className="divide-y divide-gray-800
          max-h-72 overflow-y-auto pr-1"
      >
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="p-4 hover:bg-[#2c2c2c] transition">
              <div className="flex flex-col gap-1">
                <div className="flex items-center text-sm text-gray-400 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-xs mr-2 bg-green-900 text-green-300">
                    {event?.event_type}
                  </span>
                  <span className="flex items-center">
                    {event.type === "upcoming" ? (
                      <FaRegCalendarAlt className="mr-1" />
                    ) : (
                      <FaCalendarAlt className="mr-1" />
                    )}
                    {new Date(event.datetime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h4 className="text-white font-semibold text-base">
                  {event?.title}
                </h4>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {event?.details}
                  </p>
                  <button className="text-yellow-400 text-xs cursor-pointer hover:underline">
                    View details →
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-400">No events found</div>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
