# 🚀 CLAUDE CODE — AUTONOMOUS BUILD PROMPT
## Projekt: Prompting-Hack — Gamifiziertes Prompt-Training für Versicherungsprofis

---

## ⚙️ BETRIEBSMODUS: VOLLAUTONOMER NACHTBUILD

Du arbeitest heute Nacht vollständig autonom. Es wird NIEMAND am Rechner sitzen, der "Continue" drückt oder Fragen beantwortet. Dein Verhalten:

### Autonomie-Regeln
1. **NIEMALS auf Nutzer-Input warten** — Triff alle Entscheidungen selbst.
2. **NIEMALS abbrechen** — Bei Fehlern: analysieren, fixen, weitermachen.
3. **Immer `--yes` / `--force` Flags nutzen** wo verfügbar (npm, etc.).
4. **Jede Phase abschließen, testen, committen** — dann erst zur nächsten.
5. **Bei unlösbaren Blockern**: Workaround implementieren, TODO-Kommentar setzen, weitermachen.

### Arbeitsrhythmus (Loop-Architektur)
```
FÜR JEDE PHASE:
  1. Implementiere den Code
  2. Führe automatische Tests durch (Lint, Build, Unit-Tests, E2E wo möglich)
  3. Wenn Tests fehlschlagen → Fix → Re-Test (max. 5 Iterationen)
  4. Wenn nach 5 Iterationen nicht gelöst → Workaround + TODO
  5. Code-Review: Lies deinen eigenen Code nochmal und prüfe auf:
     - Fehlende Edge Cases
     - Hardcoded Values die konfigurierbar sein sollten
     - Accessibility-Probleme
     - Performance-Probleme
  6. Git Commit mit aussagekräftiger Message
  7. Weiter zur nächsten Phase
```

---

## 📁 PROJEKT-SETUP

### Technologie-Stack
- **Framework**: Next.js 14+ (App Router)
- **Sprache**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3+ mit Custom Theme
- **State Management**: React Context + useReducer (kein Redux nötig)
- **AI-Backend**: Anthropic API (Claude Sonnet 4) für Prompt-Bewertung
- **Datenbank**: Keine nötig — alles Client-seitig mit localStorage für Fortschritt
- **Testing**: Vitest + React Testing Library + Playwright (E2E)
- **Linting**: ESLint + Prettier
- **Deployment**: Static Export oder Docker (Cloudflare Tunnel zu `prompting-hack.denntainshome.com`)

### Initiales Setup (Phase 0)
```bash
# Workspace initialisieren
mkdir prompting-hack && cd prompting-hack
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install framer-motion lucide-react
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react playwright @playwright/test
git init
git add -A
git commit -m "chore: initial Next.js project setup"
```

### Umgebungsvariablen (.env.local)
```env
ANTHROPIC_API_KEY=sk-ant-PLACEHOLDER
NEXT_PUBLIC_APP_URL=https://prompting-hack.denntainshome.com
```
> Hinweis: API Key wird später vom Nutzer eingetragen. Baue eine Fallback-Bewertungslogik ein, die OHNE API funktioniert (regelbasiert), sodass die App auch ohne API-Key nutzbar ist.

---

## 🎨 DESIGN-SYSTEM (VERBINDLICH)

### Farbpalette (CSS Custom Properties)
```css
:root {
  /* Primärfarben — Mecklenburgische Corporate Design */
  --color-gold: #FFB800;
  --color-gold-light: #FFD54F;
  --color-gold-dark: #CC9300;
  --color-dark: #2E3641;
  --color-dark-deep: #1A1A1A;
  --color-sage: #8DA69D;
  --color-sage-light: #A8BFB7;
  --color-sage-dark: #6B8A80;
  --color-light-grey: #EBEEED;
  --color-white: #FAFAFA;

  /* Semantische Farben */
  --color-success: #4CAF50;
  --color-error: #E53935;
  --color-warning: #FFB800;
  --color-info: #8DA69D;

  /* Level-Farben (Progression) */
  --color-level-1: #8DA69D;    /* Sage — Einsteiger */
  --color-level-2: #5B9BD5;    /* Blau — Fortgeschritten */
  --color-level-3: #FFB800;    /* Gold — Profi */
  --color-level-4: #FF8C00;    /* Orange — Experte */
  --color-level-5: #E53935;    /* Rot — Champion */
}
```

