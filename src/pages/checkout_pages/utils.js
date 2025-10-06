import { loadStripe } from "@stripe/stripe-js";
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
export const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop";
export const FALLBACK_LOGO_PLACEHOLDER =
  "https://placehold.co/80x80/png?text=LOGO";

export const resolveImage = (p) => {
  if (!p) return "";
  if (/^https?:|^data:/.test(p)) return p;
  const normalized = p.replace(/\\/g, "/");
  const base = CDN_BASE.replace(/\/$/, "");
  const path = normalized.replace(/^\//, "");
  return `${base}/${path}`;
};

export const currency = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
    : "";
