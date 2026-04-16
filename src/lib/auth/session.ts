import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "ph_session";

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  // In production this should be set. Log prominently so it's caught in startup logs.
  console.warn(
    "[auth] WARNING: JWT_SECRET env var is not set. Using insecure default. Set JWT_SECRET in production!"
  );
}
const JWT_SECRET = new TextEncoder().encode(
  rawSecret ?? "prompting-hack-secret-change-in-production-32chars"
);
const JWT_EXPIRY = "7d";

export interface SessionPayload {
  userId: string;
  email: string;
  role: "admin" | "user";
}

export async function createSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
