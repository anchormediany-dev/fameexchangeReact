import { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaTrash,
  FaHeart,
  FaCalendarAlt,
  FaRegCalendarAlt,
  FaEllipsisH,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useGetUserByIdQuery, useGetAllFriendsQuery } from "../../app/authApi";
const FriendsEventsSection = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const { data, isLoading, isError, error } = useGetUserByIdQuery(userId);
  const events = data?.events || [];
  const {
    data: friendsData,
    isLoading: isFriendsLoading,
    isError: isFriendsError,
    error: friendsError,
  } = useGetAllFriendsQuery();

  // const [friends, setFriends] = useState([
  //   {
  //     id: 1,
  //     name: "Alex Johnson",
  //     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Sam Wilson",
  //     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Taylor Swift",
  //     avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Jamie Lee",
  //     avatar: "https://randomuser.me/api/portraits/women/63.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "Chris Evans",
  //     avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  //   },
  //   {
  //     id: 6,
  //     name: "Emma Watson",
  //     avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  //   },
  //   {
  //     id: 7,
  //     name: "Tom Holland",
  //     avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  //   },
  //   {
  //     id: 8,
  //     name: "Zendaya",
  //     avatar: "https://randomuser.me/api/portraits/women/25.jpg",
  //   },
  // ]);
  const friends = friendsData?.data || [];
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
  useEffect(() => {
    if (!isFriendsLoading && friendsData?.success && friends.length === 0) {
      toast.error("No friends found.");
    }

    if (isFriendsError) {
      toast.error(friendsError?.data?.message || "Failed to fetch friends.");
    }
  }, [
    isFriendsLoading,
    friendsData,
    friends.length,
    isFriendsError,
    friendsError,
  ]);
  return (
    <div className="bg-[#171717] text-white">
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
                {friends.length === 0 && !isFriendsLoading ? (
                  <div className="col-span-2 text-center text-gray-400">
                    No friends found.
                  </div>
                ) : (
                  friends.slice(0, 8).map((friend) => (
                    <div
                      key={friend._id}
                      className="relative group rounded-lg p-2 hover:bg-[#333333] transition"
                    >
                      <div className="max-w-full">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            friend.friendName
                          )}&background=random`}
                          alt={friend.friendName}
                          className="rounded-full w-16 h-16 object-cover mx-auto mb-1"
                        />
                        <p className=" text-center">{friend.friendName}</p>
                      </div>

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
                  ))
                )}
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
                      {/* <span
                        className={`px-2 py-0.5 rounded-full text-xs mr-2 ${
                          event.type === "upcoming"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-green-900 text-green-300"
                        }`}
                      >
                        {event.type === "upcoming" ? "Upcoming" : "Latest"}
                      </span> */}
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
                      <button className="text-yellow-400 text-xs  cursor-pointer hover:underline">
                        View details →
                      </button>
                    </div>
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
