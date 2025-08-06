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

    // friends API's
    removeFriend: builder.mutation({
      query: (id) => ({
        url: `/friends/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends"],
    }),
    getAllFriends: builder.query({
      query: () => "/friends",
      providesTags: ["Friends"],
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
  // User Profile API's
  useUpdateMyProfileMutation,
  useGetUserByIdQuery,
  useDeleteProfileImageMutation,
  // Events
  useGetEventsQuery,
  // Friends API's
  useRemoveFriendMutation,
  useGetAllFriendsQuery,
  // Notifications
  useGetNotificationsQuery,
  // Confirmed talent requests
  useGetConfirmedTalentRequestsQuery,
} = authApi;
