"use client";

import React, { useEffect, useRef, useState } from "react";
import { Trophy, RotateCcw, Home, Star } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Confetti } from "@/components/celebration/Confetti";
import { Button } from "@/components/ui/Button";
import { useGame } from "@/context/GameContext";
import { getOverallProgress } from "@/lib/storage";
import { SCENARIOS, SCENARIO_ORDER } from "@/lib/scenarios";

export default function ChampionPage() {
  const { state, resetAll } = useGame();
  const progress = getOverallProgress(state);
  const [confetti, setConfetti] = useState(false);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;
    // Defer to next tick to avoid setting state synchronously in effect body
    const id = requestAnimationFrame(() => setConfetti(true));
    const t = setTimeout(() => setConfetti(false), 5000);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, []);

  const totalAttempts = state.totalAttempts;
  const allBestScores: number[] = [];
  for (const id of SCENARIO_ORDER) {
    const sp = state.scenarios[id];
    for (let l = 1; l <= 5; l++) {
      const lp = sp?.levels[l];
      if (lp?.bestScore) allBestScores.push(lp.bestScore);
    }
  }
  const avgScore =
    allBestScores.length > 0
      ? Math.round(allBestScores.reduce((a, b) => a + b, 0) / allBestScores.length)
      : 0;

  const handleReset = () => {
    if (window.confirm("Wirklich alle Fortschritte zurücksetzen?")) {
      resetAll();
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Confetti active={confetti} count={120} />

      <main className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full px-4 sm:px-6 py-16 text-center">
        {/* Trophy */}
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
          style={{
            background: "rgba(255,184,0,0.15)",
            border: "2px solid rgba(255,184,0,0.4)",
            boxShadow: "0 0 60px rgba(255,184,0,0.3)",
          }}
        >
          <Trophy size={52} style={{ color: "#FFB800" }} />
        </div>

        <h1
          className="text-4xl sm:text-5xl font-black mb-3"
          style={{
            fontFamily: "var(--font-sora-var, Sora, sans-serif)",
            color: "#FFB800",
          }}
        >
          Du bist ein echter
        </h1>
        <h2
          className="text-5xl sm:text-6xl font-black mb-6 glow-gold"
          style={{
            fontFamily: "var(--font-sora-var, Sora, sans-serif)",
            color: "#FFB800",
          }}
        >
          Prompting Champion!
        </h2>

        <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
          Herzlichen Glückwunsch! Du hast alle {SCENARIO_ORDER.length} Szenarien
          und alle {SCENARIO_ORDER.length * 5} Level gemeistert. Du beherrschst
          professionelles Prompt Engineering im Versicherungskontext.
        </p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={28}
              fill="#FFB800"
              className="animate-pulse"
              style={{
                color: "#FFB800",
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 w-full max-w-sm">
          <div
            className="rounded-xl p-4 text-center"
            style={{
              background: "rgba(255,184,0,0.1)",
              border: "1px solid rgba(255,184,0,0.2)",
            }}
          >
            <div
              className="text-2xl font-bold font-mono"
              style={{ color: "#FFB800" }}
            >
              {progress.completedLevels}
            </div>
            <div className="text-xs text-white/40 mt-1">
              Level
              <br />
              bestanden
            </div>
          </div>
          <div
            className="rounded-xl p-4 text-center"
            style={{
              background: "rgba(76,175,80,0.1)",
              border: "1px solid rgba(76,175,80,0.2)",
            }}
          >
            <div
              className="text-2xl font-bold font-mono"
              style={{ color: "#4CAF50" }}
            >
              {avgScore}%
            </div>
            <div className="text-xs text-white/40 mt-1">Ø Score</div>
          </div>
          <div
            className="rounded-xl p-4 text-center"
            style={{
              background: "rgba(93,155,213,0.1)",
              border: "1px solid rgba(93,155,213,0.2)",
            }}
          >
            <div
              className="text-2xl font-bold font-mono"
              style={{ color: "#5B9BD5" }}
            >
              {totalAttempts}
            </div>
            <div className="text-xs text-white/40 mt-1">
              Versuche
              <br />
              gesamt
            </div>
          </div>
        </div>

        {/* Scenario scores */}
        <div className="w-full max-w-md mb-10">
          <h3 className="text-sm font-semibold text-white/50 mb-4">
            Deine Bestleistungen
          </h3>
          <div className="flex flex-col gap-2">
            {SCENARIO_ORDER.map((id) => {
              const sp = state.scenarios[id];
              const bestScores = Object.values(sp?.levels ?? {})
                .map((l) => l.bestScore)
                .filter(Boolean);
              const avg =
                bestScores.length > 0
                  ? Math.round(
                      bestScores.reduce((a, b) => a + b, 0) / bestScores.length
                    )
                  : 0;
              return (
                <div
                  key={id}
                  className="flex items-center justify-between px-4 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <span className="text-sm text-white/60">
                    {SCENARIOS[id].title}
                  </span>
                  <span
                    className="text-sm font-mono font-bold"
                    style={{ color: "#FFB800" }}
                  >
                    Ø {avg}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button variant="gold" size="lg">
              <Home size={16} />
              Zur Startseite
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={handleReset}>
            <RotateCcw size={16} />
            Nochmal spielen
          </Button>
        </div>
      </main>

      <footer
        className="border-t py-5 text-center text-xs text-white/30"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        Ein Projekt der Mecklenburgischen Versicherung — Unternehmensentwicklung
      </footer>
    </div>
  );
}
