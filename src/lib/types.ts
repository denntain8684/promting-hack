export type ScenarioId = "schaden" | "vertrag" | "risiko" | "schulung" | "prozess";

export interface CriteriaResult {
  id: string;
  name: string;
  score: number; // 0-100
  weight: number;
  feedback: string;
  suggestions: string[];
}

export interface EvaluationResult {
  totalScore: number; // 0-100, weighted average
  criteria: CriteriaResult[];
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  source: "rule-based" | "ai";
}

export interface LevelData {
  level: number; // 1-5
  name: string;
  threshold: number; // 50-90
  focus: string;
  task: string; // Aufgabenstellung
  hints: string[]; // 4 hint tiers
}

export interface Scenario {
  id: ScenarioId;
  title: string;
  shortDescription: string;
  context: string;
  icon: string; // lucide icon name
  levels: LevelData[];
  keywords: string[]; // scenario-specific keywords for rule-based evaluation
}

export interface LevelProgress {
  completed: boolean;
  bestScore: number;
  attempts: number;
}

export interface ScenarioProgress {
  scenarioId: ScenarioId;
  currentLevel: number; // 1-5, current active level
  levels: Record<number, LevelProgress>;
  completed: boolean;
}

export interface GameState {
  scenarios: Record<ScenarioId, ScenarioProgress>;
  totalAttempts: number;
  completedAt?: string;
}

export type GameAction =
  | { type: "LOAD_STATE"; payload: GameState }
  | {
      type: "COMPLETE_LEVEL";
      payload: { scenarioId: ScenarioId; level: number; score: number };
    }
  | {
      type: "INCREMENT_ATTEMPTS";
      payload: { scenarioId: ScenarioId; level: number };
    }
  | { type: "RESET_ALL" };

export interface HintLevel {
  minAttempts: number;
  hint: string;
}
