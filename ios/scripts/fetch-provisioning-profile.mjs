// Fetches the App Store distribution provisioning profile fresh from the
// App Store Connect API and installs it where Xcode expects to find it.
// Re-fetching at build time (rather than storing the .mobileprovision as a
// static CI secret) means it never goes stale if the certificate it
// references is later renewed/rotated.
//
// No external dependencies — signs the API's ES256 JWT with Node's built-in
// crypto module so this script has nothing to `npm install` beyond Node
// itself, matching this repo's frontend-only dependency footprint.
import { createSign } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";

const KEY_ID = process.env.APPSTORE_KEY_ID;
const ISSUER_ID = process.env.APPSTORE_ISSUER_ID;
const PRIVATE_KEY_PATH = process.env.APPSTORE_API_KEY_PATH;
const PROFILE_ID = process.env.APPSTORE_PROFILE_ID;

if (!KEY_ID || !ISSUER_ID || !PRIVATE_KEY_PATH || !PROFILE_ID) {
  throw new Error(
    "Required: APPSTORE_KEY_ID, APPSTORE_ISSUER_ID, APPSTORE_API_KEY_PATH, APPSTORE_PROFILE_ID"
  );
}

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function makeToken() {
  const header = { alg: "ES256", kid: KEY_ID, typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: ISSUER_ID, iat: now, exp: now + 60 * 15, aud: "appstoreconnect-v1" };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;

  const privateKey = readFileSync(PRIVATE_KEY_PATH, "utf8");
  const signer = createSign("SHA256");
  signer.update(signingInput);
  signer.end();
  // JWT's ES256 wants the raw r||s signature, not DER (crypto's default).
  const signature = signer.sign({ key: privateKey, dsaEncoding: "ieee-p1363" });
  const encodedSignature = signature.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  return `${signingInput}.${encodedSignature}`;
}

async function main() {
  const token = makeToken();
  const res = await fetch(`https://api.appstoreconnect.apple.com/v1/profiles/${PROFILE_ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Profile fetch failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  const { profileContent, uuid, name } = json.data.attributes;

  const dir = `${homedir()}/Library/MobileDevice/Provisioning Profiles`;
  mkdirSync(dir, { recursive: true });
  const outPath = `${dir}/${uuid}.mobileprovision`;
  writeFileSync(outPath, Buffer.from(profileContent, "base64"));
  console.log(`Installed profile "${name}" (${uuid}) -> ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