### Typografie
- **Headlines**: `"Sora", sans-serif` (von Google Fonts laden)
- **Body**: `"DM Sans", sans-serif` (von Google Fonts laden)
- **Code/Prompts**: `"JetBrains Mono", monospace` (von Google Fonts laden)

### Design-Prinzipien
- Dark-Theme-First: Haupthintergrund `--color-dark` / `--color-dark-deep`
- Gold als Akzent und CTA-Farbe
- Sage als sekundäre Akzentfarbe (Fortschrittsbalken, Info-Elemente)
- Glasmorphism-Effekte für Karten (backdrop-blur, halbtransparente Hintergründe)
- Subtile Animationen: Fade-In, Slide-Up, Glow-Effekte auf Gold-Elementen
- Level-Progression visuell durch Farbwechsel und Intensitäts-Steigerung
- Mobile-First responsive Design
- Kein generischer "AI-Look" — professionell, versicherungsbranchentauglich, aber modern

---

## 🏗️ APP-ARCHITEKTUR

### Seitenstruktur
```
/                           → Startseite (Szenario-Auswahl)
/szenario/[id]              → Szenario-Übersicht + Level-Anzeige
/szenario/[id]/level/[lvl]  → Aktives Prompt-Challenge
/champion                   → Finale Glückwunschseite
```

### Komponenten-Hierarchie
```
src/
├── app/
│   ├── layout.tsx              # Root Layout mit Fonts, Theme
│   ├── page.tsx                # Startseite
│   ├── champion/page.tsx       # Champion-Seite
│   └── szenario/
│       └── [id]/
│           ├── page.tsx        # Szenario-Übersicht
│           └── level/
│               └── [level]/
│                   └── page.tsx # Challenge-Seite
├── components/
│   ├── ui/                     # Basis-UI (Button, Card, Badge, ProgressBar, Modal)
│   ├── layout/                 # Header, Footer, Navigation
│   ├── scenario/               # ScenarioCard, ScenarioGrid, ScenarioHeader
│   ├── challenge/              # PromptEditor, FeedbackPanel, HintSystem, LevelProgress
│   └── celebration/            # Confetti, Trophy, ChampionBadge
├── lib/
│   ├── scenarios.ts            # Szenario-Definitionen (Daten)
│   ├── evaluation.ts           # Prompt-Bewertungslogik (regelbasiert + AI)
│   ├── api.ts                  # Anthropic API Integration
│   ├── storage.ts              # localStorage Wrapper für Fortschritt
│   └── types.ts                # TypeScript Interfaces
├── context/
│   └── GameContext.tsx          # Globaler Spielstand
└── styles/
    └── globals.css             # Tailwind + Custom Properties
```

---

## 📋 DIE 5 SZENARIEN (VERSICHERUNGSKONTEXT)

### Szenario 1: „Schadenmeldung optimieren"
**Kontext**: Ein Kunde meldet telefonisch einen Wasserschaden in seiner Wohngebäudeversicherung. Der Innendienst-Mitarbeiter muss die Schadenmeldung strukturiert erfassen und dem Kunden die nächsten Schritte erklären.
**Prompt-Aufgabe**: Erstelle einen Prompt, der einen KI-Assistenten anweist, den Mitarbeiter bei der Schadenaufnahme und Kundenkommunikation zu unterstützen.
**Bewertungskriterien**:
- Rollendefinition (z.B. "Du bist ein erfahrener Schadenregulierer...")
- Klarer Auftrag/Aufgabe
- Kontext zum Versicherungsprodukt (Wohngebäude, Leitungswasser)
- Kommunikationsstil (empathisch, professionell, kundenorientiert)
- Strukturierte Ausgabe (Checkliste, Gesprächsleitfaden)
- Ausgabeformat-Spezifikation
- Einschränkungen/Grenzen (keine Deckungszusagen, Datenschutz)

