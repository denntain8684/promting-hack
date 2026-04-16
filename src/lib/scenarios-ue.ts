import type { Scenario } from "./types";
import { makeLevels } from "./scenario-factory";

// Helper to create a simple 5-level scenario with consistent structure
function ueScenario(
  id: string,
  subcategoryId: Scenario["subcategoryId"],
  title: string,
  shortDescription: string,
  context: string,
  icon: string,
  keywords: string[],
  tasks: [string, string, string, string, string],
  expertKeyword: string
): Scenario {
  return {
    id,
    categoryId: "unternehmensentwicklung",
    subcategoryId,
    title,
    shortDescription,
    context,
    icon,
    keywords,
    levels: makeLevels([
      {
        focus: "Grundstruktur: Experten-Rolle und Auftrag",
        task: tasks[0],
        hints: [
          `Definiere eine klare ${expertKeyword}-Expertenrolle und einen konkreten Auftrag.`,
          `Beispiel-Rolle: 'Du bist ein erfahrener ${expertKeyword}-Experte in einem deutschen Versicherungsunternehmen.'`,
          `Kläre: Was soll die KI konkret tun? Welches Ergebnis wird erwartet?`,
          `Fast-Beispiel: 'Du bist ein [${expertKeyword.toUpperCase()}-EXPERTE]. Deine Aufgabe ist es, [AUFTRAG] für [KONTEXT] zu erstellen.'`,
        ],
      },
      {
        focus: "Kontext: Situation und Rahmenbedingungen",
        task: tasks[1],
        hints: [
          `Beschreibe die konkrete Situation, Beteiligte und Rahmenbedingungen.`,
          `Je mehr relevanter Kontext, desto präziser die KI-Ausgabe.`,
          `Gib an: Was ist das Problem/Ziel? Welche Ressourcen? Welche Einschränkungen?`,
          `Fast-Beispiel: 'Situation: [BESCHREIBUNG]. Beteiligte: [LISTE]. Ziel: [OUTCOME]. Rahmenbedingungen: [CONSTRAINTS].'`,
        ],
      },
      {
        focus: "Format: Strukturiertes Ausgabeformat",
        task: tasks[2],
        hints: [
          `Definiere das genaue Ausgabeformat: Abschnitte, Tabellen, Visualisierungen.`,
          `Strukturierter Output ist direkt verwendbar ohne Nachbearbeitung.`,
          `Gib Länge, Detailgrad und Präsentationsform vor.`,
          `Fast-Beispiel: 'Format: [ABSCHNITTE]. Struktur: [TABELLEN/LISTEN]. Länge: ca. [N] Seiten. Präsentation: [DOKUMENT-TYP].'`,
        ],
      },
      {
        focus: "Einschränkungen: Leitplanken und Edge Cases",
        task: tasks[3],
        hints: [
          `Was soll die KI nicht tun? Welche Grenzen gibt es?`,
          `Denke an: Was wenn Information fehlt? Was bei Widersprüchen? Was bei Risiken?`,
          `Compliance-Aspekte, Budget-Grenzen, rechtliche Einschränkungen einbauen.`,
          `Fast-Beispiel: 'Einschränkungen: [LISTE]. Bei Lücken: [VORGEHEN]. Eskaliere wenn: [TRIGGER]. Budget-Grenze: [X].'`,
        ],
      },
      {
        focus: "Champion: Vollständiges Expertenkonzept",
        task: tasks[4],
        hints: [
          `Champion-Prompt: Experten-Rolle + vollständiger Kontext + Methodik + Format + Einschränkungen.`,
          `Prüfe: Kann ein Kollege mit dem Output direkt weiterarbeiten?`,
          `Profi-Tipp: Lass die KI auch Risiken und Abhängigkeiten benennen.`,
          `Fast-Beispiel: 'Du bist [EXPERTE]. Erstelle für [KONTEXT] ein vollständiges [DOKUMENT-TYP] inkl. [METHODIK], [FORMAT], [QUALITÄTSKRITERIEN] und [EINSCHRÄNKUNGEN].'`,
        ],
      },
    ]),
  };
}

// ── Projektmanagement (5 Szenarien) ───────────────────────────────────────────

