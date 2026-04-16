"use client";

import React, { useState, useMemo } from "react";
import {
  Zap, Trophy, Target, ChevronRight, ArrowLeft,
  Building2, TrendingUp, AlertTriangle, FileText, Shield, Heart, Star, Megaphone, GraduationCap,
  Kanban, GitBranch, Layers, LayoutDashboard, ClipboardList, Compass, MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ScenarioCard } from "@/components/scenario/ScenarioCard";
import { useGame } from "@/context/GameContext";
import { SCENARIOS, SCENARIO_ORDER } from "@/lib/scenarios";
import { CATEGORIES } from "@/lib/categories";
import { getOverallProgress } from "@/lib/storage";
import type { CategoryId, SubcategoryId, Category, Subcategory } from "@/lib/types";

// ── Icon registry ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, TrendingUp, AlertTriangle, FileText, Shield, Heart, Star, Megaphone, GraduationCap,
  Kanban, GitBranch, Layers, LayoutDashboard, ClipboardList, Compass, MessageSquare,
};

function CategoryIcon({ name, size = 24, style }: { name: string; size?: number; style?: React.CSSProperties }) {
  const Icon = ICON_MAP[name] ?? Zap;
  return <Icon size={size} style={style} />;
}

// ── Progress ring ─────────────────────────────────────────────────────────────

function OverallProgressRing({ pct }: { pct: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <div className="relative inline-flex items-center justify-center w-20 h-20">
      <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={r} fill="none" stroke="#FFB800" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "40px 40px", transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-sm font-bold font-mono" style={{ color: "#FFB800" }}>{pct}%</div>
      </div>
    </div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  completedScenarios,
  totalScenarios,
  completedLevels,
  totalLevels,
  onClick,
}: {
  category: Category;
  completedScenarios: number;
  totalScenarios: number;
  completedLevels: number;
  totalLevels: number;
  onClick: () => void;
}) {
  const pct = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;
  const allDone = completedScenarios === totalScenarios && totalScenarios > 0;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl p-5 transition-all duration-200 group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: allDone
          ? "1px solid rgba(255,184,0,0.4)"
          : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,184,0,0.12)" }}
        >
          <CategoryIcon name={category.icon} size={20} style={{ color: "#FFB800" }} />
        </div>
        <div className="flex items-center gap-1 text-white/20 group-hover:text-white/50 transition-colors">
          <ChevronRight size={16} />
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-1 leading-snug">{category.title}</h3>
      {category.description && (
        <p className="text-xs text-white/40 mb-4 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      )}

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-white/30">
          <span>{completedScenarios}/{totalScenarios} Szenarien</span>
          <span style={{ color: pct > 0 ? "#FFB800" : undefined }}>{pct}%</span>
        </div>
        <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: "#FFB800" }}
          />
        </div>
        {category.subcategories && (
          <p className="text-xs text-white/25 pt-0.5">
            {category.subcategories.length} Unterbereiche
          </p>
        )}
      </div>
    </button>
  );
}

// ── Subcategory tab ───────────────────────────────────────────────────────────

