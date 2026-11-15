import Section from "./Section.jsx";
import { certifications } from "../data/portfolio.js";

export default function Certifications() {
  return (
    <Section id="certifications" command="ls ~/certs" title="Certifications">
      <div className="cert-grid">
        {certifications.map((c) => {
          const body = (
            <>
              <span className="cert-check">🏅 certified</span>
              <h3 className="cert-name">{c.name}</h3>
              <p className="cert-issuer">{c.issuer}</p>
              {c.url && <span className="cert-link">view ↗</span>}
            </>
          );
          return c.url ? (
            <a key={c.name} href={c.url} target="_blank" rel="noreferrer" className="panel cert-card reveal">
              {body}
            </a>
          ) : (
            <div key={c.name} className="panel cert-card reveal">
              {body}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
