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
} = futuresHubApi;
