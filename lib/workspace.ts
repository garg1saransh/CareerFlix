export const HIRING_STATS = [
  { n: "12", l: "Interviews in review" },
  { n: "3", l: "Scheduling requests" },
  { n: "8", l: "Warm in the pool" },
  { n: "4", l: "Live job forms" },
];

export const HIRING_ROWS = [
  { av: "LC", name: "Lian Chen", meta: "Product Designer · Interview", tag: "In review", score: "94" },
  { av: "EV", name: "Elena Vargas", meta: "Senior Designer · Assessment", tag: "Passed", score: "96" },
  { av: "MH", name: "Maya Haddad", meta: "Ops · Scheduling", tag: "Needs you", score: "—" },
  { av: "DN", name: "Dami Nwosu", meta: "Product Designer · Resume", tag: "Warm", score: "88" },
];

export const TOOL_BOARDS: Record<string, { title: string; lead: string; rows: typeof HIRING_ROWS }> = {
  interviews: {
    title: "All Interviews",
    lead: "Recorded answers and team scores on one list.",
    rows: [
      { av: "LC", name: "Lian Chen", meta: "Product Designer · Q2 of 4", tag: "In review", score: "94" },
      { av: "EV", name: "Elena Vargas", meta: "Design · Complete", tag: "Scored", score: "96" },
      { av: "MH", name: "Maya Haddad", meta: "Ops · Invited", tag: "Waiting", score: "—" },
    ],
  },
  "talent-pool": {
    title: "Talent Pool",
    lead: "People you already like, ready for the next opening.",
    rows: [
      { av: "TM", name: "Théo Moreau", meta: "Product · Kept warm", tag: "Ready", score: "91" },
      { av: "RK", name: "Rupinder Kaur", meta: "Design · Kept warm", tag: "Warm", score: "89" },
      { av: "AS", name: "Ana Silva", meta: "Marketing · Kept warm", tag: "Warm", score: "86" },
    ],
  },
  scheduling: {
    title: "Scheduling Requests",
    lead: "Reschedules land on the same interview record.",
    rows: [
      { av: "LC", name: "Lian Chen", meta: "Asked for a new slot", tag: "Waiting", score: "—" },
      { av: "EV", name: "Elena Vargas", meta: "Needs approval", tag: "Needs you", score: "—" },
      { av: "MH", name: "Maya Haddad", meta: "Reminder sent", tag: "Sent", score: "—" },
    ],
  },
  assessments: {
    title: "Assessments",
    lead: "Role tests, scored automatically.",
    rows: [
      { av: "EV", name: "Elena Vargas", meta: "Design craft", tag: "Pass", score: "96" },
      { av: "LC", name: "Lian Chen", meta: "Systems", tag: "Pass", score: "91" },
      { av: "DN", name: "Dami Nwosu", meta: "Judgement", tag: "Pass", score: "88" },
    ],
  },
  "job-forms": {
    title: "Job Forms",
    lead: "Applications for live roles.",
    rows: [
      { av: "JF", name: "Product Designer", meta: "12 new today", tag: "Live", score: "—" },
      { av: "BE", name: "Backend Engineer", meta: "8 new today", tag: "Live", score: "—" },
      { av: "CS", name: "Customer Success Lead", meta: "3 new today", tag: "Live", score: "—" },
    ],
  },
  employees: {
    title: "Employee Management",
    lead: "Your team, scoped to the modules they need.",
    rows: [
      { av: "DN", name: "Dami Nwosu", meta: "Admin · All modules", tag: "Owner", score: "—" },
      { av: "EV", name: "Elena Vargas", meta: "Recruiter", tag: "Recruiter", score: "—" },
      { av: "TM", name: "Théo Moreau", meta: "Hiring manager", tag: "Manager", score: "—" },
    ],
  },
  analyser: {
    title: "Bulk Resume Analyser",
    lead: "The last batch, ranked against the role.",
    rows: [
      { av: "EV", name: "Elena Vargas", meta: "Batch of 50", tag: "96", score: "96" },
      { av: "LC", name: "Lian Chen", meta: "Batch of 50", tag: "94", score: "94" },
      { av: "DN", name: "Dami Nwosu", meta: "Batch of 50", tag: "88", score: "88" },
    ],
  },
  editor: {
    title: "Bulk Resume Editor",
    lead: "CVs cleaned into your template.",
    rows: [
      { av: "01", name: "Raw PDF pack", meta: "12 files", tag: "Imported", score: "—" },
      { av: "02", name: "Brand template", meta: "Applied", tag: "Ready", score: "—" },
      { av: "03", name: "Share links", meta: "3 sent", tag: "Export", score: "—" },
    ],
  },
  settings: {
    title: "Settings",
    lead: "Brand, access and notifications for this account.",
    rows: [
      { av: "BR", name: "Brand kit", meta: "Colours and templates", tag: "On", score: "—" },
      { av: "TM", name: "Team roles", meta: "Scoped modules", tag: "On", score: "—" },
      { av: "NT", name: "Alerts", meta: "Email and WhatsApp", tag: "On", score: "—" },
    ],
  },
  support: {
    title: "Contact Support",
    lead: "A person when you need a walkthrough.",
    rows: [
      { av: "DM", name: "Book a walkthrough", meta: "20 minutes", tag: "Demo", score: "—" },
      { av: "EM", name: "Email the desk", meta: "support@careerflix.com", tag: "Open", score: "—" },
      { av: "14", name: "Trial help", meta: "Every module", tag: "Live", score: "—" },
    ],
  },
};

export const CANDIDATE_APPS = [
  { av: "PD", name: "Product Designer", meta: "Northwind · Interview invited", tag: "Active", score: "—" },
  { av: "BE", name: "Backend Engineer", meta: "Helio · Assessment passed", tag: "Passed", score: "91" },
  { av: "CS", name: "Customer Success", meta: "Orchard · Form submitted", tag: "In review", score: "—" },
];

export const CANDIDATE_INTERVIEWS = [
  { av: "Q1", name: "Tell us about yourself", meta: "Product Designer · 60s", tag: "Done", score: "—" },
  { av: "Q2", name: "A product you shipped", meta: "Product Designer · 60s", tag: "Open", score: "—" },
  { av: "Q3", name: "How you handle disagreement", meta: "Product Designer · 45s", tag: "Locked", score: "—" },
];

export const APP_TOOLS = [
  "interviews",
  "talent-pool",
  "scheduling",
  "assessments",
  "job-forms",
  "employees",
  "analyser",
  "editor",
  "settings",
  "support",
] as const;

export const CANDIDATE_SECTIONS = ["interviews", "applications", "jobs", "settings"] as const;
