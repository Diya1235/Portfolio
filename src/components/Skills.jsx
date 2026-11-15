import { useEffect, useState } from "react";
import Section from "./Section.jsx";
import { skills } from "../data/portfolio.js";
import { useInView, prefersReducedMotion } from "../hooks/useInView.js";

/** Each skill is a "container" that spins up when the section scrolls into view. */
function SkillContainer({ skill, delay, start }) {
  const [phase, setPhase] = useState("created");

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setPhase("up");
      return;
    }
    const t1 = setTimeout(() => setPhase("starting"), delay);
    const t2 = setTimeout(() => setPhase("up"), delay + 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [start, delay]);

  const learning = skill.level === "learning";
  const label =
    phase === "created" ? "Created" : phase === "starting" ? "Starting..." : learning ? "Building" : "Up";

  return (
    <div className={`container-card phase-${phase} ${learning ? "is-learning" : ""}`}>
      <span className="container-status">
        <span className="dot" /> {label}
      </span>
      <span className="container-name">{skill.name}</span>
      <span className="container-image">
        {skill.name.toLowerCase().replace(/[^a-z0-9+]/g, "")}:{learning ? "learning" : "stable"}
      </span>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView(0.15);
  let n = 0;

  return (
    <Section id="skills" command="docker compose up --skills" title="Skills">
      <div className="legend">
        <span><span className="dot dot--up" /> Up — proficient</span>
        <span><span className="dot dot--build" /> Building — currently learning</span>
      </div>
      <div ref={ref} className="skill-groups">
        {skills.map((group) => (
          <div key={group.group} className="skill-group">
            <p className="skill-group-name">
              <span className="c-muted">service:</span> {group.group}
            </p>
            <div className="skill-grid">
              {group.items.map((s) => (
                <SkillContainer key={s.name} skill={s} start={inView} delay={(n++) * 120} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
