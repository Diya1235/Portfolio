import { useEffect, useState } from "react";
import Section from "./Section.jsx";
import { projects, certifications, skills, cricketLines } from "../data/portfolio.js";
import { useInView, prefersReducedMotion } from "../hooks/useInView.js";

function CountUp({ to, decimals = 0, start }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setV(to);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1200, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start]);
  return v.toFixed(decimals);
}

export default function Scorecard() {
  const [ref, inView] = useInView(0.3);
  const [line, setLine] = useState(cricketLines[0]);
  const techCount = skills.reduce((n, g) => n + g.items.length, 0);

  const rows = [
    { label: "Projects", value: projects.length, note: `${projects.filter((p) => p.status === "shipped").length} shipped` },
    { label: "Certifications", value: certifications.length, note: "and counting" },
    { label: "CGPA", value: 9.9, decimals: 1, note: "out of 10" },
    { label: "Tech in the kit", value: techCount, note: "tools & languages" },
  ];

  return (
    <Section id="scorecard" command="cat scorecard.txt" title="Career Scorecard 🏏">
      <div ref={ref} className="scoreboard">
        <div className="scoreboard-head">
          <span>DIYA XI</span>
          <span className="c-green">● LIVE</span>
          <span>Innings: DevOps</span>
        </div>
        <div className="score-grid">
          {rows.map((r) => (
            <div key={r.label} className="score-cell">
              <span className="score-value">
                <CountUp to={r.value} decimals={r.decimals || 0} start={inView} />
              </span>
              <span className="score-label">{r.label}</span>
              <span className="score-note">{r.note}</span>
            </div>
          ))}
          <div className="score-cell">
            <span className="score-value">∞</span>
            <span className="score-label">Curiosity</span>
            <span className="score-note">not out*</span>
          </div>
        </div>
        <div className="commentary">
          <span className="c-muted">commentary:</span> {line}
          <button
            className="btn btn--small"
            onClick={() => {
              const others = cricketLines.filter((l) => l !== line);
              setLine(others[Math.floor(Math.random() * others.length)]);
            }}
          >
            next ball →
          </button>
        </div>
      </div>
    </Section>
  );
}
