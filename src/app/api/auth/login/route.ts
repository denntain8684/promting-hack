import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, verifyPassword, seedAdminIfNeeded } from "@/lib/auth/users";
import { createSession, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  // Ensure admin exists on first boot
  await seedAdminIfNeeded();

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "E-Mail und Passwort erforderlich." }, { status: 400 });
  }

  const user = getUserByEmail(email);
  if (!user) {
    // Constant-time delay to prevent user enumeration
    await new Promise((r) => setTimeout(r, 200));
    return NextResponse.json({ error: "E-Mail oder Passwort falsch." }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "E-Mail oder Passwort falsch." }, { status: 401 });
  }

  const token = await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({ success: true, role: user.role });
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return response;
}
