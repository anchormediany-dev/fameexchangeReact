import { useState } from "react";
import {
  FaUserFriends,
  FaTrash,
  FaHeart,
  FaCalendarAlt,
  FaRegCalendarAlt,
  FaEllipsisH,
} from "react-icons/fa";

const FriendsEventsSection = () => {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Sam Wilson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Taylor Swift",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 4,
      name: "Jamie Lee",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      id: 5,
      name: "Chris Evans",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 6,
      name: "Emma Watson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      id: 7,
      name: "Tom Holland",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 8,
      name: "Zendaya",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    },
  ]);

  const [events] = useState([
    {
      id: 1,
      title: "Charity Fashion Show",
      date: "2023-12-15",
      type: "upcoming",
      description:
        "Annual charity event supporting children education. Featuring designs from local artists.",
    },
    {
      id: 2,
      title: "Music Festival Performance",
      date: "2023-11-20",
      type: "latest",
      description:
        "Headlining the main stage at the International Music Festival with special guests.",
    },
    {
      id: 3,
      title: "Art Exhibition Opening",
      date: "2024-01-10",
      type: "upcoming",
      description:
        "Curating and presenting contemporary art pieces from emerging artists.",
    },
    {
      id: 4,
      title: "Charity Fashion Show",
      date: "2023-12-15",
      type: "upcoming",
      description:
        "Annual charity event supporting children education. Featuring designs from local artists.",
    },
  ]);

  const [editingFriends, setEditingFriends] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const removeFriend = (id) => {
    setFriends(friends.filter((f) => f.id !== id));
    setSelected((prev) => prev.filter((i) => i !== id));
  };

  const removeMultipleFriends = () => {
    setFriends(friends.filter((f) => !selected.includes(f.id)));
    setSelected([]);
    setEditingFriends(false);
  };

  return (
    <div className="bg-[#171717] py-12 2xl:py-16 text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Friends Section */}
          <div className="bg-[#1f1f1f] rounded-xl shadow-lg">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">
                My Friends ({friends.length})
              </h3>
              <button
                onClick={() => {
                  setEditingFriends(!editingFriends);
                  setSelected([]);
                }}
                className="text-gray-400 hover:text-yellow-400"
              >
                <FaEllipsisH />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {friends.slice(0, 8).map((friend) => (
                  <div
                    key={friend.id}
                    className="relative group bg-[#2a2a2a] rounded-lg p-2 hover:bg-[#333333] transition"
                  >
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover mx-auto mb-1"
                    />
                    <p className="text-xs text-center truncate">
                      {friend.name}
                    </p>

                    {editingFriends ? (
                      <div className="absolute top-1 left-1">
                        <input
                          type="checkbox"
                          checked={selected.includes(friend.id)}
                          onChange={() => toggleSelect(friend.id)}
                          className="form-checkbox h-4 w-4 text-yellow-400 bg-[#1f1f1f] border-gray-600"
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => removeFriend(friend.id)}
                        className="absolute top-1 right-1 text-red-400 opacity-0 group-hover:opacity-100 transition"
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                {editingFriends ? (
                  <>
                    <button
                      onClick={removeMultipleFriends}
                      disabled={selected.length === 0}
                      className="text-sm text-red-400 hover:text-red-500"
                    >
                      Remove Selected
                    </button>
                    <button
                      onClick={() => {
                        setEditingFriends(false);
                        setSelected([]);
                      }}
                      className="text-sm text-yellow-400 hover:text-yellow-500"
                    >
                      Done
                    </button>
                  </>
                ) : (
                  //
                  <></>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-700">
              <button className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base">
                <FaHeart className="inline-block mr-2" /> Support Charity
              </button>
            </div>
          </div>

          {/* Events Section */}
          <div className="lg:col-span-2 bg-[#1f1f1f] rounded-xl shadow-lg">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold flex items-center text-white">
                <FaCalendarAlt className="mr-2 text-yellow-400" /> Events
              </h3>
            </div>

            <div className="divide-y divide-gray-800">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 hover:bg-[#2c2c2c] transition"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm text-gray-400 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs mr-2 ${
                          event.type === "upcoming"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-green-900 text-green-300"
                        }`}
                      >
                        {event.type === "upcoming" ? "Upcoming" : "Latest"}
                      </span>
                      <span className="flex items-center">
                        {event.type === "upcoming" ? (
                          <FaRegCalendarAlt className="mr-1" />
                        ) : (
                          <FaCalendarAlt className="mr-1" />
                        )}
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold text-base">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {event.description}
                    </p>
                    <button className="text-yellow-400 text-xs self-end cursor-pointer hover:underline">
                      View details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsEventsSection;
