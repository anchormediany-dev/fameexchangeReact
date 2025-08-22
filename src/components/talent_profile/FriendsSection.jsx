// import { useState, useEffect } from "react";
// import {
//   FaTrash,
//   FaHeart,
//   FaEllipsisH,
//   FaSearch,
//   FaTimes,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import {
//   useGetAllFriendsQuery,
//   useDeleteFriendsMutation,
//   useAddFriendMutation,
//   useGetUsersQuery,
// } from "../../app/authApi";

// const FriendsSection = () => {
//   const {
//     data: friendsData,
//     isLoading: isFriendsLoading,
//     isError: isFriendsError,
//     error: friendsError,
//   } = useGetAllFriendsQuery();

//   const {
//     data: usersData,
//     isLoading: isUsersLoading,
//     refetch: refetchUsers,
//   } = useGetUsersQuery();

//   const [deleteFriends, { isLoading: isDeleting }] = useDeleteFriendsMutation();
//   const [addFriend, { isLoading: isAdding }] = useAddFriendMutation();

//   const friends = friendsData?.data || [];
//   const users = usersData?.users || [];

//   const [editingFriends, setEditingFriends] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const [showAddFriendPopup, setShowAddFriendPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");

//   const toggleSelect = (id) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const removeFriend = async (id) => {
//     try {
//       const res = await deleteFriends({ friendIds: [id] }).unwrap();
//       toast.success(`${res?.message}`);
//       setSelected((prev) => prev.filter((i) => i !== id));
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || "Failed to remove friend");
//     }
//   };

//   const removeMultipleFriends = async () => {
//     try {
//       const res = await deleteFriends({ friendIds: selected }).unwrap();
//       toast.success(`${res?.message}`);
//       setSelected([]);
//       setEditingFriends(false);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || "Failed to remove selected friends");
//     }
//   };

//   const handleAddFriend = async () => {
//     if (!selectedUser || !selectedUser._id) {
//       toast.error("Please select a user to add");
//       return;
//     }

//     const body = {
//       friendId: selectedUser._id,
//       friendName: selectedUser.name,
//       notes: "Added via UI", // customize if needed
//       status: "pending",
//     };

//     try {
//       const res = await addFriend(body).unwrap();
//       toast.success(res?.message);
//       setShowAddFriendPopup(false);
//       setSelectedUser(null);
//       setSearchTerm("");
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || "Failed to add friend");
//     }
//   };

//   // Filter out already added friends and apply search filter
//   const filteredUsers = users.filter((user) => {
//     const isAlreadyFriend = friends.some(
//       (friend) => friend.friendId === user._id
//     );
//     const matchesSearch =
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     return !isAlreadyFriend && matchesSearch;
//   });

//   useEffect(() => {
//     if (showAddFriendPopup) {
//       refetchUsers();
//     }
//   }, [showAddFriendPopup, refetchUsers]);

//   return (
//     <div className="bg-[#1f1f1f] rounded-xl shadow-lg">
//       <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-white">
//           My Friends ({friends.length})
//         </h3>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setShowAddFriendPopup(true)}
//             className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm"
//           >
//             Add Friend
//           </button>
//           <button
//             onClick={() => {
//               setEditingFriends(!editingFriends);
//               setSelected([]);
//             }}
//             className="text-gray-400 hover:text-yellow-400"
//           >
//             <FaEllipsisH />
//           </button>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
//           {friends.length === 0 && !isFriendsLoading ? (
//             <div className="col-span-2 text-center text-gray-400">
//               No friends found.
//             </div>
//           ) : (
//             friends.slice(0, 8).map((friend) => (
//               <div
//                 key={friend.friendId}
//                 className="relative group rounded-lg p-2 hover:bg-[#333333] transition"
//               >
//                 <div className="max-w-full">
//                   <img
//                     src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       friend.friendName
//                     )}&background=random`}
//                     alt={friend.friendName}
//                     className="rounded-full w-16 h-16 object-cover mx-auto mb-1"
//                   />
//                   <p className="text-center">{friend.friendName}</p>
//                 </div>

