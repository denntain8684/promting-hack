// ScenarioId is now a plain string to support dynamic categories
export type ScenarioId = string;

// ── Category types ────────────────────────────────────────────────────────────

export type CategoryId =
  | "allgemein"
  | "unternehmensentwicklung"
  | "schaden"
  | "antrag"
  | "komposit"
  | "kranken"
  | "leben"
  | "marketing"
  | "schulung";

export type SubcategoryId =
  | "projektmanagement"
  | "prozessmanagement"
  | "architekturmanagement"
  | "pmo"
  | "anforderungsmanagement"
  | "strategie"
  | "kommunikation-change";

export interface Subcategory {
  id: SubcategoryId;
  title: string;
  icon: string;
}

export interface Category {
  id: CategoryId;
  title: string;
  icon: string;
  description: string;
  subcategories?: Subcategory[];
}

// ── Evaluation types ──────────────────────────────────────────────────────────

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

// ── Scenario / Level types ────────────────────────────────────────────────────

export interface LevelData {
  level: number; // 1-5
  name: string;
  threshold: number; // 50-90
  focus: string;
  task: string;
  hints: string[]; // 4 hint tiers
}

export interface Scenario {
  id: ScenarioId;
  categoryId: CategoryId;
  subcategoryId?: SubcategoryId;
  title: string;
  shortDescription: string;
  context: string;
  icon: string;
  levels: LevelData[];
  keywords: string[];
}

// ── Game state types ──────────────────────────────────────────────────────────

export interface LevelProgress {
  completed: boolean;
  bestScore: number;
  attempts: number;
}

export interface ScenarioProgress {
  scenarioId: ScenarioId;
  currentLevel: number;
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
