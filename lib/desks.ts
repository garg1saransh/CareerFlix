export type DeskStat = { n: number; l: string; fill: string };

export type DeskRow = {
  av: string;
  bg: string;
  name: string;
  meta: string;
  tag: string;
  score: string;
  note: string;
};

export type DeskLane = { href: string; n: string; title: string; hint: string };

export type DeskCopy = {
  kicker: string;
  title: string;
  headline: string;
  lead: string;
  cta: { href: string; label: string };
  next: { href: string; label: string };
  ring: { value: string; label: string };
  stats: DeskStat[];
  rows: DeskRow[];
  lanes: DeskLane[];
  mode?: "review" | "apply" | "toggles";
};

export const EMPLOYER_DESKS: Record<string, DeskCopy> = {
  interviews: {
    kicker: "Live interviews",
    title: "All Interviews",
    headline: "Twelve still wait on a score.",
    lead: "Recorded answers and team scores sit on the same record. Play, mark, then move them on.",
    cta: { href: "/app/talent-pool", label: "Move to the pool" },
    next: { href: "/app/scheduling", label: "Open requests" },
    ring: { value: "12", label: "in review" },
    stats: [
      { n: 12, l: "Waiting on a score", fill: "78%" },
      { n: 2, l: "Already scored", fill: "36%" },
      { n: 1, l: "Invite still open", fill: "22%" },
      { n: 4, l: "Questions on the loop", fill: "55%" },
    ],
    rows: [
      { av: "LC", bg: "var(--sky)", name: "Lian Chen", meta: "Product Designer · Q2 of 4", tag: "In review", score: "94", note: "Strong communication — recommended to shortlist after Q3." },
      { av: "EV", bg: "var(--peach)", name: "Elena Vargas", meta: "Design · Complete", tag: "Scored", score: "96", note: "Cleared every section. Ready for the hiring manager." },
      { av: "MH", bg: "var(--peri)", name: "Maya Haddad", meta: "Ops · Invited", tag: "Waiting", score: "—", note: "Invite sent. The first clip is not in yet." },
    ],
    lanes: [
      { href: "/app/scheduling", n: "01", title: "Scheduling", hint: "3 requests still open" },
      { href: "/app/assessments", n: "02", title: "Assessments", hint: "Craft scores on the same person" },
      { href: "/app/talent-pool", n: "03", title: "Talent pool", hint: "Keep the ones you already like" },
    ],
  },
  "talent-pool": {
    kicker: "Warm list",
    title: "Talent Pool",
    headline: "Eight people kept warm.",
    lead: "People you already like, ready for the next opening. No second form when a role goes live.",
    cta: { href: "/app/job-forms", label: "Match a live role" },
    next: { href: "/app/interviews", label: "Back to interviews" },
    ring: { value: "8", label: "warm" },
    stats: [
      { n: 8, l: "Kept warm", fill: "64%" },
      { n: 3, l: "Ready this week", fill: "48%" },
      { n: 2, l: "Design craft", fill: "40%" },
      { n: 1, l: "Product", fill: "28%" },
    ],
    rows: [
      { av: "TM", bg: "var(--sky)", name: "Théo Moreau", meta: "Product · Kept warm", tag: "Ready", score: "91", note: "Held from the last opening. Happy to re-enter on a ping." },
      { av: "RK", bg: "var(--peach)", name: "Rupinder Kaur", meta: "Design · Kept warm", tag: "Warm", score: "89", note: "Strong systems work. Wait for the next designer seat." },
      { av: "AS", bg: "var(--peri)", name: "Ana Silva", meta: "Marketing · Kept warm", tag: "Warm", score: "86", note: "Scored well on judgement. Keep for a brand role." },
    ],
    lanes: [
      { href: "/app/interviews", n: "01", title: "Interviews", hint: "Replay the clips you already like" },
      { href: "/app/job-forms", n: "02", title: "Job forms", hint: "Drop them onto a live role" },
      { href: "/app/analyser", n: "03", title: "Analyser", hint: "Rank a new batch against this list" },
    ],
  },
  scheduling: {
    kicker: "Needs you",
    title: "Scheduling Requests",
    headline: "Three requests still open.",
    lead: "Reschedules land on the same interview record. Approve a slot without starting over.",
    cta: { href: "/app/interviews", label: "Open the interview" },
    next: { href: "/app/talent-pool", label: "Talent pool" },
    ring: { value: "3", label: "open" },
    stats: [
      { n: 3, l: "Still open", fill: "42%" },
      { n: 1, l: "Needs you", fill: "30%" },
      { n: 1, l: "Waiting on them", fill: "28%" },
      { n: 1, l: "Reminder sent", fill: "24%" },
    ],
    rows: [
      { av: "LC", bg: "var(--sky)", name: "Lian Chen", meta: "Asked for a new slot", tag: "Waiting", score: "—", note: "Offered two times. Waiting for Lian to pick one." },
      { av: "EV", bg: "var(--peach)", name: "Elena Vargas", meta: "Needs approval", tag: "Needs you", score: "—", note: "Asked to move Thursday. Approve to keep the same record." },
      { av: "MH", bg: "var(--peri)", name: "Maya Haddad", meta: "Reminder sent", tag: "Sent", score: "—", note: "No reply yet. The reminder sits on the invite." },
    ],
    lanes: [
      { href: "/app/interviews", n: "01", title: "Interviews", hint: "The clip stays on this person" },
      { href: "/app/employees", n: "02", title: "Your team", hint: "Who can approve a slot" },
      { href: "/app/settings", n: "03", title: "Alerts", hint: "Email and WhatsApp on the same record" },
    ],
  },
  assessments: {
    kicker: "Auto scored",
    title: "Assessments",
    headline: "Every section already marked.",
    lead: "Role tests, scored automatically. Pass marks land next to the interview, not in another tool.",
    cta: { href: "/app/interviews", label: "See the interview" },
    next: { href: "/app/analyser", label: "Resume batch" },
    ring: { value: "3", label: "pass" },
    stats: [
      { n: 3, l: "Above the mark", fill: "82%" },
      { n: 96, l: "Top score", fill: "96%" },
      { n: 1, l: "Craft", fill: "50%" },
      { n: 1, l: "Systems", fill: "46%" },
    ],
    rows: [
      { av: "EV", bg: "var(--peach)", name: "Elena Vargas", meta: "Design craft", tag: "Pass", score: "96", note: "Cleared every section above the pass mark." },
      { av: "LC", bg: "var(--sky)", name: "Lian Chen", meta: "Systems", tag: "Pass", score: "91", note: "Solid on flows. Pair with the interview score." },
      { av: "DN", bg: "var(--peri)", name: "Dami Nwosu", meta: "Judgement", tag: "Pass", score: "88", note: "Clean calls. Ready if a role opens this month." },
    ],
    lanes: [
      { href: "/app/interviews", n: "01", title: "Interviews", hint: "Play the clip beside the score" },
      { href: "/app/job-forms", n: "02", title: "Job forms", hint: "The test belongs to a live role" },
      { href: "/app/talent-pool", n: "03", title: "Talent pool", hint: "Keep a pass for later" },
    ],
  },
  "job-forms": {
    kicker: "Live roles",
    title: "Job Forms",
    headline: "Four roles taking answers.",
    lead: "Applications for live roles. Each form already knows the interview, the test and the score.",
    cta: { href: "/app/analyser", label: "Rank a batch" },
    next: { href: "/app/editor", label: "Clean CVs" },
    ring: { value: "4", label: "live" },
    stats: [
      { n: 4, l: "Forms live", fill: "55%" },
      { n: 12, l: "New today", fill: "70%" },
      { n: 8, l: "Backend pack", fill: "52%" },
      { n: 3, l: "Success lead", fill: "28%" },
    ],
    rows: [
      { av: "PD", bg: "var(--sky)", name: "Product Designer", meta: "12 new today", tag: "Live", score: "—", note: "Interview loop of four questions is already attached." },
      { av: "BE", bg: "var(--peach)", name: "Backend Engineer", meta: "8 new today", tag: "Live", score: "—", note: "Assessment and analyser sit on this form." },
      { av: "CS", bg: "var(--peri)", name: "Customer Success Lead", meta: "3 new today", tag: "Live", score: "—", note: "Shorter loop. Scores land on the same record." },
    ],
    lanes: [
      { href: "/app/analyser", n: "01", title: "Analyser", hint: "Rank the new PDFs against the role" },
      { href: "/app/interviews", n: "02", title: "Interviews", hint: "Invites fire from this form" },
      { href: "/app/employees", n: "03", title: "Team access", hint: "Who can see each role" },
    ],
  },
  employees: {
    kicker: "Your team",
    title: "Employee Management",
    headline: "Scoped to the modules they need.",
    lead: "Hiring managers see interviews. Recruiters see the pool. Nobody gets a second login for each tool.",
    cta: { href: "/app/settings", label: "Open access" },
    next: { href: "/app/support", label: "Ask the desk" },
    ring: { value: "3", label: "people" },
    stats: [
      { n: 3, l: "On this account", fill: "50%" },
      { n: 1, l: "Owner", fill: "33%" },
      { n: 1, l: "Recruiter", fill: "33%" },
      { n: 1, l: "Manager", fill: "33%" },
    ],
    rows: [
      { av: "DN", bg: "var(--peri)", name: "Dami Nwosu", meta: "Admin · All modules", tag: "Owner", score: "—", note: "Sees every board. Can invite the rest of the team." },
      { av: "EV", bg: "var(--peach)", name: "Elena Vargas", meta: "Recruiter", tag: "Recruiter", score: "—", note: "Pool, analyser and scheduling. No billing." },
      { av: "TM", bg: "var(--sky)", name: "Théo Moreau", meta: "Hiring manager", tag: "Manager", score: "—", note: "Interviews and assessments for the roles they own." },
    ],
    lanes: [
      { href: "/app/settings", n: "01", title: "Settings", hint: "Brand and alerts for the account" },
      { href: "/app/job-forms", n: "02", title: "Job forms", hint: "Who can publish a role" },
      { href: "/app/support", n: "03", title: "Support", hint: "A walkthrough for a new seat" },
    ],
  },
  analyser: {
    kicker: "Last batch",
    title: "Bulk Resume Analyser",
    headline: "Fifty files, already ranked.",
    lead: "The last batch, scored against the role. Shortlist without opening every PDF.",
    cta: { href: "/app/editor", label: "Clean the CVs" },
    next: { href: "/app/talent-pool", label: "Keep the top" },
    ring: { value: "50", label: "files" },
    stats: [
      { n: 50, l: "In the batch", fill: "88%" },
      { n: 96, l: "Top rank", fill: "96%" },
      { n: 3, l: "Above 90", fill: "40%" },
      { n: 12, l: "Moved on", fill: "32%" },
    ],
    rows: [
      { av: "EV", bg: "var(--peach)", name: "Elena Vargas", meta: "Batch of 50", tag: "96", score: "96", note: "Best match to the designer role. Move to interview." },
      { av: "LC", bg: "var(--sky)", name: "Lian Chen", meta: "Batch of 50", tag: "94", score: "94", note: "Close second. Keep beside Elena on the same form." },
      { av: "DN", bg: "var(--peri)", name: "Dami Nwosu", meta: "Batch of 50", tag: "88", score: "88", note: "Strong, not the lead. Fine for the pool." },
    ],
    lanes: [
      { href: "/app/editor", n: "01", title: "Editor", hint: "Drop the top three into your template" },
      { href: "/app/interviews", n: "02", title: "Interviews", hint: "Invite without a second form" },
      { href: "/app/job-forms", n: "03", title: "Job forms", hint: "This batch belongs to a live role" },
    ],
  },
  editor: {
    kicker: "Brand template",
    title: "Bulk Resume Editor",
    headline: "Twelve files, one template.",
    lead: "CVs cleaned into your look. Share a pack that already matches the role.",
    cta: { href: "/app/analyser", label: "Re-rank the pack" },
    next: { href: "/app/job-forms", label: "Back to the role" },
    ring: { value: "12", label: "files" },
    stats: [
      { n: 12, l: "Imported", fill: "70%" },
      { n: 1, l: "Template on", fill: "100%" },
      { n: 3, l: "Share links", fill: "38%" },
      { n: 9, l: "Still in draft", fill: "54%" },
    ],
    rows: [
      { av: "01", bg: "var(--sky)", name: "Raw PDF pack", meta: "12 files", tag: "Imported", score: "—", note: "Dropped in this morning. Names already parsed." },
      { av: "02", bg: "var(--peach)", name: "Brand template", meta: "Applied", tag: "Ready", score: "—", note: "Type, colour and order match the CareerFlix kit." },
      { av: "03", bg: "var(--peri)", name: "Share links", meta: "3 sent", tag: "Export", score: "—", note: "Hiring manager has the top three as a pack." },
    ],
    lanes: [
      { href: "/app/analyser", n: "01", title: "Analyser", hint: "Rank before you share" },
      { href: "/app/settings", n: "02", title: "Brand kit", hint: "Colours and templates" },
      { href: "/app/employees", n: "03", title: "Who can export", hint: "Scoped to this module" },
    ],
  },
  settings: {
    kicker: "This account",
    title: "Settings",
    headline: "Brand, access and alerts.",
    lead: "Colours, who can see each module, and how people get a reminder on the same record.",
    cta: { href: "/app/employees", label: "Manage the team" },
    next: { href: "/app/support", label: "Contact support" },
    ring: { value: "3", label: "on" },
    stats: [
      { n: 3, l: "Switches on", fill: "75%" },
      { n: 1, l: "Brand kit", fill: "100%" },
      { n: 1, l: "Team roles", fill: "100%" },
      { n: 1, l: "Alerts", fill: "100%" },
    ],
    rows: [
      { av: "BR", bg: "var(--peach)", name: "Brand kit", meta: "Colours and templates", tag: "On", score: "—", note: "The lighter purple and templates used on every export." },
      { av: "TM", bg: "var(--sky)", name: "Team roles", meta: "Scoped modules", tag: "On", score: "—", note: "Recruiters, managers and an owner. No extra logins." },
      { av: "NT", bg: "var(--peri)", name: "Alerts", meta: "Email and WhatsApp", tag: "On", score: "—", note: "A ping when a clip lands or a slot needs you." },
    ],
    lanes: [
      { href: "/app/employees", n: "01", title: "Team", hint: "Who these switches apply to" },
      { href: "/app/editor", n: "02", title: "Templates", hint: "The brand kit on a CV pack" },
      { href: "/app/support", n: "03", title: "Support", hint: "A person for a walkthrough" },
    ],
    mode: "toggles",
  },
  support: {
    kicker: "A person",
    title: "Contact Support",
    headline: "Twenty minutes when you need it.",
    lead: "A walkthrough of the desk you are on. Trial help covers every module, not a ticket queue.",
    cta: { href: "/app", label: "Back to the desk" },
    next: { href: "/app/settings", label: "Account settings" },
    ring: { value: "20", label: "min" },
    stats: [
      { n: 20, l: "Minute walkthrough", fill: "60%" },
      { n: 1, l: "Desk email", fill: "40%" },
      { n: 14, l: "Day trial help", fill: "48%" },
      { n: 8, l: "Modules covered", fill: "80%" },
    ],
    rows: [
      { av: "DM", bg: "var(--sky)", name: "Book a walkthrough", meta: "20 minutes", tag: "Demo", score: "—", note: "A person on the board you are stuck on." },
      { av: "EM", bg: "var(--peach)", name: "Email the desk", meta: "support@careerflix.com", tag: "Open", score: "—", note: "Same thread if a clip or a slot misbehaves." },
      { av: "14", bg: "var(--peri)", name: "Trial help", meta: "Every module", tag: "Live", score: "—", note: "Interviews, pool, analyser, editor — the lot." },
    ],
    lanes: [
      { href: "/app", n: "01", title: "Dashboard", hint: "Return to the live desk" },
      { href: "/app/settings", n: "02", title: "Settings", hint: "Brand and alerts first" },
      { href: "/app/employees", n: "03", title: "Team", hint: "Invite someone before the call" },
    ],
  },
};

