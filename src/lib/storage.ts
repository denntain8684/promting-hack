import type { GameState, ScenarioId, ScenarioProgress } from "./types";
import { SCENARIO_ORDER } from "./scenarios";

const STORAGE_KEY = "prompting-hack-game-state";

function createScenarioProgress(id: ScenarioId): ScenarioProgress {
  return {
    scenarioId: id,
    currentLevel: 1,
    levels: {
      1: { completed: false, bestScore: 0, attempts: 0 },
      2: { completed: false, bestScore: 0, attempts: 0 },
      3: { completed: false, bestScore: 0, attempts: 0 },
      4: { completed: false, bestScore: 0, attempts: 0 },
      5: { completed: false, bestScore: 0, attempts: 0 },
    },
    completed: false,
  };
}

function createInitialState(): GameState {
  const scenarios = {} as GameState["scenarios"];
  for (const id of SCENARIO_ORDER) {
    scenarios[id] = createScenarioProgress(id);
  }
  return { scenarios, totalAttempts: 0 };
}

/** Merge saved state with current scenario list — new scenarios get initialised */
function mergeWithCurrentScenarios(saved: GameState): GameState {
  const scenarios = { ...saved.scenarios };
  for (const id of SCENARIO_ORDER) {
    if (!scenarios[id]) {
      scenarios[id] = createScenarioProgress(id);
    }
  }
  return { ...saved, scenarios };
}

export function loadGameState(): GameState {
  if (typeof window === "undefined") return createInitialState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const saved = JSON.parse(raw) as GameState;
    return mergeWithCurrentScenarios(saved);
  } catch {
    return createInitialState();
  }
}

export function saveGameState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors (private browsing, full storage, etc.)
  }
}

export function resetGameState(): GameState {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return createInitialState();
}

export function getOverallProgress(state: GameState): {
  completedScenarios: number;
  totalScenarios: number;
  completedLevels: number;
  totalLevels: number;
  percentage: number;
} {
  const totalScenarios = SCENARIO_ORDER.length;
  let completedScenarios = 0;
  let completedLevels = 0;
  const totalLevels = totalScenarios * 5;

  for (const id of SCENARIO_ORDER) {
    const progress = state.scenarios[id];
    if (progress?.completed) completedScenarios++;
    for (let lvl = 1; lvl <= 5; lvl++) {
      if (progress?.levels[lvl]?.completed) completedLevels++;
    }
  }

  return {
    completedScenarios,
    totalScenarios,
    completedLevels,
    totalLevels,
    percentage: totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0,
  };
}
