import { describe, it, expect } from "vitest";
import { evaluatePromptRuleBased, getHintForAttempts } from "./evaluation";

const SCENARIO = "schaden" as const;

describe("evaluatePromptRuleBased", () => {
  it("returns 0 for empty prompt", () => {
    const result = evaluatePromptRuleBased("", SCENARIO);
    expect(result.totalScore).toBe(0);
    expect(result.criteria).toHaveLength(0);
  });

  it("returns low score for minimal prompt", () => {
    const result = evaluatePromptRuleBased("Schreibe einen Text.", SCENARIO);
    expect(result.totalScore).toBeLessThan(30);
  });

  it("returns medium score for prompt with role and task only", () => {
    const result = evaluatePromptRuleBased(
      "Du bist ein erfahrener Schadenregulierer. Deine Aufgabe ist es, den Mitarbeiter bei der Schadenaufnahme zu unterstützen.",
      SCENARIO
    );
    expect(result.totalScore).toBeGreaterThan(30);
    expect(result.totalScore).toBeLessThan(70);
  });

  it("returns high score for good prompt with context", () => {
    const goodPrompt = `Du bist ein erfahrener Schadenregulierer mit 10 Jahren Erfahrung in der Wohngebäudeversicherung.

Kontext: Ein Kunde meldet einen Wasserschaden durch Leitungswasser in seiner Wohngebäudeversicherung.

Deine Aufgabe: Unterstütze den Innendienst-Mitarbeiter bei der Schadenaufnahme und Kundenkommunikation.

Kommuniziere empathisch, professionell und kundenorientiert.

Erstelle einen strukturierten Gesprächsleitfaden mit folgenden Abschnitten:
1. Eröffnungssatz
2. Zu erfassende Informationen (Datum, Ursache, Schadensumme)
3. Erklärung der nächsten Schritte

Einschränkungen: Mache keine Deckungszusagen. Beachte den Datenschutz.`;

    const result = evaluatePromptRuleBased(goodPrompt, SCENARIO);
    expect(result.totalScore).toBeGreaterThan(60);
  });

  it("returns very high score for excellent prompt", () => {
    const excellentPrompt = `Du bist ein erfahrener Schadenregulierer mit 15 Jahren Expertise in der Wohngebäudeversicherung und Leitungswasserschäden.

Kontext: Ein Kunde meldet telefonisch einen Wasserschaden durch Leitungswasser im Keller seines Wohngebäudes. Die Wohngebäudeversicherung soll aktiviert werden.

Deine Aufgabe: Unterstütze den Innendienst-Mitarbeiter aktiv bei der strukturierten Schadenaufnahme und der einfühlsamen Kundenkommunikation.

Kommunikationsstil: Empathisch, professionell und kundenorientiert. Zeige Verständnis für die stressige Situation des Kunden.

Erstelle einen vollständigen Gesprächsleitfaden mit:
1. Eröffnungssatz (beruhigend und professionell)
2. Pflichtangaben erfassen: Schadendatum, -ursache, betroffene Räume, vorläufige Schadensumme
3. Sofortmaßnahmen erklären
4. Nächste Schritte beschreiben (Gutachterbesuch, Sanierungsunternehmen)
5. Abschlusssatz

Einschränkungen:
- Mache KEINE Deckungszusagen oder Versprechen über Regulierungsbeträge
- Beachte Datenschutz: Nur notwendige Daten erfassen
- Bei komplexen Fällen: an Sachbearbeiter eskalieren
- Keine Schuldzuweisungen`;

    const result = evaluatePromptRuleBased(excellentPrompt, SCENARIO);
    expect(result.totalScore).toBeGreaterThan(80);
  });

  it("returns correct source", () => {
    const result = evaluatePromptRuleBased("Du bist ein Experte.", SCENARIO);
    expect(result.source).toBe("rule-based");
  });

  it("includes 7 criteria", () => {
    const result = evaluatePromptRuleBased("Du bist ein Experte. Erstelle eine Liste.", SCENARIO);
    expect(result.criteria).toHaveLength(7);
  });

  it("weights sum to approximately 1", () => {
    const result = evaluatePromptRuleBased("test", SCENARIO);
    const weightSum = result.criteria.reduce((s, c) => s + c.weight, 0);
    expect(weightSum).toBeCloseTo(1.0, 1);
  });

  it("all criteria scores are between 0 and 100", () => {
    const result = evaluatePromptRuleBased(
      "Du bist ein Experte. Erstelle eine Checkliste.",
      SCENARIO
    );
    for (const c of result.criteria) {
      expect(c.score).toBeGreaterThanOrEqual(0);
      expect(c.score).toBeLessThanOrEqual(100);
    }
  });

  it("detects role correctly", () => {
    const result = evaluatePromptRuleBased(
      "Du bist ein erfahrener Versicherungsberater.",
      SCENARIO
    );
    const roleCriteria = result.criteria.find((c) => c.id === "role");
    expect(roleCriteria?.score).toBeGreaterThan(60);
  });

  it("detects output format", () => {
    const result = evaluatePromptRuleBased(
      "Erstelle eine nummerierte Liste mit einer Tabelle und einem Bericht.",
      SCENARIO
    );
    const formatCriteria = result.criteria.find((c) => c.id === "format");
    expect(formatCriteria?.score).toBeGreaterThan(50);
  });

  it("detects constraints", () => {
    const result = evaluatePromptRuleBased(
      "Mache keine Deckungszusagen. Beachte den Datenschutz. Vermeide Fehler.",
      SCENARIO
    );
    const constraintCriteria = result.criteria.find((c) => c.id === "constraints");
    expect(constraintCriteria?.score).toBeGreaterThan(50);
  });
});

describe("getHintForAttempts", () => {
  it("returns null before 5 attempts", () => {
    expect(getHintForAttempts(0, SCENARIO, 1)).toBeNull();
    expect(getHintForAttempts(4, SCENARIO, 1)).toBeNull();
  });

  it("returns first hint at 5 attempts", () => {
    const hint = getHintForAttempts(5, SCENARIO, 1);
    expect(hint).not.toBeNull();
    expect(typeof hint).toBe("string");
    expect(hint!.length).toBeGreaterThan(10);
  });

  it("returns second hint at 10 attempts", () => {
    const hint5 = getHintForAttempts(5, SCENARIO, 1);
    const hint10 = getHintForAttempts(10, SCENARIO, 1);
    expect(hint10).not.toBeNull();
    expect(hint10).not.toBe(hint5);
  });

  it("returns null for invalid scenario", () => {
    const hint = getHintForAttempts(10, "invalid" as never, 1);
    expect(hint).toBeNull();
  });
});
