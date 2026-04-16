import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getAllUsers, createUser, deleteUser } from "@/lib/auth/users";
import { sendWelcomeEmail } from "@/lib/auth/email";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const users = getAllUsers().map(({ passwordHash: _, ...rest }) => rest);
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  let body: { email?: string; name?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { email, name, role } = body;
  if (!email || !name) {
    return NextResponse.json({ error: "E-Mail und Name erforderlich." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
  }

  try {
    const { user, password } = await createUser({
      email,
      name,
      role: role === "admin" ? "admin" : "user",
      createdBy: session.email,
    });

    const appUrl = process.env.APP_URL ?? "https://hack.denntainshome.com";
    await sendWelcomeEmail({ to: user.email, name: user.name, password, appUrl });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      // Return password in response so admin can note it (also sent via email)
      generatedPassword: password,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Fehler beim Erstellen.";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID erforderlich." }, { status: 400 });
  }

  // Admin cannot delete themselves
  if (session.userId === id) {
    return NextResponse.json({ error: "Du kannst deinen eigenen Account nicht löschen." }, { status: 400 });
  }

  const deleted = deleteUser(id);
  if (!deleted) {
    return NextResponse.json({ error: "Benutzer nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
