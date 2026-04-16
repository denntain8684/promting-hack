import type { LevelData } from "./types";

interface LevelSpec {
  focus: string;
  task: string;
  hints: [string, string, string, string];
}

/**
 * Creates 5 LevelData entries from scenario-specific specs.
 * Level names, thresholds and level numbers are standardised across all scenarios.
 */
export function makeLevels(specs: [LevelSpec, LevelSpec, LevelSpec, LevelSpec, LevelSpec]): LevelData[] {
  const names = ["Einsteiger", "Fortgeschritten", "Profi", "Experte", "Champion"];
  const thresholds = [50, 60, 70, 80, 90];

  return specs.map((spec, i) => ({
    level: i + 1,
    name: names[i],
    threshold: thresholds[i],
    focus: spec.focus,
    task: spec.task,
    hints: spec.hints,
  }));
}
