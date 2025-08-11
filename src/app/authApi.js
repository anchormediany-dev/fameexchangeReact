import { api } from "./api";
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    signin: builder.mutation({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyId: builder.mutation({
      query: (data) => ({
        url: "/user_documents/upload-docs",
        method: "POST",
        body: data,
      }),
    }),
    networthCalculate: builder.mutation({
      query: (data) => ({
        url: "/networth/save",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    // Contact Us
    contactUs: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
    // User Profile API's
    updateMyProfile: builder.mutation({
      query: (profileData) => ({
        url: "/user/update-user-profile",
        method: "POST",
        body: profileData,
      }),
      invalidatesTags: (result, error, body) => [
        { type: "User", id: JSON.parse(localStorage.getItem("user"))?.id },
      ],
    }),
    deleteProfileImage: builder.mutation({
      query: (imageId) => ({
        url: `/user/profile/image/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `/user/get/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    // Newsletter
    newsletterSubscribe: builder.mutation({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: data,
      }),
    }),
    // Get events
    getEvents: builder.query({
      query: () => "/events",
      providesTags: ["Events"],
    }),
    // Notifications
    getNotifications: builder.query({
      query: (userId) => `/notifications/${userId}`,
      providesTags: ["Notifications"],
    }),
    // confirmed talent request
    getConfirmedTalentRequests: builder.query({
      query: () => `/talent-confirmation/`,
      providesTags: ["ConfirmedTalentRequests"],
    }),

    fanInverseRequest: builder.mutation({
      query: (data) => ({
        url: "/fan-request/",
        method: "POST",
        body: data,
      }),
    }),
    getAllFanRequests: builder.query({
      query: () => "/fan-request/get-all",
      providesTags: ["FanRequests"],
    }),

    talentConfirmationRequest: builder.mutation({
      query: (data) => ({
        url: "/talent-confirmation/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FanRequests"],
    }),
    // Sessions
    createSession: builder.mutation({
      query: (sessionData) => ({
        url: "/sessions/",
        method: "POST",
        body: sessionData,
      }),
      invalidatesTags: ["Sessions"],
    }),
    getUpcomingSessions: builder.query({
      query: (userId) => {
        return `/sessions/upcoming/${userId}`;
      },
      providesTags: ["Sessions"],
    }),

    // Request confirmation reschedule
    rescheduleTalentConfirmation: builder.mutation({
      query: (data) => ({
        url: `/talent-confirmation/${data.selectedRequestId}/reschedule`,
        method: "PUT",
        body: {
          confirmedDate: data.confirmedDate,
          time: data.time,
          location: data.location,
        },
      }),
    }),
    // friends API's
    deleteFriends: builder.mutation({
      query: (data) => ({
        url: "/friends/",
        method: "DELETE",
        body: data, // expects { friendIds: [...] }
      }),
      invalidatesTags: ["Friends"],
    }),

    getAllFriends: builder.query({
      query: () => "/friends",
      providesTags: ["Friends"],
    }),
    addFriend: builder.mutation({
      query: (body) => ({
        url: "/friends",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Friends"],
    }),

    getUsers: builder.query({
      query: () => "/user/getusers",
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useVerifyOtpMutation,
  useVerifyIdMutation,
  useResendOtpMutation,
  useNetworthCalculateMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  // Sessions
  useCreateSessionMutation,
  useGetUpcomingSessionsQuery,
  // User Profile API's
  useUpdateMyProfileMutation,
  useGetUserByIdQuery,
  useDeleteProfileImageMutation,
  // Events
  useGetEventsQuery,
  // Friends API's
  useDeleteFriendsMutation,
  useGetAllFriendsQuery,
  useAddFriendMutation,
  useGetUsersQuery,
  // Notifications
  useGetNotificationsQuery,
  // Confirmed talent requests
  useGetConfirmedTalentRequestsQuery,
  useFanInverseRequestMutation,
  useTalentConfirmationRequestMutation,
  useGetAllFanRequestsQuery,
  // Talent confirmation
  useRescheduleTalentConfirmationMutation,
  // newsletter
  useNewsletterSubscribeMutation,
  // contact us
  useContactUsMutation,
} = authApi;
