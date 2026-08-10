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

    // ── Fan Missions (Phase 2) ───────────────────────────────
    getMyFanMissions: builder.query({
      query: () => "/futures-hub/fan-missions/mine",
      providesTags: ["FuturesFanMissions"],
    }),
    createFanMission: builder.mutation({
      query: (body) => ({ url: "/futures-hub/fan-missions", method: "POST", body }),
      invalidatesTags: ["FuturesFanMissions"],
    }),
    generateFanMissionIdeas: builder.mutation({
      query: () => ({ url: "/futures-hub/fan-missions/generate", method: "POST" }),
    }),
    getActiveFanMissions: builder.query({
      query: () => "/futures-hub/fan-missions/active",
      providesTags: ["FuturesActiveFanMissions"],
    }),
    submitFanMission: builder.mutation({
      query: ({ missionId, proof_note }) => ({
        url: `/futures-hub/fan-missions/${missionId}/submit`,
        method: "POST",
        body: { proof_note },
      }),
      invalidatesTags: ["FuturesActiveFanMissions"],
    }),
    getMissionSubmissions: builder.query({
      query: (status) => `/futures-hub/fan-missions/submissions${status ? `?status=${status}` : ""}`,
      providesTags: ["FuturesMissionSubmissions"],
    }),
    reviewMissionSubmission: builder.mutation({
      query: ({ id, decision }) => ({
        url: `/futures-hub/fan-missions/submissions/${id}/review`,
        method: "POST",
        body: { decision },
      }),
      invalidatesTags: ["FuturesMissionSubmissions", "FuturesFanMissions"],
    }),

    // ── Fan engagement (Phase 2) ─────────────────────────────
    getReferralDashboard: builder.query({
      query: () => "/futures-hub/fan-engagement/referrals",
      providesTags: ["FuturesReferralDashboard"],
    }),
    getFanProgress: builder.query({
      query: () => "/futures-hub/fan-engagement/fan-progress",
      providesTags: ["FuturesFanProgress"],
    }),
    getFanLeaderboard: builder.query({
      query: () => "/futures-hub/fan-engagement/leaderboard",
      providesTags: ["FuturesFanLeaderboard"],
    }),
    getTalentFanLeaderboard: builder.query({
      query: (talentId) => `/futures-hub/fan-engagement/leaderboard/${talentId}`,
      providesTags: ["FuturesFanLeaderboard"],
    }),
    getGlobalLeaderboard: builder.query({
      query: () => "/futures-hub/fan-engagement/global-leaderboard",
      providesTags: ["FuturesFanLeaderboard"],
    }),
    sendFanShoutout: builder.mutation({
      query: (body) => ({ url: "/futures-hub/fan-engagement/shoutout", method: "POST", body }),
    }),

    // ── Growth Studio (Phase 3) ──────────────────────────────
    getMyContentIdeas: builder.query({
      query: (type) => `/futures-hub/growth-studio${type ? `?type=${type}` : ""}`,
      providesTags: ["FuturesContentIdeas"],
    }),
    generateContentIdeas: builder.mutation({
      query: (type) => ({ url: "/futures-hub/growth-studio/generate", method: "POST", body: { type } }),
      invalidatesTags: ["FuturesContentIdeas"],
    }),
    deleteContentIdea: builder.mutation({
      query: (id) => ({ url: `/futures-hub/growth-studio/${id}`, method: "DELETE" }),
      invalidatesTags: ["FuturesContentIdeas"],
    }),

    // ── Content Calendar (Phase 3) ───────────────────────────
    getMyCalendarPosts: builder.query({
      query: () => "/futures-hub/calendar-posts",
      providesTags: ["FuturesCalendarPosts"],
    }),
    createCalendarPost: builder.mutation({
      query: (body) => ({ url: "/futures-hub/calendar-posts", method: "POST", body }),
      invalidatesTags: ["FuturesCalendarPosts"],
    }),
    updateCalendarPost: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/futures-hub/calendar-posts/${id}`, method: "PUT", body }),
      invalidatesTags: ["FuturesCalendarPosts"],
    }),
    deleteCalendarPost: builder.mutation({
      query: (id) => ({ url: `/futures-hub/calendar-posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["FuturesCalendarPosts"],
    }),

    // ── Monetization Lab (Phase 3) ───────────────────────────
    getMyMonetizationStrategy: builder.query({
      query: () => "/futures-hub/monetization/me",
      providesTags: ["FuturesMonetizationStrategy"],
    }),
    generateMonetizationStrategy: builder.mutation({
      query: () => ({ url: "/futures-hub/monetization/generate", method: "POST" }),
      invalidatesTags: ["FuturesMonetizationStrategy"],
    }),

    // ── Messages (Phase 4) ───────────────────────────────────
    getMyConversations: builder.query({
      query: () => "/futures-hub/messages/conversations",
      providesTags: ["FuturesConversations"],
    }),
    getFanConversation: builder.query({
      query: () => "/futures-hub/messages/fan/conversation",
      providesTags: ["FuturesConversations"],
    }),
    getConversationMessages: builder.query({
      query: (id) => `/futures-hub/messages/conversations/${id}/messages`,
      providesTags: (result, error, id) => [{ type: "FuturesMessages", id }],
    }),
    sendConversationMessage: builder.mutation({
      query: ({ id, content }) => ({
        url: `/futures-hub/messages/conversations/${id}/messages`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "FuturesMessages", id }, "FuturesConversations"],
    }),

    // ── Moderation (Phase 4) ──────────────────────────────────
    getFlaggedFans: builder.query({
      query: () => "/futures-hub/moderation/flagged",
      providesTags: ["FuturesFlaggedFans"],
    }),
    clearFanFlag: builder.mutation({
      query: (fanUserId) => ({ url: `/futures-hub/moderation/${fanUserId}/clear`, method: "POST" }),
      invalidatesTags: ["FuturesFlaggedFans"],
    }),

    // ── Insights (Phase 4) ────────────────────────────────────
    getInsights: builder.query({
      query: () => "/futures-hub/insights",
    }),
    getGrowthInsights: builder.query({
      query: () => "/futures-hub/insights/growth",
    }),

    // ── Fame Live / Webinars (Phase 5) ───────────────────────
    getWebinars: builder.query({
      query: (talentId) => `/futures-hub/webinars?talentId=${talentId}`,
      providesTags: ["FuturesWebinars"],
    }),
    createWebinar: builder.mutation({
      query: (body) => ({ url: "/futures-hub/webinars", method: "POST", body }),
      invalidatesTags: ["FuturesWebinars"],
    }),

    // ── Brand Protection (Phase 5) ────────────────────────────
    getMyContractReviews: builder.query({
      query: () => "/futures-hub/brand-protection/reviews",
      providesTags: ["FuturesContractReviews"],
    }),
    reviewContract: builder.mutation({
      query: (formData) => ({ url: "/futures-hub/brand-protection/review", method: "POST", body: formData }),
      invalidatesTags: ["FuturesContractReviews"],
    }),

    // ── Help (Phase 6) ────────────────────────────────────────
    askHelpQuestion: builder.mutation({
      query: (question) => ({ url: "/futures-hub/help/ask", method: "POST", body: { question } }),
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
  useGetMyFanMissionsQuery,
  useCreateFanMissionMutation,
  useGenerateFanMissionIdeasMutation,
  useGetActiveFanMissionsQuery,
  useSubmitFanMissionMutation,
  useGetMissionSubmissionsQuery,
  useReviewMissionSubmissionMutation,
  useGetReferralDashboardQuery,
  useGetFanProgressQuery,
  useGetFanLeaderboardQuery,
  useGetTalentFanLeaderboardQuery,
  useGetGlobalLeaderboardQuery,
  useSendFanShoutoutMutation,
  useGetMyContentIdeasQuery,
  useGenerateContentIdeasMutation,
  useDeleteContentIdeaMutation,
  useGetMyCalendarPostsQuery,
  useCreateCalendarPostMutation,
  useUpdateCalendarPostMutation,
  useDeleteCalendarPostMutation,
  useGetMyMonetizationStrategyQuery,
  useGenerateMonetizationStrategyMutation,
  useGetMyConversationsQuery,
  useGetFanConversationQuery,
  useGetConversationMessagesQuery,
  useSendConversationMessageMutation,
  useGetFlaggedFansQuery,
  useClearFanFlagMutation,
  useGetInsightsQuery,
  useGetGrowthInsightsQuery,
  useGetWebinarsQuery,
  useCreateWebinarMutation,
  useGetMyContractReviewsQuery,
  useReviewContractMutation,
  useAskHelpQuestionMutation,
} = futuresHubApi;
