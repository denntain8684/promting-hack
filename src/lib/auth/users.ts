import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
  createdBy: string;
}

interface UserStore {
  users: User[];
}

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStore(): UserStore {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) {
    const initial: UserStore = { users: [] };
    fs.writeFileSync(USERS_FILE, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8")) as UserStore;
  } catch {
    return { users: [] };
  }
}

function writeStore(store: UserStore): void {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function getAllUsers(): User[] {
  return readStore().users;
}

export function getUserByEmail(email: string): User | undefined {
  return readStore().users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

export function getUserById(id: string): User | undefined {
  return readStore().users.find((u) => u.id === id);
}

export async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}

export async function createUser(opts: {
  email: string;
  name: string;
  role: "admin" | "user";
  createdBy: string;
  plaintextPassword?: string;
}): Promise<{ user: User; password: string }> {
  const store = readStore();
  const existing = store.users.find(
    (u) => u.email.toLowerCase() === opts.email.toLowerCase()
  );
  if (existing) {
    throw new Error("E-Mail-Adresse wird bereits verwendet.");
  }

  const password =
    opts.plaintextPassword ?? generatePassword();
  const passwordHash = await bcrypt.hash(password, 12);

  const user: User = {
    id: crypto.randomUUID(),
    email: opts.email.toLowerCase().trim(),
    passwordHash,
    name: opts.name.trim(),
    role: opts.role,
    createdAt: new Date().toISOString(),
    createdBy: opts.createdBy,
  };

  store.users.push(user);
  writeStore(store);

  return { user, password };
}

export function deleteUser(id: string): boolean {
  const store = readStore();
  const before = store.users.length;
  store.users = store.users.filter((u) => u.id !== id);
  writeStore(store);
  return store.users.length < before;
}

export function generatePassword(length = 12): string {
  const charset =
    "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$";
  let pwd = "";
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    pwd += charset[bytes[i] % charset.length];
  }
  return pwd;
}

/** Seed admin on first boot */
export async function seedAdminIfNeeded(): Promise<void> {
  const store = readStore();
  if (store.users.length > 0) return;

  const adminEmail = process.env.ADMIN_EMAIL ?? "mr.dennis.schmidt@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || generatePassword();
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin: User = {
    id: crypto.randomUUID(),
    email: adminEmail,
    passwordHash,
    name: "Admin",
    role: "admin",
    createdAt: new Date().toISOString(),
    createdBy: "system",
  };

  store.users.push(admin);
  writeStore(store);

  // Write initial credentials to a file for first-time access
  const credFile = path.join(DATA_DIR, "admin-credentials.txt");
  fs.writeFileSync(
    credFile,
    `Prompting Hack — Admin-Zugangsdaten (einmalig)\n\nE-Mail:   ${adminEmail}\nPasswort: ${adminPassword}\n\nBitte nach dem ersten Login sofort ändern!\n`,
    "utf-8"
  );
}
