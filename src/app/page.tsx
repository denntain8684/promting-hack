"use client";

import React from "react";
import { Zap, Trophy, Target } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ScenarioCard } from "@/components/scenario/ScenarioCard";
import { useGame } from "@/context/GameContext";
import { SCENARIOS, SCENARIO_ORDER } from "@/lib/scenarios";
import { getOverallProgress } from "@/lib/storage";

function OverallProgressRing({ pct }: { pct: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <div className="relative inline-flex items-center justify-center w-20 h-20">
      <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#FFB800"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "40px 40px",
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-sm font-bold font-mono" style={{ color: "#FFB800" }}>
          {pct}%
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { state } = useGame();
  const progress = getOverallProgress(state);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Hero */}
        <section className="mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap size={28} style={{ color: "#FFB800" }} />
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
            >
              Prompting{" "}
              <span className="glow-gold" style={{ color: "#FFB800" }}>
                Hack
              </span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
            Werde zum Prompt-Champion —{" "}
            <span style={{ color: "#8DA69D" }}>
              Trainiere KI-Prompting im Versicherungskontext
            </span>
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <OverallProgressRing pct={progress.percentage} />
              <div className="text-left">
                <div className="text-xs text-white/40 mb-0.5">Gesamtfortschritt</div>
                <div className="text-lg font-bold font-mono" style={{ color: "#FFB800" }}>
                  {progress.completedLevels} / {progress.totalLevels} Level
                </div>
                <div className="text-xs text-white/40">
                  {progress.completedScenarios} von {progress.totalScenarios} Szenarien abgeschlossen
                </div>
              </div>
            </div>

            <div
              className="hidden sm:block w-px h-12 opacity-20"
              style={{ background: "#FAFAFA" }}
            />

            <div className="flex items-center gap-3 text-left">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(93,155,213,0.15)" }}
              >
                <Target size={22} style={{ color: "#5B9BD5" }} />
              </div>
              <div>
                <div className="text-xs text-white/40 mb-0.5">Szenarien</div>
                <div className="text-lg font-bold">5 Herausforderungen</div>
                <div className="text-xs text-white/40">Level 1–5 pro Szenario</div>
              </div>
            </div>

            <div
              className="hidden sm:block w-px h-12 opacity-20"
              style={{ background: "#FAFAFA" }}
            />

            <div className="flex items-center gap-3 text-left">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,184,0,0.15)" }}
              >
                <Trophy size={22} style={{ color: "#FFB800" }} />
              </div>
              <div>
                <div className="text-xs text-white/40 mb-0.5">Ziel</div>
                <div className="text-lg font-bold">Champion werden</div>
                <div className="text-xs text-white/40">Alle 25 Level meistern</div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div
            className="inline-flex items-center gap-6 rounded-xl px-6 py-3 text-sm"
            style={{
              background: "rgba(255,184,0,0.08)",
              border: "1px solid rgba(255,184,0,0.2)",
            }}
          >
            <span className="text-white/50">So funktioniert&apos;s:</span>
            <span className="text-white/70">1. Szenario wählen</span>
            <span style={{ color: "#FFB800" }}>→</span>
            <span className="text-white/70">2. Prompt schreiben</span>
            <span style={{ color: "#FFB800" }}>→</span>
            <span className="text-white/70">3. Feedback erhalten</span>
            <span style={{ color: "#FFB800" }}>→</span>
            <span className="text-white/70">4. Level meistern</span>
          </div>
        </section>

        {/* Scenario Grid */}
        <section aria-label="Szenarien">
          <h2
            className="text-xl font-bold mb-6"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
          >
            Deine Szenarien
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SCENARIO_ORDER.map((id, index) => (
              <ScenarioCard
                key={id}
                scenario={SCENARIOS[id]}
                progress={state.scenarios[id]}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t mt-16 py-6 text-center text-xs text-white/30"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        Ein Projekt der Mecklenburgischen Versicherung — Unternehmensentwicklung
      </footer>
    </div>
  );
}
