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
    getContacts: builder.query({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
      providesTags: ["Contacts"],
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
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    getAdminDashboard: builder.query({
      query: () => "/user/admin-dashboard",
      providesTags: ["AdminDashboard"],
    }),
    // Newsletter
    newsletterSubscribe: builder.mutation({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Newsletter"],
    }),
    getNewsletters: builder.query({
      query: () => ({
        url: "/newsletter/",
        method: "GET",
      }),
      providesTags: ["Newsletter"],
    }),
    // Get FAQ
    getAllFaqs: builder.query({
      query: () => "/faqs",
      providesTags: ["Faqs"],
    }),
    getFaqById: builder.query({
      query: (id) => `/faqs/${id}`,
      providesTags: (result, error, id) => [{ type: "Faqs", id }],
    }),
    createFaq: builder.mutation({
      query: (body) => ({
        url: "/faqs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faqs"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/faqs/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Faqs",
        { type: "Faqs", id },
      ],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faqs"],
    }),
    // Get events
    getEvents: builder.query({
      query: () => "/events",
      providesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
    }),
    getAdminEvents: builder.query({
      query: () => "/events",
    }),
    createEvent: builder.mutation({
      query: (formData) => ({
        url: "/events",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Events"],
    }),
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: "Events", id }],
    }),
    setEventPreference: builder.mutation({
      query: ({ eventId, preference }) => ({
        url: `events/${eventId}/preference`,
        method: "POST",
        body: preference,
      }),
      invalidatesTags: ["Events"],
    }),
    // events search
    searchEvents: builder.query({
      query: ({
        q,
        featured,
        status,
        month,
        year,
        withinMonth,
        page,
        limit,
      } = {}) => ({
        url: "/events/search",
        params: {
          ...(q ? { q } : {}),
          ...(featured !== undefined ? { featured } : {}),
          ...(status ? { status } : {}),
          ...(month ? { month } : {}),
          ...(year ? { year } : {}),
          ...(withinMonth !== undefined ? { withinMonth } : {}),
          ...(page ? { page } : {}),
          ...(limit ? { limit } : {}),
        },
      }),
      providesTags: [{ type: "Events", id: "SEARCH" }],
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
    getAllFanRequestsForAdmin: builder.query({
      query: () => "/fan-request",
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
    // get talents
    getTalent: builder.query({
      query: () => "/user/get-talent",
      providesTags: ["Talent"],
    }),
    getTalentOverview: builder.query({
      query: (id) => `/user/${id}/overview`,
    }),
    //  our team API's
    getTeam: builder.query({
      query: () => ({
        url: "/team/",
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    // Customer reviews API
    getReviews: builder.query({
      query: () => ({
        url: "/reviews/",
        method: "GET",
      }),
      providesTags: ["Reviews"],
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
      providesTags: ["Users"],
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
  // FAqs
  useGetAllFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  // Events
  useGetEventsQuery,
  useDeleteEventMutation,
  useGetAdminEventsQuery,
  useCreateEventMutation,
  useGetEventByIdQuery,
  useSearchEventsQuery,
  useLazySearchEventsQuery,
  useSetEventPreferenceMutation,
  // Friends API's
  useDeleteFriendsMutation,
  useGetAllFriendsQuery,
  useAddFriendMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetAdminDashboardQuery,

  // Notifications
  useGetNotificationsQuery,
  // Confirmed talent requests
  useGetConfirmedTalentRequestsQuery,
  useFanInverseRequestMutation,
  useTalentConfirmationRequestMutation,
  useGetAllFanRequestsQuery,
  useGetAllFanRequestsForAdminQuery,
  // Talent confirmation
  useRescheduleTalentConfirmationMutation,
  // Get all talents
  useGetTalentQuery,
  useGetTalentOverviewQuery,
  // newsletter
  useNewsletterSubscribeMutation,
  useGetNewslettersQuery,
  // Our team
  useGetTeamQuery,
  // Customer reviews
  useGetReviewsQuery,
  // contact us
  useContactUsMutation,
  useGetContactsQuery,
} = authApi;
