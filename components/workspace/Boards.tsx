import Link from "next/link";
import { HIRING_ROWS, HIRING_STATS } from "@/lib/workspace";
import type { Session } from "@/lib/session";
import { initials } from "@/lib/session";

export function EmployerHome({ session }: { session: Session }) {
  const first = session.name.split(" ")[0];
  return (
    <>
      <section className="ws__hero">
        <div>
          <p>Signed in as {session.name}</p>
          <h2>Welcome back, {first}.</h2>
          <span>This is your hiring workspace — interviews, the talent pool and scheduling sit on this desk.</span>
        </div>
        <Link href="/app/interviews" className="btn btn--primary">Open interviews</Link>
      </section>
      <div className="ws__stats">
        {HIRING_STATS.map((item) => (
          <div className="ws__stat" key={item.l}>
            <b>{item.n}</b>
            <small>{item.l}</small>
          </div>
        ))}
      </div>
      <section className="ws__panel">
        <div className="ws__panelh">
          <h3>Live on your desk</h3>
          <Link href="/app/talent-pool">Open talent pool</Link>
        </div>
        <ul className="ws__list">
          {HIRING_ROWS.map((row) => (
            <li key={row.name}>
              <span className="ws__av">{row.av}</span>
              <span>
                <b>{row.name}</b>
                <small>{row.meta}</small>
              </span>
              <em>{row.tag}</em>
              <strong>{row.score}</strong>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function RecordList({
  title,
  lead,
  rows,
}: {
  title: string;
  lead: string;
  rows: typeof HIRING_ROWS;
}) {
  return (
    <section className="ws__panel">
      <div className="ws__panelh">
        <div>
          <h3>{title}</h3>
          <p>{lead}</p>
        </div>
      </div>
      <ul className="ws__list">
        {rows.map((row) => (
          <li key={row.name}>
            <span className="ws__av">{row.av}</span>
            <span>
              <b>{row.name}</b>
              <small>{row.meta}</small>
            </span>
            <em>{row.tag}</em>
            <strong>{row.score}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CandidateHome({ session }: { session: Session }) {
  const first = session.name.split(" ")[0];
  return (
    <>
      <section className="ws__hero">
        <div className="ws__profile">
          <span className="ws__av ws__av--lg">{initials(session.name)}</span>
          <div>
            <p>Your CareerFlix profile</p>
            <h2>{session.name}</h2>
            <span>{session.email}</span>
          </div>
        </div>
        <Link href="/profile/interviews" className="btn btn--primary">Continue interview</Link>
      </section>
      <p className="ws__lead">Welcome back, {first}. Applications, interviews and invites stay on this profile.</p>
    </>
  );
}
