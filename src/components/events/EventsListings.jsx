import { useState } from "react";
import { FiGlobe, FiPhone, FiExternalLink } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const EventsListings = () => {
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

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
      <h2
        className="text-xl font-bold mb-4"
        style={{
          background: "linear-gradient(to right, #a38b41, #d4c374)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Events Directory
      </h2>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {eventsList.map((event, index) => (
          <div
            key={event.id}
            className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-[#a38b41] rounded-lg flex items-center justify-center text-xs font-bold text-white">
                {index + 1}
              </span>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <img
                    src={event.logo}
                    alt="logo"
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white/10"
                  />
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {event.name}
                    </h4>
                    <span className="text-xs text-gray-400 capitalize">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <IoLocationOutline className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">
                    {event.location}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{event.address}</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${event.phone}`}
                    className="flex items-center space-x-1 text-blue-400 text-sm"
                  >
                    <FiPhone className="w-3 h-3" />
                    <span>{event.phone}</span>
                  </a>
                  <a
                    href={`https://${event.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-400 text-sm"
                  >
                    <FiGlobe className="w-3 h-3" />
                    <span className="truncate">{event.website}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
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
            {eventsList.map((event, index) => (
              <tr
                key={event.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors group"
              >
                <td className="p-3">
                  <span className="w-6 h-6 bg-[#a38b41] rounded-lg flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={event.logo}
                        alt="logo"
                        className="w-10 h-10 rounded-xl object-cover border-2 border-white/10 group-hover:border-[#a38b41]/30 transition-colors"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#a38b41]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <span className="font-semibold text-white text-sm block">
                        {event.name}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <IoLocationOutline className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-sm">
                      {event.location}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-gray-300 text-sm">{event.address}</span>
                </td>
                <td className="p-3">
                  <a
                    href={`tel:${event.phone}`}
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    <FiPhone className="w-3 h-3" />
                    <span className="text-sm">{event.phone}</span>
                  </a>
                </td>
                <td className="p-3">
                  <a
                    href={`https://${event.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    <FiGlobe className="w-3 h-3" />
                    <span className="truncate max-w-28 text-sm">
                      {event.website}
                    </span>
                    <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsListings;