export const SCENARIOS_UE_PM: Scenario[] = [
  ueScenario(
    "ue-pm-projektplan", "projektmanagement",
    "Projektplan für IT-Einführungsprojekt",
    "Erstellung eines vollständigen Projektplans für die Einführung einer neuen CRM-Software im VU.",
    "Die Mecklenburgische Versicherung führt ein neues CRM-System ein. Das Projekt betrifft 200 Mitarbeiter, dauert 12 Monate und involviert IT, Vertrieb und Schulungsabteilung. Ein strukturierter Projektplan wird benötigt.",
    "Kanban",
    ["projektplan", "projektmanagement", "crm", "meilensteine", "ressourcen", "budget", "risiken", "stakeholder", "zeitplan", "phasen", "lieferobjekte", "projekt"],
    [
      "Schreibe einen Prompt für einen Projektmanager, der einen vollständigen Projektplan für die CRM-Einführung erstellt.",
      "Ergänze den Prompt um den Projektkontext: Scope (200 MA, 12 Monate, 3 Abteilungen), verfügbares Budget, Hauptrisiken, Stakeholder.",
      "Definiere das Ausgabeformat des Projektplans: Phasen, Meilensteine, Gantt-ähnliche Struktur, Ressourcenplanung.",
      "Füge Einschränkungen hinzu: Was wenn Budget überschritten? Was bei kritischen Risiken? Eskalationspfade.",
      "Erstelle einen vollständigen Projektplan-Prompt: PM-Experten-Rolle + Scope + Phasen + Meilensteine + Ressourcen + Risiken + Format + Reporting.",
    ],
    "Projektmanagement"
  ),
  ueScenario(
    "ue-pm-statusbericht", "projektmanagement",
    "Projektstatusbericht erstellen",
    "Erstellung eines strukturierten Projektstatusberichts für den Lenkungsausschuss.",
    "Ein laufendes Digitalisierungsprojekt (neue Schadenbearbeitungssoftware) ist im Verzug. Der Projektleiter muss einen klaren Statusbericht für den Lenkungsausschuss erstellen — ehrlich über Probleme, aber lösungsorientiert.",
    "BarChart",
    ["statusbericht", "lenkungsausschuss", "projektstatus", "ampel", "meilensteine", "verzug", "lösungen", "eskalation", "fortschritt", "risiken", "maßnahmen", "reporting"],
    [
      "Schreibe einen Prompt für einen Projektleiter, der einen Statusbericht für den Lenkungsausschuss erstellt.",
      "Ergänze den Kontext: Projekt-Hintergrund, aktueller Status (Verzug, Gründe), Lösungsansätze.",
      "Definiere das Format: Ampelstatus, KPIs, Meilenstein-Übersicht, offene Risiken, Entscheidungsbedarfe.",
      "Füge Einschränkungen hinzu: Ehrlichkeit über Probleme, aber konstruktiv. Was gehört in den Bericht, was nicht?",
      "Erstelle vollständigen Statusbericht-Prompt: PM-Rolle + Projektkontext + Ampelstatus + KPIs + Meilensteine + Eskalationsbedarfe + Lösung.",
    ],
    "Projektmanagement"
  ),
  ueScenario(
    "ue-pm-risikomanagement", "projektmanagement",
    "Projektrisiken identifizieren und steuern",
    "Systematische Risikoanalyse und Risikomanagement-Plan für ein Großprojekt im VU.",
    "Ein neues Kernbankensystem (Policy-Management-System) wird eingeführt. Das Projekt hat ein Budget von 5 Mio. EUR und 18 Monate Laufzeit. Eine vollständige Risikoanalyse und ein Risikomanagementplan sind erforderlich.",
    "AlertTriangle",
    ["risikomanagement", "risikoanalyse", "risikomatrix", "wahrscheinlichkeit", "auswirkung", "risikoregister", "gegenmaßnahmen", "risikoeigentümer", "contingency", "großprojekt", "kernbanken", "policy"],
    [
      "Schreibe einen Prompt für einen Risikomanager, der Projektrisiken systematisch identifiziert und bewertet.",
      "Ergänze den Kontext: Projektgröße (5 Mio., 18 Monate), Projektart (IT-Einführung), bekannte Risikobereiche.",
      "Definiere das Format: Risikoregister (Risiko | Wahrscheinlichkeit | Auswirkung | Score | Maßnahmen | Eigentümer).",
      "Füge Einschränkungen hinzu: Was bei Eintritt eines Top-Risikos? Eskalationsmatrix, Notfallpläne.",
      "Erstelle vollständigen Risikomanagement-Prompt: RM-Experten-Rolle + Projektkontext + Risikoidentifikation + Register + Steuerungsmaßnahmen + Reporting.",
    ],
    "Risikomanagement"
  ),
  ueScenario(
    "ue-pm-stakeholder", "projektmanagement",
    "Stakeholder-Management im Projekt",
    "Analyse und Management von Projektstakeholdern für ein unternehmensweites Transformationsprojekt.",
    "Die Mecklenburgische Versicherung führt eine umfassende Digitalisierungsstrategie durch. Viele Stakeholder (Fachbereiche, IT, Betriebsrat, Führungsebene) haben unterschiedliche Interessen und müssen gezielt eingebunden werden.",
    "Users",
    ["stakeholder", "stakeholder-analyse", "interessen", "macht", "einfluss", "kommunikation", "einbindung", "change", "betriebsrat", "führungsebene", "widerstand", "sponsoring"],
    [
      "Schreibe einen Prompt für einen Projektmanager, der eine Stakeholder-Analyse für ein Transformationsprojekt durchführt.",
      "Ergänze den Kontext: Projektumfang (Digitalisierung), Stakeholder-Gruppen (Fachbereiche, IT, Betriebsrat, Führung), bekannte Spannungen.",
      "Definiere das Format: Stakeholder-Map (Macht × Interesse), Stakeholder-Register, Kommunikationsmatrix.",
      "Füge Einschränkungen hinzu: Betriebsrat-Besonderheiten (MitbestG), Datenschutz bei Stakeholder-Profilen, politische Sensibilitäten.",
      "Erstelle vollständigen Stakeholder-Management-Prompt: PM-Rolle + Projektkontext + Stakeholder-Analyse + Register + Kommunikationsplan + Einbindungsstrategie.",
    ],
    "Stakeholder-Management"
  ),
  ueScenario(
    "ue-pm-abschluss", "projektmanagement",
    "Projektabschluss und Lessons Learned",
    "Strukturierter Projektabschluss mit Lessons-Learned-Analyse und Wissenstransfer.",
    "Ein 18-monatiges CRM-Einführungsprojekt wird abgeschlossen. Vor der formalen Abnahme sollen Lessons Learned systematisch gesammelt, Erfolge dokumentiert und Verbesserungspotenziale für zukünftige Projekte abgeleitet werden.",
    "CheckCircle",
    ["projektabschluss", "lessons learned", "retrospektive", "abnahme", "deliverables", "wissenstransfer", "erfolgsmessung", "projektbericht", "best practices", "verbesserung", "erfahrungen", "abschlussbericht"],
    [
      "Schreibe einen Prompt für einen Projektleiter, der einen strukturierten Projektabschluss mit Lessons-Learned-Analyse durchführt.",
      "Ergänze den Kontext: Projektgröße, was gut/schlecht lief, welche Stakeholder einbezogen werden, wie Wissen gesichert wird.",
      "Definiere das Format: Projektabschlussbericht + Lessons-Learned-Register + Maßnahmenliste für zukünftige Projekte.",
      "Füge Einschränkungen hinzu: Objektivität (keine Schuldzuweisungen), Vertraulichkeit bei personenbezogenen Problemen, Zeitdruck am Projektende.",
      "Erstelle vollständigen Projektabschluss-Prompt: PM-Rolle + Projektrückblick + Lessons-Learned-Methodik + Abschlussbericht-Format + Wissenstransfer-Plan.",
    ],
    "Projektmanagement"
  ),
];

// ── Prozessmanagement (5 Szenarien) ───────────────────────────────────────────

