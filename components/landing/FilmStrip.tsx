import { MARQUEE_ITEMS } from "@/lib/data";

export function FilmStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="film" aria-label="Hiring tools included">
      <div className="film__perf" aria-hidden="true" />
      <div className="wrap">
        <p className="film__label">Everything a hiring team needs, in one account</p>
      </div>
      <div className="film__window">
        <div className="marquee">
          <div className="marquee__track" id="marquee">
            {items.map((item, i) => (
              <span className="marquee__item" key={`${item}-${i}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="film__perf" aria-hidden="true" />
    </section>
  );
}
