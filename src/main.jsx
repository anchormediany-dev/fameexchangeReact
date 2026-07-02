import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