export const SCENARIOS_UE_PROZESS: Scenario[] = [
  ueScenario(
    "ue-prozess-bpmn", "prozessmanagement",
    "BPMN-Prozessmodellierung",
    "Modellierung und Dokumentation eines Geschäftsprozesses in BPMN 2.0.",
    "Der Antragsprozess für eine Wohngebäudeversicherung soll in BPMN 2.0 modelliert werden. Der Prozess involviert Kunde, Vertrieb, Risikoprüfung, Vertragsabteilung und IT-Systeme. Ziel ist ein klares Prozessmodell für Analyse und Optimierung.",
    "GitBranch",
    ["bpmn", "prozessmodellierung", "swimlane", "aktivitäten", "gateways", "ereignisse", "prozessfluss", "workflow", "notation", "modell", "subprozess", "optimierung"],
    [
      "Schreibe einen Prompt für einen Prozessmodellierer, der einen Versicherungsprozess in BPMN 2.0 beschreibt und dokumentiert.",
      "Ergänze den Kontext: Welcher Prozess (Antragsbearbeitung), beteiligte Rollen (Lanes), Systemintegration, Prozessphasen.",
      "Definiere das Ausgabeformat: BPMN-Elemente-Beschreibung (Aktivitäten, Gateways, Ereignisse), Swimlane-Zuordnung, Schritt-für-Schritt-Dokumentation.",
      "Füge Einschränkungen hinzu: BPMN 2.0-Notation korrekt verwenden, Komplexitätsgrenzen (max. 30 Elemente), Dokumentation für Nicht-Modellierer verständlich.",
      "Erstelle vollständigen BPMN-Modellierungs-Prompt: Prozessmodellierer-Rolle + Prozessbeschreibung + BPMN-Elemente + Swimlane-Struktur + Dokumentation + Qualitätskriterien.",
    ],
    "BPMN-Prozessmodellierung"
  ),
  ueScenario(
    "ue-prozess-rpa", "prozessmanagement",
    "RPA-Kandidatenprozess identifizieren",
    "Analyse und Bewertung von Prozessen auf RPA-Eignung im Versicherungsunternehmen.",
    "Die Mecklenburgische Versicherung möchte Robotic Process Automation einführen. Es müssen geeignete Prozesse identifiziert, nach Aufwand und Nutzen priorisiert und ein Business Case erstellt werden.",
    "Bot",
    ["rpa", "robotic process automation", "automatisierung", "prozessanalyse", "business case", "roi", "manuelle tätigkeiten", "regelbasiert", "strukturiert", "systemintegration", "bot", "effizienz"],
    [
      "Schreibe einen Prompt für einen RPA-Analysten, der Automatisierungspotenziale im VU identifiziert und bewertet.",
      "Ergänze den Kontext: Bekannte manuelle Prozesse (Dateneingabe, Rechnungsverarbeitung), RPA-Tool (z.B. UiPath/Automation Anywhere), Automatisierungsziele.",
      "Definiere das Format: RPA-Kandidaten-Bewertungsmatrix (Aufwand, Nutzen, Eignung), Priorisierung, Business-Case-Vorlage.",
      "Füge Einschränkungen hinzu: Datenschutz bei automatisierter Datenverarbeitung, Mitbestimmungsrecht bei Personalveränderungen, IT-Sicherheit.",
      "Erstelle vollständigen RPA-Analyse-Prompt: RPA-Experten-Rolle + Prozess-Portfolio + Bewertungsmatrix + Priorisierung + Business Case + Compliance.",
    ],
    "RPA-Analyse"
  ),
  ueScenario(
    "ue-prozess-optimierung", "prozessmanagement",
    "Lean-Prozessoptimierung im Schadenbereich",
    "Anwendung von Lean-Methoden zur Optimierung des Schadenbearbeitungsprozesses.",
    "Die Durchlaufzeit bei der Schadenbearbeitung ist zu hoch (aktuell 15 Tage, Ziel 7 Tage). Mit Lean-Methoden (Wertstromanalyse, 5S, Kaizen) sollen Verschwendung eliminiert und der Prozess beschleunigt werden.",
    "TrendingUp",
    ["lean", "prozessoptimierung", "wertstromanalyse", "kaizen", "verschwendung", "durchlaufzeit", "bottleneck", "effizienz", "5s", "kontinuierliche verbesserung", "schadenbearbeitung", "kpi"],
    [
      "Schreibe einen Prompt für einen Lean-Experten, der den Schadenbearbeitungsprozess mit Lean-Methoden optimiert.",
      "Ergänze den Kontext: IST-Durchlaufzeit (15 Tage), Ziel (7 Tage), Prozessschritte, bekannte Engpässe, Ressourcen.",
      "Definiere das Format: Wertstrom-Analyse, Verschwendungs-Identifikation, Maßnahmenplan mit Quick Wins und strategischen Maßnahmen.",
      "Füge Einschränkungen hinzu: Keine Personalabbau-Empfehlungen, Mitarbeiter-Einbindung bei Veränderungen, regulatorische Mindestanforderungen.",
      "Erstelle vollständigen Lean-Optimierungs-Prompt: Lean-Experten-Rolle + IST-Prozess + Wertstromanalyse + Maßnahmenplan + Quick Wins + KPIs + Implementierungsplan.",
    ],
    "Lean-Prozessoptimierung"
  ),
  ueScenario(
    "ue-prozess-governance", "prozessmanagement",
    "Prozess-Governance einführen",
    "Aufbau einer Prozessmanagement-Governance-Struktur für das gesamte Versicherungsunternehmen.",
    "Die Mecklenburgische Versicherung hat keine einheitliche Prozessmanagement-Governance. Prozesse werden dezentral und inkonsistent dokumentiert. Es soll eine unternehmensweite Governance eingeführt werden.",
    "LayoutDashboard",
    ["governance", "prozessmanagement", "prozessverantwortung", "prozessregister", "standards", "rollen", "verantwortlichkeiten", "reporting", "prozesskultur", "steuerung", "qualität", "einheitlichkeit"],
    [
      "Schreibe einen Prompt für einen Prozessmanagement-Experten, der eine Governance-Struktur für Prozessmanagement einführt.",
      "Ergänze den Kontext: Unternehmensgröße, aktueller Reifungsgrad (keine Governance), Ziel-Reifegrad, Zeitrahmen.",
      "Definiere das Format: Governance-Framework (Rollen, Prozesse, Standards), Prozessregister-Vorlage, Reporting-Struktur.",
      "Füge Einschränkungen hinzu: Keine bürokratische Überregulierung, Mitarbeiterakzeptanz sichern, schrittweise Einführung.",
      "Erstelle vollständigen Governance-Prompt: PM-Governance-Experten-Rolle + IST-Analyse + Framework + Rollen/Verantwortlichkeiten + Rollout-Plan + Erfolgsmessung.",
    ],
    "Prozess-Governance"
  ),
  ueScenario(
    "ue-prozess-kpi", "prozessmanagement",
    "Prozesskennzahlen und Performance-Monitoring",
    "Entwicklung eines KPI-Systems zur kontinuierlichen Prozessüberwachung im VU.",
    "Prozesse werden bei der Mecklenburgischen Versicherung kaum gemessen. Es soll ein KPI-System eingeführt werden, das Prozessqualität, Effizienz und Kundenzufriedenheit kontinuierlich misst und visualisiert.",
    "BarChart2",
    ["kpi", "prozesskennzahlen", "monitoring", "dashboard", "performance", "durchlaufzeit", "fehlerrate", "kundenzufriedenheit", "messung", "reporting", "steuerung", "benchmarking"],
    [
      "Schreibe einen Prompt für einen Prozesscontroller, der ein KPI-System für Prozess-Performance-Monitoring entwickelt.",
      "Ergänze den Kontext: Welche Prozesse gemessen werden, Datenverfügbarkeit, Reporting-Empfänger, Ziel-KPIs.",
      "Definiere das Format: KPI-Katalog (Kennzahl | Messung | Zielwert | Schwellwert | Verantwortlicher), Dashboard-Konzept.",
      "Füge Einschränkungen hinzu: Datenverfügbarkeit realistisch einschätzen, Datenschutz bei mitarbeiterbezogenen KPIs, nicht zu viele KPIs (< 15 pro Prozess).",
      "Erstelle vollständigen KPI-System-Prompt: Prozesscontroller-Rolle + Prozess-Portfolio + KPI-Katalog + Dashboard-Konzept + Reporting-Rhythmus + Steuerungslogik.",
    ],
    "Prozesskennzahlen"
  ),
];

// ── Architekturmanagement (5 Szenarien) ───────────────────────────────────────

