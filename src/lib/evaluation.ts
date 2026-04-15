import type { EvaluationResult, CriteriaResult, ScenarioId } from "./types";
import { SCENARIOS } from "./scenarios";

// ── Helpers ────────────────────────────────────────────────────────────────────

function containsAny(text: string, patterns: string[]): boolean {
  const lower = text.toLowerCase();
  return patterns.some((p) => lower.includes(p.toLowerCase()));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ── Individual criteria checks ─────────────────────────────────────────────────

function checkRoleDefinition(
  prompt: string,
  _scenarioId: ScenarioId
): CriteriaResult {
  const rolePatterns = [
    "du bist",
    "agiere als",
    "handle als",
    "verhalte dich als",
    "rolle:",
    "als experte",
    "als berater",
    "als spezialist",
    "stell dir vor, du bist",
    "you are",
    "act as",
  ];

  const expertPatterns = [
    "erfahren",
    "experte",
    "spezialist",
    "berater",
    "fachmann",
    "profi",
    "senior",
    "jahre",
    "expertise",
  ];

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  const hasRole = containsAny(prompt, rolePatterns);
  const hasExpertise = containsAny(prompt, expertPatterns);
  const wordCount = countWords(prompt);

  if (hasRole && hasExpertise) {
    score = 90 + Math.min(10, Math.floor(wordCount / 30));
    feedback.push("Excellente Rollendefinition mit Expertisebeschreibung.");
  } else if (hasRole) {
    score = 65;
    feedback.push(
      "Gute Rollendefinition vorhanden. Beschreibe auch die Expertise und Erfahrung der Rolle."
    );
    suggestions.push(
      "Ergänze die Rolle um Erfahrungsjahre oder Fachgebiet, z.B. 'mit 10 Jahren Erfahrung in...' "
    );
  } else {
    score = 0;
    feedback.push(
      "Keine klare Rollendefinition gefunden. Definiere, wer der KI-Assistent sein soll."
    );
    suggestions.push(
      "Beginne mit 'Du bist ein erfahrener [Rolle]...' um dem Assistenten eine Identität zu geben."
    );
  }

  return {
    id: "role",
    name: "Rollendefinition",
    score,
    weight: 0.2,
    feedback: feedback.join(" "),
    suggestions,
  };
}

function checkTask(prompt: string, _scenarioId: ScenarioId): CriteriaResult {
  const taskPatterns = [
    "deine aufgabe",
    "dein auftrag",
    "du sollst",
    "erstelle",
    "entwickle",
    "analysiere",
    "hilf",
    "unterstütze",
    "bewerte",
    "schreibe",
    "formuliere",
    "erarbeite",
    "generiere",
    "erstell",
    "verfasse",
    "your task",
    "please",
  ];

  const imperativePattern = /\b(erstell|entwickl|analysier|hilf|schreib|bewerth?|generier|verfass|erarbeit|formulier)\w*/i;

  const wordCount = countWords(prompt);
  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  const hasExplicitTask = containsAny(prompt, taskPatterns);
  const hasImperative = imperativePattern.test(prompt);

  if (hasExplicitTask && hasImperative) {
    score = 85 + Math.min(15, Math.floor(wordCount / 40));
    feedback.push("Klarer, expliziter Arbeitsauftrag mit konkreten Aktionen.");
  } else if (hasExplicitTask || hasImperative) {
    score = 60;
    feedback.push(
      "Arbeitsauftrag erkennbar, könnte konkreter formuliert werden."
    );
    suggestions.push(
      "Formuliere den Auftrag mit klaren Aktionsverben, z.B. 'Erstelle...', 'Analysiere...' und beschreibe das gewünschte Ergebnis."
    );
  } else if (wordCount > 20) {
    score = 25;
    feedback.push(
      "Kein klar erkennbarer Arbeitsauftrag. Was soll der Assistent konkret tun?"
    );
    suggestions.push(
      "Füge einen klaren Auftrag hinzu, z.B. 'Deine Aufgabe ist es...' oder starte mit einem Imperativ-Satz."
    );
  } else {
    score = 0;
    feedback.push("Kein erkennbarer Arbeitsauftrag.");
    suggestions.push("Formuliere explizit, was der Assistent tun soll.");
  }

  return {
    id: "task",
    name: "Aufgabe/Auftrag",
    score,
    weight: 0.2,
    feedback: feedback.join(" "),
    suggestions,
  };
}

function checkContext(prompt: string, scenarioId: ScenarioId): CriteriaResult {
  const scenario = SCENARIOS[scenarioId];
  const keywords = scenario.keywords;

  const foundKeywords = keywords.filter((kw) =>
    prompt.toLowerCase().includes(kw.toLowerCase())
  );
  const keywordRatio = foundKeywords.length / keywords.length;

  const contextPatterns = [
    "kontext:",
    "hintergrund:",
    "situation:",
    "szenario:",
    "der kunde",
    "ein kunde",
    "es geht um",
    "dabei handelt es sich",
    "versicherung",
  ];

  const hasContextMarker = containsAny(prompt, contextPatterns);
  const wordCount = countWords(prompt);

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (keywordRatio >= 0.3 && (hasContextMarker || wordCount > 60)) {
    score = 70 + Math.round(keywordRatio * 30);
    feedback.push(
      `Guter Fachkontext mit ${foundKeywords.length} relevanten Schlüsselbegriffen (${foundKeywords.slice(0, 3).join(", ")}${foundKeywords.length > 3 ? "..." : ""}).`
    );
  } else if (keywordRatio >= 0.1 || hasContextMarker) {
    score = 40;
    feedback.push(
      "Etwas Kontext vorhanden, aber szenariospezifische Details fehlen noch."
    );
    suggestions.push(
      "Ergänze branchenspezifische Details und Fachvokabular für das konkrete Versicherungsszenario."
    );
  } else {
    score = 0;
    feedback.push(
      "Kein szenariospezifischer Kontext. Der Prompt fehlt Fachbezug und Hintergrundinformationen."
    );
    suggestions.push(
      "Beschreibe die Situation, das Versicherungsprodukt und den Fachkontext, damit der Assistent das Szenario versteht."
    );
  }

  return {
    id: "context",
    name: "Kontext/Hintergrund",
    score,
    weight: 0.15,
    feedback: feedback.join(" "),
    suggestions,
  };
}

function checkCommunicationStyle(
  prompt: string,
  _scenarioId: ScenarioId
): CriteriaResult {
  const stylePatterns = [
    "professionell",
    "empathisch",
    "sachlich",
    "freundlich",
    "kompetent",
    "klar",
    "verständlich",
    "kundenorientiert",
    "partnerschaftlich",
    "überzeugend",
    "neutral",
    "objektiv",
    "wertschätzend",
    "respektvoll",
    "tonalität",
    "stil:",
    "kommuniziere",
    "sprache:",
    "ton:",
  ];

  const hasStyle = containsAny(prompt, stylePatterns);
  const styleMatches = stylePatterns.filter((p) =>
    prompt.toLowerCase().includes(p)
  );

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasStyle && styleMatches.length >= 2) {
    score = 85;
    feedback.push(
      `Kommunikationsstil klar definiert (${styleMatches.slice(0, 2).join(", ")}).`
    );
  } else if (hasStyle) {
    score = 60;
    feedback.push("Tonalität ansatzweise beschrieben. Könnte präziser sein.");
    suggestions.push(
      "Beschreibe den gewünschten Stil mehrerer Dimensionen, z.B. Ton (empathisch), Formalität (professionell) und Zielorientierung (lösungsorientiert)."
    );
  } else {
    score = 0;
    feedback.push("Kein Kommunikationsstil definiert.");
    suggestions.push(
      "Gib an, wie der Assistent kommunizieren soll: z.B. 'Kommuniziere professionell und empathisch, verwende eine klare, verständliche Sprache.'"
    );
  }

  return {
    id: "style",
    name: "Kommunikationsstil",
    score,
    weight: 0.1,
    feedback: feedback.join(" "),
    suggestions,
  };
}

