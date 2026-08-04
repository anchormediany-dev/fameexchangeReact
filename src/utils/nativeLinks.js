import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";

// External links (T&C, KYC documents, social profiles, famefutures.com CTAs,
// etc.) must not navigate the app's own WebView away when running as a
// Capacitor app — there's no back button in the chrome to get back. Use
// this instead of window.open/target="_blank" anywhere a link points off
// the app's own domain. On the web build this is just a normal new-tab
// open; Capacitor.isNativePlatform() is false there.
export async function openExternal(url) {
  if (!url) return;
  if (Capacitor.isNativePlatform()) {
    await Browser.open({ url });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