export const SCENARIOS_UE_ARCHITEKTUR: Scenario[] = [
  ueScenario(
    "ue-arch-ist", "architekturmanagement",
    "IT-Landschaft dokumentieren (IST-Architektur)",
    "Erfassung und Dokumentation der bestehenden IT-Systemlandschaft eines Versicherungsunternehmens.",
    "Die Mecklenburgische Versicherung hat über 20 Jahre gewachsene IT-Systeme. Eine vollständige IST-Architektur-Dokumentation fehlt. Für die Digitalisierungsstrategie wird ein klares Bild der aktuellen Systemlandschaft benötigt.",
    "Layers",
    ["architektur", "systemlandschaft", "ist-architektur", "applikationen", "schnittstellen", "integration", "legacy", "enterprise-architektur", "togaf", "systemportfolio", "documentation", "mapping"],
    [
      "Schreibe einen Prompt für einen Enterprise-Architekten, der die IST-Architektur eines VU dokumentiert.",
      "Ergänze den Kontext: Anzahl Systeme (20+), Alter der Systeme, bekannte Integrationsprobleme, Dokumentationsziel.",
      "Definiere das Format: Systemkatalog, Integrations-Map (Schnittstellen), Technologie-Stack-Übersicht, Bewertung (Zustand/Relevanz).",
      "Füge Einschränkungen hinzu: Keine überdetaillierten Systemdokumentationen (Übersicht genügt), Priorität auf Schnittstellen, Sicherheitsaspekte.",
      "Erstelle vollständigen IST-Architektur-Prompt: Architekten-Rolle + Systemlandschaft + Erfassungsmethodik + Katalog-Format + Schnittstellen-Map + Bewertungskriterien.",
    ],
    "Enterprise-Architektur"
  ),
  ueScenario(
    "ue-arch-soll", "architekturmanagement",
    "SOLL-Architektur und Digitalisierungs-Roadmap",
    "Entwicklung einer Zielarchitektur und IT-Roadmap für die digitale Transformation.",
    "Ausgehend von der IST-Architektur soll eine SOLL-Architektur für 2027 entwickelt werden. Cloud-Migration, API-Strategie und Ablösung von Legacy-Systemen sind zentrale Themen.",
    "Map",
    ["soll-architektur", "zielarchitektur", "roadmap", "cloud", "api", "legacy-ablösung", "digitalisierung", "transformation", "migration", "strategie", "architekturentscheidung", "prinzipien"],
    [
      "Schreibe einen Prompt für einen Enterprise-Architekten, der eine SOLL-Architektur und Digitalisierungs-Roadmap entwickelt.",
      "Ergänze den Kontext: IST-Probleme, Digitalisierungsziele, Cloud-Strategie, Budget-Rahmen, Zeitrahmen (bis 2027).",
      "Definiere das Format: SOLL-Architektur-Vision, Architektur-Prinzipien, Roadmap (Phasen + Initiativen), Abhängigkeiten.",
      "Füge Einschränkungen hinzu: Kein 'Big Bang' — iterative Migration. Legacy-Systeme nicht sofort abschalten. Datenschutz bei Cloud.",
      "Erstelle vollständigen SOLL-Architektur-Prompt: Architekten-Rolle + IST-Analyse + SOLL-Vision + Architektur-Prinzipien + Roadmap + Risiken + Governance.",
    ],
    "Enterprise-Architektur"
  ),
  ueScenario(
    "ue-arch-api", "architekturmanagement",
    "API-Strategie entwickeln",
    "Entwicklung einer unternehmensweiten API-Strategie für eine moderne Systemintegration.",
    "Die Mecklenburgische Versicherung möchte von punkt-zu-punkt-Integrationen zu einer modernen API-gesteuerten Architektur wechseln. Eine API-Strategie mit Governance und Standardisierung wird benötigt.",
    "Link",
    ["api", "integration", "rest", "soap", "microservices", "api-management", "governance", "standardisierung", "partner", "ökosystem", "plattform", "openapi"],
    [
      "Schreibe einen Prompt für einen API-Architekten, der eine unternehmensweite API-Strategie entwickelt.",
      "Ergänze den Kontext: Aktuelle Integration (Punkt-zu-Punkt), Ziel (API-Plattform), Partner-Ökosystem, Technologie-Präferenzen.",
      "Definiere das Format: API-Strategie-Dokument (Prinzipien, Standards, Governance, Roadmap), API-Design-Guidelines.",
      "Füge Einschränkungen hinzu: Keine Breaking Changes ohne Versionierung, Sicherheitsstandards (OAuth, API Keys), bestehende Systeme schrittweise migrieren.",
      "Erstelle vollständigen API-Strategie-Prompt: API-Architekten-Rolle + Ausgangslage + Strategie-Framework + Design-Prinzipien + Governance + Roadmap + Security.",
    ],
    "API-Architektur"
  ),
  ueScenario(
    "ue-arch-security", "architekturmanagement",
    "IT-Sicherheitsarchitektur bewerten",
    "Bewertung und Optimierung der IT-Sicherheitsarchitektur eines Versicherungsunternehmens.",
    "Nach einem Sicherheitsaudit wurden Schwachstellen in der IT-Sicherheitsarchitektur identifiziert. Ein IT-Sicherheitsarchitekt muss die Schwachstellen priorisieren und einen Maßnahmenplan entwickeln.",
    "Lock",
    ["sicherheitsarchitektur", "it-sicherheit", "schwachstellen", "audit", "isms", "iso27001", "zero-trust", "dsgvo", "penetration-test", "risikobewertung", "maßnahmenplan", "compliance"],
    [
      "Schreibe einen Prompt für einen IT-Sicherheitsarchitekten, der Sicherheitsschwachstellen bewertet und einen Maßnahmenplan entwickelt.",
      "Ergänze den Kontext: Audit-Ergebnisse (Schwachstellen-Kategorien), regulatorische Anforderungen (DSGVO, VAIT), Kritikalität der Systeme.",
      "Definiere das Format: Schwachstellen-Priorisierungsmatrix, Maßnahmenplan (sofort/kurzfristig/langfristig), Sicherheits-Roadmap.",
      "Füge Einschränkungen hinzu: VAIT-Compliance (Versicherungsaufsichtliche Anforderungen IT), keine Störung des Livebetriebs, Zero-Trust-Prinzipien.",
      "Erstelle vollständigen Sicherheitsarchitektur-Prompt: IT-Security-Experten-Rolle + Audit-Ergebnisse + Risikobewertung + Priorisierungsmatrix + Maßnahmenplan + VAIT-Compliance.",
    ],
    "IT-Sicherheitsarchitektur"
  ),
  ueScenario(
    "ue-arch-daten", "architekturmanagement",
    "Datenarchitektur und Data Governance",
    "Entwicklung einer Datenarchitektur-Strategie und Data-Governance-Framework für das VU.",
    "Die Mecklenburgische Versicherung hat Datensilos in verschiedenen Systemen. Eine kohärente Datenarchitektur mit Data Governance soll Analytics, KI-Anwendungen und regulatorisches Reporting ermöglichen.",
    "Database",
    ["datenarchitektur", "data governance", "datenqualität", "datensilo", "master data", "analytics", "data lake", "data mesh", "metadaten", "dsgvo", "reporting", "ki-daten"],
    [
      "Schreibe einen Prompt für einen Datenarchitekten, der eine Datenarchitektur-Strategie und Data-Governance-Framework entwickelt.",
      "Ergänze den Kontext: Aktuelle Datenlage (Silos, Qualitätsprobleme), Analytics-Ziele, regulatorische Anforderungen (Solvency II, DSGVO).",
      "Definiere das Format: Datenarchitektur-Vision, Data-Governance-Framework (Rollen, Prozesse, Standards), Datenkatalog-Konzept.",
      "Füge Einschränkungen hinzu: DSGVO-Konformität bei Datenzusammenführung, keine Datenmonopole, Qualitäts-Gates definieren.",
      "Erstelle vollständigen Datenarchitektur-Prompt: Datenarchitekten-Rolle + Datenlage + Architektur-Vision + Governance-Framework + Qualitäts-Standards + DSGVO + Roadmap.",
    ],
    "Datenarchitektur"
  ),
];

// ── PMO (5 Szenarien) ─────────────────────────────────────────────────────────

