import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    // Prefer fresh Redux state, fall back to localStorage (covers hydration
    // races, hard refresh on a protected page, and tabs opened before the
    // store has rehydrated).
    let token = null;
    try {
      token = getState()?.auth?.accessToken || null;
    } catch {
      token = null;
    }
    if (!token && typeof window !== "undefined") {
      try {
        token = window.localStorage.getItem("accessToken") || null;
      } catch {
        // ignore (private mode, etc.)
      }
    }
    if (token) {
      headers.set("x-auth-token", token);
      // Some backends additionally accept a Bearer header — set both so we
      // never get caught out by a middleware that only checks one.
      if (!headers.has("authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    const secretKey = import.meta.env.VITE_SECRET_KEY;
    if (secretKey) {
      headers.set("secret-key", secretKey);
    } else if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[api] VITE_SECRET_KEY is not set — protected endpoints will 401."
      );
    }

    headers.set("ngrok-skip-browser-warning", "69420");
    return headers;
  },
});

// ── Session-expired detector ────────────────────────────────────────────
// Many backend endpoints return 200/4xx with a body of
//   { error: "Token Expired or invalid" }
// when the JWT has expired. We intercept every response and broadcast a
// `session-expired` window event so a global modal can react. We do NOT
// auto-logout here — the modal handles that after the user clicks Login.
const TOKEN_EXPIRED_RE = /token\s*(?:has\s*)?expired|invalid\s*token|jwt\s*expired|expired\s*or\s*invalid/i;

const isTokenExpiredPayload = (payload) => {
  if (!payload) return false;
  if (typeof payload === "string") return TOKEN_EXPIRED_RE.test(payload);
  const msg = payload.error || payload.message || payload.msg;
  return typeof msg === "string" && TOKEN_EXPIRED_RE.test(msg);
};

let sessionExpiredFired = false;
const fireSessionExpired = () => {
  if (sessionExpiredFired) return;
  // Only meaningful if we *had* a token — otherwise it's just a normal
  // unauthenticated request (e.g. on the public home page).
  let hadToken = false;
  try {
    hadToken = !!window.localStorage.getItem("accessToken");
  } catch {
    hadToken = false;
  }
  if (!hadToken) return;
  sessionExpiredFired = true;
  window.dispatchEvent(new CustomEvent("session-expired"));
};

export const resetSessionExpiredFlag = () => {
  sessionExpiredFired = false;
};

const baseQueryWithAuthCheck = async (args, apiCtx, extraOptions) => {
  const result = await baseQuery(args, apiCtx, extraOptions);
  // RTK Query stores parsed body in `result.error.data` for HTTP errors,
  // and in `result.data` for 2xx responses (some APIs return errors with 200).
  if (result?.error) {
    const status = result.error.status;
    if (status === 401 || isTokenExpiredPayload(result.error.data)) {
      fireSessionExpired();
    }
  } else if (isTokenExpiredPayload(result?.data)) {
    fireSessionExpired();
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthCheck,
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
    "SocialConnections",
    "Ledger",
    "FuturesTalents",
    "FuturesPledges",
    "FameScoreDashboard",
  ],
  endpoints: () => ({}),
});
