/**
 * Inline circled grey SVG used as a fallback whenever an image fails or is missing.
 * Encoded as a data URI so it's network-free and works as <img src=...>.
 */
const SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#3a3a3a'/>
      <stop offset='100%' stop-color='#1f1f1f'/>
    </linearGradient>
  </defs>
  <circle cx='40' cy='40' r='40' fill='url(#g)'/>
  <circle cx='40' cy='32' r='12' fill='#5a5a5a'/>
  <path d='M16 70 C 22 54, 58 54, 64 70 Z' fill='#5a5a5a'/>
</svg>`;

export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," + encodeURIComponent(SVG);

/**
 * onError handler that swaps the image to the inline grey-circle placeholder.
 * Idempotent - it removes itself so no infinite loop when the placeholder also fails.
 */
export const handleImageError = (e) => {
  const t = e?.currentTarget;
  if (!t) return;
  if (t.dataset.placeholder === "1") return;
  t.dataset.placeholder = "1";
  t.onerror = null;
  t.src = PLACEHOLDER_IMAGE;
};