export const SCENARIOS_UE_PMO: Scenario[] = [
  ueScenario(
    "ue-pmo-portfolio", "pmo",
    "Projekt-Portfolio-Management",
    "Aufbau und Steuerung eines Projekt-Portfolios für strategische Initiativen im VU.",
    "Die Mecklenburgische Versicherung hat 15 laufende IT- und Transformationsprojekte. Das PMO benötigt einen vollständigen Portfolio-Überblick zur Priorisierung, Ressourcensteuerung und strategischen Ausrichtung.",
    "LayoutDashboard",
    ["portfolio", "pmo", "priorisierung", "ressourcen", "kapazität", "strategische ausrichtung", "projektportfolio", "steuerung", "konflikte", "abhängigkeiten", "reporting", "lenkungsausschuss"],
    [
      "Schreibe einen Prompt für einen PMO-Manager, der ein Projekt-Portfolio für das Lenkungsgremium aufbereitet.",
      "Ergänze den Kontext: 15 laufende Projekte, knappe Ressourcen, strategische Prioritäten, Entscheidungsbedarfe.",
      "Definiere das Format: Portfolio-Dashboard (Projekte | Status | Budget | Ressourcen | Risiko | Strategiebeitrag), Priorisierungs-Empfehlung.",
      "Füge Einschränkungen hinzu: Politische Sensibilitäten bei Projekt-Priorisierung, Budget-Transparenz, Objektive Bewertungskriterien.",
      "Erstelle vollständigen Portfolio-Management-Prompt: PMO-Experten-Rolle + Portfolio-Beschreibung + Bewertungsmethodik + Dashboard-Format + Priorisierung + Entscheidungsvorlagen.",
    ],
    "Portfolio-Management"
  ),
  ueScenario(
    "ue-pmo-methodik", "pmo",
    "Projektmanagement-Methodik standardisieren",
    "Einführung einer einheitlichen PM-Methodik und PM-Toolbox für alle Projekte im VU.",
    "Jedes Projekt im VU nutzt aktuell andere Methoden und Templates. Das PMO soll eine einheitliche, pragmatische PM-Methodik entwickeln und einführen, die agile und klassische Ansätze kombiniert.",
    "BookOpen",
    ["pm-methodik", "standards", "templates", "pmo", "agil", "waterfall", "hybrid", "toolbox", "training", "rollout", "akzeptanz", "projektkultur"],
    [
      "Schreibe einen Prompt für einen PMO-Experten, der eine einheitliche PM-Methodik für ein VU entwickelt.",
      "Ergänze den Kontext: Aktuelle Methodenvielfalt, Projekt-Typen (IT, Change, Strategie), Unternehmenskultur, Rollout-Ziel.",
      "Definiere das Format: Methodik-Leitfaden (Phasen, Gates, Templates), PM-Toolbox, Schulungskonzept.",
      "Füge Einschränkungen hinzu: Keine unnötige Bürokratie, Methodik muss für kleine und große Projekte skalieren, Mitarbeiterbeteiligung bei Entwicklung.",
      "Erstelle vollständigen PM-Methodik-Prompt: PMO-Experten-Rolle + Ausgangslage + Methodik-Framework + Toolbox + Rollout-Plan + Schulung + Erfolgsmessung.",
    ],
    "PM-Methodik"
  ),
  ueScenario(
    "ue-pmo-reporting", "pmo",
    "PMO-Reporting und Governance-Dashboard",
    "Entwicklung eines transparenten PMO-Reportings für Führungsebene und Lenkungsgremien.",
    "Das PMO der Mecklenburgischen Versicherung soll regelmäßige Berichte für Vorstand und Lenkungsausschüsse liefern. Die Berichte müssen entscheidungsrelevant, klar und konsistent sein.",
    "BarChart",
    ["pmo", "reporting", "governance", "dashboard", "vorstand", "lenkungsausschuss", "kpi", "ampel", "entscheidungen", "eskalation", "transparenz", "portfolio-bericht"],
    [
      "Schreibe einen Prompt für einen PMO-Reporting-Verantwortlichen, der ein Governance-Dashboard und Reporting-System entwickelt.",
      "Ergänze den Kontext: Reporting-Empfänger (Vorstand, LA), Reporting-Häufigkeit, verfügbare Datenbasis, Entscheidungsbedarfe.",
      "Definiere das Format: Portfolio-Dashboard-Struktur, Standardbericht-Template, Ampel-System, Eskalations-Trigger.",
      "Füge Einschränkungen hinzu: Berichte müssen in 5 Minuten konsumierbar sein, objektive Ampel-Kriterien, keine Schönfärberei.",
      "Erstelle vollständigen PMO-Reporting-Prompt: PMO-Experten-Rolle + Empfänger-Profil + Dashboard-Konzept + Bericht-Template + Ampel-Kriterien + Governance-Prozess.",
    ],
    "PMO-Reporting"
  ),
  ueScenario(
    "ue-pmo-ressourcen", "pmo",
    "Ressourcenplanung über Projekte hinweg",
    "Unternehmensweite Ressourcenplanung und Kapazitätssteuerung für alle laufenden Projekte.",
    "Das PMO stellt fest, dass viele Mitarbeiter in mehreren Projekten eingeplant sind und es zu Kapazitätsengpässen kommt. Eine transparente Ressourcenplanung und Priorisierung ist dringend notwendig.",
    "Users",
    ["ressourcenplanung", "kapazität", "überlastung", "priorisierung", "ressourcenkonflikt", "skills", "verfügbarkeit", "forecast", "planung", "portfolio", "steuerung", "engpass"],
    [
      "Schreibe einen Prompt für einen PMO-Ressourcenplaner, der unternehmensweite Kapazitätsplanung für Projekte durchführt.",
      "Ergänze den Kontext: Anzahl Projekte (15), Engpass-Ressourcen (IT, Projektleiter), bekannte Konflikte, Planungshorizont.",
      "Definiere das Format: Ressourcen-Matrix (Person | Projekt | Auslastung | Zeitraum), Engpass-Analyse, Priorisierungs-Empfehlung.",
      "Füge Einschränkungen hinzu: Arbeitsrechtliche Grenzen (Überstunden), Datenschutz bei Mitarbeiter-Auslastungsdaten, Realitätscheck.",
      "Erstelle vollständigen Ressourcenplanungs-Prompt: Ressourcenplaner-Rolle + Portfolio-Überblick + Kapazitäts-Matrix + Engpass-Analyse + Priorisierung + Handlungsoptionen.",
    ],
    "Ressourcenplanung"
  ),
  ueScenario(
    "ue-pmo-qualitaet", "pmo",
    "Projektqualitätssicherung im PMO",
    "Entwicklung und Umsetzung eines Qualitätssicherungs-Frameworks für Projekte im VU.",
    "Das PMO beobachtet, dass Projekte häufig mit schlechter Qualität der Deliverables abgeschlossen werden. Ein QS-Framework mit Reviews, Gates und Qualitätskriterien soll eingeführt werden.",
    "CheckCircle",
    ["qualitätssicherung", "pmo", "review", "gate", "deliverable", "qualitätskriterien", "abnahme", "audit", "verbesserung", "standards", "peer-review", "checkliste"],
    [
      "Schreibe einen Prompt für einen PMO-Qualitätsmanager, der ein Qualitätssicherungs-Framework für Projekte entwickelt.",
      "Ergänze den Kontext: Häufige Qualitätsprobleme, Projekt-Typen, Gate-Konzept, QS-Ressourcen.",
      "Definiere das Format: QS-Framework (Gates + Qualitätskriterien + Review-Prozess), Deliverable-Checklisten, Audit-Template.",
      "Füge Einschränkungen hinzu: QS darf Projekte nicht unnötig verlangsamen, Proportionalität (kleines Projekt = weniger Gates), Unabhängigkeit der QS.",
      "Erstelle vollständigen PMO-QS-Prompt: Qualitätsmanager-Rolle + Ausgangslage + QS-Framework + Gate-Konzept + Deliverable-Standards + Review-Prozess + Verbesserungskreislauf.",
    ],
    "Projekt-Qualitätssicherung"
  ),
];

// ── Anforderungsmanagement (5 Szenarien) ──────────────────────────────────────