function SubcategoryTab({
  sub,
  active,
  completedLevels,
  totalLevels,
  onClick,
}: {
  sub: Subcategory;
  active: boolean;
  completedLevels: number;
  totalLevels: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
      style={
        active
          ? { background: "#FFB800", color: "#2E3641" }
          : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }
      }
    >
      <CategoryIcon name={sub.icon} size={11} />
      {sub.title}
      {totalLevels > 0 && (
        <span
          className="ml-1 text-xs opacity-70"
          style={{ color: active ? "#2E3641" : "rgba(255,255,255,0.35)" }}
        >
          {completedLevels}/{totalLevels}
        </span>
      )}
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { state } = useGame();
  const progress = getOverallProgress(state);
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<SubcategoryId | null>(null);

  const totalScenarioCount = SCENARIO_ORDER.length;
  const totalLevelCount = totalScenarioCount * 5;

  // Compute per-category stats
  const categoryStats = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const catScenarioIds = SCENARIO_ORDER.filter((id) => SCENARIOS[id]?.categoryId === cat.id);
      let completedScenarios = 0;
      let completedLevels = 0;
      for (const id of catScenarioIds) {
        const sp = state.scenarios[id];
        if (!sp) continue;
        if (sp.completed) completedScenarios++;
        for (const lp of Object.values(sp.levels)) {
          if (lp.completed) completedLevels++;
        }
      }
      return {
        categoryId: cat.id,
        completedScenarios,
        totalScenarios: catScenarioIds.length,
        completedLevels,
        totalLevels: catScenarioIds.length * 5,
      };
    });
  }, [state]);

  // For selected category, compute sub-stats and filtered scenario list
  const selectedCategory = selectedCategoryId
    ? CATEGORIES.find((c) => c.id === selectedCategoryId) ?? null
    : null;

  const subcategoryStats = useMemo(() => {
    if (!selectedCategory?.subcategories) return [];
    return selectedCategory.subcategories.map((sub) => {
      const subScenarioIds = SCENARIO_ORDER.filter(
        (id) => SCENARIOS[id]?.subcategoryId === sub.id
      );
      let completedLevels = 0;
      for (const id of subScenarioIds) {
        for (const lp of Object.values(state.scenarios[id]?.levels ?? {})) {
          if (lp.completed) completedLevels++;
        }
      }
      return {
        subcategoryId: sub.id,
        completedLevels,
        totalLevels: subScenarioIds.length * 5,
      };
    });
  }, [selectedCategory, state]);

  const visibleScenarioIds = useMemo(() => {
    if (!selectedCategoryId) return [];
    return SCENARIO_ORDER.filter((id) => {
      const s = SCENARIOS[id];
      if (!s || s.categoryId !== selectedCategoryId) return false;
      if (selectedSubcategoryId && s.subcategoryId !== selectedSubcategoryId) return false;
      return true;
    });
  }, [selectedCategoryId, selectedSubcategoryId]);

  const handleSelectCategory = (id: CategoryId) => {
    setSelectedCategoryId(id);
    setSelectedSubcategoryId(null);
  };

  const handleBack = () => {
    setSelectedCategoryId(null);
    setSelectedSubcategoryId(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Hero */}
        <section className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap size={28} style={{ color: "#FFB800" }} />
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
            >
              Prompting{" "}
              <span className="glow-gold" style={{ color: "#FFB800" }}>Hack</span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
            Werde zum Prompt-Champion —{" "}
            <span style={{ color: "#8DA69D" }}>Trainiere KI-Prompting im Versicherungskontext</span>
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

            <div className="hidden sm:block w-px h-12 opacity-20" style={{ background: "#FAFAFA" }} />

            <div className="flex items-center gap-3 text-left">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(93,155,213,0.15)" }}
              >
                <Target size={22} style={{ color: "#5B9BD5" }} />
              </div>
              <div>
                <div className="text-xs text-white/40 mb-0.5">Szenarien</div>
                <div className="text-lg font-bold">{totalScenarioCount} Herausforderungen</div>
                <div className="text-xs text-white/40">Level 1–5 pro Szenario</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 opacity-20" style={{ background: "#FAFAFA" }} />

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
                <div className="text-xs text-white/40">Alle {totalLevelCount} Level meistern</div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div
            className="inline-flex items-center gap-6 rounded-xl px-6 py-3 text-sm"
            style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)" }}
          >
            <span className="text-white/50">So funktioniert&apos;s:</span>
            <span className="text-white/70">1. Kategorie wählen</span>
            <span style={{ color: "#FFB800" }}>→</span>
            <span className="text-white/70">2. Szenario starten</span>
            <span style={{ color: "#FFB800" }}>→</span>
            <span className="text-white/70">3. Prompt schreiben</span>
            <span style={{ color: "#FFB800" }}>→</span>
            <span className="text-white/70">4. Level meistern</span>
          </div>
        </section>

        {/* Category browsing or scenario list */}
        {!selectedCategoryId ? (
          // ── Category grid ───────────────────────────────────────────────────
          <section aria-label="Kategorien">
            <h2
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
            >
              Kategorien
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => {
                const stats = categoryStats.find((s) => s.categoryId === cat.id)!;
                return (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    completedScenarios={stats.completedScenarios}
                    totalScenarios={stats.totalScenarios}
                    completedLevels={stats.completedLevels}
                    totalLevels={stats.totalLevels}
                    onClick={() => handleSelectCategory(cat.id)}
                  />
                );
              })}
            </div>
          </section>
        ) : (
          // ── Scenario drill-down ─────────────────────────────────────────────
          <section aria-label="Szenarien">
            {/* Back navigation */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                <ArrowLeft size={16} />
                Alle Kategorien
              </button>
              <span className="text-white/20">/</span>
              <div className="flex items-center gap-2">
                <CategoryIcon
                  name={selectedCategory?.icon ?? "Zap"}
                  size={16}
                  style={{ color: "#FFB800" }}
                />
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
                >
                  {selectedCategory?.title}
                </h2>
              </div>
            </div>

            {/* Subcategory filter (UE only) */}
            {selectedCategory?.subcategories && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedSubcategoryId(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                  style={
                    selectedSubcategoryId === null
                      ? { background: "#FFB800", color: "#2E3641" }
                      : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }
                  }
                >
                  Alle
                </button>
                {selectedCategory.subcategories.map((sub) => {
                  const stats = subcategoryStats.find((s) => s.subcategoryId === sub.id);
                  return (
                    <SubcategoryTab
                      key={sub.id}
                      sub={sub}
                      active={selectedSubcategoryId === sub.id}
                      completedLevels={stats?.completedLevels ?? 0}
                      totalLevels={stats?.totalLevels ?? 0}
                      onClick={() =>
                        setSelectedSubcategoryId(
                          selectedSubcategoryId === sub.id ? null : sub.id
                        )
                      }
                    />
                  );
                })}
              </div>
            )}

            {/* Scenario count */}
            <p className="text-sm text-white/30 mb-5">
              {visibleScenarioIds.length}{" "}
              {visibleScenarioIds.length === 1 ? "Szenario" : "Szenarien"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleScenarioIds.map((id, index) => (
                <ScenarioCard
                  key={id}
                  scenario={SCENARIOS[id]}
                  progress={state.scenarios[id]}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}
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
