import type { Scenario } from "./types";
import { makeLevels } from "./scenario-factory";

export const SCENARIOS_ALLGEMEIN: Scenario[] = [
  {
    id: "allg-meeting",
    categoryId: "allgemein",
    title: "Besprechungsprotokoll erstellen",
    shortDescription: "KI-gestützte Protokollierung von Abteilungsmeetings im Versicherungsunternehmen.",
    context: "Im Versicherungsunternehmen finden täglich zahlreiche interne Besprechungen statt — von Teamrunden über Projektmeetings bis zu Fachbereichssitzungen. Protokolle werden oft unstrukturiert und zeitaufwendig erstellt. KI soll helfen, aus Stichworten oder Mitschriften ein sauberes, handlungsorientierteres Protokoll zu erzeugen.",
    icon: "FileText",
    keywords: ["protokoll", "meeting", "besprechung", "tagesordnung", "maßnahmen", "verantwortlich", "termin", "beschluss", "sitzung", "abteilung", "follow-up", "aktionspunkte"],
    levels: makeLevels([
      {
        focus: "Grundstruktur: Rolle und Auftrag",
        task: "Schreibe einen Prompt, der dem KI-Assistenten erklärt, wer er ist (Rolle) und was er tun soll: ein strukturiertes Besprechungsprotokoll erstellen.",
        hints: [
          "Dein Prompt braucht mindestens eine Rolle ('Du bist...') und einen Auftrag ('Erstelle...').",
          "Beginne mit der Rolle, z.B. 'Du bist ein erfahrener Bürokommunikations-Assistent...' und formuliere dann den Auftrag.",
          "Beispiel-Rolle: 'Du bist ein erfahrener Assistent für professionelle Unternehmenskommunikation in einem Versicherungsunternehmen.'",
          "Fast-Beispiel: 'Du bist ein [ROLLE]. Deine Aufgabe ist es, aus den folgenden Stichworten ein strukturiertes Meeting-Protokoll zu erstellen: [STICHWORTE].'",
        ],
      },
      {
        focus: "Kontext: Meeting-Art und Teilnehmer beschreiben",
        task: "Ergänze deinen Prompt um Kontext: Welche Art von Meeting? Welche Abteilung? Wer hat teilgenommen? Was war das Ziel der Besprechung?",
        hints: [
          "Gib die Meeting-Art (Teambesprechung, Projektmeeting, Lenkungsausschuss) und die beteiligte Abteilung an.",
          "Füge Informationen zu Teilnehmern, Datum und Thema hinzu, damit die KI den Kontext versteht.",
          "Beispiel: 'Wöchentliche Schadenabteilungs-Teambesprechung am [Datum], Teilnehmer: Teamleiter, 4 Sachbearbeiter, IT-Koordinator. Thema: Digitalisierung der Schadenerfassung.'",
          "Fast-Beispiel: 'Du bist [ROLLE]. Heute fand eine [MEETING-ART] der Abteilung [ABTEILUNG] statt. Teilnehmer: [LISTE]. Hauptthemen: [THEMEN]. Erstelle ein Protokoll.'",
        ],
      },
      {
        focus: "Format: Struktur des Protokolls definieren",
        task: "Definiere das genaue Ausgabeformat des Protokolls: Welche Abschnitte soll es haben? In welcher Reihenfolge? Wie werden Aktionspunkte dargestellt?",
        hints: [
          "Ein gutes Protokoll hat klare Abschnitte: Metadaten, TOP-Liste, Beschlüsse, Aktionspunkte mit Verantwortlichen und Terminen.",
          "Spezifiziere das Format der Aktionspunkte: Aktion | Verantwortlich | Termin als Tabelle oder Liste.",
          "Beispiel-Format: '1. Kopfzeile (Datum, Teilnehmer), 2. Tagesordnungspunkte mit Diskussionszusammenfassung, 3. Beschlüsse, 4. Aktionspunkte als Tabelle.'",
          "Fast-Beispiel: 'Strukturiere das Protokoll wie folgt: [ABSCHNITT 1], [ABSCHNITT 2], [ABSCHNITT 3]. Aktionspunkte als Tabelle: Aufgabe | Wer | Bis wann.'",
        ],
      },
      {
        focus: "Einschränkungen: Vertraulichkeit und Präzision",
        task: "Füge Einschränkungen hinzu: Was soll die KI nicht tun? Wie geht sie mit unklaren Angaben um? Was ist bei vertraulichen Informationen zu beachten?",
        hints: [
          "Definiere, was die KI bei fehlenden Informationen tun soll (Platzhalter einfügen, nachfragen) statt zu erfinden.",
          "Wichtig in einem VU: Keine internen Zahlen oder personenbezogenen Daten ohne Notwendigkeit aufführen.",
          "Beispiel Einschränkung: 'Erfinde keine Informationen, die nicht in den Stichworten enthalten sind. Markiere fehlende Angaben mit [?].'",
          "Fast-Beispiel: '...Einschränkungen: Keine Informationen erfinden. Fehlende Angaben als [FEHLT] markieren. Keine personenbezogenen Daten ohne Notwendigkeit. Vertrauliche Beschlüsse mit [VERTRAULICH] kennzeichnen.'",
        ],
      },
      {
        focus: "Champion: Vollständiges Protokoll-Prompt-System",
        task: "Erstelle einen vollständigen Prompt, der Rolle, Meeting-Kontext, Eingabe-Format der Stichworte, gewünschtes Ausgabe-Format UND Qualitätsstandards (klar, handlungsorientiert, vollständig) abdeckt.",
        hints: [
          "Champion-Prompt: präzise Rolle + Meeting-Typ + Eingabeformat-Erläuterung + detailliertes Ausgabeformat + Qualitäts- und Vertraulichkeitsregeln.",
          "Füge hinzu: Wie soll die KI mit Auslassungen umgehen? Wie mit Widersprüchen? Wie mit offenen Fragen?",
          "Profi-Tipp: Weise die KI an, am Ende eine 'Management Summary' in 3 Sätzen zu erstellen.",
          "Fast-Beispiel: 'Du bist [ROLLE]. Erstelle aus folgenden Meeting-Stichworten [INPUT] ein Protokoll in diesem Format: [FORMAT]. Qualitätsstandards: [LISTE]. Falls unklar: [VORGEHEN]. Abschließend: 3-Satz-Summary.'",
        ],
      },
    ]),
  },
  {
    id: "allg-email",
    categoryId: "allgemein",
    title: "Professionelle Kunden-E-Mail formulieren",
    shortDescription: "Klare, empathische Kunden-E-Mails für verschiedene Versicherungsanlässe verfassen.",
    context: "Mitarbeiter im Innendienst müssen täglich Kunden-E-Mails schreiben — zu Vertragsänderungen, Schadenstatus, Ablehnungen oder Angebotsanfragen. Die Qualität variiert stark. KI soll helfen, professionelle, empathische und rechtssichere E-Mails effizient zu formulieren.",
    icon: "Mail",
    keywords: ["e-mail", "kunde", "anschreiben", "kommunikation", "versicherung", "betreff", "anrede", "grußformel", "sachverhalt", "reaktion", "anliegen", "korrespondenz"],
    levels: makeLevels([
      {
        focus: "Grundstruktur: Rolle und Auftrag",
        task: "Schreibe einen Prompt, der dem KI-Assistenten erklärt, wer er ist und was er tun soll: eine professionelle Kunden-E-Mail für ein Versicherungsunternehmen formulieren.",
        hints: [
          "Definiere eine klare Rolle für den KI-Assistenten (Kommunikationsexperte, Sachbearbeiter o.ä.) und den Auftrag (E-Mail schreiben).",
          "Beispiel-Rolle: 'Du bist ein erfahrener Kommunikationsexperte einer deutschen Versicherung.'",
          "Der Auftrag sollte klar sein: Was für eine E-Mail? An wen? Zu welchem Anlass?",
          "Fast-Beispiel: 'Du bist ein [ROLLE] bei [UNTERNEHMEN]. Formuliere eine professionelle E-Mail an einen Kunden zum Thema [THEMA].'",
        ],
      },
      {
        focus: "Kontext: Anlass und Empfänger",
        task: "Ergänze den Prompt um: Welcher konkrete Anlass? Wer ist der Empfänger? Welchen Ton erwartet der Kunde? Welche Informationen müssen enthalten sein?",
        hints: [
          "Beschreibe den Anlass (Schadenablehnung, Vertragsverlängerung, Angebotsübersendung) und den Kunden (Neukunde, langjähriger Kunde, aufgebrachter Kunde).",
          "Je mehr Kontext du gibst, desto besser wird die E-Mail: Kundensituation, relevante Vertragsdaten, Vorgeschichte.",
          "Beispiel: 'Ein langjähriger Kunde (15 Jahre) hat einen Wasserschaden gemeldet. Die Regulierung dauert länger als erwartet. Erkläre den Grund und zeige Verständnis.'",
          "Fast-Beispiel: 'Du bist [ROLLE]. Schreibe eine E-Mail an [EMPFÄNGER] (Kundenprofil: [DETAILS]). Anlass: [SITUATION]. Wichtige Punkte: [LISTE].'",
        ],
      },
      {
        focus: "Ton und Format der E-Mail",
        task: "Definiere den gewünschten Ton (empathisch, sachlich, verbindlich) und das Format (Betreffzeile, Anrede, Absätze, Abschluss). Gib vor, welche Standardelemente die E-Mail haben soll.",
        hints: [
          "Lege Tonalität fest: empathisch + sachlich für Schadenfälle, überzeugend + freundlich für Angebote.",
          "Spezifiziere das Format: Betreffzeile, Anrede, Einleitungssatz, Kerninformation, nächste Schritte, Grußformel.",
          "Beispiel-Ton: 'Schreibe empathisch, verständnisvoll und lösungsorientiert. Vermeide Fachjargon. Nutze einfache, verständliche Sprache.'",
          "Fast-Beispiel: '...Ton: [BESCHREIBUNG]. Format: 1. Betreff, 2. Anrede, 3. [ABSCHNITTE], 4. CTA: [AKTION], 5. Grußformel. Länge: max. [N] Sätze.'",
        ],
      },
      {
        focus: "Einschränkungen: Rechtliches und Compliance",
        task: "Füge rechtliche und compliance-relevante Einschränkungen hinzu: Was darf die E-Mail nicht enthalten? Welche Zusagen dürfen nicht gemacht werden? Welche Datenschutzregeln gelten?",
        hints: [
          "Wichtige Einschränkungen im VU: Keine Deckungszusagen, keine verbindlichen Regulierungszusagen, keine personenbezogenen Daten Dritter.",
          "Compliance: Keine herabsetzenden Äußerungen, keine falschen Darstellungen, kein Versprechen konkreter Leistungsbeträge.",
          "Beispiel: 'Die E-Mail darf keine Deckungszusagen enthalten. Verweise auf den offiziellen Regulierungsprozess. Schreibe keine konkreten Auszahlungsbeträge.'",
          "Fast-Beispiel: '...Einschränkungen: Keine [ZUSAGEN]. Verweise auf [PROZESS]. Datenschutz: Keine [DATEN]. Eskaliere an [PERSON] wenn [SITUATION].'",
        ],
      },
      {
        focus: "Champion: Vollständiges E-Mail-Briefing",
        task: "Erstelle ein vollständiges E-Mail-Briefing-Prompt: Experten-Rolle, vollständige Kundensituation, Tonalität, exaktes Format, juristische Leitplanken, und einen Hinweis auf die Mustermann-Unternehmensidentität (Mecklenburgische Versicherung).",
        hints: [
          "Vollständiges Briefing: Rolle, Unternehmenszugehörigkeit, Kundenstatus, Anlass, Tonalität, Format mit Abschnitten, Compliance-Grenzen.",
          "Füge hinzu: Wie soll die KI mit fehlenden Informationen umgehen? Soll sie Varianten anbieten?",
          "Profi-Tipp: Weise die KI an, eine kurze Bearbeitungsnotiz für die Akte zu erstellen (intern, nicht für den Kunden).",
          "Fast-Beispiel: 'Du bist [EXPERTE] der Mecklenburgischen Versicherung. Erstelle für [SITUATION] eine E-Mail (Ton: [X], Format: [Y]) und eine interne Aktennotiz. Einschränkungen: [LISTE].'",
        ],
      },
    ]),
  },
  {
    id: "allg-recherche",
    categoryId: "allgemein",
    title: "Markt- und Wettbewerbsrecherche",
    shortDescription: "Systematische Analyse von Markttrends und Wettbewerbern im Versicherungsbereich.",
    context: "Die Versicherungsbranche verändert sich durch Digitalisierung, neue Marktteilnehmer (InsurTechs) und veränderte Kundenbedürfnisse. Fachkräfte brauchen regelmäßig strukturierte Marktinformationen. KI soll bei der systematischen Aufbereitung von Markt- und Wettbewerbsdaten helfen.",
    icon: "Search",
    keywords: ["markt", "wettbewerb", "analyse", "insurtech", "digital", "trend", "konkurrenz", "marktanteil", "strategie", "positionierung", "benchmark", "branche"],
    levels: makeLevels([
      {
        focus: "Grundstruktur: Analystenrolle und Auftrag",
        task: "Schreibe einen Prompt, der dem KI-Assistenten eine Analystenrolle gibt und ihn beauftragt, eine Marktanalyse im Versicherungsbereich zu erstellen.",
        hints: [
          "Definiere eine Analysten-Rolle und einen klaren Forschungsauftrag.",
          "Beispiel-Rolle: 'Du bist ein erfahrener Marktanalyst mit Spezialisierung auf die Versicherungsbranche.'",
          "Der Auftrag sollte spezifizieren, was analysiert werden soll.",
          "Fast-Beispiel: 'Du bist ein [ANALYST]. Analysiere den [MARKT/WETTBEWERB] im Bereich [SPARTE].'",
        ],
      },
      {
        focus: "Kontext: Fokus und Tiefe der Analyse",
        task: "Definiere den Analyserahmen: Welche Marktsegmente? Welcher Zeithorizont? Welche Wettbewerber sollen betrachtet werden? Was ist der Anlass der Analyse?",
        hints: [
          "Eingrenzen: Welche Sparte (KFZ, Leben, Kranken)? Welcher Markt (Deutschland, DACH)? Welche Wettbewerber (Top 5, InsurTechs)?",
          "Zeitraum und Anlass helfen: 'Für die Jahresplanung 2025 soll der Wettbewerb im Bereich Privathaftpflicht analysiert werden.'",
          "Beispiel: 'Analysiere den deutschen Markt für Wohngebäudeversicherung. Fokus: Die 5 größten Anbieter plus 3 relevante InsurTechs. Zeitraum: 2023-2024.'",
          "Fast-Beispiel: 'Du bist [ANALYST]. Analysiere [SEGMENT] im [MARKT]. Fokus-Wettbewerber: [LISTE]. Zeitraum: [X]. Anlass: [ZWECK].'",
        ],
      },
      {
        focus: "Format: Strukturierter Analysebericht",
        task: "Definiere das Ausgabeformat der Analyse: Welche Abschnitte? Wie werden Wettbewerber verglichen? Sollen Tabellen, SWOT oder andere Frameworks eingesetzt werden?",
        hints: [
          "Strukturiere die Analyse klar: Executive Summary, Marktüberblick, Wettbewerbsmatrix, Trends, Handlungsempfehlungen.",
          "Wettbewerbsvergleich als Tabelle: Anbieter | Produkt | Preis | USP | Digitalisierungsgrad.",
          "Frameworks: SWOT, Porter's Five Forces, Positioning Map.",
          "Fast-Beispiel: 'Format: 1. Executive Summary (5 Sätze), 2. Marktüberblick, 3. Wettbewerbstabelle [KRITERIEN], 4. Top-3-Trends, 5. Handlungsempfehlungen.'",
        ],
      },
      {
        focus: "Einschränkungen: Quellen und Objektivität",
        task: "Füge Einschränkungen zur Informationsqualität hinzu: Wie soll die KI mit unsicheren Daten umgehen? Welche Quellen sind bevorzugt? Was soll vermieden werden?",
        hints: [
          "Wichtig: KI hat kein Internet-Zugang — weise an, bekanntes Wissen zu nutzen und Wissensgrenzen klar zu markieren.",
          "Einschränkung: Keine Preisinformationen ohne Quellenangabe. Hypothesen als solche kennzeichnen.",
          "Beispiel: 'Basiere auf allgemeinem Branchenwissen. Markiere unsichere Informationen mit [SCHÄTZUNG]. Keine konkreten Umsatzzahlen ohne Quelle.'",
          "Fast-Beispiel: '...Einschränkungen: Nur gesichertes Wissen. Hypothesen als [SCHÄTZUNG] markieren. Keine [DATENTYP] ohne Quelle. Wissensgrenzen transparent machen.'",
        ],
      },
      {
        focus: "Champion: Vollständiges Analyse-Framework",
        task: "Erstelle einen vollständigen Analyse-Prompt mit Expertenprofil, präzisem Forschungsrahmen, strukturiertem Report-Format, Methodik-Angabe und klaren Qualitätsstandards für die Datenbasis.",
        hints: [
          "Vollständig: Analystenrolle + Auftrag + Scope (Markt/Wettbewerber/Zeitraum) + Methodik (SWOT/Porter) + Report-Format + Datenqualitäts-Regeln.",
          "Füge hinzu: Was sind die Key Questions, die beantwortet werden sollen?",
          "Profi-Tipp: Lass die KI am Ende 3 strategische Handlungsempfehlungen für die Mecklenburgische Versicherung ableiten.",
          "Fast-Beispiel: 'Du bist [EXPERTE]. Erstelle eine [ANALYSE-ART] für [SCOPE]. Methodik: [X]. Format: [STRUKTUR]. Key Questions: [LISTE]. Abschluss: 3 Handlungsempfehlungen.'",
        ],
      },
    ]),
  },
  {
    id: "allg-faq",
    categoryId: "allgemein",
    title: "FAQ-Dokument für Mitarbeiter erstellen",
    shortDescription: "Strukturierte FAQ-Sammlung zu internen Prozessen und Produkten im VU aufbauen.",
    context: "Neue Mitarbeiter und Vertriebspartner haben häufig dieselben Fragen zu Produkten, Prozessen und Richtlinien. Das Wissensmanagement ist oft lückenhaft. KI soll helfen, aus vorhandenem Rohmaterial gut strukturierte FAQ-Dokumente zu erstellen, die intern oder extern eingesetzt werden können.",
    icon: "HelpCircle",
    keywords: ["faq", "fragen", "antworten", "mitarbeiter", "wissen", "dokumentation", "prozess", "produkt", "richtlinie", "onboarding", "intern", "wissensdatenbank"],
    levels: makeLevels([
      {
        focus: "Grundstruktur: Redaktionsrolle und Auftrag",
        task: "Schreibe einen Prompt, der einem KI-Assistenten erklärt, wer er ist (Wissensmanagement-Redakteur o.ä.) und ihn beauftragt, ein FAQ-Dokument für Mitarbeiter eines VU zu erstellen.",
        hints: [
          "Gib dem KI-Assistenten eine redaktionelle Rolle und einen klaren FAQ-Auftrag.",
          "Beispiel: 'Du bist ein erfahrener Wissensmanager in einem Versicherungsunternehmen.'",
          "Kläre: Wer sind die FAQ-Nutzer? Was ist das Thema der FAQs?",
          "Fast-Beispiel: 'Du bist ein [ROLLE]. Erstelle ein FAQ-Dokument zum Thema [THEMA] für [ZIELGRUPPE].'",
        ],
      },
      {
        focus: "Kontext: Thema, Zielgruppe und Quellmaterial",
        task: "Definiere das FAQ-Thema genau, beschreibe die Zielgruppe und erkläre, aus welchen Quellen (Rohtexte, Stichworte, Richtlinien) die FAQs generiert werden sollen.",
        hints: [
          "Thema eingrenzen: Onboarding-FAQs, Produkt-FAQs (z.B. Haftpflichtversicherung), Prozess-FAQs (Schadenbearbeitung).",
          "Zielgruppe definiert den Sprachstil: neue Mitarbeiter = einfach, erfahrene Sachbearbeiter = fachlich.",
          "Erkläre, was du als Input lieferst und was als Output erwartet wird.",
          "Fast-Beispiel: 'Du bist [ROLLE]. Erstelle FAQs zum Thema [X] für [ZIELGRUPPE] aus folgendem Rohmaterial: [INPUT]. FAQs sollen [ZIEL] abdecken.'",
        ],
      },
      {
        focus: "Format: FAQ-Struktur und Kategorisierung",
        task: "Definiere das genaue Format der FAQs: Wie sind Fragen formuliert? Wie lang sind Antworten? Soll es Kategorien geben? Welche Navigationshilfen?",
        hints: [
          "FAQ-Format: Fragen als direkte W-Fragen ('Was...?', 'Wie...?', 'Wann...?'). Antworten: max. 5 Sätze.",
          "Kategorisierung hilft: Allgemeines, Produkt, Prozess, Sonderfälle.",
          "Weitere Elemente: Verlinkungshinweise, 'Mehr erfahren bei:', Gültigkeitsdatum.",
          "Fast-Beispiel: 'Format: Kategorien [LISTE]. Pro FAQ: Frage (W-Frage), Antwort (max. 5 Sätze), Verweis auf [QUELLE]. Insgesamt [N] FAQs.'",
        ],
      },
      {
        focus: "Einschränkungen: Aktualität und Rechtskonformität",
        task: "Definiere Einschränkungen: Was soll die KI bei veralteten oder unsicheren Informationen tun? Wie mit rechtlich sensiblen Inhalten umgehen?",
        hints: [
          "FAQ-Inhalte in einem VU müssen rechtskonform und produktgenau sein — KI soll bei Unsicherheiten markieren statt erfinden.",
          "Einschränkung: Keine konkreten Leistungsbeträge ohne Quellenangabe. Veraltete Infos als '[Stand: DATUM]' kennzeichnen.",
          "Hinweis: FAQs zu konkreten Vertrags- oder Leistungsfragen sollen auf den zuständigen Fachbereich verweisen.",
          "Fast-Beispiel: '...Bei Unsicherheiten: [MARKIERUNG]. Rechtliche Details: Verweis auf [QUELLE]. Keine konkreten Zahlen ohne [QUELLE]. Aktualität: [DATUM] vermerken.'",
        ],
      },
      {
        focus: "Champion: Vollständiges FAQ-System",
        task: "Erstelle einen vollständigen Prompt für ein vollständiges FAQ-System: Redaktionsrolle, Zielgruppe, Input-Format, Kategorisierungsschema, Antwort-Qualitätsstandards, rechtliche Leitplanken und Wartungshinweise.",
        hints: [
          "Vollständig: Redakteur-Rolle + Thema + Zielgruppe + Input-Typ + Kategorien + Format-Specs + Qualitätskriterien + Rechtliches.",
          "Qualitätskriterien für FAQs: verständlich, präzise, aktionsorientiert, konsistent im Stil.",
          "Profi-Tipp: Lass die KI für jede FAQ auch Varianten der Frage generieren (alternative Formulierungen = bessere Auffindbarkeit).",
          "Fast-Beispiel: 'Du bist [EXPERTE]. Erstelle [N] FAQs zu [THEMA] für [ZIELGRUPPE] in [FORMAT]. Qualität: [KRITERIEN]. Recht: [REGELN]. Je FAQ: Frage + Variante + Antwort + Verweis.'",
        ],
      },
    ]),
  },
  {
    id: "allg-stellenbeschreibung",
    categoryId: "allgemein",
    title: "Stellenausschreibung formulieren",
    shortDescription: "Attraktive und präzise Stellenanzeigen für Positionen im Versicherungsunternehmen erstellen.",
    context: "HR-Abteilungen im VU stehen vor der Herausforderung, in einem kompetitiven Arbeitsmarkt qualifizierte Fachkräfte zu gewinnen. Stellenanzeigen müssen präzise die Anforderungen beschreiben, gleichzeitig das Unternehmen als attraktiven Arbeitgeber positionieren und rechtliche Vorgaben (AGG) einhalten.",
    icon: "Users",
    keywords: ["stelle", "ausschreibung", "bewerbung", "hr", "personalwesen", "anforderungen", "qualifikation", "aufgaben", "gehalt", "benefits", "unternehmen", "recruiting"],
    levels: makeLevels([
      {
        focus: "Grundstruktur: HR-Berater-Rolle und Auftrag",
        task: "Schreibe einen Prompt, der einem KI-Assistenten erklärt, wer er ist (HR-Experte o.ä.) und was er tun soll: eine Stellenausschreibung für ein Versicherungsunternehmen erstellen.",
        hints: [
          "Gib dem KI-Assistenten eine HR-Experten-Rolle und den klaren Auftrag, eine Stellenanzeige zu erstellen.",
          "Spezifiziere: Für welche Position? Für welches Unternehmen?",
          "Beispiel: 'Du bist ein erfahrener HR-Business-Partner eines deutschen Versicherungsunternehmens.'",
          "Fast-Beispiel: 'Du bist ein [ROLLE]. Erstelle eine Stellenausschreibung für die Position [STELLE] bei [UNTERNEHMEN].'",
        ],
      },
      {
        focus: "Kontext: Position und Anforderungsprofil",
        task: "Beschreibe die Position genauer: Abteilung, Aufgaben, Anforderungen (muss/kann), Erfahrungsniveau, Besonderheiten der Stelle.",
        hints: [
          "Aufgaben und Anforderungen trennen: Muss-Kriterien (Qualifikation, Erfahrung) vs. Kann-Kriterien (Wünschenswert).",
          "Beispiel: 'Sachbearbeiter Vertragsservice (m/w/d) in der Schadenabteilung. Aufgaben: Schadenerfassung, Kundenkommunikation, Regulierung. Anforderungen: Ausbildung als Versicherungskaufmann, 2 Jahre Erfahrung.'",
          "Kontext: Vollzeit/Teilzeit, Standort, Teamgröße, Besonderheiten des Unternehmens.",
          "Fast-Beispiel: 'Position: [TITEL]. Abteilung: [X]. Aufgaben: [LISTE]. Muss-Anforderungen: [LISTE]. Kann: [LISTE]. Besonderheiten: [INFO].'",
        ],
      },
      {
        focus: "Ton und Struktur der Anzeige",
        task: "Definiere den Ton der Ausschreibung (modern, traditionell, empathisch) und die Struktur: Welche Abschnitte? In welcher Reihenfolge? Wie lang?",
        hints: [
          "Moderne Stellenanzeigen: Du-Ansprache, Benefits zuerst, klare Sprache. Klassisch: Sie-Ansprache, Anforderungen zuerst.",
          "Pflichtabschnitte: Unternehmensbeschreibung, Aufgaben, Anforderungen, Was wir bieten, Bewerbungsprozess.",
          "Länge: 300-500 Wörter optimal für Stellenanzeigen.",
          "Fast-Beispiel: 'Ton: [MODERN/KLASSISCH]. Struktur: 1. [UNTERNEHMEN], 2. [AUFGABEN], 3. [ANFORDERUNGEN], 4. [BENEFITS], 5. [BEWERBUNG]. Länge: [N] Wörter.'",
        ],
      },
      {
        focus: "Einschränkungen: AGG und Employer Branding",
        task: "Füge rechtliche Einschränkungen (AGG-Konformität, keine Diskriminierung) und Employer-Branding-Richtlinien hinzu.",
        hints: [
          "AGG: Keine Alters-, Geschlechts- oder Herkunftsdiskriminierung. Formulierung 'm/w/d' verwenden.",
          "Employer Branding: Konsistent mit der Unternehmensmarke. Keine übertriebenen Versprechen.",
          "Einschränkung: Keine konkreten Gehaltsangaben ohne Vorgabe. Keine diskriminierenden Formulierungen.",
          "Fast-Beispiel: '...Einschränkungen: AGG-konform (m/w/d), keine Diskriminierung. Employer-Branding-Ton: [X]. Keine Gehaltsangaben ohne Vorgabe. Inklusiv formulieren.'",
        ],
      },
      {
        focus: "Champion: Vollständige Stellenanzeige mit Varianten",
        task: "Erstelle einen vollständigen Prompt für eine Stellenanzeige inklusive: HR-Expertenrolle, vollständiges Anforderungsprofil, Corporate-Language-Vorgaben, Anzeigen-Struktur, AGG-Konformität und Bitte um 2 Toneingaben (klassisch + modern).",
        hints: [
          "Champion-Prompt: HR-Rolle + Position-Details + Corporate Language + Format + Rechtliches + Varianten-Anforderung.",
          "Füge hinzu: Angaben zu Benefits der Mecklenburgischen Versicherung (was könnte attraktiv sein?).",
          "Profi-Tipp: Lass die KI auch eine kurze Social-Media-Version (LinkedIn, max. 200 Wörter) erstellen.",
          "Fast-Beispiel: 'Du bist [HR-EXPERTE] der Mecklenburgischen Versicherung. Erstelle für [POSITION]: (1) klassische Anzeige [FORMAT], (2) moderne Variante [FORMAT], (3) LinkedIn-Kurzversion. AGG: ja. Corporate Language: [GUIDE].'",
        ],
      },
    ]),
  },
];
