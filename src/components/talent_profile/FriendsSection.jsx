import { useState } from "react";
import { FaTrash, FaHeart, FaEllipsisH } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetAllFriendsQuery,
  useDeleteFriendsMutation,
} from "../../app/authApi";

const FriendsSection = () => {
  const {
    data: friendsData,
    isLoading: isFriendsLoading,
    isError: isFriendsError,
    error: friendsError,
  } = useGetAllFriendsQuery();
  const [deleteFriends, { isLoading: isDeleting }] = useDeleteFriendsMutation();
  const friends = friendsData?.data || [];
  const [editingFriends, setEditingFriends] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const removeFriend = async (id) => {
    try {
      const res = await deleteFriends({ friendIds: [id] }).unwrap();
      console.log(res);
      toast.success(`${res?.message}`);
      setSelected((prev) => prev.filter((i) => i !== id));
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to remove friend");
    }
  };

  const removeMultipleFriends = async () => {
    try {
      const res = await deleteFriends({ friendIds: selected }).unwrap();
      console.log(res);
      toast.success(`${res?.message}`);
      setSelected([]);
      setEditingFriends(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to remove selected friends");
    }
  };

  //   if (isFriendsError) {
  //     toast.error(friendsError?.data?.message || "Failed to fetch friends.");
  //   }

  return (
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
                key={friend.friendId}
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
                  <p className="text-center">{friend.friendName}</p>
                </div>

                {editingFriends ? (
                  <div className="absolute top-1 left-1">
                    <input
                      type="checkbox"
                      checked={selected.includes(friend.friendId)}
                      onChange={() => toggleSelect(friend.friendId)}
                      className="form-checkbox h-4 w-4 text-yellow-400 bg-[#1f1f1f] border-gray-600"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => removeFriend(friend.friendId)}
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
          {editingFriends && (
            <>
              <button
                onClick={removeMultipleFriends}
                disabled={selected.length === 0}
                className="text-sm text-red-400 hover:text-red-500"
              >
                Remove Selected
              </button>
              {/* <button
                onClick={() => {
                  setEditingFriends(false);
                  setSelected([]);
                }}
                className="text-sm text-yellow-400 hover:text-yellow-500"
              >
                Done
              </button> */}
            </>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base">
          <FaHeart className="inline-block mr-2" /> Support Charity
        </button>
      </div>
    </div>
  );
};

export default FriendsSection;
