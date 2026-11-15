import { useEffect, useState } from "react";
import { profile } from "../data/portfolio.js";
import { prefersReducedMotion, scrollToSection } from "../hooks/useInView.js";
import Terminal from "./Terminal.jsx";
import MatrixRain from "./MatrixRain.jsx";

function TypeWriter({ text, speed = 45 }) {
  const [shown, setShown] = useState(prefersReducedMotion() ? text : "");
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    setShown("");
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span>
      {shown}
      <span className="cursor" aria-hidden="true" />
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <MatrixRain />
      <div className="container hero-grid">
        <div className="hero-intro">
          <p className="hero-status">
            <span className="dot dot--live" /> open to {profile.openTo.toLowerCase()}
          </p>
          <h1 className="hero-name">
            <span className="c-muted">&gt; </span>
            {profile.name}
          </h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-tagline">
            <span className="c-muted"># </span>
            <TypeWriter text={profile.tagline} />
          </p>
          <p className="hero-meta">
            📍 {profile.location} &nbsp;·&nbsp; 💼 {profile.role}
          </p>
          <div className="hero-actions">
            <button className="btn btn--primary" onClick={() => scrollToSection("projects")}>
              ./view-projects
            </button>
            <button className="btn" onClick={() => scrollToSection("contact")}>
              ./contact-me
            </button>
            {profile.resume && (
              <a className="btn" href={profile.resume} download="Diya_Singh_Resume.pdf">
                ↓ resume.pdf
              </a>
            )}
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer">github ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin ↗</a>
          </div>
        </div>
        <Terminal />
      </div>
      <button className="scroll-hint" onClick={() => scrollToSection("about")} aria-label="Scroll down">
        ↓ scroll
      </button>
    </section>
  );
}