function checkOutputFormat(
  prompt: string,
  _scenarioId: ScenarioId
): CriteriaResult {
  const formatPatterns = [
    "liste",
    "tabelle",
    "bericht",
    "report",
    "gesprächsleitfaden",
    "checkliste",
    "stichpunkte",
    "aufzählung",
    "nummeriert",
    "absatz",
    "format:",
    "ausgabe:",
    "struktur:",
    "erstelle eine",
    "erstell eine",
    "folgende struktur",
    "in folgender form",
    "abschnitt",
    "kapitel",
    "übersicht",
    "matrix",
    "präsentation",
    "handout",
    "quiz",
    "markdown",
    "json",
    "schritt für schritt",
  ];

  const hasFormat = containsAny(prompt, formatPatterns);
  const formatMatches = formatPatterns.filter((p) =>
    prompt.toLowerCase().includes(p)
  );

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasFormat && formatMatches.length >= 2) {
    score = 85;
    feedback.push(
      `Ausgabeformat spezifiziert: ${formatMatches.slice(0, 3).join(", ")}.`
    );
  } else if (hasFormat) {
    score = 55;
    feedback.push("Ausgabeformat teilweise beschrieben.");
    suggestions.push(
      "Sei präziser beim Ausgabeformat: Wie viele Punkte? Welche Abschnitte? Wie soll die Struktur aussehen?"
    );
  } else {
    score = 0;
    feedback.push("Kein Ausgabeformat definiert.");
    suggestions.push(
      "Gib an, in welcher Form die Antwort erscheinen soll, z.B. 'Erstelle eine nummerierte Liste', 'Strukturiere die Ausgabe als Report mit Abschnitten: ...' "
    );
  }

  return {
    id: "format",
    name: "Ausgabeformat",
    score,
    weight: 0.15,
    feedback: feedback.join(" "),
    suggestions,
  };
}

