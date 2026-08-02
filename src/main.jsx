import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Warn on startup if critical env vars are missing
const REQUIRED_ENV = ["VITE_API_BASE_URL", "VITE_STRIPE_PUBLISHABLE_KEY"];
for (const key of REQUIRED_ENV) {
  if (!import.meta.env[key]) {
    console.error(`[config] Missing required env var: ${key}`);
  }
}

// No-ops entirely if VITE_SENTRY_DSN isn't set (e.g. local dev) — safe to
// always leave in. ErrorBoundary below reports render errors explicitly;
// this also catches anything outside the component tree.
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 0,
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<div className="min-h-screen bg-[#171717]" />} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