export const CANDIDATE_DESKS: Record<string, DeskCopy> = {
  interviews: {
    kicker: "Your clips",
    title: "Your interviews",
    headline: "Question 02 is waiting.",
    lead: "Record one clip at a time. The score lands on the same interview, not a new form.",
    cta: { href: "/profile/applications", label: "See applications" },
    next: { href: "/profile/jobs", label: "Open roles" },
    ring: { value: "02", label: "open" },
    stats: [
      { n: 1, l: "Clip still open", fill: "48%" },
      { n: 1, l: "Already in", fill: "40%" },
      { n: 1, l: "Locked", fill: "33%" },
      { n: 60, l: "Seconds on Q2", fill: "60%" },
    ],
    rows: [
      { av: "Q1", bg: "var(--sky)", name: "Tell us about yourself", meta: "Product Designer · 60s", tag: "Done", score: "—", note: "Already on file. You can re-record before they review." },
      { av: "Q2", bg: "var(--peach)", name: "A product you shipped", meta: "Product Designer · 60s", tag: "Open", score: "—", note: "Record one clip. The score lands on the same interview." },
      { av: "Q3", bg: "var(--peri)", name: "How you handle disagreement", meta: "Product Designer · 45s", tag: "Locked", score: "—", note: "Unlocks after question 02 is in." },
    ],
    lanes: [
      { href: "/profile/applications", n: "01", title: "Applications", hint: "This loop belongs to Product Designer" },
      { href: "/profile/jobs", n: "02", title: "Jobs", hint: "Enter another role from here" },
      { href: "/profile/settings", n: "03", title: "Alerts", hint: "Know when the next question unlocks" },
    ],
  },
  applications: {
    kicker: "In play",
    title: "Applications",
    headline: "Three roles still on this profile.",
    lead: "Every role you have entered. Interviews, tests and invites stay on the same person.",
    cta: { href: "/profile/interviews", label: "Continue interview" },
    next: { href: "/profile/jobs", label: "Find another role" },
    ring: { value: "3", label: "roles" },
    stats: [
      { n: 3, l: "Roles in play", fill: "72%" },
      { n: 1, l: "Interview invited", fill: "40%" },
      { n: 1, l: "Assessment passed", fill: "44%" },
      { n: 91, l: "Best score", fill: "91%" },
    ],
    rows: [
      { av: "PD", bg: "var(--sky)", name: "Product Designer", meta: "Northwind · Interview invited", tag: "Active", score: "—", note: "Question 02 is open on this role." },
      { av: "BE", bg: "var(--peach)", name: "Backend Engineer", meta: "Helio · Assessment passed", tag: "Passed", score: "91", note: "The test is in. Waiting on their next step." },
      { av: "CS", bg: "var(--peri)", name: "Customer Success", meta: "Orchard · Form submitted", tag: "In review", score: "—", note: "The form is with them. No clip asked for yet." },
    ],
    lanes: [
      { href: "/profile/interviews", n: "01", title: "Interviews", hint: "Finish the open clip" },
      { href: "/profile/jobs", n: "02", title: "Jobs", hint: "Roles you have not entered" },
      { href: "/profile/settings", n: "03", title: "Profile", hint: "The name teams see" },
    ],
  },
  jobs: {
    kicker: "Open now",
    title: "Open jobs",
    headline: "Roles you can still enter.",
    lead: "A form, then an interview on the same profile. No second signup for each company.",
    cta: { href: "/profile/applications", label: "Your applications" },
    next: { href: "/profile/interviews", label: "Your interviews" },
    ring: { value: "3", label: "open" },
    stats: [
      { n: 3, l: "Roles open", fill: "55%" },
      { n: 1, l: "Remote", fill: "33%" },
      { n: 1, l: "Hybrid", fill: "33%" },
      { n: 1, l: "Contract", fill: "33%" },
    ],
    rows: [
      { av: "PD", bg: "var(--sky)", name: "Product Designer", meta: "Northwind · Remote", tag: "Apply", score: "—", note: "Four questions after the form. You already know the first two." },
      { av: "BE", bg: "var(--peach)", name: "Backend Engineer", meta: "Helio · Hybrid", tag: "Apply", score: "—", note: "A scored test sits on this role before the clip." },
      { av: "DA", bg: "var(--peri)", name: "Data Analyst", meta: "Orchard · Contract", tag: "Apply", score: "—", note: "Shorter form. The invite lands on this profile." },
    ],
    lanes: [
      { href: "/profile/applications", n: "01", title: "Applications", hint: "Roles you already entered" },
      { href: "/profile/interviews", n: "02", title: "Interviews", hint: "Clips waiting on you" },
      { href: "/profile/settings", n: "03", title: "How they reach you", hint: "Email and WhatsApp" },
    ],
    mode: "apply",
  },
  settings: {
    kicker: "This profile",
    title: "Profile settings",
    headline: "Name, email and how teams reach you.",
    lead: "What hiring teams see, and whether a reminder lands on email or WhatsApp.",
    cta: { href: "/profile", label: "Back to profile" },
    next: { href: "/profile/interviews", label: "Your interviews" },
    ring: { value: "2", label: "on" },
    stats: [
      { n: 2, l: "Alerts on", fill: "66%" },
      { n: 1, l: "Display name", fill: "100%" },
      { n: 1, l: "Email alerts", fill: "100%" },
      { n: 0, l: "WhatsApp", fill: "12%" },
    ],
    rows: [
      { av: "NM", bg: "var(--sky)", name: "Display name", meta: "Shown to hiring teams", tag: "On", score: "—", note: "The name on every interview and application." },
      { av: "EM", bg: "var(--peach)", name: "Email alerts", meta: "Interview invites", tag: "On", score: "—", note: "A mail when a question unlocks or a team replies." },
      { av: "PH", bg: "var(--peri)", name: "WhatsApp", meta: "Reminders on the same record", tag: "Off", score: "—", note: "Optional. The invite still lives on this profile." },
    ],
    lanes: [
      { href: "/profile", n: "01", title: "Profile", hint: "The live desk for this account" },
      { href: "/profile/applications", n: "02", title: "Applications", hint: "Roles using this name" },
      { href: "/profile/interviews", n: "03", title: "Interviews", hint: "Where the next reminder points" },
    ],
    mode: "toggles",
  },
};