//                 {editingFriends ? (
//                   <div className="absolute top-1 left-1">
//                     <input
//                       type="checkbox"
//                       checked={selected.includes(friend.friendId)}
//                       onChange={() => toggleSelect(friend.friendId)}
//                       className="form-checkbox h-4 w-4 text-yellow-400 bg-[#1f1f1f] border-gray-600"
//                     />
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => removeFriend(friend.friendId)}
//                     className="absolute top-1 right-1 text-red-400 opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <FaTrash size={12} />
//                   </button>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           {editingFriends && (
//             <>
//               <button
//                 onClick={removeMultipleFriends}
//                 disabled={selected.length === 0}
//                 className="text-sm text-red-400 hover:text-red-500"
//               >
//                 Remove Selected
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="p-4 border-t border-gray-700">
//         <button className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base">
//           <FaHeart className="inline-block mr-2" /> Support Charity
//         </button>
//       </div>

//       {/* Add Friend Popup */}
//       {showAddFriendPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#2d2d2d] rounded-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-white">Add Friend</h3>
//               <button
//                 onClick={() => {
//                   setShowAddFriendPopup(false);
//                   setSelectedUser("");
//                   setSearchTerm("");
//                 }}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <div className="mb-4 relative">
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-[#3d3d3d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-300 mb-2">Select User</label>
//               <select
//                 value={selectedUser ? JSON.stringify(selectedUser) : ""}
//                 onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}
//                 className="w-full p-2 bg-[#3d3d3d] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               >
//                 <option value="">Select a user</option>
//                 {isUsersLoading ? (
//                   <option disabled>Loading users...</option>
//                 ) : filteredUsers.length === 0 ? (
//                   <option disabled>No users found</option>
//                 ) : (
//                   filteredUsers.map((user) => (
//                     <option key={user._id} value={JSON.stringify(user)}>
//                       {user.name} ({user.email})
//                     </option>
//                   ))
//                 )}
//               </select>
//             </div>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => {
//                   setShowAddFriendPopup(false);
//                   setSelectedUser("");
//                   setSearchTerm("");
//                 }}
//                 className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddFriend}
//                 disabled={isAdding || !selectedUser}
//                 className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg disabled:opacity-50"
//               >
//                 {isAdding ? "Adding..." : "Add Friend"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FriendsSection;
// import { useState, useEffect } from "react";
// import {
//   FaTrash,
//   FaHeart,
//   FaEllipsisH,
//   FaSearch,
//   FaTimes,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import {
//   useGetAllFriendsQuery,
//   useDeleteFriendsMutation,
//   useAddFriendMutation,
//   useGetUsersQuery,
// } from "../../app/authApi";

// const FriendsSection = () => {
//   const {
//     data: friendsData,
//     isLoading: isFriendsLoading,
//     isError: isFriendsError,
//     error: friendsError,
//   } = useGetAllFriendsQuery();

//   const {
//     data: usersData,
//     isLoading: isUsersLoading,
//     refetch: refetchUsers,
//   } = useGetUsersQuery();

//   const [deleteFriends, { isLoading: isDeleting }] = useDeleteFriendsMutation();
//   const [addFriend, { isLoading: isAdding }] = useAddFriendMutation();

//   const friends = friendsData?.data || [];
//   const users = usersData?.users || [];

//   const [editingFriends, setEditingFriends] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const [showAddFriendPopup, setShowAddFriendPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const [notes, setNotes] = useState("");

//   const toggleSelect = (id) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const removeFriend = async (id) => {
//     try {
//       const res = await deleteFriends({ friendIds: [id] }).unwrap();
//       toast.success(`${res?.message}`);
//       setSelected((prev) => prev.filter((i) => i !== id));
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || "Failed to remove friend");
//     }
//   };

//   const removeMultipleFriends = async () => {
//     try {
//       const res = await deleteFriends({ friendIds: selected }).unwrap();
//       toast.success(`${res?.message}`);
//       setSelected([]);
//       setEditingFriends(false);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || "Failed to remove selected friends");
//     }
//   };

//   const handleAddFriend = async () => {
//     if (!selectedUser || !selectedUser._id) {
//       toast.error("Please select a user to add");
//       return;
//     }

//     const body = {
//       friendId: selectedUser._id,
//       friendName: selectedUser.name,
//       notes: notes || "Added via UI",
//       status: "accepted",
//     };

//     try {
//       const res = await addFriend(body).unwrap();
//       toast.success(res?.message);
//       setShowAddFriendPopup(false);
//       setSelectedUser(null);
//       setSearchTerm("");
//       setNotes("");
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.data?.message || "Failed to add friend");
//     }
//   };