export const SCENARIOS_UE_ANFORDERUNGEN: Scenario[] = [
  ueScenario(
    "ue-anf-user-stories", "anforderungsmanagement",
    "User Stories schreiben",
    "Erstellung qualitativ hochwertiger User Stories für ein neues Self-Service-Portal im VU.",
    "Die Mecklenburgische Versicherung entwickelt ein Self-Service-Kundenportal. Business-Analysten und Product Owner müssen klare, testbare User Stories für das agile Entwicklungsteam erstellen.",
    "ClipboardList",
    ["user story", "agil", "product owner", "backlog", "akzeptanzkriterien", "definition of done", "epic", "scrum", "anforderungen", "portal", "self-service", "itil"],
    [
      "Schreibe einen Prompt für einen Business-Analysten/Product Owner, der User Stories für ein Self-Service-Portal schreibt.",
      "Ergänze den Kontext: Portal-Scope (Vertragsübersicht, Schadenmeldung, Kontaktänderung), Zielgruppe, technische Rahmenbedingungen.",
      "Definiere das Format: User-Story-Template (Als [Nutzer] möchte ich [Funktion] um [Nutzen]), Akzeptanzkriterien (Given/When/Then), Priorisierung.",
      "Füge Einschränkungen hinzu: INVEST-Kriterien (Independent, Negotiable, Valuable, Estimable, Small, Testable), keine technischen Implementierungsdetails.",
      "Erstelle vollständigen User-Story-Prompt: BA/PO-Rolle + Portal-Kontext + Story-Format + Akzeptanzkriterien + INVEST-Qualität + Priorisierungs-Framework.",
    ],
    "Business-Analyse"
  ),
  ueScenario(
    "ue-anf-lastenheft", "anforderungsmanagement",
    "Lastenheft für IT-System erstellen",
    "Erstellung eines vollständigen Lastenhefts für die Ausschreibung eines neuen Schadenmanagementsystems.",
    "Die Mecklenburgische Versicherung schreibt ein neues Schadenmanagementsystem aus. Ein vollständiges Lastenheft muss erstellt werden, das Anforderungen an Funktionalität, Performance, Integration und Compliance beschreibt.",
    "FileText",
    ["lastenheft", "anforderungen", "ausschreibung", "system", "funktional", "nicht-funktional", "integration", "schnittstellen", "compliance", "sla", "bid", "schadensystem"],
    [
      "Schreibe einen Prompt für einen Business-Analysten, der ein Lastenheft für ein Schadenmanagementsystem erstellt.",
      "Ergänze den Kontext: Systemscope (Schadenmeldung bis Regulierung), Nutzergruppen, Integrations-Systeme, regulatorische Anforderungen.",
      "Definiere das Format: Lastenheft-Struktur (Ausgangslage, Zielsetzung, funktionale Anforderungen, nicht-funktionale Anforderungen, Schnittstellen, Abnahmekriterien).",
      "Füge Einschränkungen hinzu: Messbare Anforderungen (SMART), keine Lösungsvorgaben im Lastenheft (Anforderungen ≠ Designvorgaben), VAIT-Compliance.",
      "Erstelle vollständigen Lastenheft-Prompt: BA-Rolle + Systemkontext + Lastenheft-Struktur + Anforderungskategorien + Qualitätskriterien + VAIT-Compliance.",
    ],
    "Requirements Engineering"
  ),
  ueScenario(
    "ue-anf-gap", "anforderungsmanagement",
    "Gap-Analyse: IST vs. SOLL-Anforderungen",
    "Identifikation und Analyse von Anforderungslücken zwischen einem bestehenden System und Zielanforderungen.",
    "Das bestehende Bestandsverwaltungssystem erfüllt neue regulatorische und fachliche Anforderungen nicht vollständig. Eine Gap-Analyse soll die Lücken identifizieren und Handlungsoptionen aufzeigen.",
    "GitCompare",
    ["gap-analyse", "anforderungslücken", "ist-soll", "bestandssystem", "regulatorisch", "fachlich", "priorität", "handlungsoptionen", "umsetzung", "kosten-nutzen", "anforderungen", "compliance"],
    [
      "Schreibe einen Prompt für einen Business-Analysten, der eine Gap-Analyse zwischen IST-System und SOLL-Anforderungen durchführt.",
      "Ergänze den Kontext: IST-System (Bestandsverwaltung, Alter, bekannte Schwächen), neue Anforderungen (regulatorisch, fachlich), Analyse-Ziel.",
      "Definiere das Format: Gap-Register (Anforderung | IST-Status | Lücke | Priorität | Handlungsoption), Priorisierungsmatrix.",
      "Füge Einschränkungen hinzu: Objektive Bewertung (keine Schönrednerei), regulatorische Pflicht-Gaps separat markieren, Umsetzbarkeit realistisch einschätzen.",
      "Erstelle vollständigen Gap-Analyse-Prompt: BA-Rolle + IST-Beschreibung + SOLL-Anforderungen + Analyse-Methodik + Gap-Register + Priorisierung + Handlungsoptionen.",
    ],
    "Business-Analyse"
  ),
  ueScenario(
    "ue-anf-workshop", "anforderungsmanagement",
    "Anforderungs-Workshop moderieren",
    "Planung und Moderation eines Anforderungsworkshops mit Fachbereich und IT für ein neues Versicherungsprodukt.",
    "Für die Einführung eines neuen Telematik-Kfz-Produkts soll ein Anforderungsworkshop mit Produktmanagement, Aktuariat, IT und Vertrieb durchgeführt werden. Die Ergebnisse müssen strukturiert dokumentiert werden.",
    "Users",
    ["workshop", "anforderungsworkshop", "moderation", "stakeholder", "requirements", "telematik", "kfz", "produktentwicklung", "visualisierung", "consensus", "dokumentation", "ergebnisse"],
    [
      "Schreibe einen Prompt für einen Business-Analysten/Moderator, der einen Anforderungsworkshop für ein neues Produkt plant und moderiert.",
      "Ergänze den Kontext: Produkt (Telematik-Kfz), Teilnehmer (Produktmanagement, Aktuariat, IT, Vertrieb), Workshop-Ziel, Dauer.",
      "Definiere das Format: Workshop-Agenda, Moderations-Methoden (Brainstorming, Dot-Voting, MoSCoW), Dokumentations-Template für Ergebnisse.",
      "Füge Einschränkungen hinzu: Alle Stakeholder müssen zu Wort kommen (nicht nur Laute), Interessenkonflikte moderieren, Ergebnisse sofort dokumentieren.",
      "Erstelle vollständigen Workshop-Prompt: Moderator-Rolle + Workshop-Kontext + Agenda [ZEITPLAN] + Moderations-Methoden + Konflikt-Management + Dokumentations-Format.",
    ],
    "Anforderungsworkshop"
  ),
  ueScenario(
    "ue-anf-abnahme", "anforderungsmanagement",
    "Abnahmetests und Akzeptanzkriterien",
    "Entwicklung eines Abnahmetestkonzepts und Definition von Akzeptanzkriterien für ein neues IT-System.",
    "Das neue CRM-System der Mecklenburgischen Versicherung ist fertig entwickelt. Vor dem Go-Live müssen Abnahmetests durchgeführt werden. Business-seitige Akzeptanzkriterien und Testfälle müssen definiert werden.",
    "CheckSquare",
    ["abnahmetest", "uat", "akzeptanzkriterien", "testfall", "testplan", "go-live", "fehlerklassen", "regressionstest", "abnahme", "pilotbetrieb", "qualität", "crm"],
    [
      "Schreibe einen Prompt für einen Business-Analysten/Test-Manager, der Abnahmetests für ein neues CRM-System konzipiert.",
      "Ergänze den Kontext: CRM-Scope, Nutzergruppen, kritische Geschäftsprozesse, Fehlertoleranz für Go-Live.",
      "Definiere das Format: Abnahmetest-Plan (Testfälle | Schritte | Erwartetes Ergebnis | Priorität | Fehlerklasse), Abnahme-Kriterien.",
      "Füge Einschränkungen hinzu: Testfälle müssen reproduzierbar sein, Fehlerklassen definieren (kritisch/major/minor), Go-Live-Entscheidungskriterien festlegen.",
      "Erstelle vollständigen Abnahmetest-Prompt: Test-Manager-Rolle + CRM-Scope + Testplan-Format + Testfälle [KRITISCHE PROZESSE] + Fehlerklassen + Go-Live-Kriterien + Pilotbetrieb-Plan.",
    ],
    "Abnahmetests"
  ),
];

// ── Strategie (5 Szenarien) ───────────────────────────────────────────────────