### Szenario 2: „Vertragsverlängerung argumentieren"
**Kontext**: Ein langjähriger Gewerbekunde (KMU, Handwerksbetrieb) überlegt, seine Betriebshaftpflicht bei einem günstigeren Wettbewerber abzuschließen. Der Außendienst-Vermittler benötigt Unterstützung bei der Argumentation.
**Prompt-Aufgabe**: Erstelle einen Prompt, der einen KI-Assistenten anweist, überzeugende Argumente für die Vertragsverlängerung zu generieren.
**Bewertungskriterien**:
- Rollendefinition (Vertriebsexperte, Versicherungsberater)
- Zielgruppenbeschreibung (KMU, Handwerk)
- Produktwissen (Betriebshaftpflicht, Deckungsumfänge)
- Wettbewerbsargumentation (Preis vs. Leistung vs. Service)
- Tonalität (überzeugend aber nicht aufdringlich, partnerschaftlich)
- Strukturierte Ausgabe (Gesprächsleitfaden, Einwandbehandlung)
- Ethische Leitplanken (keine Falschaussagen, keine Abwertung des Wettbewerbers)

### Szenario 3: „Risikoanalyse erstellen"
**Kontext**: Ein Underwriter muss für einen neuen Industriekunden (mittelständischer Maschinenbauunternehmer) eine Risikoanalyse zur Technischen Versicherung erstellen. Es liegen Betriebsdaten, Umsatzzahlen und Schadenhistorie vor.
**Prompt-Aufgabe**: Erstelle einen Prompt, der einen KI-Assistenten anweist, eine strukturierte Risikoanalyse zu erstellen.
**Bewertungskriterien**:
- Rollendefinition (Underwriting-Experte)
- Input-Daten-Spezifikation (welche Informationen benötigt werden)
- Analyse-Framework (Risikokategorien, Bewertungsskala)
- Branchenspezifischer Kontext (Maschinenbau, technische Risiken)
- Ausgabeformat (strukturierter Report, Risikomatrix)
- Handlungsempfehlungen anfordern
- Limitierungen (keine finale Zeichnungsentscheidung durch KI)

### Szenario 4: „Schulungsunterlagen erstellen"
**Kontext**: Die Personalentwicklung plant eine Schulung für neue Auszubildende zum Thema "Grundlagen der Kompositversicherung" (Sach, Haftpflicht, Unfall, Kfz). Die Unterlagen sollen modern, verständlich und interaktiv sein.
**Prompt-Aufgabe**: Erstelle einen Prompt, der einen KI-Assistenten anweist, didaktisch aufbereitete Schulungsunterlagen zu erstellen.
**Bewertungskriterien**:
- Rollendefinition (Didaktik-Experte, Versicherungstrainer)
- Zielgruppendefinition (Auszubildende, Vorkenntnisse)
- Inhaltliche Abdeckung (Komposit-Sparten)
- Didaktisches Konzept (Lernziele, Methodik)
- Ausgabeformat (Präsentation, Handout, Quiz)
- Praxisbeispiele und Übungen anfordern
- Sprache und Komplexitätsniveau definieren

### Szenario 5: „Prozessoptimierung dokumentieren"
**Kontext**: Das Projektmanagement möchte den Dunkelverarbeitungsprozess für Kfz-Glasschäden optimieren. Aktuell werden 40% der Glasschäden automatisch reguliert, Ziel sind 75%. Der aktuelle Prozess muss analysiert und Verbesserungsvorschläge erarbeitet werden.
**Prompt-Aufgabe**: Erstelle einen Prompt, der einen KI-Assistenten anweist, den Prozess zu analysieren und einen Optimierungsvorschlag zu erarbeiten.
**Bewertungskriterien**:
- Rollendefinition (Prozessberater, BPM-Experte)
- Ist-Zustand-Beschreibung (aktuelle Quote, Prozessschritte)
- Ziel-Definition (75% Dunkelverarbeitung)
- Methodik anfordern (BPMN, Lean, Six Sigma)
- Stakeholder-Berücksichtigung (IT, Fachabteilung, Kunden)
- Ausgabeformat (Prozessanalyse, Maßnahmenplan, KPIs)
- Umsetzungsplan mit Priorisierung

---

## 🎮 LEVEL-SYSTEM (PRO SZENARIO)

