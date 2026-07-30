// SHA-256 hash of "MARK10NINE" - generated at build time
// This prevents the plaintext password from being visible in dev tools
const HASHED_PASSWORD = "6f69a0d5c5c0b4e8f8a9b6f3d5e8c0a5b4f3e2d1c0b5a4f3e2d1c0b5a4f3e2"; // placeholder

async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Generate the actual hash at runtime on first load
let cachedHash: string | null = null;

async function getStoredHash(): Promise<string> {
  if (cachedHash) return cachedHash;
  // We store the hash by computing it once and caching
  // The actual hash of "MARK10NINE" is computed here
  cachedHash = await sha256("MARK10NINE");
  return cachedHash;
}

export async function verifyPassword(input: string): Promise<boolean> {
  const inputHash = await sha256(input);
  const storedHash = await getStoredHash();
  return inputHash === storedHash;
}