export const SCENARIOS_UE_STRATEGIE: Scenario[] = [
  ueScenario(
    "ue-strat-analyse", "strategie",
    "Strategische Unternehmensanalyse (SWOT/PESTEL)",
    "Durchführung einer strategischen Analyse für die Mecklenburgische Versicherung.",
    "Der Vorstand benötigt eine aktuelle strategische Analyse, um die mittelfristige Unternehmensstrategie zu entwickeln. SWOT und PESTEL sollen eingesetzt werden, um das strategische Umfeld zu verstehen.",
    "Compass",
    ["strategie", "swot", "pestel", "unternehmensanalyse", "wettbewerb", "markt", "stärken", "schwächen", "chancen", "risiken", "umfeld", "strategisch"],
    [
      "Schreibe einen Prompt für einen Strategie-Berater, der eine vollständige strategische Analyse für ein VU durchführt.",
      "Ergänze den Kontext: Unternehmensgegenstand (regionale Versicherung), Marktsituation (Konsolidierung), strategische Fragestellungen.",
      "Definiere das Format: SWOT-Matrix, PESTEL-Analyse, strategische Handlungsfelder, Priorisierung.",
      "Füge Einschränkungen hinzu: Keine Spekulation über nicht-öffentliche Wettbewerber-Informationen, Objektivität, Quellen-Transparenz.",
      "Erstelle vollständigen Strategie-Analyse-Prompt: Stratege-Rolle + Unternehmenskontext + SWOT [FORMAT] + PESTEL [FORMAT] + Handlungsfelder + Priorisierung.",
    ],
    "Strategieberatung"
  ),
  ueScenario(
    "ue-strat-vision", "strategie",
    "Unternehmensvision und -strategie entwickeln",
    "Entwicklung einer klaren Vision, Mission und strategischen Stoßrichtungen für das VU.",
    "Die Mecklenburgische Versicherung soll eine neue 5-Jahres-Strategie entwickeln. Vision, Mission und strategische Stoßrichtungen (z.B. Digitalisierung, Regionalität, Nachhaltigkeit) müssen erarbeitet werden.",
    "Star",
    ["vision", "mission", "strategie", "leitbild", "strategic pillars", "5-jahres-plan", "stoßrichtungen", "nachhaltigkeit", "digitalisierung", "regionalität", "werte", "unternehmenskultur"],
    [
      "Schreibe einen Prompt für einen Strategie-Berater, der Vision, Mission und strategische Stoßrichtungen für ein VU entwickelt.",
      "Ergänze den Kontext: Aktuelle Positionierung, strategische Optionen, Stakeholder (Vorstand, Mitarbeiter, Kunden), gewünschter Zeithorizont.",
      "Definiere das Format: Vision (1 kraftvoller Satz), Mission (Zweck + Zielgruppe + Besonderheit), Strategische Stoßrichtungen (3-5) mit je Zielen und KPIs.",
      "Füge Einschränkungen hinzu: Vision muss authentisch und umsetzbar sein, kein Marketing-Jargon, Strategiepapier muss konsensfähig sein.",
      "Erstelle vollständigen Strategie-Entwicklungs-Prompt: Stratege-Rolle + Unternehmenskontext + Entwicklungs-Methodik + Vision+Mission+Stoßrichtungen [FORMAT] + KPIs + Konsens-Prozess.",
    ],
    "Strategieentwicklung"
  ),
  ueScenario(
    "ue-strat-oku", "strategie",
    "OKR-System einführen",
    "Einführung von Objectives & Key Results als Steuerungssystem für strategische Ziele.",
    "Die Mecklenburgische Versicherung möchte ihr Zielsteuerungssystem modernisieren und OKRs einführen. Von der Unternehmensebene bis zu den Abteilungen sollen messbare Ziele kaskadiert werden.",
    "Target",
    ["okr", "objectives", "key results", "zielsteuerung", "kaskadierung", "quartz", "strategie", "messbarkeit", "transparenz", "quarterly", "focus", "alignment"],
    [
      "Schreibe einen Prompt für einen OKR-Coach/Strategen, der ein OKR-System für ein VU einführt.",
      "Ergänze den Kontext: Aktuelle Zielsteuerung (MBO/Budgetplanung), Ziel des OKR-Systems, Pilotbereich, Zeitrahmen.",
      "Definiere das Format: OKR-Framework-Beschreibung, Unternehmens-OKRs (Beispiele), Abteilungs-OKR-Template, Quartalsplanung.",
      "Füge Einschränkungen hinzu: OKRs dürfen nicht mit Boni verknüpft werden (Moonshots statt sichere Ziele), max. 3 Objectives je Ebene, Quarterly Reviews.",
      "Erstelle vollständigen OKR-Einführungs-Prompt: OKR-Experten-Rolle + IST-Zielsteuerung + OKR-Framework + Unternehmens-OKRs + Kaskadierung + Rollout-Plan + Schulungskonzept.",
    ],
    "OKR-Management"
  ),
  ueScenario(
    "ue-strat-business-case", "strategie",
    "Business Case für strategische Initiative",
    "Erstellung eines vollständigen Business Cases für eine größere strategische Investition.",
    "Die Mecklenburgische Versicherung erwägt eine größere Investition in KI-gestützte Schadenbearbeitung (Investition: 2 Mio. EUR, Amortisation in 3 Jahren). Ein vollständiger Business Case für den Vorstand wird benötigt.",
    "DollarSign",
    ["business case", "investition", "roi", "amortisation", "kosten-nutzen", "ki", "schadenbearbeitung", "vorstands-entscheidung", "finanzmodell", "risiken", "alternativen", "empfehlung"],
    [
      "Schreibe einen Prompt für einen Strategen/Controller, der einen Business Case für eine KI-Investition erstellt.",
      "Ergänze den Kontext: Investition (2 Mio. EUR, KI-Schadenbearbeitung), erwarteter Nutzen, Risiken, Alternativen, Entscheidungstermin.",
      "Definiere das Format: Business-Case-Struktur (Executive Summary, Ausgangslage, Optionen, Finanzmodell, Risiken, Empfehlung), ROI-Berechnung.",
      "Füge Einschränkungen hinzu: Finanzielle Annahmen transparent machen, Sensitivitätsanalyse, pessimistisches Szenario einbeziehen.",
      "Erstelle vollständigen Business-Case-Prompt: Controller/Strategen-Rolle + Investitionskontext + Business-Case-Struktur + Finanzmodell + Sensitivitätsanalyse + Risiken + Empfehlung.",
    ],
    "Business-Case"
  ),
  ueScenario(
    "ue-strat-nachhaltigkeit", "strategie",
    "Nachhaltigkeitsstrategie für das VU",
    "Entwicklung einer ESG-Strategie und Nachhaltigkeitsberichterstattung für die Mecklenburgische Versicherung.",
    "Regulatorische Anforderungen (CSRD, Solvency II ESG) und Kundenpräferenzen erfordern eine klare Nachhaltigkeitsstrategie. Umwelt (E), Soziales (S) und Governance (G) müssen adressiert werden.",
    "Leaf",
    ["nachhaltigkeit", "esg", "csrd", "klimarisiken", "solvency ii", "greenwashing", "co2", "soziale verantwortung", "governance", "berichterstattung", "taxonomie", "paris-agreement"],
    [
      "Schreibe einen Prompt für einen ESG-Strategen, der eine Nachhaltigkeitsstrategie für ein VU entwickelt.",
      "Ergänze den Kontext: Regulatorische Anforderungen (CSRD ab 2025, Solvency II ESG), aktuelle ESG-Aktivitäten, strategische ESG-Ziele.",
      "Definiere das Format: ESG-Strategie-Dokument (E/S/G-Ziele, Maßnahmen, KPIs), Nachhaltigkeitsbericht-Grundstruktur, Kommunikationskonzept.",
      "Füge Einschränkungen hinzu: Kein Greenwashing, CSRD-Compliance, Doppelwesentlichkeitsanalyse, messbare Ziele.",
      "Erstelle vollständigen ESG-Strategie-Prompt: ESG-Experten-Rolle + Regulatorischer Kontext + ESG-Framework + Ziele [E/S/G] + KPIs + Berichterstattung + Anti-Greenwashing.",
    ],
    "Nachhaltigkeitsstrategie"
  ),
];

// ── Kommunikation & Change (5 Szenarien) ──────────────────────────────────────

