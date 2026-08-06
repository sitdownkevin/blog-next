import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SiweMessage } from "siwe";
import { getAddress, isAddress, type Hex } from "viem";

const SESSION_COOKIE = "gallery_session";
const NONCE_COOKIE = "gallery_nonce";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const NONCE_TTL_SECONDS = 60 * 10; // 10 minutes
const DEFAULT_ADMIN =
  "0x7d7984e2ea378465a0e759df675f9d295e566017";

function getSessionSecret(): Uint8Array {
  const secret = process.env.GALLERY_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "GALLERY_SESSION_SECRET must be set (at least 16 characters)",
    );
  }
  return new TextEncoder().encode(secret);
}

export function getAdminAddress(): string {
  const raw = process.env.GALLERY_ADMIN_ADDRESS || DEFAULT_ADMIN;
  if (!isAddress(raw)) {
    throw new Error("Invalid GALLERY_ADMIN_ADDRESS");
  }
  return getAddress(raw);
}

export function isAdminAddress(address: string): boolean {
  if (!isAddress(address)) return false;
  return getAddress(address) === getAdminAddress();
}

function randomNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createNonce(): Promise<string> {
  const nonce = randomNonce();
  const token = await new SignJWT({ nonce })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${NONCE_TTL_SECONDS}s`)
    .sign(getSessionSecret());

  const jar = await cookies();
  jar.set(NONCE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: NONCE_TTL_SECONDS,
  });

  return nonce;
}

async function consumeNonce(expected: string): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(NONCE_COOKIE)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    const nonce = payload.nonce;
    if (typeof nonce !== "string" || nonce !== expected) {
      return false;
    }
  } catch {
    return false;
  }

  jar.delete(NONCE_COOKIE);
  return true;
}

export async function createSession(address: string): Promise<void> {
  const normalized = getAddress(address);
  const token = await new SignJWT({ address: normalized })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSessionSecret());

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(NONCE_COOKIE);
}

export async function getSessionAddress(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    const address = payload.address;
    if (typeof address !== "string" || !isAddress(address)) {
      return null;
    }
    if (!isAdminAddress(address)) {
      return null;
    }
    return getAddress(address);
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<string> {
  const address = await getSessionAddress();
  if (!address) {
    throw new AuthError("Unauthorized", 401);
  }
  return address;
}

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

export type VerifySiweResult =
  | { ok: true; address: string }
  | { ok: false; status: number; error: string };

export async function verifySiweLogin(input: {
  message: string;
  signature: string;
  host: string;
}): Promise<VerifySiweResult> {
  let siwe: SiweMessage;
  try {
    siwe = new SiweMessage(input.message);
  } catch {
    return { ok: false, status: 400, error: "Invalid SIWE message" };
  }

  if (!siwe.nonce) {
    return { ok: false, status: 400, error: "Missing nonce" };
  }

  const nonceOk = await consumeNonce(siwe.nonce);
  if (!nonceOk) {
    return { ok: false, status: 400, error: "Invalid or expired nonce" };
  }

  const expectedHost = input.host.split(":")[0];
  if (siwe.domain !== expectedHost && siwe.domain !== input.host) {
    return { ok: false, status: 400, error: "Domain mismatch" };
  }

  let result: Awaited<ReturnType<SiweMessage["verify"]>>;
  try {
    result = await siwe.verify({
      signature: input.signature as Hex,
      domain: siwe.domain,
      nonce: siwe.nonce,
    });
  } catch {
    return { ok: false, status: 401, error: "Signature verification failed" };
  }

  if (!result.success || !result.data.address) {
    return { ok: false, status: 401, error: "Signature verification failed" };
  }

  const address = getAddress(result.data.address);
  if (!isAdminAddress(address)) {
    return { ok: false, status: 403, error: "Address not allowed" };
  }

  await createSession(address);
  return { ok: true, address };
}
