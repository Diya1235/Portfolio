import { useState } from "react";
import Section from "./Section.jsx";
import { projects } from "../data/portfolio.js";

const FILTERS = [
  ["all", "all"],
  ["shipped", "shipped"],
  ["in-progress", "in progress"],
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const list = projects.filter((p) => filter === "all" || p.status === filter);

  return (
    <Section id="projects" command="ls -la ~/projects" title="Projects">
      <div className="filters" role="tablist">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={filter === key}
            className={`filter ${filter === key ? "is-active" : ""}`}
            onClick={() => setFilter(key)}
          >
            --{label.replace(" ", "-")}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {list.map((p) => (
          <article key={p.name} className="panel project-card reveal">
            <div className="project-top">
              <span className="project-icon" aria-hidden="true">📁</span>
              <span className={`badge ${p.status === "shipped" ? "badge--ok" : "badge--wip"}`}>
                {p.status === "shipped" ? "✔ shipped" : "🚧 in progress"}
              </span>
            </div>
            <h3 className="project-name">{p.name}</h3>
            <p className="project-desc">{p.description}</p>
            {p.devops && (
              <p className="project-devops">
                <span className="c-cyan">⚙ devops:</span> {p.devops}
              </p>
            )}
            <ul className="tags">
              {p.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {(p.repo || p.live) && (
              <div className="project-links">
                {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">source ↗</a>}
                {p.live && <a href={p.live} target="_blank" rel="noreferrer">live ↗</a>}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
