import { FiGlobe, FiPhone, FiExternalLink } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const EventsListings = ({
  events,
  isLoading,
  isError,
  error,
  isFetching,
  onRetry,
  selectedDate,
  eventsDate,
}) => {
  const fallbackLogo =
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&auto=format&fit=crop&q=60";

  const formatSelected = (d) =>
    d
      ? d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
      : "";

  const empty = !isLoading && !isError && (!events || events.length === 0);
  const navigate = useNavigate();
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
      {/* Heading + Selected date chip */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold"
          style={{
            background: "linear-gradient(to right, #a38b41, #d4c374)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {eventsDate ? "You Selected:" : "All Events"}
        </h2>

        {eventsDate && (
          <span className="text-xs md:text-sm px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-gray-200">
            Selected date:{" "}
            <span className="font-semibold" style={{ color: "#a38b41" }}>
              {formatSelected(eventsDate)}
            </span>
          </span>
        )}
      </div>

      {/* Empty state */}
      {empty && (
        <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-center text-gray-300">
          {selectedDate ? (
            <>
              No events available for{" "}
              <span className="font-semibold" style={{ color: "#a38b41" }}>
                {formatSelected(selectedDate)}
              </span>
              .
            </>
          ) : (
            "No events available."
          )}
        </div>
      )}

      {/* Mobile Card View */}
      {!empty && (
        <div className="block sm:hidden space-y-4">
          {events.map((e, index) => (
            <div
              key={e.id || index}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-[#a38b41] rounded-lg flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={e.logo || e.cover || e.images?.[0] || fallbackLogo}
                      alt="logo"
                      className="w-10 h-10 rounded-xl object-cover border-2 border-white/10"
                    />
                    <div>
                      <h4
                        onClick={() =>
                          e.id && navigate(`/event-details/${e.id}`)
                        }
                        className="font-semibold text-white text-sm cursor-pointer underline"
                      >
                        {e.name}
                      </h4>
                      <span className="text-xs text-gray-400 capitalize">
                        {e.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IoLocationOutline className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-sm">
                      {e.location}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{e.address}</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-1 text-blue-400 text-sm">
                      <FiPhone className="w-3 h-3" />
                      <a href={`tel:${e.phone}`}>{e.phone}</a>
                    </div>
                    <a
                      href={`https://${e.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-400 text-sm"
                    >
                      <FiGlobe className="w-3 h-3" />
                      <span className="truncate">{e.website}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop Table View */}
      {!empty && (
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
              {events.map((e, index) => (
                <tr
                  key={e.id || index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-3">
                    <span
                      className="w-6 h-6 bg[#a38b41] rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: "#a38b41" }}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={
                            e.logo || e.cover || e.images?.[0] || fallbackLogo
                          }
                          alt="logo"
                          className="w-10 h-10 rounded-xl object-cover border-2 border-white/10 group-hover:border-[#a38b41]/30 transition-colors"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#a38b41]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div>
                        <span
                          onClick={() =>
                            e.id && navigate(`/event-details/${e.id}`)
                          }
                          className="font-semibold text-white text-sm block cursor-pointer underline"
                        >
                          {e.name}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">
                          {e.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <IoLocationOutline className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium text-sm">
                        {e.location}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-300 text-sm">{e.address}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group">
                      <FiPhone className="w-3 h-3" />
                      <a href={`tel:${e.phone}`} className="text-sm">
                        {e.phone}
                      </a>
                    </div>
                  </td>
                  <td className="p-3">
                    <a
                      href={`https://${e.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                      <FiGlobe className="w-3 h-3" />
                      <span className="truncate max-w-28 text-sm">
                        {e.website}
                      </span>
                      <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventsListings;
