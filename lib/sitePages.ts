import { MODULES } from "@/lib/data";
import { DESK_LINKS, FEATURE_HREF, MODULE_LIST, moduleHref } from "@/lib/paths";

export type SiteLink = { href: string; title: string; body: string };

export type SiteRow = { av: string; name: string; tag: string };

export type SitePage = {
  slug: string;
  title: string;
  kicker: string;
  heading: string;
  body: string;
  items: string[];
  stat?: string;
  statLabel?: string;
  rows?: SiteRow[];
  kind: "tool" | "tour" | "section" | "form" | "pricing";
  links?: SiteLink[];
};

function fromModule(id: (typeof MODULES)[number]["id"], extra?: Partial<SitePage>): SitePage {
  const mod = MODULES.find((item) => item.id === id)!;
  return {
    slug: moduleHref(id).slice(1),
    title: mod.title,
    kicker: mod.kicker,
    heading: mod.heading,
    body: mod.body,
    items: [...mod.items],
    stat: mod.stat,
    statLabel: mod.statLabel,
    kind: "tool",
    ...extra,
  };
}

const MODULE_PAGES = MODULES.map((item) => fromModule(item.id));

const EXTRA: SitePage[] = [
  {
    slug: "dashboard",
    title: "Dashboard",
    kicker: "Home",
    heading: "See the whole hiring week in one place",
    body: "Live interviews, open scheduling requests and the talent pool sit on one home screen — so your team starts the day from the work, not from a hunt through modules.",
    items: [
      "Interviews waiting for review",
      "Scheduling requests that need a decision",
      "People already warm in the talent pool",
      "Scores from the latest assessment batch",
      "Jump into any module from the same login",
    ],
    stat: "Today",
    statLabel: "one home for the hiring week",
    rows: [
      { av: "12", name: "Interviews in review", tag: "Live" },
      { av: "3", name: "Scheduling requests", tag: "Needs you" },
      { av: "8", name: "Warm in the talent pool", tag: "Ready" },
    ],
    kind: "tool",
  },
  {
    slug: "settings",
    title: "Settings",
    kicker: "Account",
    heading: "Brand, access and notifications",
    body: "Set your colours, email templates, team roles and how candidates hear from you. Changes apply across every module in the same account.",
    items: [
      "Logo, brand colours and email templates",
      "Recruiter, hiring manager and admin roles",
      "WhatsApp and email alerts on the same record",
      "Export and webhook endpoints",
      "Turn access off without losing history",
    ],
    stat: "One",
    statLabel: "account for the whole desk",
    rows: [
      { av: "BR", name: "Brand colours & templates", tag: "On" },
      { av: "TM", name: "Team roles & scopes", tag: "On" },
      { av: "NT", name: "Email & WhatsApp alerts", tag: "On" },
    ],
    kind: "tool",
  },
  {
    slug: "support",
    title: "Contact Support",
    kicker: "Help",
    heading: "A person when you need a walkthrough",
    body: "Book a demo, ask about a batch, or get a hand setting up the first interview. Support sits in the same account as the rest of the hiring desk.",
    items: [
      "Book a 20-minute product walkthrough",
      "Email the support desk from this page",
      "Help during the 14-day trial",
      "Questions on a resume batch or invite",
    ],
    stat: "Live",
    statLabel: "help on the same account",
    rows: [
      { av: "DM", name: "Book a product walkthrough", tag: "Demo" },
      { av: "EM", name: "Email the support desk", tag: "Reply" },
      { av: "14", name: "Trial help, every module", tag: "Open" },
    ],
    kind: "tool",
  },
  {
    slug: "scoring",
    title: "AI scoring",
    kicker: "Features",
    heading: "A score and a reason on every response",
    body: "Interview answers, assessments and resumes all get a score and a reason, not just a gut feeling. The same scoring layer sits under every module.",
    items: [
      "Automatic score against your pass mark",
      "A written reason next to every number",
      "Works on interviews, tests and CVs",
      "Your team can disagree and override",
    ],
    stat: "92",
    statLabel: "typical shortlist score",
    kind: "tool",
  },
  {
    slug: "whatsapp",
    title: "WhatsApp",
    kicker: "Features",
    heading: "Message candidates without leaving the record",
    body: "Send reminders, run broadcasts and manage conversations from the same candidate page as the interview and the score.",
    items: [
      "Chat from the candidate record",
      "Interview and assessment reminders",
      "Broadcasts to a shortlist or a pool",
      "Delivery status on the same thread",
    ],
    stat: "In",
    statLabel: "the same inbox as the hire",
    kind: "tool",
  },
  {
    slug: "pipeline",
    title: "Pipeline",
    kicker: "Hiring desk",
    heading: "One role, every stage on a single board",
    body: "See applicants move from form to interview to assessment to offer — with the score already on the card.",
    items: [
      "Stages you name for the role",
      "Score visible on every card",
      "Pull someone back from the talent pool",
      "Share a board with the hiring manager",
    ],
    stat: "42",
    statLabel: "active on a typical role",
    kind: "tour",
  },
  {
    slug: "candidates",
    title: "Candidates",
    kicker: "Hiring desk",
    heading: "The whole pile, ranked high to low",
    body: "Every person who applied, recorded or sat a test lands on one list — filter by score, role or source.",
    items: [
      "One record per person",
      "Interview, test and CV on the same page",
      "Search by skill, role or tag",
      "Export a shortlist",
    ],
    stat: "128",
    statLabel: "in a typical pool",
    kind: "tour",
  },
  {
    slug: "jobs",
    title: "Jobs",
    kicker: "Hiring desk",
    heading: "Live openings with applicants already landing",
    body: "Each role carries its form, interview, assessment and the people already in flight.",
    items: [
      "A form, interview and test per role",
      "Applicant count as they arrive",
      "Knock-out questions on the form",
      "Close or duplicate a role in one place",
    ],
    stat: "4",
    statLabel: "live roles on a typical desk",
    kind: "tour",
  },
  {
    slug: "offers",
    title: "Offers",
    kicker: "Hiring desk",
    heading: "Offers in flight, on the same record",
    body: "When you are ready to hire, the offer sits next to the interview score and the notes — not in a separate spreadsheet.",
    items: [
      "Draft and send from the candidate page",
      "See who signed and who is waiting",
      "History stays with the person",
    ],
    stat: "3",
    statLabel: "typical offers in flight",
    kind: "tour",
  },
  {
    slug: "people",
    title: "People",
    kicker: "Hiring desk",
    heading: "The same people, now on the team",
    body: "Hired candidates and your own recruiters live in one people directory — scoped to the modules they need.",
    items: [
      "Hired people next to the original score",
      "Recruiters and hiring managers in the same list",
      "Turn access off without losing history",
    ],
    stat: "86",
    statLabel: "people on a typical account",
    kind: "tour",
  },
  {
    slug: "reports",
    title: "Reports",
    kicker: "Hiring desk",
    heading: "Six months of hiring, in one glance",
    body: "Time-to-hire, pass rates and source of hire — export the numbers or push events to your own systems.",
    items: [
      "Time-to-hire by role",
      "Assessment pass rates",
      "Export CSV or webhook events",
      "Share a snapshot with leadership",
    ],
    stat: "62%",
    statLabel: "faster time-to-hire",
    kind: "tour",
  },
  {
    slug: "how-it-works",
    title: "How it works",
    kicker: "Product",
    heading: "From open role to shortlist, without the back-and-forth",
    body: "Build a structured interview, assessment or form, send one link, and let CareerFlix score every response. Your team reviews the ranked results and decides.",
    items: [],
    kind: "section",
    links: [
      { href: "/interviews", title: "One link, not a calendar", body: "Candidates record whenever it suits them." },
      { href: "/scoring", title: "Every response scored", body: "Interviews, tests and CVs get a score and a reason." },
      { href: "/talent-pool", title: "Your team makes the call", body: "Shortlist and keep strong people warm." },
    ],
  },
  {
    slug: "modules",
    title: "Modules",
    kicker: "Product",
    heading: "Eight tools your hiring team already needs",
    body: "Interviews, assessments, job forms, resume tools, talent pool, scheduling and employee management — one login, one candidate record, one bill.",
    items: [],
    kind: "section",
    links: MODULE_LIST,
  },
  {
    slug: "desk",
    title: "Hiring desk",
    kicker: "Product",
    heading: "The same menu after you sign in",
    body: "Every item in the CareerFlix sidebar has its own page. Open any tool to see what it does.",
    items: [],
    kind: "section",
    links: DESK_LINKS.map((item) => ({
      href: item.href,
      title: item.label,
      body: "Open this tool",
    })),
  },
  {
    slug: "features",
    title: "Features",
    kicker: "Product",
    heading: "The layer underneath every module",
    body: "AI scoring, WhatsApp, the talent pool, scheduling, the dashboard and team permissions work the same way across every tool.",
    items: [],
    kind: "section",
    links: [
      { href: FEATURE_HREF[0], title: "AI-assisted scoring", body: "Score and reason on every response." },
      { href: FEATURE_HREF[1], title: "WhatsApp built in", body: "Chat from the candidate record." },
      { href: FEATURE_HREF[2], title: "Talent pool", body: "Reuse people you already like." },
      { href: FEATURE_HREF[3], title: "Team roles", body: "Scope exactly who sees what." },
      { href: FEATURE_HREF[4], title: "Scheduling requests", body: "Reschedules on the same interview." },
      { href: FEATURE_HREF[5], title: "Hiring dashboard", body: "One home for the week." },
    ],
  },
  {
    slug: "pricing",
    title: "Pricing",
    kicker: "Plans",
    heading: "Try the whole platform free for 14 days",
    body: "Pick a plan and every feature on it unlocks immediately. No card, no charge, nothing to cancel.",
    items: [],
    kind: "pricing",
  },
  {
    slug: "demo",
    title: "Book a demo",
    kicker: "Talk to us",
    heading: "See CareerFlix on a role you are hiring for",
    body: "Tell us who you are and we will walk you through interviews, assessments and resume screening in 20 minutes.",
    items: [],
    kind: "form",
  },
];

export const SITE_PAGES: Record<string, SitePage> = Object.fromEntries(
  [...MODULE_PAGES, ...EXTRA].map((page) => [page.slug, page])
);

export const SITE_SLUGS = Object.keys(SITE_PAGES);
