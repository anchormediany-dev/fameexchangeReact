export function truncate(text, max = 100, ellipsis = "…") {
  if (!text && text !== 0) return "";
  const str = String(text).trim();
  if (str.length <= max) return str;
  const slice = str.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const head = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return head.replace(/[\\s.,;:!?\-–—]+$/u, "") + ellipsis;
}