### Level-Struktur
| Level | Name | Schwelle | Fokus |
|-------|------|----------|-------|
| 1 | Einsteiger | 50% | Grundstruktur: Hat der Prompt eine Rolle und einen Auftrag? |
| 2 | Fortgeschritten | 60% | Kontext: Sind relevante Informationen zum Szenario enthalten? |
| 3 | Profi | 70% | Kommunikation: Ist Tonalität/Stil definiert? Ausgabeformat? |
| 4 | Experte | 80% | Vollständigkeit: Sind Einschränkungen, Edge Cases, Beispiele dabei? |
| 5 | Champion | 90% | Exzellenz: Ist der Prompt präzise, vollständig, professionell formuliert? |

### Bewertungssystem (evaluation.ts)
Implementiere ein hybrides Bewertungssystem:

#### A) Regelbasierte Bewertung (funktioniert IMMER, auch ohne API)
```typescript
interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number; // 0-1, Summe aller Gewichte = 1
  check: (prompt: string, scenarioId: string) => {
    score: number;    // 0-100
    feedback: string; // Konkretes Feedback
    suggestions: string[]; // Verbesserungsvorschläge
  };
}
```

**Prüfkategorien mit Gewichtung:**
1. **Rollendefinition** (20%) — Enthält der Prompt eine klare Rollenzuweisung? Schlüsselwörter: "Du bist", "Agiere als", "Rolle:", etc.
2. **Aufgabe/Auftrag** (20%) — Ist ein klarer Handlungsauftrag formuliert? Imperativ-Sätze, Aufgabenbeschreibung.
3. **Kontext/Hintergrund** (15%) — Sind szenariospezifische Informationen enthalten? Branchenbegriffe, Fachvokabular.
4. **Kommunikationsstil** (10%) — Ist eine Tonalität/Stil definiert? "professionell", "empathisch", "sachlich", etc.
5. **Ausgabeformat** (15%) — Wird ein Ausgabeformat spezifiziert? "Liste", "Tabelle", "Bericht", "Gesprächsleitfaden", etc.
6. **Einschränkungen/Grenzen** (10%) — Sind Leitplanken definiert? "Nicht", "Vermeide", "Beschränke", "Keine Zusagen", etc.
7. **Präzision/Qualität** (10%) — Promptlänge angemessen? Keine Rechtschreibfehler? Logische Struktur?

#### B) KI-gestützte Bewertung (wenn API-Key vorhanden)
Sende den Prompt an Claude Sonnet mit einem Meta-Prompt zur Bewertung:
```
Du bist ein Prompt-Engineering-Experte. Bewerte den folgenden Prompt auf einer Skala von 0-100 nach diesen Kriterien: [Kriterien des aktuellen Szenarios].

Antwort-Format (NUR valides JSON, keine Markdown-Formatierung):
{
  "totalScore": 75,
  "criteria": [
    { "name": "Rollendefinition", "score": 80, "feedback": "...", "suggestions": ["..."] },
    ...
  ],
  "overallFeedback": "...",
  "strengths": ["..."],
  "improvements": ["..."]
}
```

**WICHTIG**: Implementiere Fallback-Logik: Wenn API nicht erreichbar → regelbasierte Bewertung nutzen.

### Hilfestellungssystem
Nach jedem 5. Fehlversuch pro Level (unter Schwelle geblieben):

- **Versuch 1-5**: Nur generelles Feedback ("Dein Prompt fehlt eine klare Rollendefinition.")
- **Versuch 6-10**: Konkreter Hinweis ("Versuche deinen Prompt mit 'Du bist ein...' zu beginnen und definiere die Expertise der Rolle.")
- **Versuch 11-15**: Beispiel-Fragment ("Beispiel für eine gute Rollendefinition: 'Du bist ein erfahrener Schadenregulierer mit 10 Jahren Erfahrung in der Wohngebäudeversicherung.'")
- **Versuch 16+**: Fast komplettes Beispiel mit Lücken zum Ausfüllen.

---

## 🖥️ UI/UX-SPEZIFIKATIONEN

