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
    uploadKYCDocuments: builder.mutation({
      query: (formData) => ({
        url: "/user_documents/upload-docs",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["KYC"],
    }),
    adminKycConfirmation: builder.mutation({
      query: (data) => ({
        url: `/user_documents/verify-or-reject/${data.selectedRequestId}`,
        method: "POST",
        body: {
          status: data.status,
        },
      }),
      invalidatesTags: ["OverviewForFan"],
    }),
    getKYCDocuments: builder.query({
      query: (userId) => `/user/get/${userId}`,
      providesTags: ["KYC"],
    }),
    getKYCListings: builder.query({
      query: () => `/user_documents/all-user-documents`,
      providesTags: ["KYC"],
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
    getNetworth: builder.query({
      query: () => ({
        url: "/networth/",
        method: "GET",
      }),
      providesTags: ["Networth"],
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
      // invalidatesTags: (result, error, body) => [
      //   { type: "User", id: JSON.parse(localStorage.getItem("user"))?.id },
      // ],
      invalidatesTags: ["OverviewForFan"],
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
    getFeaturedEvents: builder.query({
      query: () => "/events/featured-upcoming",
    }),
    getEvents: builder.query({
      query: (params) => {
        const qs = new URLSearchParams(
          Object.fromEntries(
            Object.entries(params || {}).filter(
              ([_, v]) => v !== undefined && v !== null && v !== ""
            )
          )
        ).toString();
        return `/events${qs ? `?${qs}` : ""}`;
      },
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
      providesTags: ["ConfirmedTalentRequests", "FanRequestsOne"],
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
      invalidatesTags: ["FanRequests", "ConfirmedTalentRequests"],
    }),
    // Sessions
    deleteSessionByAdmin: builder.mutation({
      query: (sessionId) => ({
        url: `/sessions/${sessionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "AdminDashboard"],
    }),
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
    // Accepting and Decling Request for Fan Profile
    fanRequestConfirmation: builder.mutation({
      query: (data) => ({
        url: `/fan-request/${data.selectedRequestId}/reschedule`,
        method: "PUT",
        body: {
          status: data.status,
        },
      }),
      invalidatesTags: ["OverviewForFan"],
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
          accessType: data.accessType,
        },
      }),
      invalidatesTags: ["FanRequestsOne"],
    }),
    // get talents
    getTalent: builder.query({
      query: () => "/user/get-talent",
      providesTags: ["Talent"],
    }),
    getTalentOverview: builder.query({
      query: (id) => `/user/${id}/overview`,
    }),
    getFanOverview: builder.query({
      query: (id) => `/user/${id}/fan/overview`,
      providesTags: ["OverviewForFan"],
    }),
    //  our team API's
    getTeam: builder.query({
      query: () => ({
        url: "/team/",
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    createTeam: builder.mutation({
      query: (formData) => ({
        url: "/team/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
    // Customer reviews API
    getReviews: builder.query({
      query: () => ({
        url: "/reviews/",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    createReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({ url: `/reviews/${id}`, method: "DELETE" }),
      invalidatesTags: ["Reviews"],
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
    // Sponsorship
    addSponsorship: builder.mutation({
      query: (body) => ({
        url: "/sponsorships",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sponsorships"],
    }),
    getAllSponsorships: builder.query({
      query: () => "/sponsorships/all?page=1&from=2025-01-01&to=2025-10-02",
      providesTags: ["Sponsorships"],
    }),
    // Stripe API
    addIntent: builder.mutation({
      query: (body) => ({
        url: "/billing/payment-intents",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Friends"],
    }),
    confirmPayment: builder.mutation({
      query: (body) => ({
        url: "/billing/confirm",
        method: "POST",
        body,
      }),
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
  useGetNetworthQuery,
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
  useGetFeaturedEventsQuery,
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
  // Sponsorship
  useGetAllSponsorshipsQuery,
  useAddSponsorshipMutation,
  // Stripe API
  useAddIntentMutation,
  useConfirmPaymentMutation,
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
  useFanRequestConfirmationMutation,
  useAdminKycConfirmationMutation,
  // Get all talents
  useGetTalentQuery,
  useGetTalentOverviewQuery,
  useGetFanOverviewQuery,
  // newsletter
  useNewsletterSubscribeMutation,
  useGetNewslettersQuery,
  // Our team
  useGetTeamQuery,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  // Delete session
  useDeleteSessionByAdminMutation,
  // Customer reviews
  useGetReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  // KYC
  useUploadKYCDocumentsMutation,
  useGetKYCDocumentsQuery,
  useGetKYCListingsQuery,
  // contact us
  useContactUsMutation,
  useGetContactsQuery,
} = authApi;
