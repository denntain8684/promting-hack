"use client";

import React from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  Activity, AlertOctagon, ArrowLeft, Award, BarChart3, BookOpen, Briefcase,
  Building, Building2, Car, CheckCircle2, ChevronRight, ClipboardCheck,
  CloudRain, Database, DollarSign, Droplets, FileEdit, FileText, GitBranch,
  GraduationCap, Heart, HelpCircle, Lock, Mail, Megaphone, Monitor,
  Package, PiggyBank, RefreshCw, Scale, Search, Shield, TrendingUp,
  UserCheck, Users, XCircle,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useGame } from "@/context/GameContext";
import { SCENARIOS } from "@/lib/scenarios";
import type { ScenarioId } from "@/lib/types";

const ICONS: Record<string, React.ElementType> = {
  Activity, AlertOctagon, Award, BarChart3, BookOpen, Briefcase,
  Building, Building2, Car, ClipboardCheck, CloudRain,
  Database, DollarSign, Droplets, FileEdit, FileText, GitBranch,
  GraduationCap, Heart, HelpCircle, Lock, Mail, Megaphone, Monitor,
  Package, PiggyBank, RefreshCw, Scale, Search, Shield, TrendingUp,
  UserCheck, Users, XCircle,
};

const LEVEL_COLORS = ["#8DA69D", "#5B9BD5", "#FFB800", "#FF8C00", "#E53935"];

export default function ScenarioPage() {
  const params = useParams();
  const router = useRouter();
  const { state } = useGame();
  const id = params.id as ScenarioId;

  const scenario = SCENARIOS[id];
  if (!scenario) notFound();

  const progress = state.scenarios[id];
  const Icon = ICONS[scenario.icon] || FileText;
  const currentLevel = progress?.currentLevel ?? 1;

  const handleStartLevel = () => {
    router.push(`/szenario/${id}/level/${currentLevel}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Zur Übersicht
        </Link>

        {/* Scenario header */}
        <div className="flex flex-col sm:flex-row items-start gap-5 mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${LEVEL_COLORS[currentLevel - 1]}20`,
              border: `1px solid ${LEVEL_COLORS[currentLevel - 1]}40`,
            }}
          >
            <Icon size={30} style={{ color: LEVEL_COLORS[currentLevel - 1] }} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1
                className="text-2xl sm:text-3xl font-black"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
              >
                {scenario.title}
              </h1>
              {progress?.completed && (
                <Badge variant="success">Abgeschlossen ✓</Badge>
              )}
            </div>
            <p className="text-white/60 leading-relaxed mb-3">
              {scenario.shortDescription}
            </p>
            <p className="text-sm text-white/40 leading-relaxed">
              {scenario.context}
            </p>
          </div>
        </div>

        {/* Level stepper */}
        <div className="mb-10">
          <h2
            className="text-lg font-bold mb-5"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
          >
            Level-Übersicht
          </h2>

          {/* Desktop stepper */}
          <div className="hidden md:flex items-start gap-0">
            {scenario.levels.map((lvl, i) => {
              const lProgress = progress?.levels[lvl.level];
              const isCompleted = lProgress?.completed ?? false;
              const isActive = lvl.level === currentLevel && !progress?.completed;
              const isLocked = lvl.level > currentLevel && !progress?.completed;
              const color = LEVEL_COLORS[i];

              return (
                <React.Fragment key={lvl.level}>
                  <div className="flex flex-col items-center flex-1 relative">
                    {/* Node */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300"
                      style={{
                        background: isCompleted
                          ? "#4CAF50"
                          : isActive
                          ? color
                          : "rgba(255,255,255,0.08)",
                        border: isActive
                          ? `2px solid ${color}`
                          : isCompleted
                          ? "2px solid #4CAF50"
                          : "2px solid rgba(255,255,255,0.12)",
                        boxShadow: isActive
                          ? `0 0 16px ${color}60`
                          : undefined,
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={18} color="#fff" />
                      ) : isLocked ? (
                        <Lock size={16} color="rgba(255,255,255,0.3)" />
                      ) : (
                        <span
                          className="text-sm font-bold"
                          style={{ color: isActive ? "#1A1A1A" : "rgba(255,255,255,0.5)" }}
                        >
                          {lvl.level}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <div className="mt-2 text-center">
                      <div
                        className="text-xs font-semibold"
                        style={{
                          color: isCompleted
                            ? "#4CAF50"
                            : isActive
                            ? color
                            : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {lvl.name}
                      </div>
                      <div className="text-xs text-white/30 mt-0.5 max-w-20 mx-auto leading-tight">
                        {lvl.threshold}% Schwelle
                      </div>
                      {lProgress?.bestScore > 0 && (
                        <div
                          className="text-xs font-mono mt-0.5"
                          style={{ color: isCompleted ? "#4CAF50" : color }}
                        >
                          Beste: {lProgress.bestScore}%
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connector */}
                  {i < 4 && (
                    <div
                      className="flex-none w-8 h-0.5 mt-5 transition-colors"
                      style={{
                        background:
                          isCompleted
                            ? "#4CAF50"
                            : "rgba(255,255,255,0.08)",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile list */}
          <div className="md:hidden flex flex-col gap-3">
            {scenario.levels.map((lvl, i) => {
              const lProgress = progress?.levels[lvl.level];
              const isCompleted = lProgress?.completed ?? false;
              const isActive = lvl.level === currentLevel && !progress?.completed;
              const isLocked = lvl.level > currentLevel && !progress?.completed;
              const color = LEVEL_COLORS[i];

              return (
                <div
                  key={lvl.level}
                  className="flex items-center gap-4 rounded-xl p-4"
                  style={{
                    background: isActive
                      ? `${color}10`
                      : "rgba(255,255,255,0.03)",
                    border: isActive
                      ? `1px solid ${color}30`
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isCompleted
                        ? "#4CAF50"
                        : isActive
                        ? color
                        : "rgba(255,255,255,0.06)",
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={16} color="#fff" />
                    ) : isLocked ? (
                      <Lock size={14} color="rgba(255,255,255,0.25)" />
                    ) : (
                      <span
                        className="text-sm font-bold"
                        style={{ color: isActive ? "#1A1A1A" : "rgba(255,255,255,0.4)" }}
                      >
                        {lvl.level}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-sm font-semibold"
                      style={{ color: isActive ? color : isCompleted ? "#4CAF50" : "rgba(255,255,255,0.5)" }}
                    >
                      Level {lvl.level}: {lvl.name}
                    </div>
                    <div className="text-xs text-white/30">{lvl.focus}</div>
                  </div>
                  {lProgress?.bestScore > 0 && (
                    <div className="text-xs font-mono text-white/40">
                      {lProgress.bestScore}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            variant="gold"
            size="lg"
            onClick={handleStartLevel}
            className="w-full sm:w-auto"
          >
            {progress?.completed ? "Nochmal spielen" : `Level ${currentLevel} starten`}
            <ChevronRight size={16} />
          </Button>
          {progress?.completed && (
            <Badge variant="success" size="md">
              Szenario vollständig abgeschlossen ✓
            </Badge>
          )}
        </div>
      </main>

      <footer
        className="border-t mt-16 py-6 text-center text-xs text-white/30"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        Ein Projekt der Mecklenburgischen Versicherung — Unternehmensentwicklung
      </footer>
    </div>
  );
}
