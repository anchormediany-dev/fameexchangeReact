import { PLACEHOLDER_IMAGE } from "./imagePlaceholder";

const ABS = /^https?:\/\//i;
const API_BASE = (import.meta.env.VITE_API_IMAGE_BASE_URL || "").replace(
  /\/+$/,
  ""
);
const FRONTEND_BASE = (import.meta.env.VITE_FRONTEND_URL || "").replace(
  /\/+$/,
  ""
);

/**
 * Resolve a possibly-relative image URL.
 *
 * - Absolute http(s) URLs pass through.
 * - Paths that look like frontend bundle assets (/src/..., /public/..., /assets/...)
 *   are prefixed with VITE_FRONTEND_URL.
 * - Everything else is treated as a backend upload and prefixed with
 *   VITE_API_IMAGE_BASE_URL.
 * - Empty / invalid input returns the supplied fallback (default: an inline
 *   grey-circle SVG placeholder).
 */
export function imgSrc(url, fallback = PLACEHOLDER_IMAGE) {
  if (!url || typeof url !== "string") return fallback;
  if (ABS.test(url)) return url;

  const cleaned = url.replace(/^\/+/, "");

  if (
    FRONTEND_BASE &&
    (url.startsWith("/src/") ||
      url.startsWith("/public/") ||
      url.startsWith("/assets/"))
  ) {
    return `${FRONTEND_BASE}/${cleaned}`;
  }

  if (API_BASE) return `${API_BASE}/${cleaned}`;
  if (FRONTEND_BASE) return `${FRONTEND_BASE}/${cleaned}`;
  return cleaned || fallback;
}
