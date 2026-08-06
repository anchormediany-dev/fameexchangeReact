import { api } from "./api";

// Fame Futures creator-development endpoints (/api/futures-hub/*) — the
// migration target for what was built on Base44. Separate from tradingApi.js's
// existing FuturesTalents/FuturesPledges (the pre-IPO pledge-campaign flow,
// a different concept sitting under the same nav tab). See
// ~/.claude/plans/soft-wiggling-tiger.md for the full phased plan.
export const futuresHubApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ── Talent profile ──────────────────────────────────────
    getMyFuturesTalentProfile: builder.query({
      query: () => "/futures-hub/talent-profile/me",
      providesTags: ["FuturesHubTalentProfile"],
    }),

    getFuturesTalentProfile: builder.query({
      query: (userId) => `/futures-hub/talent-profile/${userId}`,
      providesTags: (result, error, userId) => [{ type: "FuturesHubTalentProfile", id: userId }],
    }),

    createMyFuturesTalentProfile: builder.mutation({
      query: (body) => ({ url: "/futures-hub/talent-profile", method: "POST", body }),
      invalidatesTags: ["FuturesHubTalentProfile"],
    }),

    updateMyFuturesTalentProfile: builder.mutation({
      query: (body) => ({ url: "/futures-hub/talent-profile/me", method: "PUT", body }),
      invalidatesTags: ["FuturesHubTalentProfile"],
    }),

    // ── Fan profile ─────────────────────────────────────────
    getMyFuturesFanProfile: builder.query({
      query: () => "/futures-hub/fan-profile/me",
      providesTags: ["FuturesHubFanProfile"],
    }),

    createMyFuturesFanProfile: builder.mutation({
      query: (body) => ({ url: "/futures-hub/fan-profile", method: "POST", body }),
      invalidatesTags: ["FuturesHubFanProfile"],
    }),

    updateMyFuturesFanProfile: builder.mutation({
      query: (body) => ({ url: "/futures-hub/fan-profile/me", method: "PUT", body }),
      invalidatesTags: ["FuturesHubFanProfile"],
    }),

    // ── Fan tiers (a talent's own custom membership tiers) ──────────
    getFanTiers: builder.query({
      query: (talentId) => `/futures-hub/fan-tiers?talentId=${talentId}`,
      providesTags: (result, error, talentId) => [{ type: "FuturesFanTiers", id: talentId }],
    }),

    getMyFanTiers: builder.query({
      query: () => "/futures-hub/fan-tiers",
      providesTags: ["FuturesFanTiers"],
    }),

    createFanTier: builder.mutation({
      query: (body) => ({ url: "/futures-hub/fan-tiers", method: "POST", body }),
      invalidatesTags: ["FuturesFanTiers"],
    }),

    updateFanTier: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/futures-hub/fan-tiers/${id}`, method: "PUT", body }),
      invalidatesTags: ["FuturesFanTiers"],
    }),

    deleteFanTier: builder.mutation({
      query: (id) => ({ url: `/futures-hub/fan-tiers/${id}`, method: "DELETE" }),
      invalidatesTags: ["FuturesFanTiers"],
    }),

    // ── Platform membership (Stripe Subscriptions, Phase 3) ──────────
    getMyMembership: builder.query({
      query: () => "/futures-hub/billing/membership/me",
      providesTags: ["FuturesMembership"],
    }),

    startMembershipCheckout: builder.mutation({
      query: (body) => ({ url: "/futures-hub/billing/membership/start", method: "POST", body }),
      invalidatesTags: ["FuturesMembership"],
    }),

    cancelMembership: builder.mutation({
      query: () => ({ url: "/futures-hub/billing/membership/cancel", method: "POST" }),
      invalidatesTags: ["FuturesMembership"],
    }),

    // ── Fan subscriptions to a talent's custom tier ──────────────────
    getMyFanSubscriptions: builder.query({
      query: () => "/futures-hub/billing/fan-subscription/me",
      providesTags: ["FuturesFanSubscription"],
    }),

    getMySubscribers: builder.query({
      query: () => "/futures-hub/billing/fan-subscription/my-subscribers",
      providesTags: ["FuturesFanSubscription"],
    }),

    startFanSubscriptionCheckout: builder.mutation({
      query: (body) => ({ url: "/futures-hub/billing/fan-subscription/start", method: "POST", body }),
      invalidatesTags: ["FuturesFanSubscription"],
    }),

    cancelFanSubscription: builder.mutation({
      query: (id) => ({ url: `/futures-hub/billing/fan-subscription/${id}/cancel`, method: "POST" }),
      invalidatesTags: ["FuturesFanSubscription"],
    }),

    // ── AI advisor (Phase 4) ──────────────────────────────────────────
    // Career roadmap fetch reuses the generic CRUD mount from Phase 1
    // (routes/futuresHubRoutes.js's mountCrud("career-roadmap", ...)) —
    // scoped to the caller's own record automatically.
    getMyCareerRoadmap: builder.query({
      query: () => "/futures-hub/career-roadmap",
      providesTags: ["FuturesCareerRoadmap"],
    }),

    generateCareerRoadmap: builder.mutation({
      query: () => ({ url: "/futures-hub/advisor/roadmap", method: "POST" }),
      invalidatesTags: ["FuturesCareerRoadmap"],
    }),

    getAdvisors: builder.query({
      query: () => "/futures-hub/advisor",
      providesTags: ["FuturesAdvisors"],
    }),

    selectAdvisors: builder.mutation({
      query: (advisorKeys) => ({ url: "/futures-hub/advisor/select", method: "POST", body: { advisorKeys } }),
      invalidatesTags: ["FuturesAdvisors"],
    }),

    getAdvisorHistory: builder.query({
      query: (advisorKey) => `/futures-hub/advisor/${advisorKey}/history`,
      providesTags: (result, error, advisorKey) => [{ type: "FuturesAdvisorChat", id: advisorKey }],
    }),

    sendAdvisorMessage: builder.mutation({
      query: ({ advisorKey, content }) => ({
        url: `/futures-hub/advisor/${advisorKey}/message`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { advisorKey }) => [{ type: "FuturesAdvisorChat", id: advisorKey }],
    }),

    // ── Gamification (Phase 5) ────────────────────────────────────────
    getMyMissions: builder.query({
      query: () => "/futures-hub/missions",
      providesTags: ["FuturesMissions"],
    }),

    createMission: builder.mutation({
      query: (body) => ({ url: "/futures-hub/missions", method: "POST", body }),
      invalidatesTags: ["FuturesMissions"],
    }),

    completeMission: builder.mutation({
      query: (id) => ({ url: `/futures-hub/gamification/missions/${id}/complete`, method: "POST" }),
      invalidatesTags: ["FuturesMissions", "FuturesHubTalentProfile"],
    }),

    getXPRewards: builder.query({
      query: () => "/futures-hub/xp-rewards?status=active",
      providesTags: ["FuturesXPRewards"],
    }),

    redeemXPReward: builder.mutation({
      query: (rewardId) => ({ url: "/futures-hub/gamification/xp/redeem", method: "POST", body: { rewardId } }),
      invalidatesTags: ["FuturesXPRewards", "FuturesXPRedemptions", "FuturesHubFanProfile"],
    }),

    getMyXPRedemptions: builder.query({
      query: () => "/futures-hub/gamification/xp/redemptions",
      providesTags: ["FuturesXPRedemptions"],
    }),

    getMyReferralInfo: builder.query({
      query: () => "/futures-hub/gamification/referral/me",
      providesTags: ["FuturesReferral"],
    }),

    getMyDailyPlan: builder.query({
      query: (date) => `/futures-hub/daily-plans?date=${date}`,
      providesTags: ["FuturesDailyPlan"],
    }),

    generateDailyPlan: builder.mutation({
      query: () => ({ url: "/futures-hub/gamification/daily-plan/generate", method: "POST" }),
      invalidatesTags: ["FuturesDailyPlan"],
    }),

    completeDailyTask: builder.mutation({
      query: ({ planId, taskId }) => ({
        url: `/futures-hub/gamification/daily-plan/${planId}/tasks/${taskId}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["FuturesDailyPlan"],
    }),

    // ── Content (Phase 6) ──────────────────────────────────────────────
    getMyExclusiveContent: builder.query({
      query: () => "/futures-hub/exclusive-content",
      providesTags: ["FuturesExclusiveContent"],
    }),

    getTalentExclusiveContent: builder.query({
      query: (talentId) => `/futures-hub/content/exclusive/${talentId}`,
      providesTags: (result, error, talentId) => [{ type: "FuturesExclusiveContent", id: talentId }],
    }),

    createExclusiveContent: builder.mutation({
      query: (body) => ({ url: "/futures-hub/exclusive-content", method: "POST", body }),
      invalidatesTags: ["FuturesExclusiveContent"],
    }),

    deleteExclusiveContent: builder.mutation({
      query: (id) => ({ url: `/futures-hub/exclusive-content/${id}`, method: "DELETE" }),
      invalidatesTags: ["FuturesExclusiveContent"],
    }),

    getVideoLessons: builder.query({
      query: () => "/futures-hub/content/video-lessons",
      providesTags: ["FuturesVideoLessons"],
    }),

    getTalentProjects: builder.query({
      query: (talentId) => `/futures-hub/projects?talentId=${talentId}`,
      providesTags: (result, error, talentId) => [{ type: "FuturesProjects", id: talentId }],
    }),

    getMyProjects: builder.query({
      query: (talentId) => `/futures-hub/projects?talentId=${talentId}`,
      providesTags: ["FuturesProjects"],
    }),

    createProject: builder.mutation({
      query: (body) => ({ url: "/futures-hub/projects", method: "POST", body }),
      invalidatesTags: ["FuturesProjects"],
    }),

    startProjectSupport: builder.mutation({
      query: (body) => ({ url: "/futures-hub/billing/project-support/start", method: "POST", body }),
      invalidatesTags: (result, error, body) => [{ type: "FuturesProjects", id: body.projectId }, "FuturesProjects"],
    }),

    getMyExpertInvites: builder.query({
      query: () => "/futures-hub/expert-invites",
      providesTags: ["FuturesExpertInvites"],
    }),

    createExpertInvite: builder.mutation({
      query: (body) => ({ url: "/futures-hub/expert-invites", method: "POST", body }),
      invalidatesTags: ["FuturesExpertInvites"],
    }),

    getExpertInviteByToken: builder.query({
      query: (token) => `/futures-hub/content/expert-invite/${token}`,
    }),

    submitExpertLesson: builder.mutation({
      query: ({ token, ...body }) => ({
        url: `/futures-hub/content/expert-invite/${token}/submit`,
        method: "POST",
        body,
      }),
    }),

    getCollabRequests: builder.query({
      query: () => "/futures-hub/collab-requests",
      providesTags: ["FuturesCollabRequests"],
    }),

    createCollabRequest: builder.mutation({
      query: (body) => ({ url: "/futures-hub/collab-requests", method: "POST", body }),
      invalidatesTags: ["FuturesCollabRequests"],
    }),
  }),
});

