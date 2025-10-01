import { FaHeart } from "react-icons/fa";
import { imgSrc } from "../../utils/imgSrc";
import { Link } from "react-router-dom";
const FriendsFanSection = ({ userData }) => {
  const friends = userData?.data?.friends || [];
  return (
    <div className="bg-[#1f1f1f] rounded-xl shadow-lg">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        {" "}
        <h3 className="text-lg font-semibold text-white">
          {userData?.data?.profile?.name}'s Friends ({friends.length})
        </h3>
      </div>
      <>
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {friends.length === 0 ? (
              <div className="col-span-2 text-center text-gray-400 ">
                No friends found.
              </div>
            ) : (
              friends.map((friend) => (
                <div
                  key={friend._id}
                  className="relative group rounded-lg p-2 hover:bg-[#333333] transition"
                >
                  <div className="max-w-full">
                    <Link to={`/talent-profile/${friend?._id}`}>
                      <img
                        src={imgSrc(friend?.images[0]?.fileUrl)}
                        alt={friend?.name}
                        className="rounded-full w-16 h-16 object-cover mx-auto mb-1"
                      />
                    </Link>
                    <Link to={`/talent-profile/${friend?._id}`}>
                      {" "}
                      <p className="text-center">{friend?.name}</p>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7637] text-white font-medium py-2 rounded-lg transition-colors text-sm md:text-base">
            <FaHeart className="inline-block mr-2" /> Support Charity
          </button>
        </div>
      </>
    </div>
  );
};

export default FriendsFanSection;
