import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    const secretKey = import.meta.env.VITE_SECRET_KEY;
    if (token) {
      headers.set("x-auth-token", `${token}`);
    }
    if (secretKey) {
      headers.set("secret-key", secretKey);
    }
    headers.set("ngrok-skip-browser-warning", 69420);
    return headers;
  },
});

// Auto logout on 401
// const baseQueryWithLogout = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);
//   if (result?.error?.status === 401) {
//     api.dispatch(logout());
//   }
//   return result;
// };

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Auth",
    "Wallet",
    "WalletTransactions",
    "MarketTalents",
    "TopTalents",
    "TalentDetail",
    "TalentStats",
    "TradeHistory",
    "OpenPositions",
    "Position",
  ],
  endpoints: () => ({}),
});
