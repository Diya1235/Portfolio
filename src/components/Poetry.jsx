import { useState } from "react";
import Section from "./Section.jsx";
import { poems } from "../data/portfolio.js";

export default function Poetry() {
  const [i, setI] = useState(0);
  const poem = poems[i];

  return (
    <Section id="poetry" command="less ~/thoughts/*.txt" title="Poems & Thoughts ✍️">
      <p className="section-sub">Code is logic. Words are everything else. A few lines I've written:</p>
      <div className="poem-wrap">
        <article key={i} className="panel poem-card">
          <p className="panel-label">
            thought_{String(i + 1).padStart(2, "0")}.txt
          </p>
          <h3 className="poem-title">{poem.title}</h3>
          <div className="poem-body">
            {poem.lines.map((l, k) => (
              <p key={k}>{l}</p>
            ))}
          </div>
        </article>
        {poems.length > 1 && (
          <div className="poem-nav">
            <button className="btn btn--small" onClick={() => setI((i - 1 + poems.length) % poems.length)}>
              ← prev
            </button>
            <span className="c-muted">
              {i + 1} / {poems.length}
            </span>
            <button className="btn btn--small" onClick={() => setI((i + 1) % poems.length)}>
              next →
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