function checkConstraints(
  prompt: string,
  _scenarioId: ScenarioId
): CriteriaResult {
  const constraintPatterns = [
    "nicht",
    "kein",
    "keine",
    "vermeide",
    "verzichte",
    "beschränke",
    "einschränkung",
    "leitplanke",
    "hinweis:",
    "achtung:",
    "beachte",
    "darf nicht",
    "darfst nicht",
    "ohne",
    "ausschließlich",
    "nur wenn",
    "falls nicht",
    "eskaliere",
    "grenze",
    "limit",
  ];

  const concretePatterns = [
    "keine zusagen",
    "keine versprechen",
    "datenschutz",
    "dsgvo",
    "keine falsch",
    "keine herabsetzung",
    "kein fachurteil",
    "kein rechtsrat",
    "keine deckungszusage",
    "keine garantie",
    "finale entscheidung",
  ];

  const hasConstraints = containsAny(prompt, constraintPatterns);
  const hasConcreteConstraints = containsAny(prompt, concretePatterns);

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasConcreteConstraints) {
    score = 90;
    feedback.push(
      "Konkrete, szenariospezifische Einschränkungen und Leitplanken definiert."
    );
  } else if (hasConstraints) {
    score = 55;
    feedback.push("Einschränkungen vorhanden, könnten präziser sein.");
    suggestions.push(
      "Formuliere konkrete Einschränkungen für das Versicherungsumfeld, z.B. 'Mache keine Deckungszusagen', 'Beachte Datenschutz'."
    );
  } else {
    score = 0;
    feedback.push("Keine Einschränkungen oder Leitplanken definiert.");
    suggestions.push(
      "Definiere, was der Assistent NICHT tun soll, z.B. 'Vermeide Deckungszusagen', 'Eskaliere komplexe Fälle an einen Sachbearbeiter'."
    );
  }

  return {
    id: "constraints",
    name: "Einschränkungen/Grenzen",
    score,
    weight: 0.1,
    feedback: feedback.join(" "),
    suggestions,
  };
}

