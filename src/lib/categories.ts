import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "allgemein",
    title: "Allgemeine Szenarien im VU",
    icon: "Building2",
    description: "Typische KI-Anwendungsfälle quer durch ein Versicherungsunternehmen",
  },
  {
    id: "unternehmensentwicklung",
    title: "Unternehmensentwicklung",
    icon: "TrendingUp",
    description: "Strategische und operative Weiterentwicklung der Organisation",
    subcategories: [
      { id: "projektmanagement", title: "Projektmanagement", icon: "Kanban" },
      { id: "prozessmanagement", title: "Prozessmanagement (BPMN & RPA)", icon: "GitBranch" },
      { id: "architekturmanagement", title: "Architekturmanagement", icon: "Layers" },
      { id: "pmo", title: "PMO", icon: "LayoutDashboard" },
      { id: "anforderungsmanagement", title: "Anforderungsmanagement", icon: "ClipboardList" },
      { id: "strategie", title: "Strategie", icon: "Compass" },
      { id: "kommunikation-change", title: "Kommunikation & Change", icon: "MessageSquare" },
    ],
  },
  {
    id: "schaden",
    title: "Schaden / Leistung",
    icon: "AlertTriangle",
    description: "Schadenbearbeitung, Regulierung und Leistungsfälle",
  },
  {
    id: "antrag",
    title: "Antrag / Vertrag",
    icon: "FileText",
    description: "Antragsbearbeitung, Vertragsmanagement und Tarifierung",
  },
  {
    id: "komposit",
    title: "Kompositversicherung",
    icon: "Shield",
    description: "Sach-, Haftpflicht-, Unfall- und weitere Kompositsparten",
  },
  {
    id: "kranken",
    title: "Krankenversicherung",
    icon: "Heart",
    description: "Private und gesetzliche Krankenversicherung sowie Zusatzprodukte",
  },
  {
    id: "leben",
    title: "Lebensversicherung",
    icon: "Star",
    description: "Lebens-, Renten- und Berufsunfähigkeitsversicherung",
  },
  {
    id: "marketing",
    title: "Marketing",
    icon: "Megaphone",
    description: "Kampagnen, Content, Produktkommunikation und Markenführung",
  },
  {
    id: "schulung",
    title: "Schulung / Verkaufsförderung",
    icon: "GraduationCap",
    description: "Vertriebstraining, Produktschulungen und Qualifizierungsmaßnahmen",
  },
];
