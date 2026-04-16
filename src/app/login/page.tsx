"use client";

import React, { Suspense, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Zap, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Anmeldung fehlgeschlagen.");
          return;
        }

        router.push(from.startsWith("/") ? from : "/");
        router.refresh();
      } catch {
        setError("Netzwerkfehler. Bitte versuche es erneut.");
      } finally {
        setLoading(false);
      }
    },
    [email, password, router, from]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm text-white/50 mb-1.5">
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-sm outline-none"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
          }}
          placeholder="deine@email.de"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-white/50 mb-1.5">
          Passwort
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-3 pr-11 text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
            }}
            placeholder="••••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <p
          className="text-sm px-3 py-2 rounded-lg"
          style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg font-semibold text-sm transition-opacity disabled:opacity-60"
        style={{ background: "#FFB800", color: "#2E3641" }}
      >
        {loading ? "Anmelden…" : "Anmelden"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2E3641 100%)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Zap size={28} style={{ color: "#FFB800" }} />
          <span
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
          >
            Prompting{" "}
            <span style={{ color: "#FFB800" }}>Hack</span>
          </span>
        </div>

        <h1 className="text-lg font-semibold text-white/80 text-center mb-6">
          Anmelden
        </h1>

        <Suspense fallback={<div className="text-center text-white/30 py-4">Lade…</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-xs text-white/20 text-center mt-6">
          Mecklenburgische Versicherung · Unternehmensentwicklung
        </p>
      </div>
    </div>
  );
}
