import Link from "next/link";
import {
  IconAnalyser,
  IconAssessment,
  IconDash,
  IconEditor,
  IconForms,
  IconGear,
  IconHelp,
  IconInterview,
  IconPeople,
  IconPool,
  IconSchedule,
} from "@/lib/icons";
import { DESK_LINKS } from "@/lib/paths";

const ICONS = {
  dash: IconDash,
  interviews: IconInterview,
  pool: IconPool,
  schedule: IconSchedule,
  assessments: IconAssessment,
  forms: IconForms,
  people: IconPeople,
  analyser: IconAnalyser,
  editor: IconEditor,
  settings: IconGear,
  support: IconHelp,
} as const;

const SLUG_ON: Record<string, string> = {
  dashboard: "dash",
  interviews: "interviews",
  "talent-pool": "pool",
  scheduling: "schedule",
  assessments: "assessments",
  "job-forms": "forms",
  employees: "people",
  analyser: "analyser",
  editor: "editor",
  settings: "settings",
  support: "support",
  people: "people",
};

type Props = {
  current?: string;
};

export function DeskNav({ current }: Props) {
  const on = SLUG_ON[current ?? ""] ?? current;
  const top = DESK_LINKS.filter((item) => !("child" in item && item.child));
  const kids = DESK_LINKS.filter((item) => "child" in item && item.child);

  return (
    <aside className="desk__side leaf__side" aria-label="CareerFlix product menu">
      <div className="desk__brand">
        <span className="desk__mark" aria-hidden="true" />
        <b>CareerFlix</b>
      </div>
      <nav className="desk__nav">
        {top.map((row) => {
          const Ico = ICONS[row.id];
          if (row.id === "interviews") {
            return (
              <div key={row.id}>
                <Link
                  href={row.href}
                  className={`desk__item${on === row.id ? " is-on" : ""}`}
                  aria-current={on === row.id ? "page" : undefined}
                >
                  <Ico />
                  <span>{row.label}</span>
                </Link>
                <div className="desk__group">
                  <Link
                    href="/talent-pool"
                    className={`desk__item desk__item--parent${on === "pool" || on === "schedule" ? " is-open" : ""}`}
                  >
                    <IconPool />
                    <span>Talent Pool</span>
                  </Link>
                  {kids.map((kid) => {
                    const KidIco = ICONS[kid.id];
                    return (
                      <Link
                        key={kid.id}
                        href={kid.href}
                        className={`desk__item desk__item--child${on === kid.id ? " is-on" : ""}`}
                        aria-current={on === kid.id ? "page" : undefined}
                      >
                        <KidIco />
                        <span>{kid.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <Link
              key={row.id}
              href={row.href}
              className={`desk__item${on === row.id ? " is-on" : ""}`}
              aria-current={on === row.id ? "page" : undefined}
            >
              <Ico />
              <span>{row.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
