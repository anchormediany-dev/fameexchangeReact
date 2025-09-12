export function imgSrc(url, fallback = "") {
  if (!url || typeof url !== "string") return fallback;

  const ABS = /^https?:\/\//i;
  if (ABS.test(url)) return url;

  const BASE = (import.meta.env.VITE_API_IMAGE_BASE_URL || "").replace(
    /\/+$/,
    ""
  );
  const cleaned = url.replace(/^\/+/, "");

  if (!BASE) return cleaned || fallback;

  return `${BASE}/${cleaned}`;
}
