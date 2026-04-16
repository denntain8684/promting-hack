import type { Scenario, ScenarioId } from "./types";
import { SCENARIOS_ALLGEMEIN } from "./scenarios-allgemein";
import { SCENARIOS_UE } from "./scenarios-ue";
import { SCENARIOS_SCHADEN } from "./scenarios-schaden";
import { SCENARIOS_ANTRAG } from "./scenarios-antrag";
import { SCENARIOS_KOMPOSIT } from "./scenarios-komposit";
import { SCENARIOS_KRANKEN, SCENARIOS_LEBEN, SCENARIOS_MARKETING, SCENARIOS_SCHULUNG } from "./scenarios-others";

const LEGACY_SCENARIOS: Record<ScenarioId, Scenario> = {
  schaden: {
    id: "schaden",
    categoryId: "schaden",
    title: "Schadenmeldung optimieren",
    shortDescription:
      "Unterstütze den Innendienst bei der strukturierten Aufnahme eines Wasserschadens und der Kundenkommunikation.",
    context:
      "Ein Kunde meldet telefonisch einen Wasserschaden in seiner Wohngebäudeversicherung. Das Leitungswasser hat den Keller überflutet. Der Innendienst-Mitarbeiter muss die Schadenmeldung strukturiert erfassen, den Kunden beruhigen und über die nächsten Schritte informieren. Es ist wichtig, dass keine Deckungszusagen gemacht werden und Datenschutz gewahrt bleibt.",
    icon: "Droplets",
    keywords: [
      "wasserschaden",
      "wohngebäude",
      "leitungswasser",
      "schadenregulierer",
      "schadenaufnahme",
      "schadenmeldung",
      "deckung",
      "versicherung",
      "gebäude",
      "schaden",
      "regulierung",
      "sanierung",
    ],
    levels: [
      {
        level: 1,
        name: "Einsteiger",
        threshold: 50,
        focus: "Grundstruktur: Rolle und klarer Auftrag",
        task:
          "Schreibe einen Prompt, der einem KI-Assistenten sagt, wer er ist (Rolle) und was er tun soll (Auftrag). Der Assistent soll einem Innendienst-Mitarbeiter bei der Schadenaufnahme helfen.",
        hints: [
          "Dein Prompt sollte mindestens eine Rollenbeschreibung (wer ist der KI-Assistent?) und einen klaren Arbeitsauftrag enthalten.",
          "Beginne deinen Prompt mit einer Rollendefinition, z.B. 'Du bist ein...' und beschreibe dann, was der Assistent konkret tun soll.",
          "Beispiel für eine Rollendefinition: 'Du bist ein erfahrener Schadenregulierer bei einer deutschen Versicherung. Deine Aufgabe ist es...'",
          "Fast-Beispiel: 'Du bist ein [ROLLE] mit [X Jahren] Erfahrung in der [BEREICH]. Deine Aufgabe ist es, [AUFGABE]. Hilf dem Mitarbeiter dabei, [ZIEL].'",
        ],
      },
      {
        level: 2,
        name: "Fortgeschritten",
        threshold: 60,
        focus: "Kontext: Versicherungsprodukt und Situation beschreiben",
        task:
          "Ergänze deinen Prompt um relevante Kontextinformationen: Welches Versicherungsprodukt ist betroffen? Welche Situation liegt vor? Welche Informationen sind für die Schadenaufnahme relevant?",
        hints: [
          "Füge dem Prompt Informationen über das Versicherungsprodukt (Wohngebäudeversicherung, Leitungswasser) und die konkrete Situation hinzu.",
          "Beschreibe in deinem Prompt, welche Informationen der Assistent erfassen soll (z.B. Schadendatum, Schadensumme, Ursache).",
          "Beispiel-Kontext: 'Ein Kunde hat einen Wasserschaden durch Leitungswasser im Keller seines Wohngebäudes. Die Wohngebäudeversicherung soll aktiviert werden...'",
          "Fast-Beispiel: 'Du bist ein [ROLLE]. Ein Kunde meldet einen [SCHADENSTYP] in seiner [VERSICHERUNGSPRODUKT]. Erfasse folgende Informationen: [LISTE]. Beachte dabei [BESONDERHEITEN].'",
        ],
      },
      {
        level: 3,
        name: "Profi",
        threshold: 70,
        focus: "Kommunikation: Tonalität und Ausgabeformat definieren",
        task:
          "Definiere in deinem Prompt, wie der Assistent kommunizieren soll (Tonalität, Stil) und in welchem Format er die Ergebnisse ausgeben soll (Checkliste, Gesprächsleitfaden, etc.).",
        hints: [
          "Lege fest, welchen Kommunikationsstil der Assistent verwenden soll (empathisch, professionell, kundenorientiert) und wie die Ausgabe strukturiert sein soll.",
          "Fordere ein spezifisches Ausgabeformat an, z.B. eine nummerierte Checkliste, einen Gesprächsleitfaden mit Einleitungssatz, oder eine strukturierte Abfrage.",
          "Beispiel Tonalität: 'Kommuniziere empathisch und professionell. Zeige Verständnis für die Situation des Kunden.' Beispiel Format: 'Erstelle einen Gesprächsleitfaden mit 5 Hauptpunkten.'",
          "Fast-Beispiel: 'Du bist ein [ROLLE]. [...Kontext...]. Kommuniziere [STIL]. Erstelle einen [FORMAT] mit folgenden Abschnitten: 1. [ABSCHNITT], 2. [ABSCHNITT].'",
        ],
      },
      {
        level: 4,
        name: "Experte",
        threshold: 80,
        focus: "Vollständigkeit: Einschränkungen und Edge Cases",
        task:
          "Füge deinem Prompt wichtige Einschränkungen hinzu: Was soll der Assistent NICHT tun? Welche rechtlichen/datenschutzrechtlichen Grenzen gibt es? Welche Ausnahmen oder Sonderfälle sollen berücksichtigt werden?",
        hints: [
          "Füge explizite Einschränkungen hinzu wie 'Keine Deckungszusagen machen', 'Datenschutz beachten', 'Keine medizinischen Ratschläge geben'.",
          "Denke an Edge Cases: Was wenn der Kunde aufgebracht ist? Was wenn der Schaden möglicherweise nicht gedeckt ist? Wie geht man mit unklaren Angaben um?",
          "Beispiel Einschränkungen: 'Mache KEINE Deckungszusagen. Verweise bei komplexen Fragen an den Sachbearbeiter. Beachte den Datenschutz und frage keine unnötigen Daten ab.'",
          "Fast-Beispiel: '...Beachte dabei folgende Einschränkungen: 1. [EINSCHRÄNKUNG], 2. [EINSCHRÄNKUNG]. Falls [EDGE_CASE], dann [HANDLUNG]. Eskaliere an [PERSON], wenn [TRIGGER].'",
        ],
      },
      {
        level: 5,
        name: "Champion",
        threshold: 90,
        focus: "Exzellenz: Präzision, Vollständigkeit, Professionalität",
        task:
          "Erstelle einen vollständigen, professionellen Prompt, der alle Aspekte abdeckt: Rolle mit Expertise, vollständiger Kontext, empathische Kommunikation, strukturierte Ausgabe UND klare Einschränkungen. Der Prompt soll sofort in der Praxis einsetzbar sein.",
        hints: [
          "Ein Champion-Prompt kombiniert alle Elemente: präzise Rolle, vollständiger Kontext, Tonalität, Ausgabeformat und Einschränkungen — alles in einem logisch aufgebauten Text.",
          "Überprüfe: Ist die Rolle klar? Ist der Kontext vollständig? Ist die Tonalität definiert? Ist das Format spezifiziert? Sind Einschränkungen vorhanden? Sind konkrete Beispiele oder Formulierungshilfen dabei?",
          "Profitipp: Ein exzellenter Prompt könnte auch Beispiele für gute Formulierungen enthalten, z.B. 'Beginne das Gespräch mit: [EINSTIEGSSATZ]' oder Bullet-Points zu erfassenden Informationen.",
          "Fast-Beispiel: 'Du bist ein erfahrener [ROLLE] bei [UNTERNEHMEN]. Heute meldest du [SITUATION]. Deine Aufgabe: [AUFGABE]. Kommuniziere [STIL]. Erstelle: [FORMAT]. Achte dabei auf [QUALITÄTSKRITERIEN]. Einschränkungen: [LISTE]. Falls [SONDERFALL]: [HANDLUNG].'",
        ],
      },
    ],
  },

  vertrag: {
    id: "vertrag",
    categoryId: "antrag",
    title: "Vertragsverlängerung argumentieren",
    shortDescription:
      "Erstelle überzeugende Argumente für einen Außendienst-Vermittler, um einen KMU-Kunden von der Vertragsverlängerung zu überzeugen.",
    context:
      "Ein langjähriger Gewerbekunde (KMU, Handwerksbetrieb, 12 Mitarbeiter) überlegt, seine Betriebshaftpflicht nach 8 Jahren bei der Mecklenburgischen zu kündigen und zu einem 15% günstigeren Wettbewerber zu wechseln. Der Außendienst-Vermittler benötigt Unterstützung bei der Entwicklung überzeugender Argumente für das nächste Kundengespräch.",
    icon: "FileText",
    keywords: [
      "betriebshaftpflicht",
      "kmu",
      "handwerk",
      "vertragsverlängerung",
      "wettbewerber",
      "deckungsumfang",
      "preis",
      "leistung",
      "service",
      "gewerbe",
      "vertrieb",
      "argumentation",
      "einwand",
    ],
    levels: [
      {
        level: 1,
        name: "Einsteiger",
        threshold: 50,
        focus: "Grundstruktur: Rolle und klarer Vertriebsauftrag",
        task:
          "Schreibe einen Prompt, der einem KI-Assistenten die Rolle eines Vertriebsexperten gibt und den Auftrag, Argumente für die Vertragsverlängerung zu generieren.",
        hints: [
          "Definiere die Rolle des Assistenten (Vertriebsberater, Versicherungsexperte) und den Auftrag (Argumente für Vertragsverlängerung erstellen).",
          "Beginne mit: 'Du bist ein erfahrener Versicherungsberater / Vertriebsexperte...' und formuliere dann den klaren Arbeitsauftrag.",
          "Beispiel: 'Du bist ein erfahrener Vertriebsberater im Versicherungsbereich. Deine Aufgabe ist es, überzeugende Argumente zu entwickeln, damit ein Kunde seinen Vertrag verlängert.'",
          "Fast-Beispiel: 'Du bist ein [ROLLE] bei einer Versicherung. Ein Gewerbekunde möchte [SITUATION]. Entwickle [ANZAHL] Argumente, die ihn vom [ZIEL] überzeugen.'",
        ],
      },
      {
        level: 2,
        name: "Fortgeschritten",
        threshold: 60,
        focus: "Kontext: Zielgruppe und Produkt beschreiben",
        task:
          "Beschreibe in deinem Prompt die Zielgruppe (KMU, Handwerksbetrieb) und das Produkt (Betriebshaftpflicht) sowie die Wettbewerbssituation (günstiger Konkurrent).",
        hints: [
          "Gib dem Assistenten Informationen über den Kunden (Handwerksbetrieb, KMU) und das Produkt (Betriebshaftpflicht, Deckungsumfänge).",
          "Beschreibe die Wettbewerbssituation: Der Konkurrent ist günstiger — welche anderen Unterschiede könnte es geben (Service, Deckung, Reaktionszeit)?",
          "Beispiel Kontext: 'Der Kunde ist ein Handwerksbetrieb mit 12 Mitarbeitern, langjähriger Kunde (8 Jahre). Die Betriebshaftpflicht deckt Personen-, Sach- und Vermögensschäden ab...'",
          "Fast-Beispiel: '...Der Kunde ist ein [UNTERNEHMENSTYP] mit [X Mitarbeitern] im Bereich [BRANCHE]. Das bedrohte Produkt: [PRODUKT] mit Deckung für [LEISTUNGEN]. Der Wettbewerber bietet [X]% günstigere Prämien.'",
        ],
      },
      {
        level: 3,
        name: "Profi",
        threshold: 70,
        focus: "Kommunikation: Tonalität und strukturierte Ausgabe",
        task:
          "Lege fest, wie der Assistent kommunizieren soll (überzeugend, aber partnerschaftlich) und fordere eine strukturierte Ausgabe an (z.B. Gesprächsleitfaden, Einwandbehandlung).",
        hints: [
          "Definiere die Tonalität: überzeugend aber nicht aufdringlich, partnerschaftlich, auf Augenhöhe. Fordere eine klare Ausgabestruktur an.",
          "Nützliche Formate: Gesprächsleitfaden mit Einstieg, Argumentationsblöcke, Einwandbehandlungstabelle, Preis-Leistungs-Vergleich.",
          "Beispiel: 'Erstelle einen Gesprächsleitfaden mit: 1. Einstiegssatz, 2. Top-3-Argumente für Mecklenburgische, 3. Antworten auf häufige Einwände, 4. Abschlussformulierung.'",
          "Fast-Beispiel: '...Tonalität: [STIL]. Erstelle folgende Ausgabe: 1. [ABSCHNITT]: [INHALT], 2. [ABSCHNITT]: [INHALT], 3. Einwandbehandlung für: [EINWAND_1], [EINWAND_2].'",
        ],
      },
      {
        level: 4,
        name: "Experte",
        threshold: 80,
        focus: "Vollständigkeit: Ethische Leitplanken und Edge Cases",
        task:
          "Füge ethische Einschränkungen hinzu (keine Falschaussagen, keine Abwertung des Wettbewerbers) und denke an Sonderfälle (Kunde ist wirklich preissensitiv, Deckungsvergleich offenbart Unterschiede).",
        hints: [
          "Wichtige Einschränkungen im Vertrieb: Keine falschen Versprechen, keine Herabsetzung von Wettbewerbern, GWB/UWG beachten.",
          "Edge Cases: Was wenn die Deckung wirklich vergleichbar ist? Was wenn der Preis tatsächlich das entscheidende Kriterium ist? Alternativlösungen anbieten.",
          "Beispiel: 'Beachte: Keine Aussagen, die nicht belegt werden können. Vermeide direkte Abwertung des Wettbewerbers. Falls Deckungsumfang identisch: betone Service und Schadenerfahrung.'",
          "Fast-Beispiel: '...Ethische Leitplanken: 1. [EINSCHRÄNKUNG], 2. [EINSCHRÄNKUNG]. Falls der Kunde [SZENARIO]: dann [HANDLUNG]. Schlimmster Fall: Angebot eines [ALTERNATIVE].'",
        ],
      },
      {
        level: 5,
        name: "Champion",
        threshold: 90,
        focus: "Exzellenz: Professioneller, vollständiger Vertriebsprompt",
        task:
          "Erstelle einen vollständigen, professionellen Prompt für den Vertriebsberater — mit Rolle, Kundenprofil, Produktwissen, Argumentationsstruktur, Tonalität, Ausgabeformat und ethischen Leitplanken.",
        hints: [
          "Alle Elemente müssen vorhanden sein: Rolle, Kundenprofil (KMU/Handwerk), Produkt (BHV), Wettbewerbssituation, Tonalität, Format und Einschränkungen.",
          "Professioneller Vertriebsprompt enthält auch konkrete Formulierungshilfen: z.B. 'Möglicher Einstiegssatz: ...' oder 'Argument X formulieren als: ...'",
          "Prüfe: Wäre ein echter Außendienstmitarbeiter mit diesem Prompt-Output bereit für das Kundengespräch?",
          "Fast-Beispiel: 'Du bist ein [EXPERTE] mit Fokus auf [BEREICH]. Kontext: [KUNDENPROFIL]. Situation: [WETTBEWERB]. Auftrag: Erstelle [FORMAT] mit [ELEMENTEN]. Tonalität: [STIL]. Einschränkungen: [LISTE]. Ausgabe enthält: [KONKRETE ELEMENTE].'",
        ],
      },
    ],
  },

  risiko: {
    id: "risiko",
    categoryId: "komposit",
    title: "Risikoanalyse erstellen",
    shortDescription:
      "Erstelle eine strukturierte Risikoanalyse für einen mittelständischen Maschinenbauunternehmer zur Technischen Versicherung.",
    context:
      "Ein Underwriter muss für einen neuen Industriekunden (mittelständischer Maschinenbauunternehmer, Umsatz 18 Mio. €, 85 Mitarbeiter, 3 Produktionslinien) eine Risikoanalyse zur Technischen Versicherung (Maschinenbruch, Elektronik, Montageversicherung) erstellen. Es liegen Betriebsdaten, Umsatzzahlen und eine Schadenhistorie der letzten 5 Jahre vor.",
    icon: "BarChart3",
    keywords: [
      "underwriter",
      "risikoanalyse",
      "maschinenbau",
      "technische versicherung",
      "maschinenbruch",
      "elektronikversicherung",
      "zeichnung",
      "risikobewertung",
      "prämie",
      "schadenhistorie",
      "risikomatrix",
      "underwriting",
    ],
    levels: [
      {
        level: 1,
        name: "Einsteiger",
        threshold: 50,
        focus: "Grundstruktur: Underwriter-Rolle und Analyseauftrag",
        task:
          "Schreibe einen Prompt, der dem Assistenten die Rolle eines Underwriters gibt und den Auftrag, eine Risikoanalyse zu erstellen.",
        hints: [
          "Definiere die Rolle (Underwriter, Risikoexperte) und den Auftrag (strukturierte Risikoanalyse erstellen).",
          "Beginne mit: 'Du bist ein erfahrener Underwriter / Risikoanalyst...' und beschreibe den Analyseauftrag.",
          "Beispiel: 'Du bist ein erfahrener Underwriter für Technische Versicherungen. Deine Aufgabe ist es, eine umfassende Risikoanalyse für einen neuen Industriekunden zu erstellen.'",
          "Fast-Beispiel: 'Du bist ein [ROLLE] bei einer Versicherung. Erstelle eine [ART] Risikoanalyse für [KUNDENTYP] im Bereich [VERSICHERUNGSSPARTE].'",
        ],
      },
      {
        level: 2,
        name: "Fortgeschritten",
        threshold: 60,
        focus: "Kontext: Input-Daten und Branche spezifizieren",
        task:
          "Beschreibe, welche Input-Daten für die Analyse benötigt werden und gib dem Assistenten den branchenspezifischen Kontext (Maschinenbau, technische Risiken).",
        hints: [
          "Spezifiziere die verfügbaren Input-Daten (Umsatz, Mitarbeiterzahl, Produktionslinien, Schadenhistorie) und welche zusätzlichen Informationen benötigt werden.",
          "Gib Branchenkontext: Maschinenbau hat spezifische Risiken (Produkthaftung, Maschinenausfall, Montagefehler).",
          "Beispiel: 'Verfügbare Daten: Umsatz 18 Mio. €, 85 Mitarbeiter, 3 Produktionslinien, Schadenhistorie 5 Jahre. Analysiere folgende Risikobereiche...'",
          "Fast-Beispiel: '...Verfügbare Inputdaten: [LISTE]. Branche: [BRANCHE] mit typischen Risiken: [RISIKEN]. Analysiere: [ANALYSE_BEREICHE].'",
        ],
      },
      {
        level: 3,
        name: "Profi",
        threshold: 70,
        focus: "Framework: Risikokategorien und Ausgabeformat",
        task:
          "Definiere ein Analyse-Framework (Risikokategorien, Bewertungsskala) und lege das Ausgabeformat fest (strukturierter Report, Risikomatrix).",
        hints: [
          "Fordere ein konkretes Analyse-Framework an: z.B. Wahrscheinlichkeit × Schadenpotenzial Matrix, Risikokategorien (hoch/mittel/niedrig).",
          "Spezifiziere den Ausgabe-Report: Zusammenfassung, Risikomatrix, Bewertung je Kategorie, Empfehlungen.",
          "Beispiel Framework: 'Bewerte Risiken nach Eintrittshäufigkeit (1-5) und Schadenausmaß (1-5). Erstelle eine 5×5-Risikomatrix. Kategorisiere: kritisch (>15), erhöht (8-15), akzeptabel (<8).'",
          "Fast-Beispiel: '...Analyse-Framework: [METHODIK]. Risikokategorien: [KATEGORIEN]. Bewertungsskala: [SKALA]. Ausgabeformat: [FORMAT] mit folgenden Abschnitten: [LISTE].'",
        ],
      },
      {
        level: 4,
        name: "Experte",
        threshold: 80,
        focus: "Vollständigkeit: Handlungsempfehlungen und Limitierungen",
        task:
          "Fordere konkrete Handlungsempfehlungen für die Zeichnungsentscheidung an und definiere Limitierungen (keine finale Zeichnungsentscheidung durch die KI).",
        hints: [
          "Füge Handlungsempfehlungen hinzu: Risikoausschlüsse vorschlagen, Prämienadjustierungen, Risikominimierungsmaßnahmen.",
          "Wichtige Einschränkung: Die KI trifft keine finale Zeichnungsentscheidung — sie unterstützt den Underwriter.",
          "Beispiel: 'Gib Empfehlungen zu: 1. Zeichnungsfähigkeit (ja/nein/mit Auflagen), 2. Prämienanpassungen, 3. Risikoausschlüssen, 4. Präventionsmaßnahmen. Hinweis: Finale Entscheidung liegt beim Underwriter.'",
          "Fast-Beispiel: '...Empfehle: [EMPFEHLUNGSARTEN]. Priorisiere nach [KRITERIUM]. Limitierung: [EINSCHRÄNKUNG]. Bei [SCHWELLENWERT] eskaliere an [PERSON].'",
        ],
      },
      {
        level: 5,
        name: "Champion",
        threshold: 90,
        focus: "Exzellenz: Vollständiger professioneller Underwriting-Prompt",
        task:
          "Erstelle einen vollständigen, professionellen Prompt für den Underwriter mit Rolle, Input-Daten-Spezifikation, Analyse-Framework, Branchenkontext, Ausgabeformat, Handlungsempfehlungen und Limitierungen.",
        hints: [
          "Alle Elemente: Underwriter-Rolle, Betriebsdaten als Input, Branchenkontext Maschinenbau, Analyse-Framework mit Risikomatrix, Report-Format, Empfehlungen und KI-Limitierung.",
          "Prüfe: Würde ein echtes Underwriting-Team mit dem KI-Output arbeiten können?",
          "Profi-Ergänzungen: Vergleich mit Branchen-Benchmarks anfordern, Sensitivitätsanalyse für worst case, regulatorische Anforderungen (Solvency II).",
          "Fast-Beispiel: 'Du bist ein [EXPERTE]. Analysiere [KUNDENTYP] anhand folgender Daten: [DATEN]. Framework: [METHODIK]. Bewerte: [KATEGORIEN]. Erstelle Report mit: [STRUKTUR]. Empfehle: [HANDLUNGEN]. Einschränkung: [LIMITIERUNG]. Ausgabeformat: [FORMAT].'",
        ],
      },
    ],
  },

  schulung: {
    id: "schulung",
    categoryId: "schulung",
    title: "Schulungsunterlagen erstellen",
    shortDescription:
      "Entwickle didaktisch aufbereitete Schulungsunterlagen für Auszubildende zu den Grundlagen der Kompositversicherung.",
    context:
      "Die Personalentwicklung der Mecklenburgischen plant eine 2-tägige Schulung für neue Auszubildende im ersten Lehrjahr zum Thema 'Grundlagen der Kompositversicherung' (Sach, Haftpflicht, Unfall, Kfz). Die Auszubildenden haben keine Vorkenntnisse. Die Unterlagen sollen modern, verständlich und interaktiv sein und Praxisbezug haben.",
    icon: "GraduationCap",
    keywords: [
      "schulung",
      "auszubildende",
      "kompositversicherung",
      "sachversicherung",
      "haftpflicht",
      "unfallversicherung",
      "kfz",
      "didaktik",
      "lernziele",
      "unterlagen",
      "training",
      "personalentwicklung",
      "quiz",
      "präsentation",
    ],
    levels: [
      {
        level: 1,
        name: "Einsteiger",
        threshold: 50,
        focus: "Grundstruktur: Trainer-Rolle und Schulungsauftrag",
        task:
          "Schreibe einen Prompt, der dem Assistenten die Rolle eines Versicherungstrainers gibt und den Auftrag, Schulungsunterlagen zu erstellen.",
        hints: [
          "Definiere Rolle (Versicherungstrainer, Didaktik-Experte) und Auftrag (Schulungsunterlagen erstellen).",
          "Beginne mit: 'Du bist ein erfahrener Trainer / Didaktik-Experte im Versicherungswesen...'",
          "Beispiel: 'Du bist ein erfahrener Ausbilder und Didaktik-Experte für die Versicherungsbranche. Deine Aufgabe ist es, Schulungsunterlagen für Auszubildende zu erstellen.'",
          "Fast-Beispiel: 'Du bist ein [ROLLE] mit Expertise in [BEREICH]. Erstelle [ART] Schulungsunterlagen zum Thema [THEMA] für [ZIELGRUPPE].'",
        ],
      },
      {
        level: 2,
        name: "Fortgeschritten",
        threshold: 60,
        focus: "Kontext: Zielgruppe und inhaltliche Abdeckung",
        task:
          "Beschreibe die Zielgruppe (Auszubildende, erste Lehrjahr, keine Vorkenntnisse) und die inhaltlichen Anforderungen (alle Komposit-Sparten).",
        hints: [
          "Spezifiziere die Zielgruppe genau: Erstes Lehrjahr, keine Vorkenntnisse, welcher Bildungsstand?",
          "Liste die inhaltlichen Anforderungen: Sach-, Haftpflicht-, Unfall- und Kfz-Versicherung müssen alle abgedeckt werden.",
          "Beispiel: 'Zielgruppe: Auszubildende im ersten Lehrjahr ohne Vorkenntnisse. Inhalt: 1. Sachversicherung (Gebäude, Hausrat), 2. Haftpflichtversicherung, 3. Unfallversicherung, 4. Kfz-Versicherung...'",
          "Fast-Beispiel: '...Zielgruppe: [GRUPPE] mit [VORKENNTNISSEN]. Dauer: [STUNDEN]. Inhalt muss abdecken: [SPARTE_1], [SPARTE_2], [SPARTE_3], [SPARTE_4].'",
        ],
      },
      {
        level: 3,
        name: "Profi",
        threshold: 70,
        focus: "Didaktik: Lernziele, Methodik und Ausgabeformat",
        task:
          "Definiere das didaktische Konzept (Lernziele, Methodik) und lege das Ausgabeformat fest (Präsentation, Handout, Quiz).",
        hints: [
          "Lernziele sollten SMART sein und nach Lernebenen (Wissen, Verstehen, Anwenden) strukturiert werden.",
          "Methodik: aktivierende Methoden, Fallbeispiele, Diskussionen, Gruppenarbeit — definiere was der Assistent entwickeln soll.",
          "Beispiel: 'Lernziele: Die Auszubildenden können nach der Schulung: 1. Die 4 Komposit-Sparten benennen, 2. Typische Schadenbeispiele zuordnen. Erstelle: Präsentation (20 Folien), Handout (A4), Quiz (10 Fragen).'",
          "Fast-Beispiel: '...Lernziele: [ZIELE_LISTE]. Methodik: [METHODEN]. Erstelle folgende Materialien: 1. [MATERIAL]: [SPEZIFIKATION], 2. [MATERIAL]: [SPEZIFIKATION].'",
        ],
      },
      {
        level: 4,
        name: "Experte",
        threshold: 80,
        focus: "Vollständigkeit: Praxisbeispiele, Übungen und Sprache",
        task:
          "Fordere konkrete Praxisbeispiele und Übungsaufgaben an und definiere Sprache und Komplexitätsniveau.",
        hints: [
          "Fordere explizit Praxisbeispiele aus dem Versicherungsalltag an (echte Schäden, reale Szenarien) und interaktive Übungen.",
          "Definiere das Sprachniveau: Kein Fachjargon, oder Fachjargon mit Erklärung? Verständliche Analogien verwenden?",
          "Beispiel: 'Integriere je Sparte: 1 Fallbeispiel aus der Praxis, 2 Übungsaufgaben zum Selbsttest. Sprache: Kein unbegründeter Fachjargon. Neue Fachbegriffe immer erklären. Nutze Alltagsbeispiele.'",
          "Fast-Beispiel: '...Je Themenblock: [X] Praxisbeispiele, [Y] Übungsaufgaben. Sprachniveau: [NIVEAU]. Neue Begriffe: [BEHANDLUNG]. Fallstudie am Ende: [BESCHREIBUNG].'",
        ],
      },
      {
        level: 5,
        name: "Champion",
        threshold: 90,
        focus: "Exzellenz: Vollständiges didaktisches Konzept",
        task:
          "Erstelle einen vollständigen, professionellen Prompt mit Trainer-Rolle, Zielgruppenbeschreibung, inhaltlicher Abdeckung, didaktischem Konzept, Ausgabeformat, Praxisbeispielen und Sprachvorgaben.",
        hints: [
          "Alle Elemente: Trainer-Rolle, Zielgruppe (Auszubildende, keine Vorkenntnisse), Komposit-Sparten, Lernziele, Methodik, Ausgabeformate, Praxisbeispiele, Sprache.",
          "Prüfe: Könnten die Unterlagen sofort in einer realen Schulung eingesetzt werden?",
          "Profi-Ergänzungen: Lernerfolgskontrolle einbauen, Trainer-Notizen, Zeitplan für 2-Tages-Schulung, Literaturempfehlungen.",
          "Fast-Beispiel: 'Du bist ein [EXPERTE]. Erstelle vollständige Schulungsunterlagen für [ZIELGRUPPE]. Thema: [INHALT]. Lernziele: [ZIELE]. Materialien: [LISTE]. Methodik: [ANSATZ]. Praxisbeispiele: [VORGABEN]. Sprache: [NIVEAU]. Zeitplan: [DAUER].'",
        ],
      },
    ],
  },

  prozess: {
    id: "prozess",
    categoryId: "unternehmensentwicklung",
    subcategoryId: "prozessmanagement",
    title: "Prozessoptimierung dokumentieren",
    shortDescription:
      "Analysiere den Dunkelverarbeitungsprozess für Kfz-Glasschäden und entwickle einen Optimierungsplan zur Steigerung von 40% auf 75% automatischer Regulierung.",
    context:
      "Das Projektmanagement der Mecklenburgischen möchte den Dunkelverarbeitungsprozess für Kfz-Glasschäden optimieren. Aktuell werden 40% der Glasschäden automatisch ohne manuelle Eingriffe reguliert. Das Ziel sind 75% Dunkelverarbeitungsquote. Der aktuelle Prozess umfasst 8 Schritte von der Schadenmeldung bis zur Auszahlung. Haupthindernisse: fehlende Datenqualität, manuelle Prüfschritte und legacy IT-Systeme.",
    icon: "GitBranch",
    keywords: [
      "dunkelverarbeitung",
      "glasschaden",
      "kfz",
      "prozessoptimierung",
      "automatisierung",
      "prozessanalyse",
      "bpmn",
      "lean",
      "six sigma",
      "stakeholder",
      "kpi",
      "maßnahmenplan",
      "projektmanagement",
    ],
    levels: [
      {
        level: 1,
        name: "Einsteiger",
        threshold: 50,
        focus: "Grundstruktur: Prozessberater-Rolle und Analyseauftrag",
        task:
          "Schreibe einen Prompt, der dem Assistenten die Rolle eines Prozessberaters gibt und den Auftrag, eine Prozessoptimierung zu erarbeiten.",
        hints: [
          "Definiere Rolle (Prozessberater, BPM-Experte, Lean-Experte) und Auftrag (Prozess analysieren und Optimierungsvorschläge erarbeiten).",
          "Beginne mit: 'Du bist ein erfahrener Prozessberater / Business Process Management (BPM) Experte...'",
          "Beispiel: 'Du bist ein erfahrener Prozessberater für Versicherungsunternehmen. Deine Aufgabe ist es, einen Automatisierungsprozess zu analysieren und Optimierungsvorschläge zu entwickeln.'",
          "Fast-Beispiel: 'Du bist ein [ROLLE] mit Fokus auf [METHODIKEN]. Analysiere den [PROZESSNAME] Prozess und entwickle einen Optimierungsvorschlag.'",
        ],
      },
      {
        level: 2,
        name: "Fortgeschritten",
        threshold: 60,
        focus: "Kontext: Ist-Zustand und Zieldefinition",
        task:
          "Beschreibe den aktuellen Prozessstatus (40% Dunkelverarbeitung, 8 Prozessschritte, Hindernisse) und das Ziel (75%).",
        hints: [
          "Beschreibe den Ist-Zustand: Aktuelle Quote (40%), Anzahl Prozessschritte, bekannte Hindernisse (Datenqualität, manuelle Checks, legacy IT).",
          "Definiere das Soll-Ziel klar: 75% Dunkelverarbeitungsquote — warum ist das realistisch? Was sind Benchmarks?",
          "Beispiel: 'Ist-Zustand: Glasschadensprozess mit 8 Schritten, aktuell 40% automatisch reguliert. Hindernisse: Datenqualität, 3 manuelle Prüfschritte, IT-System aus 2008. Ziel: 75% bis [DATUM].'",
          "Fast-Beispiel: '...Ist-Zustand: [AKTUELLE_QUOTE]% automatisiert, [N] Prozessschritte. Hindernisse: [LISTE]. Ziel: [ZIEL_QUOTE]% bis [ZEITRAUM]. Delta: [DIFFERENZ] Prozentpunkte.'",
        ],
      },
      {
        level: 3,
        name: "Profi",
        threshold: 70,
        focus: "Methodik und Ausgabeformat",
        task:
          "Fordere eine spezifische Analysemethodik an (BPMN, Lean, Six Sigma) und definiere das Ausgabeformat (Prozessanalyse, Maßnahmenplan, KPIs).",
        hints: [
          "Methodiken: BPMN für Prozessdarstellung, Lean für Waste-Analyse (Muda), Six Sigma DMAIC für Qualitätsverbesserung. Fordere eine passende Methodik an.",
          "Ausgabeformat: Prozessanalyse (Ist-Fluss mit Pain Points), Maßnahmenplan (Was, Wer, Wann), KPI-Dashboard (was messen).",
          "Beispiel: 'Wende BPMN-Notation für den Ist-Prozess an. Identifiziere Waste nach Lean-Prinzipien. Erstelle: 1. Ist-Prozessdiagramm mit Pain Points, 2. Optimierungsmaßnahmen priorisiert nach Aufwand/Nutzen, 3. KPIs.'",
          "Fast-Beispiel: '...Methodik: [METHODIK]. Erstelle: 1. [DOKUMENT_1]: [INHALT], 2. [DOKUMENT_2]: [INHALT], 3. [KPI_LISTE].'",
        ],
      },
      {
        level: 4,
        name: "Experte",
        threshold: 80,
        focus: "Vollständigkeit: Stakeholder und Umsetzungsplan",
        task:
          "Berücksichtige alle relevanten Stakeholder (IT, Fachabteilung, Kunden) und fordere einen priorisierten Umsetzungsplan an.",
        hints: [
          "Stakeholder-Analyse: IT (Systeme anpassen), Fachabteilung (Prozesse ändern), Kunden (schnellere Regulierung), Management (ROI).",
          "Umsetzungsplan: Quick Wins (sofort, wenig Aufwand) vs. strategische Maßnahmen. Priorisierungsmatrix Aufwand × Nutzen.",
          "Beispiel: 'Analysiere Stakeholder-Interessen: IT-Abteilung (Umsetzungsaufwand), Schadenbearbeitung (Workflow-Änderungen), Kunden (Regulierungszeit). Erstelle Umsetzungsplan mit Quick Wins (< 3 Monate) und Langfristmaßnahmen.'",
          "Fast-Beispiel: '...Stakeholder: [LISTE mit Interessen]. Maßnahmenplan: Quick Wins [KRITERIEN], mittelfristig [KRITERIEN], strategisch [KRITERIEN]. Priorisierung nach: [KRITERIUM].'",
        ],
      },
      {
        level: 5,
        name: "Champion",
        threshold: 90,
        focus: "Exzellenz: Vollständige Prozessoptimierungsanalyse",
        task:
          "Erstelle einen vollständigen Prompt für den gesamten Optimierungsauftrag: Rolle, Ist-Zustand, Ziel, Methodik, Stakeholder, Ausgabeformat mit Prozessanalyse, Maßnahmenplan, KPIs und Umsetzungsplan.",
        hints: [
          "Alle Elemente: BPM-Experten-Rolle, Ist-Zustand (40%/8 Schritte), Ziel (75%), Hindernisse, Methodik (BPMN/Lean), Stakeholder, Report-Format mit KPIs und priorisierten Maßnahmen.",
          "Prüfe: Könnte ein Projektmanager mit dem Output direkt einen Business Case erstellen?",
          "Profi-Ergänzungen: Wirtschaftlichkeitsberechnung (ROI), Change-Management-Aspekte, regulatorische Anforderungen (DSGVO bei automatisierten Entscheidungen).",
          "Fast-Beispiel: 'Du bist ein [EXPERTE]. Analysiere folgenden Prozess: [BESCHREIBUNG]. Ist: [ZUSTAND]. Ziel: [ZIEL]. Methodik: [FRAMEWORK]. Stakeholder berücksichtigen: [LISTE]. Erstelle: [DOKUMENTE]. KPIs: [LISTE]. Umsetzungsplan: [PHASEN]. Einschränkungen: [LISTE].'",
        ],
      },
    ],
  },
};

// All new scenarios as a flat array
const NEW_SCENARIOS: Scenario[] = [
  ...SCENARIOS_ALLGEMEIN,
  ...SCENARIOS_UE,
  ...SCENARIOS_SCHADEN,
  ...SCENARIOS_ANTRAG,
  ...SCENARIOS_KOMPOSIT,
  ...SCENARIOS_KRANKEN,
  ...SCENARIOS_LEBEN,
  ...SCENARIOS_MARKETING,
  ...SCENARIOS_SCHULUNG,
];

// Merge legacy + new into a single record
export const SCENARIOS: Record<ScenarioId, Scenario> = {
  ...LEGACY_SCENARIOS,
  ...Object.fromEntries(NEW_SCENARIOS.map((s) => [s.id, s])),
};

// Legacy order first, then new scenarios
export const SCENARIO_ORDER: ScenarioId[] = [
  "schaden",
  "vertrag",
  "risiko",
  "schulung",
  "prozess",
  ...NEW_SCENARIOS.map((s) => s.id),
];
