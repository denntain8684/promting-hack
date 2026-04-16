"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Shield, LogOut } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { getOverallProgress } from "@/lib/storage";

interface SessionUser {
  email: string;
  role: "admin" | "user";
}

export function Header() {
  const { state } = useGame();
  const router = useRouter();
  const progress = getOverallProgress(state);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: "rgba(26,26,26,0.9)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(255,184,0,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Zur Startseite"
        >
          <Zap
            size={22}
            className="transition-colors"
            style={{ color: "#FFB800" }}
          />
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
          >
            Prompting{" "}
            <span className="glow-gold" style={{ color: "#FFB800" }}>
              Hack
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-white/50">Gesamtfortschritt</span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      i < progress.completedScenarios
                        ? "#FFB800"
                        : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
            <span
              className="text-sm font-mono font-bold"
              style={{ color: "#FFB800" }}
            >
              {progress.completedLevels}/{progress.totalLevels}
            </span>
          </div>

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <Shield size={13} style={{ color: "#FFB800" }} />
              Admin
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
              title={user.email}
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Abmelden</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
