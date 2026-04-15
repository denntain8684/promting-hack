import type { EvaluationResult, ScenarioId } from "./types";
import { SCENARIOS } from "./scenarios";
import { evaluatePromptRuleBased } from "./evaluation";

interface AIEvaluationRequest {
  prompt: string;
  scenarioId: ScenarioId;
  level: number;
}

export async function evaluatePromptWithAI(
  prompt: string,
  scenarioId: ScenarioId,
  level: number
): Promise<EvaluationResult> {
  try {
    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, scenarioId, level } as AIEvaluationRequest),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = (await response.json()) as EvaluationResult;
    return data;
  } catch {
    // Fallback to rule-based evaluation
    return evaluatePromptRuleBased(prompt, scenarioId);
  }
}

export function buildMetaPrompt(
  prompt: string,
  scenarioId: ScenarioId,
  level: number
): string {
  const scenario = SCENARIOS[scenarioId];
  const levelData = scenario.levels.find((l) => l.level === level);

  const criteriaList = `
1. Rollendefinition (20%): Klare Rollenzuweisung mit Expertise vorhanden?
2. Aufgabe/Auftrag (20%): Klarer Handlungsauftrag formuliert?
3. Kontext/Hintergrund (15%): Szenariospezifische Infos enthalten? Keywords: ${scenario.keywords.slice(0, 6).join(", ")}
4. Kommunikationsstil (10%): Tonalität und Stil definiert?
5. Ausgabeformat (15%): Ausgabeformat spezifiziert?
6. Einschränkungen/Grenzen (10%): Leitplanken definiert?
7. Präzision/Qualität (10%): Angemessene Länge und Struktur?`;

  return `Du bist ein Prompt-Engineering-Experte mit Fokus auf den Versicherungsbereich.

Szenario: "${scenario.title}"
Level ${level}: ${levelData?.focus}

Bewerte den folgenden Nutzer-Prompt nach diesen Kriterien:
${criteriaList}

Nutzer-Prompt:
"""
${prompt}
"""

Antworte NUR mit validem JSON (keine Markdown-Formatierung, kein Kommentar):
{
  "totalScore": 75,
  "criteria": [
    { "id": "role", "name": "Rollendefinition", "score": 80, "weight": 0.2, "feedback": "...", "suggestions": ["..."] },
    { "id": "task", "name": "Aufgabe/Auftrag", "score": 70, "weight": 0.2, "feedback": "...", "suggestions": [] },
    { "id": "context", "name": "Kontext/Hintergrund", "score": 60, "weight": 0.15, "feedback": "...", "suggestions": ["..."] },
    { "id": "style", "name": "Kommunikationsstil", "score": 0, "weight": 0.1, "feedback": "...", "suggestions": ["..."] },
    { "id": "format", "name": "Ausgabeformat", "score": 0, "weight": 0.15, "feedback": "...", "suggestions": ["..."] },
    { "id": "constraints", "name": "Einschränkungen/Grenzen", "score": 0, "weight": 0.1, "feedback": "...", "suggestions": ["..."] },
    { "id": "quality", "name": "Präzision/Qualität", "score": 70, "weight": 0.1, "feedback": "...", "suggestions": [] }
  ],
  "overallFeedback": "...",
  "strengths": ["..."],
  "improvements": ["..."],
  "source": "ai"
}`;
}
