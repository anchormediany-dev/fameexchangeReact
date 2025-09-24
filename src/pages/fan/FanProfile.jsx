import {
  useUpdateMyProfileMutation,
  useGetFanOverviewQuery,
} from "../../app/authApi";
import FanNotifications from "./FanNotifications";
import FanPendingRequestsList from "./FanPendingRequestsList";
import ImageCarouselFanProfile from "./ImageCarouselFanProfile";
import InterestedEventsForFan from "./InterestedEvents";
const FanProfile = () => {
  const userLocalData = JSON.parse(localStorage.getItem("user"));
  const userId = userLocalData?.id;
  const { data, isLoading, isError } = useGetFanOverviewQuery(userId, {
    skip: !userId,
  });
  const [updateMyProfile, { isLoading: isUpdating, error: isUpdatingError }] =
    useUpdateMyProfileMutation();
  // const { data: userData, isLoading, isError } = useGetUserByIdQuery(userId);
  return (
    <section className="w-full bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="container mt-10 lg:mt-16 2xl:mt-20">
        <div className="flex flex-col gap-10">
          <ImageCarouselFanProfile
            userData={data?.data?.profile}
            updateMyProfile={updateMyProfile}
          />
          <FanNotifications />
          <FanPendingRequestsList userData={data?.data?.rescheduledRequests} />
          <InterestedEventsForFan />
        </div>
      </div>
    </section>
  );
};

export default FanProfile;
