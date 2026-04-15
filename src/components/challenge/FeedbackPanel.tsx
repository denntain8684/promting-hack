"use client";

import React from "react";
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { EvaluationResult } from "@/lib/types";

interface FeedbackPanelProps {
  result: EvaluationResult | null;
  threshold: number;
  levelPassed: boolean;
  onNextLevel: () => void;
  hint: string | null;
  attempts: number;
}

const CRITERIA_COLORS = [
  "#FFB800",
  "#5B9BD5",
  "#8DA69D",
  "#FF8C00",
  "#4CAF50",
  "#E53935",
  "#A8BFB7",
];

function ScoreRing({ score }: { score: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  const color =
    score >= 90
      ? "#4CAF50"
      : score >= 70
      ? "#FFB800"
      : score >= 50
      ? "#5B9BD5"
      : "#E53935";

  return (
    <div className="relative inline-flex items-center justify-center w-28 h-28">
      <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
        <circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="score-ring transition-all duration-1000 ease-out"
          style={{ transform: "rotate(-90deg)", transformOrigin: "56px 56px" }}
        />
      </svg>
      <div className="absolute text-center">
        <div
          className="text-3xl font-bold font-mono"
          style={{ color, lineHeight: 1 }}
        >
          {score}
        </div>
        <div className="text-xs text-white/40">/ 100</div>
      </div>
    </div>
  );
}

export function FeedbackPanel({
  result,
  threshold,
  levelPassed,
  onNextLevel,
  hint,
  attempts,
}: FeedbackPanelProps) {
  const [hintOpen, setHintOpen] = React.useState(false);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-48 text-center gap-3">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,184,0,0.1)" }}
        >
          <span className="text-3xl">🎯</span>
        </div>
        <p className="text-white/40 text-sm max-w-xs">
          Gib deinen Prompt ein und klicke auf &ldquo;Prompt bewerten&rdquo; um Feedback zu erhalten.
        </p>
        <div className="text-xs text-white/30">
          Schwelle zum Bestehen: {threshold}%
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Score */}
      <div className="flex items-center gap-5">
        <ScoreRing score={result.totalScore} />
        <div>
          <div className="text-sm text-white/50 mb-1">Gesamt-Score</div>
          {levelPassed ? (
            <div
              className="flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "#4CAF50" }}
            >
              <CheckCircle2 size={16} />
              Level bestanden!
            </div>
          ) : (
            <div className="text-sm text-white/60">
              Noch {threshold - result.totalScore} Punkte bis zum Bestehen
            </div>
          )}
          <div className="text-xs text-white/30 mt-1">
            Quelle:{" "}
            {result.source === "ai" ? "KI-Bewertung" : "Regelbasiert"}
          </div>
        </div>
      </div>

      {/* Pass threshold indicator */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/50">Fortschritt zur Schwelle ({threshold}%)</span>
          <span className="font-mono" style={{ color: levelPassed ? "#4CAF50" : "#FFB800" }}>
            {result.totalScore}%
          </span>
        </div>
        <div className="relative">
          <ProgressBar
            value={result.totalScore}
            max={100}
            color={levelPassed ? "#4CAF50" : "#FFB800"}
            height="normal"
          />
          {/* Threshold marker */}
          <div
            className="absolute top-0 h-full w-0.5 opacity-60"
            style={{
              left: `${threshold}%`,
              backgroundColor: "#FAFAFA",
            }}
          />
        </div>
      </div>

      {/* Criteria */}
      {result.criteria.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white/70">
            Einzelbewertung
          </h4>
          {result.criteria.map((c, i) => (
            <div key={c.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/60">{c.name}</span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: CRITERIA_COLORS[i % CRITERIA_COLORS.length] }}
                >
                  {c.score}%
                </span>
              </div>
              <ProgressBar
                value={c.score}
                max={100}
                color={CRITERIA_COLORS[i % CRITERIA_COLORS.length]}
                height="thin"
              />
              {c.feedback && (
                <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
                  {c.feedback}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Strengths */}
      {result.strengths.length > 0 && (
        <div
          className="rounded-lg p-3"
          style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.2)" }}
        >
          <div className="text-xs font-semibold mb-1.5" style={{ color: "#4CAF50" }}>
            ✓ Stärken
          </div>
          <ul className="flex flex-col gap-1">
            {result.strengths.map((s, i) => (
              <li key={i} className="text-xs text-white/60">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {result.improvements.length > 0 && (
        <div
          className="rounded-lg p-3"
          style={{
            background: "rgba(255,184,0,0.08)",
            border: "1px solid rgba(255,184,0,0.2)",
          }}
        >
          <div className="text-xs font-semibold mb-1.5" style={{ color: "#FFB800" }}>
            → Verbesserungsvorschläge
          </div>
          <ul className="flex flex-col gap-1.5">
            {result.improvements.map((imp, i) => (
              <li key={i} className="text-xs text-white/60 leading-relaxed">
                {imp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hint */}
      {hint && (
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: "1px solid rgba(141,166,157,0.3)" }}
        >
          <button
            type="button"
            onClick={() => setHintOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium"
            style={{
              color: "#8DA69D",
              background: "rgba(141,166,157,0.1)",
            }}
          >
            <div className="flex items-center gap-2">
              <Lightbulb size={13} />
              <span>
                Hilfestellung verfügbar (nach {attempts} Versuchen)
              </span>
            </div>
            {hintOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          {hintOpen && (
            <div
              className="px-4 pb-3 pt-2 text-xs text-white/60 leading-relaxed"
              style={{ background: "rgba(141,166,157,0.05)" }}
            >
              {hint}
            </div>
          )}
        </div>
      )}

      {/* Overall feedback */}
      <p className="text-sm text-white/50 italic leading-relaxed">
        {result.overallFeedback}
      </p>

      {/* Next level button */}
      {levelPassed && (
        <Button
          variant="gold"
          size="md"
          onClick={onNextLevel}
          className="w-full"
        >
          Weiter zum nächsten Level
          <ArrowRight size={16} />
        </Button>
      )}
    </div>
  );
}