### Startseite (`/`)
- **Hero-Section**: Großer Titel "Prompting Hack" mit Untertitel "Werde zum Prompt-Champion — Trainiere KI-Prompting im Versicherungskontext"
- **Animated Glowing Gold**: Der Titel "Hack" hat einen Gold-Glow-Effekt (pulsierend)
- **5 Szenario-Karten** in einem responsiven Grid (1 Spalte mobil, 2-3 Desktop)
- Jede Karte zeigt:
  - Icon (passend zum Szenario, verwende Lucide Icons)
  - Szenario-Titel
  - Kurzbeschreibung (1-2 Sätze)
  - Fortschrittsbalken (Level 0-5)
  - Status-Badge: "Nicht gestartet" / "In Bearbeitung" / "Abgeschlossen ✓"
  - Klickbar → navigiert zu `/szenario/[id]`
- **Gesamtfortschritt**: Kreisdiagramm oder Fortschrittsring oben rechts
- **Footer**: "Ein Projekt der Mecklenburgischen Versicherung — Unternehmensentwicklung"

### Szenario-Übersicht (`/szenario/[id]`)
- Szenario-Titel und ausführliche Beschreibung
- 5 Level als horizontaler Stepper/Timeline
  - Vergangene Level: Grün mit Häkchen
  - Aktuelles Level: Gold, pulsierend
  - Zukünftige Level: Grau, gesperrt (Schloss-Icon)
- CTA-Button "Level [X] starten" → navigiert zum aktiven Level

### Challenge-Seite (`/szenario/[id]/level/[level]`)
Layout (Desktop): Zwei-Spalten-Layout
- **Links (60%)**: Prompt-Editor
  - Szenario-Kontext oben (kollabierbar)
  - Aufgabenstellung (was soll der Prompt können?)
  - Großes Textarea für Prompt-Eingabe (min. 200px Höhe)
  - Zeichenzähler
  - "Prompt bewerten" Button (Gold, prominent)
  - Versuchszähler: "Versuch 3/∞"
- **Rechts (40%)**: Feedback-Panel
  - Gesamtscore als große Zahl mit Kreisdiagramm
  - Einzelkriterien als Fortschrittsbalken mit Score
  - Stärken (grün) und Verbesserungen (gold/orange)
  - Hilfestellungen (nach 5 Fehlversuchen, einklappbar)
  - "Weiter zum nächsten Level" Button (erscheint bei Erfolg)

Layout (Mobil): Gestapelt, Editor oben, Feedback unten als Slide-Up-Panel

### Erfolgs-Animationen
- **Level geschafft**: Konfetti-Animation + "Level [X] bestanden!" Modal
- **Szenario abgeschlossen**: Trophy-Animation + Weiterleitung zur Szenario-Auswahl
- **Alles geschafft**: Volle Seite, "🏆 Du bist ein echter Prompting Champion!" mit:
  - Großes goldenes Trophy-Icon
  - Konfetti-Regen
  - Statistiken (Gesamtversuche, Durchschnitts-Score, beste Scores)
  - "Nochmal spielen" Button
  - Social-Share Möglichkeit (optional)

---

## 🔧 IMPLEMENTATION — PHASENPLAN

Arbeite die folgenden Phasen **streng sequentiell** ab. Jede Phase MUSS komplett abgeschlossen und getestet sein, bevor die nächste beginnt.

### Phase 1: Fundament (Setup + Design System)
1. Projekt initialisieren (Next.js, Tailwind, Dependencies)
2. Tailwind Config mit Custom Theme (Farben, Fonts, Animationen)
3. Google Fonts einbinden (Sora, DM Sans, JetBrains Mono)
4. Globals.css mit CSS Custom Properties
5. Basis-UI-Komponenten: Button, Card, Badge, ProgressBar, Modal
6. Layout-Komponenten: Header, PageWrapper
7. **TEST**: Vitest Setup + Basis-Komponenten-Tests (Rendering, Props)
8. **REVIEW**: Visueller Check — stimmen Farben, Fonts, Spacing?
9. **COMMIT**: `feat: design system and base components`

### Phase 2: Daten & State Management
1. TypeScript Interfaces (Scenario, Level, Evaluation, GameState)
2. Szenario-Daten komplett definieren (alle 5, alle Level, alle Kriterien)
3. localStorage Wrapper (save, load, reset Spielstand)
4. GameContext mit useReducer (startScenario, completeLevel, resetAll)
5. **TEST**: Unit-Tests für Storage und Context
6. **COMMIT**: `feat: game data model and state management`

