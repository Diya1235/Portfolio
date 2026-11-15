import { useEffect, useState } from "react";
import Section from "./Section.jsx";
import { experience } from "../data/portfolio.js";
import { useInView, prefersReducedMotion } from "../hooks/useInView.js";

/** Career shown as a CI/CD pipeline: stages turn green one by one when scrolled into view. */
export default function Experience() {
  const [ref, inView] = useInView(0.2);
  const [done, setDone] = useState(-1); // index of last completed stage

  useEffect(() => {
    if (!inView) return;
    const finishable = experience.filter((e) => !e.running).length;
    if (prefersReducedMotion()) {
      setDone(finishable - 1);
      return;
    }
    const timers = Array.from({ length: finishable }, (_, i) =>
      setTimeout(() => setDone(i), 900 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const stateOf = (e, i) => {
    if (i <= done) return "success";
    if (i === done + 1 && inView) return "running";
    return "pending";
  };

  const icon = { success: "✔", running: "◌", pending: "○" };

  return (
    <Section id="experience" command="gh run watch diya-career" title="Experience Pipeline">
      <div className="pipeline-head panel">
        <span>
          <span className="c-muted">workflow:</span> career.yml
        </span>
        <span>
          <span className="c-muted">branch:</span> main
        </span>
        <span>
          <span className="c-muted">status:</span>{" "}
          <span className="c-yellow">◌ in progress — next stage: DevOps</span>
        </span>
      </div>
      <ol ref={ref} className="pipeline">
        {experience.map((e, i) => {
          const s = stateOf(e, i);
          return (
            <li key={e.title} className={`stage stage--${s}`}>
              <div className="stage-node" aria-label={s}>
                <span className={s === "running" ? "spin" : ""}>{icon[s]}</span>
              </div>
              <div className="panel stage-card">
                <div className="stage-top">
                  <span className="stage-name">job: {e.stage}</span>
                  <span className="stage-period">{e.period}</span>
                </div>
                <h3 className="stage-title">{e.title}</h3>
                <p className="stage-org">
                  {e.org} <span className="c-muted">· {e.meta}</span>
                </p>
                {e.highlight && <p className="stage-highlight">★ {e.highlight}</p>}
                <ul className="stage-points">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
