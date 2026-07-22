import { api } from "./api";

export const tradingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ── Wallet ──────────────────────────────────────────────
    getWallet: builder.query({
      query: () => "/wallet",
      providesTags: ["Wallet"],
    }),

    getWalletTransactions: builder.query({
      query: ({ page = 1, limit = 20, type = "" } = {}) => ({
        url: "/wallet/transactions",
        params: {
          page,
          limit,
          ...(type ? { type } : {}),
        },
      }),
      providesTags: ["WalletTransactions"],
    }),

    depositFunds: builder.mutation({
      query: (amount) => ({
        url: "/wallet/deposit",
        method: "POST",
        body: { amount },
      }),
      invalidatesTags: ["Wallet", "WalletTransactions"],
    }),

    // ── Stripe-funded wallet deposits ───────────────────────
    createDepositIntent: builder.mutation({
      query: ({ amount, currency = "usd" }) => ({
        url: "/wallet/deposit-intent",
        method: "POST",
        body: { amount, currency },
      }),
    }),

    confirmDeposit: builder.mutation({
      query: ({ paymentIntentId }) => ({
        url: "/wallet/deposit-confirm",
        method: "POST",
        body: { paymentIntentId },
      }),
      invalidatesTags: ["Wallet", "WalletTransactions"],
    }),

    // ── Inverse Session Stripe Fast-Checkout ────────────────
    getInverseSessionQuote: builder.query({
      query: (sessionId) => ({
        url: "/billing/inverse-session/quote",
        params: { sessionId },
      }),
    }),

    createInverseSessionIntent: builder.mutation({
      query: ({ sessionId, talentId, currency = "usd", fanRequestId } = {}) => ({
        url: "/billing/inverse-session/payment-intent",
        method: "POST",
        body: {
          sessionId,
          talentId,
          currency,
          ...(fanRequestId ? { fanRequestId } : {}),
        },
      }),
    }),

    confirmInverseSession: builder.mutation({
      query: (body) => ({
        url: "/billing/inverse-session/confirm",
        method: "POST",
        body,
      }),
    }),

    // ── Talents / Market ────────────────────────────────────
    getMarketTalents: builder.query({
      query: ({ page = 1, limit = 20, search = "" } = {}) => ({
        url: "/talents",
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
        },
      }),
      providesTags: ["MarketTalents"],
    }),

    getTopTalents: builder.query({
      query: ({ limit = 10, sort = "price" } = {}) => ({
        url: "/talents/top",
        params: { limit, sort },
      }),
      providesTags: ["TopTalents"],
    }),

    getTalentById: builder.query({
      query: (id) => `/talents/${id}`,
      providesTags: (_result, _error, id) => [{ type: "TalentDetail", id }],
    }),

    getTalentQuote: builder.query({
      query: (id) => `/talents/${id}/quote`,
    }),

    getTalentChart: builder.query({
      query: ({ id, range = "1D" }) => ({
        url: `/talents/${id}/chart`,
        params: { range, format: "ohlc" },
      }),
    }),

    getTalentStats: builder.query({
      query: (id) => `/talents/${id}/stats`,
      providesTags: (_result, _error, id) => [{ type: "TalentStats", id }],
    }),

    // ── Trading ─────────────────────────────────────────────
    tradePreview: builder.mutation({
      query: ({ talent_id, side, amount }) => ({
        url: "/trades/preview",
        method: "POST",
        body: { talent_id, side, amount },
      }),
    }),

    tradeOpen: builder.mutation({
      query: ({ talent_id, side, amount, quote_price, idempotency_key }) => ({
        url: "/trades/open",
        method: "POST",
        body: { talent_id, side, amount, quote_price, idempotency_key },
      }),
      // The trade response already carries the updated wallet snapshot
      // (response.wallet). Patch the GET /wallet cache immediately so the
      // headline balance updates without an extra round-trip; tag
      // invalidation still triggers a background refetch as a safety net.
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.wallet) {
            dispatch(
              tradingApi.util.updateQueryData(
                "getWallet",
                undefined,
                (draft) => {
                  draft.wallet = { ...(draft.wallet || {}), ...data.wallet };
                }
              )
            );
          }
        } catch {
          /* error path handled by caller */
        }
      },
      invalidatesTags: [
        "Wallet",
        "OpenPositions",
        "TradeHistory",
        "WalletTransactions",
      ],
    }),

    getTradeHistory: builder.query({
      query: (params = {}) => {
        const filtered = Object.fromEntries(
          Object.entries(params).filter(
            ([, v]) => v !== undefined && v !== null && v !== ""
          )
        );
        return {
          url: "/trades/history",
          params: filtered,
        };
      },
      providesTags: ["TradeHistory"],
    }),

    getTradeDetail: builder.query({
      query: (tradeId) => `/trades/history/${tradeId}`,
    }),

    // ── Positions ───────────────────────────────────────────
    getOpenPositions: builder.query({
      query: ({ page = 1, limit = 20, talent_id } = {}) => ({
        url: "/positions/open",
        params: {
          page,
          limit,
          ...(talent_id ? { talent_id } : {}),
        },
      }),
      providesTags: ["OpenPositions"],
    }),

    getPosition: builder.query({
      query: (id) => `/positions/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Position", id }],
    }),

    closePositionPreview: builder.mutation({
      query: (id) => ({
        url: `/positions/${id}/close-preview`,
        method: "POST",
      }),
    }),

    closePosition: builder.mutation({
      query: (id) => ({
        url: `/positions/${id}/close`,
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.wallet) {
            dispatch(
              tradingApi.util.updateQueryData(
                "getWallet",
                undefined,
                (draft) => {
                  draft.wallet = { ...(draft.wallet || {}), ...data.wallet };
                }
              )
            );
          }
        } catch {
          /* error path handled by caller */
        }
      },
      invalidatesTags: [
        "Wallet",
        "OpenPositions",
        "TradeHistory",
        "WalletTransactions",
      ],
    }),

    // ── Admin: FameScore valuation engine ───────────────────
    previewFameScore: builder.query({
      query: ({ userId, min_price, max_price }) => ({
        url: "/admin/talents/preview-famescore",
        params: { userId, min_price, max_price },
      }),
    }),

    createTalentAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin/talents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MarketTalents", "TopTalents"],
    }),

    recalculateTalentValuation: builder.mutation({
      query: (talentId) => ({
        url: `/admin/talents/${talentId}/recalculate-valuation`,
        method: "POST",
      }),
      invalidatesTags: ["MarketTalents", "TopTalents"],
    }),

    recalculateAllValuations: builder.mutation({
      query: () => ({
        url: "/admin/talents/recalculate-all-valuations",
        method: "POST",
      }),
      invalidatesTags: ["MarketTalents", "TopTalents"],
    }),

    // ── Admin: hash-chained ledger ───────────────────────────
    getLedgerEntries: builder.query({
      query: ({ page = 1, limit = 50 } = {}) => ({
        url: "/admin/ledger",
        params: { page, limit },
      }),
      providesTags: ["Ledger"],
    }),

    verifyLedger: builder.query({
      query: ({ from, to } = {}) => ({
        url: "/admin/ledger/verify",
        params: { ...(from ? { from } : {}), ...(to ? { to } : {}) },
      }),
    }),

    // ── FameScore ─────────────────────────────────────────
    getFameScoreThresholds: builder.query({
      query: () => "/famescore/thresholds",
    }),

    // ── Futures tier ─────────────────────────────────────────
    getFuturesTalents: builder.query({
      query: () => "/futures",
      providesTags: ["FuturesTalents"],
    }),

    simulatePledge: builder.mutation({
      query: ({ talentId, userId, amount }) => ({
        url: `/admin/futures/${talentId}/simulate-pledge`,
        method: "POST",
        body: { userId, amount },
      }),
      invalidatesTags: ["FuturesTalents", "FuturesPledges"],
    }),

    getPledgesForTalent: builder.query({
      query: (talentId) => `/admin/futures/${talentId}/pledges`,
      providesTags: ["FuturesPledges"],
    }),

    // ── Fan-facing futures pledge flow ───────────────────────
    startFanPledge: builder.mutation({
      query: ({ talentId, amount, currency = "usd" }) => ({
        url: `/futures/${talentId}/pledge-intent`,
        method: "POST",
        body: { amount, currency },
      }),
    }),

    confirmFanPledge: builder.mutation({
      query: ({ paymentIntentId }) => ({
        url: "/futures/pledge-confirm",
        method: "POST",
        body: { paymentIntentId },
      }),
      invalidatesTags: ["FuturesTalents", "FuturesPledges"],
    }),

    getMyPledges: builder.query({
      query: () => "/futures/my-pledges",
      providesTags: ["FuturesPledges"],
    }),

    // ── Self-serve talent application ───────────────────────
    applyToBeTalent: builder.mutation({
      query: () => ({
        url: "/talents/apply",
        method: "POST",
      }),
      invalidatesTags: ["MarketTalents", "FuturesTalents"],
    }),
  }),
});

export const {
  // Wallet
  useGetWalletQuery,
  useGetWalletTransactionsQuery,
  useDepositFundsMutation,
  useCreateDepositIntentMutation,
  useConfirmDepositMutation,
  // Inverse Session Stripe Checkout
  useGetInverseSessionQuoteQuery,
  useCreateInverseSessionIntentMutation,
  useConfirmInverseSessionMutation,
  // Talents
  useGetMarketTalentsQuery,
  useGetTopTalentsQuery,
  useGetTalentByIdQuery,
  useGetTalentQuoteQuery,
  useGetTalentChartQuery,
  useGetTalentStatsQuery,
  // Trading
  useTradePreviewMutation,
  useTradeOpenMutation,
  useGetTradeHistoryQuery,
  useGetTradeDetailQuery,
  // Positions
  useGetOpenPositionsQuery,
  useGetPositionQuery,
  useClosePositionPreviewMutation,
  useClosePositionMutation,
  // Admin: FameScore
  useLazyPreviewFameScoreQuery,
  useCreateTalentAdminMutation,
  useRecalculateTalentValuationMutation,
  useRecalculateAllValuationsMutation,
  // Admin: Ledger
  useGetLedgerEntriesQuery,
  useLazyVerifyLedgerQuery,
  // FameScore
  useGetFameScoreThresholdsQuery,
  // Futures
  useGetFuturesTalentsQuery,
  useSimulatePledgeMutation,
  useGetPledgesForTalentQuery,
  // Fan pledge flow
  useStartFanPledgeMutation,
  useConfirmFanPledgeMutation,
  useGetMyPledgesQuery,
  // Self-serve application
  useApplyToBeTalentMutation,
} = tradingApi;
