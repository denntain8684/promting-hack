"use client";

import React from "react";
import Link from "next/link";
import {
  Activity, AlertOctagon, Award, BarChart3, BookOpen, Briefcase,
  Building, Building2, Car, ChevronRight, ClipboardCheck, CloudRain,
  Database, DollarSign, Droplets, FileEdit, FileText, GitBranch,
  GraduationCap, Heart, HelpCircle, Lock, Mail, Megaphone, Monitor,
  Package, PiggyBank, RefreshCw, Scale, Search, Shield, TrendingUp,
  UserCheck, Users, XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Scenario, ScenarioProgress } from "@/lib/types";

const ICONS: Record<string, React.ElementType> = {
  Activity, AlertOctagon, Award, BarChart3, BookOpen, Briefcase,
  Building, Building2, Car, ClipboardCheck, CloudRain,
  Database, DollarSign, Droplets, FileEdit, FileText, GitBranch,
  GraduationCap, Heart, HelpCircle, Lock, Mail, Megaphone, Monitor,
  Package, PiggyBank, RefreshCw, Scale, Search, Shield, TrendingUp,
  UserCheck, Users, XCircle,
};

const LEVEL_COLORS = [
  "#8DA69D",
  "#5B9BD5",
  "#FFB800",
  "#FF8C00",
  "#E53935",
];

interface ScenarioCardProps {
  scenario: Scenario;
  progress: ScenarioProgress;
  index: number;
}

export function ScenarioCard({ scenario, progress, index }: ScenarioCardProps) {
  const Icon = ICONS[scenario.icon] || FileText;
  const completedLevels = Object.values(progress.levels).filter(
    (l) => l.completed
  ).length;
  const isCompleted = progress.completed;
  const isStarted = completedLevels > 0 || progress.currentLevel > 1;

  const badgeVariant = isCompleted ? "success" : isStarted ? "warning" : "default";
  const badgeLabel = isCompleted
    ? "Abgeschlossen ✓"
    : isStarted
    ? "In Bearbeitung"
    : "Nicht gestartet";

  const levelColor = LEVEL_COLORS[Math.min(completedLevels, 4)];

  return (
    <Link href={`/szenario/${scenario.id}`} className="block group">
      <article
        className="glass-card glass-card-hover p-6 h-full flex flex-col relative"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${levelColor}20` }}
          >
            <Icon size={22} style={{ color: levelColor }} />
          </div>
          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
        </div>

        <h3
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}
        >
          {scenario.title}
        </h3>

        <p className="text-sm text-white/60 leading-relaxed flex-1 mb-4">
          {scenario.shortDescription}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/50">Level-Fortschritt</span>
            <span className="text-xs font-mono" style={{ color: levelColor }}>
              {completedLevels}/5
            </span>
          </div>

          {/* 5 level dots */}
          <div className="flex gap-1.5 mb-3">
            {Array.from({ length: 5 }, (_, i) => {
              const lvl = progress.levels[i + 1];
              return (
                <div key={i} className="flex-1">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: lvl?.completed
                        ? LEVEL_COLORS[i]
                        : "rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          <ProgressBar
            value={completedLevels}
            max={5}
            color={levelColor}
            height="thin"
          />

          <div className="flex items-center justify-end mt-3">
            <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors flex items-center gap-1">
              {isCompleted ? "Erneut spielen" : isStarted ? "Weiterspielen" : "Starten"}
              <ChevronRight size={12} />
            </span>
          </div>
        </div>

        {isCompleted && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(76,175,80,0.3)",
              borderRadius: "12px",
            }}
          />
        )}
      </article>
    </Link>
  );
}
