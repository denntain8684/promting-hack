"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Zap, Users, Plus, Trash2, Mail, Copy, Check, Shield, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
  createdBy?: string;
}

interface CreateFormData {
  email: string;
  name: string;
  role: "user" | "admin";
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [lastCreated, setLastCreated] = useState<{ email: string; password: string } | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateFormData>({ email: "", name: "", role: "user" });
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        if (res.status === 403) {
          router.push("/");
          return;
        }
        throw new Error("Fehler beim Laden der Benutzer");
      }
      const data = await res.json();
      setUsers(data.users ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateError(data.error ?? "Fehler beim Erstellen");
        return;
      }
      setLastCreated({ email: form.email, password: data.generatedPassword });
      setForm({ email: "", name: "", role: "user" });
      setShowCreate(false);
      fetchUsers();
    } catch {
      setCreateError("Netzwerkfehler");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Benutzer "${email}" wirklich löschen?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Fehler beim Löschen");
        return;
      }
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Netzwerkfehler");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const copyPassword = async () => {
    if (!lastCreated) return;
    await navigator.clipboard.writeText(lastCreated.password);
    setCopiedPassword(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopiedPassword(false), 2000);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2E3641 100%)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(26,26,26,0.9)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255,184,0,0.15)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Zap size={20} style={{ color: "#FFB800" }} />
              <span className="font-bold" style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                Prompting <span style={{ color: "#FFB800" }}>Hack</span>
              </span>
            </Link>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-1.5 text-sm text-white/60">
              <Shield size={14} style={{ color: "#FFB800" }} />
              <span>Admin</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <LogOut size={14} />
            Abmelden
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Page title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
            >
              Benutzerverwaltung
            </h1>
            <p className="text-sm text-white/40">
              {users.length} {users.length === 1 ? "Benutzer" : "Benutzer"} registriert
            </p>
          </div>
          <button
            onClick={() => { setShowCreate(true); setCreateError(""); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: "#FFB800", color: "#2E3641" }}
          >
            <Plus size={16} />
            Benutzer anlegen
          </button>
        </div>

        {/* Success banner after creation */}
        {lastCreated && (
          <div
            className="mb-6 rounded-xl p-4"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} style={{ color: "#4ade80" }} />
                  <span className="text-sm font-semibold" style={{ color: "#4ade80" }}>
                    Benutzer angelegt &amp; Willkommens-E-Mail versandt
                  </span>
                </div>
                <p className="text-xs text-white/50 mb-1">E-Mail: <span className="text-white/80">{lastCreated.email}</span></p>
                <div className="flex items-center gap-2 mt-2">
                  <code
                    className="text-xs px-2 py-1 rounded font-mono"
                    style={{ background: "rgba(255,255,255,0.08)", color: "#4ade80" }}
                  >
                    {lastCreated.password}
                  </code>
                  <button
                    onClick={copyPassword}
                    className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    {copiedPassword ? <Check size={12} style={{ color: "#4ade80" }} /> : <Copy size={12} />}
                    {copiedPassword ? "Kopiert" : "Kopieren"}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setLastCreated(null)}
                className="text-white/30 hover:text-white/60 text-lg leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Create form modal */}
        {showCreate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowCreate(false); }}
          >
            <div
              className="w-full max-w-md rounded-2xl p-6"
              style={{
                background: "#1E2830",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-lg font-bold mb-5" style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                Neuen Benutzer anlegen
              </h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Max Mustermann"
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">E-Mail</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="max@mecklenburgische.de"
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Rolle</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "user" | "admin" }))}
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                    }}
                  >
                    <option value="user" style={{ background: "#1E2830" }}>Benutzer</option>
                    <option value="admin" style={{ background: "#1E2830" }}>Admin</option>
                  </select>
                </div>

                {createError && (
                  <p
                    className="text-xs px-3 py-2 rounded-lg"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}
                  >
                    {createError}
                  </p>
                )}

                <p className="text-xs text-white/30">
                  Ein sicheres Passwort wird automatisch generiert und per E-Mail versandt.
                </p>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-60"
                    style={{ background: "#FFB800", color: "#2E3641" }}
                  >
                    {creating ? "Anlegen…" : "Anlegen"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User list */}
        {loading ? (
          <div className="text-center py-20 text-white/30">Lade Benutzer…</div>
        ) : error ? (
          <div
            className="text-sm px-4 py-3 rounded-xl"
            style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}
          >
            {error}
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              className="grid text-xs text-white/40 uppercase tracking-wider px-5 py-3"
              style={{
                gridTemplateColumns: "1fr 1fr auto auto",
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span>Name</span>
              <span>E-Mail</span>
              <span>Rolle</span>
              <span />
            </div>

            {users.length === 0 ? (
              <div className="py-12 text-center text-white/30 text-sm">
                <Users size={32} className="mx-auto mb-3 opacity-30" />
                Noch keine Benutzer
              </div>
            ) : (
              users.map((user, i) => (
                <div
                  key={user.id}
                  className="grid items-center px-5 py-4 transition-colors"
                  style={{
                    gridTemplateColumns: "1fr 1fr auto auto",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
                    background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
                  }}
                >
                  <div>
                    <div className="text-sm font-medium">{user.name}</div>
                    {user.createdBy && (
                      <div className="text-xs text-white/30 mt-0.5">
                        Erstellt von {user.createdBy}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-white/60 font-mono text-xs">{user.email}</div>
                  <div className="px-4">
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={
                        user.role === "admin"
                          ? { background: "rgba(255,184,0,0.15)", color: "#FFB800" }
                          : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }
                      }
                    >
                      {user.role === "admin" && <Shield size={10} />}
                      {user.role === "admin" ? "Admin" : "Benutzer"}
                    </span>
                  </div>
                  <div className="pl-4">
                    <button
                      onClick={() => handleDelete(user.id, user.email)}
                      disabled={deletingId === user.id}
                      className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
                      title="Benutzer löschen"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Stats footer */}
        {!loading && !error && users.length > 0 && (
          <div className="mt-4 text-xs text-white/25 text-right">
            {users.filter((u) => u.role === "admin").length} Admin(s) ·{" "}
            {users.filter((u) => u.role === "user").length} Benutzer
          </div>
        )}
      </main>
    </div>
  );
}