### Phase 3: Startseite
1. Hero-Section mit animiertem Titel
2. ScenarioCard Komponente
3. ScenarioGrid mit Fortschrittsanzeige
4. Gesamtfortschrittsanzeige
5. Responsive Layout testen (Mobile + Desktop)
6. **TEST**: Rendering-Tests, Navigation-Tests
7. **REVIEW**: Ist die Startseite visuell ansprechend und klar?
8. **COMMIT**: `feat: landing page with scenario selection`

### Phase 4: Szenario-Übersicht
1. Dynamische Route `/szenario/[id]`
2. Szenario-Header mit Beschreibung
3. Level-Stepper/Timeline Komponente
4. Level-Status (locked/active/completed)
5. Navigation zum aktiven Level
6. **TEST**: Route-Tests, Level-Status-Logik
7. **COMMIT**: `feat: scenario overview with level progression`

### Phase 5: Challenge-Seite (Kern-Feature)
1. Prompt-Editor Komponente (Textarea, Zeichenzähler)
2. Aufgabenstellung-Anzeige
3. Szenario-Kontext (kollabierbar)
4. "Bewerten" Button mit Loading-State
5. Responsive Two-Column Layout
6. **TEST**: Editor-Interaktionen, Layout-Tests
7. **COMMIT**: `feat: challenge page with prompt editor`

### Phase 6: Bewertungssystem
1. Regelbasierte Bewertungslogik (alle 7 Kriterien)
2. Kriterien-spezifische Checks pro Szenario
3. Score-Berechnung (gewichteter Durchschnitt)
4. Feedback-Generierung (Stärken, Verbesserungen, Vorschläge)
5. API-Route für Claude-Bewertung (`/api/evaluate`)
6. Fallback-Logik (API nicht verfügbar → regelbasiert)
7. **TEST**: Bewertungslogik mit diversen Test-Prompts testen!
   - Leerer Prompt → Score ~0%
   - Minimaler Prompt ("Schreibe einen Text") → Score ~15-25%
   - Mittelmäßiger Prompt (nur Rolle + Auftrag) → Score ~40-50%
   - Guter Prompt (alle Kriterien teilweise) → Score ~65-75%
   - Exzellenter Prompt → Score ~90-100%
8. **REVIEW**: Sind die Bewertungen fair und nachvollziehbar?
9. **COMMIT**: `feat: hybrid evaluation system (rule-based + AI)`

### Phase 7: Feedback-Panel & Hilfestellungen
1. FeedbackPanel Komponente (Score, Kriterien, Tipps)
2. Animierte Score-Anzeige (Kreis/Ring-Diagramm)
3. Einzelkriterien als farbige Fortschrittsbalken
4. HintSystem (gestufte Hilfestellungen nach Fehlversuchen)
5. Versuchszähler
6. "Level bestanden" Erkennung + Weiter-Button
7. **TEST**: Feedback-Rendering, Hint-Logik nach 5/10/15 Versuchen
8. **COMMIT**: `feat: feedback panel with progressive hints`

### Phase 8: Level-Progression & Celebration
1. Level-Completion-Logik (Score >= Schwelle → nächstes Level freischalten)
2. Konfetti-Animation (CSS oder Canvas-basiert)
3. Level-bestanden-Modal
4. Szenario-abgeschlossen-Seite
5. Champion-Seite (`/champion`)
6. Spielstand-Persistenz über Page Reloads
7. **TEST**: Kompletter Flow: Level 1 → 5 durchspielen
8. **REVIEW**: Fühlt sich die Progression befriedigend an?
9. **COMMIT**: `feat: level progression and celebration screens`

### Phase 9: Polish & Edge Cases
1. Loading States überall
2. Error Boundaries
3. 404-Seite
4. Keyboard Navigation (Tab, Enter zum Absenden)
5. Animations feintunen (kein Flackern, smooth)
6. Mobile Optimierung final prüfen
7. Performance: Lazy Loading, Code Splitting
8. Accessibility: ARIA Labels, Kontraste, Screen Reader
9. **TEST**: E2E Tests mit Playwright (Happy Path)
10. **COMMIT**: `feat: polish, accessibility, and edge cases`

