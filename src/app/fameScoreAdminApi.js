import { api } from "./api";

export const fameScoreAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFameScoreDashboard: builder.query({
      query: () => ({
        url: "/admin/famescore/dashboard",
        method: "GET",
      }),
      providesTags: ["FameScoreDashboard"],
    }),

    getRevenueSummary: builder.query({
      query: (params) => ({
        url: "/admin/revenue/summary",
        method: "GET",
        params,
      }),
    }),

    getAssetRevenue: builder.query({
      query: (assetId) => ({
        url: `/admin/revenue/by-asset/${assetId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFameScoreDashboardQuery,
  useGetRevenueSummaryQuery,
  useGetAssetRevenueQuery,
} = fameScoreAdminApi;