//   // Filter out already added friends and apply search filter
//   const filteredUsers = users.filter((user) => {
//     const isAlreadyFriend = friends.some(
//       (friend) => friend.friendId === user._id
//     );
//     const matchesSearch =
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     return !isAlreadyFriend && matchesSearch;
//   });

//   useEffect(() => {
//     if (showAddFriendPopup) {
//       refetchUsers();
//     }
//   }, [showAddFriendPopup, refetchUsers]);

//   return (
//     <div className="bg-[#1f1f1f] rounded-xl shadow-lg">
//       <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-white">
//           My Friends ({friends.length})
//         </h3>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setShowAddFriendPopup(true)}
//             className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm"
//           >
//             Add Friend
//           </button>
//           <button
//             onClick={() => {
//               setEditingFriends(!editingFriends);
//               setSelected([]);
//             }}
//             className="text-gray-400 hover:text-yellow-400"
//           >
//             <FaEllipsisH />
//           </button>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
//           {friends.length === 0 && !isFriendsLoading ? (
//             <div className="col-span-2 text-center text-gray-400">
//               No friends found.
//             </div>
//           ) : (
//             friends.slice(0, 8).map((friend) => (
//               <div
//                 key={friend.friendId}
//                 className="relative group rounded-lg p-2 hover:bg-[#333333] transition"
//               >
//                 <div className="max-w-full">
//                   <img
//                     src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       friend.friendName
//                     )}&background=random`}
//                     alt={friend.friendName}
//                     className="rounded-full w-16 h-16 object-cover mx-auto mb-1"
//                   />
//                   <p className="text-center">{friend.friendName}</p>
//                 </div>

//                 {editingFriends ? (
//                   <div className="absolute top-1 left-1">
//                     <input
//                       type="checkbox"
//                       checked={selected.includes(friend.friendId)}
//                       onChange={() => toggleSelect(friend.friendId)}
//                       className="form-checkbox h-4 w-4 text-yellow-400 bg-[#1f1f1f] border-gray-600"
//                     />
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => removeFriend(friend.friendId)}
//                     className="absolute top-1 right-1 text-red-400 opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <FaTrash size={12} />
//                   </button>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           {editingFriends && (
//             <>
//               <button
//                 onClick={removeMultipleFriends}
//                 disabled={selected.length === 0}
//                 className="text-sm text-red-400 hover:text-red-500"
//               >
//                 Remove Selected
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="p-4 border-t border-gray-700">
//         <button className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base">
//           <FaHeart className="inline-block mr-2" /> Support Charity
//         </button>
//       </div>