function checkPrecisionQuality(
  prompt: string,
  _scenarioId: ScenarioId
): CriteriaResult {
  const wordCount = countWords(prompt);
  const charCount = prompt.length;

  // Check for logical structure (paragraphs, numbered points, colons for structure)
  const hasStructure =
    /\n/.test(prompt) ||
    /\d+\./m.test(prompt) ||
    /[-•]\s/.test(prompt) ||
    /:\s/.test(prompt);

  // Basic length scoring (50-500 words ideal range)
  let lengthScore = 0;
  if (wordCount < 5) {
    lengthScore = 0;
  } else if (wordCount < 20) {
    lengthScore = 20;
  } else if (wordCount < 50) {
    lengthScore = 50;
  } else if (wordCount <= 400) {
    lengthScore = 80;
  } else if (wordCount <= 700) {
    lengthScore = 90;
  } else {
    lengthScore = 70; // Too long
  }

  const structureBonus = hasStructure ? 15 : 0;
  const score = Math.min(100, lengthScore + structureBonus);

  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (wordCount < 20) {
    feedback.push(`Prompt zu kurz (${wordCount} Wörter). Ein guter Prompt ist detaillierter.`);
    suggestions.push("Erweitere deinen Prompt auf mindestens 50 Wörter mit allen relevanten Details.");
  } else if (wordCount > 700) {
    feedback.push(`Prompt sehr lang (${wordCount} Wörter). Fokussiere dich auf das Wesentliche.`);
    suggestions.push("Kürze den Prompt auf die wichtigsten Elemente — Präzision schlägt Länge.");
  } else {
    feedback.push(`Promptlänge gut (${wordCount} Wörter).`);
  }

  if (!hasStructure && wordCount > 30) {
    suggestions.push(
      "Strukturiere den Prompt mit Zeilenumbrüchen, Nummerierungen oder Abschnitten für bessere Lesbarkeit."
    );
    feedback.push(" Struktur könnte verbessert werden.");
  } else if (hasStructure) {
    feedback.push(" Gute Struktur erkennbar.");
  }

  return {
    id: "quality",
    name: "Präzision/Qualität",
    score,
    weight: 0.1,
    feedback: feedback.join(""),
    suggestions,
  };
}

// ── Main evaluation function ────────────────────────────────────────────────────

export function evaluatePromptRuleBased(
  prompt: string,
  scenarioId: ScenarioId
): EvaluationResult {
  const trimmed = prompt.trim();

  if (!trimmed) {
    return {
      totalScore: 0,
      criteria: [],
      overallFeedback:
        "Bitte gib einen Prompt ein, bevor du die Bewertung startest.",
      strengths: [],
      improvements: ["Gib einen Prompt ein."],
      source: "rule-based",
    };
  }

  const criteriaResults: CriteriaResult[] = [
    checkRoleDefinition(trimmed, scenarioId),
    checkTask(trimmed, scenarioId),
    checkContext(trimmed, scenarioId),
    checkCommunicationStyle(trimmed, scenarioId),
    checkOutputFormat(trimmed, scenarioId),
    checkConstraints(trimmed, scenarioId),
    checkPrecisionQuality(trimmed, scenarioId),
  ];

  const totalScore = Math.round(
    criteriaResults.reduce((sum, c) => sum + c.score * c.weight, 0)
  );

  const strengths = criteriaResults
    .filter((c) => c.score >= 70)
    .map((c) => `${c.name} (${c.score}%)`);

  const improvements = criteriaResults
    .filter((c) => c.score < 60)
    .flatMap((c) => c.suggestions)
    .slice(0, 4);

  let overallFeedback = "";
  if (totalScore < 30) {
    overallFeedback =
      "Dein Prompt ist noch sehr grundlegend. Beginne mit einer klaren Rollendefinition und einem konkreten Arbeitsauftrag.";
  } else if (totalScore < 50) {
    overallFeedback =
      "Guter Anfang! Die Grundelemente fehlen noch teilweise. Ergänze Kontext und eine klare Aufgabenstellung.";
  } else if (totalScore < 70) {
    overallFeedback =
      "Solider Prompt! Für die nächste Stufe fehlen noch Ausgabeformat-Spezifikation und Tonalitätsvorgaben.";
  } else if (totalScore < 90) {
    overallFeedback =
      "Sehr guter Prompt! Perfektioniere ihn mit konkreten Einschränkungen und noch präziseren Formatvorgaben.";
  } else {
    overallFeedback =
      "Exzellenter Prompt! Du demonstrierst professionelles Prompt Engineering für den Versicherungskontext.";
  }

  return {
    totalScore,
    criteria: criteriaResults,
    overallFeedback,
    strengths,
    improvements,
    source: "rule-based",
  };
}

// ── Hint retrieval ─────────────────────────────────────────────────────────────

export function getHintForAttempts(
  attempts: number,
  scenarioId: ScenarioId,
  level: number
): string | null {
  const levelData = SCENARIOS[scenarioId]?.levels.find(
    (l) => l.level === level
  );
  if (!levelData) return null;

  const { hints } = levelData;
  if (attempts < 5) return null;
  if (attempts < 10) return hints[0];
  if (attempts < 15) return hints[1];
  if (attempts < 20) return hints[2];
  return hints[3];
}