export const {
  useGetMyFuturesTalentProfileQuery,
  useGetFuturesTalentProfileQuery,
  useCreateMyFuturesTalentProfileMutation,
  useUpdateMyFuturesTalentProfileMutation,
  useGetMyFuturesFanProfileQuery,
  useCreateMyFuturesFanProfileMutation,
  useUpdateMyFuturesFanProfileMutation,
  useGetFanTiersQuery,
  useGetMyFanTiersQuery,
  useCreateFanTierMutation,
  useUpdateFanTierMutation,
  useDeleteFanTierMutation,
  useGetMyMembershipQuery,
  useStartMembershipCheckoutMutation,
  useCancelMembershipMutation,
  useGetMyFanSubscriptionsQuery,
  useGetMySubscribersQuery,
  useStartFanSubscriptionCheckoutMutation,
  useCancelFanSubscriptionMutation,
  useGetMyCareerRoadmapQuery,
  useGenerateCareerRoadmapMutation,
  useGetAdvisorsQuery,
  useSelectAdvisorsMutation,
  useGetAdvisorHistoryQuery,
  useSendAdvisorMessageMutation,
  useGetMyMissionsQuery,
  useCreateMissionMutation,
  useCompleteMissionMutation,
  useGetXPRewardsQuery,
  useRedeemXPRewardMutation,
  useGetMyXPRedemptionsQuery,
  useGetMyReferralInfoQuery,
  useGetMyDailyPlanQuery,
  useGenerateDailyPlanMutation,
  useCompleteDailyTaskMutation,
  useGetMyExclusiveContentQuery,
  useGetTalentExclusiveContentQuery,
  useCreateExclusiveContentMutation,
  useDeleteExclusiveContentMutation,
  useGetVideoLessonsQuery,
  useGetTalentProjectsQuery,
  useGetMyProjectsQuery,
  useCreateProjectMutation,
  useStartProjectSupportMutation,
  useGetMyExpertInvitesQuery,
  useCreateExpertInviteMutation,
  useGetExpertInviteByTokenQuery,
  useSubmitExpertLessonMutation,
  useGetCollabRequestsQuery,
  useCreateCollabRequestMutation,
} = futuresHubApi;