//       {/* Add Friend Popup */}
//       {showAddFriendPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#2d2d2d] rounded-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-white">Add Friend</h3>
//               <button
//                 onClick={() => {
//                   setShowAddFriendPopup(false);
//                   setSelectedUser("");
//                   setSearchTerm("");
//                   setNotes("");
//                 }}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-300 mb-2">Select User</label>
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-[#3d3d3d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
//                 />
//               </div>
//               <select
//                 value={selectedUser ? JSON.stringify(selectedUser) : ""}
//                 onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}
//                 className="w-full p-2 bg-[#3d3d3d] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               >
//                 <option value="">Select a user</option>
//                 {isUsersLoading ? (
//                   <option disabled>Loading users...</option>
//                 ) : filteredUsers.length === 0 ? (
//                   <option disabled>No users found</option>
//                 ) : (
//                   filteredUsers.map((user) => (
//                     <option key={user._id} value={JSON.stringify(user)}>
//                       {user.name} ({user.email})
//                     </option>
//                   ))
//                 )}
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-300 mb-2">Notes</label>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="Add any notes about this friend..."
//                 className="w-full p-2 bg-[#3d3d3d] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[80px]"
//               />
//             </div>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => {
//                   setShowAddFriendPopup(false);
//                   setSelectedUser("");
//                   setSearchTerm("");
//                   setNotes("");
//                 }}
//                 className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddFriend}
//                 disabled={isAdding || !selectedUser}
//                 className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg disabled:opacity-50"
//               >
//                 {isAdding ? "Adding..." : "Add Friend"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FriendsSection;
import { useState, useEffect } from "react";
import {
  FaTrash,
  FaHeart,
  FaEllipsisH,
  FaSearch,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetAllFriendsQuery,
  useDeleteFriendsMutation,
  useAddFriendMutation,
  useGetUsersQuery,
  useGetTalentQuery,
} from "../../app/authApi";

const FriendsSection = () => {
  const {
    data: friendsData,
    isLoading: isFriendsLoading,
    isError: isFriendsError,
    error: friendsError,
  } = useGetAllFriendsQuery();

  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useGetTalentQuery();

  const [deleteFriends, { isLoading: isDeleting }] = useDeleteFriendsMutation();
  const [addFriend, { isLoading: isAdding }] = useAddFriendMutation();

  const friends = friendsData?.data || [];
  const users = usersData?.taleUsers || [];

  const [editingFriends, setEditingFriends] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showAddFriendPopup, setShowAddFriendPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [notes, setNotes] = useState("");

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const removeFriend = async (id) => {
    try {
      const res = await deleteFriends({ friendIds: [id] }).unwrap();
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
      toast.success(`${res?.message}`);
      setSelected([]);
      setEditingFriends(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to remove selected friends");
    }
  };

  const handleAddFriend = async () => {
    if (!selectedUser || !selectedUser._id) {
      toast.error("Please select a user to add");
      return;
    }

    const body = {
      friendId: selectedUser._id,
      friendName: selectedUser.name,
      notes: notes || "Added via UI",
      status: "accepted",
    };

    try {
      const res = await addFriend(body).unwrap();
      toast.success(res?.message);
      setShowAddFriendPopup(false);
      setSelectedUser(null);
      setSearchTerm("");
      setNotes("");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to add friend");
    }
  };

  // Filter out already added friends and apply search filter
  const filteredUsers = users.filter((user) => {
    const isAlreadyFriend = friends.some(
      (friend) => friend.friendId === user._id
    );
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return !isAlreadyFriend && matchesSearch;
  });

  useEffect(() => {
    if (showAddFriendPopup) {
      refetchUsers();
    }
  }, [showAddFriendPopup, refetchUsers]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="bg-[#1f1f1f] rounded-xl shadow-lg">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          {showAddFriendPopup
            ? "Add New Friend"
            : `${currentUser?.name}'s Friends (${friends.length})`}
        </h3>
        <div className="flex items-center gap-2">
          {!showAddFriendPopup && (
            <>
              <button
                onClick={() => setShowAddFriendPopup(true)}
                className="px-3 py-1 bg-[#a38b41] hover:bg-[#8a7637] text-white rounded text-sm"
              >
                Add Friend
              </button>
              <button
                onClick={() => {
                  setEditingFriends(!editingFriends);
                  setSelected([]);
                }}
                className="text-gray-400 hover:text-yellow-400"
              >
                <FaEllipsisH />
              </button>
            </>
          )}
        </div>
      </div>

      {showAddFriendPopup ? (
        <div className="p-4">
          <div className="mb-4">
            {/* <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#3d3d3d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
              />
            </div> */}
            <select
              value={selectedUser ? JSON.stringify(selectedUser) : ""}
              onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}
              className="w-full p-2 bg-[#3d3d3d] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select a user</option>
              {isUsersLoading ? (
                <option disabled>Loading users...</option>
              ) : filteredUsers.length === 0 ? (
                <option disabled>No users found</option>
              ) : (
                filteredUsers.map((user) => (
                  <option key={user._id} value={JSON.stringify(user)}>
                    {user.name} ({user.email})
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this friend..."
              className="w-full p-2 bg-[#3d3d3d] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[80px]"
            />
          </div>

          <div className="flex justify-between gap-2">
            <button
              onClick={() => {
                setShowAddFriendPopup(false);
                setSelectedUser("");
                setSearchTerm("");
                setNotes("");
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowAddFriendPopup(false);
                  setSelectedUser("");
                  setSearchTerm("");
                  setNotes("");
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFriend}
                disabled={isAdding || !selectedUser}
                className="px-4 py-2 bg-[#a38b41] hover:bg-[#8a7637] text-white rounded-lg disabled:opacity-50"
              >
                {isAdding ? "Adding..." : "Add Friend"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {friends.length === 0 && !isFriendsLoading ? (
                <div className="col-span-2 text-center text-gray-400 ">
                  No friends found.
                </div>
              ) : (
                friends.map((friend) => (
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
                </>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-700">
            <button className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base">
              <FaHeart className="inline-block mr-2" /> Support Charity
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FriendsSection;
