import { MODULES, type TourView } from "@/lib/data";

export const MODULE_SLUG = {
  interviews: "interviews",
  assessments: "assessments",
  forms: "job-forms",
  analyser: "analyser",
  editor: "editor",
  pool: "talent-pool",
  schedule: "scheduling",
  people: "employees",
} as const;

export function moduleHref(id: string) {
  return `/${MODULE_SLUG[id as keyof typeof MODULE_SLUG] ?? id}`;
}

export const TOUR_HREF: Record<TourView, string> = {
  pipeline: "/pipeline",
  candidates: "/candidates",
  jobs: "/jobs",
  interviews: "/interviews",
  offers: "/offers",
  people: "/people",
  reports: "/reports",
};

export const FEATURE_HREF = [
  "/scoring",
  "/whatsapp",
  "/talent-pool",
  "/employees",
  "/scheduling",
  "/dashboard",
] as const;

export const FLOW_HREF = ["/interviews", "/scoring", "/talent-pool"] as const;

export const PLATFORM_HREF = ["/settings", "/reports", "/employees"] as const;

export const SCORE_HREF = ["/interviews", "/assessments", "/analyser"] as const;

export const DESK_LINKS = [
  { id: "dash", href: "/dashboard", label: "Dashboard" },
  { id: "interviews", href: "/interviews", label: "All Interviews" },
  { id: "pool", href: "/talent-pool", label: "Talent Pool", child: true },
  { id: "schedule", href: "/scheduling", label: "Scheduling Requests", child: true },
  { id: "assessments", href: "/assessments", label: "Assessments" },
  { id: "forms", href: "/job-forms", label: "Job Forms" },
  { id: "people", href: "/employees", label: "Employee Management" },
  { id: "analyser", href: "/analyser", label: "Bulk Resume Analyser" },
  { id: "editor", href: "/editor", label: "Bulk Resume Editor" },
  { id: "settings", href: "/settings", label: "Settings" },
  { id: "support", href: "/support", label: "Contact Support" },
] as const;

export const NAV_PAGES = [
  { href: "/how-it-works", hash: "how-it-works", label: "How It Works" },
  { href: "/modules", hash: "modules", label: "Modules" },
  { href: "/desk", hash: "desk", label: "Hiring Desk" },
  { href: "/features", hash: "features", label: "Features" },
  { href: "/pricing", hash: "pricing", label: "Pricing" },
] as const;

export function deskHref(id: string) {
  return DESK_LINKS.find((item) => item.id === id)?.href ?? `/${id}`;
}

export const MODULE_LIST = MODULES.map((item) => ({
  href: moduleHref(item.id),
  title: item.title,
  body: item.subtitle,
}));
