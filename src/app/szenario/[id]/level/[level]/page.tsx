"use client";

import React, { useState, useCallback } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { PromptEditor } from "@/components/challenge/PromptEditor";
import { FeedbackPanel } from "@/components/challenge/FeedbackPanel";
import { Confetti } from "@/components/celebration/Confetti";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useGame } from "@/context/GameContext";
import { SCENARIOS } from "@/lib/scenarios";
import { evaluatePromptWithAI } from "@/lib/api";
import { getHintForAttempts } from "@/lib/evaluation";
import type { ScenarioId, EvaluationResult } from "@/lib/types";

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const { state, completeLevel, incrementAttempts } = useGame();

  const scenarioId = params.id as ScenarioId;
  const levelNum = parseInt(params.level as string, 10);

  const scenario = SCENARIOS[scenarioId];
  if (!scenario) notFound();
  if (levelNum < 1 || levelNum > 5) notFound();

  const levelData = scenario.levels.find((l) => l.level === levelNum)!;
  const progress = state.scenarios[scenarioId];
  const levelProgress = progress?.levels[levelNum];
  const attempts = levelProgress?.attempts ?? 0;

  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const hint = getHintForAttempts(attempts, scenarioId, levelNum);

  const handleEvaluate = useCallback(
    async (prompt: string) => {
      setIsEvaluating(true);
      incrementAttempts(scenarioId, levelNum);

      try {
        const evalResult = await evaluatePromptWithAI(prompt, scenarioId, levelNum);
        setResult(evalResult);

        const passed = evalResult.totalScore >= levelData.threshold;
        if (passed && !levelPassed) {
          setLevelPassed(true);
          completeLevel(scenarioId, levelNum, evalResult.totalScore);
          setConfetti(true);
          setShowModal(true);
          setTimeout(() => setConfetti(false), 4000);
        }
      } finally {
        setIsEvaluating(false);
      }
    },
    [scenarioId, levelNum, levelData.threshold, levelPassed, incrementAttempts, completeLevel]
  );

  const handleNextLevel = useCallback(() => {
    setShowModal(false);
    if (levelNum >= 5) {
      // Check if all scenarios done
      const allDone = Object.values(state.scenarios).every((s) => s.completed);
      if (allDone) {
        router.push("/champion");
      } else {
        router.push(`/szenario/${scenarioId}`);
      }
    } else {
      router.push(`/szenario/${scenarioId}/level/${levelNum + 1}`);
    }
  }, [levelNum, scenarioId, router, state.scenarios]);

  const isLastLevel = levelNum === 5;
  const allScenariosCompleted = Object.values(state.scenarios).every(
    (s) => s.completed
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Confetti active={confetti} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-6">
          <Link href="/" className="hover:text-white/70 transition-colors">
            Szenarien
          </Link>
          <span>/</span>
          <Link
            href={`/szenario/${scenarioId}`}
            className="hover:text-white/70 transition-colors"
          >
            {scenario.title}
          </Link>
          <span>/</span>
          <span style={{ color: "#FFB800" }}>
            Level {levelNum}: {levelData.name}
          </span>
        </nav>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Editor (60%) */}
          <section
            className="flex-1 lg:max-w-[60%] glass-card p-6"
            aria-label="Prompt-Editor"
          >
            <PromptEditor
              context={scenario.context}
              levelData={levelData}
              scenarioTitle={scenario.title}
              attempts={attempts}
              onEvaluate={handleEvaluate}
              isEvaluating={isEvaluating}
            />
          </section>

          {/* Right: Feedback (40%) */}
          <aside
            className="lg:w-[40%] glass-card p-6"
            aria-label="Feedback-Panel"
          >
            <h2
              className="text-base font-bold mb-4"
              style={{
                fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                color: "#8DA69D",
              }}
            >
              Bewertung
            </h2>
            <FeedbackPanel
              result={result}
              threshold={levelData.threshold}
              levelPassed={levelPassed}
              onNextLevel={handleNextLevel}
              hint={hint}
              attempts={attempts}
            />
          </aside>
        </div>
      </main>

      {/* Level passed modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`🎉 Level ${levelNum} bestanden!`}
        size="md"
      >
        <div className="text-center py-2">
          <div className="text-5xl mb-4">
            {isLastLevel && allScenariosCompleted ? "🏆" : levelNum === 5 ? "⭐" : "✅"}
          </div>
          <p className="text-white/70 mb-2">
            Du hast <strong style={{ color: "#FFB800" }}>Level {levelNum}: {levelData.name}</strong> mit{" "}
            <strong style={{ color: "#4CAF50" }}>{result?.totalScore}%</strong> bestanden!
          </p>
          <p className="text-sm text-white/40 mb-6">
            {isLastLevel
              ? "Du hast alle Level dieses Szenarios gemeistert!"
              : `Weiter zu Level ${levelNum + 1}: ${scenario.levels.find((l) => l.level === levelNum + 1)?.name}`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="gold" onClick={handleNextLevel}>
              {isLastLevel && allScenariosCompleted
                ? "Zum Champion-Bereich"
                : isLastLevel
                ? "Zurück zum Szenario"
                : `Level ${levelNum + 1} starten`}
            </Button>
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Weiter üben
            </Button>
          </div>
        </div>
      </Modal>

      <footer
        className="border-t mt-10 py-5 text-center text-xs text-white/30"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        Ein Projekt der Mecklenburgischen Versicherung — Unternehmensentwicklung
      </footer>
    </div>
  );
}
