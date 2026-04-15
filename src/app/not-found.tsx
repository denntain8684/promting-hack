import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div
        className="text-8xl font-black mb-4"
        style={{ color: "#FFB800", fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
      >
        404
      </div>
      <h1 className="text-2xl font-bold mb-3">Seite nicht gefunden</h1>
      <p className="text-white/50 mb-8">
        Die gesuchte Seite existiert nicht.
      </p>
      <Link
        href="/"
        className="btn-gold"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
