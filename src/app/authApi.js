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

    quickQualify: builder.mutation({
      query: (data) => ({
        url: "/auth/quick-qualify",
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
        method: "PUT",
        body: {
          action: data.action,
          rejectionReason: data.rejectionReason,
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
      providesTags: ["Friends"],
    }),
    getFanOverview: builder.query({
      query: (id) => `/user/${id}/fan/overview`,
      providesTags: ["OverviewForFan"],
    }),
    // Get Products API
    // getProducts: builder.query({
    //   query: () => ({
    //     url: "/products",
    //     method: "GET",
    //   }),
    //   providesTags: ["Products"],
    // }),
    // in authApi.js (or wherever your api slice is)
    getProducts: builder.query({
      query: ({ page = 1, limit = 8, search = "" } = {}) => ({
        url: "/products",
        method: "GET",
        params: {
          page,
          limit,
          search: search && search.trim() ? search.trim() : undefined,
        },
      }),
      providesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    // SINGLE PRODUCT
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // CREATE PRODUCT (POST /api/products)
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData, // FormData with title, description, price, image
      }),
      invalidatesTags: ["Products"],
    }),

    // UPDATE PRODUCT (PATCH /api/products/:id)
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: formData, // FormData with title, description, price, image
      }),
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Products", id },
      ],
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
    updateTeam: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/team/${id}`,
        method: "PUT",
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
    // Site Settings (admin-controlled navbar/footer visibility, inverse section)
    getSiteSettings: builder.query({
      query: () => ({ url: "/site-settings", method: "GET" }),
      providesTags: ["SiteSettings"],
    }),
    updateSiteSettings: builder.mutation({
      query: (body) => ({
        url: "/site-settings",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SiteSettings"],
    }),
    // Talent admin extras (featured-in-inverse + image upload)
    updateTalentFeatured: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/talents/${id}/featured`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Talent"],
    }),
    uploadTalentImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/talents/${id}/image`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Talent"],
    }),
    getInverseFeaturedTalents: builder.query({
      query: () => ({ url: "/talents/inverse-featured", method: "GET" }),
      providesTags: ["Talent"],
    }),
    // Admin user-based inverse featuring + image upload (operates on User
    // records flagged role="TALENT" rather than the Talent market collection).
    updateUserFeatured: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/admin/${id}/featured`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Talent"],
    }),
    uploadUserImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/user/admin/${id}/image`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Talent"],
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
      // args: { page, from, to, sort, limit }
      query: ({ page = 1, from, to, sort = "oldest", limit = 10 } = {}) => ({
        url: "/sponsorships/all",
        method: "GET",
        params: { page, from, to, sort, limit },
      }),
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
    // Talent social profiles editor (PATCH only - sparse update)
    updateSocialProfiles: builder.mutation({
      query: (body) => ({
        url: "/user/social-profiles",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    getUsers: builder.query({
      query: () => "/user/getusers",
      providesTags: ["Users"],
    }),
    // ── Social Connections (OAuth follower fetch → social_worth) ──────────
    getSocialConnections: builder.query({
      query: () => "/social-connections",
      providesTags: ["SocialConnections"],
    }),
    startSocialConnect: builder.mutation({
      query: ({ platform, returnTo }) => ({
        url: `/social-connections/${platform}/start`,
        method: "POST",
        body: returnTo ? { returnPath: returnTo } : {},
      }),
    }),
    refreshSocialConnection: builder.mutation({
      query: (platform) => ({
        url: `/social-connections/${platform}/refresh`,
        method: "POST",
      }),
      invalidatesTags: ["SocialConnections"],
    }),
    disconnectSocial: builder.mutation({
      query: (platform) => ({
        url: `/social-connections/${platform}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SocialConnections"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useQuickQualifyMutation,
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
  // Talent social profiles editor
  useUpdateSocialProfilesMutation,
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
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  // Site Settings
  useGetSiteSettingsQuery,
  useUpdateSiteSettingsMutation,
  // Talent admin extras
  useUpdateTalentFeaturedMutation,
  useUploadTalentImageMutation,
  useGetInverseFeaturedTalentsQuery,
  useUpdateUserFeaturedMutation,
  useUploadUserImageMutation,
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
  // Products
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  // Social Connections
  useGetSocialConnectionsQuery,
  useStartSocialConnectMutation,
  useRefreshSocialConnectionMutation,
  useDisconnectSocialMutation,
} = authApi;
