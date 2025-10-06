import { FaBell } from "react-icons/fa";
import { getTimeAgo } from "../../utils/getTimeAgo";
// import { useGetNotificationsQuery } from "../../app/authApi";

const Notifications = ({ userData, error, isError, isLoading }) => {
  // const userLocalData = JSON.parse(localStorage.getItem("user")); // replace "user" with your actual key
  // const userId = userLocalData?.id;
  // const {
  //   data: notificationData,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetNotificationsQuery(userId, {
  //   skip: !userId,
  // });

  const notifications = userData?.data?.notifications || [];

  if (isLoading)
    return <div className="text-gray-400">Loading notifications...</div>;
  if (isError)
    return (
      <div className="text-red-400">
        Error loading notifications: {error?.message}
      </div>
    );

  return (
    <div className="bg-[#1f1f1f] rounded-xl p-6">
      <div className="flex items-center mb-6">
        <FaBell className="text-yellow-400 text-2xl mr-2" />
        <h2 className="text-lg font-semibold text-white uppercase">
          Notification
        </h2>
      </div>

      <ul className="space-y-4">
        {notifications.length > 0 ? (
          notifications.slice(0, 5).map((notification, index) => (
            <li
              key={index}
              className="bg-[#2a2a2a] p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <FaBell className="text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {notification.description}
                  </span>
                </div>

                <div>
                  <div className="flex-shrink-0">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {getTimeAgo(notification.datetime)}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(notification.datetime).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No notifications yet</p>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
