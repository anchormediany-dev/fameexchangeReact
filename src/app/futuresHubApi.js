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
} = futuresHubApi;