### Phase 10: Deployment-Vorbereitung
1. Docker-Dateien erstellen (Dockerfile + docker-compose.yml)
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   FROM node:20-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV=production
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   COPY --from=builder /app/public ./public
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```
2. docker-compose.yml für denntainshome Stack
   ```yaml
   services:
     prompting-hack:
       build: .
       container_name: prompting-hack
       restart: unless-stopped
       ports:
         - "3100:3000"
       environment:
         - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
       networks:
         - denntainshome
   networks:
     denntainshome:
       external: true
   ```
3. Cloudflare Tunnel Konfiguration dokumentieren
4. `npm run build` erfolgreich durchlaufen lassen
5. **TEST**: Docker Build + Container Start
6. **FINAL COMMIT**: `chore: deployment configuration`

---

## 🧪 TEST-STRATEGIE

### Automatische Tests (werden in jeder Phase ausgeführt)
```bash
# Nach jeder Implementierung:
npm run lint          # ESLint Fehler → sofort fixen
npm run build         # Build-Fehler → sofort fixen
npx vitest run        # Unit Tests → bei Fehlschlag: Fix + Re-Run
```

### Test-Dateien Konvention
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx    ← Co-located Tests
├── lib/
│   ├── evaluation.ts
│   └── evaluation.test.ts
```

### Vitest Konfiguration (vitest.config.ts)
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Kritische Testfälle (MÜSSEN bestehen)
1. **Bewertungslogik**: Leerer Prompt → 0%, Exzellenter Prompt → 90%+
2. **Level-Progression**: Score unter Schwelle → Level bleibt, Score über Schwelle → Level freigeschaltet
3. **Hilfestellungen**: Nach genau 5 Fehlversuchen erscheint Hint
4. **Spielstand**: localStorage speichern + laden funktioniert
5. **Navigation**: Alle Routen erreichbar, locked Levels nicht anklickbar
6. **Responsive**: Kein Content-Overflow auf 375px Breite

---

## 📝 FINALE CHECKLISTE (vor dem letzten Commit)

- [ ] Alle 5 Szenarien vollständig implementiert mit sinnvollen Kriterien
- [ ] Level 1-5 pro Szenario spielbar
- [ ] Bewertung funktioniert (regelbasiert, auch ohne API-Key)
- [ ] Hilfestellungen erscheinen nach 5 Fehlversuchen
- [ ] Fortschritt wird in localStorage gespeichert
- [ ] Champion-Seite erreichbar nach Abschluss aller Szenarien
- [ ] Responsive Design (Mobile + Desktop)
- [ ] Keine Console Errors
- [ ] `npm run build` erfolgreich
- [ ] Docker Build erfolgreich
- [ ] Mindestens 10 Unit-Tests bestehen
- [ ] Farben korrekt (#FFB800, #2E3641, #8DA69D, #EBEEED, #1A1A1A)
- [ ] Fonts geladen (Sora, DM Sans, JetBrains Mono)
- [ ] Animationen smooth und nicht übertrieben
- [ ] Alle Texte auf Deutsch

---

## ⚠️ WICHTIGE HINWEISE

1. **Sprache der App**: Komplett Deutsch (UI, Feedback, Hilfestellungen, alles).
2. **Code-Sprache**: Englisch (Variablen, Funktionen, Kommentare).
3. **Keine externen Backend-Services** außer optional Anthropic API.
4. **Kein Login/Auth** — die App ist offen zugänglich.
5. **Kein Datenbank-Server** — alles client-seitig.
6. **API-Key Sicherheit**: Falls API genutzt wird, Key nur serverseitig (API Route), nie im Client.
7. **Fehlertoleranz**: Die App MUSS auch komplett ohne API-Key funktionieren.
8. **Qualität vor Features**: Lieber weniger Features poliert als alle halbfertig.

---

## 🏁 LOS GEHT'S

Starte jetzt mit Phase 1. Arbeite jede Phase komplett durch. Teste nach jeder Phase. Committe nach jeder Phase. Wenn etwas nicht funktioniert: Fixe es. Wenn es nach 5 Versuchen nicht fixbar ist: Workaround + TODO-Kommentar, weiter.

Du hast die ganze Nacht. Nutze sie.
