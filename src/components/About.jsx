import Section from "./Section.jsx";
import { about, hobbies } from "../data/portfolio.js";

export default function About() {
  return (
    <Section id="about" command="cat about.md" title="About Me">
      <div className="about-grid">
        <div className="about-text reveal">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="hobbies">
            <p className="c-muted"># when I'm not deploying things:</p>
            <div className="hobby-list">
              {hobbies.map((h) => (
                <span key={h.name} className="chip">
                  {h.icon} {h.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="panel about-facts reveal">
          <p className="panel-label">profile.yaml</p>
          <pre>
            {about.facts.map((f) => (
              <div key={f.key}>
                <span className="c-blue">{f.key}</span>
                <span className="c-muted">: </span>
                <span className="c-text">"{f.value}"</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </Section>
  );
}