export const SCENARIOS_UE_CHANGE: Scenario[] = [
  ueScenario(
    "ue-change-transformation", "kommunikation-change",
    "Change-Management für Digitalisierungsprojekt",
    "Entwicklung einer Change-Management-Strategie für ein großes Digitalisierungsprojekt im VU.",
    "Die Einführung eines neuen CRM-Systems betrifft 200 Mitarbeiter und verändert deren Arbeitsweise grundlegend. Eine durchdachte Change-Management-Strategie soll Widerstand minimieren und Adoption maximieren.",
    "RefreshCw",
    ["change management", "transformation", "widerstand", "adoption", "kommunikation", "training", "stakeholder", "kotter", "prosci", "adkar", "change agents", "kulturtransformation"],
    [
      "Schreibe einen Prompt für einen Change-Manager, der eine Change-Management-Strategie für eine CRM-Einführung entwickelt.",
      "Ergänze den Kontext: Projekt-Scope (CRM, 200 MA), Hauptwiderstände (Angst vor Jobverlust, Systemkomplexität), Change-Ressourcen.",
      "Definiere das Format: Change-Management-Plan (Stakeholder-Analyse, Kommunikationsplan, Schulungsplan, Widerstandsmanagement).",
      "Füge Einschränkungen hinzu: Betriebsrat frühzeitig einbinden, keine Veränderungsankündigungen ohne Vorbereitung, Widerstand als Information behandeln.",
      "Erstelle vollständigen Change-Management-Prompt: Change-Manager-Rolle + Projekt-Kontext + ADKAR/Kotter-Framework + Stakeholder + Kommunikation + Training + Widerstandsmanagement.",
    ],
    "Change-Management"
  ),
  ueScenario(
    "ue-change-kommunikation", "kommunikation-change",
    "Interne Kommunikationsstrategie",
    "Entwicklung einer internen Kommunikationsstrategie für strategische Veränderungen im VU.",
    "Der Vorstand der Mecklenburgischen Versicherung hat eine neue Strategie verabschiedet, die Restrukturierungen und neue Prioritäten bedeutet. Eine klare, transparente und motivierende interne Kommunikation ist entscheidend.",
    "MessageSquare",
    ["interne kommunikation", "strategie", "transparenz", "mitarbeiter", "führungskräfte", "kaskadierung", "townhall", "newsletter", "intranet", "botschaft", "vertrauen", "restrukturierung"],
    [
      "Schreibe einen Prompt für einen Kommunikationsmanager, der eine interne Kommunikationsstrategie für eine strategische Veränderung entwickelt.",
      "Ergänze den Kontext: Veränderungsinhalt (neue Strategie, Restrukturierung), Zielgruppen (Alle MA, Führungskräfte, Betriebsrat), Kommunikationsziele.",
      "Definiere das Format: Kommunikationsplan (Was | An wen | Wann | Kanal | Botschaft | Format), Key Messages, Q&A-Dokument.",
      "Füge Einschränkungen hinzu: Keine Gerüchte durch Schweigen, Führungskräfte zuerst informieren, Ehrlichkeit über Unsicherheiten.",
      "Erstelle vollständigen internen Kommunikations-Prompt: Kommunikationsmanager-Rolle + Veränderungskontext + Kommunikationsplan + Key Messages + Kaskadierungsstrategie + Q&A + Feedback-Loop.",
    ],
    "Unternehmenskommunikation"
  ),
  ueScenario(
    "ue-change-kultur", "kommunikation-change",
    "Unternehmenskultur-Entwicklung",
    "Analyse und gezielte Entwicklung der Unternehmenskultur im Rahmen der Digitalisierungsstrategie.",
    "Die Mecklenburgische Versicherung möchte ihre Unternehmenskultur hin zu mehr Agilität, Kundenorientierung und digitalem Mindset entwickeln. Eine Kulturanalyse und Entwicklungsstrategie werden benötigt.",
    "Heart",
    ["unternehmenskultur", "kulturwandel", "agilität", "digitales mindset", "werte", "verhaltensweisen", "kulturdiagnose", "culture change", "leadership", "new work", "psychologische sicherheit", "feedback"],
    [
      "Schreibe einen Prompt für einen Kulturentwicklungs-Experten, der eine Kulturdiagnose und Entwicklungsstrategie für ein VU entwickelt.",
      "Ergänze den Kontext: Aktuelle Kulturmerkmale (traditionell, hierarchisch), Zielkultur (agil, kundenorientiert), Treiber (Digitalisierung), Zeitrahmen.",
      "Definiere das Format: Kulturdiagnose-Ergebnis, Zielkultur-Beschreibung, Entwicklungsmaßnahmen (Führung, Prozesse, Symbole), Erfolgsmessung.",
      "Füge Einschränkungen hinzu: Kultur lässt sich nicht erzwingen — nur ermöglichen. Authentizität statt Plakate. Langfristiger Prozess (3-5 Jahre).",
      "Erstelle vollständigen Kulturentwicklungs-Prompt: Kultur-Experten-Rolle + Kulturdiagnose + Zielkultur + Hebel [FÜHRUNG/PROZESSE/SYMBOLE] + Maßnahmen + Messung + Timeline.",
    ],
    "Kulturentwicklung"
  ),
  ueScenario(
    "ue-change-widerstand", "kommunikation-change",
    "Widerstände im Change-Prozess überwinden",
    "Analyse von Change-Widerständen und Entwicklung von Strategien zu deren konstruktiver Überwindung.",
    "Bei der Einführung eines neuen Arbeitszeitmodells (Vertrauensarbeitszeit + Home-Office) zeigen sich erhebliche Widerstände bei Führungskräften und Teilen der Belegschaft. Strategien zur Überwindung werden benötigt.",
    "Zap",
    ["widerstand", "change", "einwände", "führungskräfte", "home-office", "vertrauensarbeitszeit", "überzeugung", "partizipation", "pilotprojekt", "kommunikation", "angst", "kontrolle"],
    [
      "Schreibe einen Prompt für einen Change-Berater, der Widerstände gegen ein neues Arbeitszeitmodell analysiert und Überwindungsstrategien entwickelt.",
      "Ergänze den Kontext: Neues Modell (Vertrauensarbeitszeit + HO), Widerstand (Führungskräfte: Kontrollverlust, MA: Mehrarbeit-Angst), Entscheidungsstand.",
      "Definiere das Format: Widerstands-Analyse (Gruppen | Gründe | Intensität), Überwindungsstrategien (je Gruppe), Kommunikations-Ansatz, Pilotprojekt-Idee.",
      "Füge Einschränkungen hinzu: Widerstand ernst nehmen (keine Durchdrücken), Betriebsrat einbeziehen, Freiwilligkeit bei Pilotphase.",
      "Erstelle vollständigen Widerstands-Management-Prompt: Change-Berater-Rolle + Veränderungskontext + Widerstands-Analyse + Strategien [JE GRUPPE] + Kommunikation + Pilot-Konzept.",
    ],
    "Widerstandsmanagement"
  ),
  ueScenario(
    "ue-change-fuehrung", "kommunikation-change",
    "Führungskräfte als Change Agents entwickeln",
    "Befähigung von Führungskräften, Change-Prozesse aktiv zu führen und ihre Teams durch Veränderungen zu begleiten.",
    "Führungskräfte der Mecklenburgischen Versicherung sind in Change-Projekten oft unsicher. Ein Entwicklungsprogramm soll sie befähigen, Change aktiv zu führen — nicht nur zu verwalten.",
    "UserCheck",
    ["change agents", "führung", "befähigung", "training", "coaching", "kommunikation", "vorbildfunktion", "team", "begleitung", "resilienz", "change leadership", "empowerment"],
    [
      "Schreibe einen Prompt für einen Change-Leadership-Coach, der Führungskräfte als Change Agents entwickelt.",
      "Ergänze den Kontext: Führungskräfte-Profil (Erfahrung, Change-Kompetenz aktuell), spezifische Entwicklungsbedarfe, Programm-Format.",
      "Definiere das Format: Entwicklungsprogramm (Kompetenzen, Module, Methoden), Change-Agent-Toolkit, Transfer-Aufgaben.",
      "Füge Einschränkungen hinzu: Führungskräfte sind zeitlich stark eingespannt, kein Theorieüberfluss, sofort anwendbare Tools, Vertraulichkeit im Coaching.",
      "Erstelle vollständigen Change-Agent-Entwicklungs-Prompt: Coach-Rolle + FK-Profil + Kompetenzmodell + Programm [MODULE] + Toolkit + Transfer-Aufgaben + Erfolgsmessung.",
    ],
    "Change Leadership"
  ),
];

// ── Export all UE scenarios ───────────────────────────────────────────────────

export const SCENARIOS_UE: Scenario[] = [
  ...SCENARIOS_UE_PM,
  ...SCENARIOS_UE_PROZESS,
  ...SCENARIOS_UE_ARCHITEKTUR,
  ...SCENARIOS_UE_PMO,
  ...SCENARIOS_UE_ANFORDERUNGEN,
  ...SCENARIOS_UE_STRATEGIE,
  ...SCENARIOS_UE_CHANGE,
];
