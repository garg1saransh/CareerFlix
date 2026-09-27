import type { ReactNode } from "react";

type Props = {
  id: string;
  n: string;
  kicker: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export function Chapter({ id, n, kicker, title, lead, children }: Props) {
  return (
    <section className="chapter" id={id}>
      <div className="wrap chapter__grid">
        <aside className="chapter__rail" aria-hidden="true">
          <span className="chapter__n">{n}</span>
          <span className="chapter__k">{kicker}</span>
        </aside>
        <div className="chapter__main">
          <h2 className="sec-title">{title}</h2>
          <p className="sec-lead">{lead}</p>
          <div className="chapter__slot">{children}</div>
        </div>
      </div>
    </section>
  );
}
